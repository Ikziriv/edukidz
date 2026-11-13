import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface CharacterSelectionShaderRingProps {
  color: string;
  isSelected: boolean;
}

export const CharacterSelectionShaderRing: React.FC<CharacterSelectionShaderRingProps> = ({
  color,
  isSelected
}) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uActive: { value: isSelected ? 1.0 : 0.45 }
    }),
    [color, isSelected]
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.92, 0.92]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uActive;
          varying vec2 vUv;
          void main() {
            float dist = length(vUv - vec2(0.5)) * 2.0;
            float outerRing = smoothstep(0.86, 0.92, dist) - smoothstep(0.92, 0.98, dist);
            float pulseRadius = fract(uTime * 0.65) * 0.92;
            float pulseRing = (smoothstep(pulseRadius - 0.08, pulseRadius, dist) - smoothstep(pulseRadius, pulseRadius + 0.08, dist)) * (1.0 - dist);
            float innerGlow = (1.0 - smoothstep(0.0, 0.85, dist)) * 0.22;
            float alpha = (outerRing * 0.95 + pulseRing * 0.75 + innerGlow) * uActive;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </mesh>
  );
};

