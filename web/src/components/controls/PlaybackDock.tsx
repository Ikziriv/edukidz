import React, { useState, useEffect } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gauge,
  Trophy,
  Droplet,
  Sparkles,
  Volume2,
  Mic,
  Clapperboard
} from 'lucide-react';
import { soundEngine, VOICE_PERSONAS, getActiveVoiceLabel } from '../../services/audioEngine';
import type { VoicePersonaId } from '../../types/story';
import { useT } from '../../lib/i18n';

const SPEEDS = [0.75, 1.0, 1.25];
const PERSONA_ORDER: VoicePersonaId[] = ['mama-sari', 'kak-aisyah', 'oma-rahma'];

const CHAR_DISPLAY_NAMES: Record<string, string> = {
  aisyah: 'Aisyah',
  mateo: 'Mateo',
  sofia: 'Sofia',
  mei: 'Mei-Ling',
  kenji: 'Kenji',
  amara: 'Amara'
};

export const PlaybackDock: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const isPlaying = useStoryStore((s) => s.isPlaying);
  const togglePlay = useStoryStore((s) => s.togglePlay);
  const playbackSpeed = useStoryStore((s) => s.playbackSpeed);
  const setPlaybackSpeed = useStoryStore((s) => s.setPlaybackSpeed);
  const voicePersona = useStoryStore((s) => s.voicePersona);
  const setVoicePersona = useStoryStore((s) => s.setVoicePersona);
  const speakingCharacter = useStoryStore((s) => s.speakingCharacter);
  const nextScene = useStoryStore((s) => s.nextScene);
  const prevScene = useStoryStore((s) => s.prevScene);
  const currentSceneIndex = useStoryStore((s) => s.currentSceneIndex);
  const currentStory = useStoryStore((s) => s.currentStory);
  const currentScene = useStoryStore((s) => s.currentScene);
  const language = useStoryStore((s) => s.language);
  const activeMode = useStoryStore((s) => s.activeMode);
  const openQuiz = useStoryStore((s) => s.openQuiz);
  const quizResults = useStoryStore((s) => s.quizResults);
  const toggleWatering = useStoryStore((s) => s.toggleWatering);
  const isWateringActive = useStoryStore((s) => s.isWateringActive);
  const activeWordIndex = useStoryStore((s) => s.activeWordIndex);
  const visualMode = useStoryStore((s) => s.visualMode);
  const setVisualMode = useStoryStore((s) => s.setVisualMode);
  const t = useT();

  // Automatically compact the global bottom dock when entering VIDEO studio so the video lower-thirds never double-stack
  useEffect(() => {
    setIsMinimized(visualMode === 'VIDEO');
  }, [visualMode]);

  const totalScenes = currentStory.scenes.length;
  const wordsCount = currentScene.dialogue[language].words.length;
  const progressPercent =
    wordsCount > 0 && activeWordIndex >= 0
      ? Math.min(100, Math.max(0, ((activeWordIndex + 1) / wordsCount) * 100))
      : 0;
  const sceneScore = quizResults[currentScene.id];
  const currentPersonaSpec = VOICE_PERSONAS[voicePersona];
  const activeVoiceEngineLabel = getActiveVoiceLabel(language, voicePersona);

  const handleNextSpeed = () => {
    soundEngine.playSFX('tap');
    const currIdx = SPEEDS.indexOf(playbackSpeed);
    const nextIdx = (currIdx + 1) % SPEEDS.length;
    setPlaybackSpeed(SPEEDS[nextIdx]);
  };

  const handleCyclePersona = () => {
    const currIdx = PERSONA_ORDER.indexOf(voicePersona);
    const nextPersona = PERSONA_ORDER[(currIdx + 1) % PERSONA_ORDER.length];
    setVoicePersona(nextPersona);
  };

  if (isMinimized) {
    return (
      <div className="w-fit mx-auto px-3 pb-2 animate-pop-in">
        <div className="stage-dock rounded-full p-1 pl-2.5 flex items-center gap-1.5 shadow-lg">
          <button
            type="button"
            onClick={togglePlay}
            className={`btn h-7 min-h-7 px-3 rounded-full text-xs font-bold ${
              isPlaying ? 'bg-[#d4574e] text-white' : 'btn-primary'
            }`}
          >
            {isPlaying ? <Pause size={12} aria-hidden="true" /> : <Play size={12} className="fill-current" aria-hidden="true" />}
            <span>{isPlaying ? t('Jeda', 'Pause') : t('Dengarkan Narasi', 'Play Narration')}</span>
          </button>
          <button
            type="button"
            onClick={handleCyclePersona}
            className="btn btn-soft h-7 min-h-7 px-2.5 rounded-full text-[11px] font-display font-bold flex items-center gap-1"
            title={`${currentPersonaSpec.role[language]} · ${activeVoiceEngineLabel}`}
          >
            <Mic size={11} className="text-primary" aria-hidden="true" />
            <span>{currentPersonaSpec.name[language]}</span>
          </button>
          <span className="text-[11px] font-display font-bold text-ink hidden sm:inline px-1">
            {t('Hari', 'Day')} {currentSceneIndex + 1}/{totalScenes}
          </span>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="btn btn-ghost h-7 min-h-7 w-7 p-0 rounded-full text-muted hover:text-ink"
            title={t('Perluas Bar Narasi', 'Expand Transport Bar')}
            aria-label={t('Perluas Bar Narasi', 'Expand Transport Bar')}
          >
            <ChevronUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 pb-2.5 animate-pop-in">
      <div className="stage-dock rounded-[24px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 flex flex-col gap-1.5 relative overflow-hidden">
        {/* Top Edge Illuminated Progress Scrubber (Word-by-word) */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-line/60"
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('Kemajuan narasi', 'Narration progress')}
        >
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          {/* Left: Recessed Chapter Stepper Well */}
          <div className="stage-well p-1 rounded-2xl flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentSceneIndex === 0}
              onClick={prevScene}
              className="btn btn-soft btn-icon h-9 w-9 min-h-9 rounded-xl bg-surface/90 border-line/50"
              title={t('Bab sebelumnya', 'Previous chapter')}
              aria-label={t('Bab sebelumnya', 'Previous chapter')}
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>

            <div className="text-center px-1.5 min-w-[96px] sm:min-w-[140px]">
              <div className="flex items-center justify-center gap-1">
                <span className="eyebrow text-[9px] leading-tight text-primary">
                  {t('Hari', 'Day')} {currentSceneIndex + 1}/{totalScenes}
                  {currentScene.dayOfWeek ? ` · ${currentScene.dayOfWeek[language]}` : ''}
                </span>
                {activeWordIndex >= 0 && (
                  <span className="text-[9px] font-mono font-bold text-muted">
                    · {Math.round(progressPercent)}%
                  </span>
                )}
              </div>
              <span className="text-xs font-display font-bold text-ink truncate block max-w-[125px] sm:max-w-[180px]">
                {currentScene.title[language]}
              </span>
            </div>

            <button
              type="button"
              disabled={currentSceneIndex >= totalScenes - 1}
              onClick={nextScene}
              className="btn btn-soft btn-icon h-9 w-9 min-h-9 rounded-xl bg-surface/90 border-line/50"
              title={t('Bab berikutnya', 'Next chapter')}
              aria-label={t('Bab berikutnya', 'Next chapter')}
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>

          {/* Center: Play/Pause Studio Hero Capsule + Speed */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              className={`btn px-4 sm:px-5 h-10 min-h-10 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all duration-200 ${
                isPlaying
                  ? 'bg-[#d4574e] text-white hover:bg-[#b8433a] shadow-[#d4574e]/30'
                  : 'btn-primary'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} aria-hidden="true" />
                  <span>{t('Jeda Narasi', 'Pause')}</span>
                  <span className="inline-flex gap-0.5 items-end h-3 ml-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-white/90 rounded-full animate-[bounce_0.6s_infinite_100ms] h-2" />
                    <span className="w-0.5 bg-white/90 rounded-full animate-[bounce_0.6s_infinite_200ms] h-3" />
                    <span className="w-0.5 bg-white/90 rounded-full animate-[bounce_0.6s_infinite_300ms] h-1.5" />
                  </span>
                </>
              ) : (
                <>
                  <Play size={16} className="fill-current" aria-hidden="true" />
                  <span>{t('Dengarkan Narasi', 'Play Narration')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCyclePersona}
              className="btn btn-soft h-10 min-h-10 px-2.5 text-xs rounded-2xl font-display font-bold flex items-center gap-1.5 border-primary/25 hover:border-primary/60"
              title={`${currentPersonaSpec.role[language]} · ${activeVoiceEngineLabel}`}
              aria-label={`${t('Suara Pendongeng', 'Storyteller Voice')}: ${currentPersonaSpec.name[language]}`}
            >
              <Mic size={13} className="text-primary shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[92px] sm:max-w-[120px]">{currentPersonaSpec.name[language]}</span>
              {isPlaying && (
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[9px] font-extrabold">
                  {CHAR_DISPLAY_NAMES[speakingCharacter] || 'Aisyah'}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleNextSpeed}
              className="btn btn-soft h-10 min-h-10 px-2.5 text-xs rounded-2xl tabular-nums font-mono font-bold"
              title={t('Ubah kecepatan bicara', 'Change narration speed')}
              aria-label={`${t('Kecepatan', 'Speed')} ${playbackSpeed}x`}
            >
              <Gauge size={13} aria-hidden="true" />
              <span>{playbackSpeed}x</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('chime');
                setVisualMode(visualMode === 'VIDEO' ? '3D' : 'VIDEO');
              }}
              className={`btn h-10 min-h-10 px-2.5 text-xs rounded-2xl font-display font-bold flex items-center gap-1 transition-all ${
                visualMode === 'VIDEO'
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                  : 'btn-soft border-amber-400/40 hover:border-amber-400'
              }`}
              title={
                currentScene.videoSpec?.wonderTitle[language] ??
                t('Tonton Video Animasi I Wonder Why', 'Watch I Wonder Why Animation')
              }
            >
              <Clapperboard size={13} className={visualMode === 'VIDEO' ? 'text-slate-950' : 'text-amber-500'} aria-hidden="true" />
              <span className="hidden sm:inline">
                {visualMode === 'VIDEO' ? t('Panggung 3D', '3D Stage') : t('Video Why?', 'Why? Video')}
              </span>
            </button>
          </div>

          {/* Right: Mode-Specific Hero Action + Minimize */}
          <div className="flex items-center gap-1.5">
            {activeMode === 'study' && (
              <button
                type="button"
                onClick={openQuiz}
                className="btn btn-accent h-10 min-h-10 px-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm"
              >
                <Trophy size={15} aria-hidden="true" />
                <span>{t('Kuis Ceria', 'Take Quiz')}</span>
                {typeof sceneScore === 'number' && (
                  <span className="chip min-h-5 py-0 px-1.5 text-[10px] bg-on-accent text-accent font-mono ml-0.5">
                    {sceneScore}%
                  </span>
                )}
              </button>
            )}

            {activeMode === 'playing' && (
              <button
                type="button"
                onClick={toggleWatering}
                className={`btn h-10 min-h-10 px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isWateringActive
                    ? 'bg-sky-500 text-white ring-3 ring-sky-200 dark:ring-sky-900 animate-pulse'
                    : 'btn-soft text-sky-700 dark:text-sky-300'
                }`}
              >
                <Droplet size={15} aria-hidden="true" />
                <span>
                  {isWateringActive ? t('Menyiram…', 'Watering…') : t('Siram Tunas', 'Water Sprouts')}
                </span>
              </button>
            )}

            {activeMode === 'sleeping' && (
              <div className="chip font-display text-xs px-2.5 py-1 border-line bg-sunken text-muted hidden sm:inline-flex items-center gap-1.5">
                <Volume2 size={13} className="text-accent" aria-hidden="true" />
                <Sparkles size={12} className="text-accent" aria-hidden="true" />
                <span>{t('Lullaby Tenang', 'Soothing Lullaby')}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="btn btn-ghost h-9 min-h-9 w-8 p-0 rounded-xl text-muted hover:text-ink"
              title={t('Kecilkan Bar Narasi', 'Minimize Transport Bar')}
              aria-label={t('Kecilkan Bar Narasi', 'Minimize Transport Bar')}
            >
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

