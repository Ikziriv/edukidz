import React from 'react';
import {
  Film,
  Sparkles,
  Camera,
  HelpCircle,
  Tv,
  Clapperboard,
  ChevronRight,
  ListVideo,
  Repeat
} from 'lucide-react';
import type {
  SceneDefinition,
  VideoCameraShot,
  VideoSourceMode,
  WonderFactCard
} from '../../types/story';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';

interface VideoStudioTopDockProps {
  sourceMode: VideoSourceMode;
  setSourceMode: (mode: VideoSourceMode) => void;
  cameraShot: VideoCameraShot;
  setCameraShot: (shot: VideoCameraShot) => void;
  activeDayNumber: number;
  totalEpisodes: number;
  showEpisodeStrip: boolean;
  setShowEpisodeStrip: React.Dispatch<React.SetStateAction<boolean>>;
  autoNextEpisode: boolean;
  setAutoNextEpisode: React.Dispatch<React.SetStateAction<boolean>>;
  scenes: SceneDefinition[];
  currentSceneIndex: number;
  selectScene: (index: number) => void;
  language: 'en' | 'id';
  isWonderCardExpanded: boolean;
  setIsWonderCardExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activeFactIdx: number;
  setActiveFactIdx: React.Dispatch<React.SetStateAction<number>>;
  facts: WonderFactCard[];
  currentFact: WonderFactCard;
}

export const VideoStudioTopDock: React.FC<VideoStudioTopDockProps> = ({
  sourceMode,
  setSourceMode,
  cameraShot,
  setCameraShot,
  activeDayNumber,
  totalEpisodes,
  showEpisodeStrip,
  setShowEpisodeStrip,
  autoNextEpisode,
  setAutoNextEpisode,
  scenes,
  currentSceneIndex,
  selectScene,
  language,
  isWonderCardExpanded,
  setIsWonderCardExpanded,
  activeFactIdx,
  setActiveFactIdx,
  facts,
  currentFact
}) => {
  const t = useT();

  return (
    <div className="relative z-20 pointer-events-none px-3 pt-2.5 flex flex-col gap-2">
      {/* Top Row: Right-Aligned Video Studio Controls */}
      <div className="w-full flex flex-wrap items-center justify-end gap-1.5">
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-white/15 px-2 py-1 rounded-2xl shadow-xl">
          {/* Video Engine Source Tabs */}
          <div className="flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setSourceMode('studio-reel');
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-display font-bold flex items-center gap-1 transition-all cursor-pointer ${sourceMode === 'studio-reel'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
                }`}
            >
              <Clapperboard size={11} aria-hidden="true" />
              <span>{t('Studio TV', 'Studio TV')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setSourceMode('youtube-embed');
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-display font-bold flex items-center gap-1 transition-all cursor-pointer ${sourceMode === 'youtube-embed'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
                }`}
              title="YouTube Educational Reference (xpxfaLv3qCM)"
            >
              <Tv size={11} aria-hidden="true" />
              <span>YouTube</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setSourceMode('mp4-stream');
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-display font-bold flex items-center gap-1 transition-all cursor-pointer ${sourceMode === 'mp4-stream'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
                }`}
            >
              <Film size={11} aria-hidden="true" />
              <span>MP4</span>
            </button>
          </div>

          {/* Camera Shot Switcher (when in Studio Animation Reel) */}
          {sourceMode === 'studio-reel' && (
            <div
              className="hidden xl:flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-xl border border-white/10"
              role="group"
              aria-label={t('Sudut Kamera Sutradara', 'Director Camera Shot')}
            >
              <Camera size={11} className="text-amber-300 ml-1 mr-0.5" aria-hidden="true" />
              {(
                [
                  { id: 'auto', label: t('Auto', 'Auto') },
                  { id: 'closeup', label: t('Dialog', 'Close-Up') },
                  { id: 'wonder-cutaway', label: t('Sains', 'Science') },
                  { id: 'celebration', label: t('Harmoni', 'Finale') }
                ] as const
              ).map((shot) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSFX('tap');
                    setCameraShot(shot.id);
                  }}
                  className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${cameraShot === shot.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {shot.label}
                </button>
              ))}
            </div>
          )}

          {/* 14-Episode Popover Trigger + Auto-Advance Toggle */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setShowEpisodeStrip((v) => !v);
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${showEpisodeStrip
                ? 'bg-amber-400 text-slate-950'
                : 'text-amber-300 hover:text-white'
                }`}
              title={t('Pilih Episode Animasi I Wonder Why (1-14)', 'Select I Wonder Why Episode (1-14)')}
            >
              <ListVideo size={11} aria-hidden="true" />
              <span>{t(`Ep ${activeDayNumber}/${totalEpisodes}`, `Ep ${activeDayNumber}/${totalEpisodes}`)}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setAutoNextEpisode((v) => !v);
              }}
              className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${autoNextEpisode
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                : 'text-slate-400 hover:text-white'
                }`}
              title={t('Putar otomatis episode berikutnya', 'Auto-play next episode')}
            >
              <Repeat size={10} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING POPOVER EPISODE DRAWER */}
      {showEpisodeStrip && (
        <div className="pointer-events-auto self-end max-w-md w-full bg-slate-950/92 backdrop-blur-xl border border-amber-400/35 rounded-2xl p-2.5 shadow-2xl animate-pop-in z-40">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-amber-300">
              {t('Pilih Episode Animasi (14 Hari)', 'Select Animated Episode (14 Days)')}
            </span>
            <button
              type="button"
              onClick={() => setShowEpisodeStrip(false)}
              className="text-[10px] font-bold text-slate-400 hover:text-white cursor-pointer"
            >
              {t('Tutup ✕', 'Close ✕')}
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {scenes.map((sc, idx) => {
              const epNum = sc.dayNumber ?? idx + 1;
              const isCurr = idx === currentSceneIndex;
              const catEmoji =
                sc.activityCategory === 'zoo-visit'
                  ? '🦒'
                  : sc.activityCategory === 'muslim-prayer'
                    ? '🤲'
                    : sc.activityCategory === 'study-learning'
                      ? '🔬'
                      : epNum === 7
                        ? '🏮'
                        : '🌻';
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSFX('tap');
                    selectScene(idx);
                    setShowEpisodeStrip(false);
                  }}
                  className={`py-1 px-1 rounded-xl text-[10px] font-display font-bold flex flex-col items-center justify-center transition-all cursor-pointer border ${isCurr
                    ? 'bg-amber-400 text-slate-950 border-white shadow-md scale-105'
                    : 'bg-slate-900/90 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white'
                    }`}
                  title={sc.videoSpec?.wonderTitle[language] ?? sc.title[language]}
                >
                  <span className="text-xs leading-none">{catEmoji}</span>
                  <span>Ep {epNum}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TOP-LEFT COMPACT "I WONDER WHY?" CORNER CARD */}
      {sourceMode === 'studio-reel' && (
        <div className="pointer-events-auto self-start mt-9 sm:mt-1">
          {isWonderCardExpanded ? (
            <div className="max-w-[310px] sm:max-w-[340px] bg-slate-950/82 backdrop-blur-md text-white rounded-2xl p-2.5 shadow-xl border border-amber-400/50 flex flex-col gap-1.5 animate-pop-in">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsWonderCardExpanded(false)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-display font-extrabold uppercase tracking-wider cursor-pointer"
                  title={t('Kecilkan kartu fakta', 'Minimize wonder card')}
                >
                  <HelpCircle size={11} aria-hidden="true" />
                  <span>{t('Mengapa Ya?', 'I Wonder Why?')}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playSFX('chime');
                      setActiveFactIdx((prev) => (prev + 1) % facts.length);
                      setCameraShot('wonder-cutaway');
                    }}
                    className="px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 text-[10px] font-display font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                    title={t('Lihat Diagram Sains & Fakta Berikutnya', 'Show Science Cutaway & Next Fact')}
                  >
                    <Sparkles size={10} aria-hidden="true" />
                    <span>
                      {t('Sains', 'Fact')} {activeFactIdx + 1}/{facts.length}
                    </span>
                    <ChevronRight size={11} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWonderCardExpanded(false)}
                    className="w-5 h-5 rounded-md bg-white/10 text-slate-300 hover:text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
                    aria-label={t('Sembunyikan', 'Minimize')}
                  >
                    –
                  </button>
                </div>
              </div>

              <p className="text-[11px] font-display font-bold text-amber-300 leading-tight">
                {currentFact.question[language]}
              </p>
              <p className="text-[11px] text-slate-200 leading-snug line-clamp-2">
                {currentFact.answer[language]}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setIsWonderCardExpanded(true);
              }}
              className="px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-display font-extrabold text-xs shadow-lg border-2 border-white flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
            >
              <HelpCircle size={14} aria-hidden="true" />
              <span>
                {t('Mengapa Ya?', 'I Wonder Why?')} ({activeFactIdx + 1}/{facts.length})
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
