import React from 'react';
import { Sparkles, Sprout, Music, Sun, Heart, BookOpen } from 'lucide-react';
import type { HotspotDefinition } from '../../types/story';

const ICONS: Record<HotspotDefinition['icon'], React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  sparkles: Sparkles,
  sprout: Sprout,
  music: Music,
  sun: Sun,
  heart: Heart,
  book: BookOpen
};

export const HotspotIcon: React.FC<{ icon: HotspotDefinition['icon']; size?: number }> = ({ icon, size = 18 }) => {
  const Icon = ICONS[icon] ?? Sparkles;
  return <Icon size={size} aria-hidden />;
};
