import React from 'react';
import { useStoryStore } from '../../stores/storyStore';
import type { LanguageCode, StoryMode } from '../../types/story';
import { BookOpen, Moon, Gamepad2 } from 'lucide-react';
import { SleepSanctuaryOverlay } from '../sleep/SleepSanctuaryOverlay';
import { useT } from '../../lib/i18n';

const MODES: Array<{ id: StoryMode; label: { en: string; id: string }; Icon: typeof BookOpen }> = [
  { id: 'study', label: { en: 'Study', id: 'Belajar' }, Icon: BookOpen },
  { id: 'playing', label: { en: 'Play', id: 'Main' }, Icon: Gamepad2 },
  { id: 'sleeping', label: { en: 'Sleep', id: 'Tidur' }, Icon: Moon }
];

const LANGUAGES: Array<{ id: LanguageCode; label: string; name: string }> = [
  { id: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { id: 'en', label: 'EN', name: 'English' }
];

export const BrandMark: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="var(--c-primary)" />
    <path d="M32 50V30" stroke="var(--c-on-primary)" strokeWidth="5" strokeLinecap="round" />
    <path d="M32 32c0-9 7-15 16-15 0 9-7 15-16 15Z" fill="var(--c-accent)" />
    <path d="M32 36c0-8-6-13-14-13 0 8 6 13 14 13Z" fill="var(--c-on-primary)" opacity="0.92" />
  </svg>
);

export const TopNavBar: React.FC = () => {
  const language = useStoryStore((s) => s.language);
  const setLanguage = useStoryStore((s) => s.setLanguage);
  const activeMode = useStoryStore((s) => s.activeMode);
  const setMode = useStoryStore((s) => s.setMode);
  const currentSeries = useStoryStore((s) => s.currentSeries);
  const t = useT();

  const modeIndex = Math.max(0, MODES.findIndex((m) => m.id === activeMode));
  const langIndex = language === 'id' ? 0 : 1;

  return (
    <header className="sticky top-0 z-30 px-3 pt-2.5 sm:px-6">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-3 py-1.5 flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Minimalist Brand & Series Identity */}
        <a
          href="#story"
          className="flex items-center gap-2.5 min-w-0 rounded-xl pr-1 group"
          aria-label="EduKidz"
        >
          <BrandMark className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-display font-bold text-base sm:text-[17px] tracking-tight text-ink">
              EduKidz
            </span>
            <span className="hidden lg:block h-3.5 w-px bg-line/80" aria-hidden="true" />
            <span className="hidden lg:block text-xs font-medium text-muted truncate max-w-[210px]">
              {currentSeries.title[language]}
            </span>
            <span className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded-md bg-sunken/70 border border-line/60 text-[10px] font-display font-semibold text-muted tracking-tight">
              {t('Usia', 'Ages')} {currentSeries.targetAge}
            </span>
          </div>
        </a>

        {/* Center: Precision Mode Segmented Switcher */}
        <div className="flex-1 flex justify-center min-w-0 max-w-xs">
          <div
            role="radiogroup"
            aria-label={t('Pilih mode cerita', 'Choose story mode')}
            className="segmented w-full p-0.5 rounded-xl bg-sunken/70 border-line/70"
          >
            <span
              className="segmented-thumb rounded-[10px]"
              style={{ width: `calc((100% - 4px) / ${MODES.length})`, transform: `translateX(${modeIndex * 100}%)` }}
              aria-hidden="true"
            />
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={activeMode === id}
                onClick={() => activeMode !== id && setMode(id)}
                className="segmented-item min-h-8 px-2.5 text-xs font-semibold"
              >
                <Icon size={14} aria-hidden="true" />
                <span className="hidden sm:inline">{label[language]}</span>
                <span className="sr-only sm:hidden">{label[language]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sanctuary Audio & Bilingual Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <SleepSanctuaryOverlay />

          <div
            role="radiogroup"
            aria-label={t('Bahasa', 'Language')}
            className="segmented p-0.5 rounded-xl bg-sunken/70 border-line/70"
          >
            <span
              className="segmented-thumb rounded-[10px]"
              style={{ width: 'calc((100% - 4px) / 2)', transform: `translateX(${langIndex * 100}%)` }}
              aria-hidden="true"
            />
            {LANGUAGES.map((l) => (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={language === l.id}
                aria-label={l.name}
                lang={l.id}
                onClick={() => language !== l.id && setLanguage(l.id)}
                className="segmented-item min-h-8 px-2.5 text-[11px] font-bold tracking-wider"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
