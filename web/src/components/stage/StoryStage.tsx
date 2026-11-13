import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Image as ImageIcon,
  TriangleAlert,
  Maximize2,
  Minimize2,
  Film
} from 'lucide-react';
import { useStoryStore } from '../../stores/storyStore';
import type { VisualMode } from '../../types/story';
import { ParallaxCanvas2D } from '../2d/ParallaxCanvas2D';
import { StoryVideoStudio } from '../video/StoryVideoStudio';
import { FarmStatusWidget } from './FarmHud';
import { StageLoading } from './StageLoading';
import { StarTracker } from './StarTracker';
import { StageCommandDock } from './StageCommandDock';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { useT } from '../../lib/i18n';

// three.js is the heaviest dependency — load it only when the 3D stage is shown.
const GardenDiorama3D = lazy(() =>
  import('../3d/GardenDiorama3D').then((m) => ({ default: m.GardenDiorama3D }))
);

/** The framed story viewport with its unified, collision-free spatial heads-up controls. */
export const StoryStage: React.FC = () => {
  const stageRef = useRef<HTMLElement | null>(null);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);
  const visualMode = useStoryStore((s) => s.visualMode);
  const setVisualMode = useStoryStore((s) => s.setVisualMode);
  const toggleVisualMode = useStoryStore((s) => s.toggleVisualMode);
  const isFullscreen = useStoryStore((s) => s.isFullscreen);
  const setFullscreen = useStoryStore((s) => s.setFullscreen);
  const toggleFullscreen = useStoryStore((s) => s.toggleFullscreen);
  const nudgeSelectedCharacter = useStoryStore((s) => s.nudgeSelectedCharacter);
  const activeMode = useStoryStore((s) => s.activeMode);
  const currentScene = useStoryStore((s) => s.currentScene);
  const totalDays = useStoryStore((s) => s.currentStory.scenes.length);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  const activityLabel =
    currentScene.activityCategory === 'study-learning'
      ? t('Sains', 'Science')
      : currentScene.activityCategory === 'zoo-visit'
      ? t('Satwa', 'Sanctuary')
      : currentScene.activityCategory === 'muslim-prayer'
      ? t('Ibadah', 'Prayer')
      : t('Kebun', 'Garden');

  const activeDayNum = currentScene.dayNumber ?? currentScene.chapterNumber;
  const cleanSceneTitle = currentScene.title[language].replace(/^(Day|Hari)\s*\d+\s*:\s*/i, '');

  const is3D = visualMode === '3D';
  const isVideo = visualMode === 'VIDEO';
  const modeIndex = visualMode === '3D' ? 0 : visualMode === '2D' ? 1 : 2;

  const handleFullscreenToggle = useCallback(async () => {
    const el = stageRef.current;
    if (!el) {
      toggleFullscreen();
      return;
    }
    try {
      if (!isFullscreen) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        }
        setFullscreen(true);
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setFullscreen(false);
      }
    } catch {
      toggleFullscreen();
    }
  }, [isFullscreen, setFullscreen, toggleFullscreen]);

  // Synchronize store state when user exits native browser fullscreen via Escape
  useEffect(() => {
    const onFullscreenChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement);
      setFullscreen(isNativeFs);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [setFullscreen]);

  // Keyboard shortcuts: WASD / Arrow keys to move selected character, F for fullscreen, H to toggle HUD, Escape to exit
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        void handleFullscreenToggle();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setIsHudCollapsed((prev) => !prev);
      } else if (e.key === 'Escape' && isFullscreen && !document.fullscreenElement) {
        setFullscreen(false);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        nudgeSelectedCharacter(0, -0.35);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        nudgeSelectedCharacter(0, 0.35);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        nudgeSelectedCharacter(-0.35, 0);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        nudgeSelectedCharacter(0.35, 0);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleFullscreenToggle, isFullscreen, nudgeSelectedCharacter, setFullscreen]);

  return (
    <section
      ref={stageRef}
      aria-label={t('Panggung cerita', 'Story stage')}
      className={`stage ${
        isFullscreen
          ? 'stage-fullscreen pb-20'
          : 'h-[60vh] min-h-[410px] max-h-[700px] md:min-h-[500px]'
      }`}
    >
      <ErrorBoundary
        resetKey={visualMode}
        fallback={() => (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-primary shadow">
              <TriangleAlert size={22} aria-hidden="true" />
            </span>
            <p className="font-display font-semibold text-ink">
              {t('Taman 3D belum bisa dimuat di perangkat ini.', "The 3D garden couldn't load on this device.")}
            </p>
            <button type="button" onClick={toggleVisualMode} className="btn btn-primary">
              <ImageIcon size={16} aria-hidden="true" />
              {t('Buka tampilan 2D', 'Open the 2D view')}
            </button>
          </div>
        )}
      >
        <Suspense fallback={<StageLoading />}>
          <div key={visualMode} className="absolute inset-0 animate-fade-in">
            {is3D ? <GardenDiorama3D /> : isVideo ? <StoryVideoStudio /> : <ParallaxCanvas2D />}
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* Spatial Stage HUD — Single-Axis Minimalist Top Bar & Unified Bottom Command Dock */}
      <div className="absolute inset-0 pointer-events-none p-2.5 sm:p-3.5 flex flex-col justify-between gap-2">
        {/* TOP BAR: Unified 36px (h-9) Precision Horizon */}
        <div className="flex flex-wrap items-center justify-between gap-2 z-30">
          {/* Top-Left Cluster: Compact Scene Pill + 3D/2D/Video Switcher + Fullscreen */}
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto min-w-0">
            <div className="stage-dock h-9 rounded-xl px-2.5 flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center justify-center h-5 px-1.5 rounded-md bg-primary/12 text-primary font-display font-bold text-[10px] tabular-nums shrink-0">
                {String(activeDayNum).padStart(2, '0')}/{totalDays}
              </span>
              <span className="font-display font-semibold text-xs text-ink tracking-tight max-w-[135px] sm:max-w-[210px] truncate">
                {cleanSceneTitle}
              </span>
              <span className="hidden md:inline-block h-3 w-px bg-line/80 shrink-0" aria-hidden="true" />
              <span className="hidden md:inline-block text-[10px] font-display font-medium text-muted shrink-0">
                {activityLabel}
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label={t('Tampilan', 'View')}
              className="segmented stage-dock h-9 p-0.5 rounded-xl"
            >
              <span
                className="segmented-thumb rounded-[9px]"
                style={{ width: 'calc((100% - 4px) / 3)', transform: `translateX(${modeIndex * 100}%)` }}
                aria-hidden="true"
              />
              {(['3D', '2D', 'VIDEO'] as const).map((mode: VisualMode) => (
                <button
                  key={mode}
                  type="button"
                  role="radio"
                  aria-checked={visualMode === mode}
                  onClick={() => visualMode !== mode && setVisualMode(mode)}
                  className="segmented-item min-h-7 h-full px-2.5 text-[11px] font-semibold tracking-tight"
                  title={
                    mode === 'VIDEO'
                      ? t('Tampilan Video Animasi Cerita (I Wonder Why)', 'Story Video Animation View (I Wonder Why)')
                      : undefined
                  }
                >
                  {mode === '3D' ? (
                    <Box size={12} aria-hidden="true" />
                  ) : mode === '2D' ? (
                    <ImageIcon size={12} aria-hidden="true" />
                  ) : (
                    <Film size={12} aria-hidden="true" />
                  )}
                  <span>{mode}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void handleFullscreenToggle()}
              aria-pressed={isFullscreen}
              title={
                isFullscreen
                  ? t('Keluar Layar Penuh (F / Esc)', 'Exit Fullscreen (F / Esc)')
                  : t('Layar Penuh (F)', 'Fullscreen (F)')
              }
              aria-label={isFullscreen ? t('Keluar Layar Penuh', 'Exit Fullscreen') : t('Layar Penuh', 'Fullscreen')}
              className="stage-dock btn btn-icon h-9 min-h-9 w-9 rounded-xl text-ink hover:text-primary transition-transform hover:scale-105"
            >
              {isFullscreen ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
            </button>
          </div>

          {/* Top-Right Cluster: Streamlined Single-Line Farm Telemetry & Star Quest */}
          {!isVideo && (
            <div className="flex items-center gap-1.5 pointer-events-auto ml-auto">
              {activeMode === 'playing' && <StarTracker />}
              <FarmStatusWidget />
            </div>
          )}
        </div>

        {/* BOTTOM BAR: Unified Zero-Collision Spatial Command Dock */}
        {!isVideo && (
          <div className="z-20 w-full">
            <StageCommandDock
              is3D={is3D}
              isCollapsed={isHudCollapsed}
              onToggleCollapse={() => setIsHudCollapsed((prev) => !prev)}
            />
          </div>
        )}
      </div>
    </section>
  );
};
