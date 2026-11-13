import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Sprout, Music, Sun, Heart, Star, Droplet, ShoppingBag } from 'lucide-react';
import { useStoryStore } from '../../../stores/storyStore';
import type { SelectableCharacterId } from '../../../types/story';
import { soundEngine } from '../../../services/audioEngine';
import { createProceduralGrassTexture } from '../textures/proceduralTextures';

export function RusticFarmWell() {
  const refillWater = useStoryStore((s) => s.refillWater);
  const isSleeping = useStoryStore((s) => s.activeMode === 'sleeping');
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const language = useStoryStore((s) => s.language);
  const waterRef = useRef<THREE.Mesh>(null);
  const [splashed, setSplashed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (waterRef.current) {
      const t = state.clock.getElapsedTime();
      const ripple = 1 + Math.sin(t * 3) * 0.04;
      waterRef.current.scale.set(ripple, ripple, 1);
    }
  });

  const handleRefill = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    refillWater();
    setSplashed(true);
    setTimeout(() => setSplashed(false), 900);
  };

  return (
    <group
      position={[-2.1, 0, -1.2]}
      onClick={handleRefill}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.54, 0.6, 16]} />
        <meshStandardMaterial color={isSleeping ? '#475569' : '#64748b'} roughness={0.8} />
      </mesh>

      <mesh ref={waterRef} position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 16]} />
        <meshStandardMaterial color={splashed ? '#38bdf8' : '#0284c7'} roughness={0.1} metalness={0.7} />
      </mesh>

      <mesh position={[-0.42, 0.9, 0]} castShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>
      <mesh position={[0.42, 0.9, 0]} castShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>

      <mesh position={[0, 1.35, 0]} castShadow>
        <boxGeometry args={[1.0, 0.08, 0.1]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>

      <mesh position={[0, 1.6, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.75, 0.45, 4]} />
        <meshStandardMaterial color={isSleeping ? '#312e81' : '#b45309'} roughness={0.5} />
      </mesh>

      <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.45, 12]} />
        <meshStandardMaterial color="#d97706" roughness={0.9} />
      </mesh>

      {(hovered || splashed || showSceneLabels) && (
        <Html position={[0, 1.98, 0]} center distanceFactor={5.8}>
          <button
            type="button"
            onClick={handleRefill}
            className={`pointer-events-auto cursor-pointer ${splashed ? 'spatial-pill spatial-pill-action' : 'spatial-pill'
              }`}
          >
            <Droplet size={10} className="text-sky-400 fill-current" />
            <span>
              {splashed
                ? language === 'id'
                  ? 'Segar! +25'
                  : 'Refilled! +25'
                : language === 'id'
                  ? 'Sumur Air'
                  : 'Water Well'}
            </span>
          </button>
        </Html>
      )}
    </group>
  );
}

export function ShippingBin() {
  const harvestCount = useStoryStore((s) => s.harvestCount);
  const openHotspot = useStoryStore((s) => s.openHotspot);
  const isSleeping = useStoryStore((s) => s.activeMode === 'sleeping');
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const language = useStoryStore((s) => s.language);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={[2.1, 0, -1.1]}
      onClick={(e) => {
        e.stopPropagation();
        openHotspot('hotspot-soil');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.64, 0.65]} />
        <meshStandardMaterial color={isSleeping ? '#581c87' : '#b91c1c'} roughness={0.5} />
      </mesh>

      {[-0.38, 0.38].map((x, i) => (
        <mesh key={i} position={[x, 0.32, 0]} castShadow>
          <boxGeometry args={[0.08, 0.66, 0.67]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
      ))}

      <mesh position={[0, 0.66, 0]} castShadow>
        <boxGeometry args={[0.86, 0.08, 0.7]} />
        <meshStandardMaterial color="#7f1d1d" roughness={0.4} />
      </mesh>

      {harvestCount > 0 && (
        <group position={[0, 0.75, 0]}>
          {[-0.15, 0, 0.15].map((x, idx) => (
            <mesh key={idx} position={[x, 0, idx % 2 === 0 ? 0.06 : -0.06]} castShadow>
              <sphereGeometry args={[0.09, 8, 8]} />
              <meshStandardMaterial color="#f97316" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}

      {(hovered || showSceneLabels) && (
        <Html position={[0, 1.08, 0]} center distanceFactor={5.8}>
          <div className="spatial-pill pointer-events-none">
            <ShoppingBag size={10} className="text-amber-400" />
            <span>
              {language === 'id' ? 'Peti Panen' : 'Harvest Bin'} ({harvestCount})
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function FarmChicken() {
  const meshRef = useRef<THREE.Group>(null);
  const [clucked, setClucked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const angle = t * 0.35;
    meshRef.current.position.x = 1.6 + Math.cos(angle) * 0.55;
    meshRef.current.position.z = 1.1 + Math.sin(angle) * 0.45;
    meshRef.current.rotation.y = -angle + Math.PI / 2;
    const peckCycle = Math.sin(t * 1.6);
    const isPecking = peckCycle > 0.85;
    meshRef.current.rotation.x = isPecking ? 0.35 : 0;
    meshRef.current.position.y = 0.22 + Math.abs(Math.sin(t * 4.5)) * 0.04;
  });

  const handleCluck = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundEngine.playSFX('cluck');
    setClucked(true);
    setTimeout(() => setClucked(false), 1200);
  };

  return (
    <group ref={meshRef} onClick={handleCluck}>
      <mesh castShadow position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.22, 0.05]} castShadow>
        <coneGeometry args={[0.04, 0.08, 6]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      <mesh position={[0, 0.12, 0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.03, 0.08, 6]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {[-0.14, 0.14].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.08, 0]}
          rotation={[0, 0, (i === 0 ? -1 : 1) * (clucked ? 0.6 : 0.2)]}
        >
          <boxGeometry args={[0.04, 0.08, 0.14]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}

      {clucked && (
        <Html position={[0, 0.4, 0]} center distanceFactor={6}>
          <div className="bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full shadow-lg animate-bounce flex items-center gap-1">
            <Heart size={10} className="fill-current" />
            <span>Petok! ♥</span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function FarmFenceAndPaths() {
  const isSleeping = useStoryStore((s) => s.activeMode === 'sleeping');
  const fenceColor = isSleeping ? '#475569' : '#fef08a';

  return (
    <group position={[0, 0.05, 0]}>
      {[-1.8, -1.2, -0.6, 0.6, 1.2, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.24, -1.7]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.48, 0.08]} />
            <meshStandardMaterial color={fenceColor} roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[-1.2, 0.36, -1.7]} castShadow>
        <boxGeometry args={[1.3, 0.05, 0.04]} />
        <meshStandardMaterial color={fenceColor} roughness={0.6} />
      </mesh>
      <mesh position={[1.2, 0.36, -1.7]} castShadow>
        <boxGeometry args={[1.3, 0.05, 0.04]} />
        <meshStandardMaterial color={fenceColor} roughness={0.6} />
      </mesh>

      {[-0.8, -0.4, 0, 0.4, 0.8].map((z, idx) => (
        <mesh key={idx} position={[0, 0.08, 1.35 + z * 0.35]} receiveShadow>
          <boxGeometry args={[0.34, 0.03, 0.24]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function CharacterWaypointBeacon() {
  const selectedCharacter = useStoryStore((s) => s.selectedCharacter);
  const target = useStoryStore((s) => s.characterTargets[s.selectedCharacter]);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();
      const pulse = 0.85 + Math.sin(t * 5) * 0.15;
      ringRef.current.scale.set(pulse, pulse, 1);
      ringRef.current.rotation.z = t * 1.2;
    }
  });

  const colorMap: Record<SelectableCharacterId, string> = {
    aisyah: '#10b981',
    mateo: '#f59e0b',
    sofia: '#8b5cf6',
    mei: '#f97316',
    kenji: '#0284c7',
    amara: '#ec4899'
  };

  return (
    <group position={[target[0], 0.06, target[2]]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.24, 24]} />
        <meshBasicMaterial color={colorMap[selectedCharacter]} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

export function IslandBase({ isSleeping }: { isSleeping: boolean }) {
  const grassTex = useMemo(() => createProceduralGrassTexture(), []);
  const moveSelectedCharacterTo = useStoryStore((s) => s.moveSelectedCharacterTo);
  const isDraggingCharacter = useStoryStore((s) => s.isDraggingCharacter);
  const setIsDraggingCharacter = useStoryStore((s) => s.setIsDraggingCharacter);

  const handleGroundPoint = (worldPoint: THREE.Vector3) => {
    const localX = worldPoint.x - 0.15;
    const localZ = worldPoint.z - 0.15;
    moveSelectedCharacterTo([localX, 0.05, localZ]);
  };

  return (
    <group position={[0, -0.55, 0]}>
      {isDraggingCharacter && (
        <mesh
          position={[0, 0.62, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerMove={(e) => {
            e.stopPropagation();
            handleGroundPoint(e.point);
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            setIsDraggingCharacter(false);
          }}
        >
          <planeGeometry args={[14, 14]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      <mesh
        receiveShadow
        position={[0, 0.45, 0]}
        onClick={(e) => {
          e.stopPropagation();
          soundEngine.playSFX('tap');
          handleGroundPoint(e.point);
        }}
        onPointerUp={() => {
          if (isDraggingCharacter) setIsDraggingCharacter(false);
        }}
      >
        <cylinderGeometry args={[3.2, 3.4, 0.3, 32]} />
        <meshStandardMaterial
          map={isSleeping ? undefined : grassTex}
          color={isSleeping ? '#143825' : '#65c428'}
          roughness={isSleeping ? 0.8 : 0.35}
        />
      </mesh>

      <mesh receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[3.4, 2.6, 0.65, 24]} />
        <meshStandardMaterial color={isSleeping ? '#1c1917' : '#573016'} roughness={0.9} />
      </mesh>

      {[-2.2, -1.8, 1.9, 2.3].map((x, i) => (
        <group key={i} position={[x, 0.62, i % 2 === 0 ? 0.9 : -0.7]}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#facc15" />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.08, 6]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DriftingClouds({ isSleeping }: { isSleeping: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudData = useMemo(
    () => [
      { x: -3.5, y: 3.2, z: -2.5, speed: 0.12, scale: 0.75 },
      { x: 0.5, y: 3.6, z: -3.2, speed: 0.09, scale: 0.9 },
      { x: 3.8, y: 3.0, z: -1.8, speed: 0.14, scale: 0.65 }
    ],
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const isNarrating = useStoryStore.getState().isPlaying;
    const mult = isNarrating ? 2.2 : 1.0;
    groupRef.current.children.forEach((child, i) => {
      const c = cloudData[i];
      if (c) {
        child.position.x += c.speed * mult * delta;
        if (child.position.x > 6) {
          child.position.x = -6;
        }
      }
    });
  });

  const cloudColor = isSleeping ? '#312e81' : '#ffffff';
  const cloudOpacity = isSleeping ? 0.6 : 0.9;

  return (
    <group ref={groupRef}>
      {cloudData.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial
              color={cloudColor}
              transparent
              opacity={cloudOpacity}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.45, -0.05, 0]}>
            <sphereGeometry args={[0.45, 8, 8]} />
            <meshStandardMaterial
              color={cloudColor}
              transparent
              opacity={cloudOpacity}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[-0.45, -0.08, 0]}>
            <sphereGeometry args={[0.42, 8, 8]} />
            <meshStandardMaterial
              color={cloudColor}
              transparent
              opacity={cloudOpacity}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.1, 0.35, 0]}>
            <sphereGeometry args={[0.38, 8, 8]} />
            <meshStandardMaterial
              color={cloudColor}
              transparent
              opacity={cloudOpacity}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function AmbientParticles({ isSleeping }: { isSleeping: boolean }) {
  const count = isSleeping ? 45 : 30;
  const particles = useMemo(() => {
    const temp: Array<{ x: number; y: number; z: number; speed: number; offset: number }> = [];
    for (let i = 0; i < count; i++) {
      const pseudo = (seed: number) => {
        const val = Math.sin(i * 12.9898 + seed) * 43758.5453;
        return val - Math.floor(val);
      };
      temp.push({
        x: (pseudo(1) - 0.5) * 6,
        y: 0.5 + pseudo(2) * 3,
        z: (pseudo(3) - 0.5) * 6,
        speed: 0.5 + pseudo(4) * 1.5,
        offset: pseudo(5) * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const isNarrating = useStoryStore.getState().isPlaying;
    const amp = isNarrating ? 0.42 : 0.25;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (p) {
        child.position.y =
          p.y + Math.sin(t * p.speed * (isNarrating ? 1.5 : 1) + p.offset) * amp;
        child.position.x = p.x + Math.cos(t * (isNarrating ? 1.1 : 0.5) + p.offset) * 0.22;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[isSleeping ? 0.035 : 0.02, 6, 6]} />
          <meshBasicMaterial
            color={isSleeping ? '#fbbf24' : '#ffffff'}
            transparent
            opacity={isSleeping ? 0.9 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HotspotPin({
  id,
  position,
  iconType,
  title
}: {
  id: string;
  position: [number, number, number];
  iconType: string;
  title: string;
}) {
  const openHotspot = useStoryStore((s) => s.openHotspot);
  const activeMode = useStoryStore((s) => s.activeMode);
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const [hovered, setHovered] = useState(false);

  if (activeMode === 'sleeping') return null;

  const elevatedPos: [number, number, number] = [position[0], position[1] + 0.28, position[2]];

  return (
    <group position={elevatedPos}>
      <Html center distanceFactor={5.8}>
        <div
          className="relative flex flex-col items-center pointer-events-auto"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {(hovered || showSceneLabels) && (
            <div className="spatial-pill mb-1 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{title}</span>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openHotspot(id);
            }}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/85 backdrop-blur-md text-emerald-700 shadow-md border border-white/90 hover:bg-white hover:scale-115 transition-all duration-200 cursor-pointer ring-1 ring-emerald-500/30"
            title={title}
            aria-label={title}
          >
            {iconType === 'sparkles' && <Sparkles size={13} />}
            {iconType === 'sprout' && <Sprout size={13} />}
            {iconType === 'music' && <Music size={13} />}
            {iconType === 'sun' && <Sun size={13} />}
            {iconType === 'heart' && <Heart size={13} />}
            {iconType === 'book' && <Star size={13} />}
          </button>
        </div>
      </Html>
    </group>
  );
}

export function CollectibleStars3D() {
  const activeMode = useStoryStore((s) => s.activeMode);
  const collectedStars = useStoryStore((s) => s.collectedStars);
  const collectStar = useStoryStore((s) => s.collectStar);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  const starPositions: Array<{ id: string; pos: [number, number, number] }> = useMemo(
    () => [
      { id: 'star-well', pos: [-2.1, 2.25, -1.2] },
      { id: 'star-garden', pos: [0, 1.55, 0] },
      { id: 'star-bin', pos: [2.1, 1.5, -1.1] }
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      child.rotation.y = t * 1.8 + idx;
      if (starPositions[idx]) {
        child.position.y = starPositions[idx].pos[1] + Math.sin(t * 2.5 + idx) * 0.12;
      }
    });
  });

  if (activeMode !== 'playing') return null;

  return (
    <group ref={groupRef}>
      {starPositions.map((st) => {
        const isCollected = collectedStars.includes(st.id);
        if (isCollected) return null;
        const isHovered = hoveredStar === st.id;
        return (
          <group
            key={st.id}
            position={st.pos}
            onClick={(e) => {
              e.stopPropagation();
              collectStar(st.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredStar(st.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredStar(null);
              document.body.style.cursor = 'auto';
            }}
          >
            <mesh castShadow scale={isHovered ? 1.25 : 1}>
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial
                color="#facc15"
                emissive="#f59e0b"
                emissiveIntensity={isHovered ? 0.85 : 0.45}
                roughness={0.2}
                metalness={0.5}
              />
            </mesh>
            {isHovered && (
              <Html position={[0, 0.32, 0]} center distanceFactor={5.6}>
                <div className="spatial-pill spatial-pill-action pointer-events-none">
                  <Star size={10} className="fill-current" />
                  <span>+1 ★</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
