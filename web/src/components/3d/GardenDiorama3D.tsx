import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useStoryStore } from '../../stores/storyStore';
import { HarvestMoonCropGrid } from './actors/BotanicalBuddy3D';
import { GlobalFriendsEnsemble } from './actors/StylizedChildRig3D';
import {
  RusticFarmWell,
  ShippingBin,
  FarmChicken,
  FarmFenceAndPaths,
  CharacterWaypointBeacon,
  IslandBase,
  DriftingClouds,
  AmbientParticles,
  HotspotPin,
  CollectibleStars3D
} from './environment/FarmProps3D';
import {
  MontessoriDioramaRoom,
  SanctuaryZooCorner3D,
  PrayerSanctuaryRug3D
} from './environment/MontessoriDioramaRoom3D';

export const GardenDiorama3D: React.FC = () => {
  const activeMode = useStoryStore((s) => s.activeMode);
  const currentScene = useStoryStore((s) => s.currentScene);
  const language = useStoryStore((s) => s.language);
  const isDraggingCharacter = useStoryStore((s) => s.isDraggingCharacter);
  const setIsDraggingCharacter = useStoryStore((s) => s.setIsDraggingCharacter);
  const isSleeping = activeMode === 'sleeping';
  const isPlaying = activeMode === 'playing';

  const ambientColor = isSleeping ? '#ffb74d' : isPlaying ? '#fef3c7' : '#fff8eb';
  const ambientIntensity = isSleeping ? 0.55 : isPlaying ? 1.35 : 1.25;
  const dirColor = isSleeping ? '#f59e0b' : isPlaying ? '#fde68a' : '#ffedd5';
  const dirIntensity = isSleeping ? 0.65 : isPlaying ? 1.65 : 1.45;

  return (
    <div
      className="relative w-full h-full min-h-[340px] overflow-hidden transition-all duration-700"
      onPointerUp={() => {
        if (isDraggingCharacter) setIsDraggingCharacter(false);
      }}
      onPointerLeave={() => {
        if (isDraggingCharacter) setIsDraggingCharacter(false);
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [4.6, 4.7, 5.8], fov: 36 }}
        onPointerMissed={() => {
          if (isDraggingCharacter) setIsDraggingCharacter(false);
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          powerPreference: 'high-performance'
        }}
      >
        <color
          attach="background"
          args={[isSleeping ? '#0d1324' : isPlaying ? '#f2e3cc' : '#ebe0ce']}
        />

        {/* Procedural Studio/Sky IBL Reflections (Zero Network Fetch) */}
        <Environment resolution={256} frames={1} environmentIntensity={isSleeping ? 0.35 : 0.65}>
          <Lightformer
            form="rect"
            intensity={2.2}
            color={isSleeping ? '#93c5fd' : '#fffbeb'}
            position={[0, 8, 4]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[14, 14, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.5}
            color="#fef3c7"
            position={[-6, 4, -4]}
            scale={6}
          />
          <Lightformer
            form="rect"
            intensity={0.9}
            color={isSleeping ? '#312e81' : '#dcfce7'}
            position={[0, -4, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[16, 16, 1]}
          />
        </Environment>

        {/* Three-Point Sun & Sky Hemisphere Lighting */}
        <ambientLight intensity={ambientIntensity * 0.65} color={ambientColor} />
        <hemisphereLight
          intensity={isSleeping ? 0.35 : 0.75}
          color={isSleeping ? '#818cf8' : '#fffbeb'}
          groundColor={isSleeping ? '#0f172a' : '#d6d3d1'}
        />
        <directionalLight
          position={[6, 9, 5]}
          intensity={dirIntensity}
          color={dirColor}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-normalBias={0.02}
          shadow-bias={-0.0001}
        />
        {/* Rim Backlight for Pixar-Style Character Separation */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={isSleeping ? 0.55 : 0.65}
          color={isSleeping ? '#818cf8' : '#fde68a'}
        />

        {/* Atmospheric Floating Pollen / Fireflies */}
        <AmbientParticles isSleeping={isSleeping} />

        {/* Drifting Stylized Clouds */}
        <DriftingClouds isSleeping={isSleeping} />

        {/* Montessori Isometric Cutaway Classroom Enclosure & Toy Sandbox */}
        <MontessoriDioramaRoom isSleeping={isSleeping} />

        {/* Central PopCap/PvZ Checkerboard Lawn & Botanical Buddy Garden Island */}
        <Float speed={0.85} rotationIntensity={0.015} floatIntensity={0.06}>
          <group position={[0.15, -0.05, 0.15]}>
            <IslandBase isSleeping={isSleeping} />
            <CharacterWaypointBeacon />
            <FarmFenceAndPaths />
            <RusticFarmWell />
            <ShippingBin />
            <HarvestMoonCropGrid />
            <FarmChicken />
            <SanctuaryZooCorner3D isSleeping={isSleeping} />
            <PrayerSanctuaryRug3D isSleeping={isSleeping} />
            <GlobalFriendsEnsemble isSleeping={isSleeping} />
            <CollectibleStars3D />

            {/* Educational Scene Hotspots */}
            {currentScene.hotspots.map((hs) => (
              <HotspotPin
                key={hs.id}
                id={hs.id}
                position={hs.position3D}
                iconType={hs.icon}
                title={hs.title[language]}
              />
            ))}
          </group>
        </Float>

        {/* Diorama Ambient Contact Shadow */}
        <ContactShadows
          position={[0, -0.52, 0]}
          opacity={isSleeping ? 0.45 : 0.6}
          scale={11}
          blur={2.2}
          far={4.0}
          color="#2c1e14"
        />

        {/* Child-Safe Constrained Isometric Diorama Camera Controls */}
        <OrbitControls
          enabled={!isDraggingCharacter}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.35}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 2.2}
          minDistance={4.8}
          maxDistance={10.5}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
};
