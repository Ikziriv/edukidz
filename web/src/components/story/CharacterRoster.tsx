import React, { useState } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import type { CharacterDefinition } from '../../types/story';
import { Users, Sparkles, ChevronDown, ChevronUp, Volume2, Heart, Globe2, Backpack } from 'lucide-react';
import { soundEngine } from '../../services/audioEngine';
import { speak, useT } from '../../lib/i18n';

/**
 * Studio-crafted SVG 3D-style bust portrait matching the sculpted clay/vinyl reference bust:
 * - Hijab characters: Contoured open-face hijab hood, subtle inner hairline, 3 stacked neck folds,
 *   tailored blazer with V-lapels & 2 buttons, glossy eyes with catchlights, and rosy cheeks.
 * - Non-hijab characters: Baseball cap or textured afro puffs, spectacles (Kenji), and collared top.
 */
const CharacterBustSVG: React.FC<{ char: CharacterDefinition }> = ({ char }) => {
  const skin = char.skinTone ?? '#e5a87e';
  const isHijab = char.id === 'aisyah' && !!char.usesHijab;
  const hijabPrimary = '#dc2626';
  const hijabShadow = '#991b1b';
  const blazerColor =
    char.id === 'aisyah'
      ? '#1e3a8a'
      : char.id === 'sofia'
      ? '#0f766e'
      : char.id === 'mei'
      ? '#1d4ed8'
      : char.accentColor;

  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id={`skin-${char.id}`} cx="45%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="65%" stopColor={skin} stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id={`hijab-${char.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hijabPrimary} />
          <stop offset="100%" stopColor={hijabShadow} />
        </linearGradient>
      </defs>

      {/* Soft Studio Backdrop Circle */}
      <rect width="64" height="64" rx="16" fill="#f8f1e5" />

      {/* Sofia's Back Twin Nordic Braids */}
      {char.id === 'sofia' && (
        <g fill="#a16207">
          <circle cx="17" cy="36" r="4.2" />
          <circle cx="17" cy="41.5" r="3.8" />
          <circle cx="17" cy="46.5" r="3.3" />
          <rect x="14.5" y="48.5" width="5" height="2.4" rx="1.2" fill="#c4b5fd" />
          <circle cx="47" cy="36" r="4.2" />
          <circle cx="47" cy="41.5" r="3.8" />
          <circle cx="47" cy="46.5" r="3.3" />
          <rect x="44.5" y="48.5" width="5" height="2.4" rx="1.2" fill="#c4b5fd" />
        </g>
      )}

      {/* 1. Tailored Shoulders / Blazer Bust with V-Neck Lapels & Two Front Buttons */}
      <path
        d="M10 62 C11 48, 20 44, 32 44 C44 44, 53 48, 54 62 Z"
        fill={blazerColor}
      />
      {/* Cream Inner Shirt V-Triangle */}
      <polygon points="28,45 36,45 32,54" fill="#fffbeb" />
      {/* Sculpted Left & Right Blazer Lapels */}
      <polygon points="24,45 28,45 32,54 27,55" fill="#1e293b" opacity="0.28" />
      <polygon points="40,45 36,45 32,54 37,55" fill="#1e293b" opacity="0.28" />
      {/* Two Front Buttons */}
      <circle cx="32" cy="56.5" r="1.3" fill="#ffffff" opacity="0.65" />
      <circle cx="32" cy="60.2" r="1.3" fill="#ffffff" opacity="0.65" />

      {isHijab ? (
        <>
          {/* 2A. Aisyah's Outer Sculpted Hijab Hood Canopy */}
          <path
            d="M14 29 C14 13, 22 8, 32 8 C42 8, 50 13, 50 29 C50 38, 46 44, 32 44 C18 44, 14 38, 14 29 Z"
            fill={`url(#hijab-${char.id})`}
          />
          {/* Secondary Outer Hood Crease Highlight */}
          <path
            d="M16.5 28 C16.5 15, 23 10.5, 32 10.5 C41 10.5, 47.5 15, 47.5 28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.28"
          />

          {/* 3A. Unoccluded Sculpted Face Oval */}
          <ellipse cx="32" cy="27.5" rx="12.5" ry="13.2" fill={skin} />
          <ellipse cx="32" cy="27.5" rx="12.5" ry="13.2" fill={`url(#skin-${char.id})`} />

          {/* Soft White Inner Under-Scarf (Ciput) Arch at Top of Forehead */}
          <path
            d="M22.5 17.5 Q32 13.5 41.5 17.5"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Contoured Face-Framing Hijab Rim */}
          <ellipse
            cx="32"
            cy="27.5"
            rx="13.2"
            ry="13.8"
            fill="none"
            stroke={hijabPrimary}
            strokeWidth="2.4"
          />

          {/* 4A. Three Stacked Draped Neck Folds Under Chin */}
          <path
            d="M16 44.5 Q32 51.5 48 44.5 Q45 49.5 32 50.2 Q19 49.5 16 44.5 Z"
            fill={hijabShadow}
          />
          <path
            d="M17 41.2 Q32 47.8 47 41.2 Q45 45.8 32 46.5 Q19 45.8 17 41.2 Z"
            fill={hijabPrimary}
          />
          <path
            d="M19 38.2 Q32 43.8 45 38.2 Q43 42.2 32 42.8 Q21 42.2 19 38.2 Z"
            fill={hijabPrimary}
            stroke={hijabShadow}
            strokeWidth="0.7"
          />

          {/* Aisyah's Signature Emerald-Gold Pin */}
          <circle cx="42" cy="42" r="2.5" fill="#fbbf24" />
          <circle cx="42" cy="42" r="1.5" fill="#10b981" />
        </>
      ) : (
        <>
          {/* 2B. Non-Hijab Hair / Twin Buns / Braids / Cap / Afro Puffs Silhouette */}
          {char.id === 'amara' ? (
            <>
              <circle cx="17" cy="18" r="7.5" fill="#3e1f0d" />
              <circle cx="47" cy="18" r="7.5" fill="#3e1f0d" />
              <circle cx="32" cy="14" r="7" fill="#3e1f0d" />
              <circle cx="21" cy="21" r="2.2" fill="#ec4899" />
              <circle cx="43" cy="21" r="2.2" fill="#ec4899" />
            </>
          ) : char.id === 'mei' ? (
            <>
              {/* Mei-Ling's Twin Silk-Ribbon Buns */}
              <circle cx="16.5" cy="16.5" r="6.5" fill="#18181b" />
              <circle cx="47.5" cy="16.5" r="6.5" fill="#18181b" />
              <circle cx="16.5" cy="16.5" r="4.8" fill="none" stroke="#fb7185" strokeWidth="1.8" />
              <circle cx="47.5" cy="16.5" r="4.8" fill="none" stroke="#fb7185" strokeWidth="1.8" />
              <path d="M17 26 C17 13, 47 13, 47 26 Z" fill="#18181b" />
              {/* Golden Plum Blossom Pin */}
              <circle cx="20.5" cy="19.5" r="2.6" fill="#fff1f2" />
              <circle cx="20.5" cy="19.5" r="1.4" fill="#fbbf24" />
            </>
          ) : char.id === 'sofia' ? (
            <path d="M17 26 C17 13, 47 13, 47 26 Z" fill="#a16207" />
          ) : (
            <path d="M17 26 C17 14, 47 14, 47 26 Z" fill="#27170c" />
          )}

          {/* Neck & Ears */}
          <rect x="28" y="38" width="8" height="8" rx="3" fill={skin} />
          <circle cx="18.5" cy="28.5" r="2.8" fill={skin} />
          <circle cx="45.5" cy="28.5" r="2.8" fill={skin} />

          {/* Face Sphere */}
          <ellipse cx="32" cy="28" rx="13" ry="13.2" fill={skin} />
          <ellipse cx="32" cy="28" rx="13" ry="13.2" fill={`url(#skin-${char.id})`} />

          {/* Sofia's Parted Bangs & Pastel-Lavender Headband with Pearl Pin */}
          {char.id === 'sofia' && (
            <>
              <path d="M19 21 Q25 14 32 18 Q39 14 45 21 Q39 17 32 19.5 Q25 17 19 21 Z" fill="#a16207" />
              <path
                d="M18.5 23 C20 12.5, 44 12.5, 45.5 23"
                fill="none"
                stroke="#c4b5fd"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="42" cy="17.5" r="2.2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
            </>
          )}

          {/* Mei-Ling's Curved East Asian Fringe Bangs */}
          {char.id === 'mei' && (
            <path d="M20 20.5 Q32 13.5 44 20.5 Q32 18.5 20 20.5 Z" fill="#18181b" />
          )}

          {/* Sunny Yellow Explorer Cap for Mateo & Kenji */}
          {(char.id === 'mateo' || char.id === 'kenji') && (
            <>
              <path d="M18 21 C18 11, 46 11, 46 21 Z" fill="#facc15" />
              <path d="M16 20 Q32 16 49 20.5 Q32 22.5 16 20 Z" fill="#eab308" />
            </>
          )}
        </>
      )}

      {/* 5. Expressive Facial Features (Shared Smooth Studio Style) */}
      {/* Arched Eyebrows */}
      <path d="M23.5 22.5 Q26.5 20.8 29 22.2" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 22.2 Q37.5 20.8 40.5 22.5" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />

      {/* Large Glossy Pixar Eyes (Sclera + Iris + Pupil + Specular Catchlight) */}
      <ellipse cx="26.5" cy="26.8" rx="3.1" ry="3.4" fill="#ffffff" />
      <ellipse cx="37.5" cy="26.8" rx="3.1" ry="3.4" fill="#ffffff" />
      <circle cx="26.8" cy="27" r="2.1" fill="#27170c" />
      <circle cx="37.2" cy="27" r="2.1" fill="#27170c" />
      <circle cx="27.5" cy="26.1" r="0.85" fill="#ffffff" />
      <circle cx="37.9" cy="26.1" r="0.85" fill="#ffffff" />

      {/* Kenji's Round Spectacles */}
      {char.id === 'kenji' && (
        <g stroke="#451a03" strokeWidth="1.1" fill="none">
          <circle cx="26.5" cy="26.8" r="4.1" />
          <circle cx="37.5" cy="26.8" r="4.1" />
          <line x1="30.6" y1="26.8" x2="33.4" y2="26.8" />
        </g>
      )}

      {/* Rosy Blush Cheeks */}
      <ellipse cx="22.2" cy="31" rx="2.6" ry="1.6" fill="#f43f5e" opacity="0.32" />
      <ellipse cx="41.8" cy="31" rx="2.6" ry="1.6" fill="#f43f5e" opacity="0.32" />

      {/* Cute Sculpted Button Nose */}
      <ellipse cx="32" cy="29.8" rx="1.6" ry="1.2" fill="#000000" opacity="0.12" />

      {/* Warm Gentle Smile */}
      <path d="M28.8 33.8 Q32 36.2 35.2 33.8" fill="none" stroke="#881337" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const CharacterRoster: React.FC = () => {
  const currentSeries = useStoryStore((s) => s.currentSeries);
  const language = useStoryStore((s) => s.language);
  const selectedCharId = useStoryStore((s) => s.selectedCharacter);
  const selectCharacter = useStoryStore((s) => s.selectCharacter);
  const triggerCharacterAction = useStoryStore((s) => s.triggerCharacterAction);
  const bounceTarget = useStoryStore((s) => s.characterBounceTarget);
  const t = useT();

  const [isOpen, setIsOpen] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'asia' | 'europe'>('all');

  const handleSelectChar = (char: CharacterDefinition) => {
    soundEngine.playSFX('tap');
    selectCharacter(char.id as typeof selectedCharId);
    triggerCharacterAction(char.id);

    const greeting =
      language === 'id'
        ? `Halo, namaku ${char.name} dari ${char.ethnicBackground}. Aku memakai ${char.attire.headwear}.`
        : `Hello, I'm ${char.name} from ${char.ethnicBackground}. I am wearing a ${char.attire.headwear}.`;
    speak(greeting, language);
  };

  const filteredCharacters = currentSeries.characters.filter((char) => {
    if (filterMode === 'asia') return char.regionTag === 'Southeast Asia' || char.regionTag === 'East Asia';
    if (filterMode === 'europe') return char.regionTag === 'Europe';
    return true;
  });

  return (
    <section aria-label={t('Daftar Karakter', 'Character Roster')} className="w-full mb-4">
      <div className="card p-3.5 md:p-5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playSFX('tap');
              setIsOpen(!isOpen);
            }}
            aria-expanded={isOpen}
            className="flex items-center justify-between sm:justify-start gap-3 text-left cursor-pointer group flex-1"
          >
            <span className="w-10 h-10 rounded-2xl bg-primary-soft text-primary flex items-center justify-center shrink-0 shadow-sm">
              <Users size={20} aria-hidden="true" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-sm md:text-base text-ink group-hover:text-primary transition-colors">
                  {t('Sahabat Dunia 3D, 2D & Studio Video', 'Global Friends Ensemble · 3D, 2D & Video')}
                </h3>
                <span className="chip chip-primary text-[11px] py-0.5 px-2.5 font-display">
                  {currentSeries.characters.length} {t('Sahabat 3D', '3D Avatars')}
                </span>
              </div>
              <p className="text-xs text-muted hidden sm:block">
                {t(
                  '5 sahabat lintas budaya (Mateo, Sofia, Mei-Ling, Kenji, Amara). Ketuk untuk menyapa!',
                  '5 multicultural global friends (Mateo, Sofia, Mei-Ling, Kenji, Amara). Tap any friend to greet!'
                )}
              </p>
            </div>
          </button>

          {/* Filter Pills + Collapse Button */}
          <div className="flex flex-wrap items-center gap-1.5">
            {isOpen && (
              <div className="flex items-center gap-1 bg-sunken p-1 rounded-xl border border-line">
                {(
                  [
                    { id: 'all', label: { id: 'Semua (5)', en: 'All (5)' } },
                    { id: 'asia', label: { id: 'Asia (2)', en: 'Asia (2)' } },
                    { id: 'europe', label: { id: 'Eropa (1)', en: 'Europe (1)' } }
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playSFX('tap');
                      setFilterMode(tab.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-semibold transition-all cursor-pointer ${filterMode === tab.id
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-muted hover:text-ink'
                      }`}
                  >
                    {tab.label[language]}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                soundEngine.playSFX('tap');
                setIsOpen(!isOpen);
              }}
              className="btn btn-ghost h-9 min-h-9 px-2.5 rounded-xl text-xs"
            >
              <span className="hidden md:inline">{isOpen ? t('Tutup', 'Hide') : t('Buka', 'Show')}</span>
              {isOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Collapsible Grid */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-line animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredCharacters.map((char) => {
                const isSelected = selectedCharId === char.id;
                const isBouncing = bounceTarget === char.id;

                return (
                  <div
                    key={char.id}
                    onClick={() => handleSelectChar(char)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectChar(char)}
                    aria-pressed={isSelected}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected || isBouncing
                        ? 'bg-primary-soft/45 border-primary scale-[1.01] shadow-md ring-2 ring-primary/20'
                        : 'bg-surface border-line hover:border-primary/50 hover:bg-sunken/40'
                      }`}
                  >
                    <div>
                      {/* Character Header: Stylized 3D Portrait Badge + Name + Region */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Stylized Mini 3D Bust Portrait SVG */}
                          <div
                            className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md border-2 transition-transform duration-300 overflow-hidden"
                            style={{
                              borderColor: char.accentColor,
                              transform: isBouncing ? 'scale(1.1) rotate(3deg)' : 'scale(1)'
                            }}
                          >
                            <CharacterBustSVG char={char} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-display font-bold text-sm text-ink truncate leading-tight">
                                {char.name}
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-primary truncate block">
                              {char.role}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted mt-0.5">
                              <Globe2 size={10} className="text-primary shrink-0" aria-hidden="true" />
                              <span className="truncate">{char.ethnicBackground}</span>
                            </span>
                          </div>
                        </div>

                        {char.usesHijab && (
                          <span className="chip chip-primary text-[10px] px-2 py-0.5 min-h-6 shrink-0">
                            <Sparkles size={10} aria-hidden="true" />
                            <span>Hijab Style</span>
                          </span>
                        )}
                      </div>

                      {/* Bio and Personality */}
                      <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-3">
                        {char.personality}
                      </p>
                    </div>

                    {/* Metadata Badges: Headwear + Backpack + Speak */}
                    <div className="pt-2.5 border-t border-line/60 flex items-center justify-between gap-2 text-[10px]">
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sunken text-ink font-medium truncate max-w-[180px]">
                          <Sparkles size={10} className="text-accent shrink-0" aria-hidden="true" />
                          <span className="truncate">{char.attire.headwear}</span>
                        </span>
                        {char.attire.backpackColor && (
                          <span
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sunken text-muted font-medium"
                            title={t('Tas Sekolah 3D', '3D School Backpack')}
                          >
                            <Backpack size={10} style={{ color: char.attire.backpackColor }} aria-hidden="true" />
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectChar(char);
                        }}
                        className="btn btn-ghost btn-icon h-7 w-7 min-h-7 rounded-lg text-primary shrink-0"
                        title={t('Sapa karakter di 3D', 'Greet character in 3D')}
                        aria-label={`${t('Sapa', 'Say hello to')} ${char.name}`}
                      >
                        <Volume2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3.5 pt-2.5 text-center text-xs text-muted flex items-center justify-center gap-1.5">
              <Heart size={13} className="text-primary fill-primary" aria-hidden="true" />
              <span>
                {t(
                  'Representasi inklusif anak dunia: sahabat lintas budaya dari Amerika Latin, Eropa, Asia Timur, Asia Tenggara, dan Afrika.',
                  'Inclusive global childhood representation: multicultural friends from Latin America, Europe, East Asia, Southeast Asia, and Africa.'
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
