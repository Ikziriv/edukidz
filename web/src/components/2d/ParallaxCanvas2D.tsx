import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Compass, Droplets, Hand } from 'lucide-react';
import { useStoryStore } from '../../stores/storyStore';
import type { SelectableCharacterId } from '../../types/story';
import { ALL_CHAR_IDS, CHARACTER_PALETTES } from '../../constants/characterRegistry';
import {
  worldToStageNorm,
  stageNormToWorld,
  getCropTileStageNorm
} from '../../lib/lawnGridMath';
import { drawMontessoriRoomBackdrop2D } from './renderers/drawEnvironment2D';
import { drawPvZLawnAndCrops2D } from './renderers/drawPvZLawnAndCrops2D';
import {
  drawPvZCharactersPlane2D,
  drawForegroundEffectsPlane2D,
  type FloatingFX,
  type CharPosMap
} from './renderers/drawPvZCharacter2D';
import { HotspotOverlayLayer } from './HotspotOverlayLayer';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';

export const ParallaxCanvas2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayLayerRef = useRef<HTMLDivElement | null>(null);

  const activeMode = useStoryStore((s) => s.activeMode);
  const currentScene = useStoryStore((s) => s.currentScene);
  const language = useStoryStore((s) => s.language);
  const selectedCharacter = useStoryStore((s) => s.selectedCharacter);
  const activeTool = useStoryStore((s) => s.activeTool);
  const collectedStars = useStoryStore((s) => s.collectedStars);
  const openHotspot = useStoryStore((s) => s.openHotspot);
  const selectCharacter = useStoryStore((s) => s.selectCharacter);
  const triggerCharacterAction = useStoryStore((s) => s.triggerCharacterAction);
  const moveSelectedCharacterTo = useStoryStore((s) => s.moveSelectedCharacterTo);
  const interactWithCropTile = useStoryStore((s) => s.interactWithCropTile);
  const refillWater = useStoryStore((s) => s.refillWater);
  const collectStar = useStoryStore((s) => s.collectStar);
  const t = useT();

  const isSleeping = activeMode === 'sleeping';
  const isPlaying = activeMode === 'playing';

  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  // Zero-re-render refs for 60 FPS pointer parallax, viewport dimensions, and character locomotion
  const targetParallaxRef = useRef({ x: 0, y: 0 });
  const currentParallaxRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 960, height: 540, dpr: 1 });
  const hoveredTileIdRef = useRef<string | null>(null);
  const hoveredCharIdRef = useRef<SelectableCharacterId | null>(null);
  const waypointRippleRef = useRef<{ x: number; z: number; bornAt: number } | null>(null);
  const floatingFxRef = useRef<FloatingFX[]>([]);
  const truckBounceRef = useRef<number>(0);

  const charPosRef = useRef<CharPosMap>({
    aisyah: { x: -1.65, z: 0.65, vx: 0, vz: 0, facing: 1 },
    mateo: { x: 1.7, z: 0.55, vx: 0, vz: 0, facing: -1 },
    sofia: { x: -2.25, z: -0.25, vx: 0, vz: 0, facing: 1 },
    mei: { x: 2.25, z: -0.3, vx: 0, vz: 0, facing: -1 },
    kenji: { x: -1.05, z: -1.25, vx: 0, vz: 0, facing: 1 },
    amara: { x: 1.05, z: -1.25, vx: 0, vz: 0, facing: -1 }
  });

  const spawnFloatingFx = useCallback((nx: number, ny: number, text: string, color: string) => {
    floatingFxRef.current.push({
      id: Date.now() + Math.random(),
      x: nx,
      y: ny,
      text,
      color,
      bornAt: performance.now()
    });
  }, []);

  // HiDPI Retina Canvas ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(320, Math.round(rect.width));
      const height = Math.max(300, Math.round(rect.height));
      sizeRef.current = { width, height, dpr };
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    window.addEventListener('resize', updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    targetParallaxRef.current = {
      x: (nx - 0.5) * 2,
      y: (ny - 0.5) * 2
    };

    const px = currentParallaxRef.current.x;
    const py = currentParallaxRef.current.y;
    const l2ShiftX = (px * 24) / rect.width;
    const l2ShiftY = (py * 12) / rect.height;

    let hitChar: SelectableCharacterId | null = null;
    for (const id of ALL_CHAR_IDS) {
      const pos = charPosRef.current[id];
      const { nx: cnx, ny: cny } = worldToStageNorm(pos.x, pos.z);
      const dx = nx - (cnx + l2ShiftX);
      const dy = ny - (cny - 0.045 + l2ShiftY);
      if (Math.abs(dx) < 0.042 && Math.abs(dy) < 0.085) {
        hitChar = id;
        break;
      }
    }
    hoveredCharIdRef.current = hitChar;

    let hitTile: string | null = null;
    if (!hitChar) {
      const tiles = useStoryStore.getState().cropTiles;
      for (const tile of tiles) {
        const { nx: tnx, ny: tny } = getCropTileStageNorm(tile.gridX, tile.gridZ);
        if (Math.abs(nx - (tnx + l2ShiftX)) < 0.036 && Math.abs(ny - (tny + l2ShiftY)) < 0.028) {
          hitTile = tile.id;
          break;
        }
      }
    }
    hoveredTileIdRef.current = hitTile;

    const nextEntity = hitChar ? `char:${hitChar}` : hitTile ? `tile:${hitTile}` : null;
    setHoveredEntity((prev) => (prev === nextEntity ? prev : nextEntity));
  }, []);

  const handlePointerLeave = useCallback(() => {
    targetParallaxRef.current = { x: 0, y: 0 };
    hoveredCharIdRef.current = null;
    hoveredTileIdRef.current = null;
    setHoveredEntity(null);
  }, []);

  const handleStageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      if ((e.target as HTMLElement).closest('button')) return;

      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      const px = currentParallaxRef.current.x;
      const py = currentParallaxRef.current.y;
      const l2ShiftX = (px * 24) / rect.width;
      const l2ShiftY = (py * 12) / rect.height;

      // 1. Check Character Click
      for (const id of ALL_CHAR_IDS) {
        const pos = charPosRef.current[id];
        const { nx: cnx, ny: cny } = worldToStageNorm(pos.x, pos.z);
        if (Math.abs(nx - (cnx + l2ShiftX)) < 0.045 && Math.abs(ny - (cny - 0.045 + l2ShiftY)) < 0.09) {
          soundEngine.playSFX('tap');
          selectCharacter(id);
          triggerCharacterAction(id);
          spawnFloatingFx(cnx, cny - 0.1, `✨ ${CHARACTER_PALETTES[id].name}`, CHARACTER_PALETTES[id].primary);
          return;
        }
      }

      // 2. Check 3x3 Farm Crop Tile Click
      const store = useStoryStore.getState();
      for (const tile of store.cropTiles) {
        const { nx: tnx, ny: tny } = getCropTileStageNorm(tile.gridX, tile.gridZ);
        if (Math.abs(nx - (tnx + l2ShiftX)) < 0.038 && Math.abs(ny - (tny + l2ShiftY)) < 0.03) {
          interactWithCropTile(tile.id);
          const [wx, , wz] = stageNormToWorld(tnx, tny + 0.035);
          moveSelectedCharacterTo([wx, -0.02, wz]);

          if (store.activeTool === 'water') {
            spawnFloatingFx(tnx, tny - 0.03, '💧 Segar!', '#0ea5e9');
          } else if (store.activeTool === 'harvest' && tile.stage === 'ripe') {
            spawnFloatingFx(tnx, tny - 0.04, '+60G Panen!', '#f59e0b');
          } else if (store.activeTool === 'seed' && tile.stage === 'soil') {
            spawnFloatingFx(tnx, tny - 0.03, '🌱 Tanam Benih', '#10b981');
          } else if (store.activeTool === 'guitar') {
            spawnFloatingFx(tnx, tny - 0.03, '🎵 Nada Alam', '#ec4899');
          }
          return;
        }
      }

      // 3. Check Stone Water Well Click
      if (Math.abs(nx - (0.8 + l2ShiftX)) < 0.055 && Math.abs(ny - (0.62 + l2ShiftY)) < 0.065) {
        refillWater();
        spawnFloatingFx(0.8, 0.55, '💧 +25 Energi Air!', '#0284c7');
        return;
      }

      // 4. Check Yellow Wooden Delivery Truck Click
      if (Math.abs(nx - (0.19 + l2ShiftX)) < 0.055 && Math.abs(ny - (0.69 + l2ShiftY)) < 0.055) {
        soundEngine.playSFX('tap');
        truckBounceRef.current = performance.now();
        spawnFloatingFx(0.19, 0.63, '🚚 Truk Kebun Siap!', '#eab308');
        return;
      }

      // 5. Walk Selected Character to Ground Location
      if (ny >= 0.42 && ny <= 0.88 && nx >= 0.14 && nx <= 0.86) {
        const [wx, wy, wz] = stageNormToWorld(nx - l2ShiftX, ny - l2ShiftY);
        soundEngine.playSFX('tap');
        moveSelectedCharacterTo([wx, wy, wz]);
        waypointRippleRef.current = { x: wx, z: wz, bornAt: performance.now() };
      }
    },
    [selectCharacter, triggerCharacterAction, interactWithCropTile, moveSelectedCharacterTo, refillWater, spawnFloatingFx]
  );

  // Main 60 FPS Canvas 2D Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const { width: w, height: h, dpr } = sizeRef.current;

      const store = useStoryStore.getState();
      const mode = store.activeMode;
      const sleeping = mode === 'sleeping';
      const playing = mode === 'playing';
      const isNarrating = store.isPlaying;
      const speakingCharId = store.speakingCharacter;

      const autoPanX = isNarrating ? Math.sin(elapsed * 0.65) * 0.42 : 0;
      const autoPanY = isNarrating ? Math.cos(elapsed * 0.48) * 0.24 : 0;
      currentParallaxRef.current.x += (targetParallaxRef.current.x + autoPanX - currentParallaxRef.current.x) * 0.085;
      currentParallaxRef.current.y += (targetParallaxRef.current.y + autoPanY - currentParallaxRef.current.y) * 0.085;
      const px = currentParallaxRef.current.x;
      const py = currentParallaxRef.current.y;

      if (overlayLayerRef.current) {
        overlayLayerRef.current.style.setProperty('--px', `${(px * 24).toFixed(1)}px`);
        overlayLayerRef.current.style.setProperty('--py', `${(py * 12).toFixed(1)}px`);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Plane 0: Montessori Studio Room & Panoramic Window
      drawMontessoriRoomBackdrop2D(ctx, w, h, px, py, elapsed, sleeping, playing);

      // Plane 1 & 2: Isometric Maple Sandbox, PvZ Checkerboard Lawn & Botanical Buddies + 6 Global Friends
      ctx.save();
      ctx.translate(px * 24, py * 12);

      drawPvZLawnAndCrops2D(
        ctx,
        w,
        h,
        elapsed,
        now,
        sleeping,
        playing,
        store.cropTiles,
        hoveredTileIdRef.current,
        truckBounceRef.current,
        waypointRippleRef.current
      );

      drawPvZCharactersPlane2D(
        ctx,
        w,
        h,
        elapsed,
        charPosRef.current,
        store.characterTargets,
        store.selectedCharacter,
        (store.characterBounceTarget as SelectableCharacterId | null),
        hoveredCharIdRef.current,
        isNarrating,
        speakingCharId,
        store.language
      );

      ctx.restore();

      // Plane 3: Foreground Foliage, Droplets, Fireflies & Floating FX
      floatingFxRef.current = drawForegroundEffectsPlane2D(
        ctx,
        w,
        h,
        px,
        py,
        elapsed,
        now,
        sleeping,
        store.isWateringActive,
        floatingFxRef.current
      );

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, []);

  const activeCharName = CHARACTER_PALETTES[selectedCharacter]?.name ?? 'Aisyah';

  return (
    <div
      ref={containerRef}
      onClick={handleStageClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full min-h-[340px] overflow-hidden select-none ${
        hoveredEntity ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      <HotspotOverlayLayer
        overlayLayerRef={overlayLayerRef}
        isSleeping={isSleeping}
        isPlaying={isPlaying}
        hotspots={currentScene.hotspots}
        language={language}
        collectedStars={collectedStars}
        onOpenHotspot={openHotspot}
        onCollectStar={(id, normX, normY) => {
          collectStar(id);
          spawnFloatingFx(normX, normY, '⭐ Bintang Ketemu!', '#facc15');
        }}
      />

      {!isSleeping && (
        <div className="absolute top-16 left-3.5 z-10 pointer-events-none hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur-md border border-line/60 text-[11px] font-medium text-muted shadow-xs">
          <Compass size={12} className="text-primary shrink-0" aria-hidden="true" />
          <span>
            {t(
              `2.5D Diorama Interaktif · Ketuk tanah untuk menggerakkan ${activeCharName} atau gunakan ${activeTool === 'water' ? 'Penyiram' : activeTool === 'seed' ? 'Benih' : activeTool === 'harvest' ? 'Panen' : 'Alat'} di 9 petak kebun`,
              `2.5D Interactive Diorama · Tap ground to walk ${activeCharName} or use tools on the 9 garden plots`
            )}
          </span>
          <Droplets size={11} className="text-sky-500 shrink-0" aria-hidden="true" />
          <Hand size={11} className="text-amber-500 shrink-0" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
