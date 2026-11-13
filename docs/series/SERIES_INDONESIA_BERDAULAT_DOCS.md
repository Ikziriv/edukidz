# Special Series Documentation: Seri Anak Indonesia Berdaulat
## Kurikulum Storytelling Tematik: Pancasila, Kemerdekaan, Kedaulatan, Produk Dalam Negeri, dan TKDN

---

### Series Control
- **Series ID:** `series-indonesia-berdaulat`
- **Series Title (ID):** *Petualangan Garuda Cilik: Merdeka, Berdaulat, dan Bangga Karya Nusantara*
- **Series Title (EN):** *Young Garuda Explorers: Sovereign, Free, and Proud of Indonesian Innovation*
- **Category:** Indonesian Civic Heritage, National Sovereignty & Economic Literacy
- **Target Age Coverage:** Tiered across 3 age brackets (Ages 3–5, 6–8, 9–10)
- **Document Version:** 1.0.0
- **Status:** Canonical Special Series Specification
- **Location:** `docs/series/SERIES_INDONESIA_BERDAULAT_DOCS.md`
- **Related Schema:** [docs/TDD.md](file:///c:/Users/user/Documents/GitHub/edukidz/docs/TDD.md#L200)

---

## 1. Age-Gap Analysis & Pedagogical Scaffolding

Children at different developmental stages process civic concepts, sovereignty, and economic logic differently. Abstract terms like *"Tingkat Komponen Dalam Negeri (TKDN)"* or *"Kedaulatan Fiskal"* must be translated into developmentally appropriate, concrete metaphors.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│             PEDAGOGICAL AGE-GAP MATRIX FOR INDONESIA STORIES                │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│ AGES 3–5            │ AGES 6–8                  │ AGES 9–10                 │
│ Early Explorers     │ Primary Explorers         │ Junior Thinkers & Makers  │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Focus: Sensory &    │ Focus: Fairness, Rules    │ Focus: Causal Systems,    │
│ Emotional Belonging │ & Gotong Royong           │ Sovereignty & Innovation  │
│                     │                           │                           │
│ • Suka buah lokal   │ • Musyawarah di kelas     │ • Makna Merdeka & Berdikari│
│ • Warna merah-putih │ • Membantu warung tetangga│ • Mengapa TKDN bikin kuat │
│ • Bernyanyi bersama │ • Kenal lambang Garuda    │ • Merakit karya dari bahan│
│ • Kasih sayang      │ • Bangga baju Batik       │   negeri sendiri          │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

### 1.1 Age Bracket 1: Ages 3–5 (Early Explorers / Usia Dini)
* **Cognitive Readiness:** Highly sensory, egocentric transitioning to associative play, concrete thinking. Cannot comprehend abstract percentages, macroeconomics, or legal structures.
* **Pedagogical Goal:** Foster warmth, affection, safety, and sensory love for Indonesia (*Rasa Cinta Tanah Air*).
* **Story Metaphor & Translation:**
  * **Pancasila:** Helping a friend who tripped (Sila 2), smiling and sharing snacks from different islands (Sila 3).
  * **Merdeka:** Feeling brave, joyful, and free to play without fear in our safe homeland.
  * **Produk Dalam Negeri:** Choosing sweet bananas from Pak Tani over fruit that has traveled on ships for weeks. *"Buah manis dari kebun kakek di desa!"*
  * **TKDN:** Playing with handmade wooden animal blocks carved by local artisans. Touching real bamboo and clay.

### 1.2 Age Bracket 2: Ages 6–8 (Primary Explorers / SD Kelas Rendah)
* **Cognitive Readiness:** Developing social rules, strong sense of fairness (*justice/keadilan*), early reading fluency, curiosity about where things come from.
* **Pedagogical Goal:** Understand community cooperation (*Gotong Royong*), why we respect differences (Bhinneka Tunggal Ika), and how supporting local makers strengthens our neighborhood.
* **Story Metaphor & Translation:**
  * **Pancasila:** Voting on playground games through friendly discussion (*Musyawarah Mufakat* - Sila 4); taking turns on the swings so everyone gets an equal share (Sila 5).
  * **Merdeka:** Independence means having the courage to express creative ideas and respect friends who think differently.
  * **Produk Dalam Negeri:** Visiting the traditional market (*Pasar Tradisional*) or craft center. Understanding that when we buy shoes or bags made in Cibaduyut or Solo, our local shoe-makers can send their own children to school.
  * **TKDN (Metaphor: "Kue Bolu Buatan Sendiri"):** When Ibu bakes a cake using cassava flour, coconut milk, and chocolate from our own plantation, we don't have to worry if foreign supply ships are delayed. We are self-reliant!

### 1.3 Age Bracket 3: Ages 9–10 (Junior Thinkers & Makers / SD Kelas Atas)
* **Cognitive Readiness:** Abstract reasoning, cause-and-effect systems, technological curiosity, national awareness, critical thinking.
* **Pedagogical Goal:** Understand national sovereignty (*Kedaulatan & Berdikari*), technological independence, and why domestic content percentage (TKDN) creates a resilient nation.
* **Story Metaphor & Translation:**
  * **Pancasila:** Systemic fairness and justice; standing up against bullying or discrimination; protecting national natural resources for the common good.
  * **Berdaulat (Sovereignty):** Not depending on other nations for essential lifelines (food, energy, medicines, technology). *"Bung Karno's principle of Berdiri di Atas Kaki Sendiri (Berdikari)"*.
  * **TKDN (Tingkat Komponen Dalam Negeri):**
    * **The Solar Electric Boat / Drone Challenge:** When students build a river cleaner boat, using 85% local materials (Kalimantan rattan framing, local copper wiring, Indonesian solar cells, domestic code) ensures:
      1. We can repair and upgrade it immediately without waiting months for overseas replacement parts.
      2. Indonesian engineers master the technology rather than just consuming it.
      3. Money circulates within the country, creating opportunities for our youth.

---

## 2. Special Category Schema: `IndonesiaStoryManifest`

To support these civic concepts in the EduKidz interactive platform, the JSON data contract extends the core engine with civic metadata, Pancasila tags, and TKDN interactive parameters:

```typescript
// src/types/indonesiaSeries.ts
import { Localized, StoryManifest, StoryMode } from './story';

export type PancasilaSilaNumber = 1 | 2 | 3 | 4 | 5;

export type CivicConceptTag = 
  | 'pancasila-harmoni'
  | 'merdeka-belajar'
  | 'berdaulat-berdikari'
  | 'bangga-buatan-indonesia'
  | 'tkdn-karya-lokal'
  | 'gotong-royong'
  | 'bhinneka-tunggal-ika';

export interface LocalComponentItem {
  componentName: Localized<string>;
  originRegion: string; // e.g., "Pekalongan, Jawa Tengah" or "Kupang, NTT"
  materialType: string;  // e.g., "Bambu Petung", "Kakao Alami", "Tenun Ikat"
  isLocallySourced: boolean;
  localContentPercentage: number; // 0 to 100
  educationalFunFact: Localized<string>;
}

export interface TkdnInteractiveData {
  productTitle: Localized<string>;
  totalCalculatedTkdn: number; // e.g. 85 (85%)
  formulaExplanation: Localized<string>;
  components: LocalComponentItem[];
  sovereigntyAdvantage: Localized<string>; // Why this makes the community self-reliant
}

export interface IndonesiaStoryManifest extends StoryManifest {
  category: 'indonesia-civic-heritage';
  indonesiaMetadata: {
    targetAgeTier: '3-5' | '6-8' | '9-10';
    primaryPancasilaSila: PancasilaSilaNumber[];
    civicConcepts: CivicConceptTag[];
    geographicalFocus: {
      province: string;
      island: 'Sumatra' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali-NusaTenggara' | 'Maluku-Papua';
      culturalLandmarks: string[];
    };
    tkdnData?: TkdnInteractiveData;
    discussionQuestions: {
      forFamily: Localized<string>[];
      forClassroom: Localized<string>[];
    };
  };
}
```

---

## 3. Character Roster: Tim Garuda Muda Nusantara

The characters represent the rich diversity of the Indonesian archipelago, blending traditional wisdom with modern curiosity and inclusive attire (including casual sneakers, hijab, and traditional woven accents):

```
                       ┌───────────────────────────────┐
                       │     TIM GARUDA NUSANTARA      │
                       └───────────────┬───────────────┘
          ┌─────────────────┬──────────┴──────────┬─────────────────┐
          ▼                 ▼                     ▼                 ▼
   Aisyah Rahma       Bagas Pratama          Putu Ayu         Yohanes 'Kaka'
   (Minangkabau/Jawa) (Dayak/Kalimantan)     (Bali)           (Papua)
   - Pastel Hijab     - Rompi Tenun Motif    - Kebaya Modern  - Noken Rajut
   - Ahli Botani &    - Inovator Robotika    - Pelukis &      - Pelari Cepat &
     Pangan Lokal       Bambu & Panel Surya    Budayawan Seni   Penyelamat Alam
```

1. **Aisyah Rahma (Ages 8, Minangkabau & Jawa background):**
   - **Attire:** Wears a breathable lilac hijab, casual oversized sweater with a Batik Mega Mendung pocket accent, canvas sneakers.
   - **Superpower:** Botanical curiosity and food sovereignty; champions planting local sorghum, cassava, and honey.
   - **Role:** Leads discussions with calm empathy and fairness (Sila 4 & Sila 2).

2. **Bagas Pratama (Ages 8, Dayak Kenyah & Banjar background):**
   - **Attire:** Dark green utility jacket, woven motif Dayak bracelet, cargo pants, running shoes.
   - **Superpower:** Mechanical tinkerer; builds bamboo irrigation wheels and mini solar trackers using locally sourced timber and copper.
   - **Role:** Explains TKDN in the sandbox play mode: *"Why import when Kalimantan ironwood and bamboo last 100 years?"*

3. **Ni Putu Ayu Candradewi (Ages 7, Balinese background):**
   - **Attire:** Playful floral modern dress with a yellow temple sash (*Selendang*) tied neatly, cheerful sandals.
   - **Superpower:** Visual storytelling, zero-waste crafts (*Tri Hita Karana* balance with nature).
   - **Role:** Creates packaging and artistic designs for neighborhood crafts using banana leaf and handmade paper.

4. **Yohanes "Kaka" Wandikbo (Ages 8, Papuan highlands background):**
   - **Attire:** Bright red hoodie with bird-of-paradise embroidery, jeans, carries a handwoven *Noken* across his shoulder.
   - **Superpower:** Geological and wildlife tracker, high-stamina runner, music and rhythm maker.
   - **Role:** Teaches friends how Noken is recognized by UNESCO and embodies 100% natural fiber TKDN.

---

## 4. Episode Roster by Age Group

### 4.1 Group A: Ages 3–5 (Usia Dini) – *"Negeriku Penuh Kasih"*
* **Episode 1A: *"Pohon Persahabatan di Halaman Aisyah"***
  * **Sila Focus:** Sila 1 (Rasa Syukur) & Sila 3 (Persatuan).
  * **Narrative:** Children water a rambutan tree together. They sing a gentle song about the sun and rain blessing Indonesia.
  * **Sleeping Mode:** Amber moonlight falls gently on the leaves; a soft flute lullaby (*Kicir-Kicir* slow acoustic) lulls children to sleep.
* **Episode 2A: *"Manisnya Buah Kebun Sendiri"***
  * **Civic Theme:** Produk Dalam Negeri (Pengenalan Rasa).
  * **Narrative:** Tasting local fruits (pisang ambon, manggis, pepaya). Children learn that farmers near our homes wake up at dawn to care for our food.

### 4.2 Group B: Ages 6–8 (SD Rendah) – *"Pasar Ceria & Gotong Royong"*
* **Episode 1B: *"Musyawarah Pondok Pohon"***
  * **Sila Focus:** Sila 4 (Musyawarah Mufakat) & Sila 5 (Keadilan Sosial).
  * **Narrative:** The team wants to paint their treehouse. Yohanes wants blue, Putu wants yellow, Bagas wants green. Instead of arguing or walking away, they hold a *Musyawarah*: blending colors to make a tropical green with golden sun motifs so everyone's idea is honored.
* **Episode 2B: *"Sepatu Baru Buatan Cibaduyut"***
  * **Civic Theme:** Bangga Buatan Indonesia.
  * **Narrative:** Bagas needs new shoes for sports. He visits Pak Anto's workshop in town. He sees the stitching, real leather, and passion. When his shoes endure a muddy hike with flying colors, he proudly tells his classmates: *"Ini buatan pengrajin negeri kita sendiri!"*

### 4.3 Group C: Ages 9–10 (SD Atas) – *"Indonesia Mandiri & Satelit Cilik Nusantara"*
* **Episode 1C: *"Misi Kincir Air Lembah Berdaulat"***
  * **Civic Theme:** Berdaulat & Berdikari (Kedaulatan Pangan dan Energi).
  * **Narrative:** A prolonged drought threatens the community garden. The imported electric pump breaks down, and the replacement motherboard will take 3 months to ship from across the ocean. Aisyah and Bagas lead the youth to construct a hydraulic ram pump using local PVC, bamboo, and river rocks (*Berdikari*). Water flows in 48 hours!
* **Episode 2C: *"Mengapa Kapal Penjaga Laut Kita Harus Ber-TKDN?"***
  * **Civic Theme:** Tingkat Komponen Dalam Negeri (TKDN) & Kedaulatan Bangsa.
  * **Narrative:** In their school innovation challenge, children build a solar-powered coastal patrol drone. They discover that by using 80% local components (Indonesian rubber, local aluminum alloy, domestic microcontrollers), their design is cheaper, repairable locally in hours, and creates jobs for their village technical school (*SMK*).

---

## 5. Interactive Mode Features for Indonesia Series

### 5.1 🎓 Study Mode: Interactive TKDN Inspector & Pancasila Compass
* **3D TKDN Component Disassembler:**
  * In 3D mode, children tap the solar drone or bamboo water pump to "explode" the 3D model into its constituent parts.
  * Each part has a green badge showing its origin:
    * *Propeller:* 100% Indonesian Natural Rubber & Composites (Sumatra).
    * *Frame:* 100% Bamboo Petung treated with local neem oil (Jawa Barat).
    * *Battery Enclosure:* Recycled local aluminum (Inalum, Asahan).
  * Interactive counter calculates: **Total TKDN Score: 88.5%**.
  * Audio popup in Indonesian and English: *"Hebat! Dengan 88% komponen lokal, kapal ini tidak perlu takut kehabisan suku cadang luar negeri!"*
* **Kompas 5 Sila:**
  * When a moral decision appears in the story, the "Garuda Compass" highlights which Sila illuminates the solution.

### 5.2 🌙 Sleeping Mode: Circadian Lullabies of the Archipelago
* **Audio Track Mixing:**
  * Soft traditional acoustic instruments recorded in 432Hz sleep frequencies: *Kecapi Suling Sunda, Angklung bambu lembut, Sasando Rote, Kolintang nada tenang*.
* **Visual Palette:**
  * Warm amber glow reminiscent of traditional *Damar Kurung* and twilight across the Indonesian rice terraces.
* **Bedtime Affirmations (Bilingual):**
  * *ID:* "Malam ini negeriku beristirahat dalam damai. Besok pagi kita bangun dengan semangat gotong royong dan rasa syukur."
  * *EN:* "Tonight our land rests in peace. Tomorrow we awaken with the spirit of collaboration, kindness, and gratitude."

### 5.3 🎮 Playing Mode: Sandbox Bengkel Nusantara
* Children can drag and assemble domestic components into inventions (e.g., solar tricycle, clean water filter).
* Visual reward: Earning the golden *"Pelopor Karya Nusantara"* badge in their digital sticker book.

---

## 6. Pedagogical Guide for Parents & Educators

### 6.1 Discussion Guide (Panduan Diskusi Keluarga & Kelas)
1. **Untuk Pertanyaan "Mengapa Produk Dalam Negeri?":**
   * *Pertanyaan:* "Apa yang terjadi pada pedagang buah atau pengrajin mainan di dekat rumah kita jika kita selalu membeli barang dari negara lain?"
   * *Jawaban Edukatif:* "Jika kita membeli dari mereka, uangnya akan dipakai untuk membelikan buku anak-anak mereka, memberi makan keluarga mereka, dan membuat desa kita makin makmur."
2. **Untuk Pertanyaan "Apa itu Berdaulat dan Merdeka?":**
   * *Pertanyaan:* "Apakah kita benar-benar merdeka jika makanan dan mainan kita harus selalu menunggu kiriman kapal dari tempat yang sangat jauh?"
   * *Jawaban Edukatif:* "Merdeka sejati adalah ketika kita mampu mencukupi kebutuhan kita sendiri dengan pintar, kreatif, dan saling tolong-menolong."
3. **Untuk Pertanyaan "Mengapa TKDN itu penting?":**
   * *Pertanyaan:* "Kalau mainanmu rusak dan bautnya hanya ada di benua lain, apa yang terjadi? Bagaimana kalau bautnya dibuat oleh paman di kota sebelah?"
   * *Jawaban Edukatif:* "Kalau dibuat di dalam negeri (TKDN tinggi), kita bisa memperbaikinya hari ini juga, dan paman kita memiliki pekerjaan yang baik!"
