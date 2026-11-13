# Business Requirements Document (BRD)
## Project: EduKidz – Interactive 3D & 2D Educational Storytelling Platform

---

### Document Control
- **Project Name:** EduKidz Interactive Storytelling
- **Target Audience:** Children (Ages 3–10), Parents, Guardians, Early-Stage Educators
- **Document Version:** 1.0.0
- **Status:** Approved / Architecture Ready
- **Location:** `docs/BRD.md`

---

## 1. Executive Summary

**EduKidz** is a next-generation web-based storytelling platform that bridges interactive play, cognitive learning, and bedtime routines through engaging 3D scenes (powered by Three.js / WebGL) and handcrafted 2D illustrations. 

Unlike traditional static e-books or passive video streaming platforms (YouTube, Netflix Kids), EduKidz delivers an active, sensory-appropriate digital experience tailored to three distinct childhood moments:
1. **Study Mode:** Fostering literacy, vocabulary, phonics, and comprehension through interactive hotspots and gamified milestones.
2. **Sleeping Mode:** Supporting pediatric sleep hygiene with warm lighting, soothing audio, zero dopamine-triggering mechanics, and automatic sleep timers.
3. **Playing Mode:** Encouraging spatial reasoning, creativity, and tactile exploration through interactive 3D miniature worlds and character mini-games.

Built purely for modern web browsers with zero installation requirements, EduKidz provides instant cross-platform accessibility on mobile phones, tablets, Chromebooks, and desktop computers.

---

## 2. Problem Statement & Market Opportunity

### 2.1 The Problem
1. **Passive Screen Fatigue:** Most digital content for kids consists of rapid-cut, hyper-stimulating passive videos (e.g., short-form media) that diminish attention spans and disrupt emotional regulation.
2. **Bedtime Screen Dilemma:** Traditional digital apps keep children alert and awake with flashing animations, blue-light-heavy UI, and reward loops right before sleep.
3. **App Store Friction:** Native app stores require 500MB+ downloads, in-app purchase popups, and updates that frustrate parents and block quick classroom usage.
4. **Lack of Adaptive Modes:** Existing digital reading apps treat every reading session identically, ignoring whether the child is actively studying at 10:00 AM or trying to fall asleep at 8:30 PM.

### 2.2 Market Opportunity
- **EdTech for Early Childhood:** The global digital kids' content and early education market is expanding rapidly, with parents actively seeking screen-positive alternatives.
- **Web-First (Zero Friction):** By leveraging WebGL and modern Progressive Web Apps (PWA), EduKidz provides instant access via a single link or QR code, ideal for schools and bedtime routines.
- **Holistic Day-to-Night Ecosystem:** A single trusted platform that handles morning study, afternoon creative play, and evening bedtime wind-down.
- **Bilingual & Global Representation Gap:** Most mainstream EdTech products feature monocultural characters and lack high-quality bilingual English-Indonesian storytelling with respectful depictions of global diversity (including hijab, modest wear, and casual attire) and interfaith harmony.

---

## 3. Product Vision & Value Proposition

### 3.1 Vision
To transform screen time into a healthy, imaginative, and developmentally enriching experience through interactive storytelling that adapts to a child's circadian rhythm and learning pace, while fostering empathy, global citizenship, and interfaith harmony.

### 3.2 Value Propositions

| Stakeholder | Key Value Proposition |
| :--- | :--- |
| **Children (Ages 3–10)** | Immersive story worlds they can touch, rotate, and explore; relatable characters from global backgrounds wearing clothes like theirs (hoodies, sneakers, hijabs); comforting bedtime stories that feel like magic lullabies. |
| **Parents & Guardians** | Guilt-free screen time; scientifically conscious bedtime routines; zero intrusive ads; COPPA/GDPR-K privacy safety; values of kindness, tolerance, and bilingual literacy (English & Indonesian). |
| **Educators & Schools** | Frictionless web access on school Chromebooks/iPads; phonics & vocabulary highlighting; comprehensive companion **Series Docs** with pedagogical lesson plans and interfaith empathy discussions. |


---

## 4. The Three Core Story Modalities

```
                        ┌────────────────────────────────────────┐
                        │          EduKidz Core Engine           │
                        └───────────────────┬────────────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           ▼                                ▼                                ▼
  🎓 STUDY MODE                     🌙 SLEEPING MODE                  🎮 PLAYING MODE
  - Phonetic Word Highlighting      - Circadian Warm Dimming          - Interactive 3D Pop-up
  - Vocabulary Flashcards           - Soothing ASMR / Lullabies       - Tap-to-React Characters
  - Comprehension Quizzes           - Non-Stimulating Pacing          - Hidden Collectibles
  - Fact-Finding Hotspots           - Auto-Fade Sleep Timer           - Sandbox Mini-Games
```

### 4.1 🎓 Study Mode (Cognitive & Literacy Development)
- **Primary Goal:** Improve reading fluency, vocabulary retention, and critical thinking.
- **Time of Day:** Morning & Afternoon.
- **Experience:**
  - Synchronized word-by-word karaoke text highlighting.
  - Interactive clickable "Knowledge Hotspots" (e.g., tap on an oak tree in the 3D scene to learn how photosynthesis works or why squirrels store acorns).
  - Micro-quizzes at the end of story chapters with positive reinforcement (stars, badges).
  - Multilingual / Bilingual audio toggle (e.g., English, Spanish, Indonesian).

### 4.2 🌙 Sleeping Mode (Sleep Hygiene & Wind-Down)
- **Primary Goal:** Calm the nervous system, lower heart rate, and gently guide the child into restful sleep.
- **Time of Day:** Evening & Bedtime.
- **Experience:**
  - **Visuals:** Warm amber/twilight color palette, reduced contrast, zero flashing lights, slow gentle camera drift across the 3D diorama.
  - **Audio:** Whispering or warm, rhythmic narration accompanied by binaural sleep sounds, gentle rain, rustling leaves, or soft acoustic music.
  - **Sleep Timer:** Automatic volume and brightness fade-out (e.g., 10, 20, or 30 minutes), gracefully locking to a black sleep screen.
  - **Zero Gamification:** No popups, no point tallies, no dopamine cliffhangers.

### 4.3 🎮 Playing Mode (Imaginative & Tactile Exploration)
- **Primary Goal:** Spark curiosity, spatial cognition, and creative engagement.
- **Time of Day:** Free play, weekends, family bonding.
- **Experience:**
  - Full 3D diorama inspection with 360° touch rotation and zoom.
  - Physics-based interactive toys (e.g., tap an apple to make it fall and roll, wake up a sleeping dragon, tilt the tablet to make water ripple).
  - Secret Easter eggs and collectable story stickers.
  - Branching decision paths ("Should the bunny explore the crystal cave or the flower meadow?").

---

## 5. User Personas & Target Segments

### 5.1 Persona 1: Early Explorer (Ages 3–5)
- **Characteristics:** Pre-reader, highly visual, relies on audio narration, loves tapping on vibrant characters.
- **Need:** High visual responsiveness, simple big buttons, clear audio pronunciation, bedtime stories that comfort them in the dark.

### 5.2 Persona 2: Inquisitive Reader (Ages 6–8)
- **Characteristics:** Developing reader, curious about science and adventure, loves completing tasks.
- **Need:** Word-highlighting for reading practice, 3D interactive discovery, collectible badges, choice-driven narratives.

### 5.3 Persona 3: Mindful Parent (Sarah, 34)
- **Characteristics:** Busy professional, concerned about excessive YouTube brainrot and blue-light exposure before bed.
- **Need:** Fast web loading (no 2GB app download), guaranteed ad-free and safe environment, built-in bedtime sleep timer.

### 5.4 Persona 4: Early Grade Educator (Mark, 41)
- **Characteristics:** Elementary school teacher with 25 students using diverse school laptops and tablets.
- **Need:** Instant browser-based launch without student logins, interactive comprehension check-ins, curriculum-friendly moral themes.

---

## 6. Business Model & Monetization Strategy

| Stream | Description | Pricing Model |
| :--- | :--- | :--- |
| **Freemium Tier** | 3 full featured stories (1 Study, 1 Sleeping, 1 Playing) with full 3D/2D toggle and narration. | 100% Free forever (Lead generation) |
| **EduKidz Club (Subscription)** | Unlimited access to growing library of 50+ 3D/2D interactive stories, personalized voice synthesis, offline PWA access, parent reading analytics. | $4.99 / month or $39.99 / year |
| **Classroom / School Pass** | Multi-seat license for preschools and elementary classes with teacher dashboard and reading comprehension reports. | $99.00 / classroom / year |
| **A La Carte Story Packs** | Themed collections (e.g., "Deep Space Odyssey", "Ancient Rainforest Bedtime"). | $1.99 – $2.99 one-time unlock |

---

## 7. Compliance, Safety, and Privacy

1. **COPPA Compliance (Children’s Online Privacy Protection Act):**
   - Strictly zero collection of Personally Identifiable Information (PII) from children under 13.
   - No open chat rooms, user-generated comments, or social sharing within child view.
   - Any account registration or payment requires a "Grown-Up Gate" (parental math challenge or PIN).
2. **Zero Third-Party Advertising:**
   - No tracking pixels, programmatic ads, or behavioral retargeting cookies.
3. **Accessibility (WCAG 2.2 AA for Education):**
   - High contrast modes, adjustable text sizing, dyslexia-friendly fonts (e.g., OpenDyslexic), and full screen-reader semantic markup.

---

## 8. Success Metrics & Key Performance Indicators (KPIs)

- **Engagement Rate:** > 85% completion rate of started stories in Study Mode.
- **Bedtime Efficacy:** > 75% of Sleeping Mode sessions reach the end of the sleep timer without user interruption.
- **Performance:** Initial load time under 2.5 seconds on 4G mobile; sustained 60 FPS in 3D WebGL mode.
- **Retention:** Week-4 parent retention > 40% for bedtime routine users.
- **Offline Reliability:** 100% playable in PWA offline mode once cached.
