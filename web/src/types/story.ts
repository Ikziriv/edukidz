export type StoryMode = 'study' | 'sleeping' | 'playing';
export type VisualMode = '3D' | '2D' | 'VIDEO';
export type LanguageCode = 'en' | 'id';
export type SelectableCharacterId = 'aisyah' | 'mateo' | 'sofia' | 'mei' | 'kenji' | 'amara';
export type VoicePersonaId = 'mama-sari' | 'kak-aisyah' | 'oma-rahma';
export type VideoCameraShot = 'auto' | 'establishing' | 'closeup' | 'wonder-cutaway' | 'celebration';
export type VideoSourceMode = 'studio-reel' | 'mp4-stream' | 'youtube-embed';

export type ActivityCategory = 'gardening' | 'study-learning' | 'zoo-visit' | 'muslim-prayer';

export interface WonderFactCard {
  id: string;
  question: {
    en: string;
    id: string;
  };
  answer: {
    en: string;
    id: string;
  };
  diagramType:
    | 'seed-roots'
    | 'water-cycle'
    | 'sound-waves'
    | 'sun-photosynthesis'
    | 'zoo-habitat'
    | 'prayer-peace';
}

export interface VideoStorySpec {
  wonderTitle: {
    en: string;
    id: string;
  };
  wonderQuestion: {
    en: string;
    id: string;
  };
  mp4Url?: string;
  hlsStreamUrl?: string;
  youtubeEmbedId?: string;
  facts: WonderFactCard[];
}

export type FarmTool =
  | 'inspect'
  | 'water'
  | 'seed'
  | 'harvest'
  | 'guitar'
  | 'study-book'
  | 'zoo-binoculars'
  | 'prayer-mat';
export type CropGrowthStage = 'soil' | 'seed' | 'sprout' | 'growing' | 'ripe';

export interface FarmCropTile {
  id: string;
  gridX: number;
  gridZ: number;
  isWatered: boolean;
  cropType: 'ginger' | 'sunflower' | 'strawberry';
  stage: CropGrowthStage;
}

export interface WordMarker {
  word: string;
  startMs: number;
  endMs: number;
  isVocab?: boolean;
  definition?: {
    en: string;
    id: string;
  };
  phonics?: {
    en: string;
    id: string;
  };
}

export interface DialogueTrack {
  narrationAudioUrl?: string;
  text: string;
  audioStartMs: number;
  audioEndMs: number;
  words: WordMarker[];
}

export interface HotspotDefinition {
  id: string;
  meshTargetName: string;
  title: {
    en: string;
    id: string;
  };
  explanation: {
    en: string;
    id: string;
  };
  icon: 'sparkles' | 'sprout' | 'music' | 'sun' | 'heart' | 'book';
  position3D: [number, number, number];
}

export interface QuizOption {
  text: {
    en: string;
    id: string;
  };
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: {
    en: string;
    id: string;
  };
  options: QuizOption[];
  explanation: {
    en: string;
    id: string;
  };
}

export interface InteractableMesh {
  meshTargetName: string;
  action: 'triggerAnimation' | 'playSound' | 'sproutPlant' | 'collectStar';
  label: {
    en: string;
    id: string;
  };
}

export interface Layer2D {
  layerUrl: string;
  depthFactor: number;
  title?: string;
}

export interface SceneDefinition {
  id: string;
  chapterNumber: number;
  dayNumber?: number;
  weekNumber?: 1 | 2;
  activityCategory?: ActivityCategory;
  dayOfWeek?: {
    en: string;
    id: string;
  };
  leadCharacter?: SelectableCharacterId;
  title: {
    en: string;
    id: string;
  };
  subtitle: {
    en: string;
    id: string;
  };
  modelGlbUrl: string;
  cameraInitPosition: [number, number, number];
  cameraTargetPosition: [number, number, number];
  cameraLimits: {
    minPolarAngle: number;
    maxPolarAngle: number;
    minDistance: number;
    maxDistance: number;
  };
  interactables: InteractableMesh[];
  hotspots: HotspotDefinition[];
  layers2d: Layer2D[];
  ambientAudioUrl?: string;
  dialogue: {
    en: DialogueTrack;
    id: DialogueTrack;
  };
  quiz: QuizQuestion[];
  videoSpec?: VideoStorySpec;
}

export interface CharacterDefinition {
  id: string;
  name: string;
  ethnicBackground: string;
  regionTag?: 'Southeast Asia' | 'East Asia' | 'Europe' | 'Latin America' | 'West Africa' | 'Middle East & Europe';
  faithTradition: string;
  usesHijab?: boolean;
  skinTone?: string;
  attire: {
    headwear: string;
    clothing: string;
    backpackColor?: string;
    styleCategory: string;
  };
  role: string;
  personality: string;
  accentColor: string;
}

export interface StoryManifest {
  id: string;
  seriesId: string;
  episodeNumber: number;
  title: {
    en: string;
    id: string;
  };
  subtitle: {
    en: string;
    id: string;
  };
  author: string;
  ageRange: string;
  tags: string[];
  supportedModes: StoryMode[];
  defaultMode: StoryMode;
  scenes: SceneDefinition[];
}

export interface SeriesManifest {
  id: string;
  title: {
    en: string;
    id: string;
  };
  tagline: {
    en: string;
    id: string;
  };
  seriesDocsUrl: string;
  targetAge: string;
  toleranceThemes: string[];
  characters: CharacterDefinition[];
  stories: StoryManifest[];
}
