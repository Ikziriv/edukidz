import React, { useState } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import { Moon, Clock, EyeOff, TimerOff } from 'lucide-react';
import { soundEngine } from '../../services/audioEngine';
import { Modal, ModalHeader } from '../ui/Modal';
import { useT } from '../../lib/i18n';

const TIMER_OPTIONS = [10, 20, 30];

const formatTime = (totalSeconds: number | null): string => {
  if (totalSeconds === null) return '--:--';
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const SleepSanctuaryOverlay: React.FC = () => {
  const activeMode = useStoryStore((s) => s.activeMode);
  const sleepTimerMinutes = useStoryStore((s) => s.sleepTimerMinutes);
  const sleepRemainingSeconds = useStoryStore((s) => s.sleepRemainingSeconds);
  const isBlackoutActive = useStoryStore((s) => s.isBlackoutActive);
  const startSleepTimer = useStoryStore((s) => s.startSleepTimer);
  const cancelSleepTimer = useStoryStore((s) => s.cancelSleepTimer);
  const toggleBlackout = useStoryStore((s) => s.toggleBlackout);
  const t = useT();

  const [modalOpen, setModalOpen] = useState(false);
  const isSleeping = activeMode === 'sleeping';
  const hasTimer = sleepRemainingSeconds !== null;

  return (
    <>
      {/* Night-light blackout cover */}
      {isBlackoutActive && (
        <button
          type="button"
          onClick={toggleBlackout}
          onKeyDown={(e) => e.key === 'Escape' && toggleBlackout()}
          autoFocus
          aria-label={t('Nyalakan layar kembali', 'Wake the screen')}
          className="fixed inset-0 z-[60] bg-[#04060d] text-[#f5ead3] flex flex-col items-center justify-center p-6 select-none animate-fade-in"
        >
          <span className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                style={{
                  top: `${(i * 17) % 95}%`,
                  left: `${(i * 29 + 7) % 95}%`,
                  animationDuration: `${2.5 + (i % 4)}s`,
                  animationDelay: `${(i % 5) * 0.4}s`
                }}
                className={`absolute rounded-full bg-amber-100 animate-pulse ${i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'} opacity-60`}
              />
            ))}
          </span>

          <span className="relative text-center max-w-sm flex flex-col items-center">
            <span className="w-20 h-20 mb-6 rounded-full bg-amber-300/10 text-amber-200 flex items-center justify-center ring-1 ring-amber-200/20 animate-float">
              <Moon size={36} aria-hidden="true" />
            </span>
            <span className="font-display text-3xl font-semibold text-amber-100 mb-3">
              {t('Tidur nyenyak, Sahabat Cilik', 'Sweet dreams, little friend')}
            </span>
            <span className="text-amber-100/60 text-sm leading-relaxed mb-8">
              {t(
                'Layar diredupkan untuk melindungi mata. Musik memudar perlahan.',
                'The screen is dimmed to rest your eyes. Music is gently fading.'
              )}
            </span>
            {hasTimer && (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 text-2xl font-mono font-semibold text-amber-200 mb-8 tabular-nums">
                <Clock size={20} aria-hidden="true" />
                {formatTime(sleepRemainingSeconds)}
              </span>
            )}
            <span className="text-xs text-amber-100/40">
              {t('Ketuk di mana saja untuk menyalakan layar', 'Tap anywhere to wake the screen')}
            </span>
          </span>
        </button>
      )}

      {/* Header controls — only in sleep mode */}
      {isSleeping && (
        <div className="flex items-center gap-1.5 animate-fade-in">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn btn-soft h-11 px-3 text-sm tabular-nums"
            aria-label={hasTimer ? t(`Timer tidur ${formatTime(sleepRemainingSeconds)}`, `Sleep timer ${formatTime(sleepRemainingSeconds)}`) : t('Atur timer tidur', 'Set sleep timer')}
          >
            <Clock size={16} className="text-primary" aria-hidden="true" />
            <span className="hidden lg:inline">
              {hasTimer ? formatTime(sleepRemainingSeconds) : t('Timer', 'Timer')}
            </span>
            {hasTimer && <span className="lg:hidden">{formatTime(sleepRemainingSeconds)}</span>}
          </button>
          <button
            type="button"
            onClick={toggleBlackout}
            className="btn btn-soft btn-icon hidden sm:inline-flex"
            aria-label={t('Mode lampu malam', 'Night-light mode')}
            title={t('Mode lampu malam', 'Night-light mode')}
          >
            <EyeOff size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} labelledBy="sleep-timer-title" closeLabel={t('Tutup', 'Close')} size="sm">
        <ModalHeader
          id="sleep-timer-title"
          eyebrow={t('Ritual Tidur', 'Bedtime ritual')}
          title={t('Timer Tidur', 'Sleep Timer')}
          icon={<Moon size={22} aria-hidden="true" />}
        />
        <p className="text-sm text-muted mb-5 leading-relaxed">
          {t(
            'Musik dan narasi akan mengecil perlahan, lalu layar meredup otomatis.',
            'Music and narration fade gradually, then the screen dims on its own.'
          )}
        </p>

        <div className="grid grid-cols-3 gap-2.5 mb-5" role="group" aria-label={t('Durasi', 'Duration')}>
          {TIMER_OPTIONS.map((mins) => {
            const selected = sleepTimerMinutes === mins;
            return (
              <button
                key={mins}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  startSleepTimer(mins);
                  soundEngine.playSFX('tap');
                  setModalOpen(false);
                }}
                className={`rounded-2xl py-4 flex flex-col items-center gap-0.5 border transition-colors ${
                  selected
                    ? 'bg-primary text-on-primary border-transparent'
                    : 'bg-sunken text-ink border-line hover:border-primary'
                }`}
              >
                <span className="font-display text-2xl font-semibold leading-none">{mins}</span>
                <span className={`text-xs ${selected ? 'opacity-80' : 'text-muted'}`}>{t('menit', 'min')}</span>
              </button>
            );
          })}
        </div>

        {hasTimer ? (
          <button
            type="button"
            onClick={() => {
              cancelSleepTimer();
              soundEngine.playSFX('tap');
              setModalOpen(false);
            }}
            className="btn btn-soft w-full"
          >
            <TimerOff size={16} aria-hidden="true" />
            {t('Batalkan timer', 'Cancel timer')}
          </button>
        ) : (
          <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost w-full">
            {t('Nanti saja', 'Maybe later')}
          </button>
        )}
      </Modal>
    </>
  );
};
