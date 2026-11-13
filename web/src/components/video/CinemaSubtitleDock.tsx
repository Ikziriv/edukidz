import React from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import type {
  ActivityCategory,
  StoryMode,
  SelectableCharacterId,
  VideoCameraShot,
  WordMarker
} from '../../types/story';
import { CHARACTER_PALETTES } from '../../constants/characterRegistry';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';

interface CinemaSubtitleDockProps {
  speakingCharacter: SelectableCharacterId;
  currentSceneIndex: number;
  totalEpisodes: number;
  activeDayNumber: number;
  activeCategory: ActivityCategory;
  prevScene: () => void;
  nextScene: () => void;
  resolvedShot: Exclude<VideoCameraShot, 'auto'>;
  setCameraShot: (shot: VideoCameraShot) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  activeMode: StoryMode;
  openQuiz: () => void;
  words: WordMarker[];
  activeWordIndex: number;
  openVocab: (word: WordMarker) => void;
}

export const CinemaSubtitleDock: React.FC<CinemaSubtitleDockProps> = ({
  speakingCharacter,
  currentSceneIndex,
  totalEpisodes,
  activeDayNumber,
  activeCategory,
  prevScene,
  nextScene,
  resolvedShot,
  setCameraShot,
  isPlaying,
  togglePlay,
  activeMode,
  openQuiz,
  words,
  activeWordIndex,
  openVocab
}) => {
  const t = useT();

  return (
    <div className="relative z-20 pointer-events-none pb-2.5 sm:pb-3.5 px-3 flex flex-col items-center">
      <div className="pointer-events-auto max-w-2xl w-full bg-slate-950/82 backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-2 shadow-2xl flex flex-col gap-1">
        {/* Compact Header Row: Speaker Badge + 4-Act Pills + Play/Quiz */}
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-display font-extrabold uppercase shrink-0 shadow-xs">
              <span
                className="w-2 h-2 rounded-full ring-1 ring-slate-950/40"
                style={{
                  backgroundColor: CHARACTER_PALETTES[speakingCharacter]?.badgeColor ?? '#10b981'
                }}
                aria-hidden="true"
              />
              <Volume2 size={10} aria-hidden="true" />
              <span>{CHARACTER_PALETTES[speakingCharacter]?.name ?? 'Aisyah'}</span>
              {CHARACTER_PALETTES[speakingCharacter]?.usesHijab && (
                <span className="px-1 py-0.2 rounded bg-slate-950/15 text-[8px] font-black tracking-wider">
                  HIJAB
                </span>
              )}
            </span>
            <div className="inline-flex items-center gap-0.5 bg-slate-900/90 border border-emerald-400/30 rounded-lg px-1 py-0.5 shrink-0">
              <button
                type="button"
                disabled={currentSceneIndex === 0}
                onClick={prevScene}
                className="text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer"
                aria-label={t('Episode Sebelumnya', 'Previous Episode')}
              >
                <ChevronLeft size={11} aria-hidden="true" />
              </button>
              <span className="px-1 text-emerald-300 text-[10px] font-mono font-bold">
                {activeCategory === 'zoo-visit'
                  ? '🦒'
                  : activeCategory === 'muslim-prayer'
                    ? '🤲'
                    : activeCategory === 'study-learning'
                      ? '🔬'
                      : '🌻'}{' '}
                Ep {activeDayNumber}
              </span>
              <button
                type="button"
                disabled={currentSceneIndex >= totalEpisodes - 1}
                onClick={nextScene}
                className="text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer"
                aria-label={t('Episode Berikutnya', 'Next Episode')}
              >
                <ChevronRight size={11} aria-hidden="true" />
              </button>
            </div>
            {/* Compact 4-Act Pills */}
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-lg border border-white/10">
              {(
                [
                  { shot: 'establishing' as const, label: t('B1: Panggung', 'Act 1') },
                  { shot: 'closeup' as const, label: t('B2: Dialog', 'Act 2') },
                  { shot: 'wonder-cutaway' as const, label: t('B3: Sains Why?', 'Act 3: Why?') },
                  { shot: 'celebration' as const, label: t('B4: Harmoni', 'Act 4') }
                ]
              ).map((act) => (
                <button
                  key={act.shot}
                  type="button"
                  onClick={() => {
                    soundEngine.playSFX('tap');
                    setCameraShot(act.shot);
                  }}
                  className={`px-1.5 py-0.5 rounded-md text-[9px] font-display font-bold transition-all cursor-pointer ${
                    resolvedShot === act.shot
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={togglePlay}
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-display font-bold flex items-center gap-1 cursor-pointer transition-transform hover:scale-105 ${
                isPlaying ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'
              }`}
            >
              {isPlaying ? (
                <Pause size={11} aria-hidden="true" />
              ) : (
                <Play size={11} className="fill-current" aria-hidden="true" />
              )}
              <span>{isPlaying ? t('Jeda', 'Pause') : t('Putar', 'Play')}</span>
            </button>
            {activeMode === 'study' && (
              <button
                type="button"
                onClick={openQuiz}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold hover:bg-amber-400/30 cursor-pointer"
              >
                <CheckCircle2 size={11} aria-hidden="true" />
                <span>{t('Kuis', 'Quiz')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Single-Line Sliding Karaoke Caption Stream */}
        <p className="text-xs sm:text-sm font-medium text-slate-100 truncate text-center py-0.5">
          {(() => {
            const centerIdx = Math.max(0, activeWordIndex);
            const windowSize = 9;
            const half = Math.floor(windowSize / 2);
            const startIdx = Math.max(0, Math.min(words.length - windowSize, centerIdx - half));
            const endIdx = Math.min(words.length, startIdx + windowSize);
            const visibleSlice = words.slice(startIdx, endIdx);

            return (
              <>
                {startIdx > 0 && <span className="text-slate-500 mr-1">…</span>}
                {visibleSlice.map((item, sliceIdx) => {
                  const realIdx = startIdx + sliceIdx;
                  const isActive = realIdx === activeWordIndex;
                  const isVocab = Boolean(item.isVocab);
                  return (
                    <span
                      key={`${item.word}-${realIdx}`}
                      onClick={() => isVocab && openVocab(item)}
                      className={`inline-block mr-1 px-1 py-0.5 rounded-md transition-all duration-150 ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-extrabold scale-105 shadow-sm'
                          : isVocab
                            ? 'text-emerald-300 underline decoration-wavy cursor-pointer hover:bg-white/10 font-semibold'
                            : 'text-slate-100'
                      }`}
                      title={isVocab ? t('Ketuk untuk kamus kata', 'Tap for vocabulary card') : undefined}
                    >
                      {item.word}
                      {isVocab && (
                        <BookOpen size={10} className="inline ml-0.5 -mt-0.5" aria-hidden="true" />
                      )}
                    </span>
                  );
                })}
                {endIdx < words.length && <span className="text-slate-500 ml-0.5">…</span>}
              </>
            );
          })()}
        </p>
      </div>
    </div>
  );
};
