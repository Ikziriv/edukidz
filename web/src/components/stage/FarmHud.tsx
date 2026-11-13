import React from 'react';
import { useStoryStore } from '../../stores/storyStore';
import type { FarmTool } from '../../types/story';
import {
  Droplet,
  Sprout,
  ShoppingBag,
  Music,
  Search,
  BookOpen,
  Compass,
  Sparkles,
  Sun,
  Moon,
  Heart,
  Coins,
  FastForward,
  Wrench
} from 'lucide-react';
import { useT } from '../../lib/i18n';

export interface FarmToolConfig {
  id: FarmTool;
  name: { id: string; en: string };
  shortName: { id: string; en: string };
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  accentClass: string;
  packetBadgeColor: string;
  desc: { id: string; en: string };
}

export const FARM_TOOLS: FarmToolConfig[] = [
  {
    id: 'water',
    name: { id: 'Penyiram Air', en: 'Watering Can' },
    shortName: { id: 'Siram', en: 'Water' },
    icon: <Droplet size={15} className="text-sky-500 fill-sky-500/20" aria-hidden="true" />,
    activeIcon: <Droplet size={15} className="text-white fill-white/30" aria-hidden="true" />,
    accentClass: 'text-sky-600',
    packetBadgeColor: '#0ea5e9',
    desc: { id: 'Siram tanah kering agar benih tumbuh mekar', en: 'Water dry soil so sprouts can thrive' }
  },
  {
    id: 'seed',
    name: { id: 'Kantung Benih', en: 'Seed Pouch' },
    shortName: { id: 'Benih', en: 'Seed' },
    icon: <Sprout size={15} className="text-emerald-500" aria-hidden="true" />,
    activeIcon: <Sprout size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-emerald-600',
    packetBadgeColor: '#22c55e',
    desc: { id: 'Tanam bibit jahe, stroberi & bunga matahari', en: 'Plant ginger, strawberry & sunflower seeds' }
  },
  {
    id: 'harvest',
    name: { id: 'Keranjang Panen', en: 'Harvest Basket' },
    shortName: { id: 'Panen', en: 'Harvest' },
    icon: <ShoppingBag size={15} className="text-amber-500" aria-hidden="true" />,
    activeIcon: <ShoppingBag size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-amber-600',
    packetBadgeColor: '#f59e0b',
    desc: { id: 'Petik tanaman matang dan kumpulkan ke peti', en: 'Pick ripe vegetables into the shipping bin' }
  },
  {
    id: 'study-book',
    name: { id: 'Buku Ensiklopedia', en: 'Study Book' },
    shortName: { id: 'Belajar', en: 'Study' },
    icon: <BookOpen size={15} className="text-indigo-500" aria-hidden="true" />,
    activeIcon: <BookOpen size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-indigo-600',
    packetBadgeColor: '#6366f1',
    desc: { id: 'Belajar sains, kosakata & papan tulis pintar kelas', en: 'Study science, vocabulary & classroom smartboard' }
  },
  {
    id: 'zoo-binoculars',
    name: { id: 'Teropong Satwa', en: 'See the Zoo' },
    shortName: { id: 'Satwa', en: 'Zoo' },
    icon: <Compass size={15} className="text-orange-500" aria-hidden="true" />,
    activeIcon: <Compass size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-orange-600',
    packetBadgeColor: '#f97316',
    desc: { id: 'Kunjungi Taman Satwa: jerapah, rusa tutul & kelinci', en: 'Visit Sanctuary Zoo: baby giraffe, spotted deer & bunny' }
  },
  {
    id: 'prayer-mat',
    name: { id: 'Sajadah & Doa', en: 'Muslim Prayer' },
    shortName: { id: 'Shalat', en: 'Pray' },
    icon: <Sparkles size={15} className="text-emerald-600" aria-hidden="true" />,
    activeIcon: <Sparkles size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-emerald-700',
    packetBadgeColor: '#059669',
    desc: { id: 'Wudhu, gelar sajadah shalat & panjatkan doa syukur', en: 'Wudhu ablution, unfold sajadah prayer rug & say Du\'a' }
  },
  {
    id: 'guitar',
    name: { id: 'Gitar Mateo', en: 'Acoustic Tune' },
    shortName: { id: 'Gitar', en: 'Guitar' },
    icon: <Music size={15} className="text-pink-500" aria-hidden="true" />,
    activeIcon: <Music size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-pink-600',
    packetBadgeColor: '#ec4899',
    desc: { id: 'Mainkan alunan musik yang merangsang stomata daun', en: 'Play acoustic melodies to soothe plants and friends' }
  },
  {
    id: 'inspect',
    name: { id: 'Kaca Sains', en: 'Botany Lens' },
    shortName: { id: 'Sains', en: 'Lens' },
    icon: <Search size={15} className="text-teal-500" aria-hidden="true" />,
    activeIcon: <Search size={15} className="text-white" aria-hidden="true" />,
    accentClass: 'text-teal-600',
    packetBadgeColor: '#14b8a6',
    desc: { id: 'Pelajari struktur akar, humus tanah, & fotosintesis', en: 'Inspect soil humus, root biology, and botany facts' }
  }
];

/** Top-Right Minimalist Farm Telemetry Bar (Zero Duplication, Unified 36px Horizon) */
export const FarmStatusWidget: React.FC = () => {
  const farmGold = useStoryStore((s) => s.farmGold);
  const farmEnergy = useStoryStore((s) => s.farmEnergy);
  const harvestCount = useStoryStore((s) => s.harvestCount);
  const advanceFarmDay = useStoryStore((s) => s.advanceFarmDay);
  const activeMode = useStoryStore((s) => s.activeMode);
  const t = useT();

  const isSleeping = activeMode === 'sleeping';
  const hearts = Math.ceil(farmEnergy / 20);

  return (
    <div className="stage-dock h-9 rounded-xl pl-2.5 pr-1.5 flex items-center gap-2 text-xs">
      {/* Time & Circadian State */}
      <div className="hidden sm:flex items-center gap-1 font-display font-semibold tabular-nums text-[11px] text-ink">
        {isSleeping ? (
          <>
            <Moon size={12} className="text-amber-400" aria-hidden="true" />
            <span>20:30</span>
          </>
        ) : (
          <>
            <Sun size={12} className="text-amber-500" aria-hidden="true" />
            <span>09:30</span>
          </>
        )}
      </div>

      <div className="dock-divider h-3.5 hidden sm:block" aria-hidden="true" />

      {/* Gold & Harvests */}
      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center gap-1 text-[11px] font-display font-semibold tabular-nums text-ink"
          title={t('Koin Kebun', 'Farm Gold')}
        >
          <Coins size={12} className="text-amber-500" aria-hidden="true" />
          <span>{farmGold}G</span>
        </div>
        {harvestCount > 0 && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary/12 text-primary font-display font-semibold tabular-nums text-[10px]">
            <Sprout size={10} aria-hidden="true" />
            <span>+{harvestCount}</span>
          </span>
        )}
      </div>

      <div className="dock-divider h-3.5 hidden lg:block" aria-hidden="true" />

      {/* Stamina Hearts */}
      <div
        className="hidden lg:flex items-center gap-0.5"
        role="img"
        aria-label={`${hearts} of 5 stamina hearts`}
        title={`${t('Stamina', 'Energy')}: ${farmEnergy}%`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Heart
            key={i}
            size={10}
            className={i <= hearts ? 'text-rose-500 fill-rose-500' : 'text-line'}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Advance Day Button */}
      <button
        type="button"
        onClick={advanceFarmDay}
        className="inline-flex items-center gap-1 h-6.5 px-2 rounded-lg bg-sunken/80 hover:bg-primary hover:text-on-primary text-ink border border-line/70 hover:border-primary text-[11px] font-display font-semibold transition-colors cursor-pointer"
        title={t('Lanjut ke Hari Berikutnya (Tanaman bertumbuh)', 'Advance to Next Day (Crops grow)')}
        aria-label={t('Hari Berikutnya', 'Next Day')}
      >
        <FastForward size={11} aria-hidden="true" />
        <span className="hidden md:inline">{t('Hari Baru', 'Next Day')}</span>
      </button>
    </div>
  );
};

/** Interactive PvZ Seed-Packet Style Garden Equipment Toolbelt Segment */
export const FarmToolbelt: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const activeTool = useStoryStore((s) => s.activeTool);
  const setActiveTool = useStoryStore((s) => s.setActiveTool);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label={t('Alat Kebun Interaktif', 'Interactive Garden Tools')}
    >
      <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted px-1 shrink-0">
        <Wrench size={11} className="text-primary" aria-hidden="true" />
        <span>{t('Alat', 'Tools')}</span>
      </span>

      <div className="stage-well p-1 rounded-xl flex items-center gap-1">
        {FARM_TOOLS.map((tool) => {
          const isEquipped = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              role="radio"
              aria-checked={isEquipped}
              onClick={() => setActiveTool(tool.id)}
              className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all duration-200 cursor-pointer ${
                isEquipped
                  ? 'bg-primary text-on-primary shadow-md scale-[1.03] ring-1 ring-amber-300/80'
                  : 'bg-surface/85 hover:bg-surface text-ink border border-line/50 hover:border-primary/40'
              }`}
              title={`${tool.name[language]} — ${tool.desc[language]}`}
            >
              <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                {isEquipped ? tool.activeIcon : tool.icon}
              </span>
              <span
                className={`whitespace-nowrap transition-all ${
                  isEquipped
                    ? 'inline'
                    : compact
                    ? 'hidden 2xl:inline'
                    : 'hidden md:inline'
                }`}
              >
                {compact && !isEquipped ? tool.shortName[language] : tool.name[language]}
              </span>

              {/* Active Seed Packet Indicator Pip */}
              {isEquipped && (
                <span
                  className="-top-1 -right-1 absolute w-2 h-2 rounded-full bg-accent ring-2 ring-surface"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const FarmHud: React.FC = () => {
  return (
    <>
      <FarmStatusWidget />
      <FarmToolbelt />
    </>
  );
};
