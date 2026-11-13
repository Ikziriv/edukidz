import React, { useState } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../services/audioEngine';
import { Modal, ModalHeader } from '../ui/Modal';
import { useT } from '../../lib/i18n';
import type { QuizQuestion } from '../../types/story';

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E'];

const celebrate = () => {
  try {
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, disableForReducedMotion: true });
  } catch {
    // Canvas unavailable — the visual feedback in the card is enough.
  }
};

/** Inner quiz flow. Remounted on every open so state always starts fresh. */
const QuizFlow: React.FC<{ questions: QuizQuestion[]; onClose: () => void }> = ({ questions, onClose }) => {
  const language = useStoryStore((s) => s.language);
  const setQuizScore = useStoryStore((s) => s.setQuizScore);
  const t = useT();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const total = questions.length;
  const answeredCorrectly = selected !== null && question.options[selected]?.isCorrect;
  const isLast = index === total - 1;
  const score = Math.round((firstTryCorrect / total) * 100);

  const choose = (idx: number) => {
    if (answeredCorrectly) return;
    const correct = question.options[idx].isCorrect;
    setSelected(idx);
    if (correct) {
      soundEngine.playSFX('correct');
      if (!attempted) setFirstTryCorrect((n) => n + 1);
      celebrate();
    } else {
      soundEngine.playSFX('tryAgain');
    }
    setAttempted(true);
  };

  const next = () => {
    if (isLast) {
      setQuizScore(score);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAttempted(false);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAttempted(false);
    setFirstTryCorrect(0);
    setFinished(false);
  };

  if (finished) {
    const stars = score >= 100 ? 3 : score >= 50 ? 2 : 1;
    return (
      <div className="text-center pt-2">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-accent text-on-accent flex items-center justify-center shadow-lg mb-4 animate-pop-in">
          <Trophy size={38} aria-hidden="true" />
        </div>
        <h2 id="quiz-title" className="text-2xl font-semibold text-ink mb-1">
          {score === 100 ? t('Hebat sekali!', 'Amazing work!') : t('Kerja bagus!', 'Nice try!')}
        </h2>
        <p className="text-muted mb-4">
          {t(`Skor kamu ${score}%`, `You scored ${score}%`)}
        </p>
        <div className="flex justify-center gap-2 mb-6" role="img" aria-label={t(`${stars} dari 3 bintang`, `${stars} of 3 stars`)}>
          {[0, 1, 2].map((i) => (
            <Star
              key={i}
              size={34}
              aria-hidden="true"
              className={`animate-pop-in ${i < stars ? 'fill-accent text-accent' : 'text-line'}`}
              style={{ animationDelay: `${150 + i * 120}ms` }}
            />
          ))}
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-2.5">
          <button type="button" onClick={restart} className="btn btn-soft">
            <RotateCcw size={16} aria-hidden="true" />
            {t('Main lagi', 'Play again')}
          </button>
          <button type="button" data-autofocus onClick={onClose} className="btn btn-primary flex-1">
            {t('Lanjut cerita', 'Continue the story')}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ModalHeader
        id="quiz-title"
        eyebrow={total > 1 ? t(`Pertanyaan ${index + 1} dari ${total}`, `Question ${index + 1} of ${total}`) : t('Kuis Cerita', 'Story Quiz')}
        title={question.question[language]}
        icon={<Trophy size={22} aria-hidden="true" />}
        iconClassName="bg-accent text-on-accent"
      />

      {total > 1 && (
        <div className="progress-track mb-5" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${((index + (answeredCorrectly ? 1 : 0)) / total) * 100}%` }} />
        </div>
      )}

      <div className="space-y-2.5 mb-5" role="group" aria-label={t('Pilihan jawaban', 'Answer choices')}>
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const showCorrect = answeredCorrectly && opt.isCorrect;
          const showWrong = isSelected && !opt.isCorrect;
          const dimmed = answeredCorrectly && !opt.isCorrect;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => choose(idx)}
              disabled={answeredCorrectly || showWrong}
              aria-pressed={isSelected}
              className={`w-full min-h-14 p-3 pr-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all duration-200 disabled:cursor-default ${
                showCorrect
                  ? 'bg-primary-soft border-primary text-ink'
                  : showWrong
                  ? 'bg-sunken border-[#d4574e] text-ink animate-[pop-in_240ms]'
                  : dimmed
                  ? 'border-line text-muted opacity-60'
                  : 'bg-surface border-line text-ink hover:border-primary hover:bg-primary-soft/50'
              }`}
            >
              <span
                className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center font-display font-semibold text-sm ${
                  showCorrect ? 'bg-primary text-on-primary' : showWrong ? 'bg-[#d4574e] text-white' : 'bg-sunken text-muted'
                }`}
                aria-hidden="true"
              >
                {showCorrect ? <CheckCircle2 size={18} /> : showWrong ? <XCircle size={18} /> : OPTION_KEYS[idx]}
              </span>
              <span className="font-medium text-[15px] md:text-base leading-snug">{opt.text[language]}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {selected !== null && (
          <div
            className={`p-4 rounded-2xl mb-5 border animate-fade-in ${
              answeredCorrectly ? 'bg-primary-soft border-transparent' : 'bg-sunken border-line'
            }`}
          >
            <p className="font-display font-semibold mb-1 text-ink">
              {answeredCorrectly ? t('Benar! 🎉', 'Correct! 🎉') : t('Hampir! Coba pilih yang lain.', 'Almost! Try another answer.')}
            </p>
            {answeredCorrectly && <p className="text-sm leading-relaxed text-ink/80">{question.explanation[language]}</p>}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2.5">
        <button type="button" onClick={onClose} className="btn btn-ghost">
          {t('Nanti saja', 'Later')}
        </button>
        <button type="button" onClick={next} disabled={!answeredCorrectly} className="btn btn-primary flex-1">
          {isLast ? t('Lihat hasil', 'See results') : t('Pertanyaan berikutnya', 'Next question')}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export const QuizModal: React.FC = () => {
  const isQuizOpen = useStoryStore((s) => s.isQuizOpen);
  const closeQuiz = useStoryStore((s) => s.closeQuiz);
  const currentScene = useStoryStore((s) => s.currentScene);
  const t = useT();

  const hasQuestions = currentScene.quiz.length > 0;

  return (
    <Modal open={isQuizOpen && hasQuestions} onClose={closeQuiz} labelledBy="quiz-title" closeLabel={t('Tutup', 'Close')} size="lg">
      {isQuizOpen && hasQuestions && <QuizFlow key={currentScene.id} questions={currentScene.quiz} onClose={closeQuiz} />}
    </Modal>
  );
};
