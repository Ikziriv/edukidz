import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Truck, MonitorPlay } from 'lucide-react';
import { useStoryStore } from '../../../stores/storyStore';
import { soundEngine } from '../../../services/audioEngine';

export function MontessoriDioramaRoom({ isSleeping }: { isSleeping: boolean }) {
  const openHotspot = useStoryStore((s) => s.openHotspot);
  const triggerCharacterAction = useStoryStore((s) => s.triggerCharacterAction);
  const activeMode = useStoryStore((s) => s.activeMode);
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const language = useStoryStore((s) => s.language);

  const sunGearRef = useRef<THREE.Group>(null);
  const cogGearRef = useRef<THREE.Group>(null);
  const truckLeftRef = useRef<THREE.Group>(null);
  const truckRightRef = useRef<THREE.Group>(null);

  const [truckBeep, setTruckBeep] = useState<'left' | 'right' | null>(null);
  const [boardPulse, setBoardPulse] = useState(false);
  const [boardHovered, setBoardHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const isNarrating = useStoryStore.getState().isPlaying;
    const speedBoost = isNarrating ? 2.4 : 1.0;

    if (sunGearRef.current) {
      sunGearRef.current.rotation.z = t * 0.35 * speedBoost;
    }
    if (cogGearRef.current) {
      cogGearRef.current.rotation.z = -t * 0.45 * speedBoost;
    }
    if (truckLeftRef.current) {
      const bounce =
        truckBeep === 'left'
          ? Math.abs(Math.sin(t * 18)) * 0.14
          : isNarrating
            ? Math.abs(Math.sin(t * 6.5)) * 0.035
            : 0;
      truckLeftRef.current.position.y = -0.52 + bounce;
      truckLeftRef.current.position.x =
        -3.05 + Math.sin(t * (isNarrating ? 1.45 : 0.8)) * (isNarrating ? 0.32 : 0.08);
    }
    if (truckRightRef.current) {
      const bounce =
        truckBeep === 'right'
          ? Math.abs(Math.sin(t * 18)) * 0.14
          : isNarrating
            ? Math.abs(Math.cos(t * 6.5)) * 0.035
            : 0;
      truckRightRef.current.position.y = -0.52 + bounce;
      truckRightRef.current.position.z =
        2.95 + Math.cos(t * (isNarrating ? 1.45 : 0.8)) * (isNarrating ? 0.32 : 0.08);
    }
  });

  const wallColor = isSleeping ? '#1e263d' : '#f3e5d0';
  const trimWood = isSleeping ? '#3b2d22' : '#c89f70';
  const shelfWood = isSleeping ? '#2c221b' : '#dfbe95';
  const trayFloor = isSleeping ? '#141b2e' : '#e6d5bc';

  const blockPalette = ['#ef4444', '#f59e0b', '#38bdf8', '#22c55e', '#f472b6', '#a855f7'];

  const handleTruckClick = (side: 'left' | 'right', e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundEngine.playSFX('tap');
    setTruckBeep(side);
    setTimeout(() => setTruckBeep(null), 900);
  };

  const handleSmartboardClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundEngine.playSFX('chime');
    setBoardPulse(true);
    const state = useStoryStore.getState();
    state.setActiveTool('study-book');
    triggerCharacterAction('sofia');
    const studyHs =
      state.currentScene.hotspots.find(
        (h) =>
          h.id.includes('smartboard') || h.id.includes('encyclopedia') || h.id.includes('zoology')
      )?.id ??
      state.currentScene.hotspots[0]?.id ??
      'hotspot-soil';
    openHotspot(studyHs);
    setTimeout(() => setBoardPulse(false), 900);
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Outer Maple Sandbox Tray Floor Base */}
      <mesh receiveShadow position={[0, -0.62, 0]}>
        <boxGeometry args={[8.4, 0.18, 8.4]} />
        <meshStandardMaterial color={trayFloor} roughness={0.75} />
      </mesh>
      <mesh receiveShadow castShadow position={[0, -0.48, 4.12]}>
        <boxGeometry args={[8.4, 0.22, 0.16]} />
        <meshStandardMaterial color={trimWood} roughness={0.6} />
      </mesh>
      <mesh receiveShadow castShadow position={[4.12, -0.48, 0]}>
        <boxGeometry args={[0.16, 0.22, 8.4]} />
        <meshStandardMaterial color={trimWood} roughness={0.6} />
      </mesh>
      <mesh receiveShadow castShadow position={[0, -0.48, -4.12]}>
        <boxGeometry args={[8.4, 0.22, 0.16]} />
        <meshStandardMaterial color={trimWood} roughness={0.6} />
      </mesh>
      <mesh receiveShadow castShadow position={[-4.12, -0.48, 0]}>
        <boxGeometry args={[0.16, 0.22, 8.4]} />
        <meshStandardMaterial color={trimWood} roughness={0.6} />
      </mesh>

      {/* 2. Isometric Cutaway Left-Back Wall */}
      <group position={[0, 1.35, -3.7]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[7.6, 3.8, 0.22]} />
          <meshStandardMaterial color={wallColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.92, 0.03]} castShadow>
          <boxGeometry args={[7.68, 0.1, 0.28]} />
          <meshStandardMaterial color={trimWood} roughness={0.55} />
        </mesh>

        {/* Interactive Classroom Smartboard Screen */}
        <group
          position={[0.1, 0.35, 0.15]}
          onClick={handleSmartboardClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setBoardHovered(true);
          }}
          onPointerOut={() => setBoardHovered(false)}
        >
          <mesh castShadow>
            <boxGeometry args={[2.55, 1.48, 0.08]} />
            <meshStandardMaterial color={isSleeping ? '#334155' : '#ffffff'} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.03, 0.045]}>
            <planeGeometry args={[2.38, 1.28]} />
            <meshBasicMaterial
              color={isSleeping ? '#1e1b4b' : activeMode === 'playing' ? '#38bdf8' : '#34d399'}
            />
          </mesh>
          <mesh position={[0, -0.32, 0.05]}>
            <planeGeometry args={[2.38, 0.48]} />
            <meshBasicMaterial color={isSleeping ? '#064e3b' : '#22c55e'} />
          </mesh>
          <mesh position={[0.8, 0.38, 0.055]}>
            <planeGeometry args={[0.24, 0.24]} />
            <meshBasicMaterial color="#fde047" />
          </mesh>
          {[-0.75, -0.2, 0.45].map((tx, idx) => (
            <group key={idx} position={[tx, -0.02, 0.055]}>
              <mesh position={[0, 0.12, 0]}>
                <boxGeometry args={[0.22, 0.26, 0.02]} />
                <meshBasicMaterial color="#15803d" />
              </mesh>
              <mesh position={[0, -0.06, 0]}>
                <boxGeometry args={[0.07, 0.14, 0.02]} />
                <meshBasicMaterial color="#78350f" />
              </mesh>
            </group>
          ))}
          <mesh position={[0, -0.66, 0.045]}>
            <boxGeometry args={[2.55, 0.12, 0.09]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {(boardHovered || boardPulse || showSceneLabels) && (
            <Html position={[0, 0.92, 0.1]} center distanceFactor={6.2}>
              <button
                type="button"
                onClick={handleSmartboardClick}
                className={`pointer-events-auto cursor-pointer ${boardPulse ? 'spatial-pill spatial-pill-action' : 'spatial-pill'
                  }`}
              >
                <MonitorPlay size={10} className="text-emerald-400" />
                <span>{language === 'id' ? 'Layar Pintar' : 'Smartboard'}</span>
              </button>
            </Html>
          )}
        </group>

        <group position={[-2.35, 0.45, 0.13]}>
          <mesh castShadow>
            <boxGeometry args={[1.45, 1.1, 0.04]} />
            <meshStandardMaterial color="#fffdf9" roughness={0.6} />
          </mesh>
          {[-0.48, -0.16, 0.16, 0.48].map((cx, r) =>
            [-0.3, 0, 0.3].map((cy, c) => (
              <mesh key={`${r}-${c}`} position={[cx, cy, 0.025]}>
                <boxGeometry args={[0.24, 0.2, 0.02]} />
                <meshStandardMaterial
                  color={blockPalette[(r * 3 + c) % blockPalette.length]}
                  roughness={0.4}
                />
              </mesh>
            ))
          )}
        </group>

        <group position={[-3.15, -0.82, 0.42]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.85, 1.85, 0.55]} />
            <meshStandardMaterial color={shelfWood} roughness={0.65} />
          </mesh>
          {[-0.5, 0, 0.5].map((sy, idx) => (
            <group key={idx} position={[0, sy, 0.06]}>
              {[-0.22, 0, 0.22].map((bx, bIdx) => (
                <mesh key={bIdx} position={[bx, 0, 0]} castShadow>
                  <boxGeometry args={[0.16, 0.34, 0.36]} />
                  <meshStandardMaterial
                    color={blockPalette[(idx * 3 + bIdx) % blockPalette.length]}
                    roughness={0.4}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        <group position={[-1.95, -1.45, 0.42]}>
          {blockPalette.slice(0, 5).map((col, idx) => (
            <mesh key={idx} position={[idx * 0.36 - 0.7, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.31, 0.31, 0.31]} />
              <meshStandardMaterial color={col} roughness={0.35} />
            </mesh>
          ))}
        </group>

        <group ref={cogGearRef} position={[-0.75, 1.42, 0.14]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.06, 16]} />
            <meshStandardMaterial color={shelfWood} roughness={0.5} />
          </mesh>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((tooth) => (
            <mesh
              key={tooth}
              position={[
                Math.cos((tooth * Math.PI) / 4) * 0.32,
                Math.sin((tooth * Math.PI) / 4) * 0.32,
                0
              ]}
              rotation={[0, 0, (tooth * Math.PI) / 4]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.1, 0.06]} />
              <meshStandardMaterial color={trimWood} roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 3. Isometric Cutaway Right-Back Wall */}
      <group position={[-3.7, 1.35, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[7.6, 3.8, 0.22]} />
          <meshStandardMaterial color={wallColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.92, 0.03]} castShadow>
          <boxGeometry args={[7.68, 0.1, 0.28]} />
          <meshStandardMaterial color={trimWood} roughness={0.55} />
        </mesh>

        <group ref={sunGearRef} position={[-1.6, 1.25, 0.15]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.07, 20]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.35} />
          </mesh>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((ray) => (
            <mesh
              key={ray}
              position={[
                Math.cos((ray * Math.PI) / 4) * 0.48,
                Math.sin((ray * Math.PI) / 4) * 0.48,
                0
              ]}
              rotation={[0, 0, (ray * Math.PI) / 4]}
              castShadow
            >
              <boxGeometry args={[0.18, 0.09, 0.05]} />
              <meshStandardMaterial color="#fbbf24" roughness={0.35} />
            </mesh>
          ))}
        </group>

        <group position={[0.45, 0.55, 0.14]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 1.05, 0.04]} />
            <meshStandardMaterial color="#fffbeb" roughness={0.7} />
          </mesh>
          {[-0.5, 0, 0.5].map((px, idx) => (
            <mesh key={idx} position={[px, 0, 0.03]}>
              <boxGeometry args={[0.36, 0.68, 0.02]} />
              <meshStandardMaterial color={idx === 1 ? '#86efac' : '#fde68a'} roughness={0.5} />
            </mesh>
          ))}
        </group>

        <group position={[-2.1, -0.65, 0.42]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 2.1, 0.55]} />
            <meshStandardMaterial color={shelfWood} roughness={0.65} />
          </mesh>
          {[-0.6, 0, 0.6].map((sy, r) =>
            [-0.35, 0, 0.35].map((sx, c) => (
              <mesh key={`${r}-${c}`} position={[sx, sy, 0.06]} castShadow>
                <boxGeometry args={[0.26, 0.38, 0.38]} />
                <meshStandardMaterial
                  color={blockPalette[(r * 3 + c) % blockPalette.length]}
                  roughness={0.4}
                />
              </mesh>
            ))
          )}
        </group>
      </group>

      {/* 4. Miniature Yellow Wooden Delivery Trucks */}
      <group
        ref={truckLeftRef}
        position={[-3.05, -0.52, 2.85]}
        rotation={[0, 0.65, 0]}
        onClick={(e) => handleTruckClick('left', e)}
      >
        <mesh position={[-0.18, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.62, 0.42, 0.42]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0.26, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 0.32, 0.4]} />
          <meshStandardMaterial color="#facc15" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.98, 0.08, 0.38]} />
          <meshStandardMaterial color={trimWood} roughness={0.6} />
        </mesh>
        {[
          [-0.28, 0.06, 0.21],
          [-0.28, 0.06, -0.21],
          [0.24, 0.06, 0.21],
          [0.24, 0.06, -0.21]
        ].map(([wx, wy, wz], idx) => (
          <mesh key={idx} position={[wx, wy, wz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        ))}
        {truckBeep === 'left' && (
          <Html position={[0, 0.68, 0]} center distanceFactor={7}>
            <div className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-white animate-bounce whitespace-nowrap flex items-center gap-1">
              <Truck size={10} />
              <span>Tin! Tin!</span>
            </div>
          </Html>
        )}
      </group>

      <group
        ref={truckRightRef}
        position={[2.85, -0.52, 2.95]}
        rotation={[0, -2.35, 0]}
        onClick={(e) => handleTruckClick('right', e)}
      >
        <mesh position={[-0.18, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.62, 0.42, 0.42]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0.26, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 0.32, 0.4]} />
          <meshStandardMaterial color="#facc15" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.98, 0.08, 0.38]} />
          <meshStandardMaterial color={trimWood} roughness={0.6} />
        </mesh>
        {[
          [-0.28, 0.06, 0.21],
          [-0.28, 0.06, -0.21],
          [0.24, 0.06, 0.21],
          [0.24, 0.06, -0.21]
        ].map(([wx, wy, wz], idx) => (
          <mesh key={idx} position={[wx, wy, wz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        ))}
        {truckBeep === 'right' && (
          <Html position={[0, 0.68, 0]} center distanceFactor={7}>
            <div className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-white animate-bounce whitespace-nowrap flex items-center gap-1">
              <Truck size={10} />
              <span>Paket Benih!</span>
            </div>
          </Html>
        )}
      </group>

      {[
        { pos: [-1.4, -0.46, 3.35] as [number, number, number], rot: 0.3, col: '#dfbe95' },
        { pos: [-1.1, -0.47, 3.5] as [number, number, number], rot: 0.8, col: '#f59e0b' },
        { pos: [1.55, -0.46, 3.3] as [number, number, number], rot: -0.4, col: '#dfbe95' },
        { pos: [3.35, -0.46, -1.2] as [number, number, number], rot: 0.5, col: '#38bdf8' },
        { pos: [3.2, -0.46, -1.55] as [number, number, number], rot: 0.1, col: '#dfbe95' }
      ].map((cube, idx) => (
        <mesh key={idx} position={cube.pos} rotation={[0, cube.rot, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color={cube.col} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function SanctuaryZooCorner3D({ isSleeping }: { isSleeping: boolean }) {
  const neckRef = useRef<THREE.Group>(null);
  const bunnyRef = useRef<THREE.Group>(null);
  const language = useStoryStore((s) => s.language);
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const [fedPulse, setFedPulse] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const isNarrating = useStoryStore.getState().isPlaying;
    const speed = isNarrating ? 2.2 : 1.0;

    if (neckRef.current) {
      neckRef.current.rotation.z = Math.sin(t * 1.6 * speed) * 0.1 + (fedPulse ? 0.25 : 0);
      neckRef.current.rotation.x = Math.cos(t * 1.2 * speed) * 0.08;
    }
    if (bunnyRef.current) {
      const hop = isSleeping ? 0 : Math.abs(Math.sin(t * 3.4 * speed)) * 0.14;
      bunnyRef.current.position.y = 0.12 + hop;
    }
  });

  const handleZooInteract = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundEngine.playSFX('sprout');
    setFedPulse(true);
    const st = useStoryStore.getState();
    st.setActiveTool('zoo-binoculars');
    const zooHs =
      st.currentScene.hotspots.find(
        (h) => h.id.includes('zoo') || h.id.includes('deer') || h.id.includes('bunny')
      )?.id ?? st.currentScene.hotspots[0]?.id;
    if (zooHs) st.openHotspot(zooHs);
    setTimeout(() => setFedPulse(false), 950);
  };

  return (
    <group
      position={[1.95, 0, 0.85]}
      onClick={handleZooInteract}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh position={[-0.22, 0.12, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.18, 0.24]} />
        <meshStandardMaterial color="#92400e" roughness={0.65} />
      </mesh>
      <mesh position={[-0.22, 0.22, 0.18]} castShadow>
        <boxGeometry args={[0.32, 0.08, 0.18]} />
        <meshStandardMaterial color="#facc15" roughness={0.5} />
      </mesh>

      <group position={[0.05, 0, -0.05]} rotation={[0, -0.55, 0]}>
        {[
          [-0.1, 0.18, 0.12],
          [0.1, 0.18, 0.12],
          [-0.1, 0.18, -0.12],
          [0.1, 0.18, -0.12]
        ].map(([lx, ly, lz], idx) => (
          <mesh key={idx} position={[lx, ly, lz]} castShadow>
            <cylinderGeometry args={[0.035, 0.03, 0.36, 10]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.45} />
          </mesh>
        ))}

        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.24, 0.42]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.42} />
        </mesh>
        {[
          [-0.142, 0.4, 0.08],
          [0.142, 0.38, -0.06],
          [-0.142, 0.35, -0.1]
        ].map(([sx, sy, sz], idx) => (
          <mesh key={idx} position={[sx, sy, sz]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
        ))}

        <group ref={neckRef} position={[0, 0.46, 0.16]}>
          <mesh position={[0, 0.26, 0.05]} rotation={[0.22, 0, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.075, 0.52, 12]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.42} />
          </mesh>
          <group position={[0, 0.54, 0.12]}>
            <mesh castShadow>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color="#fcd34d" roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.02, 0.1]} castShadow>
              <sphereGeometry args={[0.065, 12, 12]} />
              <meshStandardMaterial color="#fef3c7" roughness={0.4} />
            </mesh>
            {[-0.065, 0.065].map((ex, idx) => (
              <mesh key={idx} position={[ex, 0.025, 0.085]}>
                <sphereGeometry args={[0.022, 10, 10]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
            ))}
            {[-0.045, 0.045].map((hx, idx) => (
              <group key={idx} position={[hx, 0.12, -0.01]}>
                <mesh>
                  <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
                  <meshStandardMaterial color="#f59e0b" />
                </mesh>
                <mesh position={[0, 0.045, 0]}>
                  <sphereGeometry args={[0.022, 8, 8]} />
                  <meshStandardMaterial color="#78350f" />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      <group ref={bunnyRef} position={[-0.25, 0.12, -0.22]} rotation={[0, -0.4, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.09, 0.07]} castShadow>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
        {[-0.032, 0.032].map((ex, idx) => (
          <mesh
            key={idx}
            position={[ex, 0.21, 0.06]}
            rotation={[0.15, 0, idx === 0 ? -0.1 : 0.1]}
            castShadow
          >
            <capsuleGeometry args={[0.018, 0.11, 6, 8]} />
            <meshStandardMaterial color="#fda4af" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {(hovered || fedPulse || showSceneLabels) && (
        <Html position={[0.05, 1.32, 0]} center distanceFactor={5.8}>
          <button
            type="button"
            onClick={handleZooInteract}
            className={`spatial-pill pointer-events-auto cursor-pointer ${fedPulse ? 'spatial-pill-action scale-105' : ''
              }`}
          >
            <span>🦒</span>
            <span>{language === 'id' ? 'Taman Satwa' : 'Sanctuary Zoo'}</span>
          </button>
        </Html>
      )}
    </group>
  );
}

export function PrayerSanctuaryRug3D({ isSleeping }: { isSleeping: boolean }) {
  const lanternRef = useRef<THREE.Group>(null);
  const language = useStoryStore((s) => s.language);
  const showSceneLabels = useStoryStore((s) => s.showSceneLabels);
  const [prayPulse, setPrayPulse] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lanternRef.current) {
      lanternRef.current.position.y = 0.62 + Math.sin(t * 2.2) * 0.04;
      lanternRef.current.rotation.y = t * 0.6;
    }
  });

  const handlePrayerInteract = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundEngine.playSFX('chime');
    setPrayPulse(true);
    const st = useStoryStore.getState();
    st.setActiveTool('prayer-mat');
    const prayerHs =
      st.currentScene.hotspots.find(
        (h) =>
          h.id.includes('sajadah') ||
          h.id.includes('wudhu') ||
          h.id.includes('dua') ||
          h.id.includes('peace')
      )?.id ?? st.currentScene.hotspots[0]?.id;
    if (prayerHs) st.openHotspot(prayerHs);
    setTimeout(() => setPrayPulse(false), 950);
  };

  return (
    <group
      position={[-1.35, 0.015, 0.85]}
      rotation={[0, 0.35, 0]}
      onClick={handlePrayerInteract}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh receiveShadow castShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[0.68, 0.022, 1.05]} />
        <meshStandardMaterial color={isSleeping ? '#065f46' : '#059669'} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.023, 0]}>
        <boxGeometry args={[0.58, 0.006, 0.92]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.026, 0.03]}>
        <boxGeometry args={[0.5, 0.006, 0.76]} />
        <meshStandardMaterial color="#047857" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, -0.22]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 3]} />
        <meshBasicMaterial color="#fde047" />
      </mesh>
      {[-0.24, -0.12, 0, 0.12, 0.24].map((fx, idx) => (
        <React.Fragment key={idx}>
          <mesh position={[fx, 0.01, -0.55]}>
            <boxGeometry args={[0.03, 0.01, 0.06]} />
            <meshStandardMaterial color="#fef3c7" />
          </mesh>
          <mesh position={[fx, 0.01, 0.55]}>
            <boxGeometry args={[0.03, 0.01, 0.06]} />
            <meshStandardMaterial color="#fef3c7" />
          </mesh>
        </React.Fragment>
      ))}

      <group ref={lanternRef} position={[-0.45, 0.62, -0.35]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#fde047"
            emissive="#f59e0b"
            emissiveIntensity={isSleeping ? 0.9 : 0.45}
          />
        </mesh>
      </group>

      {(hovered || prayPulse || showSceneLabels) && (
        <Html position={[0, 0.45, 0]} center distanceFactor={5.8}>
          <button
            type="button"
            onClick={handlePrayerInteract}
            className={`spatial-pill pointer-events-auto cursor-pointer ${prayPulse ? 'spatial-pill-action scale-105' : ''
              }`}
          >
            <span>🤲</span>
            <span>{language === 'id' ? 'Sajadah & Doa' : "Prayer & Du'a"}</span>
          </button>
        </Html>
      )}
    </group>
  );
}

