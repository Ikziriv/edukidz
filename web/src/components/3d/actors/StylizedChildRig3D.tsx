import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStoryStore } from '../../../stores/storyStore';
import type { SelectableCharacterId } from '../../../types/story';
import { CharacterSelectionShaderRing } from '../shaders/CharacterSelectionShaderRing';

export type NoseStyle = 'button' | 'petite' | 'rounded' | 'bridge';
export type BrowStyle = 'arched' | 'thick' | 'gentle' | 'curious-raised' | 'expressive';
export type MouthStyle = 'big-laugh' | 'cheerful-grin' | 'warm-smile' | 'curious-smirk';

export interface FaceProfile {
  headScale: [number, number, number];
  jawScale: [number, number, number];
  chinY: number;
  eyeSpacing: number;
  eyeScale: [number, number];
  eyeTilt: number;
  noseStyle: NoseStyle;
  browStyle: BrowStyle;
  mouthStyle: MouthStyle;
  hasFreckles?: boolean;
}

export interface StylizedChildProps {
  id: SelectableCharacterId;
  name: string;
  badgeColor: string;
  position: [number, number, number];
  rotationY: number;
  skinColor: string;
  cheekColor: string;
  irisColor: string;
  faceProfile: FaceProfile;
  headwearType:
    | 'cap-bun'
    | 'nordic-braids'
    | 'high-bun'
    | 'cap-boy'
    | 'cap-glasses'
    | 'afro-puffs';
  headwearColor: string;
  headwearAccent: string;
  hairColor: string;
  topColor: string;
  topStripeColor?: string;
  outerwearColor?: string;
  bottomType: 'pants' | 'shorts' | 'skirt';
  bottomColor: string;
  bottomTrimColor?: string;
  shoeColor: string;
  backpackColor: string;
  heldItem?:
    | 'watering-can'
    | 'guitar'
    | 'notebook'
    | 'magnifying-glass'
    | 'flower-basket'
    | 'tea-jar';
  hotspotId?: string;
  isSleeping: boolean;
}

// Cached procedural radial blush texture (zero per-frame allocations)
let cachedBlushTexture: THREE.CanvasTexture | null = null;
function getBlushTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  if (cachedBlushTexture) return cachedBlushTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
  grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  cachedBlushTexture = new THREE.CanvasTexture(canvas);
  cachedBlushTexture.colorSpace = THREE.SRGBColorSpace;
  return cachedBlushTexture;
}

// Cached procedural horizontal stripe fabric texture for tees
const stripeTextureCache = new Map<string, THREE.CanvasTexture>();
function getStripeTexture(baseColor: string, stripeColor: string): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const key = `${baseColor}|${stripeColor}`;
  const existing = stripeTextureCache.get(key);
  if (existing) return existing;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = stripeColor;
  for (let y = 16; y < 128; y += 32) {
    ctx.fillRect(0, y, 128, 10);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  stripeTextureCache.set(key, tex);
  return tex;
}

export function StylizedChildRig({
  id,
  name,
  badgeColor,
  position,
  rotationY,
  skinColor,
  cheekColor,
  irisColor,
  faceProfile,
  headwearType,
  headwearColor,
  headwearAccent,
  hairColor,
  topColor,
  topStripeColor,
  outerwearColor,
  bottomType,
  bottomColor,
  bottomTrimColor,
  shoeColor,
  backpackColor,
  heldItem,
  hotspotId,
  isSleeping
}: StylizedChildProps) {
  const groupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftEyelidRef = useRef<THREE.Mesh>(null);
  const rightEyelidRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Group>(null);
  const facingYawRef = useRef<number>(rotationY);

  const openHotspot = useStoryStore((s) => s.openHotspot);
  const selectCharacter = useStoryStore((s) => s.selectCharacter);
  const setIsDraggingCharacter = useStoryStore((s) => s.setIsDraggingCharacter);
  const isSelected = useStoryStore((s) => s.selectedCharacter === id);
  const bounceTarget = useStoryStore((s) => s.characterBounceTarget);
  const isNarratingThisCharacter = useStoryStore((s) => s.isPlaying && s.speakingCharacter === id);
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const language = useStoryStore((s) => s.language);
  const [hovered, setHovered] = useState(false);

  const cleanName = useMemo(() => name.replace(/\s*\([A-Z]+\)$/, ''), [name]);
  const showCharacterPill =
    isNarratingThisCharacter || hovered || bounceTarget === id || showSceneLabels;

  const blushMap = useMemo(() => getBlushTexture(), []);
  const torsoStripeMap = useMemo(
    () => (topStripeColor ? getStripeTexture(topColor, topStripeColor) : null),
    [topColor, topStripeColor]
  );

  const phase = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    return (sum % 10) * 0.6;
  }, [id]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + phase;
    const storeState = useStoryStore.getState();
    const isBouncing = bounceTarget === id;
    const isSpeakingNow = storeState.isPlaying && storeState.speakingCharacter === id;
    const isStoryPlaying = storeState.isPlaying;
    const target = storeState.characterTargets[id] ?? position;

    let isWalking = false;

    if (groupRef.current) {
      const curX = groupRef.current.position.x;
      const curZ = groupRef.current.position.z;
      const dx = target[0] - curX;
      const dz = target[2] - curZ;
      const dist = Math.hypot(dx, dz);

      if (dist > 0.015) {
        isWalking = true;
        const speed = 2.6;
        const step = Math.min(dist, delta * speed);
        const lerpFactor = 1 - Math.exp(-8.5 * delta);
        groupRef.current.position.x = THREE.MathUtils.lerp(curX, curX + (dx / dist) * step, 0.85);
        groupRef.current.position.z = THREE.MathUtils.lerp(curZ, curZ + (dz / dist) * step, 0.85);

        const desiredYaw = Math.atan2(dx, dz);
        let angleDiff = desiredYaw - facingYawRef.current;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        facingYawRef.current += angleDiff * lerpFactor;
      } else if (isSpeakingNow) {
        const audienceYaw = rotationY * 0.5;
        facingYawRef.current = THREE.MathUtils.lerp(facingYawRef.current, audienceYaw, delta * 3);
      }

      const bounceOffset = isBouncing
        ? Math.abs(Math.sin(t * 14)) * 0.22
        : isSpeakingNow
          ? Math.abs(Math.sin(t * 7.5)) * 0.05
          : 0;
      const walkBob = isWalking ? Math.abs(Math.sin(t * 13)) * 0.055 : 0;
      // Keep feet firmly planted on the floor surface (y >= 0.05) when standing idle
      const floorY = Math.max(0.05, position[1]);
      groupRef.current.position.y = floorY + walkBob + bounceOffset;
      groupRef.current.rotation.y =
        facingYawRef.current +
        (isBouncing
          ? Math.sin(t * 10) * 0.22
          : isWalking
            ? 0
            : isSpeakingNow
              ? Math.sin(t * 4.2) * 0.14
              : Math.sin(t * 0.7) * 0.04);
    }

    // Subtle upper-body breathing while feet remain planted on the ground
    if (torsoRef.current) {
      torsoRef.current.position.y =
        0.72 + (isWalking ? 0 : Math.sin(t * (isStoryPlaying ? 3.2 : 2.1)) * 0.012);
    }

    if (headRef.current) {
      headRef.current.rotation.y = isWalking
        ? Math.sin(t * 6.5) * 0.08
        : isSpeakingNow
          ? Math.sin(t * 5.2) * 0.22
          : Math.sin(t * 1.1) * 0.14;
      headRef.current.rotation.z = isSpeakingNow
        ? Math.cos(t * 4.5) * 0.08
        : Math.cos(t * 0.9) * 0.04;
      headRef.current.rotation.x = isSleeping
        ? 0.15
        : isSpeakingNow
          ? Math.sin(t * 8.5) * 0.09
          : Math.sin(t * 1.4) * 0.04;
    }

    if (mouthRef.current) {
      if (isSpeakingNow) {
        const syllablePulse =
          0.85 + Math.abs(Math.sin(t * 18.5)) * 1.15 + Math.abs(Math.cos(t * 11.2)) * 0.45;
        mouthRef.current.scale.set(1.08, syllablePulse, 1);
      } else {
        mouthRef.current.scale.set(1, 1, 1);
      }
    }

    const swingAmp = isWalking
      ? 0.58
      : isBouncing
        ? 0.45
        : isSpeakingNow
          ? 0.35
          : isStoryPlaying
            ? 0.14
            : 0.08;
    const legSwingAmp = isWalking ? 0.48 : isBouncing ? 0.25 : 0;
    const swingFreq = isWalking
      ? 13
      : isBouncing
        ? 12
        : isSpeakingNow
          ? 7.8
          : isStoryPlaying
            ? 3.4
            : 2.1;
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x =
        Math.sin(t * swingFreq) * swingAmp - (isSpeakingNow ? 0.25 : 0);
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x =
        -Math.sin(t * swingFreq) * swingAmp - (isSpeakingNow ? 0.35 : 0);
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = -Math.sin(t * swingFreq) * legSwingAmp;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * swingFreq) * legSwingAmp;
    }

    const blinkCycle = Math.sin(t * 1.6);
    const isBlinking = isSleeping || blinkCycle > 0.96;
    const lidScaleY = isBlinking ? 1 : 0.05;
    if (leftEyelidRef.current) leftEyelidRef.current.scale.y = lidScaleY;
    if (rightEyelidRef.current) rightEyelidRef.current.scale.y = lidScaleY;
  });

  const hasCap =
    headwearType === 'cap-bun' ||
    headwearType === 'cap-boy' ||
    headwearType === 'cap-glasses';

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        selectCharacter(id);
        setIsDraggingCharacter(true);
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectCharacter(id);
        if (isSelected && hotspotId) {
          openHotspot(hotspotId);
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {(isSelected || hovered || bounceTarget === id || isNarratingThisCharacter) && (
        <CharacterSelectionShaderRing
          color={isNarratingThisCharacter ? '#f59e0b' : badgeColor}
          isSelected={isSelected || isNarratingThisCharacter}
        />
      )}

      {/* Grounded Contact Shadow directly beneath character's shoes */}
      <mesh position={[0, 0.004, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.62, 0.52]} />
        <meshBasicMaterial
          color="#1a120b"
          map={blushMap ?? undefined}
          transparent
          opacity={isSleeping ? 0.28 : 0.42}
          depthWrite={false}
        />
      </mesh>

      {/* 1. ARTICULATED LEGS, RIBBED SOCKS & FLAT-SOLE SCULPTED SNEAKERS */}
      {[
        { ref: leftLegRef, x: -0.105 },
        { ref: rightLegRef, x: 0.105 }
      ].map((leg, idx) => (
        <group key={idx} ref={leg.ref} position={[leg.x, 0.41, 0]}>
          {/* Upper thigh */}
          <mesh position={[0, -0.085, 0]} castShadow>
            <capsuleGeometry args={[0.066, 0.14, 10, 16]} />
            <meshPhysicalMaterial
              color={bottomType === 'pants' ? bottomColor : skinColor}
              roughness={bottomType === 'pants' ? 0.78 : 0.44}
              sheen={bottomType === 'pants' ? 0.5 : 0.3}
              sheenColor={bottomType === 'pants' ? '#ffffff' : '#ffd4c4'}
              sheenRoughness={0.8}
            />
          </mesh>

          {/* Lower calf */}
          <mesh position={[0, -0.215, 0]} castShadow>
            <cylinderGeometry args={[0.056, 0.049, 0.18, 16]} />
            <meshPhysicalMaterial
              color={bottomType === 'pants' ? bottomColor : skinColor}
              roughness={bottomType === 'pants' ? 0.78 : 0.44}
              sheen={bottomType === 'pants' ? 0.5 : 0.3}
              sheenColor={bottomType === 'pants' ? '#ffffff' : '#ffd4c4'}
              sheenRoughness={0.8}
            />
          </mesh>

          {/* Crew Sock Cuff */}
          <mesh position={[0, -0.305, 0]} castShadow>
            <cylinderGeometry args={[0.056, 0.053, 0.068, 16]} />
            <meshPhysicalMaterial color="#f8fafc" roughness={0.82} sheen={0.5} sheenRoughness={0.9} />
          </mesh>

          {/* Sculpted Multi-Part Sneaker (Sole flush at local y = -0.41 => world floor y = 0) */}
          <group position={[0, -0.365, 0.04]}>
            {/* Main Sneaker Upper (oriented horizontally along Z) */}
            <mesh position={[0, 0.014, -0.005]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.75]} castShadow>
              <capsuleGeometry args={[0.058, 0.095, 10, 16]} />
              <meshPhysicalMaterial
                color={shoeColor}
                roughness={0.42}
                clearcoat={0.18}
                clearcoatRoughness={0.35}
              />
            </mesh>
            {/* Padded Ankle Collar */}
            <mesh position={[0, 0.046, -0.042]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.048, 0.016, 10, 18]} />
              <meshPhysicalMaterial color={shoeColor} roughness={0.5} />
            </mesh>
            {/* White Rubber Toe Cap */}
            <mesh position={[0, -0.002, 0.088]} scale={[1.0, 0.62, 1.0]} castShadow>
              <sphereGeometry args={[0.054, 16, 14]} />
              <meshPhysicalMaterial color="#ffffff" roughness={0.26} clearcoat={0.22} />
            </mesh>
            {/* Flat White Rubber Cupsole (bottom rests cleanly at y = -0.045 => 0.41 - 0.365 - 0.045 = 0.000) */}
            <mesh position={[0, -0.03, 0.015]} rotation={[Math.PI / 2, 0, 0]} scale={[1.05, 1.05, 0.48]} castShadow receiveShadow>
              <capsuleGeometry args={[0.062, 0.115, 8, 16]} />
              <meshPhysicalMaterial color="#f8fafc" roughness={0.32} />
            </mesh>
            {/* Crisp White Lace Bars */}
            {[0.005, 0.032].map((lz, lIdx) => (
              <mesh key={lIdx} position={[0, 0.054 - lIdx * 0.008, lz]}>
                <boxGeometry args={[0.062, 0.01, 0.015]} />
                <meshStandardMaterial color="#ffffff" roughness={0.35} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Shorts / Skirt Bottoms with Optional Hem Trim */}
      {bottomType === 'shorts' && (
        <group position={[0, 0.43, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.205, 0.225, 0.18, 22]} />
            <meshPhysicalMaterial color={bottomColor} roughness={0.74} sheen={0.55} sheenRoughness={0.85} />
          </mesh>
          {bottomTrimColor && (
            <mesh position={[0, -0.082, 0]}>
              <cylinderGeometry args={[0.224, 0.228, 0.022, 22]} />
              <meshPhysicalMaterial color={bottomTrimColor} roughness={0.65} />
            </mesh>
          )}
        </group>
      )}
      {bottomType === 'skirt' && (
        <mesh position={[0, 0.405, 0]} castShadow>
          <cylinderGeometry args={[0.185, 0.285, 0.25, 24]} />
          <meshPhysicalMaterial color={bottomColor} roughness={0.7} sheen={0.65} sheenRoughness={0.85} />
        </mesh>
      )}

      {/* 2. TORSO, LAYERED APPAREL & CONTOURED BACKPACK */}
      <group ref={torsoRef} position={[0, 0.72, 0]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.195, 0.26, 14, 24]} />
          <meshPhysicalMaterial
            color={torsoStripeMap ? '#ffffff' : topColor}
            map={torsoStripeMap ?? undefined}
            roughness={0.72}
            sheen={0.55}
            sheenRoughness={0.85}
          />
        </mesh>

        {/* Crew Collar Rim */}
        <mesh position={[0, 0.195, 0.01]} rotation={[Math.PI / 2 + 0.12, 0, 0]}>
          <torusGeometry args={[0.092, 0.016, 10, 22]} />
          <meshPhysicalMaterial color={topColor} roughness={0.7} />
        </mesh>

        {/* Optional Vest / Outerwear */}
        {outerwearColor && (
          <group>
            <mesh position={[-0.088, 0.005, 0.025]} castShadow>
              <capsuleGeometry args={[0.075, 0.24, 10, 14]} />
              <meshPhysicalMaterial color={outerwearColor} roughness={0.68} sheen={0.5} />
            </mesh>
            <mesh position={[0.088, 0.005, 0.025]} castShadow>
              <capsuleGeometry args={[0.075, 0.24, 10, 14]} />
              <meshPhysicalMaterial color={outerwearColor} roughness={0.68} sheen={0.5} />
            </mesh>
          </group>
        )}

        {/* Smooth Neck */}
        <mesh position={[0, 0.235, 0]}>
          <cylinderGeometry args={[0.072, 0.082, 0.1, 16]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.44}
            sheen={0.32}
            sheenColor="#ffd4c4"
            sheenRoughness={0.75}
          />
        </mesh>

        {/* Contoured Pixar-Style School Backpack */}
        <group position={[0, 0.015, -0.19]}>
          {/* Main Rounded Pack Shell */}
          <mesh scale={[1.15, 1.0, 0.62]} castShadow receiveShadow>
            <capsuleGeometry args={[0.145, 0.16, 12, 20]} />
            <meshPhysicalMaterial color={backpackColor} roughness={0.55} sheen={0.35} />
          </mesh>
          {/* Top Grab Handle */}
          <mesh position={[0, 0.215, 0.01]}>
            <torusGeometry args={[0.045, 0.012, 8, 16, Math.PI]} />
            <meshStandardMaterial color={backpackColor} roughness={0.5} />
          </mesh>
          {/* Front Zippered Pocket */}
          <mesh position={[0, -0.055, -0.078]} scale={[1.1, 0.85, 0.45]} castShadow>
            <capsuleGeometry args={[0.095, 0.06, 10, 16]} />
            <meshPhysicalMaterial color={headwearAccent} roughness={0.52} sheen={0.35} />
          </mesh>
          {/* Metallic Zipper Track & Pull */}
          <mesh position={[0, 0.018, -0.105]}>
            <boxGeometry args={[0.16, 0.012, 0.01]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.75} roughness={0.25} />
          </mesh>
          {/* Contoured Shoulder Straps */}
          {[-0.125, 0.125].map((sx, idx) => (
            <mesh key={idx} position={[sx, 0.045, 0.17]} rotation={[0.08, 0, 0]} castShadow>
              <boxGeometry args={[0.042, 0.31, 0.23]} />
              <meshPhysicalMaterial color={backpackColor} roughness={0.6} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 3. ARTICULATED ARMS, SCULPTED HANDS & HELD PROPS */}
      {[
        { ref: leftArmRef, x: -0.245, isRight: false },
        { ref: rightArmRef, x: 0.245, isRight: true }
      ].map((arm, idx) => (
        <group key={idx} ref={arm.ref} position={[arm.x, 0.86, 0]}>
          {/* Short Sleeve Shoulder Cap */}
          <mesh position={[0, -0.045, 0]} castShadow>
            <sphereGeometry args={[0.076, 16, 14]} />
            <meshPhysicalMaterial color={outerwearColor ?? topColor} roughness={0.7} sheen={0.5} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.175, 0.04]} rotation={[-0.25, 0, 0]} castShadow>
            <capsuleGeometry args={[0.049, 0.18, 10, 16]} />
            <meshPhysicalMaterial
              color={skinColor}
              roughness={0.44}
              sheen={0.32}
              sheenColor="#ffd4c4"
              sheenRoughness={0.75}
            />
          </mesh>
          {/* Sculpted Hand & Thumb */}
          <group position={[0, -0.295, 0.088]}>
            <mesh scale={[0.92, 1.05, 0.88]} castShadow>
              <sphereGeometry args={[0.056, 16, 14]} />
              <meshPhysicalMaterial
                color={skinColor}
                roughness={0.44}
                sheen={0.32}
                sheenColor="#ffd4c4"
              />
            </mesh>
            <mesh position={[arm.isRight ? -0.042 : 0.042, 0.012, 0.03]}>
              <capsuleGeometry args={[0.018, 0.022, 8, 10]} />
              <meshPhysicalMaterial color={skinColor} roughness={0.44} />
            </mesh>

            {arm.isRight && heldItem === 'watering-can' && (
              <group position={[0.06, -0.04, 0.12]} rotation={[0.3, -0.4, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.09, 0.15, 16]} />
                  <meshPhysicalMaterial color="#10b981" roughness={0.28} metalness={0.22} clearcoat={0.3} />
                </mesh>
                <mesh position={[-0.09, 0.05, 0]} rotation={[0, 0, -0.7]} castShadow>
                  <cylinderGeometry args={[0.02, 0.025, 0.13, 10]} />
                  <meshPhysicalMaterial color="#059669" roughness={0.28} metalness={0.22} />
                </mesh>
                <mesh position={[-0.14, 0.1, 0]} rotation={[0, 0, -0.7]}>
                  <cylinderGeometry args={[0.04, 0.02, 0.025, 12]} />
                  <meshStandardMaterial color="#fcd34d" metalness={0.5} roughness={0.25} />
                </mesh>
              </group>
            )}

            {arm.isRight && heldItem === 'magnifying-glass' && (
              <group position={[0.02, 0, 0.1]} rotation={[0.4, 0, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.015, 0.015, 0.12, 10]} />
                  <meshStandardMaterial color="#78350f" roughness={0.45} />
                </mesh>
                <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.055, 0.012, 10, 20]} />
                  <meshStandardMaterial color="#eab308" metalness={0.65} roughness={0.22} />
                </mesh>
                <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.048, 16]} />
                  <meshPhysicalMaterial color="#bae6fd" transparent opacity={0.55} roughness={0.05} ior={1.5} />
                </mesh>
              </group>
            )}

            {arm.isRight && heldItem === 'notebook' && (
              <group position={[0.02, 0.02, 0.08]} rotation={[0.3, -0.3, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.14, 0.18, 0.03]} />
                  <meshStandardMaterial color="#8b5cf6" roughness={0.38} />
                </mesh>
                <mesh position={[0.01, 0, 0.018]}>
                  <boxGeometry args={[0.11, 0.15, 0.01]} />
                  <meshStandardMaterial color="#fffbeb" roughness={0.75} />
                </mesh>
                <mesh position={[-0.062, 0, 0]}>
                  <cylinderGeometry args={[0.018, 0.018, 0.18, 10]} />
                  <meshStandardMaterial color="#fde047" metalness={0.35} roughness={0.28} />
                </mesh>
              </group>
            )}

            {arm.isRight && heldItem === 'flower-basket' && (
              <group position={[0.04, -0.05, 0.1]} rotation={[0.2, -0.25, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.095, 0.068, 0.11, 16]} />
                  <meshStandardMaterial color="#d97706" roughness={0.65} />
                </mesh>
                <mesh position={[0, 0.055, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.095, 0.012, 8, 18]} />
                  <meshStandardMaterial color="#b45309" roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.06, 0]}>
                  <torusGeometry args={[0.085, 0.01, 8, 16, Math.PI]} />
                  <meshStandardMaterial color="#92400e" roughness={0.55} />
                </mesh>
                {[
                  [-0.035, 0.065, 0.02, '#fb7185'],
                  [0.035, 0.07, -0.01, '#fbbf24'],
                  [0, 0.075, -0.03, '#f43f5e'],
                  [0.01, 0.065, 0.035, '#fde047']
                ].map(([fx, fy, fz, fc], fIdx) => (
                  <mesh key={fIdx} position={[fx as number, fy as number, fz as number]}>
                    <sphereGeometry args={[0.028, 10, 10]} />
                    <meshPhysicalMaterial color={fc as string} roughness={0.35} sheen={0.4} />
                  </mesh>
                ))}
              </group>
            )}

            {arm.isRight && heldItem === 'tea-jar' && (
              <group position={[0.03, -0.03, 0.09]} rotation={[0.25, -0.2, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.055, 0.06, 0.13, 16]} />
                  <meshPhysicalMaterial color="#fef3c7" roughness={0.18} clearcoat={0.6} />
                </mesh>
                <mesh position={[0, 0.072, 0]}>
                  <cylinderGeometry args={[0.042, 0.048, 0.028, 14]} />
                  <meshStandardMaterial color="#f43f5e" roughness={0.35} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      ))}

      {heldItem === 'guitar' && (
        <group position={[-0.08, 0.72, 0.24]} rotation={[0.25, 0.2, -0.55]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.34, 0.08]} />
            <meshPhysicalMaterial color="#b45309" roughness={0.25} clearcoat={0.45} />
          </mesh>
          <mesh position={[0, 0.03, 0.043]}>
            <circleGeometry args={[0.055, 18]} />
            <meshBasicMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0, 0.32, 0]} castShadow>
            <boxGeometry args={[0.055, 0.34, 0.035]} />
            <meshStandardMaterial color="#fcd34d" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* 4. SCULPTED VARIATIVE 3D HEAD, CORNEAL EYES, CHEEKBONES & EXPRESSIVE MOUTH */}
      <group ref={headRef} position={[0, 1.24, 0]}>
        {/* Sculpted Upper Cranium */}
        <mesh scale={faceProfile.headScale} castShadow receiveShadow>
          <sphereGeometry args={[0.252, 32, 32]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.42}
            sheen={0.35}
            sheenColor="#ffd4c4"
            sheenRoughness={0.75}
            clearcoat={0.05}
          />
        </mesh>

        {/* Sculpted Lower Jaw & Chin Volume (breaks flat-sphere silhouette) */}
        <mesh position={[0, faceProfile.chinY, 0.048]} scale={faceProfile.jawScale} castShadow receiveShadow>
          <sphereGeometry args={[0.185, 24, 24]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.43}
            sheen={0.35}
            sheenColor="#ffd4c4"
            sheenRoughness={0.75}
          />
        </mesh>

        {/* Subtle 3D Cheekbone Relief */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[side * 0.115, -0.028, 0.175]}
            scale={[1.05, 0.78, 0.72]}
            castShadow
          >
            <sphereGeometry args={[0.068, 16, 16]} />
            <meshPhysicalMaterial
              color={skinColor}
              roughness={0.42}
              sheen={0.35}
              sheenColor="#ffd4c4"
            />
          </mesh>
        ))}

        {/* Sculpted Ears */}
        {[-0.245, 0.245].map((ex, eIdx) => (
          <mesh key={eIdx} position={[ex, -0.015, 0]} scale={[0.75, 1.15, 0.75]} castShadow>
            <sphereGeometry args={[0.052, 14, 14]} />
            <meshPhysicalMaterial
              color={skinColor}
              roughness={0.45}
              sheen={0.3}
              sheenColor="#ffd4c4"
            />
          </mesh>
        ))}

        {/* Variative 3D Sculpted Nose (Bridge + Tip + Nostrils) */}
        <group position={[0, -0.012, 0.242]}>
          {/* Nose Bridge */}
          <mesh position={[0, 0.022, -0.008]} rotation={[0.25, 0, 0]} castShadow>
            <capsuleGeometry
              args={[
                faceProfile.noseStyle === 'petite' ? 0.014 : 0.018,
                faceProfile.noseStyle === 'bridge' ? 0.036 : 0.022,
                8,
                12
              ]}
            />
            <meshPhysicalMaterial color={skinColor} roughness={0.4} sheen={0.35} sheenColor="#ffd4c4" />
          </mesh>
          {/* Nose Tip */}
          <mesh
            position={[0, -0.006, 0.012]}
            scale={
              faceProfile.noseStyle === 'rounded'
                ? [1.22, 0.95, 1.05]
                : faceProfile.noseStyle === 'petite'
                  ? [0.85, 0.82, 0.92]
                  : [1.05, 0.88, 1.0]
            }
            castShadow
          >
            <sphereGeometry args={[0.029, 16, 16]} />
            <meshPhysicalMaterial color={skinColor} roughness={0.37} sheen={0.35} sheenColor="#ffd4c4" />
          </mesh>
        </group>

        {/* Soft Gradient Blush Cheeks (Procedural Radial Texture) */}
        {[-0.135, 0.135].map((cx, cIdx) => (
          <mesh
            key={cIdx}
            position={[cx, -0.044, 0.226]}
            rotation={[0, cx < 0 ? -0.35 : 0.35, 0]}
          >
            <planeGeometry args={[0.088, 0.062]} />
            <meshBasicMaterial
              color={cheekColor}
              map={blushMap ?? undefined}
              transparent
              opacity={0.55}
              depthWrite={false}
            />
          </mesh>
        ))}

        {/* Optional Nose & Cheek Freckles */}
        {faceProfile.hasFreckles && (
          <group position={[0, -0.022, 0.248]}>
            {[
              [-0.085, -0.012, -0.016],
              [-0.105, -0.022, -0.022],
              [-0.068, -0.022, -0.01],
              [0.085, -0.012, -0.016],
              [0.105, -0.022, -0.022],
              [0.068, -0.022, -0.01],
              [-0.015, 0.005, 0.006],
              [0.015, 0.004, 0.006]
            ].map(([fx, fy, fz], fIdx) => (
              <mesh key={fIdx} position={[fx, fy, fz]}>
                <sphereGeometry args={[0.0042, 6, 6]} />
                <meshBasicMaterial color="#b45309" transparent opacity={0.65} />
              </mesh>
            ))}
          </group>
        )}

        {/* Expressive Glossy Pixar Eyes with Variative Proportions & Lash Rims */}
        {[
          { x: -faceProfile.eyeSpacing, lidRef: leftEyelidRef, side: -1 },
          { x: faceProfile.eyeSpacing, lidRef: rightEyelidRef, side: 1 }
        ].map((eye, idx) => (
          <group
            key={idx}
            position={[eye.x, 0.042, 0.218]}
            rotation={[0, 0, eye.side * faceProfile.eyeTilt]}
            scale={[faceProfile.eyeScale[0], faceProfile.eyeScale[1], 1]}
          >
            {/* Upper Eyelash Rim for Depth */}
            <mesh position={[0, 0.014, 0.014]} rotation={[0.18, 0, 0]}>
              <torusGeometry args={[0.045, 0.0055, 8, 18, Math.PI]} />
              <meshStandardMaterial color={hairColor} roughness={0.5} />
            </mesh>
            {/* Sclera */}
            <mesh scale={[0.92, 1.16, 0.62]}>
              <sphereGeometry args={[0.048, 20, 20]} />
              <meshPhysicalMaterial color="#ffffff" roughness={0.12} clearcoat={0.4} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.022]} scale={[0.85, 1.05, 0.4]}>
              <sphereGeometry args={[0.031, 16, 16]} />
              <meshPhysicalMaterial color={irisColor} roughness={0.16} clearcoat={0.6} />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.032]} scale={[0.8, 1.0, 0.3]}>
              <sphereGeometry args={[0.018, 14, 14]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            {/* Glossy Corneal Specular Dome */}
            <mesh position={[0, 0, 0.015]} scale={[0.94, 1.18, 0.68]}>
              <sphereGeometry args={[0.048, 18, 18]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.08}
                roughness={0.03}
                clearcoat={1.0}
                clearcoatRoughness={0.03}
                ior={1.45}
                depthWrite={false}
              />
            </mesh>
            {/* Dual Specular Catchlights */}
            <mesh position={[0.012, 0.015, 0.04]}>
              <sphereGeometry args={[0.0085, 10, 10]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[-0.009, -0.011, 0.039]}>
              <sphereGeometry args={[0.0045, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Animated Eyelid */}
            <mesh ref={eye.lidRef} position={[0, 0.01, 0.005]} scale={[0.96, 0.05, 0.68]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhysicalMaterial color={skinColor} roughness={0.42} sheen={0.3} />
            </mesh>
          </group>
        ))}

        {/* Variative Expressive Eyebrows */}
        {(() => {
          const browRadius = faceProfile.browStyle === 'thick' ? 0.016 : 0.0115;
          const leftY = faceProfile.browStyle === 'curious-raised' ? 0.136 : 0.125;
          const rightY = faceProfile.browStyle === 'curious-raised' ? 0.12 : 0.125;
          const leftRot =
            faceProfile.browStyle === 'arched'
              ? 0.22
              : faceProfile.browStyle === 'gentle'
                ? 0.06
                : 0.12;
          const rightRot =
            faceProfile.browStyle === 'arched'
              ? -0.22
              : faceProfile.browStyle === 'gentle'
                ? -0.06
                : -0.12;
          return (
            <>
              <mesh position={[-faceProfile.eyeSpacing, leftY, 0.228]} rotation={[0, 0, leftRot]}>
                <capsuleGeometry args={[browRadius, 0.056, 8, 12]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.55} />
              </mesh>
              <mesh position={[faceProfile.eyeSpacing, rightY, 0.228]} rotation={[0, 0, rightRot]}>
                <capsuleGeometry args={[browRadius, 0.056, 8, 12]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.55} />
              </mesh>
            </>
          );
        })()}

        {/* Variative 3D Mouth Expressions (Big Laugh, Cheerful Grin, Warm Smile, Curious Smirk) */}
        <group ref={mouthRef} position={[0, -0.098, 0.228]}>
          {faceProfile.mouthStyle === 'big-laugh' && (
            <>
              {/* Dark Mouth Interior */}
              <mesh position={[0, -0.008, -0.002]} scale={[1.15, 0.9, 0.5]}>
                <sphereGeometry args={[0.044, 14, 14]} />
                <meshStandardMaterial color="#4c0519" roughness={0.5} />
              </mesh>
              {/* Upper Teeth Row */}
              <mesh position={[0, 0.012, 0.009]}>
                <capsuleGeometry args={[0.009, 0.048, 6, 10]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              {/* Sculpted Pink Tongue */}
              <mesh position={[0, -0.022, 0.009]} scale={[1.1, 0.6, 0.6]}>
                <sphereGeometry args={[0.022, 10, 10]} />
                <meshStandardMaterial color="#fb7185" roughness={0.35} />
              </mesh>
              {/* Outer Lip Rim */}
              <mesh rotation={[0.2, 0, Math.PI]}>
                <torusGeometry args={[0.05, 0.01, 10, 20, Math.PI]} />
                <meshStandardMaterial color="#9f1239" roughness={0.35} />
              </mesh>
            </>
          )}

          {faceProfile.mouthStyle === 'cheerful-grin' && (
            <>
              <mesh rotation={[0.2, 0, Math.PI]}>
                <torusGeometry args={[0.048, 0.011, 10, 20, Math.PI]} />
                <meshStandardMaterial color="#9f1239" roughness={0.35} />
              </mesh>
              <mesh position={[0, -0.006, 0.007]}>
                <capsuleGeometry args={[0.0095, 0.048, 6, 10]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
            </>
          )}

          {faceProfile.mouthStyle === 'warm-smile' && (
            <>
              <mesh rotation={[0.18, 0, Math.PI]}>
                <torusGeometry args={[0.042, 0.01, 10, 20, Math.PI]} />
                <meshStandardMaterial color="#be123c" roughness={0.35} />
              </mesh>
              {/* Subtle Lower Lip Contour */}
              <mesh position={[0, -0.028, 0.006]}>
                <capsuleGeometry args={[0.007, 0.024, 6, 8]} />
                <meshPhysicalMaterial color="#f43f5e" roughness={0.32} clearcoat={0.2} />
              </mesh>
            </>
          )}

          {faceProfile.mouthStyle === 'curious-smirk' && (
            <>
              <mesh position={[0.006, 0, 0]} rotation={[0.2, 0, Math.PI + 0.16]}>
                <torusGeometry args={[0.04, 0.01, 10, 18, Math.PI * 0.85]} />
                <meshStandardMaterial color="#9f1239" roughness={0.35} />
              </mesh>
            </>
          )}
        </group>

        {/* Round Spectacles for Kenji */}
        {headwearType === 'cap-glasses' && (
          <group position={[0, 0.042, 0.252]}>
            <mesh position={[-0.088, 0, 0]}>
              <torusGeometry args={[0.055, 0.008, 10, 24]} />
              <meshStandardMaterial color="#451a03" metalness={0.35} roughness={0.28} />
            </mesh>
            <mesh position={[0.088, 0, 0]}>
              <torusGeometry args={[0.055, 0.008, 10, 24]} />
              <meshStandardMaterial color="#451a03" metalness={0.35} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.04, 0.008, 0.008]} />
              <meshStandardMaterial color="#451a03" metalness={0.35} roughness={0.28} />
            </mesh>
          </group>
        )}

        {/* 5. SCULPTED HAIRSTYLES & CAPS (MATCHING ATTACHMENT REFERENCE) */}
        {headwearType === 'cap-bun' && (
          <group>
            {/* Smooth Brown Hair Base */}
            <mesh position={[0, 0.032, -0.038]} castShadow>
              <sphereGeometry args={[0.268, 26, 26]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} sheenRoughness={0.5} />
            </mesh>
            {/* Side Hair Sweeps */}
            {[-0.21, 0.21].map((hx, idx) => (
              <mesh key={idx} position={[hx, 0.02, 0.04]} rotation={[0.1, 0, hx < 0 ? 0.22 : -0.22]} castShadow>
                <capsuleGeometry args={[0.048, 0.12, 10, 14]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} />
              </mesh>
            ))}
            {/* Cute Back Hair Bun */}
            <group position={[0, 0.03, -0.295]}>
              <mesh castShadow>
                <sphereGeometry args={[0.095, 18, 18]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} />
              </mesh>
              <mesh position={[0, 0.01, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.062, 0.014, 10, 18]} />
                <meshStandardMaterial color="#dc2626" roughness={0.4} />
              </mesh>
            </group>
          </group>
        )}

        {headwearType === 'nordic-braids' && (
          <group>
            {/* Warm Ginger-Orange Hair Crown */}
            <mesh position={[0, 0.045, -0.032]} castShadow>
              <sphereGeometry args={[0.272, 28, 28]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} sheenRoughness={0.5} />
            </mesh>
            {/* Full Curved Front Bangs */}
            {[-0.12, -0.04, 0.04, 0.12].map((fx, fIdx) => (
              <mesh
                key={fIdx}
                position={[fx, 0.17, 0.208 - Math.abs(fx) * 0.25]}
                rotation={[0.35, 0, fx * -0.45]}
                castShadow
              >
                <capsuleGeometry args={[0.044, 0.085, 10, 14]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} />
              </mesh>
            ))}
            {/* Twin Articulated Braids */}
            {[-0.22, 0.22].map((bx, bIdx) => (
              <group
                key={bIdx}
                position={[bx, -0.08, 0.06]}
                rotation={[0.18, 0, bx < 0 ? 0.12 : -0.12]}
              >
                {[0, 1, 2, 3].map((seg) => (
                  <mesh
                    key={seg}
                    position={[0, -seg * 0.072, seg * 0.012]}
                    scale={[1 - seg * 0.08, 1, 1 - seg * 0.08]}
                    castShadow
                  >
                    <sphereGeometry args={[0.054, 14, 14]} />
                    <meshPhysicalMaterial color={hairColor} roughness={0.48} sheen={0.45} />
                  </mesh>
                ))}
                <mesh position={[0, -0.26, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.036, 0.012, 8, 16]} />
                  <meshStandardMaterial color={headwearAccent} roughness={0.35} />
                </mesh>
                <mesh position={[0, -0.32, 0.045]} rotation={[Math.PI, 0, 0]} castShadow>
                  <coneGeometry args={[0.038, 0.09, 12]} />
                  <meshPhysicalMaterial color={hairColor} roughness={0.48} />
                </mesh>
              </group>
            ))}
          </group>
        )}

        {headwearType === 'high-bun' && (
          <group>
            {/* Chestnut Hair Crown */}
            <mesh position={[0, 0.045, -0.03]} castShadow>
              <sphereGeometry args={[0.272, 28, 28]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.44} sheen={0.5} sheenRoughness={0.45} />
            </mesh>
            {/* Neat Curved Front Bangs */}
            {[-0.1, 0, 0.1].map((fx, fIdx) => (
              <mesh
                key={fIdx}
                position={[fx, 0.175, 0.208 - Math.abs(fx) * 0.15]}
                rotation={[0.32, 0, fx * -0.35]}
                castShadow
              >
                <capsuleGeometry args={[0.042, 0.08, 10, 14]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.44} sheen={0.5} />
              </mesh>
            ))}
            {/* Sculpted Top High Bun + Hair Tie */}
            <group position={[0, 0.31, -0.06]}>
              <mesh castShadow>
                <sphereGeometry args={[0.115, 20, 20]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.44} sheen={0.5} />
              </mesh>
              <mesh position={[0, -0.07, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.082, 0.016, 10, 20]} />
                <meshStandardMaterial color={headwearColor} roughness={0.35} />
              </mesh>
            </group>
            {/* Back Ponytail Tip */}
            <mesh position={[0, -0.1, -0.24]} rotation={[-0.25, 0, 0]} castShadow>
              <coneGeometry args={[0.065, 0.18, 14]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.46} sheen={0.45} />
            </mesh>
          </group>
        )}

        {(headwearType === 'cap-boy' || headwearType === 'cap-glasses') && (
          <group>
            <mesh position={[0, 0.02, -0.04]} castShadow>
              <sphereGeometry args={[0.268, 24, 24]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.55} sheen={0.35} />
            </mesh>
            {[-0.14, 0, 0.14].map((hx, idx) => (
              <mesh
                key={idx}
                position={[hx, 0.13, 0.19]}
                rotation={[0.3, 0, idx * 0.2]}
                castShadow
              >
                <sphereGeometry args={[0.066, 14, 14]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.55} />
              </mesh>
            ))}
          </group>
        )}

        {/* Shared Baseball Cap Shell (for Aisyah, Mateo, Kenji) */}
        {hasCap && (
          <group>
            {/* Cap Crown Dome */}
            <mesh position={[0, 0.11, -0.01]} castShadow>
              <sphereGeometry args={[0.278, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.54]} />
              <meshPhysicalMaterial
                color={headwearColor}
                roughness={0.58}
                sheen={0.45}
                sheenRoughness={0.8}
              />
            </mesh>
            {/* Curved Visor Brim */}
            <mesh position={[0, 0.138, 0.235]} rotation={[0.16, 0, 0]} scale={[1.15, 0.22, 0.85]} castShadow>
              <cylinderGeometry args={[0.16, 0.18, 0.1, 22]} />
              <meshPhysicalMaterial color={headwearAccent} roughness={0.55} sheen={0.4} />
            </mesh>
            {/* Top Cap Button */}
            <mesh position={[0, 0.388, -0.01]}>
              <sphereGeometry args={[0.026, 12, 12]} />
              <meshPhysicalMaterial color={headwearAccent} roughness={0.4} />
            </mesh>
          </group>
        )}

        {headwearType === 'afro-puffs' && (
          <group>
            <mesh position={[0, 0.06, -0.03]} castShadow>
              <sphereGeometry args={[0.275, 24, 24]} />
              <meshPhysicalMaterial color={hairColor} roughness={0.78} sheen={0.35} />
            </mesh>
            {[
              [-0.22, 0.22, -0.02, 0.135],
              [0.22, 0.22, -0.02, 0.135],
              [-0.12, 0.28, 0.06, 0.11],
              [0.12, 0.28, 0.06, 0.11],
              [0, 0.3, -0.04, 0.12],
              [-0.18, 0.15, 0.14, 0.08],
              [0.18, 0.15, 0.14, 0.08],
              [-0.08, 0.21, 0.18, 0.075],
              [0.08, 0.21, 0.18, 0.075]
            ].map(([cx, cy, cz, r], idx) => (
              <mesh key={idx} position={[cx, cy, cz]} castShadow>
                <sphereGeometry args={[r, 16, 16]} />
                <meshPhysicalMaterial color={hairColor} roughness={0.78} sheen={0.35} />
              </mesh>
            ))}
            <mesh position={[-0.18, 0.18, 0.02]} rotation={[0, 0, 0.6]}>
              <torusGeometry args={[0.07, 0.018, 10, 18]} />
              <meshStandardMaterial color={headwearAccent} roughness={0.35} />
            </mesh>
            <mesh position={[0.18, 0.18, 0.02]} rotation={[0, 0, -0.6]}>
              <torusGeometry args={[0.07, 0.018, 10, 18]} />
              <meshStandardMaterial color={headwearAccent} roughness={0.35} />
            </mesh>
          </group>
        )}
      </group>

      {/* 6. CONTEXTUAL MICRO-GLASS CHARACTER PILL */}
      {showCharacterPill && (
        <Html position={[0, 1.86, 0]} center distanceFactor={5.5}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              selectCharacter(id);
            }}
            className={`pointer-events-auto cursor-pointer ${
              isNarratingThisCharacter ? 'spatial-pill spatial-pill-speaking' : 'spatial-pill'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isNarratingThisCharacter ? 'animate-ping bg-amber-300' : ''
              }`}
              style={{ backgroundColor: isNarratingThisCharacter ? '#fde047' : badgeColor }}
            />
            <span>{cleanName}</span>
            {isNarratingThisCharacter && (
              <span className="text-[9px] text-amber-300 font-extrabold">
                {language === 'id' ? '· 🎙️ Bicara' : '· 🎙️ Live'}
              </span>
            )}
          </button>
        </Html>
      )}
    </group>
  );
}

export function GlobalFriendsEnsemble({ isSleeping }: { isSleeping: boolean }) {
  return (
    <group>
      {/* 1. Mateo — Yellow Cap, Yellow/Red Striped Tee, Charcoal Joggers, Red High-Tops */}
      <StylizedChildRig
        id="mateo"
        name="Mateo (BR)"
        badgeColor="#f59e0b"
        position={[1.7, 0.05, 0.55]}
        rotationY={-0.55}
        skinColor="#d49466"
        cheekColor="#fb7185"
        irisColor="#451a03"
        faceProfile={{
          headScale: [1.02, 1.03, 0.98],
          jawScale: [1.02, 0.85, 0.92],
          chinY: -0.072,
          eyeSpacing: 0.088,
          eyeScale: [1.0, 1.0],
          eyeTilt: 0,
          noseStyle: 'rounded',
          browStyle: 'thick',
          mouthStyle: 'big-laugh'
        }}
        headwearType="cap-boy"
        headwearColor="#facc15"
        headwearAccent="#eab308"
        hairColor="#27170c"
        topColor="#facc15"
        topStripeColor="#ef4444"
        bottomType="pants"
        bottomColor="#374151"
        shoeColor="#dc2626"
        backpackColor="#16a34a"
        heldItem="guitar"
        hotspotId="hotspot-guitar"
        isSleeping={isSleeping}
      />

      {/* 2. Sofia — Ginger Braids, White Tee, Teal Shorts, Red Backpack, Mustard Sneakers */}
      <StylizedChildRig
        id="sofia"
        name="Sofia (EU)"
        badgeColor="#8b5cf6"
        position={[-2.1, 0.05, 0.2]}
        rotationY={0.75}
        skinColor="#f7d3ba"
        cheekColor="#fda4af"
        irisColor="#0284c7"
        faceProfile={{
          headScale: [0.97, 1.05, 0.97],
          jawScale: [0.92, 0.84, 0.88],
          chinY: -0.076,
          eyeSpacing: 0.086,
          eyeScale: [1.06, 1.08],
          eyeTilt: 0.04,
          noseStyle: 'petite',
          browStyle: 'arched',
          mouthStyle: 'cheerful-grin',
          hasFreckles: true
        }}
        headwearType="nordic-braids"
        headwearColor="#dc2626"
        headwearAccent="#ef4444"
        hairColor="#d97706"
        topColor="#f8fafc"
        bottomType="shorts"
        bottomColor="#0d9488"
        shoeColor="#eab308"
        backpackColor="#dc2626"
        heldItem="notebook"
        hotspotId="hotspot-soil"
        isSleeping={isSleeping}
      />

      {/* 3. Mei-Ling — High Bun + Bangs, White Tee, Red Athletic Shorts, Blue Backpack, Red Sneakers */}
      <StylizedChildRig
        id="mei"
        name="Mei-Ling (AS)"
        badgeColor="#f97316"
        position={[2.2, 0.05, -0.35]}
        rotationY={-0.85}
        skinColor="#f3c6a0"
        cheekColor="#fb7185"
        irisColor="#1e293b"
        faceProfile={{
          headScale: [1.0, 1.02, 0.96],
          jawScale: [0.9, 0.82, 0.86],
          chinY: -0.074,
          eyeSpacing: 0.09,
          eyeScale: [1.02, 0.94],
          eyeTilt: 0.08,
          noseStyle: 'petite',
          browStyle: 'gentle',
          mouthStyle: 'warm-smile'
        }}
        headwearType="high-bun"
        headwearColor="#dc2626"
        headwearAccent="#2563eb"
        hairColor="#7c2d12"
        topColor="#f8fafc"
        bottomType="shorts"
        bottomColor="#dc2626"
        bottomTrimColor="#facc15"
        shoeColor="#e11d48"
        backpackColor="#2563eb"
        heldItem="flower-basket"
        hotspotId="hotspot-soil"
        isSleeping={isSleeping}
      />

      {/* 4. Kenji — Explorer Cap & Glasses, Lime Jacket, Blue Pants, Brown Sneakers */}
      <StylizedChildRig
        id="kenji"
        name="Kenji (JP)"
        badgeColor="#0284c7"
        position={[-1.15, 0.05, -1.15]}
        rotationY={0.35}
        skinColor="#f1c29b"
        cheekColor="#fda4af"
        irisColor="#1e293b"
        faceProfile={{
          headScale: [0.98, 1.04, 0.98],
          jawScale: [0.95, 0.85, 0.9],
          chinY: -0.075,
          eyeSpacing: 0.088,
          eyeScale: [0.96, 0.98],
          eyeTilt: -0.02,
          noseStyle: 'bridge',
          browStyle: 'curious-raised',
          mouthStyle: 'curious-smirk'
        }}
        headwearType="cap-glasses"
        headwearColor="#facc15"
        headwearAccent="#ca8a04"
        hairColor="#1e1b18"
        topColor="#fda4af"
        outerwearColor="#84cc16"
        bottomType="pants"
        bottomColor="#2563eb"
        shoeColor="#78350f"
        backpackColor="#1e293b"
        heldItem="magnifying-glass"
        hotspotId="hotspot-soil"
        isSleeping={isSleeping}
      />

      {/* 5. Amara — Curly Afro Puffs, Pink Polo, Pastel Skirt, Blue Backpack, Blue High-Tops */}
      <StylizedChildRig
        id="amara"
        name="Amara (NG)"
        badgeColor="#ec4899"
        position={[1.05, 0.05, -1.2]}
        rotationY={-0.3}
        skinColor="#8d5531"
        cheekColor="#e11d48"
        irisColor="#27170c"
        faceProfile={{
          headScale: [1.01, 1.05, 0.99],
          jawScale: [0.98, 0.86, 0.94],
          chinY: -0.072,
          eyeSpacing: 0.092,
          eyeScale: [1.08, 1.06],
          eyeTilt: 0.03,
          noseStyle: 'button',
          browStyle: 'expressive',
          mouthStyle: 'big-laugh'
        }}
        headwearType="afro-puffs"
        headwearColor="#4a2c1d"
        headwearAccent="#0284c7"
        hairColor="#4a2c1d"
        topColor="#f472b6"
        topStripeColor="#fbcfe8"
        bottomType="skirt"
        bottomColor="#fbcfe8"
        shoeColor="#1d4ed8"
        backpackColor="#0284c7"
        heldItem="tea-jar"
        hotspotId="hotspot-soil"
        isSleeping={isSleeping}
      />
    </group>
  );
}
