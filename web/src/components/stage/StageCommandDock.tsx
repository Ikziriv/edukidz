import React, { useState } from 'react';
import {
  Move3d,
  MousePointer2,
  Eye,
  EyeOff,
  LayoutGrid,
  Users,
  Wrench
} from 'lucide-react';
import { useStoryStore } from '../../stores/storyStore';
import { CHARACTER_PALETTES, CHARACTER_ROSTER } from '../../constants/characterRegistry';
import { CharacterMoverDeck } from './CharacterMoverDeck';
import { FarmToolbelt, FARM_TOOLS } from './FarmHud';
import { useT } from '../../lib/i18n';

export type DockTabMode = 'all' | 'character' | 'tools';

/**
 * Unified Spatial Command Dock:
 * Consolidates Character Selection, D-Pad Locomotion, Interactive PvZ Seed Packet Tools,
 * and Contextual Action Guidance into a single zero-collision floating studio bar.
 */
export const StageCommandDock: React.FC<{
  is3D: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}> = ({ is3D, isCollapsed, onToggleCollapse }) => {
  const [dockTab, setDockTab] = useState<DockTabMode>('all');
  const selectedCharacter = useStoryStore((s) => s.selectedCharacter);
  const activeTool = useStoryStore((s) => s.activeTool);
  const language = useStoryStore((s) => s.language);
  const t = useT();

  const activeCharObj = CHARACTER_ROSTER.find((c) => c.id === selectedCharacter) ?? CHARACTER_ROSTER[0];
  const activeCharPalette = CHARACTER_PALETTES[selectedCharacter] ?? CHARACTER_PALETTES.aisyah;
  const activeToolObj = FARM_TOOLS.find((tool) => tool.id === activeTool) ?? FARM_TOOLS[0];

  if (isCollapsed) {
    return (
      <div className="mx-auto w-fit pointer-events-auto animate-pop-in">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="stage-dock rounded-full px-3.5 py-2 flex items-center gap-2 text-xs font-display font-bold text-ink hover:scale-105 transition-transform"
          title={t('Tampilkan Panel Kontrol Panggung', 'Show Stage Control Bar')}
        >
          <Eye size={14} className="text-primary" aria-hidden="true" />
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activeCharObj.color }}
            aria-hidden="true"
          />
          <span>{activeCharObj.label}</span>
          <span className="text-muted">·</span>
          <span className="inline-flex items-center gap-1 text-primary">
            {activeToolObj.icon}
            <span>{activeToolObj.name[language]}</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-fit max-w-full pointer-events-auto animate-pop-in">
      <div className="stage-dock rounded-[22px] p-1.5 sm:px-2.5 sm:py-2 flex flex-col gap-1.5">
        {/* Micro-Header: Active Telemetry + Mode Filter Tabs + Minimize Button */}
        <div className="flex items-center justify-between gap-2 px-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-muted min-w-0 truncate">
            <span className="inline-flex items-center gap-1 font-semibold text-ink shrink-0">
              {is3D ? (
                <Move3d size={12} className="text-primary" aria-hidden="true" />
              ) : (
                <MousePointer2 size={12} className="text-primary" aria-hidden="true" />
              )}
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeCharObj.color }}
                aria-hidden="true"
              />
              <span>{activeCharObj.label}</span>
              {activeCharPalette.headwearSummary && (
                <span className="hidden md:inline-block px-1.5 py-0.2 rounded-md bg-primary/12 text-primary text-[10px] font-bold">
                  {activeCharPalette.headwearSummary[language]}
                </span>
              )}
            </span>
            <span className="text-line" aria-hidden="true">
              •
            </span>
            <span className="truncate hidden sm:inline">
              <strong className="text-primary font-semibold">{activeToolObj.name[language]}:</strong>{' '}
              {activeToolObj.desc[language]}
            </span>
            <span className="truncate sm:hidden font-medium text-primary">
              {activeToolObj.name[language]}
            </span>
          </div>

          {/* Right Micro-Controls: Mode Filter Pills + Collapse HUD */}
          <div className="flex items-center gap-1 shrink-0">
            <div
              className="stage-well p-0.5 rounded-lg flex items-center gap-0.5"
              role="tablist"
              aria-label={t('Mode Panel Kontrol', 'Control Bar View')}
            >
              <button
                type="button"
                role="tab"
                aria-selected={dockTab === 'all'}
                onClick={() => setDockTab('all')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-display font-bold transition-colors flex items-center gap-1 ${
                  dockTab === 'all' ? 'bg-primary text-on-primary shadow-2xs' : 'text-muted hover:text-ink'
                }`}
                title={t('Tampilkan Karakter & Alat Kebun', 'Show Characters & Garden Tools')}
              >
                <LayoutGrid size={10} aria-hidden="true" />
                <span className="hidden md:inline">{t('Semua', 'All')}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={dockTab === 'character'}
                onClick={() => setDockTab('character')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-display font-bold transition-colors flex items-center gap-1 ${
                  dockTab === 'character' ? 'bg-primary text-on-primary shadow-2xs' : 'text-muted hover:text-ink'
                }`}
                title={t('Fokus Pilih & Gerakkan Karakter', 'Focus Character & Movement')}
              >
                <Users size={10} aria-hidden="true" />
                <span className="hidden md:inline">{t('Karakter', 'Cast')}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={dockTab === 'tools'}
                onClick={() => setDockTab('tools')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-display font-bold transition-colors flex items-center gap-1 ${
                  dockTab === 'tools' ? 'bg-primary text-on-primary shadow-2xs' : 'text-muted hover:text-ink'
                }`}
                title={t('Fokus Alat Kebun Interaktif', 'Focus Garden Tools')}
              >
                <Wrench size={10} aria-hidden="true" />
                <span className="hidden md:inline">{t('Alat', 'Tools')}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onToggleCollapse}
              className="btn btn-ghost h-6 min-h-6 w-6 p-0 rounded-lg text-muted hover:text-ink"
              title={t('Sembunyikan Panel (Tampilan Penuh)', 'Minimize Control Bar')}
              aria-label={t('Sembunyikan Panel', 'Minimize Control Bar')}
            >
              <EyeOff size={12} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Unified Single-Plane Command Deck (Zero Overlap!) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {(dockTab === 'all' || dockTab === 'character') && (
            <CharacterMoverDeck compact={dockTab === 'all'} />
          )}

          {dockTab === 'all' && <div className="dock-divider h-7 hidden lg:block" aria-hidden="true" />}

          {(dockTab === 'all' || dockTab === 'tools') && (
            <FarmToolbelt compact={dockTab === 'all'} />
          )}
        </div>
      </div>
    </div>
  );
};

