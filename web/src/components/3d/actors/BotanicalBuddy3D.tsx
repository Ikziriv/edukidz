import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Sprout, Droplet } from 'lucide-react';
import { useStoryStore } from '../../../stores/storyStore';
import type { FarmCropTile } from '../../../types/story';
import {
  getPvZCheckerboardLawnColor,
  getPvZSquashStretch
} from '../../../constants/botanicalRegistry';
import { createProceduralSoilTexture } from '../textures/proceduralTextures';

/**
 * 3D Smiling Plant Face (PopCap / Plants vs. Zombies style eyes + white specular catchlights + smile)
 */
function PvZPlantFace3D({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Left & Right Glossy Dark Eyes */}
      {[-0.036, 0.036].map((ex, idx) => (
        <group key={idx} position={[ex, 0.018, 0]}>
          <mesh>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color="#1a0b02" />
          </mesh>
          {/* Bright White Specular Catchlight */}
          <mesh position={[0.005, 0.006, 0.013]}>
            <sphereGeometry args={[0.006, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
      {/* Rosy Cheeks */}
      {[-0.056, 0.056].map((cx, idx) => (
        <mesh key={idx} position={[cx, -0.004, -0.002]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#fb7185" transparent opacity={0.65} />
        </mesh>
      ))}
      {/* Cheerful Smile Arc */}
      <mesh position={[0, -0.015, 0.004]} rotation={[0.1, 0, Math.PI]}>
        <torusGeometry args={[0.026, 0.005, 6, 12, Math.PI]} />
        <meshBasicMaterial color="#271202" />
      </mesh>
    </group>
  );
}

export function CropMesh({ crop }: { crop: FarmCropTile }) {
  const meshRef = useRef<THREE.Group>(null);
  const phaseOffset = crop.gridX * 1.1 + crop.gridZ * 1.7;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Gentle breeze sway + PopCap PvZ Squash-and-Stretch rhythmic idle bounce!
      meshRef.current.rotation.z = Math.sin(t * 2.4 + crop.gridX) * 0.055;
      meshRef.current.rotation.x = Math.cos(t * 2.0 + crop.gridZ) * 0.035;
      const { scaleX, scaleY } = getPvZSquashStretch(
        t,
        phaseOffset,
        crop.stage === 'ripe' ? 0.065 : 0.04
      );
      meshRef.current.scale.set(scaleX, scaleY, scaleX);
    }
  });

  if (crop.stage === 'soil') return null;

  return (
    <group ref={meshRef} position={[0, 0.08, 0]}>
      {/* SEED STAGE: Small earthy mound with green shoot */}
      {crop.stage === 'seed' && (
        <group>
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#4ade80" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.07, 0.09, 0.04, 8]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* SPROUT STAGE: Two vibrant cotyledon leaves */}
      {crop.stage === 'sprout' && (
        <group>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.022, 0.032, 0.16, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.4} />
          </mesh>
          <mesh position={[0.05, 0.14, 0]} rotation={[0, 0, 0.6]}>
            <coneGeometry args={[0.055, 0.12, 6]} />
            <meshStandardMaterial color="#4ade80" roughness={0.3} />
          </mesh>
          <mesh position={[-0.05, 0.14, 0]} rotation={[0, 0, -0.6]}>
            <coneGeometry args={[0.055, 0.12, 6]} />
            <meshStandardMaterial color="#4ade80" roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* GROWING STAGE: Bushy stem with multiple tiers of foliage + baby PvZ eyes */}
      {crop.stage === 'growing' && (
        <group>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.032, 0.042, 0.32, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.4} />
          </mesh>
          {[-0.5, 0, 0.5].map((angle, i) => (
            <mesh key={i} position={[angle * 0.12, 0.18 + i * 0.06, 0]} rotation={[0, angle * 1.2, angle]}>
              <coneGeometry args={[0.085, 0.18, 6]} />
              <meshStandardMaterial color="#22c55e" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}

      {/* RIPE STAGE: Fully grown PvZ Smiling Botanical Buddy! */}
      {crop.stage === 'ripe' && (
        <group>
          {/* Main Plant Stalk */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.042, 0.052, 0.44, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.4} />
          </mesh>

          {/* CROP TYPE 1: SMILING BERRY DEW-SPROUT (STRAWBERRY) */}
          {crop.cropType === 'strawberry' && (
            <group position={[0, 0.2, 0]}>
              {/* Lush Crown */}
              <mesh position={[0, 0.06, 0]}>
                <sphereGeometry args={[0.165, 12, 12]} />
                <meshStandardMaterial color="#22c55e" roughness={0.45} />
              </mesh>
              {/* Smiling Face on the Berry Bush Crown */}
              <PvZPlantFace3D position={[0, 0.07, 0.158]} scale={1.05} />
              {/* Sweet Red Strawberries hanging */}
              {[-0.1, 0.1].map((x, i) => (
                <group key={i} position={[x, -0.06, i === 0 ? 0.08 : -0.08]}>
                  <mesh rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.075, 0.14, 8]} />
                    <meshStandardMaterial color="#ef4444" roughness={0.3} />
                  </mesh>
                  {/* Calyx (green leaf cap) */}
                  <mesh position={[0, 0.07, 0]}>
                    <cylinderGeometry args={[0.05, 0.02, 0.02, 6]} />
                    <meshStandardMaterial color="#16a34a" />
                  </mesh>
                </group>
              ))}
            </group>
          )}

          {/* CROP TYPE 2: SMILING PVZ SUNFLOWER */}
          {crop.cropType === 'sunflower' && (
            <group position={[0, 0.42, 0]}>
              {/* Dark Chocolate Seed Disc Center */}
              <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2 - 0.25, 0, 0]}>
                <cylinderGeometry args={[0.115, 0.115, 0.035, 18]} />
                <meshStandardMaterial color="#5c2804" roughness={0.75} />
              </mesh>
              {/* Radiant Golden Yellow Petal Ring */}
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2 - 0.25, 0, 0]}>
                <cylinderGeometry args={[0.21, 0.17, 0.022, 18]} />
                <meshStandardMaterial color="#facc15" roughness={0.28} />
              </mesh>
              {/* Iconic Smiling Sunflower Face */}
              <group rotation={[-0.25, 0, 0]}>
                <PvZPlantFace3D position={[0, 0, 0.042]} scale={1.25} />
              </group>
            </group>
          )}

          {/* CROP TYPE 3: SMILING ROOTY GINGER BUDDY */}
          {crop.cropType === 'ginger' && (
            <group position={[0, 0.3, 0]}>
              {/* Plump Smiling Ginger Rhizome Bulb at Base */}
              <mesh position={[0, -0.16, 0.06]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color="#d97706" roughness={0.55} />
              </mesh>
              <PvZPlantFace3D position={[0, -0.15, 0.175]} scale={0.95} />

              {/* Multi-tier tropical ginger leaves */}
              {[-0.14, 0, 0.14].map((offset, i) => (
                <mesh key={i} position={[offset, 0.05, 0]} rotation={[0, 0, offset * 1.5]}>
                  <coneGeometry args={[0.09, 0.28, 6]} />
                  <meshStandardMaterial color="#16a34a" roughness={0.3} />
                </mesh>
              ))}
              {/* Pinkish torch blossom tip */}
              <mesh position={[0, 0.22, 0]}>
                <coneGeometry args={[0.07, 0.16, 8]} />
                <meshStandardMaterial color="#f472b6" roughness={0.4} />
              </mesh>
            </group>
          )}

          {/* Pure 3D Golden Sun Energy Gleam Orb */}
          <mesh position={[0, 0.54, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.046, 0]} />
            <meshBasicMaterial color="#fde047" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function HarvestMoonCropGrid() {
  const cropTiles = useStoryStore((s) => s.cropTiles);
  const interactWithCropTile = useStoryStore((s) => s.interactWithCropTile);
  const isSleeping = useStoryStore((s) => s.activeMode === 'sleeping');
  const language = useStoryStore((s) => s.language);
  const soilTex = useMemo(() => createProceduralSoilTexture(), []);

  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const tileSize = 0.72;
  const originX = -((3 - 1) * tileSize) / 2;
  const originZ = -((3 - 1) * tileSize) / 2;

  return (
    <group position={[0, 0.28, 0]}>
      {/* Heavy Timber Farm Box Frame */}
      <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.55, 0.22, 2.55]} />
        <meshStandardMaterial color={isSleeping ? '#3e2313' : '#854d0e'} roughness={0.7} />
      </mesh>

      {/* 9 Interactive PvZ Checkerboard Lawn & Soil Tiles */}
      {cropTiles.map((crop) => {
        const posX = originX + crop.gridX * tileSize;
        const posZ = originZ + crop.gridZ * tileSize;
        const isHovered = hoveredTile === crop.id;

        const { turfColor } = getPvZCheckerboardLawnColor(crop.gridX, crop.gridZ, isSleeping);
        const soilColor = crop.isWatered
          ? isSleeping
            ? '#1c130d'
            : '#27170c'
          : isSleeping
            ? '#3d2516'
            : '#573016';

        return (
          <group
            key={crop.id}
            position={[posX, 0.02, posZ]}
            onClick={(e) => {
              e.stopPropagation();
              interactWithCropTile(crop.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredTile(crop.id);
            }}
            onPointerOut={() => setHoveredTile(null)}
          >
            {/* Outer PopCap / Plants vs. Zombies Checkerboard Lawn Turf Collar */}
            <mesh position={[0, -0.015, 0]} receiveShadow>
              <boxGeometry args={[0.7, 0.06, 0.7]} />
              <meshStandardMaterial color={turfColor} roughness={0.45} />
            </mesh>

            {/* Inner Tilled Earth Mound */}
            <mesh receiveShadow castShadow>
              <boxGeometry args={[0.58, 0.08, 0.58]} />
              <meshStandardMaterial
                map={soilTex}
                color={soilColor}
                roughness={crop.isWatered ? 0.4 : 0.85}
                metalness={crop.isWatered ? 0.15 : 0}
              />
            </mesh>

            {/* Furrow Lines */}
            {[-0.16, 0, 0.16].map((fz, idx) => (
              <mesh key={idx} position={[0, 0.045, fz]} receiveShadow>
                <boxGeometry args={[0.52, 0.02, 0.055]} />
                <meshStandardMaterial color={crop.isWatered ? '#1a0e07' : '#3d2210'} roughness={0.9} />
              </mesh>
            ))}

            {/* Hover Selection Glow Ring */}
            {isHovered && (
              <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.3, 0.35, 16]} />
                <meshBasicMaterial color="#facc15" transparent opacity={0.85} />
              </mesh>
            )}

            {/* 3D Smiling Botanical Buddy Mesh */}
            <CropMesh crop={crop} />

            {/* Contextual Micro-Tooltip ONLY on the Hovered Tile */}
            {isHovered && (
              <Html position={[0, 0.68, 0]} center distanceFactor={5.8}>
                <div
                  className={`pointer-events-none ${crop.stage === 'ripe' ? 'spatial-pill spatial-pill-action' : 'spatial-pill'
                    }`}
                >
                  {crop.stage === 'ripe' ? (
                    <>
                      <Sparkles size={10} />
                      <span>{language === 'id' ? 'Panen!' : 'Harvest!'}</span>
                    </>
                  ) : !crop.isWatered ? (
                    <>
                      <Droplet size={10} className="text-sky-300" />
                      <span>{language === 'id' ? 'Siram' : 'Water'}</span>
                    </>
                  ) : crop.stage === 'soil' ? (
                    <>
                      <Sprout size={10} className="text-emerald-300" />
                      <span>{language === 'id' ? 'Tanam' : 'Plant'}</span>
                    </>
                  ) : (
                    <>
                      <Sprout size={10} className="text-emerald-300" />
                      <span>{language === 'id' ? 'Tumbuh' : 'Growing'}</span>
                    </>
                  )}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
