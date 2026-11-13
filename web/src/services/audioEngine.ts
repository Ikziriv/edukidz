import type { StoryMode, LanguageCode, WordMarker, VoicePersonaId } from '../types/story';

export interface StoryVoicePersona {
  id: VoicePersonaId;
  name: { id: string; en: string };
  role: { id: string; en: string };
  rateMul: number;
  pitchId: number;
  pitchEn: number;
  preferredKeywords: string[];
}

export const VOICE_PERSONAS: Record<VoicePersonaId, StoryVoicePersona> = {
  'mama-sari': {
    id: 'mama-sari',
    name: { id: 'Bunda Sari', en: 'Mama Sari' },
    role: { id: 'Pendongeng Hangat & Lembut', en: 'Warm & Expressive Storyteller' },
    rateMul: 0.94,
    pitchId: 1.04,
    pitchEn: 1.07,
    preferredKeywords: ['gadis', 'jenny', 'aria', 'samantha', 'ava', 'sonia', 'natural', 'neural']
  },
  'kak-aisyah': {
    id: 'kak-aisyah',
    name: { id: 'Kak Aisyah', en: 'Big Sis Aisyah' },
    role: { id: 'Sahabat Ceria & Ekspresif', en: 'Cheerful & Energetic Guide' },
    rateMul: 0.99,
    pitchId: 1.12,
    pitchEn: 1.14,
    preferredKeywords: ['gadis', 'ana', 'libby', 'maisie', 'natasha', 'natural', 'neural']
  },
  'oma-rahma': {
    id: 'oma-rahma',
    name: { id: 'Oma Rahma', en: 'Grandma Rahma' },
    role: { id: 'Suara Teduh Pengantar Tidur', en: 'Calm & Soothing Bedtime Voice' },
    rateMul: 0.86,
    pitchId: 0.96,
    pitchEn: 0.98,
    preferredKeywords: ['ardi', 'gadis', 'sonia', 'serena', 'brian', 'christopher', 'natural', 'neural']
  }
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private currentMode: StoryMode = 'study';
  private bgmTimer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMasterVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  public playSFX(name: 'chime' | 'sprout' | 'star' | 'water' | 'correct' | 'tap' | 'tryAgain' | 'guitar' | 'cluck') {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;

      if (name === 'chime' || name === 'star') {
        const freqs = name === 'star' ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
        freqs.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);

          gain.gain.setValueAtTime(0, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.25, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.45);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.5);
        });
      } else if (name === 'sprout') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (name === 'water') {
        // Water drops / trickle simulation
        for (let i = 0; i < 4; i++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          const dropTime = now + i * 0.09 + Math.random() * 0.03;
          osc.frequency.setValueAtTime(900 + Math.random() * 400, dropTime);
          osc.frequency.exponentialRampToValueAtTime(450, dropTime + 0.07);

          gain.gain.setValueAtTime(0.18, dropTime);
          gain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.08);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(dropTime);
          osc.stop(dropTime + 0.09);
        }
      } else if (name === 'correct') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0.2, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.65);
        });
      } else if (name === 'tap') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (name === 'tryAgain') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.25);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (name === 'guitar') {
        // Acoustic guitar warm strum chord: G major arpeggio
        const chord = [196.0, 246.94, 293.66, 392.0];
        chord.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const noteTime = now + idx * 0.045;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(noteTime);
          osc.stop(noteTime + 0.85);
        });
      } else if (name === 'cluck') {
        // Cute cartoon chicken chirp: two rapid pitch-bent chirps
        [0, 0.1].forEach((delay, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const chirpTime = now + delay;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(idx === 0 ? 560 : 720, chirpTime);
          osc.frequency.linearRampToValueAtTime(idx === 0 ? 420 : 540, chirpTime + 0.07);

          gain.gain.setValueAtTime(0, chirpTime);
          gain.gain.linearRampToValueAtTime(0.2, chirpTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.08);

          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(chirpTime);
          osc.stop(chirpTime + 0.09);
        });
      }
    } catch {
      // Audio context may not be unlocked until user interaction
    }
  }

  public playBGM(mode: StoryMode) {
    this.initContext();
    this.currentMode = mode;
    this.stopBGM();
    this.isBgmPlaying = true;

    if (!this.ctx || !this.bgmGain) return;

    // Adjust BGM gain based on mode
    const targetGain = mode === 'sleeping' ? 0.15 : mode === 'playing' ? 0.32 : 0.24;
    this.bgmGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);

    // Progression notes
    const chords: Record<StoryMode, number[][]> = {
      study: [
        [261.63, 329.63, 392.0], // C major
        [349.23, 440.0, 523.25], // F major
        [293.66, 369.99, 440.0], // D minor
        [392.0, 493.88, 587.33]  // G major
      ],
      sleeping: [
        [174.61, 220.0, 261.63], // F gentle
        [164.81, 207.65, 246.94], // E gentle minor
        [146.83, 174.61, 220.0], // D gentle
        [130.81, 164.81, 196.0]  // C gentle
      ],
      playing: [
        [261.63, 329.63, 392.0, 523.25],
        [392.0, 493.88, 587.33, 783.99],
        [440.0, 523.25, 659.25, 880.0],
        [349.23, 440.0, 523.25, 698.46]
      ]
    };

    let step = 0;
    const intervalMs = mode === 'sleeping' ? 3200 : mode === 'playing' ? 1400 : 2200;

    const playChordStep = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

      const currentChords = chords[this.currentMode];
      const chord = currentChords[step % currentChords.length];
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = this.currentMode === 'sleeping' ? 'sine' : this.currentMode === 'playing' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * (this.currentMode === 'playing' ? 0.08 : 0.15));

        const noteStart = now + idx * (this.currentMode === 'playing' ? 0.08 : 0.15);
        const duration = this.currentMode === 'sleeping' ? 3.0 : 1.8;

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.06, noteStart + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);

        osc.connect(gain);
        gain.connect(this.bgmGain!);

        osc.start(noteStart);
        osc.stop(noteStart + duration + 0.1);
      });

      step++;
      this.bgmTimer = window.setTimeout(playChordStep, intervalMs);
    };

    playChordStep();
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public applyLogarithmicSleepDecay(remainingSec: number, totalSec: number) {
    if (!this.masterGain || !this.ctx) return;
    if (totalSec <= 0) return;
    const ratio = Math.max(0, Math.min(1, remainingSec / totalSec));
    // Logarithmic curve: V(t) = V_start * (ratio)^2
    const targetGain = 0.8 * Math.pow(ratio, 2);
    this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.5);
  }
}

export const soundEngine = new SoundEngine();

// ============================================================================
// Natural Neural Voice Prioritizer (Heuristic Scoring for Human Storyteller)
// ============================================================================
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function scoreVoice(
  voice: SpeechSynthesisVoice,
  lang: LanguageCode,
  persona: VoicePersonaId = 'mama-sari'
): number {
  const voiceLang = voice.lang.toLowerCase();
  const isTargetLang = lang === 'id'
    ? voiceLang.startsWith('id') || voiceLang.startsWith('ms')
    : voiceLang.startsWith('en');

  if (!isTargetLang) return -1;

  let score = voiceLang.startsWith(lang) ? 20 : 8;
  const name = voice.name.toLowerCase();
  const personaCfg = VOICE_PERSONAS[persona] ?? VOICE_PERSONAS['mama-sari'];

  // Cloud / Neural / Natural online human voices get highest priority
  if (!voice.localService) score += 45;
  if (name.includes('natural')) score += 110;
  if (name.includes('neural')) score += 100;
  if (name.includes('online')) score += 90;
  if (name.includes('multilingual')) score += 65;
  if (name.includes('google')) score += 80;
  if (name.includes('siri') || name.includes('enhanced') || name.includes('premium')) score += 75;

  // Match persona-specific warm storyteller timbres
  for (const kw of personaCfg.preferredKeywords) {
    if (name.includes(kw)) {
      score += 45;
    }
  }

  // Specific top-tier human-like voices for Indonesian & English storytelling
  if (name.includes('gadis') || name.includes('ardi') || name.includes('damayanti')) score += 70;
  if (
    name.includes('jenny') ||
    name.includes('aria') ||
    name.includes('samantha') ||
    name.includes('ava') ||
    name.includes('sonia') ||
    name.includes('libby')
  ) {
    score += 55;
  }

  // Strongly demote legacy robotic SAPI5 / Espeak / Compact voices
  if (
    name.includes('desktop') ||
    name.includes('david') ||
    name.includes('zira') ||
    name.includes('mark') ||
    name.includes('hazel') ||
    name.includes('espeak') ||
    name.includes('compact') ||
    name.includes('microsoft Stefan')
  ) {
    score -= 80;
  }

  return score;
}

export function getBestNaturalVoice(
  lang: LanguageCode,
  persona: VoicePersonaId = 'mama-sari'
): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (voices.length === 0) return null;

  let bestVoice: SpeechSynthesisVoice | null = null;
  let highestScore = -1;

  for (const voice of voices) {
    const s = scoreVoice(voice, lang, persona);
    if (s > highestScore) {
      highestScore = s;
      bestVoice = voice;
    }
  }

  return bestVoice;
}

export function getActiveVoiceLabel(lang: LanguageCode, persona: VoicePersonaId = 'mama-sari'): string {
  const v = getBestNaturalVoice(lang, persona);
  const personaObj = VOICE_PERSONAS[persona] ?? VOICE_PERSONAS['mama-sari'];
  const pName = personaObj.name[lang];
  if (!v) return `${pName} · Studio Neural`;
  const isNeural =
    !v.localService ||
    /natural|neural|online|google|enhanced|premium|gadis|ardi|jenny|aria|samantha|ava/i.test(v.name);
  return isNeural ? `${pName} · Neural HD` : `${pName} · Natural Voice`;
}

// ============================================================================
// Dual-Engine Narration Controller: Studio Audio + Expressive Multi-Phrase Neural TTS
// ============================================================================
export class NarrationController {
  private utterance: SpeechSynthesisUtterance | null = null;
  public getUtterance() { return this.utterance; }
  private audioElement: HTMLAudioElement | null = null;
  private animFrameId: number | null = null;
  private boundaryWatchdogId: number | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private fallbackTimer: number | null = null;
  private onWordChangeCallback?: (wordIndex: number) => void;
  private onEndCallback?: () => void;

  public startNarration(
    words: WordMarker[],
    lang: LanguageCode,
    speed: number,
    onWordChange: (index: number) => void,
    onComplete: () => void,
    audioUrl?: string,
    persona: VoicePersonaId = 'mama-sari'
  ) {
    this.stop();
    this.onWordChangeCallback = onWordChange;
    this.onEndCallback = onComplete;
    this.isSpeaking = true;
    this.isPaused = false;

    // Immediately highlight the first word so the stage & choreography react on click
    if (words.length > 0) {
      this.onWordChangeCallback?.(0);
    }

    // ENGINE A: Pre-rendered High-Definition Studio Audio Track
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.playbackRate = speed;
        this.audioElement = audio;

        const syncTracking = () => {
          if (!this.isSpeaking || this.isPaused || !this.audioElement) return;

          const currentMs = this.audioElement.currentTime * 1000;
          const wordIdx = words.findIndex((w) => currentMs >= w.startMs && currentMs <= w.endMs);
          if (wordIdx !== -1) {
            this.onWordChangeCallback?.(wordIdx);
          }

          this.animFrameId = requestAnimationFrame(syncTracking);
        };

        audio.onplay = () => {
          this.animFrameId = requestAnimationFrame(syncTracking);
        };

        audio.onended = () => {
          this.cleanup();
          this.onWordChangeCallback?.(-1);
          this.onEndCallback?.();
        };

        audio.onerror = () => {
          // If studio audio file cannot be loaded, gracefully fallback to Natural Neural TTS
          this.audioElement = null;
          this.speakWithNaturalTTS(words, lang, speed, persona);
        };

        audio.play().catch(() => {
          this.speakWithNaturalTTS(words, lang, speed, persona);
        });
        return;
      } catch {
        // Fallback to Neural TTS
      }
    }

    // ENGINE B: Browser-Native Natural Neural Voice Synthesis with Timecode Sync Guard
    this.speakWithNaturalTTS(words, lang, speed, persona);
  }

  private speakWithNaturalTTS(
    words: WordMarker[],
    lang: LanguageCode,
    speed: number,
    persona: VoicePersonaId = 'mama-sari'
  ) {
    const fullSentence = words.map((w) => w.word).join(' ');
    const personaCfg = VOICE_PERSONAS[persona] ?? VOICE_PERSONAS['mama-sari'];

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(fullSentence);

      // Warm, unhurried human storyteller prosody (never flat or clipped)
      u.rate = Math.max(0.65, Math.min(1.35, speed * personaCfg.rateMul));
      u.pitch = lang === 'id' ? personaCfg.pitchId : personaCfg.pitchEn;
      u.volume = 1.0;
      u.lang = lang === 'id' ? 'id-ID' : 'en-US';

      // Pick top-ranked natural human neural voice
      const naturalVoice = getBestNaturalVoice(lang, persona);
      if (naturalVoice) {
        u.voice = naturalVoice;
        if (naturalVoice.lang) {
          u.lang = naturalVoice.lang;
        }
      }

      // Build character-offset map so charIndex from onboundary maps to the exact word index
      const wordCharStarts: number[] = [];
      let runningOffset = 0;
      for (const w of words) {
        wordCharStarts.push(runningOffset);
        runningOffset += w.word.length + 1;
      }

      let currentWordIdx = 0;
      let boundaryFired = false;
      const speechStartedAt = performance.now();

      u.onboundary = (e) => {
        if (e.name === 'word' || typeof e.charIndex === 'number') {
          boundaryFired = true;
          if (typeof e.charIndex === 'number' && e.charIndex >= 0) {
            let matchedIdx = currentWordIdx;
            for (let i = 0; i < wordCharStarts.length; i++) {
              if (e.charIndex >= wordCharStarts[i]) {
                matchedIdx = i;
              } else {
                break;
              }
            }
            currentWordIdx = matchedIdx;
            this.onWordChangeCallback?.(currentWordIdx);
          } else {
            this.onWordChangeCallback?.(currentWordIdx);
            currentWordIdx = Math.min(words.length - 1, currentWordIdx + 1);
          }
        }
      };

      // Hybrid Timecode Watchdog: Google Chrome/Android online neural voices often omit onboundary events.
      // This RAF loop guarantees silky-smooth word karaoke & 3D character lip-sync even when onboundary is silent!
      const syncFallbackClock = () => {
        if (!this.isSpeaking || this.isPaused) return;
        if (!boundaryFired) {
          const elapsedMs = (performance.now() - speechStartedAt) * u.rate;
          const idx = words.findIndex((w) => elapsedMs >= w.startMs && elapsedMs <= w.endMs);
          if (idx !== -1 && idx !== currentWordIdx) {
            currentWordIdx = idx;
            this.onWordChangeCallback?.(idx);
          }
        }
        this.boundaryWatchdogId = requestAnimationFrame(syncFallbackClock);
      };
      this.boundaryWatchdogId = requestAnimationFrame(syncFallbackClock);

      u.onend = () => {
        this.cleanup();
        this.onWordChangeCallback?.(-1);
        this.onEndCallback?.();
      };

      u.onerror = () => {
        this.runFallbackTimer(words, speed);
      };

      this.utterance = u;
      window.speechSynthesis.speak(u);
    } else {
      this.runFallbackTimer(words, speed);
    }
  }

  private cleanup() {
    this.isSpeaking = false;
    this.isPaused = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.boundaryWatchdogId !== null) {
      cancelAnimationFrame(this.boundaryWatchdogId);
      this.boundaryWatchdogId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    if (this.fallbackTimer !== null) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  private runFallbackTimer(words: WordMarker[], speed: number) {
    let index = 0;
    const playNext = () => {
      if (!this.isSpeaking || this.isPaused) return;

      if (index >= words.length) {
        this.cleanup();
        this.onWordChangeCallback?.(-1);
        this.onEndCallback?.();
        return;
      }

      this.onWordChangeCallback?.(index);
      soundEngine.playSFX('tap');

      const currentMarker = words[index];
      const duration = (currentMarker.endMs - currentMarker.startMs) / speed;
      index++;

      this.fallbackTimer = window.setTimeout(playNext, Math.max(120, duration));
    };

    playNext();
  }

  public pause() {
    this.isPaused = true;
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    this.isPaused = false;
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play().catch(() => {});
    }
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.cleanup();
    this.onWordChangeCallback?.(-1);
  }
}

export const narrationController = new NarrationController();
