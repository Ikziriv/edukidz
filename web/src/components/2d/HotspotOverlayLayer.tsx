import React from 'react';
import {
  Sparkles,
  Sprout,
  Music,
  Sun,
  Heart,
  BookOpen,
  Star
} from 'lucide-react';
import type { HotspotDefinition, LanguageCode } from '../../types/story';
import { STAR_QUEST_SPOTS } from '../../lib/lawnGridMath';
import { soundEngine } from '../../services/audioEngine';

interface HotspotOverlayLayerProps {
  overlayLayerRef: React.RefObject<HTMLDivElement | null>;
  isSleeping: boolean;
  isPlaying: boolean;
  hotspots: HotspotDefinition[];
  language: LanguageCode;
  collectedStars: string[];
  onOpenHotspot: (id: string) => void;
  onCollectStar: (id: string, normX: number, normY: number) => void;
}

export const HotspotOverlayLayer: React.FC<HotspotOverlayLayerProps> = ({
  overlayLayerRef,
  isSleeping,
  isPlaying,
  hotspots,
  language,
  collectedStars,
  onOpenHotspot,
  onCollectStar
}) => {
  return (
    <div
      ref={overlayLayerRef}
      style={{
        transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)'
      }}
      className="absolute inset-0 pointer-events-none will-change-transform"
    >
      {/* 1. Educational Hotspot Pins (Hidden in Sleeping Mode) */}
      {!isSleeping &&
        hotspots.map((hs, idx) => {
          const defaultCoords = [
            { top: '44%', left: '26%' },
            { top: '53%', left: '50%' },
            { top: '46%', left: '74%' }
          ][idx] || { top: '50%', left: '50%' };

          return (
            <div
              key={hs.id}
              style={{ top: defaultCoords.top, left: defaultCoords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-auto group"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playSFX('chime');
                  onOpenHotspot(hs.id);
                }}
                aria-label={hs.title[language]}
                title={hs.title[language]}
                className="hotspot-pin cursor-pointer"
              >
                {hs.icon === 'sparkles' && <Sparkles size={18} aria-hidden="true" />}
                {hs.icon === 'sprout' && <Sprout size={18} aria-hidden="true" />}
                {hs.icon === 'music' && <Music size={18} aria-hidden="true" />}
                {hs.icon === 'sun' && <Sun size={18} aria-hidden="true" />}
                {hs.icon === 'heart' && <Heart size={18} aria-hidden="true" />}
                {hs.icon === 'book' && <BookOpen size={18} aria-hidden="true" />}
              </button>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-display font-bold bg-surface/95 text-ink border border-line shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all whitespace-nowrap">
                {hs.title[language]}
              </span>
            </div>
          );
        })}

      {/* 2. Playing Mode Collectible 2D Star Quest Tokens (Full Parity with 3D Mode!) */}
      {isPlaying &&
        STAR_QUEST_SPOTS.map((star) => {
          const isFound = collectedStars.includes(star.id);
          if (isFound) return null;
          return (
            <button
              key={star.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCollectStar(star.id, star.normX, star.normY);
              }}
              style={{ top: `${star.normY * 100}%`, left: `${star.normX * 100}%` }}
              aria-label={star.label[language]}
              title={star.label[language]}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-amber-400/95 text-amber-950 border-2 border-white shadow-xl flex items-center justify-center hover:scale-125 transition-transform animate-bounce cursor-pointer"
            >
              <Star size={20} className="fill-amber-950" aria-hidden="true" />
            </button>
          );
        })}
    </div>
  );
};

