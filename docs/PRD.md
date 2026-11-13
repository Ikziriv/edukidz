# Product Requirements Document (PRD)
## Project: EduKidz – Interactive 3D & 2D Educational Storytelling Platform

---

### Document Control
- **Document Version:** 1.0.0
- **Product Owner:** EduKidz Product & Design Team
- **Status:** Approved for Implementation
- **Location:** `docs/PRD.md`

---

## 1. Product Overview & Goals

### 1.1 Purpose
EduKidz is a cross-platform web application providing immersive, audio-narrated children's stories with dual-mode visuals (**Real-time 3D via Three.js** and **Layered 2D Illustrated Book**). The application serves three distinct modes of engagement: **Study**, **Sleeping**, and **Playing**.

### 1.2 Core Objectives
1. **Instant Web Access:** Zero app-store downloads, loads in under 2.5s on mobile/tablet browsers.
2. **Circadian Adaptability:** One-click transition between energetic play, structured learning, and calming bedtime routines.
3. **Dual Visual Engine:** Seamless toggle between rich interactive 3D WebGL scenes and lightweight 2D illustrations with zero audio desynchronization.
4. **Kid-First UX:** Intuitive for children as young as 3 years old with zero reading skills required to navigate and start stories.

---

## 2. User Personas & Core Journeys

```
               ┌────────────────────────────────────────────────────────┐
               │                     Home Screen                        │
               │  - Choose Mode: [Study] [Sleep] [Play]                 │
               │  - Browse Stories / Resume Last Read                   │
               └───────────┬────────────────────────────────┬───────────┘
                           │                                │
            ┌──────────────▼─────────────┐    ┌─────────────▼─────────────┐
            │   Reading View (3D / 2D)   │    │     Parental Portal       │
            │  - Scene Canvas & Controls │    │  - PIN / Math Challenge   │
            │  - Multitrack Audio Bar    │    │  - Screen Time Timer      │
            │  - Read-Along Text Bar     │    │  - Reading History        │
            └────────────────────────────┘    └───────────────────────────┘
```

### 2.1 Journey A: Bedtime Wind-Down (Sleeping Mode)
1. Parent or child opens the web app at 8:00 PM and selects **Sleeping Mode** (or the app suggests it based on local device time).
2. The UI smoothly transitions to a cozy twilight theme (deep indigo, amber accents, star particles).
3. The child selects *"The Little Bear Who Counted the Stars"*.
4. Ambient background sounds (soft cricket chirps, distant rain) begin playing.
5. A soothing, slow-paced narrator begins telling the tale.
6. The 3D scene gently pans across a sleepy forest clearing with soft fireflies drifting across the trees.
7. The parent sets the **Sleep Timer** for 20 minutes.
8. At the 18-minute mark, the audio gently cross-fades down in volume, and the screen slowly dims to pure black, leaving only a gentle night-light clock.

### 2.2 Journey B: Morning Literacy Practicing (Study Mode)
1. Teacher or 7-year-old student selects **Study Mode**.
2. Story *"Oliver the Owl Explores the Solar System"* is launched in 3D Mode.
3. As the narrator speaks, each word in the caption box lights up in golden yellow (karaoke-style synchronization).
4. The student taps on Mars in the 3D space: an interactive pop-up card explains *"Mars is known as the Red Planet because of iron in its soil!"* with an audio pronunciation button.
5. At the end of the chapter, a 3-question mini-quiz appears (e.g., "Which planet is closest to the Sun?").
6. The student earns 3 glowing stars added to their sticker book.

### 2.3 Journey C: Creative Sandbox Exploration (Playing Mode)
1. 5-year-old child opens **Playing Mode** on a tablet.
2. The child selects *"The Magical Toy Workshop"*.
3. The child uses one finger to rotate the 3D toy shop 360 degrees and pinch-to-zoom into the workbench.
4. Tapping on a wooden clockwork robot makes it dance, wind its spring, and play a cheerful sound.
5. Tapping on the window changes the weather outside from sunny to snowy.
6. The child can toggle between **3D Play** and **2D Illustrated Page** with a single bouncy button.

---

## 3. Detailed Functional Requirements

### 3.1 Dual Visual Rendering System

| Feature | 3D WebGL Mode (Three.js / React Three Fiber) | 2D Illustrated Mode (Canvas / Layered SVG/WebP) |
| :--- | :--- | :--- |
| **Renderer** | WebGL2 (with WebGL1 fallback), Three.js canvas. | Modern HTML5 Canvas / CSS Parallax. |
| **Aesthetics** | Low-poly, pastel toon-shaded, soft ambient lighting, gentle depth of field. | Storybook illustration style, multi-plane depth layering. |
| **Interactivity** | Orbit tilt, touch raycasting on 3D meshes, particle effects. | Layered parallax on scroll/drag, clickable 2D hot zones. |
| **Performance** | Target 60 FPS, compressed GLB assets via Draco/KTX2. | Instant load (< 100KB per scene), zero GPU strain. |
| **Toggle Action** | Floating floating pill button `[ 3D ⇄ 2D ]` seamlessly switches view without restarting audio. |

### 3.2 The Three Modes Specification

#### 3.2.1 🎓 Study Mode Specifications
- **Karaoke Text Sync:** Text words highlight synchronously with narrator audio using time-coded word offsets (`start_time`, `end_time` in milliseconds).
- **Phonics & Vocabulary Cards:** Highlighting difficult or tier-2 vocabulary words in bold blue. Tapping opens a kid-friendly definition card with phonetic pronunciation (`[FO-toh-SIN-thuh-sis]`) and an illustrative icon.
- **Knowledge Hotspots:** 3D glowing pulses or 2D bouncing pins placed on educational elements. Clicking them triggers an educational dialogue prompt.
- **Comprehension Micro-Quizzes:**
  - 2 to 3 multiple-choice visual questions per story chapter.
  - Positive feedback audio ("Great job!", "Let's try that again!").
  - Star awards saved to local browser storage.
- **Bilingual Switcher:** Instant live toggle between English (EN) and Indonesian (ID) with preserved audio timestamp and reading progress.

#### 3.2.2 🌙 Sleeping Mode Specifications
- **Sleep Sanctuary Visual Theme:**
  - Automatic color temperature shift to warm amber/twilight (4000K down to 2200K equivalent filter).
  - Minimal motion: camera speed reduced by 70%, no rapid camera rotations or sudden particle bursts.
  - Starry night sky or gentle floating dream-clouds background.
- **Sleep Audio Architecture:**
  - Multi-track mixing: Narrator (whisper or calm cadence) + Ambient Soundscape (rain, ocean waves, white noise, soft harp).
  - Ambient volume slider independent of voice volume.
- **Smart Sleep Timer:**
  - Presets: 10 min, 20 min, 30 min, 45 min, or "End of Story".
  - Exponential volume decrescendo over the last 3 minutes of the timer.
  - Progressive screen brightness dimming down to 0% (OLED-friendly black screen).
  - Accidental tap prevention (long-press 2 seconds to wake screen).

#### 3.2.3 🎮 Playing Mode Specifications
- **Sandbox 3D Diorama:**
  - Full touch-to-orbit camera control with damped smoothing (preventing motion sickness).
  - Restricted pitch and zoom limits so kids never lose the scene in infinite space.
- **Interactive Character Rigging:**
  - Meshes with pre-baked animations (Idle, Cheer, Jump, Spin, Sleep).
  - Tapping a character triggers a randomized playful animation and sound effect.
- **Collectible Hidden Star Quest:**
  - Each scene contains 3 hidden glowing stars tucked behind rocks, trees, or windows.
  - Finding all stars unlocks a virtual story sticker.
- **Branching Decision Points:**
  - At key narrative moments, 2 large visual choice cards appear (e.g., "Take the Secret Forest Path" vs "Build a River Raft").

### 3.3 Series Hierarchy & Companion "Docs Series"
1. **Series Grouping:** Stories are organized into thematic **Series** (3–6 episodes per series) exploring coherent story arcs and developmental themes.
2. **Mandatory Companion Docs Series:** Every published Series MUST include a companion `series_docs/` dossier conforming to `docs/templates/SERIES_DOCS_TEMPLATE.md` containing:
   - Learning domain & pedagogical objectives (STEM, Social-Emotional Learning).
   - Character profiles, ethnic backgrounds, and clothing design rationale.
   - Interfaith harmony matrix and universal moral themes.
   - Bilingual phonics and vocabulary glossary (EN ⇄ ID).
   - Parent & Educator conversation guide with discussion prompts.

### 3.4 Bilingual Engine (English & Indonesian)
1. **First-Class Bilingualism:** Every story supports native English (EN) and Indonesian (ID) text, narration, phonics, and knowledge cards.
2. **Karaoke Synchronization:** Sub-50ms synchronized karaoke word highlights for both English and Indonesian, with independent word-marker timestamps per audio track.
3. **Seamless Language Toggle:** Child or parent can switch languages on the fly (`[ 🇮🇩 ID ⇄ 🇬🇧 EN ]`) without restarting the scene or resetting audio position.

### 3.5 Global Character Diversity, Inclusive Clothing & Religious Tolerance
1. **Global Ethnic Representation:** Stories feature characters representing Southeast Asia, East Asia, South Asia, the Middle East, Africa, the Americas, and Europe with authentic, dignified visual portrayal.
2. **Inclusive Attire (Everyday Casual, Modern Hijab, Cultural Garments):**
   - Natural inclusion of modern casual clothes (hoodies, overalls, denim, sneakers) and modest attire including contemporary pastel/athletic hijabs for female characters.
   - Respectful inclusion of traditional garments (e.g., Batik, Hanbok, Kurta) during cultural moments.
   - Girls wearing hijab are depicted with active agency (leading adventures, sports, science exploration).
3. **Religious & Cultural Tolerance:**
   - Foster mutual respect, empathy, and friendship across faiths (Islam, Christianity, Catholicism, Hinduism, Buddhism, Confucianism, and global traditions).
   - Emphasize universal virtues: kindness, honesty, sharing, helping neighbors, and celebrating each other's joyful holidays without theological dogmatism.


---

## 4. Audio Engine Specifications

- **Multichannel Web Audio Mixer:**
  1. **Narrator Channel:** Clean speech audio, normalized to -16 LUFS.
  2. **Music Channel:** Melodic score, looped or scene-transitioned, normalized to -24 LUFS.
  3. **Ambience Channel:** Continuous environmental sounds (wind, water, nocturnal nature).
  4. **SFX Channel:** Interactive triggers (bell ding, sparkle, animal sounds).
- **Audio Controls:**
  - Play / Pause (Big tactile kid-friendly button).
  - Playback Speed: 0.75x (slower for early readers/bedtime), 1.0x (standard), 1.25x.
  - Subtitle / Caption toggle on/off.
  - Individual volume controls inside Parent Portal.

---

## 5. Parent & Safety Features (Grown-Up Gate)

- **Access Protection:** Any entry into Settings, Account, External Links, or Monetization requires passing a parental barrier:
  - Example: *"For Grown-Ups: Slide to calculate 8 × 4 = [32]"* or 4-digit customizable PIN.
- **Screen Time Manager:**
  - Configurable daily limit (e.g., 30 minutes).
  - Friendly popup when time expires: *"Time for a rest! Let's play again tomorrow!"*
- **Offline Mode Indicator:**
  - Visual badge indicating whether current story is downloaded for offline road trips / bedroom use without Wi-Fi.

---

## 6. Series & Story Schema Structure (Data Model Overview)

Every story belongs to a **Series** and includes a linked **Docs Series** file alongside bilingual (EN/ID) narrative tracks and diverse character metadata:

```json
{
  "seriesId": "series-global-friends",
  "seriesTitle": {
    "en": "The Global Friendship Garden",
    "id": "Petualangan Taman Sahabat Dunia"
  },
  "seriesDocsUrl": "series/series-global-friends/DOCS.md",
  "targetAge": "6-8",
  "culturalThemes": ["interfaith-harmony", "mutual-respect", "gotong-royong"],
  "characters": [
    {
      "id": "aisyah",
      "name": "Aisyah",
      "ethnicity": "Indonesian / Southeast Asian",
      "attire": {
        "headwear": "pastel-mint hijab",
        "clothing": "casual denim jacket & joggers",
        "styleCategory": "modern-modest-casual"
      },
      "modelGlb": "models/characters/aisyah_hijab.glb"
    },
    {
      "id": "mateo",
      "name": "Mateo",
      "ethnicity": "Brazilian / Latin American",
      "attire": {
        "clothing": "ochre hoodie & jeans",
        "styleCategory": "modern-casual"
      },
      "modelGlb": "models/characters/mateo_hoodie.glb"
    }
  ],
  "story": {
    "id": "garden-of-many-seeds",
    "episodeNumber": 2,
    "title": {
      "en": "The Garden of Many Seeds",
      "id": "Kebun Aneka Benih"
    },
    "supportedModes": ["study", "sleeping", "playing"],
    "defaultMode": "study",
    "audioTracks": {
      "narration": {
        "en": "audio/en/garden_narrator.mp3",
        "id": "audio/id/garden_narrator.mp3"
      },
      "ambience": "audio/ambient_garden_birds.mp3",
      "music": "audio/music_gentle_acoustic.mp3"
    },
    "scenes": [
      {
        "id": "scene-1",
        "chapterTitle": {
          "en": "Aisyah's Little Seedling",
          "id": "Bibit Kecil Aisyah"
        },
        "3dAsset": "models/scenes/community_garden.glb",
        "2dIllustration": "images/scenes/community_garden.webp",
        "camera": {
          "position": [0, 2, 5],
          "target": [0, 1, 0],
          "autoPan": true,
          "panSpeed": 0.05
        },
        "interactables": [
          {
            "meshName": "AisyahCharacter",
            "action": "playAnimation",
            "animationClip": "WaveAndSmile",
            "soundEffect": "audio/sfx/chime.mp3"
          }
        ],
        "dialogue": {
          "en": {
            "text": "Aisyah adjusted her mint-green hijab, knelt by the soil, and smiled at Mateo.",
            "audioStartMs": 0,
            "audioEndMs": 5800,
            "words": [
              { "word": "Aisyah", "start": 0, "end": 600 },
              { "word": "adjusted", "start": 610, "end": 1150 },
              { "word": "her", "start": 1160, "end": 1350 },
              { "word": "mint-green", "start": 1360, "end": 2100 },
              { "word": "hijab", "start": 2110, "end": 2600, "isVocab": true, "def": "A comfortable headscarf worn by Muslim girls and women." }
            ]
          },
          "id": {
            "text": "Aisyah merapikan jilbab hijaunya yang nyaman, lalu tersenyum hangat kepada Mateo.",
            "audioStartMs": 0,
            "audioEndMs": 5600,
            "words": [
              { "word": "Aisyah", "start": 0, "end": 620 },
              { "word": "merapikan", "start": 630, "end": 1280 },
              { "word": "jilbab", "start": 1290, "end": 1800, "isVocab": true, "def": "Kain penutup kepala yang santun dan nyaman bagi perempuan Muslimah." }
            ]
          }
        }
      }
    ]
  }
}
```


---

## 7. Non-Functional Requirements

1. **Responsiveness:** Fluid scaling across 320px (compact smartphone) up to 2560px (large 4K desktop display).
2. **Touch Targets:** Minimum 48px × 48px for all interactive buttons to accommodate developing fine-motor skills.
3. **Load Performance:**
   - First Contentful Paint (FCP) < 1.2s.
   - Initial bundle size < 250KB gzipped (excluding 3D models).
   - 3D models progressively streamed and compressed via Draco (< 2.5MB per scene).
4. **Offline Capability:** Progressive Web App (PWA) with Service Worker caching of visited stories.
