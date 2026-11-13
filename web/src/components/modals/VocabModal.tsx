import React from 'react';
import { useStoryStore } from '../../stores/storyStore';
import { Volume2, BookMarked, AudioLines } from 'lucide-react';
import { soundEngine } from '../../services/audioEngine';
import { Modal, ModalHeader } from '../ui/Modal';
import { cleanWord, speak, useT } from '../../lib/i18n';

export const VocabModal: React.FC = () => {
  const activeVocabWord = useStoryStore((s) => s.activeVocabWord);
  const closeVocab = useStoryStore((s) => s.closeVocab);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  const word = activeVocabWord ? cleanWord(activeVocabWord.word) : '';
  const def = activeVocabWord?.definition;
  const phonics = activeVocabWord?.phonics;
  const otherLang = language === 'id' ? 'en' : 'id';

  return (
    <Modal open={!!activeVocabWord} onClose={closeVocab} labelledBy="vocab-title" closeLabel={t('Tutup', 'Close')}>
      {activeVocabWord && (
        <>
          <ModalHeader
            id="vocab-title"
            eyebrow={t('Kamus Cilik', 'Little Dictionary')}
            title={word.charAt(0).toUpperCase() + word.slice(1)}
            icon={<BookMarked size={24} aria-hidden="true" />}
            iconClassName="bg-accent text-on-accent"
          />

          {phonics && (
            <p className="chip chip-primary mb-4 font-mono text-sm">
              <AudioLines size={14} aria-hidden="true" />
              {phonics[language]}
            </p>
          )}

          {def && (
            <div className="space-y-2.5 mb-6">
              <div className="bg-sunken p-4 rounded-2xl border border-line">
                <p className="eyebrow mb-1.5">{t('Artinya', 'Meaning')}</p>
                <p className="text-base md:text-[17px] leading-relaxed text-ink" lang={language}>
                  {def[language]}
                </p>
              </div>
              <p className="text-sm text-muted px-1" lang={otherLang}>
                <span className="font-bold uppercase mr-1.5">{otherLang}</span>
                {def[otherLang]}
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-2.5">
            <button type="button" onClick={closeVocab} className="btn btn-ghost">
              {t('Mengerti', 'Got it')}
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => {
                soundEngine.playSFX('chime');
                speak(word, language);
              }}
              className="btn btn-primary flex-1"
            >
              <Volume2 size={18} aria-hidden="true" />
              {t('Ucapkan kata', 'Say it aloud')}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
