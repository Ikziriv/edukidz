import { create } from 'zustand';
import type { StoryMode, VisualMode, LanguageCode, SelectableCharacterId, VoicePersonaId, SeriesManifest, StoryManifest, SceneDefinition, WordMarker, FarmTool, FarmCropTile } from '../types/story';
import { series01Data } from '../data/series01';
import { soundEngine, narrationController } from '../services/audioEngine';

const INITIAL_CHARACTER_TARGETS: Record<SelectableCharacterId, [number, number, number]> = {
  aisyah: [-1.65, 0.05, 0.65],
  mateo: [1.7, 0.05, 0.55],
  sofia: [-2.1, 0.05, 0.2],
  mei: [2.2, 0.05, -0.35],
  kenji: [-1.15, 0.05, -1.15],
  amara: [1.05, 0.05, -1.2]
};

/**
 * Choreography Director cues triggered automatically as narration progresses word-by-word.
 * Ensures characters walk, gesture, water crops, and interact with the living stage when "Dengarkan Narasi" is clicked!
 */
export interface ChoreographyBeat {
  minRatio: number;
  maxRatio: number;
  actor: SelectableCharacterId;
  targets: Partial<Record<SelectableCharacterId, [number, number, number]>>;
  watering?: boolean;
  sfx?: 'sprout' | 'water' | 'guitar' | 'chime';
  advancePlotId?: string;
}

export const SCENE_CHOREOGRAPHY: Record<string, ChoreographyBeat[]> = {
  'scene-1': [
    {
      minRatio: 0.0,
      maxRatio: 0.34,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.95, -0.02, 0.48],
        mateo: [1.35, -0.02, 0.48],
        sofia: [-1.85, -0.02, -0.15]
      }
    },
    {
      minRatio: 0.35,
      maxRatio: 0.68,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.45, -0.02, 0.28],
        mateo: [0.85, -0.02, 0.32],
        mei: [1.75, -0.02, -0.15]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-8'
    },
    {
      minRatio: 0.69,
      maxRatio: 1.0,
      actor: 'mateo',
      targets: {
        aisyah: [-0.38, -0.02, 0.25],
        mateo: [0.45, -0.02, 0.25],
        kenji: [-0.85, -0.02, -0.85],
        amara: [0.85, -0.02, -0.85]
      },
      sfx: 'guitar'
    }
  ],
  'scene-2': [
    {
      minRatio: 0.0,
      maxRatio: 0.38,
      actor: 'mateo',
      targets: {
        mateo: [0.52, -0.02, 0.28],
        aisyah: [-0.62, -0.02, 0.32],
        amara: [0.95, -0.02, -0.65]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-6'
    },
    {
      minRatio: 0.39,
      maxRatio: 0.74,
      actor: 'kenji',
      targets: {
        kenji: [-0.42, -0.02, -0.45],
        mateo: [0.58, -0.02, 0.24],
        sofia: [-1.45, -0.02, 0.15]
      },
      watering: true,
      sfx: 'water',
      advancePlotId: 'tile-1'
    },
    {
      minRatio: 0.75,
      maxRatio: 1.0,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.45, -0.02, 0.22],
        mateo: [0.48, -0.02, 0.22],
        kenji: [-0.38, -0.02, -0.38],
        mei: [1.35, -0.02, -0.15]
      },
      watering: false,
      sfx: 'chime'
    }
  ],
  'scene-3': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'amara',
      targets: {
        amara: [0.42, -0.02, -0.38],
        aisyah: [-0.55, -0.02, 0.32],
        mei: [1.55, -0.02, -0.25]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-2'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'amara',
      targets: {
        amara: [0.18, -0.02, -0.18],
        aisyah: [-0.42, -0.02, 0.22],
        mateo: [1.15, -0.02, 0.35]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-4'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'aisyah',
      targets: {
        amara: [0.35, -0.02, -0.28],
        aisyah: [-0.35, -0.02, 0.24],
        sofia: [-1.35, -0.02, 0.05]
      },
      sfx: 'chime'
    }
  ],
  'scene-4': [
    {
      minRatio: 0.0,
      maxRatio: 0.38,
      actor: 'sofia',
      targets: {
        sofia: [-0.85, -0.02, 0.12],
        aisyah: [-1.35, -0.02, 0.55],
        mateo: [0.95, -0.02, 0.38]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.39,
      maxRatio: 0.74,
      actor: 'sofia',
      targets: {
        sofia: [-0.48, -0.02, 0.18],
        mateo: [0.55, -0.02, 0.24],
        mei: [1.45, -0.02, -0.15]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-3'
    },
    {
      minRatio: 0.75,
      maxRatio: 1.0,
      actor: 'mateo',
      targets: {
        sofia: [-0.42, -0.02, 0.15],
        mateo: [0.45, -0.02, 0.22],
        amara: [0.85, -0.02, -0.65]
      },
      sfx: 'guitar'
    }
  ],
  'scene-5': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'kenji',
      targets: {
        kenji: [-1.15, -0.02, -0.85],
        aisyah: [-0.75, -0.02, 0.35],
        mateo: [1.05, -0.02, 0.38]
      },
      watering: true,
      sfx: 'water',
      advancePlotId: 'tile-0'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'kenji',
      targets: {
        kenji: [-0.48, -0.02, -0.42],
        mei: [0.85, -0.02, -0.25],
        sofia: [-1.25, -0.02, 0.05]
      },
      watering: true,
      sfx: 'water',
      advancePlotId: 'tile-5'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.52, -0.02, 0.28],
        sofia: [-1.05, -0.02, 0.12],
        mei: [0.75, -0.02, -0.18],
        kenji: [-0.55, -0.02, -0.55]
      },
      watering: false,
      sfx: 'chime'
    }
  ],
  'scene-6': [
    {
      minRatio: 0.0,
      maxRatio: 0.38,
      actor: 'mei',
      targets: {
        mei: [0.78, -0.02, -0.12],
        amara: [0.45, -0.02, -0.45],
        aisyah: [-0.65, -0.02, 0.32]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-7'
    },
    {
      minRatio: 0.39,
      maxRatio: 0.74,
      actor: 'amara',
      targets: {
        mei: [1.25, -0.02, -0.55],
        amara: [0.95, -0.02, -0.68],
        mateo: [0.65, -0.02, 0.32]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.75,
      maxRatio: 1.0,
      actor: 'mei',
      targets: {
        mei: [0.62, -0.02, 0.08],
        amara: [0.42, -0.02, -0.35],
        aisyah: [-0.45, -0.02, 0.25]
      },
      sfx: 'chime'
    }
  ],
  'scene-7': [
    {
      minRatio: 0.0,
      maxRatio: 0.35,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.55, -0.02, 0.32],
        mateo: [0.55, -0.02, 0.32],
        sofia: [-1.15, -0.02, 0.05],
        mei: [1.15, -0.02, 0.05],
        kenji: [-0.65, -0.02, -0.55],
        amara: [0.65, -0.02, -0.55]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.36,
      maxRatio: 0.72,
      actor: 'mateo',
      targets: {
        aisyah: [-0.42, -0.02, 0.26],
        mateo: [0.42, -0.02, 0.26],
        sofia: [-0.95, -0.02, 0.02],
        mei: [0.95, -0.02, 0.02],
        kenji: [-0.52, -0.02, -0.45],
        amara: [0.52, -0.02, -0.45]
      },
      sfx: 'guitar'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.38, -0.02, 0.22],
        mateo: [0.38, -0.02, 0.22],
        sofia: [-0.88, -0.02, 0.0],
        mei: [0.88, -0.02, 0.0],
        kenji: [-0.48, -0.02, -0.42],
        amara: [0.48, -0.02, -0.42]
      },
      sfx: 'chime'
    }
  ],
  'scene-8': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.32, -0.02, -0.82],
        kenji: [0.32, -0.02, -0.82],
        sofia: [-0.85, -0.02, -0.55]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'kenji',
      targets: {
        aisyah: [-0.25, -0.02, -0.88],
        kenji: [0.22, -0.02, -0.88],
        amara: [0.82, -0.02, -0.58],
        mei: [1.15, -0.02, -0.35]
      },
      sfx: 'sprout'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'sofia',
      targets: {
        sofia: [-0.55, -0.02, -0.68],
        aisyah: [-0.18, -0.02, -0.82],
        mateo: [0.65, -0.02, -0.42]
      },
      sfx: 'chime'
    }
  ],
  'scene-9': [
    {
      minRatio: 0.0,
      maxRatio: 0.35,
      actor: 'sofia',
      targets: {
        sofia: [-1.42, -0.02, -0.32],
        aisyah: [-1.18, -0.02, -0.15],
        mateo: [0.75, -0.02, 0.35]
      },
      watering: true,
      sfx: 'water'
    },
    {
      minRatio: 0.36,
      maxRatio: 0.72,
      actor: 'aisyah',
      targets: {
        aisyah: [-1.32, -0.02, 0.76],
        sofia: [-1.02, -0.02, 0.76],
        mei: [1.15, -0.02, 0.25],
        kenji: [-0.45, -0.02, -0.35]
      },
      watering: false,
      sfx: 'chime'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'mateo',
      targets: {
        aisyah: [-1.28, -0.02, 0.72],
        sofia: [-0.98, -0.02, 0.72],
        mateo: [0.35, -0.02, 0.38],
        amara: [0.85, -0.02, 0.15]
      },
      sfx: 'chime'
    }
  ],
  'scene-10': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'amara',
      targets: {
        amara: [1.55, -0.02, 0.68],
        aisyah: [1.12, -0.02, 0.58],
        mateo: [1.35, -0.02, 0.95]
      },
      sfx: 'sprout'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'mateo',
      targets: {
        amara: [1.62, -0.02, 0.72],
        mateo: [1.28, -0.02, 0.82],
        mei: [1.68, -0.02, 0.32],
        kenji: [0.78, -0.02, 0.28]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'aisyah',
      targets: {
        aisyah: [1.18, -0.02, 0.65],
        amara: [1.58, -0.02, 0.75],
        sofia: [0.65, -0.02, 0.48]
      },
      sfx: 'chime'
    }
  ],
  'scene-11': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'mei',
      targets: {
        mei: [1.52, -0.02, 0.68],
        amara: [1.68, -0.02, 0.88],
        sofia: [0.95, -0.02, 0.42]
      },
      sfx: 'sprout',
      advancePlotId: 'tile-2'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'sofia',
      targets: {
        sofia: [1.22, -0.02, 0.62],
        mei: [1.58, -0.02, 0.74],
        kenji: [0.82, -0.02, 0.18]
      },
      sfx: 'water'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'kenji',
      targets: {
        kenji: [1.05, -0.02, 0.48],
        mei: [1.48, -0.02, 0.68],
        aisyah: [0.55, -0.02, 0.35]
      },
      sfx: 'chime'
    }
  ],
  'scene-12': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'aisyah',
      targets: {
        aisyah: [-1.32, -0.02, 0.75],
        sofia: [-0.98, -0.02, 0.75],
        amara: [1.35, -0.02, 0.58]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'sofia',
      targets: {
        sofia: [-0.92, -0.02, 0.68],
        aisyah: [-1.28, -0.02, 0.72],
        mei: [1.42, -0.02, 0.65],
        mateo: [0.42, -0.02, 0.35]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'amara',
      targets: {
        amara: [1.48, -0.02, 0.68],
        aisyah: [-1.15, -0.02, 0.65],
        mateo: [0.35, -0.02, 0.28],
        kenji: [-0.35, -0.02, -0.25]
      },
      sfx: 'guitar'
    }
  ],
  'scene-13': [
    {
      minRatio: 0.0,
      maxRatio: 0.36,
      actor: 'kenji',
      targets: {
        kenji: [0.18, -0.02, -0.85],
        mei: [0.95, -0.02, -0.62],
        aisyah: [-0.35, -0.02, -0.78]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.37,
      maxRatio: 0.72,
      actor: 'mei',
      targets: {
        mei: [1.18, -0.02, -0.58],
        kenji: [0.42, -0.02, -0.72],
        mateo: [0.68, -0.02, 0.22]
      },
      sfx: 'sprout'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'mateo',
      targets: {
        mateo: [0.48, -0.02, 0.18],
        kenji: [0.15, -0.02, -0.75],
        amara: [1.35, -0.02, 0.55]
      },
      sfx: 'guitar'
    }
  ],
  'scene-14': [
    {
      minRatio: 0.0,
      maxRatio: 0.35,
      actor: 'aisyah',
      targets: {
        aisyah: [-0.45, -0.02, 0.28],
        mateo: [0.45, -0.02, 0.28],
        sofia: [-1.15, -0.02, 0.55],
        mei: [1.35, -0.02, 0.55],
        kenji: [-0.35, -0.02, -0.68],
        amara: [0.35, -0.02, -0.68]
      },
      sfx: 'chime'
    },
    {
      minRatio: 0.36,
      maxRatio: 0.72,
      actor: 'sofia',
      targets: {
        aisyah: [-0.38, -0.02, 0.24],
        mateo: [0.38, -0.02, 0.24],
        sofia: [-0.95, -0.02, 0.42],
        mei: [1.22, -0.02, 0.48],
        kenji: [-0.28, -0.02, -0.55],
        amara: [0.28, -0.02, -0.55]
      },
      sfx: 'guitar'
    },
    {
      minRatio: 0.73,
      maxRatio: 1.0,
      actor: 'mateo',
      targets: {
        aisyah: [-0.32, -0.02, 0.2],
        mateo: [0.32, -0.02, 0.2],
        sofia: [-0.82, -0.02, 0.15],
        mei: [0.82, -0.02, 0.15],
        kenji: [-0.42, -0.02, -0.38],
        amara: [0.42, -0.02, -0.38]
      },
      sfx: 'chime'
    }
  ]
};

function defaultToolForScene(scene: SceneDefinition): FarmTool {
  if (scene.activityCategory === 'study-learning') return 'study-book';
  if (scene.activityCategory === 'zoo-visit') return 'zoo-binoculars';
  if (scene.activityCategory === 'muslim-prayer') return 'prayer-mat';
  return 'water';
}

/**
 * Generates the 3x3 garden bed crop progression matching Day 1..14 of the 2-Week Story Series,
 * ensuring the 3D/2D diorama plots visually reflect the current chapter's day!
 */
function buildCropGridForDay(day: number): FarmCropTile[] {
  const clampedDay = Math.max(1, Math.min(14, day));
  const baseSpec: Array<{ id: string; gridX: number; gridZ: number; cropType: 'ginger' | 'sunflower' | 'strawberry' }> = [
    { id: 'tile-0', gridX: 0, gridZ: 0, cropType: 'ginger' },
    { id: 'tile-1', gridX: 1, gridZ: 0, cropType: 'strawberry' },
    { id: 'tile-2', gridX: 2, gridZ: 0, cropType: 'strawberry' },
    { id: 'tile-3', gridX: 0, gridZ: 1, cropType: 'sunflower' },
    { id: 'tile-4', gridX: 1, gridZ: 1, cropType: 'ginger' },
    { id: 'tile-5', gridX: 2, gridZ: 1, cropType: 'ginger' },
    { id: 'tile-6', gridX: 0, gridZ: 2, cropType: 'strawberry' },
    { id: 'tile-7', gridX: 1, gridZ: 2, cropType: 'sunflower' },
    { id: 'tile-8', gridX: 2, gridZ: 2, cropType: 'ginger' }
  ];

  return baseSpec.map((item, idx) => {
    let stage: FarmCropTile['stage'] = 'soil';
    let isWatered = false;

    if (clampedDay === 1) {
      stage = idx % 3 === 0 ? 'seed' : idx % 2 === 0 ? 'sprout' : 'soil';
      isWatered = idx % 2 === 0;
    } else if (clampedDay === 2) {
      stage = idx % 2 === 0 ? 'sprout' : 'seed';
      isWatered = true;
    } else if (clampedDay === 3) {
      stage = idx % 3 === 0 ? 'growing' : 'sprout';
      isWatered = idx % 2 === 0;
    } else if (clampedDay === 4) {
      stage = item.cropType === 'sunflower' ? 'ripe' : 'growing';
      isWatered = true;
    } else if (clampedDay === 5) {
      stage = idx % 2 === 0 ? 'ripe' : 'growing';
      isWatered = true;
    } else if (clampedDay === 6) {
      stage = 'ripe';
      isWatered = idx % 2 === 0;
    } else if (clampedDay === 7) {
      // Day 7: Sunday Lantern & Blossom Festival — all 9 plots in full bloom!
      stage = 'ripe';
      isWatered = true;
    } else if (clampedDay === 8 || clampedDay === 9) {
      stage = idx % 3 === 0 ? 'ripe' : 'growing';
      isWatered = true;
    } else if (clampedDay === 10 || clampedDay === 11) {
      stage = item.cropType === 'strawberry' ? 'ripe' : 'growing';
      isWatered = true;
    } else if (clampedDay === 12 || clampedDay === 13) {
      stage = idx % 2 === 0 ? 'ripe' : 'growing';
      isWatered = true;
    } else {
      // Day 14: Two-Week Grand Celebration — all 9 plots in full bloom!
      stage = 'ripe';
      isWatered = true;
    }

    return {
      ...item,
      isWatered,
      stage
    };
  });
}

function clampToIsland(x: number, z: number): [number, number] {
  const maxRadius = 2.95;
  const dist = Math.hypot(x, z);
  if (dist > maxRadius) {
    const scale = maxRadius / dist;
    return [Number((x * scale).toFixed(3)), Number((z * scale).toFixed(3))];
  }
  return [Number(x.toFixed(3)), Number(z.toFixed(3))];
}

interface StoryState {
  // Localization & Visual
  language: LanguageCode;
  activeMode: StoryMode;
  visualMode: VisualMode;
  isFullscreen: boolean;
  /** Whether to show all floating 3D/2D scene labels simultaneously (false = minimalist contextual hover/speech mode). */
  showSceneLabels: boolean;

  // Active Story & Chapter
  currentSeries: SeriesManifest;
  currentStory: StoryManifest;
  currentSceneIndex: number;
  currentScene: SceneDefinition;

  // Audio & Playback
  isPlaying: boolean;
  playbackSpeed: number;
  activeWordIndex: number;
  voicePersona: VoicePersonaId;
  speakingCharacter: SelectableCharacterId;
  narrationBeatIndex: number;

  // Interactive Mechanics & Character Locomotion
  collectedStars: string[];
  sproutedPlants: number;
  isWateringActive: boolean;
  characterBounceTarget: string | null;
  selectedCharacter: SelectableCharacterId;
  characterTargets: Record<SelectableCharacterId, [number, number, number]>;
  isDraggingCharacter: boolean;

  // Bedtime Sanctuary Engine
  sleepTimerMinutes: number | null;
  sleepRemainingSeconds: number | null;
  isBlackoutActive: boolean;

  // Active Modals & Hotspots
  activeHotspotId: string | null;
  activeVocabWord: WordMarker | null;
  isQuizOpen: boolean;
  quizCompleted: boolean;
  quizScore: number;
  /** Best quiz score per scene id (0–100). */
  quizResults: Record<string, number>;

  // Harvest Moon Farm Simulation Mechanics
  activeTool: FarmTool;
  cropTiles: FarmCropTile[];
  harvestCount: number;
  farmGold: number;
  farmDay: number;
  farmSeason: 'spring' | 'summer' | 'autumn' | 'winter';
  farmEnergy: number;

  // Actions
  setActiveTool: (tool: FarmTool) => void;
  interactWithCropTile: (tileId: string) => void;
  advanceFarmDay: () => void;
  refillWater: () => void;

  setLanguage: (lang: LanguageCode) => void;
  setMode: (mode: StoryMode) => void;
  setVisualMode: (visualMode: VisualMode) => void;
  toggleVisualMode: () => void;
  setFullscreen: (isFullscreen: boolean) => void;
  toggleFullscreen: () => void;
  toggleSceneLabels: () => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setVoicePersona: (persona: VoicePersonaId) => void;
  setActiveWordIndex: (index: number) => void;
  nextScene: () => void;
  prevScene: () => void;
  selectScene: (index: number) => void;

  // Interactions & Character Locomotion
  collectStar: (starId: string) => void;
  resetStars: () => void;
  triggerPlantSprout: () => void;
  toggleWatering: () => void;
  triggerCharacterAction: (charId: string) => void;
  selectCharacter: (charId: SelectableCharacterId) => void;
  moveSelectedCharacterTo: (target: [number, number, number]) => void;
  nudgeSelectedCharacter: (dx: number, dz: number) => void;
  setIsDraggingCharacter: (isDragging: boolean) => void;
  resetCharacterPositions: () => void;

  // Modals
  openHotspot: (hotspotId: string) => void;
  closeHotspot: () => void;
  openVocab: (word: WordMarker) => void;
  closeVocab: () => void;
  openQuiz: () => void;
  closeQuiz: () => void;
  setQuizScore: (score: number) => void;

  // Sleep Timer
  startSleepTimer: (minutes: number) => void;
  cancelSleepTimer: () => void;
  tickSleepTimer: () => void;
  toggleBlackout: () => void;
}

let sleepIntervalTimer: number | null = null;

export const useStoryStore = create<StoryState>((set, get) => {
  const initialStory = series01Data.stories[0];
  const initialScene = initialStory.scenes[0];

  return {
    language: 'id', // Default to Indonesian, toggleable to English
    activeMode: 'study',
    visualMode: '3D',
    isFullscreen: false,
    showSceneLabels: false,

    currentSeries: series01Data,
    currentStory: initialStory,
    currentSceneIndex: 0,
    currentScene: initialScene,

    isPlaying: false,
    playbackSpeed: 1.0,
    activeWordIndex: -1,
    voicePersona: 'mama-sari',
    speakingCharacter: 'mateo',
    narrationBeatIndex: -1,

    collectedStars: [],
    sproutedPlants: 1,
    isWateringActive: false,
    characterBounceTarget: null,
    selectedCharacter: 'mateo',
    characterTargets: {
      aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
      mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
      sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
      mei: [...INITIAL_CHARACTER_TARGETS.mei],
      kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
      amara: [...INITIAL_CHARACTER_TARGETS.amara]
    },
    isDraggingCharacter: false,

    sleepTimerMinutes: null,
    sleepRemainingSeconds: null,
    isBlackoutActive: false,

    activeHotspotId: null,
    activeVocabWord: null,
    isQuizOpen: false,
    quizCompleted: false,
    quizScore: 0,
    quizResults: {},

    // Harvest Moon Farm State
    activeTool: 'water',
    harvestCount: 0,
    farmGold: 150,
    farmDay: 1,
    farmSeason: 'spring',
    farmEnergy: 100,
    cropTiles: [
      { id: 'tile-0', gridX: 0, gridZ: 0, isWatered: true, cropType: 'ginger', stage: 'sprout' },
      { id: 'tile-1', gridX: 1, gridZ: 0, isWatered: false, cropType: 'strawberry', stage: 'growing' },
      { id: 'tile-2', gridX: 2, gridZ: 0, isWatered: false, cropType: 'strawberry', stage: 'ripe' },
      { id: 'tile-3', gridX: 0, gridZ: 1, isWatered: true, cropType: 'sunflower', stage: 'growing' },
      { id: 'tile-4', gridX: 1, gridZ: 1, isWatered: true, cropType: 'ginger', stage: 'ripe' },
      { id: 'tile-5', gridX: 2, gridZ: 1, isWatered: false, cropType: 'ginger', stage: 'sprout' },
      { id: 'tile-6', gridX: 0, gridZ: 2, isWatered: false, cropType: 'strawberry', stage: 'soil' },
      { id: 'tile-7', gridX: 1, gridZ: 2, isWatered: true, cropType: 'sunflower', stage: 'ripe' },
      { id: 'tile-8', gridX: 2, gridZ: 2, isWatered: true, cropType: 'ginger', stage: 'seed' }
    ],

    setActiveTool: (activeTool: FarmTool) => {
      soundEngine.playSFX('tap');
      const { selectedCharacter, characterTargets } = get();
      const nextTargets = { ...characterTargets };

      if (activeTool === 'study-book') {
        soundEngine.playSFX('chime');
        nextTargets[selectedCharacter] = [-0.25, -0.02, -0.88];
      } else if (activeTool === 'zoo-binoculars') {
        soundEngine.playSFX('sprout');
        nextTargets[selectedCharacter] = [1.58, -0.02, 0.72];
      } else if (activeTool === 'prayer-mat') {
        soundEngine.playSFX('chime');
        nextTargets[selectedCharacter] = [-1.32, -0.02, 0.76];
      }

      set({
        activeTool,
        characterTargets: nextTargets,
        characterBounceTarget: selectedCharacter
      });
      setTimeout(() => {
        if (get().characterBounceTarget === selectedCharacter) {
          set({ characterBounceTarget: null });
        }
      }, 650);
    },

    interactWithCropTile: (tileId: string) => {
      const { activeTool, cropTiles, farmEnergy, currentScene } = get();
      const tileIndex = cropTiles.findIndex((t) => t.id === tileId);
      if (tileIndex === -1) return;

      const tile = cropTiles[tileIndex];
      const updatedTiles = [...cropTiles];

      if (activeTool === 'water') {
        soundEngine.playSFX('water');
        set({ isWateringActive: true });
        setTimeout(() => set({ isWateringActive: false }), 800);

        // Advance growth if already watered or seeded
        let nextStage = tile.stage;
        if (tile.stage === 'seed') nextStage = 'sprout';
        else if (tile.stage === 'sprout') nextStage = 'growing';
        else if (tile.stage === 'growing') nextStage = 'ripe';

        updatedTiles[tileIndex] = { ...tile, isWatered: true, stage: nextStage };
        set({
          cropTiles: updatedTiles,
          sproutedPlants: get().sproutedPlants + 1,
          farmEnergy: Math.max(0, farmEnergy - 5)
        });
      } else if (activeTool === 'harvest') {
        if (tile.stage === 'ripe') {
          soundEngine.playSFX('star');
          updatedTiles[tileIndex] = { ...tile, stage: 'soil', isWatered: false };
          set((s) => ({
            cropTiles: updatedTiles,
            harvestCount: s.harvestCount + 1,
            farmGold: s.farmGold + 60
          }));
        } else {
          soundEngine.playSFX('tryAgain');
        }
      } else if (activeTool === 'seed') {
        if (tile.stage === 'soil') {
          soundEngine.playSFX('sprout');
          const types: Array<'ginger' | 'sunflower' | 'strawberry'> = ['ginger', 'strawberry', 'sunflower'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          updatedTiles[tileIndex] = { ...tile, cropType: randomType, stage: 'seed', isWatered: false };
          set({ cropTiles: updatedTiles, farmEnergy: Math.max(0, farmEnergy - 3) });
        } else {
          soundEngine.playSFX('tap');
        }
      } else if (activeTool === 'guitar') {
        soundEngine.playSFX('guitar');
        set({ characterBounceTarget: 'mateo' });
        setTimeout(() => set({ characterBounceTarget: null }), 1000);
      } else if (activeTool === 'inspect') {
        soundEngine.playSFX('chime');
        const firstHotspot = currentScene.hotspots[0]?.id ?? 'hotspot-soil';
        get().openHotspot(firstHotspot);
      } else if (activeTool === 'study-book') {
        soundEngine.playSFX('chime');
        set((s) => ({
          farmGold: s.farmGold + 25,
          characterTargets: {
            ...s.characterTargets,
            [s.selectedCharacter]: [-0.25, -0.02, -0.88]
          }
        }));
        const studyHotspot =
          currentScene.hotspots.find((h) => h.id.includes('smartboard') || h.id.includes('encyclopedia') || h.id.includes('zoology'))?.id ??
          currentScene.hotspots[0]?.id;
        if (studyHotspot) get().openHotspot(studyHotspot);
      } else if (activeTool === 'zoo-binoculars') {
        soundEngine.playSFX('sprout');
        set((s) => ({
          farmGold: s.farmGold + 35,
          characterTargets: {
            ...s.characterTargets,
            [s.selectedCharacter]: [1.58, -0.02, 0.72]
          }
        }));
        const zooHotspot =
          currentScene.hotspots.find((h) => h.id.includes('zoo') || h.id.includes('deer') || h.id.includes('bunny'))?.id ??
          currentScene.hotspots[0]?.id;
        if (zooHotspot) get().openHotspot(zooHotspot);
      } else if (activeTool === 'prayer-mat') {
        soundEngine.playSFX('chime');
        set((s) => ({
          farmEnergy: Math.min(100, s.farmEnergy + 30),
          characterTargets: {
            ...s.characterTargets,
            [s.selectedCharacter]: [-1.32, -0.02, 0.76]
          }
        }));
        const prayerHotspot =
          currentScene.hotspots.find((h) => h.id.includes('sajadah') || h.id.includes('wudhu') || h.id.includes('dua') || h.id.includes('peace'))?.id ??
          currentScene.hotspots[0]?.id;
        if (prayerHotspot) get().openHotspot(prayerHotspot);
      }
    },

    advanceFarmDay: () => {
      narrationController.stop();
      soundEngine.playSFX('chime');
      const { currentStory, currentSceneIndex } = get();
      const totalScenes = currentStory.scenes.length;
      const nextIdx = (currentSceneIndex + 1) % totalScenes;
      const nextSceneObj = currentStory.scenes[nextIdx];
      const nextDay = nextSceneObj.dayNumber ?? nextIdx + 1;
      const leadChar = nextSceneObj.leadCharacter ?? 'aisyah';

      set({
        currentSceneIndex: nextIdx,
        currentScene: nextSceneObj,
        farmDay: nextDay,
        activeTool: defaultToolForScene(nextSceneObj),
        cropTiles: buildCropGridForDay(nextDay),
        farmEnergy: 100,
        activeWordIndex: -1,
        narrationBeatIndex: -1,
        isPlaying: false,
        isWateringActive: false,
        activeHotspotId: null,
        isQuizOpen: false,
        speakingCharacter: leadChar,
        selectedCharacter: leadChar,
        characterTargets: {
          aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
          mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
          sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
          mei: [...INITIAL_CHARACTER_TARGETS.mei],
          kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
          amara: [...INITIAL_CHARACTER_TARGETS.amara]
        }
      });
    },

    refillWater: () => {
      soundEngine.playSFX('water');
      set({ farmEnergy: Math.min(100, get().farmEnergy + 25) });
    },

    setLanguage: (language) => {
      const { isPlaying } = get();
      set({ language, activeWordIndex: -1, narrationBeatIndex: -1 });
      soundEngine.playSFX('tap');
      if (isPlaying) {
        // Restart speech in new language seamlessly
        narrationController.stop();
        const { currentScene, playbackSpeed, voicePersona } = get();
        const dialogue = currentScene.dialogue[language];
        narrationController.startNarration(
          dialogue.words,
          language,
          playbackSpeed,
          (wordIdx) => get().setActiveWordIndex(wordIdx),
          () => set({ isPlaying: false, activeWordIndex: -1, narrationBeatIndex: -1, isWateringActive: false }),
          dialogue.narrationAudioUrl,
          voicePersona
        );
      }
    },

    setMode: (activeMode) => {
      set({ activeMode });
      soundEngine.playSFX('tap');
      soundEngine.playBGM(activeMode);
    },

    setVisualMode: (visualMode) => {
      soundEngine.playSFX('tap');
      set({ visualMode });
    },

    toggleVisualMode: () => {
      soundEngine.playSFX('tap');
      set((s) => ({
        visualMode: s.visualMode === '3D' ? '2D' : s.visualMode === '2D' ? 'VIDEO' : '3D'
      }));
    },

    setFullscreen: (isFullscreen) => {
      set({ isFullscreen });
    },

    toggleFullscreen: () => {
      soundEngine.playSFX('tap');
      set((s) => ({ isFullscreen: !s.isFullscreen }));
    },

    toggleSceneLabels: () => {
      soundEngine.playSFX('tap');
      set((s) => ({ showSceneLabels: !s.showSceneLabels }));
    },

    togglePlay: () => {
      const { isPlaying, currentScene, language, playbackSpeed, voicePersona } = get();
      if (isPlaying) {
        narrationController.pause();
        soundEngine.stopBGM();
        set({ isPlaying: false, isWateringActive: false });
      } else {
        const dialogue = currentScene.dialogue[language];
        soundEngine.playBGM(get().activeMode);
        set({ isPlaying: true, narrationBeatIndex: -1 });
        narrationController.startNarration(
          dialogue.words,
          language,
          playbackSpeed,
          (wordIdx) => get().setActiveWordIndex(wordIdx),
          () => set({ isPlaying: false, activeWordIndex: -1, narrationBeatIndex: -1, isWateringActive: false }),
          dialogue.narrationAudioUrl,
          voicePersona
        );
      }
    },

    setPlaybackSpeed: (speed) => {
      set({ playbackSpeed: speed });
      const { isPlaying, currentScene, language, voicePersona } = get();
      if (isPlaying) {
        const dialogue = currentScene.dialogue[language];
        narrationController.startNarration(
          dialogue.words,
          language,
          speed,
          (wordIdx) => get().setActiveWordIndex(wordIdx),
          () => set({ isPlaying: false, activeWordIndex: -1, narrationBeatIndex: -1, isWateringActive: false }),
          dialogue.narrationAudioUrl,
          voicePersona
        );
      }
    },

    setVoicePersona: (voicePersona) => {
      soundEngine.playSFX('chime');
      set({ voicePersona });
      const { isPlaying, currentScene, language, playbackSpeed } = get();
      if (isPlaying) {
        const dialogue = currentScene.dialogue[language];
        narrationController.startNarration(
          dialogue.words,
          language,
          playbackSpeed,
          (wordIdx) => get().setActiveWordIndex(wordIdx),
          () => set({ isPlaying: false, activeWordIndex: -1, narrationBeatIndex: -1, isWateringActive: false }),
          dialogue.narrationAudioUrl,
          voicePersona
        );
      }
    },

    setActiveWordIndex: (activeWordIndex) => {
      if (activeWordIndex < 0) {
        set({ activeWordIndex: -1, narrationBeatIndex: -1, isWateringActive: false });
        return;
      }

      const { currentScene, language, narrationBeatIndex, characterTargets, cropTiles } = get();
      const words = currentScene.dialogue[language].words;
      const total = Math.max(1, words.length);
      const ratio = activeWordIndex / total;

      // 1. Detect character name mentions in the spoken word for immediate reactive spotlighting
      const rawWord = (words[activeWordIndex]?.word ?? '').toLowerCase();
      let mentionedActor: SelectableCharacterId | null = null;
      if (rawWord.includes('aisyah')) mentionedActor = 'aisyah';
      else if (rawWord.includes('mateo')) mentionedActor = 'mateo';
      else if (rawWord.includes('kenji')) mentionedActor = 'kenji';
      else if (rawWord.includes('sofia')) mentionedActor = 'sofia';
      else if (rawWord.includes('mei')) mentionedActor = 'mei';
      else if (rawWord.includes('amara')) mentionedActor = 'amara';

      // 2. Evaluate Scene Choreography Beat Cues
      const beats = SCENE_CHOREOGRAPHY[currentScene.id] ?? SCENE_CHOREOGRAPHY['scene-1'];
      const beatIdx = beats.findIndex((b) => ratio >= b.minRatio && ratio <= b.maxRatio);

      if (beatIdx !== -1 && beatIdx !== narrationBeatIndex) {
        const beat = beats[beatIdx];
        const nextTargets = { ...characterTargets };
        for (const [charId, pos] of Object.entries(beat.targets)) {
          if (pos) {
            nextTargets[charId as SelectableCharacterId] = [...pos] as [number, number, number];
          }
        }

        let nextTiles = cropTiles;
        if (beat.advancePlotId) {
          const tIdx = cropTiles.findIndex((t) => t.id === beat.advancePlotId);
          if (tIdx !== -1) {
            const tile = cropTiles[tIdx];
            const nextStage =
              tile.stage === 'soil'
                ? 'seed'
                : tile.stage === 'seed'
                  ? 'sprout'
                  : tile.stage === 'sprout'
                    ? 'growing'
                    : 'ripe';
            nextTiles = [...cropTiles];
            nextTiles[tIdx] = { ...tile, isWatered: true, stage: nextStage };
          }
        }

        if (beat.sfx) {
          soundEngine.playSFX(beat.sfx);
        }

        const nextActor = mentionedActor ?? beat.actor;
        set({
          activeWordIndex,
          narrationBeatIndex: beatIdx,
          speakingCharacter: nextActor,
          selectedCharacter: nextActor,
          characterBounceTarget: nextActor,
          characterTargets: nextTargets,
          cropTiles: nextTiles,
          isWateringActive: Boolean(beat.watering)
        });
        setTimeout(() => {
          if (get().characterBounceTarget === nextActor) {
            set({ characterBounceTarget: null });
          }
        }, 700);
      } else if (mentionedActor && mentionedActor !== get().speakingCharacter) {
        set({
          activeWordIndex,
          speakingCharacter: mentionedActor,
          selectedCharacter: mentionedActor,
          characterBounceTarget: mentionedActor
        });
        setTimeout(() => {
          if (get().characterBounceTarget === mentionedActor) {
            set({ characterBounceTarget: null });
          }
        }, 650);
      } else {
        set({ activeWordIndex });
      }
    },

    nextScene: () => {
      const { currentStory, currentSceneIndex } = get();
      if (currentSceneIndex < currentStory.scenes.length - 1) {
        narrationController.stop();
        soundEngine.playSFX('tap');
        const nextIdx = currentSceneIndex + 1;
        const nextSceneObj = currentStory.scenes[nextIdx];
        const nextDay = nextSceneObj.dayNumber ?? nextIdx + 1;
        const leadChar = nextSceneObj.leadCharacter ?? 'aisyah';
        set({
          currentSceneIndex: nextIdx,
          currentScene: nextSceneObj,
          farmDay: nextDay,
          activeTool: defaultToolForScene(nextSceneObj),
          cropTiles: buildCropGridForDay(nextDay),
          farmEnergy: 100,
          activeWordIndex: -1,
          narrationBeatIndex: -1,
          isPlaying: false,
          isWateringActive: false,
          activeHotspotId: null,
          isQuizOpen: false,
          speakingCharacter: leadChar,
          selectedCharacter: leadChar,
          characterTargets: {
            aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
            mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
            sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
            mei: [...INITIAL_CHARACTER_TARGETS.mei],
            kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
            amara: [...INITIAL_CHARACTER_TARGETS.amara]
          }
        });
      }
    },

    prevScene: () => {
      const { currentStory, currentSceneIndex } = get();
      if (currentSceneIndex > 0) {
        narrationController.stop();
        soundEngine.playSFX('tap');
        const prevIdx = currentSceneIndex - 1;
        const prevSceneObj = currentStory.scenes[prevIdx];
        const prevDay = prevSceneObj.dayNumber ?? prevIdx + 1;
        const leadChar = prevSceneObj.leadCharacter ?? 'aisyah';
        set({
          currentSceneIndex: prevIdx,
          currentScene: prevSceneObj,
          farmDay: prevDay,
          activeTool: defaultToolForScene(prevSceneObj),
          cropTiles: buildCropGridForDay(prevDay),
          farmEnergy: 100,
          activeWordIndex: -1,
          narrationBeatIndex: -1,
          isPlaying: false,
          isWateringActive: false,
          activeHotspotId: null,
          isQuizOpen: false,
          speakingCharacter: leadChar,
          selectedCharacter: leadChar,
          characterTargets: {
            aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
            mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
            sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
            mei: [...INITIAL_CHARACTER_TARGETS.mei],
            kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
            amara: [...INITIAL_CHARACTER_TARGETS.amara]
          }
        });
      }
    },

    selectScene: (index) => {
      const { currentStory } = get();
      if (index >= 0 && index < currentStory.scenes.length) {
        narrationController.stop();
        soundEngine.playSFX('tap');
        const targetSceneObj = currentStory.scenes[index];
        const targetDay = targetSceneObj.dayNumber ?? index + 1;
        const leadChar = targetSceneObj.leadCharacter ?? 'aisyah';
        set({
          currentSceneIndex: index,
          currentScene: targetSceneObj,
          farmDay: targetDay,
          activeTool: defaultToolForScene(targetSceneObj),
          cropTiles: buildCropGridForDay(targetDay),
          farmEnergy: 100,
          activeWordIndex: -1,
          narrationBeatIndex: -1,
          isPlaying: false,
          isWateringActive: false,
          activeHotspotId: null,
          isQuizOpen: false,
          speakingCharacter: leadChar,
          selectedCharacter: leadChar,
          characterTargets: {
            aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
            mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
            sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
            mei: [...INITIAL_CHARACTER_TARGETS.mei],
            kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
            amara: [...INITIAL_CHARACTER_TARGETS.amara]
          }
        });
      }
    },

    collectStar: (starId) => {
      const { collectedStars } = get();
      if (!collectedStars.includes(starId)) {
        soundEngine.playSFX('star');
        set({ collectedStars: [...collectedStars, starId] });
      }
    },

    resetStars: () => {
      soundEngine.playSFX('tap');
      set({ collectedStars: [] });
    },

    triggerPlantSprout: () => {
      soundEngine.playSFX('sprout');
      set((s) => ({ sproutedPlants: s.sproutedPlants + 1 }));
    },

    toggleWatering: () => {
      const next = !get().isWateringActive;
      if (next) {
        soundEngine.playSFX('water');
      }
      set({ isWateringActive: next });
    },

    triggerCharacterAction: (charId) => {
      soundEngine.playSFX('tap');
      set({ characterBounceTarget: charId });
      setTimeout(() => set({ characterBounceTarget: null }), 600);
    },

    selectCharacter: (selectedCharacter) => {
      soundEngine.playSFX('tap');
      set({ selectedCharacter, characterBounceTarget: selectedCharacter });
      setTimeout(() => {
        if (get().characterBounceTarget === selectedCharacter) {
          set({ characterBounceTarget: null });
        }
      }, 600);
    },

    moveSelectedCharacterTo: (target) => {
      const { selectedCharacter, characterTargets } = get();
      const [clampedX, clampedZ] = clampToIsland(target[0], target[2]);
      set({
        characterTargets: {
          ...characterTargets,
          [selectedCharacter]: [clampedX, -0.02, clampedZ]
        }
      });
    },

    nudgeSelectedCharacter: (dx, dz) => {
      const { selectedCharacter, characterTargets } = get();
      const current = characterTargets[selectedCharacter];
      const [clampedX, clampedZ] = clampToIsland(current[0] + dx, current[2] + dz);
      set({
        characterTargets: {
          ...characterTargets,
          [selectedCharacter]: [clampedX, -0.02, clampedZ]
        }
      });
    },

    setIsDraggingCharacter: (isDraggingCharacter) => {
      set({ isDraggingCharacter });
    },

    resetCharacterPositions: () => {
      soundEngine.playSFX('tap');
      set({
        characterTargets: {
          aisyah: [...INITIAL_CHARACTER_TARGETS.aisyah],
          mateo: [...INITIAL_CHARACTER_TARGETS.mateo],
          sofia: [...INITIAL_CHARACTER_TARGETS.sofia],
          mei: [...INITIAL_CHARACTER_TARGETS.mei],
          kenji: [...INITIAL_CHARACTER_TARGETS.kenji],
          amara: [...INITIAL_CHARACTER_TARGETS.amara]
        }
      });
    },

    openHotspot: (activeHotspotId) => {
      soundEngine.playSFX('chime');
      set({ activeHotspotId });
    },

    closeHotspot: () => set({ activeHotspotId: null }),

    openVocab: (activeVocabWord) => {
      soundEngine.playSFX('chime');
      set({ activeVocabWord });
    },

    closeVocab: () => set({ activeVocabWord: null }),

    openQuiz: () => {
      soundEngine.playSFX('chime');
      set({ isQuizOpen: true });
    },

    closeQuiz: () => set({ isQuizOpen: false }),

    setQuizScore: (quizScore) => {
      const { currentScene, quizResults } = get();
      const best = Math.max(quizResults[currentScene.id] ?? 0, quizScore);
      set({ quizScore, quizCompleted: true, quizResults: { ...quizResults, [currentScene.id]: best } });
    },

    startSleepTimer: (minutes) => {
      if (sleepIntervalTimer !== null) {
        clearInterval(sleepIntervalTimer);
      }
      const totalSeconds = minutes * 60;
      set({
        sleepTimerMinutes: minutes,
        sleepRemainingSeconds: totalSeconds,
        activeMode: 'sleeping'
      });
      soundEngine.playBGM('sleeping');

      sleepIntervalTimer = window.setInterval(() => {
        get().tickSleepTimer();
      }, 1000);
    },

    cancelSleepTimer: () => {
      if (sleepIntervalTimer !== null) {
        clearInterval(sleepIntervalTimer);
        sleepIntervalTimer = null;
      }
      soundEngine.setMasterVolume(0.8);
      set({ sleepTimerMinutes: null, sleepRemainingSeconds: null });
    },

    tickSleepTimer: () => {
      const { sleepRemainingSeconds, sleepTimerMinutes } = get();
      if (sleepRemainingSeconds === null || sleepTimerMinutes === null) return;

      const totalSec = sleepTimerMinutes * 60;
      const nextRemaining = sleepRemainingSeconds - 1;

      if (nextRemaining <= 0) {
        if (sleepIntervalTimer !== null) {
          clearInterval(sleepIntervalTimer);
          sleepIntervalTimer = null;
        }
        narrationController.stop();
        soundEngine.stopBGM();
        set({
          sleepRemainingSeconds: 0,
          isPlaying: false,
          isBlackoutActive: true
        });
      } else {
        soundEngine.applyLogarithmicSleepDecay(nextRemaining, totalSec);
        set({ sleepRemainingSeconds: nextRemaining });
      }
    },

    toggleBlackout: () => set((s) => ({ isBlackoutActive: !s.isBlackoutActive }))
  };
});
