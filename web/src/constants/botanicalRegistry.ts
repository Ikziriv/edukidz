import type { FarmCropTile } from '../types/story';

export type BotanicalCropType = FarmCropTile['cropType'];

export interface BotanicalBuddySpec {
  cropType: BotanicalCropType;
  buddyName: { id: string; en: string };
  roleLabel: { id: string; en: string };
  petalOrFruitColor: string;
  centerDiscColor: string;
  stemColor: string;
  leafColor: string;
  outlineColor: string;
  sunEnergyYield: number;
}

/**
 * Plants vs. Zombies–inspired anthropomorphic Botanical Buddies registry.
 * Shared across 3D Diorama, 2D Parallax Canvas, and Broadcast Video Studio.
 */
export const BOTANICAL_BUDDIES: Record<BotanicalCropType, BotanicalBuddySpec> = {
  sunflower: {
    cropType: 'sunflower',
    buddyName: { id: 'Bunga Matahari Ceria', en: 'Sunny Sunflower' },
    roleLabel: { id: 'Penghasil Energi Surya', en: 'Sun Energy Producer' },
    petalOrFruitColor: '#facc15',
    centerDiscColor: '#78350f',
    stemColor: '#16a34a',
    leafColor: '#4ade80',
    outlineColor: '#271202',
    sunEnergyYield: 25
  },
  strawberry: {
    cropType: 'strawberry',
    buddyName: { id: 'Stroberi Penembak Embun', en: 'Berry Dew-Sprout' },
    roleLabel: { id: 'Penjaga Kesegaran Kebun', en: 'Garden Dew Guardian' },
    petalOrFruitColor: '#ef4444',
    centerDiscColor: '#dc2626',
    stemColor: '#15803d',
    leafColor: '#22c55e',
    outlineColor: '#271202',
    sunEnergyYield: 50
  },
  ginger: {
    cropType: 'ginger',
    buddyName: { id: 'Jahe Tangguh Rimpang', en: 'Rooty Ginger Buddy' },
    roleLabel: { id: 'Pelindung Tanah Humus', en: 'Rich Soil Defender' },
    petalOrFruitColor: '#f472b6',
    centerDiscColor: '#d97706',
    stemColor: '#16a34a',
    leafColor: '#34d399',
    outlineColor: '#271202',
    sunEnergyYield: 75
  }
};

/**
 * Returns alternating Plants vs. Zombies checkerboard lawn tile colors
 * for a given (gridX, gridZ) coordinate.
 */
export function getPvZCheckerboardLawnColor(
  gridX: number,
  gridZ: number,
  isNight: boolean
): { turfColor: string; borderColor: string } {
  const isEven = (gridX + gridZ) % 2 === 0;
  if (isNight) {
    return {
      turfColor: isEven ? '#14532d' : '#064e3b',
      borderColor: '#022c22'
    };
  }
  return {
    turfColor: isEven ? '#4ade80' : '#22c55e',
    borderColor: '#15803d'
  };
}

/**
 * Computes the signature PopCap / Plants vs. Zombies rhythmic squash-and-stretch
 * idle bounce scale factors so plants and characters feel alive.
 */
export function getPvZSquashStretch(
  elapsedSeconds: number,
  phaseOffset = 0,
  amplitude = 0.055
): { scaleX: number; scaleY: number; swayAngle: number } {
  const wave = Math.sin(elapsedSeconds * 3.4 + phaseOffset);
  return {
    scaleX: 1 + wave * amplitude,
    scaleY: 1 - wave * amplitude,
    swayAngle: Math.cos(elapsedSeconds * 2.6 + phaseOffset) * 0.08
  };
}

