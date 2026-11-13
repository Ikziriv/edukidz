import React, { useState } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import type { WordMarker } from '../../types/story';
import { Volume2, Sparkles, BookOpen, Languages, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../services/audioEngine';
import { cleanWord, speak, useT } from '../../lib/i18n';

export const KaraokeReader: React.FC = () => {
  const currentScene = useStoryStore((s) => s.currentScene);
  const language = useStoryStore((s) => s.language);
  const setLanguage = useStoryStore((s) => s.setLanguage);
  const activeWordIndex = useStoryStore((s) => s.activeWordIndex);
  const openVocab = useStoryStore((s) => s.openVocab);
  const isPlaying = useStoryStore((s) => s.isPlaying);
  const t = useT();

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [showParallel, setShowParallel] = useState(true);

  const dialogue = currentScene.dialogue[language];
  const otherLang = language === 'id' ? 'en' : 'id';
  const alternateDialogue = currentScene.dialogue[otherLang];

  const handleWordClick = (item: WordMarker) => {
    if (item.isVocab) {
      openVocab(item);
    } else {
      soundEngine.playSFX('tap');
      speak(cleanWord(item.word), language);
    }
  };

  const fontSizes = {
    normal: 'text-lg md:text-xl leading-relaxed',
    large: 'text-xl md:text-2xl leading-relaxed md:leading-loose',
    xlarge: 'text-2xl md:text-3xl leading-loose md:leading-[2.2]'
  };

  return (
    <section aria-label={t('Teks Bacaan Fonik', 'Story Narrative')} className="w-full">
      <div className="card p-5 md:p-7 transition-all duration-300">
        {/* Header HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-line">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-primary font-display">
              <BookOpen size={14} aria-hidden="true" />
              <span>
                {currentScene.dayOfWeek ? `${currentScene.dayOfWeek[language]} · ` : ''}
                {t('Bab', 'Chapter')} {currentScene.chapterNumber}: {currentScene.title[language]}
              </span>
            </span>
            <span className="text-xs text-muted hidden md:inline">
              {currentScene.subtitle[language]}
            </span>

            {isPlaying && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs animate-pulse">
                <Volume2 size={14} aria-hidden="true" />
                <span className="inline-flex gap-0.5 items-end h-3" aria-hidden="true">
                  <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_100ms] h-2" />
                  <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_200ms] h-3" />
                  <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_300ms] h-1.5" />
                </span>
                <span className="hidden sm:inline">{t('Narasi Bersuara Aktif', 'Narration Playing')}</span>
              </span>
            )}
          </div>

          {/* Action utilities: Text Zoom + Parallel toggle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setFontSize((curr) => (curr === 'xlarge' ? 'large' : 'normal'));
              }}
              disabled={fontSize === 'normal'}
              className="btn btn-ghost btn-icon h-9 w-9 min-h-9 rounded-xl"
              title={t('Kecilkan teks', 'Smaller text')}
              aria-label={t('Kecilkan teks', 'Smaller text')}
            >
              <ZoomOut size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setFontSize((curr) => (curr === 'normal' ? 'large' : 'xlarge'));
              }}
              disabled={fontSize === 'xlarge'}
              className="btn btn-ghost btn-icon h-9 w-9 min-h-9 rounded-xl"
              title={t('Besarkan teks', 'Larger text')}
              aria-label={t('Besarkan teks', 'Larger text')}
            >
              <ZoomIn size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setShowParallel(!showParallel);
              }}
              aria-pressed={showParallel}
              className={`btn btn-soft h-9 min-h-9 px-2.5 text-xs rounded-xl ${
                showParallel ? 'border-primary text-primary' : ''
              }`}
              title={t('Tampilkan terjemahan paralel', 'Toggle bilingual parallel view')}
            >
              <Languages size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{otherLang.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Synchronized Karaoke Word Container */}
        <div
          className={`${fontSizes[fontSize]} font-medium text-ink select-none mb-4`}
          lang={language}
        >
          {dialogue.words.map((item, idx) => {
            const isActive = idx === activeWordIndex;
            const isRead = activeWordIndex >= 0 && idx < activeWordIndex;
            const isVocab = !!item.isVocab;

            return (
              <span
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => handleWordClick(item)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleWordClick(item)}
                data-active={isActive}
                data-read={isRead}
                className={`reader-word cursor-pointer ${isVocab ? 'reader-vocab' : ''}`}
                title={isVocab ? t('Ketuk untuk kamus cilik', 'Tap for glossary') : t('Ketuk untuk mendengar lafal', 'Tap to pronounce')}
              >
                {item.word}
                {isVocab && (
                  <Sparkles
                    size={11}
                    className="inline ml-0.5 text-accent opacity-90 -translate-y-1"
                    aria-hidden="true"
                  />
                )}
              </span>
            );
          })}
        </div>

        {/* Bilingual Parallel Subtitle Preview */}
        {showParallel && (
          <div className="pt-3 border-t border-line/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted animate-fade-in">
            <div className="flex items-start gap-2 min-w-0" lang={otherLang}>
              <span className="chip uppercase text-[10px] font-extrabold tracking-wider px-2 py-0.5 shrink-0">
                {otherLang}
              </span>
              <p className="italic leading-relaxed text-ink/80">
                "{alternateDialogue.text}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setLanguage(otherLang);
              }}
              className="btn btn-ghost h-8 min-h-8 text-xs shrink-0 self-end sm:self-center font-display"
            >
              <CheckCircle2 size={14} className="text-primary" aria-hidden="true" />
              <span>{t(`Beralih ke Bahasa ${otherLang === 'id' ? 'Indonesia' : 'Inggris'}`, `Switch to ${otherLang === 'id' ? 'Indonesian' : 'English'}`)}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
