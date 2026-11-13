import { useCallback } from 'react';
import { useStoryStore } from '../stores/storyStore';
import type { LanguageCode } from '../types/story';
import { getBestNaturalVoice } from '../services/audioEngine';

/** Picks the Indonesian or English string for the active language. */
export type Translate = (id: string, en: string) => string;

export function useT(): Translate {
  const language = useStoryStore((s) => s.language);
  return useCallback((id: string, en: string) => (language === 'id' ? id : en), [language]);
}

/** Speaks a short phrase with the browser's built-in natural neural speech engine. */
export function speak(text: string, language: LanguageCode): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const persona = useStoryStore.getState().voicePersona;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'id' ? 'id-ID' : 'en-US';
  const naturalVoice = getBestNaturalVoice(language, persona);
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }
  utterance.rate = 0.92;
  utterance.pitch = language === 'id' ? 1.04 : 1.07;
  window.speechSynthesis.speak(utterance);
}

export function cleanWord(word: string): string {
  return word.replace(/[.,/#!$%^&*;:{}=\-_`~()"'?]/g, '');
}
