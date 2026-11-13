import type { SelectableCharacterId } from '../types/story';

export interface CharacterVisualPalette {
  id: SelectableCharacterId;
  name: string;
  countryTag: string;
  badgeColor: string;
  skin: string;
  cheekColor: string;
  irisColor: string;
  hairColor: string;
  primary: string;
  secondary: string;
  blazer: string;
  outlineColor: string;
  usesHijab: boolean;
  hasCap?: boolean;
  hasGlasses?: boolean;
  hasAfro?: boolean;
  hasBraids?: boolean;
  hasTwinBuns?: boolean;
  hasGuitar?: boolean;
  pinColor?: string;
  roleTitle?: { id: string; en: string };
  headwearSummary?: { id: string; en: string };
}

export const ALL_CHAR_IDS: SelectableCharacterId[] = [
  'mateo',
  'sofia',
  'mei',
  'kenji',
  'amara'
];

export const CHARACTER_ROSTER: Array<{
  id: SelectableCharacterId;
  label: string;
  color: string;
}> = [
  { id: 'mateo', label: 'Mateo', color: '#f59e0b' },
  { id: 'sofia', label: 'Sofia', color: '#8b5cf6' },
  { id: 'mei', label: 'Mei-Ling', color: '#f97316' },
  { id: 'kenji', label: 'Kenji', color: '#0284c7' },
  { id: 'amara', label: 'Amara', color: '#ec4899' }
];

export const CHARACTER_PALETTES: Record<SelectableCharacterId, CharacterVisualPalette> = {
  aisyah: {
    id: 'aisyah',
    name: 'Aisyah',
    countryTag: 'ID',
    badgeColor: '#10b981',
    skin: '#e5a87e',
    cheekColor: '#f43f5e',
    irisColor: '#3e2723',
    hairColor: '#5c3a21',
    primary: '#facc15',
    secondary: '#ca8a04',
    blazer: '#86efac',
    outlineColor: '#271202',
    usesHijab: false,
    hasCap: true,
    pinColor: '#10b981',
    roleTitle: { id: 'Penjaga Kebun & Doa', en: 'Garden & Prayer Leader' },
    headwearSummary: { id: 'Topi Kuning & Cepol', en: 'Yellow Cap & Bun' }
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    countryTag: 'BR',
    badgeColor: '#f59e0b',
    skin: '#d49466',
    cheekColor: '#fb7185',
    irisColor: '#451a03',
    hairColor: '#29170b',
    primary: '#f59e0b',
    secondary: '#b45309',
    blazer: '#d97706',
    outlineColor: '#271202',
    usesHijab: false,
    hasCap: true,
    hasGuitar: true,
    roleTitle: { id: 'Musisi Akustik', en: 'Acoustic Musician' },
    headwearSummary: { id: 'Topi Petualang', en: 'Explorer Cap' }
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    countryTag: 'EU',
    badgeColor: '#8b5cf6',
    skin: '#f7d3ba',
    cheekColor: '#fda4af',
    irisColor: '#0284c7',
    hairColor: '#a16207',
    primary: '#8b5cf6',
    secondary: '#5b21b6',
    blazer: '#0f766e',
    outlineColor: '#271202',
    usesHijab: false,
    hasBraids: true,
    pinColor: '#fef08a',
    roleTitle: { id: 'Peneliti Botani', en: 'Botany Naturalist' },
    headwearSummary: { id: 'Kepang Nordik & Bando', en: 'Nordic Braids & Band' }
  },
  mei: {
    id: 'mei',
    name: 'Mei-Ling',
    countryTag: 'AS',
    badgeColor: '#f97316',
    skin: '#f3c6a0',
    cheekColor: '#fb7185',
    irisColor: '#1e293b',
    hairColor: '#18181b',
    primary: '#f43f5e',
    secondary: '#be123c',
    blazer: '#1d4ed8',
    outlineColor: '#271202',
    usesHijab: false,
    hasTwinBuns: true,
    pinColor: '#fbbf24',
    roleTitle: { id: 'Peracik Herbal', en: 'Herbal Tea Curator' },
    headwearSummary: { id: 'Sanggul Kembar & Plum', en: 'Twin Buns & Plum Pin' }
  },
  kenji: {
    id: 'kenji',
    name: 'Kenji',
    countryTag: 'JP',
    badgeColor: '#0284c7',
    skin: '#f1c29b',
    cheekColor: '#fda4af',
    irisColor: '#1e293b',
    hairColor: '#0f172a',
    primary: '#0284c7',
    secondary: '#0369a1',
    blazer: '#15803d',
    outlineColor: '#271202',
    usesHijab: false,
    hasCap: true,
    hasGlasses: true,
    roleTitle: { id: 'Arsitek Origami', en: 'Origami & Eco Builder' },
    headwearSummary: { id: 'Topi & Kacamata', en: 'Visor Cap & Glasses' }
  },
  amara: {
    id: 'amara',
    name: 'Amara',
    countryTag: 'NG',
    badgeColor: '#ec4899',
    skin: '#8d5531',
    cheekColor: '#e11d48',
    irisColor: '#27170c',
    hairColor: '#17100c',
    primary: '#ec4899',
    secondary: '#be185d',
    blazer: '#be185d',
    outlineColor: '#271202',
    usesHijab: false,
    hasAfro: true,
    pinColor: '#fbbf24',
    roleTitle: { id: 'Penjaga Ritme Alam', en: 'Rhythm & Soil Keeper' },
    headwearSummary: { id: 'Mahkota Afro Puff', en: 'Golden Afro Puffs' }
  }
};

