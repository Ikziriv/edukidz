import React from 'react';
import {
  Users,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStoryStore } from '../../stores/storyStore';
import { CHARACTER_PALETTES, CHARACTER_ROSTER } from '../../constants/characterRegistry';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';

export const CharacterMoverDeck: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const selectedCharacter = useStoryStore((s) => s.selectedCharacter);
  const selectCharacter = useStoryStore((s) => s.selectCharacter);
  const triggerCharacterAction = useStoryStore((s) => s.triggerCharacterAction);
  const nudgeSelectedCharacter = useStoryStore((s) => s.nudgeSelectedCharacter);
  const resetCharacterPositions = useStoryStore((s) => s.resetCharacterPositions);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted px-1 shrink-0">
        <Users size={11} className="text-primary" aria-hidden="true" />
        <span>{t('Karakter', 'Cast')}</span>
      </span>

      {/* Character Roster Selector Pills in Recessed Well */}
      <div
        className="stage-well p-1 rounded-xl flex items-center gap-1"
        role="radiogroup"
        aria-label={t('Pilih Karakter', 'Select Character')}
      >
        {CHARACTER_ROSTER.map((char) => {
          const active = selectedCharacter === char.id;
          const palette = CHARACTER_PALETTES[char.id];
          const headwearHint = palette.headwearSummary?.[language] ?? '';
          return (
            <button
              key={char.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                soundEngine.playSFX('tap');
                selectCharacter(char.id);
                triggerCharacterAction(char.id);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-primary text-on-primary shadow-md scale-[1.03] ring-1 ring-amber-300/70'
                  : 'bg-surface/85 text-ink hover:bg-surface border border-line/50 hover:border-primary/40'
              }`}
              title={`${char.label} (${palette.countryTag}) · ${headwearHint}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-white/90 shadow-xs"
                style={{ backgroundColor: char.color }}
                aria-hidden="true"
              />
              <span className={active ? 'inline' : compact ? 'hidden 2xl:inline' : 'hidden sm:inline'}>
                {char.label}
              </span>
              {active && palette.usesHijab && (
                <span className="hidden sm:inline-block px-1 py-0.2 rounded bg-white/20 text-[9px] font-extrabold uppercase tracking-tight">
                  Hijab
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tactile Directional D-Pad Capsule + Wave Action */}
      <div
        className="stage-well p-1 rounded-xl flex items-center gap-0.5"
        role="group"
        aria-label={t('Gerakkan Karakter', 'Move Character')}
      >
        <button
          type="button"
          onClick={() => {
            soundEngine.playSFX('chime');
            triggerCharacterAction(selectedCharacter);
          }}
          className="btn btn-soft h-7 min-h-7 px-2 rounded-lg bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/40 text-[10px] font-display font-bold flex items-center gap-1 mr-0.5"
          title={t('Lompat & Sapa', 'Wave & Bounce')}
          aria-label={t('Lompat & Sapa', 'Wave & Bounce')}
        >
          <Sparkles size={11} aria-hidden="true" />
          <span className="hidden md:inline">{t('Sapa', 'Wave')}</span>
        </button>
        <button
          type="button"
          onClick={() => nudgeSelectedCharacter(-0.35, 0)}
          className="btn btn-soft h-7 min-h-7 w-7 p-0 rounded-lg bg-surface/90 border-line/50"
          title={t('Gerak Kiri (A / Panah Kiri)', 'Move Left (A / Left Arrow)')}
          aria-label={t('Gerak Kiri', 'Move Left')}
        >
          <ArrowLeft size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => nudgeSelectedCharacter(0, -0.35)}
          className="btn btn-soft h-7 min-h-7 w-7 p-0 rounded-lg bg-surface/90 border-line/50"
          title={t('Gerak Maju (W / Panah Atas)', 'Move Forward (W / Up Arrow)')}
          aria-label={t('Gerak Maju', 'Move Forward')}
        >
          <ArrowUp size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => nudgeSelectedCharacter(0, 0.35)}
          className="btn btn-soft h-7 min-h-7 w-7 p-0 rounded-lg bg-surface/90 border-line/50"
          title={t('Gerak Mundur (S / Panah Bawah)', 'Move Back (S / Down Arrow)')}
          aria-label={t('Gerak Mundur', 'Move Back')}
        >
          <ArrowDown size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => nudgeSelectedCharacter(0.35, 0)}
          className="btn btn-soft h-7 min-h-7 w-7 p-0 rounded-lg bg-surface/90 border-line/50"
          title={t('Gerak Kanan (D / Panah Kanan)', 'Move Right (D / Right Arrow)')}
          aria-label={t('Gerak Kanan', 'Move Right')}
        >
          <ArrowRight size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={resetCharacterPositions}
          className="btn btn-ghost h-7 min-h-7 w-7 p-0 rounded-lg ml-0.5 text-muted hover:text-ink"
          title={t('Kembalikan posisi karakter', 'Reset character positions')}
          aria-label={t('Reset Posisi', 'Reset Positions')}
        >
          <RotateCcw size={12} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

