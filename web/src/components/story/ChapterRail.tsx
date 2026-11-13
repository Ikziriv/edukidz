import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  Trophy,
  Sparkles,
  Clapperboard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useStoryStore } from '../../stores/storyStore';
import type { ActivityCategory } from '../../types/story';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';

const LEAD_CHAR_COLORS: Record<
  string,
  { name: string; fullName: string; color: string; role: { id: string; en: string } }
> = {
  aisyah: {
    name: 'Aisyah',
    fullName: 'Aisyah Rahma',
    color: '#dc2626',
    role: { id: 'Kapten Botani', en: 'Botany Lead' }
  },
  mateo: {
    name: 'Mateo',
    fullName: 'Mateo Silva',
    color: '#f59e0b',
    role: { id: 'Musik & Tanah', en: 'Music & Soil' }
  },
  sofia: {
    name: 'Sofia',
    fullName: 'Sofia Lindqvist',
    color: '#8b5cf6',
    role: { id: 'Seni & Polinasi', en: 'Pollination Artist' }
  },
  mei: {
    name: 'Mei-Ling',
    fullName: 'Mei-Ling Noor',
    color: '#f97316',
    role: { id: 'Rempah & Herbal', en: 'Herbal Keeper' }
  },
  kenji: {
    name: 'Kenji',
    fullName: 'Kenji Takahashi',
    color: '#0284c7',
    role: { id: 'Arsitek Air', en: 'Water Architect' }
  },
  amara: {
    name: 'Amara',
    fullName: 'Amara Okafor',
    color: '#ec4899',
    role: { id: 'Kapten Kebun', en: 'Garden Captain' }
  }
};

type RailFilter = 'all' | 'week-1' | 'week-2' | ActivityCategory;

/**
 * Minimalist Editorial Story Header & 14-Day Episode Rail:
 * - Precision typography: Inter for structural headings/controls, Work Sans for narrative subtitles.
 * - Eliminates redundant multi-pill ribbons in favor of a single quiet editorial eyebrow.
 * - Streamlined horizontal filter strip and distraction-free chapter stepping cards.
 */
export const ChapterRail: React.FC = () => {
  const [filter, setFilter] = useState<RailFilter>('all');
  const railRef = useRef<HTMLOListElement | null>(null);
  const activeStepRef = useRef<HTMLButtonElement | null>(null);

  const scenes = useStoryStore((s) => s.currentStory.scenes);
  const currentSceneIndex = useStoryStore((s) => s.currentSceneIndex);
  const selectScene = useStoryStore((s) => s.selectScene);
  const nextScene = useStoryStore((s) => s.nextScene);
  const prevScene = useStoryStore((s) => s.prevScene);
  const language = useStoryStore((s) => s.language);
  const quizResults = useStoryStore((s) => s.quizResults);
  const visualMode = useStoryStore((s) => s.visualMode);
  const setVisualMode = useStoryStore((s) => s.setVisualMode);
  const t = useT();

  const totalDays = scenes.length;
  const activeScene = scenes[currentSceneIndex] ?? scenes[0];
  const activeDayNumber = activeScene.dayNumber ?? currentSceneIndex + 1;
  const activeWeekNumber = activeScene.weekNumber ?? (activeDayNumber > 7 ? 2 : 1);
  const activeDayName = activeScene.dayOfWeek?.[language] ?? `${t('Hari', 'Day')} ${activeDayNumber}`;
  const activeLead = LEAD_CHAR_COLORS[activeScene.leadCharacter ?? 'aisyah'] ?? LEAD_CHAR_COLORS.aisyah;
  const completedQuizzesCount = scenes.filter((sc) => (quizResults[sc.id] ?? 0) > 0).length;
  const seriesProgressPct = Math.round(((currentSceneIndex + 1) / Math.max(1, totalDays)) * 100);

  // Strip redundant "Hari X: " or "Day X: " prefix so the hero title reads like a clean editorial chapter
  const activeCleanTitle = activeScene.title[language].replace(/^(Day|Hari)\s*\d+\s*:\s*/i, '');

  // Auto-scroll active chapter card into smooth horizontal view when scene changes
  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentSceneIndex, filter]);

  const getSceneCount = (targetFilter: RailFilter) => {
    if (targetFilter === 'all') return scenes.length;
    return scenes.filter((sc) => {
      const dayNum = sc.dayNumber ?? sc.chapterNumber;
      const weekNum = sc.weekNumber ?? (dayNum > 7 ? 2 : 1);
      if (targetFilter === 'week-1') return weekNum === 1;
      if (targetFilter === 'week-2') return weekNum === 2;
      return sc.activityCategory === targetFilter;
    }).length;
  };

  const filteredScenes = scenes
    .map((scene, idx) => ({ scene, idx }))
    .filter(({ scene }) => {
      const dayNum = scene.dayNumber ?? scene.chapterNumber;
      const weekNum = scene.weekNumber ?? (dayNum > 7 ? 2 : 1);
      if (filter === 'all') return true;
      if (filter === 'week-1') return weekNum === 1;
      if (filter === 'week-2') return weekNum === 2;
      return scene.activityCategory === filter;
    });

  const handleFilterSelect = (nextFilter: RailFilter) => {
    soundEngine.playSFX('chime');
    setFilter(nextFilter);
    const matching = scenes
      .map((scene, idx) => ({ scene, idx }))
      .filter(({ scene }) => {
        const dayNum = scene.dayNumber ?? scene.chapterNumber;
        const weekNum = scene.weekNumber ?? (dayNum > 7 ? 2 : 1);
        if (nextFilter === 'all') return true;
        if (nextFilter === 'week-1') return weekNum === 1;
        if (nextFilter === 'week-2') return weekNum === 2;
        return scene.activityCategory === nextFilter;
      });
    if (matching.length > 0 && !matching.some((m) => m.idx === currentSceneIndex)) {
      selectScene(matching[0].idx);
    }
  };

  const getActivityLabel = (cat?: ActivityCategory) => {
    switch (cat) {
      case 'study-learning':
        return t('Belajar & Sains', 'Study & Science');
      case 'zoo-visit':
        return t('Taman Satwa', 'Sanctuary Zoo');
      case 'muslim-prayer':
        return t('Shalat & Doa', 'Peaceful Prayer');
      default:
        return t('Kebun Sahabat', 'Friendship Garden');
    }
  };

  const filterTabs: Array<{ id: RailFilter; label: string }> = [
    { id: 'all', label: t('Semua Bab', 'All Chapters') },
    { id: 'week-1', label: t('Minggu 1', 'Week 1') },
    { id: 'week-2', label: t('Minggu 2', 'Week 2') },
    { id: 'gardening', label: t('Berkebun', 'Gardening') },
    { id: 'study-learning', label: t('Sains', 'Science') },
    { id: 'zoo-visit', label: t('Satwa', 'Sanctuary') },
    { id: 'muslim-prayer', label: t('Ibadah', 'Prayer') }
  ];

  return (
    <section
      aria-label={t('Header Bab Cerita & Kalender 14 Hari', 'Story Chapter Header & 14-Day Calendar')}
      className="card relative overflow-hidden p-4 sm:p-5 space-y-4"
    >
      {/* Subtle ambient radial wash matching active lead character */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 w-72 h-72 rounded-full opacity-10 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: activeLead.color }}
      />

      {/* ====================================================================
          TIER 1: EDITORIAL HERO HEADER (CALENDAR BADGE + TITLE + STUDIO CONTROLS)
          ==================================================================== */}
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Minimalist Day Calendar Emblem + Editorial Title & Narrative Subtitle */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
          {/* Architectural Day Badge */}
          <div className="shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-sunken/55 border border-line/80 flex flex-col items-center justify-center text-center select-none relative overflow-hidden shadow-2xs">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 transition-colors duration-300"
              style={{ backgroundColor: activeLead.color }}
            />
            <span className="text-[9px] font-display font-semibold uppercase tracking-widest text-muted leading-none mt-0.5">
              {t(`MGG ${activeWeekNumber}`, `WK ${activeWeekNumber}`)}
            </span>
            <span className="text-lg sm:text-xl font-display font-bold tabular-nums text-ink leading-tight mt-0.5">
              {String(activeDayNumber).padStart(2, '0')}
            </span>
          </div>

          {/* Editorial Eyebrow, Headline (Inter) & Narrative Subtitle (Work Sans) */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-display font-medium text-muted">
              <span className="font-semibold text-primary">
                {t(`Hari ke-${activeDayNumber} · ${activeDayName}`, `Day ${activeDayNumber} · ${activeDayName}`)}
              </span>
              <span aria-hidden="true" className="text-line">•</span>
              <span className="inline-flex items-center gap-1.5 text-ink">
                <span
                  className="w-2 h-2 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: activeLead.color }}
                  aria-hidden="true"
                />
                <span className="font-semibold">{activeLead.name}</span>
                <span className="text-muted hidden sm:inline">
                  ({activeLead.role[language]})
                </span>
              </span>
              <span aria-hidden="true" className="text-line hidden sm:inline">•</span>
              <span className="hidden sm:inline text-muted">
                {getActivityLabel(activeScene.activityCategory)}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-ink tracking-tight leading-snug">
              {activeCleanTitle}
            </h1>

            <p className="text-xs sm:text-[13px] font-sans text-muted leading-relaxed line-clamp-1">
              {activeScene.subtitle[language]}
            </p>
          </div>
        </div>

        {/* Right: Minimalist Stepper, Progress & Video Studio Toggle */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-start lg:self-center shrink-0">
          {completedQuizzesCount > 0 && (
            <span
              className="inline-flex items-center gap-1 h-9 px-2.5 rounded-xl bg-accent-soft/80 border border-accent/30 text-on-accent font-display font-semibold text-xs tabular-nums"
              title={t('Kuis Bab Selesai', 'Completed Chapter Quizzes')}
            >
              <Trophy size={12} aria-hidden="true" />
              <span>{completedQuizzesCount}/{totalDays}</span>
            </span>
          )}

          {/* Previous / Next Chapter Stepper */}
          <div className="inline-flex items-center h-9 rounded-xl bg-sunken/60 border border-line/80 p-0.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('chime');
                prevScene();
              }}
              disabled={currentSceneIndex === 0}
              aria-label={t('Bab Sebelumnya', 'Previous Chapter')}
              title={t('Bab Sebelumnya (Panah Kiri)', 'Previous Chapter (Left Arrow)')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ink hover:bg-surface disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={15} aria-hidden="true" />
            </button>
            <span className="px-2.5 text-xs font-display font-semibold tabular-nums text-ink select-none">
              {String(activeDayNumber).padStart(2, '0')}
              <span className="text-muted font-normal"> / {totalDays}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('chime');
                nextScene();
              }}
              disabled={currentSceneIndex >= totalDays - 1}
              aria-label={t('Bab Berikutnya', 'Next Chapter')}
              title={t('Bab Berikutnya (Panah Kanan)', 'Next Chapter (Right Arrow)')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ink hover:bg-surface disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>

          {/* "I Wonder Why" Video Studio Toggle Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playSFX('chime');
              setVisualMode(visualMode === 'VIDEO' ? '3D' : 'VIDEO');
            }}
            className={`inline-flex items-center gap-2 h-9 px-3.5 rounded-xl font-display font-semibold text-xs transition-all cursor-pointer border ${
              visualMode === 'VIDEO'
                ? 'bg-primary text-on-primary border-primary shadow-xs'
                : 'bg-surface hover:bg-sunken/60 text-ink border-line/90'
            }`}
            title={
              activeScene.videoSpec?.wonderTitle[language] ??
              t('Tonton Video Animasi I Wonder Why untuk episode ini', 'Watch I Wonder Why Video Animation for this episode')
            }
          >
            <Clapperboard
              size={13}
              className={visualMode === 'VIDEO' ? 'text-on-primary' : 'text-primary'}
              aria-hidden="true"
            />
            <span>
              {visualMode === 'VIDEO'
                ? t('Panggung 3D', '3D Stage')
                : t('Video "I Wonder Why"', '"I Wonder Why" Video')}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-display font-semibold tabular-nums ${
                visualMode === 'VIDEO'
                  ? 'bg-black/20 text-on-primary'
                  : 'bg-sunken text-muted'
              }`}
            >
              Ep {activeDayNumber}
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          HAIRLINE PROGRESS TRACK
          ==================================================================== */}
      <div
        className="relative h-px w-full bg-line/60 overflow-hidden"
        title={t(`Progres Cerita: Hari ${activeDayNumber} dari ${totalDays}`, `Story Progress: Day ${activeDayNumber} of ${totalDays}`)}
      >
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${seriesProgressPct}%` }}
        />
      </div>

      {/* ====================================================================
          TIER 2: MINIMALIST FILTER TABS & 14-DAY EPISODE RAIL
          ==================================================================== */}
      <div className="space-y-2.5">
        {/* Clean Text-First Filter Strip */}
        <div
          className="flex items-center justify-between gap-2 overflow-x-auto scroll-thin pb-0.5 -mx-1 px-1"
          role="tablist"
          aria-label={t('Filter Minggu dan Aktivitas Cerita', 'Filter Story Weeks and Activities')}
        >
          <div className="flex items-center gap-1">
            {filterTabs.map((tab) => {
              const active = filter === tab.id;
              const count = getSceneCount(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterSelect(tab.id)}
                  className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-display font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary shadow-2xs'
                      : 'text-muted hover:text-ink hover:bg-sunken/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums ${
                      active ? 'text-on-primary/80' : 'text-muted/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="hidden md:inline-block text-[11px] font-display font-medium text-muted shrink-0 tabular-nums">
            {t('Seri 14 Hari', '14-Day Series')}
          </span>
        </div>

        {/* 14-Day Horizontal Episode Strip */}
        <nav aria-label={t('Daftar 14 Bab Harian', '14 Daily Chapters')} className="-mx-1 overflow-x-auto scroll-thin">
          <ol ref={railRef} className="flex items-stretch gap-2 px-1 pb-1 min-w-max">
            {filteredScenes.map(({ scene, idx }) => {
              const isActive = idx === currentSceneIndex;
              const isDone = idx < currentSceneIndex;
              const dayNum = scene.dayNumber ?? scene.chapterNumber;
              const weekNum = scene.weekNumber ?? (dayNum > 7 ? 2 : 1);
              const dayLabel = scene.dayOfWeek?.[language] ?? `${t('Hari', 'Day')} ${dayNum}`;
              const leadInfo = LEAD_CHAR_COLORS[scene.leadCharacter ?? 'aisyah'] ?? LEAD_CHAR_COLORS.aisyah;
              const bestScore = quizResults[scene.id];
              const cleanTitle = scene.title[language].replace(/^(Day|Hari)\s*\d+\s*:\s*/i, '');

              return (
                <li key={scene.id} className="flex">
                  <button
                    ref={isActive ? activeStepRef : null}
                    type="button"
                    onClick={() => {
                      if (!isActive) {
                        soundEngine.playSFX('chime');
                        selectScene(idx);
                      }
                    }}
                    aria-current={isActive ? 'step' : undefined}
                    title={`${t('Minggu', 'Week')} ${weekNum} · ${t('Hari', 'Day')} ${dayNum} (${dayLabel}) — ${scene.title[language]}`}
                    className={`group relative flex items-center gap-2.5 min-h-[48px] pl-2 pr-3 py-1.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-surface border-primary ring-2 ring-primary/15 shadow-2xs'
                        : 'bg-sunken/35 border-line/60 hover:bg-surface hover:border-line'
                    }`}
                  >
                    {/* Minimalist Tabular Day Number Badge */}
                    <span
                      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-display text-xs font-semibold tabular-nums leading-none transition-colors ${
                        isActive
                          ? 'bg-primary text-on-primary'
                          : isDone
                            ? 'bg-primary-soft text-primary'
                            : 'bg-surface/90 text-muted border border-line/60'
                      }`}
                    >
                      {isDone ? (
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        String(dayNum).padStart(2, '0')
                      )}
                    </span>

                    {/* Clean 2-Line Episode Metadata & Title */}
                    <span className="leading-tight min-w-0">
                      <span className="flex items-center gap-1.5 text-[10px] font-display font-medium text-muted">
                        <span className={isActive ? 'text-primary font-semibold' : ''}>
                          {dayLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: leadInfo.color }}
                            aria-hidden="true"
                          />
                          <span className="text-ink/80">{leadInfo.name}</span>
                        </span>
                        {(dayNum === 7 || dayNum === 14) && (
                          <Sparkles size={10} className="text-accent inline shrink-0" aria-hidden="true" />
                        )}
                      </span>
                      <span
                        className={`block text-xs font-display font-semibold tracking-tight max-w-[160px] sm:max-w-[195px] truncate mt-0.5 ${
                          isActive ? 'text-ink' : 'text-muted group-hover:text-ink'
                        }`}
                      >
                        {cleanTitle}
                      </span>
                    </span>

                    {/* Quiz Score Pill if completed */}
                    {typeof bestScore === 'number' && (
                      <span
                        className="ml-0.5 px-1.5 py-0.5 rounded-md bg-accent/15 text-ink font-display font-semibold tabular-nums text-[10px]"
                        title={`${t('Skor Kuis', 'Quiz Score')}: ${bestScore}%`}
                      >
                        ★{bestScore}%
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};
