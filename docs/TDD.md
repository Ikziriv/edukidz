# Technical Design Document & Test Specification (TDD)
## Project: EduKidz – Interactive 3D & 2D Educational Storytelling Platform

---

### Document Control
- **Document Version:** 1.0.0
- **Lead Engineer:** Staff Frontend & Graphics Engineer
- **Status:** Approved for Implementation
- **Location:** `docs/TDD.md`

---

## 1. Directory Structure & Technical Layout

To ensure high performance, modularity, and strict isolation between production application code and automated tests (preventing AI agents from needlessly scanning test files), the repository is organized as follows:

```
edukidz/
├── .agents/
│   └── rules/
│       └── test-exclusion.md        # AI Agent rule: never inspect/run test files
├── docs/
│   ├── BRD.md                      # Business Requirements Document
│   ├── PRD.md                      # Product Requirements Document
│   ├── SDD.md                      # System Design Document
│   ├── TDD.md                      # Technical Design & Test Spec (this file)
│   └── AGENT_GUIDELINES.md         # Operational AI Agent prompt rules
├── public/
│   ├── audio/                      # Narration, ambient music, SFX
│   │   ├── ambience/
│   │   ├── narration/
│   │   └── sfx/
│   ├── models/                     # Compressed 3D GLTF/GLB models
│   │   └── scenes/
│   └── images/                     # 2D WebP/SVG illustrations & textures
├── src/
│   ├── assets/                     # Static icons, logos, base shaders
│   ├── components/                 # Presentation UI (React)
│   │   ├── 3d/                     # Three.js / React Three Fiber components
│   │   │   ├── CameraRig.tsx
│   │   │   ├── LightingRig.tsx
│   │   │   ├── ModelLoader.tsx
│   │   │   ├── Scene3DCanvas.tsx
│   │   │   └── Shaders.ts
│   │   ├── 2d/                     # 2D Canvas Parallax components
│   │   │   ├── ParallaxLayer.tsx
│   │   │   └── Scene2DCanvas.tsx
│   │   ├── audio/                  # Audio Player Dock & Volume Mixers
│   │   │   ├── AudioDock.tsx
│   │   │   ├── SleepTimerModal.tsx
│   │   │   └── VolumeSliders.tsx
│   │   ├── study/                  # Study Mode UI (Karaoke, Quizzes, Hotspots)
│   │   │   ├── KaraokeText.tsx
│   │   │   ├── KnowledgeCard.tsx
│   │   │   └── QuizModal.tsx
│   │   ├── parent/                 # Parental Gate & Controls
│   │   │   ├── GrownUpGate.tsx
│   │   │   └── ScreenTimeLimiter.tsx
│   │   └── ui/                     # Primitives (Buttons, Badges, Modals)
│   ├── config/                     # Application configurations & constants
│   ├── hooks/                      # Custom hooks (useAudio, useSleepTimer, useWebGL)
│   ├── stores/                     # Zustand stores (storyStore, audioStore, userStore)
│   ├── types/                      # TypeScript definitions (story.ts, modes.ts)
│   ├── utils/                      # Helper utilities (math, time, storage)
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styling & Tailwind CSS imports
├── tests/                          # ISOLATED test directory (outside src/)
│   ├── unit/                       # Pure logic unit tests (state machine, parsers)
│   └── e2e/                        # Playwright smoke tests
├── AGENTS.md                       # Root prompt guidance for AI coding agents
├── tsconfig.json                   # Production TypeScript config (excludes tests/)
├── tsconfig.test.json              # Dedicated test TypeScript config
├── vite.config.ts                  # Vite build configuration
└── package.json
```

---

## 2. Core Technical Specifications

### 2.1 Complete Story Data Contract (TypeScript Schema)

```typescript
// src/types/story.ts

export type StoryMode = 'study' | 'sleeping' | 'playing';
export type VisualMode = '3D' | '2D';
export type LanguageCode = 'en' | 'id';

export interface Localized<T> {
  en: T;
  id: T;
}

export interface CharacterProfile {
  id: string;
  name: string;
  ethnicBackground: string;
  faithTradition?: string;
  attire: {
    headwear?: string; // e.g. "pastel-mint hijab", "peci", "none"
    clothing: string;  // e.g. "casual denim jacket & joggers"
    styleCategory: 'modern-casual' | 'modern-modest-casual' | 'traditional-cultural' | 'sporty';
  };
  modelGlbUrl: string;
  avatarIconUrl: string;
}

export interface WordMarker {
  word: string;
  startMs: number;
  endMs: number;
  isVocab?: boolean;
  definition?: string;
  phonics?: string;
}

export interface DialogueTrack {
  text: string;
  narrationAudioUrl: string;
  audioStartMs: number;
  audioEndMs: number;
  words: WordMarker[];
}

export interface Hotspot3D {
  id: string;
  meshTargetName: string;
  title: Localized<string>;
  explanation: Localized<string>;
  audioPronunciation?: Localized<string>;
  icon?: string;
}

export interface InteractiveAction3D {
  meshTargetName: string;
  onPointerDown: 'triggerAnimation' | 'playSound' | 'openHotspot' | 'spawnParticles';
  animationClipName?: string;
  sfxUrl?: string;
  hotspotId?: string;
}

export interface QuizQuestion {
  id: string;
  question: Localized<string>;
  options: {
    text: Localized<string>;
    isCorrect: boolean;
    imageThumbnail?: string;
  }[];
  explanation: Localized<string>;
}

export interface SceneDefinition {
  id: string;
  chapterNumber: number;
  title: Localized<string>;
  
  // 3D Scene Properties
  modelGlbUrl: string;
  cameraInitPosition: [number, number, number];
  cameraTargetPosition: [number, number, number];
  cameraLimits: {
    minPolarAngle: number;
    maxPolarAngle: number;
    minDistance: number;
    maxDistance: number;
  };
  interactables: InteractiveAction3D[];
  hotspots: Hotspot3D[];
  
  // 2D Scene Properties (Fallback & Alternate)
  illustration2dUrl: string;
  layers2d?: {
    layerUrl: string;
    depthFactor: number; // For parallax effect
  }[];
  
  // Audio & Narrative (Bilingual EN / ID)
  ambientAudioUrl?: string;
  dialogue: Localized<DialogueTrack>;
  quiz?: QuizQuestion[];
}

export interface StoryManifest {
  id: string;
  seriesId: string;
  episodeNumber: number;
  title: Localized<string>;
  subtitle: Localized<string>;
  author: string;
  coverImage: string;
  ageRange: '3-5' | '6-8' | '9-10';
  tags: string[];
  supportedModes: StoryMode[];
  defaultMode: StoryMode;
  scenes: SceneDefinition[];
}

export interface SeriesManifest {
  id: string;
  title: Localized<string>;
  tagline: Localized<string>;
  seriesDocsUrl: string; // Markdown docs series path (e.g. series/series-1/DOCS.md)
  targetAge: '3-5' | '6-8' | '9-10';
  toleranceThemes: ('interfaith-harmony' | 'cultural-empathy' | 'gotong-royong' | 'universal-kindness')[];
  characters: CharacterProfile[];
  stories: StoryManifest[];
}

// Special Category Extension: Indonesian Civic Heritage & TKDN Stories
export type PancasilaSilaNumber = 1 | 2 | 3 | 4 | 5;

export interface LocalComponentItem {
  componentName: Localized<string>;
  originRegion: string;
  materialType: string;
  isLocallySourced: boolean;
  localContentPercentage: number;
  educationalFunFact: Localized<string>;
}

export interface TkdnInteractiveData {
  productTitle: Localized<string>;
  totalCalculatedTkdn: number;
  formulaExplanation: Localized<string>;
  components: LocalComponentItem[];
  sovereigntyAdvantage: Localized<string>;
}

export interface IndonesiaStoryManifest extends StoryManifest {
  category: 'indonesia-civic-heritage';
  indonesiaMetadata: {
    targetAgeTier: '3-5' | '6-8' | '9-10';
    primaryPancasilaSila: PancasilaSilaNumber[];
    civicConcepts: ('pancasila-harmoni' | 'merdeka-belajar' | 'berdaulat-berdikari' | 'bangga-buatan-indonesia' | 'tkdn-karya-lokal')[];
    geographicalFocus: {
      province: string;
      island: string;
      culturalLandmarks: string[];
    };
    tkdnData?: TkdnInteractiveData;
    discussionQuestions: {
      forFamily: Localized<string>[];
      forClassroom: Localized<string>[];
    };
  };
}
```


---

## 3. Critical Algorithms & Implementation Details

### 3.1 Sub-Millisecond Karaoke Synchronization Engine
To prevent UI lag, the audio tracking engine bypasses React state updates on every frame. Instead, it runs on an internal timer loop and dispatches active indexes only when the index changes:

```typescript
// src/hooks/useKaraokeSync.ts
import { useEffect, useRef } from 'react';
import { useStoryStore } from '../stores/storyStore';
import { WordMarker } from '../types/story';

export function useKaraokeSync(words: WordMarker[], audioPlayer: any) {
  const setActiveWordIndex = useStoryStore((s) => s.setActiveWordIndex);
  const activeIndexRef = useRef<number>(-1);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const checkAudioTime = () => {
      if (audioPlayer && audioPlayer.playing()) {
        const currentMs = audioPlayer.seek() * 1000;
        
        // Find matching word
        const newIndex = words.findIndex(
          (w) => currentMs >= w.startMs && currentMs <= w.endMs
        );

        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveWordIndex(newIndex);
        }
      }
      rafId.current = requestAnimationFrame(checkAudioTime);
    };

    rafId.current = requestAnimationFrame(checkAudioTime);
    return () => cancelAnimationFrame(rafId.current);
  }, [words, audioPlayer, setActiveWordIndex]);
}
```

### 3.2 Sleeping Mode Circadian Decay Algorithm
When a parent sets a bedtime timer (e.g., 20 minutes), the engine manages:
1. Continuous remaining time tracking.
2. Dimming screen opacity from 100% to 0% in the last 180 seconds.
3. Attenuating audio volume logarithmically to avoid jarring silence.

```typescript
// src/utils/sleepDecay.ts
export function calculateSleepVolume(remainingMs: number, totalTimerMs: number, initialVolume: number): number {
  const DECAY_WINDOW_MS = 180 * 1000; // 3 minutes decay curve
  if (remainingMs > DECAY_WINDOW_MS) {
    return initialVolume;
  }
  if (remainingMs <= 0) {
    return 0;
  }
  const factor = remainingMs / DECAY_WINDOW_MS;
  // Quadratic ease-out for ultra-smooth soothing fade
  return initialVolume * (factor * factor);
}

export function calculateSleepDimmerOpacity(remainingMs: number): number {
  const DIM_WINDOW_MS = 120 * 1000; // 2 minutes dimming curve
  if (remainingMs > DIM_WINDOW_MS) {
    return 0.0; // No darkness overlay
  }
  if (remainingMs <= 0) {
    return 1.0; // Pure blackout
  }
  return 1.0 - (remainingMs / DIM_WINDOW_MS);
}
```

---

## 4. Test Strategy & AI Agent Isolation Architecture

### 4.1 The AI Agent Test-Checking Problem
When developers ask AI coding agents to build or modify features, agents frequently:
1. Search across the entire workspace (`**/*`) and load large test suites into context.
2. Unintentionally break test files by trying to refactor them ahead of time.
3. Run test runners (`npm test`, `vitest`) repeatedly, consuming enormous token budgets and slowing down iterations.
4. Get stuck attempting to resolve outdated test mocks when asked to update UI components.

### 4.2 Multi-Layered Test Isolation Architecture
To ensure that AI agents **never check, inspect, run, or edit test files unless explicitly requested**, EduKidz adopts a 4-tier isolation architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        4-TIER TEST ISOLATION                           │
├──────────────────────────┬─────────────────────────────────────────────┤
│ Tier 1: Directory Border │ All tests quarantined in /tests/ outside src/│
│ Tier 2: TypeScript Gate  │ tsconfig.json explicitly excludes /tests/    │
│ Tier 3: Script Isolation │ npm run build / lint NEVER invokes tests    │
│ Tier 4: Workspace Rule   │ AGENTS.md + GEMINI.md mandate zero test scan│
└──────────────────────────┴─────────────────────────────────────────────┘
```

#### Tier 1: Physical Directory Isolation
- Tests are **strictly forbidden** inside `src/`. No `*.test.tsx` or `__tests__/` are co-located with features.
- All tests live in `tests/` at the repository root.

#### Tier 2: TypeScript & Linter Gate
In `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["tests/**/*", "**/*.test.*", "**/*.spec.*", "node_modules"]
}
```
A separate `tsconfig.test.json` exists purely for standalone test execution.

#### Tier 3: Decoupled NPM Scripts
In `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src/ --ext .ts,.tsx",
    "test:isolated": "vitest run --config vitest.config.ts"
  }
}
```
Standard development commands (`build`, `lint`) only touch `src/`.

#### Tier 4: Explicit Agent Directives (`AGENTS.md`)
The root `AGENTS.md` and `.agents/rules/test-exclusion.md` instruct all automated agents:
> *"CRITICAL RULE: DO NOT search, open, read, edit, or execute files inside `tests/` or matching `*.test.*` / `*.spec.*` during routine feature implementation prompts. Only touch tests if the user prompt explicitly contains `[RUN_TESTS]` or `[EDIT_TESTS]`."*
