import React, { useEffect, useRef } from 'react';
import { Star, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStoryStore } from '../../stores/storyStore';
import { useT } from '../../lib/i18n';

export const TOTAL_STARS = 3;

export const StarTracker: React.FC = () => {
  const collectedStars = useStoryStore((s) => s.collectedStars);
  const resetStars = useStoryStore((s) => s.resetStars);
  const t = useT();
  const found = collectedStars.length;
  const complete = found >= TOTAL_STARS;
  const celebrated = useRef(false);

  useEffect(() => {
    if (complete && !celebrated.current) {
      celebrated.current = true;
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.45 },
          colors: ['#f4b740', '#c8403a', '#2e7d5b', '#fffdf8'],
          disableForReducedMotion: true
        });
      } catch {
        /* no-op */
      }
    }
    if (!complete) celebrated.current = false;
  }, [complete]);

  return (
    <div className="stage-dock h-9 rounded-xl pl-2.5 pr-1.5 flex items-center gap-2 animate-pop-in" aria-live="polite">
      <div
        className="flex items-center gap-1"
        role="img"
        aria-label={t(`${found} dari ${TOTAL_STARS} bintang ditemukan`, `${found} of ${TOTAL_STARS} stars found`)}
      >
        {Array.from({ length: TOTAL_STARS }, (_, i) => (
          <Star
            key={i}
            size={14}
            aria-hidden="true"
            className={`transition-all duration-300 ${i < found ? 'fill-accent text-accent scale-110' : 'text-muted/50'}`}
          />
        ))}
      </div>
      <span className="text-[11px] font-display font-semibold text-ink pr-1 hidden sm:inline">
        {complete ? t('Semua ketemu!', 'All found!') : `${found}/${TOTAL_STARS}`}
      </span>
      {complete && (
        <button
          type="button"
          onClick={resetStars}
          className="inline-flex items-center gap-1 h-6.5 px-2 rounded-lg bg-sunken/80 hover:bg-primary hover:text-on-primary text-[11px] font-display font-semibold transition-colors"
        >
          <RotateCcw size={11} aria-hidden="true" />
          <span className="hidden md:inline">{t('Ulangi', 'Replay')}</span>
        </button>
      )}
    </div>
  );
};

