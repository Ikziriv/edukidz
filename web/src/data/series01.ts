import type { SeriesManifest } from '../types/story';

export const series01Data: SeriesManifest = {
  id: 'series-01-friendship-garden',
  title: {
    en: 'The Global Friendship Garden & Zoo (14-Day · 2-Week Series)',
    id: 'Taman Sahabat, Sains, Satwa & Ibadah (Seri 14 Hari · 2 Minggu)'
  },
  tagline: {
    en: 'Fourteen days of gardening, classroom study, sanctuary zoo animals, and peaceful prayer.',
    id: 'Empat belas hari berkebun, belajar sains, mengunjungi taman satwa, dan beribadah dengan damai.'
  },
  seriesDocsUrl: 'docs/examples/SERIES_01_GLOBAL_FRIENDS_DOCS.md',
  targetAge: '6-8',
  toleranceThemes: [
    'interfaith-harmony',
    'cultural-empathy',
    'gotong-royong',
    'universal-kindness'
  ],
  characters: [
    {
      id: 'mateo',
      name: 'Mateo Silva',
      ethnicBackground: 'Brazilian / Latin American',
      regionTag: 'Latin America',
      faithTradition: 'Christianity (Catholic)',
      usesHijab: false,
      skinTone: '#d49466',
      attire: {
        headwear: 'sunny yellow baseball cap over wavy dark hair',
        clothing: 'ochre striped tee, charcoal joggers, red high-top sneakers',
        backpackColor: '#16a34a',
        styleCategory: 'modern-casual'
      },
      role: 'Soil caretaker, bio-composter, and musician',
      personality: 'Empathetic, energetic, loves birds, plays soothing acoustic guitar',
      accentColor: '#f59e0b'
    },
    {
      id: 'kenji',
      name: 'Kenji Takahashi',
      ethnicBackground: 'Japanese / East Asian',
      regionTag: 'East Asia',
      faithTradition: 'Shinto & Buddhist Heritage',
      usesHijab: false,
      skinTone: '#f1c29b',
      attire: {
        headwear: 'yellow explorer cap & round tortoiseshell spectacles',
        clothing: 'sage vest over coral tee, denim trousers, brown trail shoes',
        backpackColor: '#3b82f6',
        styleCategory: 'modern-casual'
      },
      role: 'Water systems architect and tool designer',
      personality: 'Observant, meticulous, builds bamboo water channels',
      accentColor: '#0284c7'
    },
    {
      id: 'amara',
      name: 'Amara Okafor',
      ethnicBackground: 'Nigerian / West African',
      regionTag: 'West Africa',
      faithTradition: 'Interfaith Family',
      usesHijab: false,
      skinTone: '#8d5531',
      attire: {
        headwear: 'textured curly afro puffs with wooden hair beads',
        clothing: 'rose-pink striped sleeve top, peach skirt, royal-blue high-tops',
        backpackColor: '#0284c7',
        styleCategory: 'traditional-cultural'
      },
      role: 'Ground tilling captain and team motivator',
      personality: 'Enthusiastic, physically resilient, natural storyteller',
      accentColor: '#ec4899'
    },
    {
      id: 'sofia',
      name: 'Sofia Lindqvist',
      ethnicBackground: 'Swedish / Nordic European',
      regionTag: 'Europe',
      faithTradition: 'Nordic Cultural & Nature Heritage',
      usesHijab: false,
      skinTone: '#f7d3ba',
      attire: {
        headwear: 'pastel-lavender Nordic headband with pearl pin over twin golden-chestnut braids',
        clothing: 'cream Breton-stripe cardigan, teal culottes, mustard sneakers',
        backpackColor: '#f43f5e',
        styleCategory: 'nordic-modest-modern'
      },
      role: 'Greenhouse climate observer and pollination artist',
      personality: 'Warm, artistic, sketches wildflowers and tracks honeybees',
      accentColor: '#8b5cf6'
    },
    {
      id: 'mei',
      name: 'Mei-Ling Chen',
      ethnicBackground: 'Chinese / East Asian',
      regionTag: 'East Asia',
      faithTradition: 'Traditional Chinese & Silk-Road Heritage',
      usesHijab: false,
      skinTone: '#f3c6a0',
      attire: {
        headwear: 'twin silk-ribbon hair buns with five-petal golden plum blossom pin',
        clothing: 'mandarin-collar cream tunic, sky-blue shorts, white-red sneakers',
        backpackColor: '#2563eb',
        styleCategory: 'asian-modest-contemporary'
      },
      role: 'Herbal tea botanist and seed cataloger',
      personality: 'Gentle, curious, knows traditional ginger and chrysanthemum remedies',
      accentColor: '#f97316'
    }
  ],
  stories: [
    {
      id: 'story-01-01-first-seedling',
      seriesId: 'series-01-friendship-garden',
      episodeNumber: 1,
      title: {
        en: 'Two Weeks of Friendship: Garden, Study, Sanctuary Zoo & Peaceful Prayer (Days 1–14)',
        id: 'Dua Minggu Persahabatan: Kebun, Belajar, Taman Satwa & Ibadah Damai (Hari 1–14)'
      },
      subtitle: {
        en: 'Week 1: Planting the Garden (Days 1–7) · Week 2: Classroom Study, Sanctuary Zoo & Muslim Prayer (Days 8–14).',
        id: 'Minggu 1: Berkebun Bersama (Hari 1–7) · Minggu 2: Belajar Kelas, Taman Satwa & Shalat Damai (Hari 8–14).'
      },
      author: 'EduKidz Creative Team',
      ageRange: '6-8',
      tags: ['7-day-series', 'nature', 'friendship', 'seeds', 'interfaith-harmony'],
      supportedModes: ['study', 'sleeping', 'playing'],
      defaultMode: 'study',
      scenes: [
        // ====================================================================
        // DAY 1 (MONDAY / SENIN) — CHAPTER 1
        // ====================================================================
        {
          id: 'scene-1',
          chapterNumber: 1,
          dayNumber: 1,
          weekNumber: 1,
          activityCategory: 'gardening',
          dayOfWeek: { en: 'Monday', id: 'Senin' },
          leadCharacter: 'aisyah',
          title: {
            en: 'Day 1: The Empty Lot & Aisyah\'s Dream',
            id: 'Hari 1: Lahan Kosong & Impian Aisyah'
          },
          subtitle: {
            en: 'Monday Morning · Discovering fertile earth beneath forgotten weeds.',
            id: 'Senin Pagi · Menemukan tanah subur di balik rumput liar.'
          },
          modelGlbUrl: 'models/scenes/day1_empty_lot.glb',
          cameraInitPosition: [0, 3, 7],
          cameraTargetPosition: [0, 1, 0],
          cameraLimits: {
            minPolarAngle: 0.5,
            maxPolarAngle: 1.4,
            minDistance: 4,
            maxDistance: 12
          },
          interactables: [
            {
              meshTargetName: 'AisyahMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Aisyah to wave and kneel',
                id: 'Ketuk Aisyah untuk menyapa'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to strum gentle chords',
                id: 'Ketuk Mateo untuk memetik gitar'
              }
            },
            {
              meshTargetName: 'SoilSproutMesh',
              action: 'sproutPlant',
              label: {
                en: 'Tap soil bed to help seeds sprout',
                id: 'Ketuk bedeng tanah untuk menumbuhkan tunas'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-hijab',
              meshTargetName: 'AisyahMesh',
              title: {
                en: 'Aisyah\'s Sport Hijab',
                id: 'Jilbab Olahraga Aisyah'
              },
              explanation: {
                en: 'Aisyah wears a breathable sport hijab. It stays snug and comfortable while she digs, plants, and explores nature with her friends!',
                id: 'Aisyah mengenakan jilbab olahraga yang sejuk dan nyaman dipakai bergerak aktif saat berkebun dan bermain bersama sahabat-sahabatnya.'
              },
              icon: 'sparkles',
              position3D: [-1.4, 1.85, 0.4]
            },
            {
              id: 'hotspot-soil',
              meshTargetName: 'RaisedBedSoil',
              title: {
                en: 'Rich Garden Soil',
                id: 'Tanah Subur'
              },
              explanation: {
                en: 'Healthy soil is full of tiny friendly microbes, earthworms, and rich nutrients that help sleeping seeds wake up and sprout strong roots.',
                id: 'Tanah yang sehat penuh dengan cacing tanah dan nutrisi alami yang membantu benih bertunas dengan akar yang kokoh.'
              },
              icon: 'sprout',
              position3D: [0.1, 0.75, 0.2]
            },
            {
              id: 'hotspot-guitar',
              meshTargetName: 'MateoGuitar',
              title: {
                en: 'Mateo\'s Acoustic Guitar',
                id: 'Gitar Akustik Mateo'
              },
              explanation: {
                en: 'Mateo plays cheerful Brazilian bossa rhythms while the children garden. Gentle music makes working together joyful and relaxing!',
                id: 'Mateo memainkan irama bossa yang riang sambil berkebun. Musik lembut membuat kerja gotong royong terasa menyenangkan dan hangat.'
              },
              icon: 'music',
              position3D: [1.5, 1.5, -0.3]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'City Skyline' },
            { layerUrl: 'images/scenes/empty_lot_mid.webp', depthFactor: 0.5, title: 'Garden Raised Beds' },
            { layerUrl: 'images/scenes/empty_lot_fg.webp', depthFactor: 0.9, title: 'Foreground Sprouts & Path' }
          ],
          dialogue: {
            en: {
              text: 'On Monday morning, Aisyah adjusted her comfortable hijab, knelt by the soil, and showed Mateo her grandmother\'s heirloom ginger seeds.',
              audioStartMs: 0,
              audioEndMs: 8200,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Monday', startMs: 260, endMs: 700 },
                { word: 'morning,', startMs: 710, endMs: 1200 },
                { word: 'Aisyah', startMs: 1210, endMs: 1750 },
                { word: 'adjusted', startMs: 1760, endMs: 2300 },
                { word: 'her', startMs: 2310, endMs: 2500 },
                { word: 'comfortable', startMs: 2510, endMs: 3150 },
                {
                  word: 'hijab,',
                  startMs: 3160,
                  endMs: 3700,
                  isVocab: true,
                  definition: {
                    en: 'A comfortable, modest headscarf worn by Muslim girls and women.',
                    id: 'Kain penutup kepala yang santun dan anggun bagi perempuan Muslimah.'
                  },
                  phonics: {
                    en: '[hee-JAHB]',
                    id: '[jil-BAB]'
                  }
                },
                { word: 'knelt', startMs: 3710, endMs: 4150 },
                { word: 'by', startMs: 4160, endMs: 4350 },
                { word: 'the', startMs: 4360, endMs: 4550 },
                {
                  word: 'soil,',
                  startMs: 4560,
                  endMs: 5050,
                  isVocab: true,
                  definition: {
                    en: 'The dark, living top layer of earth where seeds take root and drink water.',
                    id: 'Lapisan bumi tempat akar tanaman bertumbuh dan minum nutrisi.'
                  },
                  phonics: {
                    en: '[SOY-uhl]',
                    id: '[TAH-nah]'
                  }
                },
                { word: 'and', startMs: 5060, endMs: 5300 },
                { word: 'showed', startMs: 5310, endMs: 5750 },
                { word: 'Mateo', startMs: 5760, endMs: 6250 },
                { word: 'her', startMs: 6260, endMs: 6500 },
                { word: 'grandmother\'s', startMs: 6510, endMs: 7200 },
                {
                  word: 'heirloom',
                  startMs: 7210,
                  endMs: 7650,
                  isVocab: true,
                  definition: {
                    en: 'A valuable plant variety or tradition passed lovingly across family generations.',
                    id: 'Benih istimewa atau tradisi berharga yang diwariskan turun-temurun.'
                  },
                  phonics: {
                    en: '[AIR-loom]',
                    id: '[wah-REE-sahn]'
                  }
                },
                { word: 'ginger', startMs: 7660, endMs: 7950 },
                { word: 'seeds.', startMs: 7960, endMs: 8200 }
              ]
            },
            id: {
              text: 'Pada hari Senin pagi, Aisyah merapikan jilbabnya yang nyaman, berlutut dekat tanah gembur, lalu memperlihatkan benih jahe warisan neneknya kepada Mateo.',
              audioStartMs: 0,
              audioEndMs: 8200,
              words: [
                { word: 'Pada', startMs: 0, endMs: 320 },
                { word: 'hari', startMs: 330, endMs: 650 },
                { word: 'Senin', startMs: 660, endMs: 1050 },
                { word: 'pagi,', startMs: 1060, endMs: 1450 },
                { word: 'Aisyah', startMs: 1460, endMs: 2000 },
                { word: 'merapikan', startMs: 2010, endMs: 2600 },
                {
                  word: 'jilbabnya',
                  startMs: 2610,
                  endMs: 3150,
                  isVocab: true,
                  definition: {
                    en: 'A comfortable, modest headscarf worn by Muslim girls and women.',
                    id: 'Kain penutup kepala yang santun dan anggun bagi perempuan Muslimah.'
                  },
                  phonics: {
                    en: '[hee-JAHB]',
                    id: '[jil-BAB]'
                  }
                },
                { word: 'yang', startMs: 3160, endMs: 3400 },
                { word: 'nyaman,', startMs: 3410, endMs: 3900 },
                { word: 'berlutut', startMs: 3910, endMs: 4400 },
                { word: 'dekat', startMs: 4410, endMs: 4750 },
                {
                  word: 'tanah',
                  startMs: 4760,
                  endMs: 5150,
                  isVocab: true,
                  definition: {
                    en: 'The dark, living top layer of earth where seeds take root and drink water.',
                    id: 'Lapisan bumi tempat akar tanaman bertumbuh subur.'
                  },
                  phonics: {
                    en: '[SOY-uhl]',
                    id: '[TAH-nah]'
                  }
                },
                { word: 'gembur,', startMs: 5160, endMs: 5600 },
                { word: 'lalu', startMs: 5610, endMs: 5900 },
                { word: 'memperlihatkan', startMs: 5910, endMs: 6600 },
                {
                  word: 'benih',
                  startMs: 6610,
                  endMs: 7000,
                  isVocab: true,
                  definition: {
                    en: 'A tiny plant embryo packed inside a shell, waiting for water to sprout.',
                    id: 'Biji tanaman yang siap disemai untuk menghasilkan tunas baru.'
                  },
                  phonics: {
                    en: '[SEED]',
                    id: '[buh-NEE]'
                  }
                },
                { word: 'jahe', startMs: 7010, endMs: 7350 },
                {
                  word: 'warisan',
                  startMs: 7360,
                  endMs: 7750,
                  isVocab: true,
                  definition: {
                    en: 'A valuable plant variety or tradition passed lovingly across family generations.',
                    id: 'Harta atau tradisi berharga yang diturunkan oleh nenek moyang.'
                  },
                  phonics: {
                    en: '[AIR-loom]',
                    id: '[wah-REE-sahn]'
                  }
                },
                { word: 'neneknya', startMs: 7760, endMs: 8000 },
                { word: 'kepada', startMs: 8010, endMs: 8100 },
                { word: 'Mateo.', startMs: 8110, endMs: 8200 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-01',
              question: {
                en: 'On Day 1 (Monday), what did Aisyah bring to plant in the community garden?',
                id: 'Pada Hari ke-1 (Senin), apa yang dibawa Aisyah untuk ditanam di kebun bersama?'
              },
              options: [
                {
                  text: {
                    en: 'Heirloom ginger seeds from her grandmother',
                    id: 'Benih jahe warisan dari neneknya'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'Plastic toy flowers',
                    id: 'Bunga plastik mainan'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Dry fallen leaves',
                    id: 'Daun-daun kering yang layu'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Correct! On Day 1, Aisyah brought real heirloom ginger seeds passed down by her grandmother.',
                id: 'Tepat sekali! Pada Hari ke-1, Aisyah membawa benih jahe asli warisan neneknya yang penuh khasiat.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 1: Why Do Seeds Sleep Underground?',
              id: 'Aku Ingin Tahu! · Hari 1: Mengapa Benih Tertidur di Dalam Tanah?'
            },
            wonderQuestion: {
              en: 'Why can a tiny dry ginger seed stay asleep for months and wake up into a fragrant green plant?',
              id: 'Mengapa benih jahe kecil yang kering bisa tertidur berbulan-bulan lalu bangun menjadi tanaman hijau yang harum?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-seed-coat',
                question: {
                  en: 'I Wonder Why: How does a seed survive underground?',
                  id: 'Mengapa Ya: Bagaimana benih bertahan di bawah tanah?'
                },
                answer: {
                  en: 'Inside every seed is a tiny baby plant (embryo) wrapped in a lunchbox of starch nutrients and protected by a tough raincoat called the seed coat!',
                  id: 'Di dalam setiap benih ada calon tanaman mungil (embrio) dengan bekal makanan alami dan mantel pelindung bernama kulit biji!'
                },
                diagramType: 'seed-roots'
              },
              {
                id: 'fact-soil-microbes',
                question: {
                  en: 'I Wonder Why: What makes dark soil smell so fresh?',
                  id: 'Mengapa Ya: Apa yang membuat tanah subur beraroma segar?'
                },
                answer: {
                  en: 'Earthworms and friendly soil microbes recycle fallen leaves into rich humus, creating microscopic air tunnels so roots can breathe!',
                  id: 'Cacing tanah dan mikroba baik mengubah daun gugur menjadi humus kaya nutrisi serta membuat terowongan udara agar akar bisa bernapas!'
                },
                diagramType: 'water-cycle'
              },
              {
                id: 'fact-sound-vibration',
                question: {
                  en: 'I Wonder Why: How does Mateo\'s guitar make music?',
                  id: 'Mengapa Ya: Bagaimana gitar Mateo menghasilkan nada indah?'
                },
                answer: {
                  en: 'Plucking a string creates invisible sound waves that vibrate inside the wooden hollow body and travel through the air to our ears!',
                  id: 'Memetik senar menciptakan gelombang suara tak kasatmata yang bergetar di ruang kayu gitar dan merambat di udara ke telinga kita!'
                },
                diagramType: 'sound-waves'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 2 (TUESDAY / SELASA) — CHAPTER 2
        // ====================================================================
        {
          id: 'scene-2',
          chapterNumber: 2,
          dayNumber: 2,
          weekNumber: 1,
          activityCategory: 'gardening',
          dayOfWeek: { en: 'Tuesday', id: 'Selasa' },
          leadCharacter: 'mateo',
          title: {
            en: 'Day 2: Planting & Rainwater Furrows',
            id: 'Hari 2: Menyemai Benih & Parit Air Hujan'
          },
          subtitle: {
            en: 'Tuesday · Gotong Royong in action: digging trenches and watering seeds.',
            id: 'Selasa · Semangat gotong royong: menggali parit dan menyiram benih.'
          },
          modelGlbUrl: 'models/scenes/day2_planting_beds.glb',
          cameraInitPosition: [1.2, 2.8, 6.5],
          cameraTargetPosition: [0, 0.8, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10
          },
          interactables: [
            {
              meshTargetName: 'WateringCanMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tip watering can over raised bed',
                id: 'Tuang air ke bedeng kebun'
              }
            },
            {
              meshTargetName: 'GingerSproutCluster',
              action: 'sproutPlant',
              label: {
                en: 'Watch green shoots reach for sunlight',
                id: 'Lihat tunas hijau menyambut matahari'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-germination',
              meshTargetName: 'GingerShoot',
              title: {
                en: 'Germination (Perkecambahan)',
                id: 'Proses Perkecambahan'
              },
              explanation: {
                en: 'When a seed absorbs warm water, the shell softens, and the baby embryo inside wakes up to push roots downward and green leaves upward toward the sun!',
                id: 'Saat benih menyerap air hangat, kulit biji melunak dan embrio kecil terbangun mendorong akar ke bawah serta tunas hijau ke atas menuju sinar mentari!'
              },
              icon: 'sun',
              position3D: [-0.2, 0.9, 0.4]
            },
            {
              id: 'hotspot-wateringcan',
              meshTargetName: 'WateringCan',
              title: {
                en: 'Kenji\'s Rainwater Collector',
                id: 'Penyiram Air Kenji'
              },
              explanation: {
                en: 'Kenji crafted a gentle shower nozzle using recycled tin, giving tender seedlings a soft mist that won\'t wash away their soil.',
                id: 'Kenji merancang corong air yang memancarkan butiran halus, sehingga akar tunas muda tetap terlindungi tanpa mengikis tanah.'
              },
              icon: 'heart',
              position3D: [1.1, 0.65, 0.6]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Warm Sunshine Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Watering Can & Raised Beds' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Fresh Green Sprout Shoots' }
          ],
          dialogue: {
            en: {
              text: 'On Day Two, Mateo dug a gentle furrow with his trowel while Kenji poured cool rainwater, murmuring words of encouragement to every tiny seed.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 550 },
                { word: 'Two,', startMs: 560, endMs: 950 },
                { word: 'Mateo', startMs: 960, endMs: 1450 },
                { word: 'dug', startMs: 1460, endMs: 1750 },
                { word: 'a', startMs: 1760, endMs: 1900 },
                { word: 'gentle', startMs: 1910, endMs: 2350 },
                {
                  word: 'furrow',
                  startMs: 2360,
                  endMs: 2850,
                  isVocab: true,
                  definition: {
                    en: 'A shallow, cozy trench made in the earth for planting seeds at just the right depth.',
                    id: 'Parit dangkal yang digali rapi di tanah untuk menaruh benih.'
                  },
                  phonics: {
                    en: '[FUR-oh]',
                    id: '[PAH-rit]'
                  }
                },
                { word: 'with', startMs: 2860, endMs: 3100 },
                { word: 'his', startMs: 3110, endMs: 3300 },
                {
                  word: 'trowel',
                  startMs: 3310,
                  endMs: 3800,
                  isVocab: true,
                  definition: {
                    en: 'A small, pointed handheld shovel used by gardeners to scoop soil.',
                    id: 'Sekop kecil bergagang yang dipakai untuk menggali dan merawat tanaman.'
                  },
                  phonics: {
                    en: '[TROU-uhl]',
                    id: '[suh-KOP]'
                  }
                },
                { word: 'while', startMs: 3810, endMs: 4150 },
                { word: 'Kenji', startMs: 4160, endMs: 4650 },
                { word: 'poured', startMs: 4660, endMs: 5100 },
                { word: 'cool', startMs: 5110, endMs: 5450 },
                { word: 'rainwater,', startMs: 5460, endMs: 6100 },
                { word: 'murmuring', startMs: 6110, endMs: 6700 },
                { word: 'words', startMs: 6710, endMs: 7000 },
                { word: 'of', startMs: 7010, endMs: 7150 },
                {
                  word: 'encouragement',
                  startMs: 7160,
                  endMs: 7800,
                  isVocab: true,
                  definition: {
                    en: 'Kind, supportive words that give hope, courage, and confidence to friends.',
                    id: 'Kata-kata penyemangat yang menumbuhkan rasa percaya diri dan ketenangan.'
                  },
                  phonics: {
                    en: '[en-KUR-ij-muhnt]',
                    id: '[se-MANG-at]'
                  }
                },
                { word: 'to', startMs: 7810, endMs: 7950 },
                { word: 'every', startMs: 7960, endMs: 8150 },
                { word: 'tiny', startMs: 8160, endMs: 8350 },
                { word: 'seed.', startMs: 8360, endMs: 8500 }
              ]
            },
            id: {
              text: 'Pada Hari Kedua, Mateo menggali parit dangkal dengan sekop kecilnya, sementara Kenji menuangkan air hujan segar sambil menyemangati setiap benih kecil.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 300 },
                { word: 'Hari', startMs: 310, endMs: 650 },
                { word: 'Kedua,', startMs: 660, endMs: 1150 },
                { word: 'Mateo', startMs: 1160, endMs: 1650 },
                { word: 'menggali', startMs: 1660, endMs: 2200 },
                {
                  word: 'parit',
                  startMs: 2210,
                  endMs: 2650,
                  isVocab: true,
                  definition: {
                    en: 'A shallow, cozy trench made in the earth for planting seeds at just the right depth.',
                    id: 'Parit dangkal yang digali rapi di tanah untuk menaruh benih.'
                  },
                  phonics: {
                    en: '[FUR-oh]',
                    id: '[PAH-rit]'
                  }
                },
                { word: 'dangkal', startMs: 2660, endMs: 3100 },
                { word: 'dengan', startMs: 3110, endMs: 3450 },
                {
                  word: 'sekop',
                  startMs: 3460,
                  endMs: 3900,
                  isVocab: true,
                  definition: {
                    en: 'A small, pointed handheld shovel used by gardeners to scoop soil.',
                    id: 'Sekop kecil bergagang yang dipakai untuk menggali dan merawat tanaman.'
                  },
                  phonics: {
                    en: '[TROU-uhl]',
                    id: '[suh-KOP]'
                  }
                },
                { word: 'kecilnya,', startMs: 3910, endMs: 4400 },
                { word: 'sementara', startMs: 4410, endMs: 5000 },
                { word: 'Kenji', startMs: 5010, endMs: 5500 },
                { word: 'menuangkan', startMs: 5510, endMs: 6150 },
                { word: 'air', startMs: 6160, endMs: 6450 },
                { word: 'hujan', startMs: 6460, endMs: 6850 },
                { word: 'segar', startMs: 6860, endMs: 7200 },
                { word: 'sambil', startMs: 7210, endMs: 7500 },
                {
                  word: 'menyemangati',
                  startMs: 7510,
                  endMs: 8050,
                  isVocab: true,
                  definition: {
                    en: 'Kind, supportive words that give hope, courage, and confidence to friends.',
                    id: 'Mengucapkan kata-kata baik untuk memberikan dorongan semangat.'
                  },
                  phonics: {
                    en: '[en-KUR-ij-muhnt]',
                    id: '[se-MANG-at]'
                  }
                },
                { word: 'setiap', startMs: 8060, endMs: 8250 },
                { word: 'benih', startMs: 8260, endMs: 8380 },
                { word: 'kecil.', startMs: 8390, endMs: 8500 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-02',
              question: {
                en: 'Why did Mateo and Kenji work together on Day 2 (Gotong Royong)?',
                id: 'Mengapa Mateo dan Kenji bekerja bersama pada Hari ke-2 (Gotong Royong)?'
              },
              options: [
                {
                  text: {
                    en: 'Because cooperating makes hard tasks lighter and more joyful!',
                    id: 'Karena kerja sama membuat tugas berat jadi lebih ringan dan gembira!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'To see who could finish fastest in a race',
                    id: 'Untuk berlomba siapa yang paling cepat selesai'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Because they wanted to keep all the harvest for themselves',
                    id: 'Karena ingin menyimpan semua hasil panen sendiri'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Bravo! Gotong royong is the Indonesian cultural principle of mutual cooperation and joy in unity.',
                id: 'Luar biasa! Gotong royong adalah nilai luhur saling membantu dengan hati riang gembira.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 2: How Do Roots Drink Rainwater?',
              id: 'Aku Ingin Tahu! · Hari 2: Bagaimana Akar Meminum Air Hujan?'
            },
            wonderQuestion: {
              en: 'How does water travel UPWARD from the bottom of the soil all the way to the top leaves against gravity?',
              id: 'Bagaimana air bisa naik ke atas dari dalam tanah menuju pucuk daun melawan gravitasi?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-capillary-action',
                question: {
                  en: 'I Wonder Why: How do roots drink without a mouth?',
                  id: 'Mengapa Ya: Bagaimana akar minum tanpa mulut?'
                },
                answer: {
                  en: 'Microscopic root hairs act like tiny drinking straws! Through capillary action and osmosis, water climbs up xylem tubes to every leaf.',
                  id: 'Rambut akar mikroskopis bekerja seperti sedotan mungil! Lewat gaya kapiler, air memanjat pembuluh xilem menuju seluruh helai daun.'
                },
                diagramType: 'water-cycle'
              },
              {
                id: 'fact-photosynthesis',
                question: {
                  en: 'I Wonder Why: Why do leaves reach toward the sun?',
                  id: 'Mengapa Ya: Mengapa tunas daun tumbuh ke arah matahari?'
                },
                answer: {
                  en: 'Green chlorophyll inside leaves captures golden sunlight to cook water and carbon dioxide into sweet energy and fresh oxygen!',
                  id: 'Klorofil hijau di dalam daun menangkap sinar mentari untuk memasak air dan udara menjadi energi manis serta oksigen segar!'
                },
                diagramType: 'sun-photosynthesis'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 3 (WEDNESDAY / RABU) — CHAPTER 3
        // ====================================================================
        {
          id: 'scene-3',
          chapterNumber: 3,
          dayNumber: 3,
          weekNumber: 1,
          activityCategory: 'gardening',
          dayOfWeek: { en: 'Wednesday', id: 'Rabu' },
          leadCharacter: 'amara',
          title: {
            en: 'Day 3: Amara\'s Compost & The First Sprouts',
            id: 'Hari 3: Kompos Amara & Tunas Hijau Pertama'
          },
          subtitle: {
            en: 'Wednesday · Feeding the soil organic compost and celebrating tiny emerald shoots.',
            id: 'Rabu · Memberi nutrisi kompos organik dan menyambut tunas hijau pertama.'
          },
          modelGlbUrl: 'models/scenes/day3_sprouts.glb',
          cameraInitPosition: [-1.1, 2.9, 6.4],
          cameraTargetPosition: [0, 0.85, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10
          },
          interactables: [
            {
              meshTargetName: 'AmaraMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Amara to spread rich compost',
                id: 'Ketuk Amara untuk menabur kompos'
              }
            },
            {
              meshTargetName: 'SproutBedMesh',
              action: 'sproutPlant',
              label: {
                en: 'Tap emerald sprouts to help them grow',
                id: 'Ketuk tunas hijau agar tumbuh tinggi'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-compost',
              meshTargetName: 'CompostBin',
              title: {
                en: 'Amara\'s Organic Compost',
                id: 'Kompos Organik Amara'
              },
              explanation: {
                en: 'Amara mixes banana peels, dry leaves, and vegetable scraps into dark compost—nature\'s vitamin booster for growing seedlings!',
                id: 'Amara mengolah kulit pisang dan daun kering menjadi kompos organik yang kaya vitamin alami untuk tunas muda!'
              },
              icon: 'sprout',
              position3D: [1.05, 1.35, -1.1]
            },
            {
              id: 'hotspot-ankara',
              meshTargetName: 'AmaraBeads',
              title: {
                en: 'Amara\'s Wooden Hair Beads',
                id: 'Manik Kayu Tradisional Amara'
              },
              explanation: {
                en: 'Amara wears carved wooden beads in her curly afro puffs, celebrating her Nigerian heritage with joyful pride.',
                id: 'Amara menghiasi rambut ikalnya dengan manik kayu ukir yang merayakan keindahan warisan budaya Nigeria.'
              },
              icon: 'sparkles',
              position3D: [-0.2, 0.85, 0.3]
            },
            {
              id: 'hotspot-picnic',
              meshTargetName: 'SharedSnackTable',
              title: {
                en: 'Shared Neighborhood Snacks',
                id: 'Bekal Sahabat Lintas Budaya'
              },
              explanation: {
                en: 'During break time, the friends share Indonesian kue lapis and Brazilian cheese bread (pão de queijo), thanking God for delicious food.',
                id: 'Saat istirahat, para sahabat berbagi kue lapis dan roti keju Brasil sambil bersyukur atas nikmat kebersamaan.'
              },
              icon: 'heart',
              position3D: [-1.5, 1.4, 0.5]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Wednesday Morning Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Sprouting Garden Beds' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Emerald Shoots' }
          ],
          dialogue: {
            en: {
              text: 'On Wednesday, Amara sprinkled organic compost around the beds, cheering happily as tiny green sprouts pushed up toward the warm morning sun!',
              audioStartMs: 0,
              audioEndMs: 8400,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Wednesday,', startMs: 260, endMs: 850 },
                { word: 'Amara', startMs: 860, endMs: 1400 },
                { word: 'sprinkled', startMs: 1410, endMs: 2000 },
                { word: 'organic', startMs: 2010, endMs: 2550 },
                {
                  word: 'compost',
                  startMs: 2560,
                  endMs: 3150,
                  isVocab: true,
                  definition: {
                    en: 'Recycled leaves and fruit scraps turned into nutrient-rich natural plant food.',
                    id: 'Pupuk alami dari dedaunan dan sisa buah yang menyuburkan tanaman.'
                  },
                  phonics: {
                    en: '[KOM-post]',
                    id: '[KOM-pos]'
                  }
                },
                { word: 'around', startMs: 3160, endMs: 3600 },
                { word: 'the', startMs: 3610, endMs: 3800 },
                { word: 'beds,', startMs: 3810, endMs: 4250 },
                { word: 'cheering', startMs: 4260, endMs: 4800 },
                { word: 'happily', startMs: 4810, endMs: 5350 },
                { word: 'as', startMs: 5360, endMs: 5550 },
                { word: 'tiny', startMs: 5560, endMs: 5950 },
                { word: 'green', startMs: 5960, endMs: 6350 },
                {
                  word: 'sprouts',
                  startMs: 6360,
                  endMs: 6900,
                  isVocab: true,
                  definition: {
                    en: 'Young baby plant shoots emerging from germinating seeds for the very first time.',
                    id: 'Tunas tanaman muda yang baru muncul menembus permukaan tanah.'
                  },
                  phonics: {
                    en: '[SPROUTS]',
                    id: '[TOO-nahs]'
                  }
                },
                { word: 'pushed', startMs: 6910, endMs: 7300 },
                { word: 'up', startMs: 7310, endMs: 7500 },
                { word: 'toward', startMs: 7510, endMs: 7850 },
                { word: 'the', startMs: 7860, endMs: 8000 },
                { word: 'warm', startMs: 8010, endMs: 8200 },
                { word: 'morning', startMs: 8210, endMs: 8300 },
                { word: 'sun!', startMs: 8310, endMs: 8400 }
              ]
            },
            id: {
              text: 'Pada hari Rabu, Amara menaburkan kompos organik di sekeliling bedeng, bersorak gembira melihat tunas hijau mungil menyembul menyambut mentari pagi!',
              audioStartMs: 0,
              audioEndMs: 8400,
              words: [
                { word: 'Pada', startMs: 0, endMs: 320 },
                { word: 'hari', startMs: 330, endMs: 650 },
                { word: 'Rabu,', startMs: 660, endMs: 1100 },
                { word: 'Amara', startMs: 1110, endMs: 1650 },
                { word: 'menaburkan', startMs: 1660, endMs: 2350 },
                {
                  word: 'kompos',
                  startMs: 2360,
                  endMs: 2900,
                  isVocab: true,
                  definition: {
                    en: 'Recycled leaves and fruit scraps turned into nutrient-rich natural plant food.',
                    id: 'Pupuk alami dari dedaunan dan sisa buah yang menyuburkan tanaman.'
                  },
                  phonics: {
                    en: '[KOM-post]',
                    id: '[KOM-pos]'
                  }
                },
                { word: 'organik', startMs: 2910, endMs: 3450 },
                { word: 'di', startMs: 3460, endMs: 3650 },
                { word: 'sekeliling', startMs: 3660, endMs: 4250 },
                { word: 'bedeng,', startMs: 4260, endMs: 4750 },
                { word: 'bersorak', startMs: 4760, endMs: 5300 },
                { word: 'gembira', startMs: 5310, endMs: 5850 },
                { word: 'melihat', startMs: 5860, endMs: 6350 },
                {
                  word: 'tunas',
                  startMs: 6360,
                  endMs: 6850,
                  isVocab: true,
                  definition: {
                    en: 'Young baby plant shoots emerging from germinating seeds for the very first time.',
                    id: 'Tumbuhan muda yang baru tumbuh dari biji yang berkecambah.'
                  },
                  phonics: {
                    en: '[SPROUTS]',
                    id: '[TOO-nahs]'
                  }
                },
                { word: 'hijau', startMs: 6860, endMs: 7250 },
                { word: 'mungil', startMs: 7260, endMs: 7650 },
                { word: 'menyembul', startMs: 7660, endMs: 8050 },
                { word: 'menyambut', startMs: 8060, endMs: 8250 },
                { word: 'mentari', startMs: 8260, endMs: 8330 },
                { word: 'pagi!', startMs: 8340, endMs: 8400 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-03',
              question: {
                en: 'How does Amara\'s organic compost help the garden on Day 3?',
                id: 'Bagaimana kompos organik Amara membantu kebun pada Hari ke-3?'
              },
              options: [
                {
                  text: {
                    en: 'It recycles leaves and fruit peels into natural nutrients for strong sprouts',
                    id: 'Mengubah daun dan kulit buah menjadi nutrisi alami agar tunas tumbuh kuat'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'It turns the soil into hard stone',
                    id: 'Mengubah tanah menjadi batu yang keras'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'It blocks sunlight from reaching the plants',
                    id: 'Menghalangi sinar matahari mencapai tanaman'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Wonderful! Compost recycles organic matter into rich food for growing plants without chemical waste.',
                id: 'Hebat! Kompos mendaur ulang bahan organik menjadi makanan sehat bagi tanaman sekaligus menjaga bumi.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 3: How Do Fallen Leaves Become Plant Food?',
              id: 'Aku Ingin Tahu! · Hari 3: Bagaimana Daun Gugur Menjadi Makanan Tanaman?'
            },
            wonderQuestion: {
              en: 'Why doesn\'t the forest floor pile up to the sky with old fallen leaves every year?',
              id: 'Mengapa lantai hutan tidak menumpuk tinggi oleh daun kering setiap tahunnya?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-compost-cycle',
                question: {
                  en: 'I Wonder Why: Who are nature\'s tiny recyclers?',
                  id: 'Mengapa Ya: Siapa pendaur ulang cilik di dalam tanah?'
                },
                answer: {
                  en: 'Friendly earthworms, fungi, and soil bacteria munch on old leaves and turn them into dark humus packed with nitrogen and minerals!',
                  id: 'Cacing tanah, jamur baik, dan bakteri pengurai mengubah daun kering menjadi humus hitam yang kaya mineral!'
                },
                diagramType: 'seed-roots'
              },
              {
                id: 'fact-phototropism',
                question: {
                  en: 'I Wonder Why: How does a sprout know which way is UP?',
                  id: 'Mengapa Ya: Bagaimana tunas tahu arah atas dan bawah?'
                },
                answer: {
                  en: 'Plants have built-in gravity sensors (gravitropism) that guide roots down into the earth and shoots up toward the bright sun!',
                  id: 'Tanaman memiliki sensor gravitasi alami yang mengarahkan akar ke bawah menuju bumi dan batang ke atas menjemput cahaya!'
                },
                diagramType: 'sun-photosynthesis'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 4 (THURSDAY / KAMIS) — CHAPTER 4
        // ====================================================================
        {
          id: 'scene-4',
          chapterNumber: 4,
          dayNumber: 4,
          weekNumber: 1,
          activityCategory: 'study-learning',
          dayOfWeek: { en: 'Thursday', id: 'Kamis' },
          leadCharacter: 'sofia',
          title: {
            en: 'Day 4: Sofia\'s Honeybees & Golden Sunflowers',
            id: 'Hari 4: Lebah Madu Sofia & Bunga Matahari Emas'
          },
          subtitle: {
            en: 'Thursday · Sketching wildflowers, welcoming pollinators, and learning photosynthesis.',
            id: 'Kamis · Menggambar bunga mekar, menyambut lebah penyerbuk, dan belajar fotosintesis.'
          },
          modelGlbUrl: 'models/scenes/day4_pollination.glb',
          cameraInitPosition: [0.8, 2.7, 6.2],
          cameraTargetPosition: [0, 0.9, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10
          },
          interactables: [
            {
              meshTargetName: 'SofiaMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Sofia to sketch blooming sunflowers',
                id: 'Ketuk Sofia untuk menggambar bunga matahari'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to play a bee-friendly melody',
                id: 'Ketuk Mateo untuk memainkan melodi taman'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-nordic-hijab',
              meshTargetName: 'SofiaMesh',
              title: {
                en: 'Sofia\'s Nordic Braids & Lavender Headband',
                id: 'Kepang Nordik & Bando Lavender Sofia'
              },
              explanation: {
                en: 'Sofia wears twin golden-chestnut braids with a pastel-lavender Nordic headband and pearl brooch while sketching garden wildflowers.',
                id: 'Sofia menata rambut kepang kembarnya dengan bando rajut warna lavender lembut dan pin mutiara saat menggambar bunga taman.'
              },
              icon: 'sparkles',
              position3D: [-2.1, 1.75, -0.2]
            },
            {
              id: 'hotspot-pollination',
              meshTargetName: 'SunflowerPlot',
              title: {
                en: 'Honeybee Pollination (Penyerbukan)',
                id: 'Penyerbukan Lebah Madu'
              },
              explanation: {
                en: 'As fuzzy honeybees sip sweet nectar, golden pollen grains stick to their legs and travel from flower to flower so fruits and seeds can form!',
                id: 'Saat lebah madu menghisap nektar manis, serbuk sari menempel di kakinya dan berpindah antar-bunga sehingga buah dapat terbentuk!'
              },
              icon: 'sun',
              position3D: [0.2, 0.95, 0.15]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Sunny Thursday Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Sunflower & Strawberry Beds' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Honeybees & Blossoms' }
          ],
          dialogue: {
            en: {
              text: 'On Thursday, Sofia adjusted her lavender headband and sketched golden sunflowers as fuzzy honeybees carried golden pollen from blossom to blossom.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Thursday,', startMs: 260, endMs: 850 },
                { word: 'Sofia', startMs: 860, endMs: 1400 },
                { word: 'adjusted', startMs: 1410, endMs: 1950 },
                { word: 'her', startMs: 1960, endMs: 2200 },
                { word: 'lavender', startMs: 2210, endMs: 2750 },
                { word: 'headband', startMs: 2760, endMs: 3250 },
                { word: 'and', startMs: 3260, endMs: 3500 },
                { word: 'sketched', startMs: 3510, endMs: 4050 },
                { word: 'golden', startMs: 4060, endMs: 4550 },
                { word: 'sunflowers', startMs: 4560, endMs: 5250 },
                { word: 'as', startMs: 5260, endMs: 5500 },
                { word: 'fuzzy', startMs: 5510, endMs: 5950 },
                { word: 'honeybees', startMs: 5960, endMs: 6600 },
                { word: 'carried', startMs: 6610, endMs: 7050 },
                { word: 'golden', startMs: 7060, endMs: 7450 },
                {
                  word: 'pollen',
                  startMs: 7460,
                  endMs: 7900,
                  isVocab: true,
                  definition: {
                    en: 'Fine golden powder inside flowers that bees share to help plants make new seeds and fruit.',
                    id: 'Serbuk halus berwarna keemasan pada bunga yang membantu tanaman menghasilkan buah dan biji.'
                  },
                  phonics: {
                    en: '[POL-uhn]',
                    id: '[SER-buk SAH-ree]'
                  }
                },
                { word: 'from', startMs: 7910, endMs: 8100 },
                {
                  word: 'blossom',
                  startMs: 8110,
                  endMs: 8320,
                  isVocab: true,
                  definition: {
                    en: 'A bright open flower on a plant or tree.',
                    id: 'Kuntum bunga yang sedang mekar dengan indah.'
                  },
                  phonics: {
                    en: '[BLOS-uhm]',
                    id: '[MEH-kar]'
                  }
                },
                { word: 'to', startMs: 8330, endMs: 8400 },
                { word: 'blossom.', startMs: 8410, endMs: 8500 }
              ]
            },
            id: {
              text: 'Pada hari Kamis, Sofia merapikan bando lavendernya lalu menggambar bunga matahari saat lebah madu membawa serbuk sari dari satu kuntum ke kuntum lainnya.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 300 },
                { word: 'hari', startMs: 310, endMs: 620 },
                { word: 'Kamis,', startMs: 630, endMs: 1100 },
                { word: 'Sofia', startMs: 1110, endMs: 1650 },
                { word: 'merapikan', startMs: 1660, endMs: 2250 },
                { word: 'bando', startMs: 2260, endMs: 2700 },
                { word: 'lavendernya', startMs: 2710, endMs: 3350 },
                { word: 'lalu', startMs: 3360, endMs: 3650 },
                { word: 'menggambar', startMs: 3660, endMs: 4300 },
                { word: 'bunga', startMs: 4310, endMs: 4700 },
                { word: 'matahari', startMs: 4710, endMs: 5300 },
                { word: 'saat', startMs: 5310, endMs: 5650 },
                {
                  word: 'lebah',
                  startMs: 5660,
                  endMs: 6100,
                  isVocab: true,
                  definition: {
                    en: 'A helpful flying insect that collects flower nectar and pollinates gardens.',
                    id: 'Serangga sahabat petani yang mengumpulkan nektar dan membantu penyerbukan bunga.'
                  },
                  phonics: {
                    en: '[BEE]',
                    id: '[luh-BAH]'
                  }
                },
                { word: 'madu', startMs: 6110, endMs: 6500 },
                { word: 'membawa', startMs: 6510, endMs: 7000 },
                {
                  word: 'serbuk',
                  startMs: 7010,
                  endMs: 7450,
                  isVocab: true,
                  definition: {
                    en: 'Fine golden powder inside flowers that helps plants form seeds and fruit.',
                    id: 'Butiran halus pada benang sari bunga untuk proses penyerbukan.'
                  },
                  phonics: {
                    en: '[POL-uhn]',
                    id: '[SER-buk]'
                  }
                },
                { word: 'sari', startMs: 7460, endMs: 7750 },
                { word: 'antar', startMs: 7760, endMs: 8050 },
                { word: 'kuntum', startMs: 8060, endMs: 8300 },
                { word: 'bunga.', startMs: 8310, endMs: 8500 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-04',
              question: {
                en: 'How do fuzzy honeybees help Sofia\'s garden flowers on Day 4?',
                id: 'Bagaimana lebah madu membantu bunga-bunga di kebun Sofia pada Hari ke-4?'
              },
              options: [
                {
                  text: {
                    en: 'They carry golden pollen between blossoms so fruits and seeds can grow',
                    id: 'Membawa serbuk sari antar-bunga sehingga buah dan biji dapat tumbuh'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'They paint the leaves purple with brushes',
                    id: 'Mengecat daun menjadi warna ungu dengan kuas'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'They drink all the water in the stone well',
                    id: 'Meminum habis seluruh air di dalam sumur batu'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Spot on! Pollination by gentle bees helps strawberry blossoms and sunflowers turn into ripe fruit and seeds.',
                id: 'Benar sekali! Penyerbukan oleh lebah membantu bunga stroberi dan bunga matahari berubah menjadi buah yang ranum.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 4: Why Do Sunflowers Follow the Sun?',
              id: 'Aku Ingin Tahu! · Hari 4: Mengapa Bunga Matahari Mengikuti Matahari?'
            },
            wonderQuestion: {
              en: 'How do young sunflowers turn their heads from East to West every day without muscles?',
              id: 'Bagaimana bunga matahari muda bisa menoleh dari Timur ke Barat setiap hari tanpa memiliki otot?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-heliotropism',
                question: {
                  en: 'I Wonder Why: How do sunflowers turn toward sunlight?',
                  id: 'Mengapa Ya: Bagaimana bunga matahari berputar mengikuti mentari?'
                },
                answer: {
                  en: 'During the day, the east side of the sunflower stem grows slightly faster than the west side, gently tilting the flower across the sky (heliotropism)!',
                  id: 'Pada siang hari, sisi timur batang tumbuh sedikit lebih cepat daripada sisi barat sehingga kepala bunga miring mengikuti matahari (heliotropisme)!'
                },
                diagramType: 'sun-photosynthesis'
              },
              {
                id: 'fact-bee-dance',
                question: {
                  en: 'I Wonder Why: How do honeybees tell friends where flowers are?',
                  id: 'Mengapa Ya: Bagaimana lebah memberi tahu temannya lokasi bunga?'
                },
                answer: {
                  en: 'Honeybees perform a figure-eight "Waggle Dance" that points directly toward the angle of the sun and the sweetest garden blossoms!',
                  id: 'Lebah madu melakukan "Tarian Goyangan" berbentuk angka delapan yang menunjukkan arah matahari dan letak kebun bunga!'
                },
                diagramType: 'sound-waves'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 5 (FRIDAY / JUMAT) — CHAPTER 5
        // ====================================================================
        {
          id: 'scene-5',
          chapterNumber: 5,
          dayNumber: 5,
          weekNumber: 1,
          activityCategory: 'muslim-prayer',
          dayOfWeek: { en: 'Friday', id: 'Jumat' },
          leadCharacter: 'kenji',
          title: {
            en: 'Day 5: Kenji\'s Bamboo Canal & Peaceful Rest',
            id: 'Hari 5: Saluran Bambu Kenji & Jeda Siang Damai'
          },
          subtitle: {
            en: 'Friday · Gravity-fed bamboo irrigation and respecting afternoon prayer & rest.',
            id: 'Jumat · Saluran air bambu pintar dan menghormati waktu ibadah serta istirahat siang.'
          },
          modelGlbUrl: 'models/scenes/day5_bamboo_canal.glb',
          cameraInitPosition: [-1.4, 2.8, 6.2],
          cameraTargetPosition: [0, 0.8, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10
          },
          interactables: [
            {
              meshTargetName: 'KenjiMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Kenji to test the bamboo water canal',
                id: 'Ketuk Kenji untuk mengalirkan saluran bambu'
              }
            },
            {
              meshTargetName: 'WellMesh',
              action: 'playSound',
              label: {
                en: 'Tap stone well to draw cool water',
                id: 'Ketuk sumur batu untuk menimba air sejuk'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-bamboo-canal',
              meshTargetName: 'StoneWell',
              title: {
                en: 'Kenji\'s Gravity Bamboo Canal',
                id: 'Saluran Air Bambu Gravitasi Kenji'
              },
              explanation: {
                en: 'Using split bamboo pipes angled slightly downward, Kenji lets gravity carry cool well water directly to thirsty plant roots!',
                id: 'Dengan pipa bambu belah yang dipasang miring, Kenji memanfaatkan gaya gravitasi untuk mengalirkan air sumur langsung ke akar tanaman!'
              },
              icon: 'sprout',
              position3D: [-2.1, 1.45, -1.2]
            },
            {
              id: 'hotspot-prayer-respect',
              meshTargetName: 'GardenBench',
              title: {
                en: 'Respecting Prayer & Rest Times',
                id: 'Menghormati Waktu Ibadah & Istirahat'
              },
              explanation: {
                en: 'On Friday afternoon, the friends pause their work peacefully so Aisyah, Sofia, and Mei-Ling can offer their prayer while everyone refreshes in the shade.',
                id: 'Pada Jumat siang, para sahabat beristirahat dengan tenang untuk menghormati waktu ibadah sembari menikmati keteduhan taman bersama-sama.'
              },
              icon: 'heart',
              position3D: [0.0, 0.9, 0.35]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Friday Afternoon Breeze' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Bamboo Water Channels' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Flowing Water & Shade' }
          ],
          dialogue: {
            en: {
              text: 'On Friday, Kenji connected split bamboo channels from the stone well, and when afternoon prayer time arrived, the friends rested together in peaceful harmony.',
              audioStartMs: 0,
              audioEndMs: 8600,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Friday,', startMs: 260, endMs: 800 },
                { word: 'Kenji', startMs: 810, endMs: 1350 },
                { word: 'connected', startMs: 1360, endMs: 1950 },
                { word: 'split', startMs: 1960, endMs: 2350 },
                {
                  word: 'bamboo',
                  startMs: 2360,
                  endMs: 2900,
                  isVocab: true,
                  definition: {
                    en: 'A fast-growing, hollow woody grass used across Asia to build bridges, flutes, and water pipes.',
                    id: 'Tanaman berongga yang kuat dan ramah lingkungan untuk saluran air maupun alat musik.'
                  },
                  phonics: {
                    en: '[bam-BOO]',
                    id: '[BAM-boo]'
                  }
                },
                { word: 'channels', startMs: 2910, endMs: 3450 },
                { word: 'from', startMs: 3460, endMs: 3700 },
                { word: 'the', startMs: 3710, endMs: 3900 },
                { word: 'stone', startMs: 3910, endMs: 4300 },
                { word: 'well,', startMs: 4310, endMs: 4700 },
                { word: 'and', startMs: 4710, endMs: 4950 },
                { word: 'when', startMs: 4960, endMs: 5250 },
                { word: 'afternoon', startMs: 5260, endMs: 5850 },
                { word: 'prayer', startMs: 5860, endMs: 6300 },
                { word: 'time', startMs: 6310, endMs: 6650 },
                { word: 'arrived,', startMs: 6660, endMs: 7150 },
                { word: 'the', startMs: 7160, endMs: 7350 },
                { word: 'friends', startMs: 7360, endMs: 7750 },
                { word: 'rested', startMs: 7760, endMs: 8100 },
                { word: 'in', startMs: 8110, endMs: 8250 },
                {
                  word: 'harmony.',
                  startMs: 8260,
                  endMs: 8600,
                  isVocab: true,
                  definition: {
                    en: 'Living and working side by side in peaceful friendship and mutual respect.',
                    id: 'Hidup berdampingan dengan rukun, damai, dan saling menghormati.'
                  },
                  phonics: {
                    en: '[HAHR-muh-nee]',
                    id: '[har-MO-nee]'
                  }
                }
              ]
            },
            id: {
              text: 'Pada hari Jumat, Kenji merangkai saluran bambu dari sumur batu, lalu saat waktu ibadah siang tiba, para sahabat beristirahat bersama dalam harmoni yang damai.',
              audioStartMs: 0,
              audioEndMs: 8600,
              words: [
                { word: 'Pada', startMs: 0, endMs: 300 },
                { word: 'hari', startMs: 310, endMs: 600 },
                { word: 'Jumat,', startMs: 610, endMs: 1100 },
                { word: 'Kenji', startMs: 1110, endMs: 1600 },
                { word: 'merangkai', startMs: 1610, endMs: 2200 },
                { word: 'saluran', startMs: 2210, endMs: 2700 },
                {
                  word: 'bambu',
                  startMs: 2710,
                  endMs: 3200,
                  isVocab: true,
                  definition: {
                    en: 'A fast-growing, hollow woody grass used across Asia to build bridges, flutes, and water pipes.',
                    id: 'Tanaman berongga yang kuat dan ramah lingkungan untuk saluran air maupun alat musik.'
                  },
                  phonics: {
                    en: '[bam-BOO]',
                    id: '[BAM-boo]'
                  }
                },
                { word: 'dari', startMs: 3210, endMs: 3500 },
                { word: 'sumur', startMs: 3510, endMs: 3900 },
                { word: 'batu,', startMs: 3910, endMs: 4350 },
                { word: 'lalu', startMs: 4360, endMs: 4650 },
                { word: 'saat', startMs: 4660, endMs: 4950 },
                { word: 'waktu', startMs: 4960, endMs: 5350 },
                { word: 'ibadah', startMs: 5360, endMs: 5850 },
                { word: 'siang', startMs: 5860, endMs: 6250 },
                { word: 'tiba,', startMs: 6260, endMs: 6650 },
                { word: 'para', startMs: 6660, endMs: 6950 },
                { word: 'sahabat', startMs: 6960, endMs: 7450 },
                { word: 'beristirahat', startMs: 7460, endMs: 8050 },
                { word: 'dalam', startMs: 8060, endMs: 8250 },
                {
                  word: 'harmoni.',
                  startMs: 8260,
                  endMs: 8600,
                  isVocab: true,
                  definition: {
                    en: 'Living and working side by side in peaceful friendship and mutual respect.',
                    id: 'Kerukunan dan keselarasan indah antar-sahabat yang saling menghargai.'
                  },
                  phonics: {
                    en: '[HAHR-muh-nee]',
                    id: '[har-MO-nee]'
                  }
                }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-05',
              question: {
                en: 'How did the friends show interfaith respect on Day 5 (Friday)?',
                id: 'Bagaimana para sahabat menunjukkan sikap toleransi pada Hari ke-5 (Jumat)?'
              },
              options: [
                {
                  text: {
                    en: 'They paused happily in the shade to respect prayer time and rest together',
                    id: 'Beristirahat dengan tenang di tempat teduh untuk menghormati waktu ibadah bersama'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'They made loud noises to hurry everyone up',
                    id: 'Membuat suara gaduh agar teman-teman terburu-buru'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'They knocked down Kenji\'s bamboo water pipe',
                    id: 'Merobohkan pipa saluran bambu buatan Kenji'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Heartwarming! True friends respect each other\'s prayer and rest times with kindness and peace.',
                id: 'Indah sekali! Sahabat sejati saling menghormati waktu ibadah dan beristirahat dengan penuh kasih sayang.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 5: How Does Gravity Move Water Without a Pump?',
              id: 'Aku Ingin Tahu! · Hari 5: Bagaimana Gravitasi Mengalirkan Air Tanpa Pompa?'
            },
            wonderQuestion: {
              en: 'How can hollow bamboo stems carry water across a whole garden without electricity?',
              id: 'Bagaimana batang bambu berongga bisa mengalirkan air ke seluruh kebun tanpa listrik?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-gravity-aqueduct',
                question: {
                  en: 'I Wonder Why: Why does water always flow downhill?',
                  id: 'Mengapa Ya: Mengapa air selalu mengalir dari tempat tinggi ke rendah?'
                },
                answer: {
                  en: 'Earth\'s gravity pulls water molecules downward! By tilting bamboo pipes just a few degrees, farmers create natural aqueducts.',
                  id: 'Gravitasi bumi menarik molekul air ke bawah! Dengan memiringkan bambu sedikit saja, air mengalir lancar ke seluruh petak kebun.'
                },
                diagramType: 'water-cycle'
              },
              {
                id: 'fact-bamboo-strength',
                question: {
                  en: 'I Wonder Why: Why is bamboo stronger than steel by weight?',
                  id: 'Mengapa Ya: Mengapa bambu sangat lentur namun amat kuat?'
                },
                answer: {
                  en: 'Bamboo stems are hollow tubes reinforced by solid ring joints (nodes), making them super lightweight, flexible in wind, and waterproof!',
                  id: 'Batang bambu berbentuk tabung berongga dengan sekat ruas yang kokoh, menjadikannya ringan, lentur tertiup angin, dan tahan air!'
                },
                diagramType: 'seed-roots'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 6 (SATURDAY / SABTU) — CHAPTER 6
        // ====================================================================
        {
          id: 'scene-6',
          chapterNumber: 6,
          dayNumber: 6,
          weekNumber: 1,
          activityCategory: 'gardening',
          dayOfWeek: { en: 'Saturday', id: 'Sabtu' },
          leadCharacter: 'mei',
          title: {
            en: 'Day 6: Mei-Ling\'s Harvest & Shared Baskets',
            id: 'Hari 6: Panen Raya Mei-Ling & Keranjang Berbagi'
          },
          subtitle: {
            en: 'Saturday · Picking ripe strawberries, fragrant ginger, and sharing with elders.',
            id: 'Sabtu · Memetik stroberi merah ranum, rimpang jahe harum, dan berbagi ke tetangga.'
          },
          modelGlbUrl: 'models/scenes/day6_harvest.glb',
          cameraInitPosition: [1.3, 2.75, 6.1],
          cameraTargetPosition: [0, 0.85, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10
          },
          interactables: [
            {
              meshTargetName: 'MeiMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Mei-Ling to gather ripe herbs and strawberries',
                id: 'Ketuk Mei-Ling untuk memanen stroberi dan jahe'
              }
            },
            {
              meshTargetName: 'ShippingBinMesh',
              action: 'collectStar',
              label: {
                en: 'Tap harvest bin to pack baskets for neighbors',
                id: 'Ketuk peti panen untuk berbagi kepada warga'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-mei-hijab',
              meshTargetName: 'MeiMesh',
              title: {
                en: 'Mei-Ling\'s Twin Silk Buns & Plum Blossom Pin',
                id: 'Sanggul Sutra Kembar & Pin Bunga Prem Mei-Ling'
              },
              explanation: {
                en: 'Mei-Ling styles her glossy hair in twin silk-ribbon buns adorned with a five-petal golden plum blossom pin, honoring her East Asian botanical heritage.',
                id: 'Mei-Ling menata rambutnya dengan sanggul kembar berpita sutra koral dan pin bunga prem lima kelopak keemasan khas tradisi Asia Timur.'
              },
              icon: 'sparkles',
              position3D: [2.1, 1.75, -0.25]
            },
            {
              id: 'hotspot-harvest-bin',
              meshTargetName: 'ShippingBin',
              title: {
                en: 'Community Sharing Basket',
                id: 'Keranjang Panen Berbagi'
              },
              explanation: {
                en: 'On Saturday, the friends fill woven baskets with ripe red strawberries, ginger, and sunflowers to gift to neighborhood grandparents!',
                id: 'Pada hari Sabtu, para sahabat mengisi keranjang dengan stroberi matang dan jahe segar untuk dibagikan kepada kakek-nenek tetangga!'
              },
              icon: 'heart',
              position3D: [2.1, 1.25, -1.1]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Golden Saturday Morning' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Ripe Harvest Baskets' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Strawberries & Ginger' }
          ],
          dialogue: {
            en: {
              text: 'On Saturday morning, Mei-Ling and Amara gathered the ripe harvest into woven baskets, brewing warm ginger tea to share with grateful neighbors.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Saturday', startMs: 260, endMs: 800 },
                { word: 'morning,', startMs: 810, endMs: 1300 },
                { word: 'Mei-Ling', startMs: 1310, endMs: 1900 },
                { word: 'and', startMs: 1910, endMs: 2150 },
                { word: 'Amara', startMs: 2160, endMs: 2650 },
                { word: 'gathered', startMs: 2660, endMs: 3200 },
                { word: 'the', startMs: 3210, endMs: 3400 },
                { word: 'ripe', startMs: 3410, endMs: 3800 },
                {
                  word: 'harvest',
                  startMs: 3810,
                  endMs: 4400,
                  isVocab: true,
                  definition: {
                    en: 'The joyful time of gathering ripe fruits, vegetables, and herbs from the garden.',
                    id: 'Hasil tanaman yang telah matang dan dipetik bersama-sama dengan penuh syukur.'
                  },
                  phonics: {
                    en: '[HAHR-vist]',
                    id: '[PAH-nen]'
                  }
                },
                { word: 'into', startMs: 4410, endMs: 4750 },
                { word: 'woven', startMs: 4760, endMs: 5200 },
                { word: 'baskets,', startMs: 5210, endMs: 5750 },
                { word: 'brewing', startMs: 5760, endMs: 6250 },
                { word: 'warm', startMs: 6260, endMs: 6600 },
                { word: 'ginger', startMs: 6610, endMs: 7050 },
                { word: 'tea', startMs: 7060, endMs: 7350 },
                { word: 'to', startMs: 7360, endMs: 7550 },
                { word: 'share', startMs: 7560, endMs: 7900 },
                { word: 'with', startMs: 7910, endMs: 8100 },
                {
                  word: 'grateful',
                  startMs: 8110,
                  endMs: 8350,
                  isVocab: true,
                  definition: {
                    en: 'Feeling warm thankfulness and appreciation in your heart.',
                    id: 'Perasaan bersyukur dan berterima kasih yang tulus di dalam hati.'
                  },
                  phonics: {
                    en: '[GRAYT-fuhl]',
                    id: '[ber-SYOO-kur]'
                  }
                },
                { word: 'neighbors.', startMs: 8360, endMs: 8500 }
              ]
            },
            id: {
              text: 'Pada Sabtu pagi, Mei-Ling dan Amara mengumpulkan hasil panen ranum ke keranjang anyaman, lalu menyeduh teh jahe hangat untuk dibagikan penuh syukur.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 300 },
                { word: 'Sabtu', startMs: 310, endMs: 750 },
                { word: 'pagi,', startMs: 760, endMs: 1200 },
                { word: 'Mei-Ling', startMs: 1210, endMs: 1800 },
                { word: 'dan', startMs: 1810, endMs: 2050 },
                { word: 'Amara', startMs: 2060, endMs: 2550 },
                { word: 'mengumpulkan', startMs: 2560, endMs: 3300 },
                { word: 'hasil', startMs: 3310, endMs: 3650 },
                {
                  word: 'panen',
                  startMs: 3660,
                  endMs: 4150,
                  isVocab: true,
                  definition: {
                    en: 'The joyful time of gathering ripe fruits, vegetables, and herbs from the garden.',
                    id: 'Hasil tanaman yang telah matang dan siap dipetik bersama-sama.'
                  },
                  phonics: {
                    en: '[HAHR-vist]',
                    id: '[PAH-nen]'
                  }
                },
                { word: 'ranum', startMs: 4160, endMs: 4600 },
                { word: 'ke', startMs: 4610, endMs: 4800 },
                { word: 'keranjang', startMs: 4810, endMs: 5400 },
                { word: 'anyaman,', startMs: 5410, endMs: 5950 },
                { word: 'lalu', startMs: 5960, endMs: 6250 },
                { word: 'menyeduh', startMs: 6260, endMs: 6800 },
                { word: 'teh', startMs: 6810, endMs: 7100 },
                { word: 'jahe', startMs: 7110, endMs: 7450 },
                { word: 'hangat', startMs: 7460, endMs: 7850 },
                { word: 'penuh', startMs: 7860, endMs: 8150 },
                {
                  word: 'syukur.',
                  startMs: 8160,
                  endMs: 8500,
                  isVocab: true,
                  definition: {
                    en: 'Feeling warm thankfulness and appreciation in your heart.',
                    id: 'Rasa terima kasih dan bahagia atas karunia Tuhan dan kebaikan sesama.'
                  },
                  phonics: {
                    en: '[GRAT-ih-tood]',
                    id: '[SYOO-kur]'
                  }
                }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-06',
              question: {
                en: 'What did Mei-Ling and her friends do with the ripe harvest on Day 6 (Saturday)?',
                id: 'Apa yang dilakukan Mei-Ling dan sahabatnya dengan hasil panen pada Hari ke-6 (Sabtu)?'
              },
              options: [
                {
                  text: {
                    en: 'They packed baskets and shared fresh produce and warm ginger tea with neighbors',
                    id: 'Mengemas keranjang panen dan berbagi teh jahe hangat kepada tetangga'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'They left all the ripe fruit to rot on the ground',
                    id: 'Membiarkan seluruh buah matang membusuk di tanah'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'They locked the garden gate so no one could visit',
                    id: 'Mengunci gerbang taman rapat-rapat'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Awesome! Sharing the harvest brings neighbors together and multiplies joy across the whole community.',
                id: 'Luar biasa! Berbagi hasil panen mempererat persaudaraan dan melipatgandakan kebahagiaan warga.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 6: Why Do Strawberries Turn Bright Red & Sweet?',
              id: 'Aku Ingin Tahu! · Hari 6: Mengapa Stroberi Berubah Merah Cerah & Manis?'
            },
            wonderQuestion: {
              en: 'Why are unripe fruits green and sour at first, then turn bright red and fragrant when ripe?',
              id: 'Mengapa buah yang belum matang berwarna hijau dan asam, lalu berubah merah harum saat matang?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-fruit-ripening',
                question: {
                  en: 'I Wonder Why: Why do fruits change color when ripe?',
                  id: 'Mengapa Ya: Mengapa buah berubah warna saat matang?'
                },
                answer: {
                  en: 'As seeds inside mature, the plant breaks down green chlorophyll and creates red anthocyanin pigments while turning starch into sweet sugar!',
                  id: 'Saat biji di dalamnya siap, tanaman mengubah zat pati menjadi gula manis dan membentuk pigmen merah antosianin yang kaya vitamin!'
                },
                diagramType: 'sun-photosynthesis'
              },
              {
                id: 'fact-ginger-rhizome',
                question: {
                  en: 'I Wonder Why: Is ginger a root or an underground stem?',
                  id: 'Mengapa Ya: Apakah jahe itu akar atau batang bawah tanah?'
                },
                answer: {
                  en: 'Surprise! Ginger is actually a rhizome—an underground stem that stores warm aromatic oils (gingerol) and sprouts new shoots!',
                  id: 'Kejutan! Jahe sebenarnya adalah rimpang (rhizoma)—batang bawah tanah yang menyimpan minyak hangat alami (gingerol)!'
                },
                diagramType: 'seed-roots'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 7 (SUNDAY / MINGGU) — CHAPTER 7 (1-WEEK FINALE!)
        // ====================================================================
        {
          id: 'scene-7',
          chapterNumber: 7,
          dayNumber: 7,
          weekNumber: 1,
          activityCategory: 'gardening',
          dayOfWeek: { en: 'Sunday', id: 'Minggu' },
          leadCharacter: 'aisyah',
          title: {
            en: 'Day 7: Starlight Lantern Festival of One Week',
            id: 'Hari 7: Festival Lentera Bintang Akhir Pekan'
          },
          subtitle: {
            en: 'Sunday Finale · Six friends, glowing cultural lanterns, and one peaceful sky.',
            id: 'Minggu Malam · Enam sahabat, lentera budaya yang bersinar, dan satu langit damai.'
          },
          modelGlbUrl: 'models/scenes/day7_lantern_festival.glb',
          cameraInitPosition: [0, 3.1, 6.8],
          cameraTargetPosition: [0, 0.9, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.8,
            maxDistance: 11
          },
          interactables: [
            {
              meshTargetName: 'AisyahMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Aisyah to light the Damar Kurung lantern',
                id: 'Ketuk Aisyah untuk menyalakan lentera Damar Kurung'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to play the Sunday Festival song',
                id: 'Ketuk Mateo untuk memainkan lagu Festival Minggu'
              }
            },
            {
              meshTargetName: 'FestivalGardenBed',
              action: 'collectStar',
              label: {
                en: 'Tap glowing blossoms to celebrate Week 1!',
                id: 'Ketuk bunga bercahaya untuk merayakan Minggu ke-1!'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-lanterns',
              meshTargetName: 'FestivalLanterns',
              title: {
                en: 'Lanterns of Many Cultures',
                id: 'Lentera Persahabatan Lintas Budaya'
              },
              explanation: {
                en: 'To celebrate Day 7, the friends hang Indonesian Damar Kurung, Japanese Chōchin, Chinese silk lanterns, and Nordic star lamps side by side!',
                id: 'Untuk merayakan Hari ke-7, enam sahabat menggantung lentera Damar Kurung Nusantara, lentera kertas Jepang, lampion sutra, dan bintang Nordik berdampingan!'
              },
              icon: 'sparkles',
              position3D: [-1.2, 1.9, 0.35]
            },
            {
              id: 'hotspot-full-bloom',
              meshTargetName: 'BloomingGardenCenter',
              title: {
                en: 'One Full Week of Growth!',
                id: 'Satu Minggu Pertumbuhan yang Mekar!'
              },
              explanation: {
                en: 'In just one week (7 days) of teamwork, patience, and kindness, an empty lot transformed into a thriving sanctuary for plants, bees, and friends.',
                id: 'Hanya dalam satu minggu (7 hari) penuh kerja sama, kesabaran, dan kasih sayang, lahan kosong berubah menjadi taman asri yang mekar sempurna.'
              },
              icon: 'sun',
              position3D: [0.0, 1.0, 0.1]
            },
            {
              id: 'hotspot-unity-song',
              meshTargetName: 'EnsembleCircle',
              title: {
                en: 'Bhinneka Tunggal Ika (Unity in Diversity)',
                id: 'Bhinneka Tunggal Ika (Berbeda-beda tetapi Satu)'
              },
              explanation: {
                en: 'Like different flowers in one garden or different notes in one song, our diverse backgrounds and faiths make our world brighter when united in peace.',
                id: 'Bagaikan aneka bunga di satu taman atau beragam nada dalam satu lagu, perbedaan budaya dan keyakinan membuat dunia semakin indah saat bersatu dalam damai.'
              },
              icon: 'music',
              position3D: [1.4, 1.6, 0.2]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Starlit Sunday Festival Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Glowing Cultural Lanterns' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Six Friends Celebrating' }
          ],
          dialogue: {
            en: {
              text: 'On Day Seven, Sunday evening, Aisyah, Mateo, Sofia, Mei-Ling, Kenji, and Amara lit colorful lanterns, celebrating one full week of friendship and unity!',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 550 },
                { word: 'Seven,', startMs: 560, endMs: 1000 },
                { word: 'Sunday', startMs: 1010, endMs: 1450 },
                { word: 'evening,', startMs: 1460, endMs: 1950 },
                { word: 'Aisyah,', startMs: 1960, endMs: 2450 },
                { word: 'Mateo,', startMs: 2460, endMs: 2950 },
                { word: 'Sofia,', startMs: 2960, endMs: 3450 },
                { word: 'Mei-Ling,', startMs: 3460, endMs: 4000 },
                { word: 'Kenji,', startMs: 4010, endMs: 4450 },
                { word: 'and', startMs: 4460, endMs: 4650 },
                { word: 'Amara', startMs: 4660, endMs: 5150 },
                { word: 'lit', startMs: 5160, endMs: 5450 },
                { word: 'colorful', startMs: 5460, endMs: 6000 },
                {
                  word: 'lanterns,',
                  startMs: 6010,
                  endMs: 6600,
                  isVocab: true,
                  definition: {
                    en: 'Decorative lamps made of paper, wood, or glass that shine warm light in the evening.',
                    id: 'Lampu hias bercahaya hangat yang melambangkan harapan dan persaudaraan.'
                  },
                  phonics: {
                    en: '[LAN-ternz]',
                    id: '[len-TEH-ra]'
                  }
                },
                { word: 'celebrating', startMs: 6610, endMs: 7250 },
                { word: 'one', startMs: 7260, endMs: 7500 },
                { word: 'full', startMs: 7510, endMs: 7750 },
                { word: 'week', startMs: 7760, endMs: 8050 },
                { word: 'of', startMs: 8060, endMs: 8200 },
                { word: 'friendship', startMs: 8210, endMs: 8500 },
                { word: 'and', startMs: 8510, endMs: 8620 },
                {
                  word: 'unity!',
                  startMs: 8630,
                  endMs: 8800,
                  isVocab: true,
                  definition: {
                    en: 'Standing together as one caring family even when we come from different cultures and traditions.',
                    id: 'Persatuan yang erat dan hangat meskipun berasal dari budaya serta tradisi yang beragam.'
                  },
                  phonics: {
                    en: '[YOO-nih-tee]',
                    id: '[per-SAH-too-an]'
                  }
                }
              ]
            },
            id: {
              text: 'Pada Hari Ketujuh, Minggu malam, Aisyah, Mateo, Sofia, Mei-Ling, Kenji, dan Amara menyalakan lentera warna-warni, merayakan satu minggu persahabatan dan persatuan!',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Ketujuh,', startMs: 610, endMs: 1100 },
                { word: 'Minggu', startMs: 1110, endMs: 1550 },
                { word: 'malam,', startMs: 1560, endMs: 2000 },
                { word: 'Aisyah,', startMs: 2010, endMs: 2500 },
                { word: 'Mateo,', startMs: 2510, endMs: 3000 },
                { word: 'Sofia,', startMs: 3010, endMs: 3500 },
                { word: 'Mei-Ling,', startMs: 3510, endMs: 4050 },
                { word: 'Kenji,', startMs: 4060, endMs: 4500 },
                { word: 'dan', startMs: 4510, endMs: 4750 },
                { word: 'Amara', startMs: 4760, endMs: 5250 },
                { word: 'menyalakan', startMs: 5260, endMs: 5900 },
                {
                  word: 'lentera',
                  startMs: 5910,
                  endMs: 6450,
                  isVocab: true,
                  definition: {
                    en: 'Decorative lamps made of paper, wood, or glass that shine warm light in the evening.',
                    id: 'Lampu hias bercahaya hangat yang melambangkan harapan dan persaudaraan.'
                  },
                  phonics: {
                    en: '[LAN-ternz]',
                    id: '[len-TEH-ra]'
                  }
                },
                { word: 'warna-warni,', startMs: 6460, endMs: 7100 },
                { word: 'merayakan', startMs: 7110, endMs: 7650 },
                { word: 'satu', startMs: 7660, endMs: 7900 },
                { word: 'minggu', startMs: 7910, endMs: 8200 },
                { word: 'persahabatan', startMs: 8210, endMs: 8520 },
                { word: 'dan', startMs: 8530, endMs: 8620 },
                {
                  word: 'persatuan!',
                  startMs: 8630,
                  endMs: 8800,
                  isVocab: true,
                  definition: {
                    en: 'Standing together as one caring family even when we come from different cultures and traditions.',
                    id: 'Ikatan rukun dan damai yang menyatukan keberagaman budaya serta agama.'
                  },
                  phonics: {
                    en: '[YOO-nih-tee]',
                    id: '[per-SAH-too-an]'
                  }
                }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-07',
              question: {
                en: 'What did the six friends discover at the end of their 7-Day (1-Week) garden journey?',
                id: 'Apa pelajaran terindah yang ditemukan enam sahabat di akhir perjalanan 7 Hari (1 Minggu) mereka?'
              },
              options: [
                {
                  text: {
                    en: 'Diverse seeds and diverse friends create the brightest, most harmonious garden together!',
                    id: 'Aneka benih dan ragam sahabat menciptakan taman kehidupan yang paling indah dan harmonis!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'Only one kind of flower should ever be planted',
                    id: 'Hanya satu jenis tanaman saja yang boleh ditanam'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Gardens grow best when nobody waters or cares for them',
                    id: 'Kebun tumbuh paling subur jika tidak pernah disiram'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Congratulations on completing Week 1! Just like a garden of many flowers, our world flourishes through interfaith harmony, science curiosity, and kindness.',
                id: 'Selamat menyelesaikan Seri 1 Minggu! Bagaikan taman penuh aneka bunga, dunia kita mekar indah lewat kerukunan, rasa ingin tahu sains, dan kasih sayang.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 7: Why Do Fireflies & Lanterns Glow in the Dark?',
              id: 'Aku Ingin Tahu! · Hari 7: Mengapa Kunang-Kunang & Lentera Bersinar di Malam Hari?'
            },
            wonderQuestion: {
              en: 'How can tiny fireflies make warm golden light in their tummies without burning themselves?',
              id: 'Bagaimana kunang-kunang kecil bisa menghasilkan cahaya keemasan di tubuhnya tanpa terasa panas?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-bioluminescence',
                question: {
                  en: 'I Wonder Why: How do fireflies make "cold light"?',
                  id: 'Mengapa Ya: Bagaimana kunang-kunang membuat cahaya dingin?'
                },
                answer: {
                  en: 'Fireflies mix oxygen with a special molecule called luciferin inside their lanterns—creating 100% efficient bioluminescent light with zero heat!',
                  id: 'Kunang-kunang mencampurkan oksigen dengan zat lusiferin di tubuhnya—menghasilkan cahaya bioluminesensi yang indah tanpa panas sedikit pun!'
                },
                diagramType: 'sun-photosynthesis'
              },
              {
                id: 'fact-harmony-symphony',
                question: {
                  en: 'I Wonder Why: Why do different musical notes sound so sweet together?',
                  id: 'Mengapa Ya: Mengapa nada-nada yang berbeda terdengar merdu saat berpadu?'
                },
                answer: {
                  en: 'When different sound frequencies align in mathematical ratios (chords), their waves lock into smooth harmony—just like diverse friends working together!',
                  id: 'Saat frekuensi suara yang berbeda berpadu selaras (akor), gelombangnya menciptakan harmoni merdu—persis seperti persahabatan lintas budaya!'
                },
                diagramType: 'sound-waves'
              }
            ]
          }
        },

        // ====================================================================
        // WEEK 2: STUDY, SANCTUARY ZOO & PEACEFUL MUSLIM PRAYER (DAYS 8–14)
        // ====================================================================

        // ====================================================================
        // DAY 8 (MONDAY · WEEK 2 / SENIN MINGGU 2) — CHAPTER 8 (STUDY & LEARNING)
        // ====================================================================
        {
          id: 'scene-8',
          chapterNumber: 8,
          dayNumber: 8,
          weekNumber: 2,
          activityCategory: 'study-learning',
          dayOfWeek: { en: 'Monday (Wk 2)', id: 'Senin (Mgg 2)' },
          leadCharacter: 'aisyah',
          title: {
            en: 'Day 8: Classroom Smartboard & Nature Encyclopedia',
            id: 'Hari 8: Belajar di Kelas Pintar & Ensiklopedia Alam'
          },
          subtitle: {
            en: 'Week 2 Monday · Studying animal habitats and botany before our Sanctuary Zoo trip!',
            id: 'Senin Minggu 2 · Belajar habitat satwa dan botani di papan pintar sebelum ke Taman Satwa!'
          },
          modelGlbUrl: 'models/scenes/day8_study_classroom.glb',
          cameraInitPosition: [0, 3.0, 6.5],
          cameraTargetPosition: [0, 1.0, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'SmartboardMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Classroom Smartboard to study animal & plant science',
                id: 'Ketuk Papan Pintar Kelas untuk belajar sains satwa & tanaman'
              }
            },
            {
              meshTargetName: 'AisyahMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Aisyah to read the Nature Encyclopedia',
                id: 'Ketuk Aisyah untuk membaca Ensiklopedia Alam'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-smartboard-study',
              meshTargetName: 'ClassroomSmartboard',
              title: {
                en: 'Montessori Interactive Study Board',
                id: 'Papan Pintar Belajar Sains & Zoologi'
              },
              explanation: {
                en: 'Seeking knowledge (Tholabul Ilmi) is a joyful adventure! On Day 8, the friends use the classroom smartboard to map how plants and zoo animals depend on one another.',
                id: 'Menuntut ilmu adalah petualangan mulia! Pada Hari ke-8, para sahabat memetakan ekosistem tanaman dan satwa di papan pintar kelas.'
              },
              icon: 'book',
              position3D: [0.0, 2.15, -2.5]
            },
            {
              id: 'hotspot-reading-corner',
              meshTargetName: 'RainbowBookshelf',
              title: {
                en: 'Bilingual Science & Story Library',
                id: 'Perpustakaan Buku Sains Dwibahasa'
              },
              explanation: {
                en: 'Reading books in both Indonesian and English exercises two parts of the brain at once, helping children understand friends all around the world!',
                id: 'Membaca buku dalam Bahasa Indonesia dan Inggris melatih daya ingat sekaligus membuka jendela pengetahuan dunia!'
              },
              icon: 'sparkles',
              position3D: [-2.1, 1.65, -0.5]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Montessori Study Classroom' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Smartboard & Encyclopedia' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Study Journals & Books' }
          ],
          dialogue: {
            en: {
              text: 'On Day Eight, Aisyah and Kenji opened the big Nature Encyclopedia by the classroom smartboard, eager to study how plants nourish gentle zoo animals.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 550 },
                { word: 'Eight,', startMs: 560, endMs: 950 },
                { word: 'Aisyah', startMs: 960, endMs: 1450 },
                { word: 'and', startMs: 1460, endMs: 1700 },
                { word: 'Kenji', startMs: 1710, endMs: 2150 },
                { word: 'opened', startMs: 2160, endMs: 2650 },
                { word: 'the', startMs: 2660, endMs: 2850 },
                { word: 'big', startMs: 2860, endMs: 3150 },
                { word: 'Nature', startMs: 3160, endMs: 3650 },
                {
                  word: 'Encyclopedia',
                  startMs: 3660,
                  endMs: 4400,
                  isVocab: true,
                  definition: {
                    en: 'A treasure book filled with scientific facts about animals, plants, stars, and history.',
                    id: 'Buku ilmu pengetahuan lengkap yang memuat fakta menarik tentang alam, satwa, dan sains.'
                  },
                  phonics: {
                    en: '[en-sy-kluh-PEE-dee-uh]',
                    id: '[en-si-klo-PE-di-a]'
                  }
                },
                { word: 'by', startMs: 4410, endMs: 4650 },
                { word: 'the', startMs: 4660, endMs: 4850 },
                { word: 'classroom', startMs: 4860, endMs: 5400 },
                { word: 'smartboard,', startMs: 5410, endMs: 6050 },
                { word: 'eager', startMs: 6060, endMs: 6400 },
                { word: 'to', startMs: 6410, endMs: 6550 },
                {
                  word: 'study',
                  startMs: 6560,
                  endMs: 7000,
                  isVocab: true,
                  definition: {
                    en: 'Reading, observing, and asking questions to learn new wisdom and skills.',
                    id: 'Kegiatan membaca, mengamati, dan memahami ilmu pengetahuan dengan tekun.'
                  },
                  phonics: {
                    en: '[STUD-ee]',
                    id: '[be-LA-jar]'
                  }
                },
                { word: 'how', startMs: 7010, endMs: 7250 },
                { word: 'plants', startMs: 7260, endMs: 7600 },
                { word: 'nourish', startMs: 7610, endMs: 7950 },
                { word: 'gentle', startMs: 7960, endMs: 8200 },
                { word: 'zoo', startMs: 8210, endMs: 8350 },
                { word: 'animals.', startMs: 8360, endMs: 8500 }
              ]
            },
            id: {
              text: 'Pada Hari Kedelapan, Aisyah dan Kenji membuka Ensiklopedia Alam di dekat papan pintar kelas, bersemangat belajar bagaimana tanaman memberi makan satwa.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 300 },
                { word: 'Hari', startMs: 310, endMs: 650 },
                { word: 'Kedelapan,', startMs: 660, endMs: 1250 },
                { word: 'Aisyah', startMs: 1260, endMs: 1750 },
                { word: 'dan', startMs: 1760, endMs: 2000 },
                { word: 'Kenji', startMs: 2010, endMs: 2500 },
                { word: 'membuka', startMs: 2510, endMs: 3050 },
                {
                  word: 'Ensiklopedia',
                  startMs: 3060,
                  endMs: 3800,
                  isVocab: true,
                  definition: {
                    en: 'A treasure book filled with scientific facts about animals, plants, stars, and history.',
                    id: 'Buku ilmu pengetahuan lengkap yang memuat fakta menarik tentang alam, satwa, dan sains.'
                  },
                  phonics: {
                    en: '[en-sy-kluh-PEE-dee-uh]',
                    id: '[en-si-klo-PE-di-a]'
                  }
                },
                { word: 'Alam', startMs: 3810, endMs: 4200 },
                { word: 'di', startMs: 4210, endMs: 4400 },
                { word: 'dekat', startMs: 4410, endMs: 4800 },
                { word: 'papan', startMs: 4810, endMs: 5200 },
                { word: 'pintar', startMs: 5210, endMs: 5650 },
                { word: 'kelas,', startMs: 5660, endMs: 6150 },
                { word: 'bersemangat', startMs: 6160, endMs: 6800 },
                {
                  word: 'belajar',
                  startMs: 6810,
                  endMs: 7350,
                  isVocab: true,
                  definition: {
                    en: 'Reading, observing, and asking questions to learn new wisdom and skills.',
                    id: 'Berusaha memperoleh kepandaian dan ilmu pengetahuan dengan penuh semangat.'
                  },
                  phonics: {
                    en: '[STUD-ee]',
                    id: '[be-LA-jar]'
                  }
                },
                { word: 'bagaimana', startMs: 7360, endMs: 7800 },
                { word: 'tanaman', startMs: 7810, endMs: 8100 },
                { word: 'menutrisi', startMs: 8110, endMs: 8350 },
                { word: 'satwa.', startMs: 8360, endMs: 8500 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-08',
              question: {
                en: 'Why did Aisyah and Kenji study the Nature Encyclopedia on Day 8 before visiting the Zoo?',
                id: 'Mengapa Aisyah dan Kenji mempelajari Ensiklopedia Alam pada Hari ke-8 sebelum ke Taman Satwa?'
              },
              options: [
                {
                  text: {
                    en: 'To understand how plants, water, and habitats keep animals healthy and happy!',
                    id: 'Untuk memahami bagaimana tanaman, air, dan habitat menjaga kesehatan satwa!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'To teach giraffes how to ride bicycles',
                    id: 'Untuk mengajari jerapah naik sepeda'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Because they wanted to tear out the pages for paper airplanes',
                    id: 'Untuk melipat halaman buku menjadi pesawat kertas'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Brilliant! Studying first helps us observe animals with deeper respect, curiosity, and scientific care.',
                id: 'Cerdas sekali! Belajar terlebih dahulu membantu kita mengamati dan menyayangi satwa dengan ilmu yang benar.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 8: How Does Reading Grow New Brain Pathways?',
              id: 'Aku Ingin Tahu! · Hari 8: Bagaimana Membaca & Belajar Menumbuhkan Jaringan Otak?'
            },
            wonderQuestion: {
              en: 'Why does learning a new word in two languages light up our brain like a constellation of stars?',
              id: 'Mengapa mempelajari kata baru dalam dua bahasa membuat sel-sel otak kita bersinar seperti rasi bintang?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-brain-synapse',
                question: {
                  en: 'I Wonder Why: How does studying make our brain stronger?',
                  id: 'Mengapa Ya: Bagaimana belajar memperkuat otak kita?'
                },
                answer: {
                  en: 'Every time you read and ask "Why?", neurons in your brain build new bridges called synapses—just like roots branching in fertile soil!',
                  id: 'Setiap kali kamu membaca dan bertanya "Mengapa?", sel neuron di otak membangun jembatan baru bernama sinapsis—mirip akar yang bercabang subur!'
                },
                diagramType: 'seed-roots'
              },
              {
                id: 'fact-food-web',
                question: {
                  en: 'I Wonder Why: How do garden plants connect to zoo animals?',
                  id: 'Mengapa Ya: Bagaimana tanaman kebun terhubung dengan hewan di Taman Satwa?'
                },
                answer: {
                  en: 'Plants capture sunlight energy to grow leaves and fruits, which feed herbivore animals like deer, rabbits, giraffes, and elephants!',
                  id: 'Tanaman menangkap energi matahari untuk menumbuhkan daun dan buah yang menjadi makanan sehat bagi satwa herbivora seperti rusa, kelinci, dan jerapah!'
                },
                diagramType: 'zoo-habitat'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 9 (TUESDAY · WEEK 2 / SELASA MINGGU 2) — CHAPTER 9 (MUSLIM PRAYER & WUDHU)
        // ====================================================================
        {
          id: 'scene-9',
          chapterNumber: 9,
          dayNumber: 9,
          weekNumber: 2,
          activityCategory: 'muslim-prayer',
          dayOfWeek: { en: 'Tuesday (Wk 2)', id: 'Selasa (Mgg 2)' },
          leadCharacter: 'sofia',
          title: {
            en: 'Day 9: Cool Wudhu Water & Peaceful Prayer Pavilion',
            id: 'Hari 9: Air Wudhu Sejuk & Shalat Damai di Musholla Taman'
          },
          subtitle: {
            en: 'Week 2 Tuesday · Washing with clean Wudhu water, unrolling the Sajadah, and praying in peace.',
            id: 'Selasa Minggu 2 · Berwudhu dengan air sejuk, menggelar sajadah, dan shalat berjamaah dengan khusyuk.'
          },
          modelGlbUrl: 'models/scenes/day9_prayer_pavilion.glb',
          cameraInitPosition: [-1.2, 2.75, 6.2],
          cameraTargetPosition: [-0.4, 0.85, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'WellMesh',
              action: 'playSound',
              label: {
                en: 'Tap clean water well for refreshing Wudhu ablution',
                id: 'Ketuk sumur air bersih untuk berwudhu'
              }
            },
            {
              meshTargetName: 'SofiaMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Sofia, Aisyah & Mei-Ling on the Sajadah prayer rug',
                id: 'Ketuk Sofia, Aisyah & Mei-Ling di atas sajadah ibadah'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-wudhu-water',
              meshTargetName: 'StoneWell',
              title: {
                en: 'Wudhu: Cleanliness Before Prayer',
                id: 'Wudhu: Bersuci dengan Air Bersih Sebelum Shalat'
              },
              explanation: {
                en: 'Before performing Shalat (Muslim prayer), Muslims wash their hands, mouth, nose, face, arms, head, and feet with pure water (Wudhu) to be clean in body and heart!',
                id: 'Sebelum menunaikan shalat, umat Muslim membasuh tangan, wajah, lengan, kepala, dan kaki dengan air bersih (Berwudhu) agar suci lahir dan batin!'
              },
              icon: 'sparkles',
              position3D: [-2.1, 1.5, -1.2]
            },
            {
              id: 'hotspot-sajadah-rug',
              meshTargetName: 'PrayerSanctuaryRug',
              title: {
                en: 'Sajadah (Prayer Mat) & Qibla Direction',
                id: 'Sajadah & Arah Kiblat yang Damai'
              },
              explanation: {
                en: 'Aisyah, Sofia, and Mei-Ling unroll their woven emerald Sajadah facing the Qibla (toward the Kaaba in Mecca) to bow and thank God five times a day.',
                id: 'Aisyah, Sofia, dan Mei-Ling menggelar sajadah hijau menghadap Kiblat untuk rukuk dan sujud bersyukur kepada Allah lima waktu sehari.'
              },
              icon: 'heart',
              position3D: [-1.35, 0.65, 0.85]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Serene Noon Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Garden Musholla & Wudhu Well' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Woven Sajadah & Peaceful Friends' }
          ],
          dialogue: {
            en: {
              text: 'On Day Nine, Aisyah, Sofia, and Mei-Ling washed with cool wudhu water and stood peacefully on their sajadah for noon prayer, while Mateo and Kenji kept the garden quiet.',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 520 },
                { word: 'Nine,', startMs: 530, endMs: 920 },
                { word: 'Aisyah,', startMs: 930, endMs: 1420 },
                { word: 'Sofia,', startMs: 1430, endMs: 1900 },
                { word: 'and', startMs: 1910, endMs: 2120 },
                { word: 'Mei-Ling', startMs: 2130, endMs: 2680 },
                { word: 'washed', startMs: 2690, endMs: 3100 },
                { word: 'with', startMs: 3110, endMs: 3320 },
                { word: 'cool', startMs: 3330, endMs: 3650 },
                {
                  word: 'wudhu',
                  startMs: 3660,
                  endMs: 4180,
                  isVocab: true,
                  definition: {
                    en: 'Washing the hands, face, arms, head, and feet with clean water before Muslim prayer.',
                    id: 'Bersuci dengan air bersih membasuh anggota tubuh sebelum menunaikan ibadah shalat.'
                  },
                  phonics: {
                    en: '[woo-DOO]',
                    id: '[wu-DHU]'
                  }
                },
                { word: 'water', startMs: 4190, endMs: 4580 },
                { word: 'and', startMs: 4590, endMs: 4780 },
                { word: 'stood', startMs: 4790, endMs: 5150 },
                { word: 'peacefully', startMs: 5160, endMs: 5720 },
                { word: 'on', startMs: 5730, endMs: 5900 },
                { word: 'their', startMs: 5910, endMs: 6120 },
                {
                  word: 'sajadah',
                  startMs: 6130,
                  endMs: 6680,
                  isVocab: true,
                  definition: {
                    en: 'A clean, woven prayer rug used by Muslims during daily prayers (Shalat).',
                    id: 'Alas atau karpet bersih tempat umat Muslim melaksanakan ibadah shalat.'
                  },
                  phonics: {
                    en: '[suh-JAH-duh]',
                    id: '[sa-JA-dah]'
                  }
                },
                { word: 'for', startMs: 6690, endMs: 6880 },
                { word: 'noon', startMs: 6890, endMs: 7180 },
                {
                  word: 'prayer,',
                  startMs: 7190,
                  endMs: 7650,
                  isVocab: true,
                  definition: {
                    en: 'Speaking to and thanking God with reverence, mindfulness, and love.',
                    id: 'Ibadah shalat dan doa untuk mengingat serta bersyukur kepada Tuhan Yang Maha Esa.'
                  },
                  phonics: {
                    en: '[PRAY-er]',
                    id: '[SHA-lat]'
                  }
                },
                { word: 'while', startMs: 7660, endMs: 7900 },
                { word: 'friends', startMs: 7910, endMs: 8250 },
                { word: 'kept', startMs: 8260, endMs: 8500 },
                { word: 'quiet.', startMs: 8510, endMs: 8800 }
              ]
            },
            id: {
              text: 'Pada Hari Kesembilan, Aisyah, Sofia, dan Mei-Ling membasuh wajah dengan air wudhu yang sejuk lalu berdiri khusyuk di atas sajadah untuk shalat Dzuhur.',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Kesembilan,', startMs: 610, endMs: 1200 },
                { word: 'Aisyah,', startMs: 1210, endMs: 1700 },
                { word: 'Sofia,', startMs: 1710, endMs: 2200 },
                { word: 'dan', startMs: 2210, endMs: 2450 },
                { word: 'Mei-Ling', startMs: 2460, endMs: 3000 },
                { word: 'membasuh', startMs: 3010, endMs: 3550 },
                { word: 'wajah', startMs: 3560, endMs: 3950 },
                { word: 'dengan', startMs: 3960, endMs: 4300 },
                { word: 'air', startMs: 4310, endMs: 4580 },
                {
                  word: 'wudhu',
                  startMs: 4590,
                  endMs: 5100,
                  isVocab: true,
                  definition: {
                    en: 'Washing the hands, face, arms, head, and feet with clean water before Muslim prayer.',
                    id: 'Bersuci dengan air bersih membasuh anggota tubuh sebelum menunaikan ibadah shalat.'
                  },
                  phonics: {
                    en: '[woo-DOO]',
                    id: '[wu-DHU]'
                  }
                },
                { word: 'yang', startMs: 5110, endMs: 5350 },
                { word: 'sejuk', startMs: 5360, endMs: 5750 },
                { word: 'lalu', startMs: 5760, endMs: 6050 },
                { word: 'berdiri', startMs: 6060, endMs: 6500 },
                { word: 'khusyuk', startMs: 6510, endMs: 7000 },
                { word: 'di', startMs: 7010, endMs: 7180 },
                { word: 'atas', startMs: 7190, endMs: 7450 },
                {
                  word: 'sajadah',
                  startMs: 7460,
                  endMs: 8000,
                  isVocab: true,
                  definition: {
                    en: 'A clean, woven prayer rug used by Muslims during daily prayers (Shalat).',
                    id: 'Alas atau karpet bersih tempat umat Muslim melaksanakan ibadah shalat.'
                  },
                  phonics: {
                    en: '[suh-JAH-duh]',
                    id: '[sa-JA-dah]'
                  }
                },
                { word: 'untuk', startMs: 8010, endMs: 8300 },
                {
                  word: 'shalat',
                  startMs: 8310,
                  endMs: 8600,
                  isVocab: true,
                  definition: {
                    en: 'The five daily prayers performed by Muslims facing the Qibla with gratitude and peace.',
                    id: 'Ibadah utama umat Islam lima waktu sehari yang menenangkan hati dan pikiran.'
                  },
                  phonics: {
                    en: '[suh-LAHT]',
                    id: '[SHA-lat]'
                  }
                },
                { word: 'Dzuhur.', startMs: 8610, endMs: 8800 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-09',
              question: {
                en: 'What do Aisyah, Sofia, and Mei-Ling do before standing on the Sajadah for prayer (Shalat)?',
                id: 'Apa yang dilakukan Aisyah, Sofia, dan Mei-Ling sebelum berdiri di atas sajadah untuk shalat?'
              },
              options: [
                {
                  text: {
                    en: 'They perform Wudhu—washing hands, face, arms, head, and feet with clean water',
                    id: 'Melakukan Wudhu—membasuh tangan, wajah, lengan, kepala, dan kaki dengan air bersih'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'They put mud on their shoes',
                    id: 'Mengoleskan lumpur kebun ke sepatu'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'They run around shouting loudly',
                    id: 'Berlari-lari sambil berteriak kencang'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'MashaAllah, correct! Wudhu keeps the body fresh and clean while preparing the heart for peaceful prayer.',
                id: 'Alhamdulillah, benar sekali! Berwudhu menjaga kebersihan tubuh sekaligus menenangkan hati sebelum menghadap Tuhan.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 9: How Do the 5 Prayer Times Follow the Sun?',
              id: 'Aku Ingin Tahu! · Hari 9: Bagaimana 5 Waktu Shalat Mengikuti Peredaran Matahari?'
            },
            wonderQuestion: {
              en: 'Why do Muslims pray at dawn (Fajr), noon (Dhuhr), afternoon (Asr), sunset (Maghrib), and night (Isha)?',
              id: 'Mengapa waktu shalat Subuh, Dzuhur, Ashar, Maghrib, dan Isya selaras dengan posisi matahari di langit?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-prayer-sun-clock',
                question: {
                  en: 'I Wonder Why: How does the sky tell prayer times?',
                  id: 'Mengapa Ya: Bagaimana langit menunjukkan lima waktu shalat?'
                },
                answer: {
                  en: 'As Earth rotates, the sun\'s arc marks five peaceful pauses: dawn glow (Subuh), high noon (Dzuhur), afternoon shadow (Ashar), golden sunset (Maghrib), and starlit night (Isya)!',
                  id: 'Saat Bumi berputar, posisi matahari menandai 5 jeda damai: fajar (Subuh), tengah hari (Dzuhur), bayangan sore (Ashar), senja keemasan (Maghrib), dan malam berbintang (Isya)!'
                },
                diagramType: 'prayer-peace'
              },
              {
                id: 'fact-wudhu-hygiene',
                question: {
                  en: 'I Wonder Why: Why does washing with cool water calm our mind?',
                  id: 'Mengapa Ya: Mengapa membasuh wajah dengan air wudhu menenangkan pikiran?'
                },
                answer: {
                  en: 'Washing the face, hands, and feet five times a day removes dust and germs while activating the mammalian dive reflex, which gently slows the heart rate!',
                  id: 'Membasuh wajah, tangan, dan kaki lima kali sehari membersihkan kuman serta mengaktifkan refleks relaksasi alami yang menenangkan detak jantung!'
                },
                diagramType: 'water-cycle'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 10 (WEDNESDAY · WEEK 2 / RABU MINGGU 2) — CHAPTER 10 (SEE THE ZOO!)
        // ====================================================================
        {
          id: 'scene-10',
          chapterNumber: 10,
          dayNumber: 10,
          weekNumber: 2,
          activityCategory: 'zoo-visit',
          dayOfWeek: { en: 'Wednesday (Wk 2)', id: 'Rabu (Mgg 2)' },
          leadCharacter: 'amara',
          title: {
            en: 'Day 10: Welcome to Harmony Sanctuary Zoo!',
            id: 'Hari 10: Kunjungan Seru ke Taman Satwa Harmoni!'
          },
          subtitle: {
            en: 'Week 2 Wednesday · Observing the tall giraffe, gentle elephant, and spotted deer!',
            id: 'Rabu Minggu 2 · Mengamati jerapah jangkung, gajah ramah, dan rusa tutul di Taman Satwa!'
          },
          modelGlbUrl: 'models/scenes/day10_sanctuary_zoo.glb',
          cameraInitPosition: [1.4, 2.9, 6.4],
          cameraTargetPosition: [0.5, 0.9, -0.3],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'ZooGiraffeDeerMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Sanctuary Zoo animals to wave and observe',
                id: 'Ketuk satwa di Taman Satwa untuk menyapa & mengamati'
              }
            },
            {
              meshTargetName: 'AmaraMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Amara to share wildlife stories',
                id: 'Ketuk Amara untuk bercerita tentang satwa liar'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-zoo-giraffe',
              meshTargetName: 'ZooSanctuaryEnclosure',
              title: {
                en: 'Sanctuary Zoo: Gentle Giraffe & Spotted Deer',
                id: 'Taman Satwa: Jerapah & Rusa Tutul yang Ramah'
              },
              explanation: {
                en: 'In a wildlife sanctuary zoo, animals roam in spacious, tree-filled habitats! A giraffe uses its long 45-cm purple tongue to pluck high acacia leaves without getting poked by thorns.',
                id: 'Di Taman Satwa Konservasi, hewan dirawat di habitat hijau yang luas! Jerapah menggunakan lidah panjangnya untuk memetik pucuk daun tinggi di pohon.'
              },
              icon: 'sun',
              position3D: [2.05, 1.85, 0.85]
            },
            {
              id: 'hotspot-sumatran-elephant',
              meshTargetName: 'ZooSignboard',
              title: {
                en: 'Protecting Endangered Wildlife',
                id: 'Melindungi Satwa Langka Nusantara & Dunia'
              },
              explanation: {
                en: 'From Indonesian Sumatran elephants and orangutans to African giraffes, every animal is a precious creation that humans are entrusted to protect.',
                id: 'Dari Gajah Sumatera dan Orangutan di Indonesia hingga Jerapah Afrika, setiap satwa adalah ciptaan Tuhan yang wajib kita jaga kelestariannya.'
              },
              icon: 'heart',
              position3D: [1.55, 1.25, 1.35]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Sanctuary Zoo Canopy' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Giraffe & Deer Habitat' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Six Friends with Binoculars' }
          ],
          dialogue: {
            en: {
              text: 'On Day Ten, the six friends visited the Harmony Sanctuary Zoo, smiling in wonder as a tall giraffe and a gentle spotted deer munched fresh green leaves!',
              audioStartMs: 0,
              audioEndMs: 8600,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 520 },
                { word: 'Ten,', startMs: 530, endMs: 920 },
                { word: 'the', startMs: 930, endMs: 1120 },
                { word: 'six', startMs: 1130, endMs: 1420 },
                { word: 'friends', startMs: 1430, endMs: 1850 },
                { word: 'visited', startMs: 1860, endMs: 2350 },
                { word: 'the', startMs: 2360, endMs: 2550 },
                { word: 'Harmony', startMs: 2560, endMs: 3050 },
                {
                  word: 'Sanctuary',
                  startMs: 3060,
                  endMs: 3680,
                  isVocab: true,
                  definition: {
                    en: 'A safe, protected nature park where animals are cared for with love and respect.',
                    id: 'Kawasan suaka atau taman satwa yang aman dan nyaman untuk melindungi hewan.'
                  },
                  phonics: {
                    en: '[SANK-choo-air-ee]',
                    id: '[su-A-ka]'
                  }
                },
                {
                  word: 'Zoo,',
                  startMs: 3690,
                  endMs: 4100,
                  isVocab: true,
                  definition: {
                    en: 'A zoological park where families learn about and care for wildlife from around the world.',
                    id: 'Taman satwa atau kebun binatang tempat kita belajar mengenal dan menyayangi hewan.'
                  },
                  phonics: {
                    en: '[ZOO]',
                    id: '[ta-MAN SAT-wa]'
                  }
                },
                { word: 'smiling', startMs: 4110, endMs: 4600 },
                { word: 'in', startMs: 4610, endMs: 4780 },
                { word: 'wonder', startMs: 4790, endMs: 5250 },
                { word: 'as', startMs: 5260, endMs: 5450 },
                { word: 'a', startMs: 5460, endMs: 5600 },
                { word: 'tall', startMs: 5610, endMs: 5950 },
                {
                  word: 'giraffe',
                  startMs: 5960,
                  endMs: 6500,
                  isVocab: true,
                  definition: {
                    en: 'The tallest mammal on Earth, famous for its long graceful neck and spotted coat.',
                    id: 'Hewan mamalia tertinggi di dunia dengan leher jenjang dan corak tutul yang indah.'
                  },
                  phonics: {
                    en: '[juh-RAF]',
                    id: '[je-RA-pah]'
                  }
                },
                { word: 'and', startMs: 6510, endMs: 6720 },
                { word: 'spotted', startMs: 6730, endMs: 7200 },
                { word: 'deer', startMs: 7210, endMs: 7550 },
                { word: 'munched', startMs: 7560, endMs: 8000 },
                { word: 'fresh', startMs: 8010, endMs: 8300 },
                { word: 'leaves!', startMs: 8310, endMs: 8600 }
              ]
            },
            id: {
              text: 'Pada Hari Kesepuluh, enam sahabat mengunjungi Taman Satwa Harmoni, tersenyum kagum melihat jerapah jangkung dan rusa tutul mengunyah pucuk daun segar!',
              audioStartMs: 0,
              audioEndMs: 8600,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Kesepuluh,', startMs: 610, endMs: 1200 },
                { word: 'enam', startMs: 1210, endMs: 1550 },
                { word: 'sahabat', startMs: 1560, endMs: 2050 },
                { word: 'mengunjungi', startMs: 2060, endMs: 2700 },
                { word: 'Taman', startMs: 2710, endMs: 3100 },
                {
                  word: 'Satwa',
                  startMs: 3110,
                  endMs: 3600,
                  isVocab: true,
                  definition: {
                    en: 'Animals and wildlife living in nature or cared for in a conservation sanctuary.',
                    id: 'Segala jenis hewan atau binatang penghuni alam yang patut kita sayangi.'
                  },
                  phonics: {
                    en: '[WILD-life]',
                    id: '[SAT-wa]'
                  }
                },
                { word: 'Harmoni,', startMs: 3610, endMs: 4150 },
                { word: 'tersenyum', startMs: 4160, endMs: 4700 },
                { word: 'kagum', startMs: 4710, endMs: 5150 },
                { word: 'melihat', startMs: 5160, endMs: 5600 },
                {
                  word: 'jerapah',
                  startMs: 5610,
                  endMs: 6150,
                  isVocab: true,
                  definition: {
                    en: 'The tallest mammal on Earth, famous for its long graceful neck and spotted coat.',
                    id: 'Hewan mamalia tertinggi di dunia dengan leher jenjang dan corak tutul yang indah.'
                  },
                  phonics: {
                    en: '[juh-RAF]',
                    id: '[je-RA-pah]'
                  }
                },
                { word: 'jangkung', startMs: 6160, endMs: 6650 },
                { word: 'dan', startMs: 6660, endMs: 6880 },
                { word: 'rusa', startMs: 6890, endMs: 7250 },
                { word: 'tutul', startMs: 7260, endMs: 7650 },
                { word: 'mengunyah', startMs: 7660, endMs: 8150 },
                { word: 'daun', startMs: 8160, endMs: 8380 },
                { word: 'segar!', startMs: 8390, endMs: 8600 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-10',
              question: {
                en: 'How should we behave when visiting animals at the Sanctuary Zoo on Day 10?',
                id: 'Bagaimana sikap terbaik kita saat mengunjungi hewan di Taman Satwa pada Hari ke-10?'
              },
              options: [
                {
                  text: {
                    en: 'Speak softly, observe with kindness, and keep their habitat clean!',
                    id: 'Berbicara lembut, mengamati dengan kasih sayang, dan menjaga kebersihan taman!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'Throw plastic wrappers into the animal enclosure',
                    id: 'Membuang bungkus plastik ke dalam kandang satwa'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Bang on the fences to startle the sleeping deer',
                    id: 'Memukul-mukul pagar agar rusa terkejut'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Wonderful! Being gentle and respectful at the zoo keeps the animals calm, safe, and happy.',
                id: 'Hebat sekali! Bersikap santun dan penyayang membuat satwa di kebun binatang merasa aman dan nyaman.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 10: Why Do Giraffes Have Such Long Necks?',
              id: 'Aku Ingin Tahu! · Hari 10: Mengapa Jerapah Memiliki Leher yang Sangat Panjang?'
            },
            wonderQuestion: {
              en: 'Surprise! Did you know a tall giraffe has the exact same number of neck bones (7 vertebrae) as a human child?',
              id: 'Tahukah kamu bahwa jerapah yang tinggi memiliki jumlah tulang leher yang sama persis (7 ruas) dengan manusia?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-giraffe-neck',
                question: {
                  en: 'I Wonder Why: How many neck bones does a giraffe have?',
                  id: 'Mengapa Ya: Berapa jumlah tulang leher jerapah?'
                },
                answer: {
                  en: 'Just like humans, a giraffe has only 7 neck vertebrae—but each bone can be 25 cm long! This lets giraffes eat high treetop leaves no other animal can reach.',
                  id: 'Sama seperti manusia, jerapah hanya punya 7 ruas tulang leher—tetapi setiap ruas panjangnya mencapai 25 cm sehingga bisa menjangkau pucuk pohon tertinggi!'
                },
                diagramType: 'zoo-habitat'
              },
              {
                id: 'fact-giraffe-spots',
                question: {
                  en: 'I Wonder Why: Why do giraffes and deer have spots?',
                  id: 'Mengapa Ya: Mengapa jerapah dan rusa tutul memiliki corak bintik?'
                },
                answer: {
                  en: 'Their spots work like natural camouflage in dappled tree shadows—and under each giraffe spot is a network of blood vessels that acts as a cooling radiator!',
                  id: 'Corak tutul berfungsi sebagai penyamaran di bawah bayangan pepohonan sekaligus membantu mengatur suhu tubuh agar tetap sejuk!'
                },
                diagramType: 'zoo-habitat'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 11 (THURSDAY · WEEK 2 / KAMIS MINGGU 2) — CHAPTER 11 (ZOO FEEDING & CARE)
        // ====================================================================
        {
          id: 'scene-11',
          chapterNumber: 11,
          dayNumber: 11,
          weekNumber: 2,
          activityCategory: 'zoo-visit',
          dayOfWeek: { en: 'Thursday (Wk 2)', id: 'Kamis (Mgg 2)' },
          leadCharacter: 'mei',
          title: {
            en: 'Day 11: Feeding the Spotted Deer & Bunny Meadow',
            id: 'Hari 11: Memberi Makan Rusa Tutul & Kelinci Taman Satwa'
          },
          subtitle: {
            en: 'Week 2 Thursday · Sharing garden greens with herbivore friends at the Children\'s Zoo.',
            id: 'Kamis Minggu 2 · Berbagi sayuran segar kepada rusa tutul dan kelinci di Taman Satwa Anak.'
          },
          modelGlbUrl: 'models/scenes/day11_zoo_feeding.glb',
          cameraInitPosition: [1.1, 2.75, 6.1],
          cameraTargetPosition: [0.3, 0.85, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'MeiMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Mei-Ling to feed fresh greens to the deer & bunny',
                id: 'Ketuk Mei-Ling untuk memberi makan rusa & kelinci'
              }
            },
            {
              meshTargetName: 'ZooGiraffeDeerMesh',
              action: 'playSound',
              label: {
                en: 'Tap the spotted deer & bunny for a happy hop',
                id: 'Ketuk rusa tutul & kelinci agar melompat gembira'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-herbivore-diet',
              meshTargetName: 'ZooSanctuaryEnclosure',
              title: {
                en: 'Herbivores: Plant-Loving Animals',
                id: 'Satwa Herbivora Pemakan Tumbuhan'
              },
              explanation: {
                en: 'Rabbits, spotted deer, giraffes, and elephants are herbivores! They have flat molar teeth specially shaped for grinding crunchy leaves, grass, and carrots.',
                id: 'Kelinci, rusa tutul, jerapah, dan gajah adalah satwa herbivora! Mereka memiliki gigi geraham datar untuk mengunyah daun, rumput, dan wortel segar.'
              },
              icon: 'sprout',
              position3D: [1.95, 1.45, 0.9]
            },
            {
              id: 'hotspot-zookeeper-guide',
              meshTargetName: 'ShippingBin',
              title: {
                en: 'Zookeeper Nutrition Basket',
                id: 'Keranjang Nutrisi Perawat Satwa'
              },
              explanation: {
                en: 'We only feed zoo animals approved vegetables prepared by the zookeeper so their tummies stay healthy and strong!',
                id: 'Kita hanya memberi makan satwa dengan sayuran sehat yang telah diperiksa oleh petugas Taman Satwa agar pencernaan mereka tetap sehat!'
              },
              icon: 'heart',
              position3D: [2.1, 1.25, -1.1]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Sunny Zoo Meadow' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Spotted Deer & Fluffy Bunny' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Fresh Garden Greens Basket' }
          ],
          dialogue: {
            en: {
              text: 'On Day Eleven, Mei-Ling and Sofia gently offered crisp garden greens to the spotted deer and fluffy white bunny, learning how herbivores chew their food.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 520 },
                { word: 'Eleven,', startMs: 530, endMs: 1000 },
                { word: 'Mei-Ling', startMs: 1010, endMs: 1600 },
                { word: 'and', startMs: 1610, endMs: 1850 },
                { word: 'Sofia', startMs: 1860, endMs: 2350 },
                { word: 'gently', startMs: 2360, endMs: 2800 },
                { word: 'offered', startMs: 2810, endMs: 3300 },
                { word: 'crisp', startMs: 3310, endMs: 3680 },
                { word: 'garden', startMs: 3690, endMs: 4150 },
                { word: 'greens', startMs: 4160, endMs: 4600 },
                { word: 'to', startMs: 4610, endMs: 4780 },
                { word: 'the', startMs: 4790, endMs: 4950 },
                { word: 'spotted', startMs: 4960, endMs: 5450 },
                { word: 'deer', startMs: 5460, endMs: 5850 },
                { word: 'and', startMs: 5860, endMs: 6080 },
                { word: 'fluffy', startMs: 6090, endMs: 6500 },
                { word: 'bunny,', startMs: 6510, endMs: 6950 },
                { word: 'learning', startMs: 6960, endMs: 7450 },
                { word: 'how', startMs: 7460, endMs: 7700 },
                {
                  word: 'herbivores',
                  startMs: 7710,
                  endMs: 8250,
                  isVocab: true,
                  definition: {
                    en: 'Animals such as deer, rabbits, giraffes, and elephants that eat only plants, leaves, and fruits.',
                    id: 'Hewan pemakan tumbuhan seperti rusa, kelinci, jerapah, dan kambing.'
                  },
                  phonics: {
                    en: '[HUR-bih-vorz]',
                    id: '[her-bi-VO-ra]'
                  }
                },
                { word: 'eat.', startMs: 8260, endMs: 8500 }
              ]
            },
            id: {
              text: 'Pada Hari Kesebelas, Mei-Ling dan Sofia dengan lembut memberikan sayuran segar kepada rusa tutul dan kelinci putih sambil belajar mengenal satwa herbivora.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Kesebelas,', startMs: 610, endMs: 1200 },
                { word: 'Mei-Ling', startMs: 1210, endMs: 1750 },
                { word: 'dan', startMs: 1760, endMs: 2000 },
                { word: 'Sofia', startMs: 2010, endMs: 2500 },
                { word: 'dengan', startMs: 2510, endMs: 2900 },
                { word: 'lembut', startMs: 2910, endMs: 3350 },
                { word: 'memberikan', startMs: 3360, endMs: 4000 },
                { word: 'sayuran', startMs: 4010, endMs: 4550 },
                { word: 'segar', startMs: 4560, endMs: 4950 },
                { word: 'kepada', startMs: 4960, endMs: 5400 },
                { word: 'rusa', startMs: 5410, endMs: 5800 },
                { word: 'tutul', startMs: 5810, endMs: 6200 },
                { word: 'dan', startMs: 6210, endMs: 6450 },
                { word: 'kelinci', startMs: 6460, endMs: 6950 },
                { word: 'putih', startMs: 6960, endMs: 7350 },
                { word: 'sambil', startMs: 7360, endMs: 7700 },
                { word: 'mengenal', startMs: 7710, endMs: 8050 },
                {
                  word: 'herbivora.',
                  startMs: 8060,
                  endMs: 8500,
                  isVocab: true,
                  definition: {
                    en: 'Animals such as deer, rabbits, giraffes, and elephants that eat only plants, leaves, and fruits.',
                    id: 'Golongan hewan pemakan tumbuh-tumbuhan, dedaunan, dan biji-bijian.'
                  },
                  phonics: {
                    en: '[HUR-bih-vor]',
                    id: '[her-bi-VO-ra]'
                  }
                }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-11',
              question: {
                en: 'What is a "herbivore" animal like the spotted deer, rabbit, and giraffe?',
                id: 'Apa yang dimaksud dengan hewan "herbivora" seperti rusa tutul, kelinci, dan jerapah?'
              },
              options: [
                {
                  text: {
                    en: 'An animal that eats nutritious plants, leaves, grass, and fruits',
                    id: 'Hewan yang memakan tumbuh-tumbuhan, dedaunan, rumput, dan buah-buahan'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'An animal that eats rocks and metal bolts',
                    id: 'Hewan yang memakan batu dan besi'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'A robot powered by batteries',
                    id: 'Robot mainan yang memakai baterai'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Correct! Herbivores rely on healthy green plants—connecting our garden lessons directly to the Sanctuary Zoo!',
                id: 'Tepat sekali! Satwa herbivora membutuhkan tanaman hijau yang sehat—menghubungkan ilmu kebun kita dengan Taman Satwa!'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 11: Why Do Rabbits Twitch Their Noses & Long Ears?',
              id: 'Aku Ingin Tahu! · Hari 11: Mengapa Kelinci Menggerakkan Hidung & Telinga Panjangnya?'
            },
            wonderQuestion: {
              en: 'How can a little bunny hear a falling leaf from far away and stay cool on a sunny day without sweating?',
              id: 'Bagaimana kelinci kecil bisa mendengar suara daun jatuh dari jauh dan mendinginkan tubuhnya lewat telinga?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-bunny-ears',
                question: {
                  en: 'I Wonder Why: Why can rabbits rotate their ears 270 degrees?',
                  id: 'Mengapa Ya: Mengapa telinga kelinci bisa berputar seperti radar?'
                },
                answer: {
                  en: 'A rabbit\'s long ears work like twin satellite dishes to pinpoint sounds from any direction—and release excess body heat on warm days!',
                  id: 'Telinga panjang kelinci bekerja seperti radar kembar untuk menangkap suara dari segala arah sekaligus melepaskan panas tubuh saat cuaca hangat!'
                },
                diagramType: 'zoo-habitat'
              },
              {
                id: 'fact-deer-antlers',
                question: {
                  en: 'I Wonder Why: Are deer antlers made of bone or wood?',
                  id: 'Mengapa Ya: Apakah tanduk rusa terbuat dari tulang atau kayu?'
                },
                answer: {
                  en: 'Deer antlers are true living bones that grow anew every year, covered in soft fuzzy skin called "velvet" packed with nutrients!',
                  id: 'Ranggah (tanduk) rusa adalah tulang hidup yang tumbuh baru setiap tahun dan dilapisi kulit lembut bak beludru!'
                },
                diagramType: 'zoo-habitat'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 12 (FRIDAY · WEEK 2 / JUMAT MINGGU 2) — CHAPTER 12 (MUSLIM PRAYER, DU'A & RAHMATAN LIL ALAMIN)
        // ====================================================================
        {
          id: 'scene-12',
          chapterNumber: 12,
          dayNumber: 12,
          weekNumber: 2,
          activityCategory: 'muslim-prayer',
          dayOfWeek: { en: 'Friday (Wk 2)', id: 'Jumat (Mgg 2)' },
          leadCharacter: 'aisyah',
          title: {
            en: 'Day 12: Friday Blessing, Du\'a & Mercy for All Creatures',
            id: 'Hari 12: Berkah Hari Jumat, Doa & Kasih Sayang Semesta'
          },
          subtitle: {
            en: 'Week 2 Friday · Raising palms in Du\'a for parents, friends, animals, and peace on Earth.',
            id: 'Jumat Minggu 2 · Menengadahkan tangan berdoa untuk orang tua, sahabat, satwa, dan kedamaian dunia.'
          },
          modelGlbUrl: 'models/scenes/day12_friday_dua.glb',
          cameraInitPosition: [-0.8, 2.8, 6.3],
          cameraTargetPosition: [-0.2, 0.85, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'AisyahMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Aisyah to raise palms in peaceful Friday Du\'a',
                id: 'Ketuk Aisyah untuk berdoa penuh syukur di hari Jumat'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to share peaceful Friday greetings',
                id: 'Ketuk Mateo untuk berbagi salam persahabatan'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-friday-dua',
              meshTargetName: 'PrayerSanctuaryRug',
              title: {
                en: 'Du\'a & Alhamdulillah (Gratitude Prayer)',
                id: 'Doa & Alhamdulillah (Rasa Syukur)'
              },
              explanation: {
                en: 'After completing Shalat, Muslims cup their palms together in Du\'a—whispering "Alhamdulillah" (Praise be to God) and praying for their parents, teachers, neighbors, and all living creatures.',
                id: 'Seusai shalat, umat Muslim menengadahkan tangan berdoa—mengucapkan "Alhamdulillah" serta mendoakan ayah-ibu, guru, sahabat, dan kelestarian alam.'
              },
              icon: 'heart',
              position3D: [-1.35, 0.75, 0.85]
            },
            {
              id: 'hotspot-mercy-animals',
              meshTargetName: 'ZooSanctuaryEnclosure',
              title: {
                en: 'Mercy to Animals (Kasih Sayang Satwa)',
                id: 'Menyayangi Satwa Adalah Ibadah Mulia'
              },
              explanation: {
                en: 'Islamic teachings and all world faiths teach that giving water to a thirsty animal or planting a tree that feeds birds is a blessed act of charity (Sadaqah)!',
                id: 'Ajaran Islam dan nilai luhur semua agama mengajarkan bahwa memberi minum hewan yang haus dan menanam pohon untuk burung adalah sedekah yang mulia!'
              },
              icon: 'sparkles',
              position3D: [1.85, 1.5, 0.85]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Blessed Friday Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Prayer Pavilion & Garden' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Palms Raised in Peaceful Du\'a' }
          ],
          dialogue: {
            en: {
              text: 'On Friday, Day Twelve, Aisyah, Sofia, and Mei-Ling raised their palms in heartfelt du\'a after prayer, whispering Alhamdulillah for kind friends, thriving plants, and gentle animals.',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Friday,', startMs: 260, endMs: 720 },
                { word: 'Day', startMs: 730, endMs: 1000 },
                { word: 'Twelve,', startMs: 1010, endMs: 1450 },
                { word: 'Aisyah,', startMs: 1460, endMs: 1950 },
                { word: 'Sofia,', startMs: 1960, endMs: 2420 },
                { word: 'and', startMs: 2430, endMs: 2650 },
                { word: 'Mei-Ling', startMs: 2660, endMs: 3200 },
                { word: 'raised', startMs: 3210, endMs: 3650 },
                { word: 'their', startMs: 3660, endMs: 3900 },
                { word: 'palms', startMs: 3910, endMs: 4350 },
                { word: 'in', startMs: 4360, endMs: 4520 },
                { word: 'heartfelt', startMs: 4530, endMs: 5050 },
                {
                  word: 'du\'a',
                  startMs: 5060,
                  endMs: 5550,
                  isVocab: true,
                  definition: {
                    en: 'A personal, heartfelt prayer asking God for blessings, protection, and kindness for all.',
                    id: 'Permohonan dan harapan tulus yang dipanjatkan kepada Tuhan dengan penuh kerendahan hati.'
                  },
                  phonics: {
                    en: '[doo-AH]',
                    id: '[DO-a]'
                  }
                },
                { word: 'after', startMs: 5560, endMs: 5900 },
                { word: 'prayer,', startMs: 5910, endMs: 6350 },
                { word: 'whispering', startMs: 6360, endMs: 6900 },
                {
                  word: 'Alhamdulillah',
                  startMs: 6910,
                  endMs: 7650,
                  isVocab: true,
                  definition: {
                    en: 'An Arabic phrase meaning "All praise and thanks belong to God."',
                    id: 'Ungkapan rasa syukur yang berarti "Segala puji bagi Allah Tuhan semesta alam."'
                  },
                  phonics: {
                    en: '[al-ham-doo-lil-LAH]',
                    id: '[al-ham-du-lil-LAH]'
                  }
                },
                { word: 'for', startMs: 7660, endMs: 7850 },
                { word: 'friends', startMs: 7860, endMs: 8200 },
                { word: 'and', startMs: 8210, endMs: 8400 },
                { word: 'animals.', startMs: 8410, endMs: 8800 }
              ]
            },
            id: {
              text: 'Pada Jumat Hari Kedua Belas, Aisyah, Sofia, dan Mei-Ling menengadahkan tangan memanjatkan doa seusai shalat, mengucap Alhamdulillah atas sahabat, kebun, dan satwa.',
              audioStartMs: 0,
              audioEndMs: 8800,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Jumat', startMs: 290, endMs: 720 },
                { word: 'Hari', startMs: 730, endMs: 1050 },
                { word: 'Kedua', startMs: 1060, endMs: 1450 },
                { word: 'Belas,', startMs: 1460, endMs: 1900 },
                { word: 'Aisyah,', startMs: 1910, endMs: 2400 },
                { word: 'Sofia,', startMs: 2410, endMs: 2880 },
                { word: 'dan', startMs: 2890, endMs: 3120 },
                { word: 'Mei-Ling', startMs: 3130, endMs: 3680 },
                { word: 'menengadahkan', startMs: 3690, endMs: 4400 },
                { word: 'tangan', startMs: 4410, endMs: 4820 },
                { word: 'memanjatkan', startMs: 4830, endMs: 5480 },
                {
                  word: 'doa',
                  startMs: 5490,
                  endMs: 5950,
                  isVocab: true,
                  definition: {
                    en: 'A personal, heartfelt prayer asking God for blessings, protection, and kindness for all.',
                    id: 'Permohonan dan pujian tulus kepada Tuhan untuk kebaikan orang tua, sahabat, dan semesta.'
                  },
                  phonics: {
                    en: '[doo-AH]',
                    id: '[DO-a]'
                  }
                },
                { word: 'seusai', startMs: 5960, endMs: 6400 },
                { word: 'shalat,', startMs: 6410, endMs: 6880 },
                { word: 'mengucap', startMs: 6890, endMs: 7350 },
                {
                  word: 'Alhamdulillah',
                  startMs: 7360,
                  endMs: 8050,
                  isVocab: true,
                  definition: {
                    en: 'An Arabic phrase meaning "All praise and thanks belong to God."',
                    id: 'Ungkapan rasa syukur yang berarti "Segala puji bagi Allah Tuhan semesta alam."'
                  },
                  phonics: {
                    en: '[al-ham-doo-lil-LAH]',
                    id: '[al-ham-du-lil-LAH]'
                  }
                },
                { word: 'atas', startMs: 8060, endMs: 8300 },
                { word: 'nikmat', startMs: 8310, endMs: 8550 },
                { word: 'semesta.', startMs: 8560, endMs: 8800 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-12',
              question: {
                en: 'What does Aisyah\'s Friday Du\'a teach us about caring for plants and zoo animals?',
                id: 'Apa yang diajarkan dalam doa hari Jumat Aisyah tentang merawat tanaman dan satwa?'
              },
              options: [
                {
                  text: {
                    en: 'Showing mercy and care to animals, plants, and neighbors is a blessed act of gratitude!',
                    id: 'Menyayangi satwa, merawat tanaman, dan mengasihi sesama adalah wujud syukur yang mulia!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'We should only care about ourselves and ignore nature',
                    id: 'Kita hanya perlu memikirkan diri sendiri dan mengabaikan alam'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Animals do not need clean water or shade',
                    id: 'Hewan tidak membutuhkan air bersih maupun keteduhan'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'SubhanAllah, well done! Gratitude in prayer inspires us to be gentle stewards (Khalifah) of the Earth.',
                id: 'MasyaAllah, tepat sekali! Rasa syukur dalam doa menggerakkan kita menjadi penjaga bumi dan satwa yang penuh kasih.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 12: How Does Gratitude Make Our Heart & Brain Happy?',
              id: 'Aku Ingin Tahu! · Hari 12: Mengapa Berdoa & Bersyukur Membuat Hati Tenang dan Bahagia?'
            },
            wonderQuestion: {
              en: 'What happens inside our heart and nervous system when we pause to breathe slowly and say thank you in prayer?',
              id: 'Apa yang terjadi pada detak jantung dan pikiran kita saat kita berhenti sejenak untuk berdoa dan bersyukur?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-gratitude-calm',
                question: {
                  en: 'I Wonder Why: Why does peaceful prayer feel so comforting?',
                  id: 'Mengapa Ya: Mengapa shalat dan doa menghadirkan ketenangan di hati?'
                },
                answer: {
                  en: 'Gentle bowing, prostration (sujud), and gratitude breathing release calming serotonin and oxytocin, helping children feel safe, loved, and focused!',
                  id: 'Gerakan rukuk, sujud yang teratur, serta napas syukur memicu hormon ketenangan yang membuat hati anak merasa damai, aman, dan fokus!'
                },
                diagramType: 'prayer-peace'
              },
              {
                id: 'fact-sadaqah-nature',
                question: {
                  en: 'I Wonder Why: How is planting a tree a gift for birds and animals?',
                  id: 'Mengapa Ya: Mengapa menanam pohon dihitung sebagai sedekah bagi burung dan satwa?'
                },
                answer: {
                  en: 'Every tree provides oxygen, cool shade, nesting branches for songbirds, and sweet fruit for wildlife for decades to come!',
                  id: 'Setiap pohon menghasilkan oksigen segar, keteduhan, dahan tempat burung bersarang, serta buah bagi satwa selama puluhan tahun!'
                },
                diagramType: 'zoo-habitat'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 13 (SATURDAY · WEEK 2 / SABTU MINGGU 2) — CHAPTER 13 (STUDY LAB & SONGBIRD SANCTUARY)
        // ====================================================================
        {
          id: 'scene-13',
          chapterNumber: 13,
          dayNumber: 13,
          weekNumber: 2,
          activityCategory: 'study-learning',
          dayOfWeek: { en: 'Saturday (Wk 2)', id: 'Sabtu (Mgg 2)' },
          leadCharacter: 'kenji',
          title: {
            en: 'Day 13: Junior Zoologist Lab & Songbird Sanctuary',
            id: 'Hari 13: Laboratorium Zoologi Cilik & Rumah Burung Berkicau'
          },
          subtitle: {
            en: 'Week 2 Saturday · Crafting wooden birdhouses and mapping our Garden & Zoo Atlas.',
            id: 'Sabtu Minggu 2 · Merakit rumah burung kayu dan menggambar Peta Atlas Kebun & Taman Satwa.'
          },
          modelGlbUrl: 'models/scenes/day13_zoology_lab.glb',
          cameraInitPosition: [0.9, 2.8, 6.2],
          cameraTargetPosition: [0, 0.9, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.5,
            maxDistance: 10.5
          },
          interactables: [
            {
              meshTargetName: 'KenjiMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Kenji to assemble the wooden songbird house',
                id: 'Ketuk Kenji untuk merakit rumah burung kayu'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to mimic cheerful bird melodies on guitar',
                id: 'Ketuk Mateo untuk menirukan kicau burung dengan gitar'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-birdhouse-stem',
              meshTargetName: 'ClassroomSmartboard',
              title: {
                en: 'STEM Architecture: Wooden Songbird House',
                id: 'Sains Arsitektur: Rumah Burung Kayu'
              },
              explanation: {
                en: 'Kenji measures pine wood panels with a ruler to build a cozy birdhouse with an overhanging roof that keeps baby chicks dry in the rain!',
                id: 'Kenji mengukur kayu pinus dengan penggaris untuk membuat rumah burung beratap miring agar anak burung tetap hangat saat hujan!'
              },
              icon: 'book',
              position3D: [-0.95, 1.45, -1.1]
            },
            {
              id: 'hotspot-bird-seed-feeder',
              meshTargetName: 'SunflowerPlot',
              title: {
                en: 'Sunflower Seeds for Visiting Birds',
                id: 'Biji Bunga Matahari untuk Burung Berkicau'
              },
              explanation: {
                en: 'The giant sunflowers from Week 1 produce hundreds of nutritious seeds that attract friendly finches and doves to our garden!',
                id: 'Bunga matahari dari Minggu ke-1 menghasilkan ratusan biji bergizi yang mengundang burung-burung berkicau datang ke taman!'
              },
              icon: 'sun',
              position3D: [0.3, 1.0, 0.2]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Saturday Study Workshop' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Wooden Birdhouses & Atlas' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'Songbirds & Sunflowers' }
          ],
          dialogue: {
            en: {
              text: 'On Day Thirteen, Kenji and Mateo studied their zoo field notes to build a wooden birdhouse, inviting cheerful songbirds to rest above the blooming garden.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 520 },
                { word: 'Thirteen,', startMs: 530, endMs: 1050 },
                { word: 'Kenji', startMs: 1060, endMs: 1550 },
                { word: 'and', startMs: 1560, endMs: 1800 },
                { word: 'Mateo', startMs: 1810, endMs: 2300 },
                { word: 'studied', startMs: 2310, endMs: 2800 },
                { word: 'their', startMs: 2810, endMs: 3050 },
                { word: 'zoo', startMs: 3060, endMs: 3400 },
                { word: 'notes', startMs: 3410, endMs: 3850 },
                { word: 'to', startMs: 3860, endMs: 4050 },
                { word: 'build', startMs: 4060, endMs: 4450 },
                { word: 'a', startMs: 4460, endMs: 4600 },
                { word: 'wooden', startMs: 4610, endMs: 5050 },
                {
                  word: 'birdhouse,',
                  startMs: 5060,
                  endMs: 5680,
                  isVocab: true,
                  definition: {
                    en: 'A small wooden shelter built in trees or gardens where wild birds can safely nest.',
                    id: 'Kotak rumah kayu mungil yang dipasang di pohon agar burung dapat berlindung dan bersarang.'
                  },
                  phonics: {
                    en: '[BURD-hous]',
                    id: '[ru-MAH BU-rung]'
                  }
                },
                { word: 'inviting', startMs: 5690, endMs: 6250 },
                { word: 'cheerful', startMs: 6260, endMs: 6750 },
                { word: 'songbirds', startMs: 6760, endMs: 7350 },
                { word: 'to', startMs: 7360, endMs: 7550 },
                { word: 'rest', startMs: 7560, endMs: 7900 },
                { word: 'in', startMs: 7910, endMs: 8050 },
                { word: 'the', startMs: 8060, endMs: 8200 },
                {
                  word: 'habitat.',
                  startMs: 8210,
                  endMs: 8500,
                  isVocab: true,
                  definition: {
                    en: 'The natural home where an animal or plant finds food, water, and shelter.',
                    id: 'Lingkungan alami tempat makhluk hidup menemukan makanan, air, dan tempat berlindung.'
                  },
                  phonics: {
                    en: '[HAB-ih-tat]',
                    id: '[ha-bi-TAT]'
                  }
                }
              ]
            },
            id: {
              text: 'Pada Hari Ketiga Belas, Kenji dan Mateo mempelajari catatan Taman Satwa untuk merakit rumah burung kayu, menciptakan habitat nyaman di atas taman bunga.',
              audioStartMs: 0,
              audioEndMs: 8500,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Ketiga', startMs: 610, endMs: 1000 },
                { word: 'Belas,', startMs: 1010, endMs: 1450 },
                { word: 'Kenji', startMs: 1460, endMs: 1950 },
                { word: 'dan', startMs: 1960, endMs: 2200 },
                { word: 'Mateo', startMs: 2210, endMs: 2700 },
                { word: 'mempelajari', startMs: 2710, endMs: 3400 },
                { word: 'catatan', startMs: 3410, endMs: 3900 },
                { word: 'Taman', startMs: 3910, endMs: 4300 },
                { word: 'Satwa', startMs: 4310, endMs: 4750 },
                { word: 'untuk', startMs: 4760, endMs: 5100 },
                { word: 'merakit', startMs: 5110, endMs: 5600 },
                { word: 'rumah', startMs: 5610, endMs: 6000 },
                { word: 'burung', startMs: 6010, endMs: 6450 },
                { word: 'kayu,', startMs: 6460, endMs: 6900 },
                { word: 'menciptakan', startMs: 6910, endMs: 7550 },
                {
                  word: 'habitat',
                  startMs: 7560,
                  endMs: 8050,
                  isVocab: true,
                  definition: {
                    en: 'The natural home where an animal or plant finds food, water, and shelter.',
                    id: 'Tempat tinggal alami yang menyediakan makanan, air, dan perlindungan bagi satwa.'
                  },
                  phonics: {
                    en: '[HAB-ih-tat]',
                    id: '[ha-bi-TAT]'
                  }
                },
                { word: 'yang', startMs: 8060, endMs: 8250 },
                { word: 'nyaman.', startMs: 8260, endMs: 8500 }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-13',
              question: {
                en: 'What three things does every healthy animal habitat need (as Kenji and Mateo learned on Day 13)?',
                id: 'Apa tiga hal utama yang dibutuhkan setiap habitat satwa yang sehat menurut pelajaran Hari ke-13?'
              },
              options: [
                {
                  text: {
                    en: 'Nutritious food, clean water, and a safe shelter to rest!',
                    id: 'Makanan bergizi, air bersih, dan tempat berlindung yang aman!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'Video games, candy bars, and loud speakers',
                    id: 'Mainan video gim, permen, dan pengeras suara'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Concrete walls with zero trees or water',
                    id: 'Tembok beton tanpa pohon dan tanpa air'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Spot on! Food, clean water, and safe shelter make a complete habitat for birds, deer, and all wildlife.',
                id: 'Tepat sekali! Makanan sehat, air bersih, dan tempat bernaung yang aman membentuk habitat yang lestari.'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 13: How Do Birds Sing Melodies & Build Nests?',
              id: 'Aku Ingin Tahu! · Hari 13: Bagaimana Burung Berkicau Merdu & Menenun Sarang?'
            },
            wonderQuestion: {
              en: 'How can a tiny songbird weave twigs and grass into a sturdy cup using only its beak?',
              id: 'Bagaimana burung kecil bisa menganyam ranting dan rumput menjadi sarang yang kokoh hanya dengan paruhnya?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-bird-syrinx',
                question: {
                  en: 'I Wonder Why: How can songbirds sing two notes at the same time?',
                  id: 'Mengapa Ya: Bagaimana burung bisa menyanyikan dua nada sekaligus?'
                },
                answer: {
                  en: 'Birds have a special Y-shaped voice box called a syrinx with two independent sides—letting them sing harmony with themselves!',
                  id: 'Burung memiliki organ suara berbentuk huruf Y bernama siring yang memungkinkan mereka membunyikan dua nada merdu secara bersamaan!'
                },
                diagramType: 'sound-waves'
              },
              {
                id: 'fact-seed-dispersal',
                question: {
                  en: 'I Wonder Why: How do birds help plant new forests?',
                  id: 'Mengapa Ya: Bagaimana burung membantu menanam hutan baru?'
                },
                answer: {
                  en: 'When birds eat berries and fly across valleys, they drop seeds in fertile soil—acting as nature\'s flying gardeners!',
                  id: 'Saat burung memakan buah beri lalu terbang melintasi lembah, mereka menyebarkan biji tanaman baru—menjadi pekebun terbang alami!'
                },
                diagramType: 'zoo-habitat'
              }
            ]
          }
        },

        // ====================================================================
        // DAY 14 (SUNDAY · WEEK 2 / MINGGU MINGGU 2) — CHAPTER 14 (2-WEEK GRAND FINALE)
        // ====================================================================
        {
          id: 'scene-14',
          chapterNumber: 14,
          dayNumber: 14,
          weekNumber: 2,
          activityCategory: 'study-learning',
          dayOfWeek: { en: 'Sunday (Wk 2)', id: 'Minggu (Mgg 2)' },
          leadCharacter: 'aisyah',
          title: {
            en: 'Day 14: Two-Week Celebration of Knowledge, Animals & Peace',
            id: 'Hari 14: Pameran Dua Minggu Ilmu, Satwa & Kedamaian'
          },
          subtitle: {
            en: 'Week 2 Finale · Uniting our blooming garden, Sanctuary Zoo atlas, and gratitude prayer!',
            id: 'Puncak Minggu 2 · Menyatukan kebun mekar, atlas Taman Satwa, dan doa syukur bersama keluarga!'
          },
          modelGlbUrl: 'models/scenes/day14_grand_exhibition.glb',
          cameraInitPosition: [0, 3.15, 6.8],
          cameraTargetPosition: [0, 0.9, 0],
          cameraLimits: {
            minPolarAngle: 0.4,
            maxPolarAngle: 1.4,
            minDistance: 3.8,
            maxDistance: 11
          },
          interactables: [
            {
              meshTargetName: 'AisyahMesh',
              action: 'triggerAnimation',
              label: {
                en: 'Tap Aisyah to present the 14-Day Science & Friendship Journal',
                id: 'Ketuk Aisyah untuk mempresentasikan Jurnal 14 Hari Sains & Persahabatan'
              }
            },
            {
              meshTargetName: 'MateoGuitarMesh',
              action: 'playSound',
              label: {
                en: 'Tap Mateo to play the Grand Two-Week Harmony Anthem',
                id: 'Ketuk Mateo untuk memainkan Lagu Harmoni Dua Minggu'
              }
            },
            {
              meshTargetName: 'ZooGiraffeDeerMesh',
              action: 'collectStar',
              label: {
                en: 'Tap Sanctuary Zoo & Garden exhibition to celebrate Day 14!',
                id: 'Ketuk Pameran Taman Satwa & Kebun untuk merayakan Hari ke-14!'
              }
            }
          ],
          hotspots: [
            {
              id: 'hotspot-14day-journal',
              meshTargetName: 'ClassroomSmartboard',
              title: {
                en: 'The 14-Day Master Discovery Journal',
                id: 'Jurnal Agung 14 Hari: Kebun, Sains, Satwa & Doa'
              },
              explanation: {
                en: 'Over 14 days (2 full weeks), the six friends grew a garden, studied botany and zoology, cared for Sanctuary Zoo animals, and shared peaceful prayers together!',
                id: 'Selama 14 hari (2 minggu penuh), enam sahabat berhasil menumbuhkan kebun, belajar sains, menyayangi satwa, dan berdoa bersama dalam kerukunan!'
              },
              icon: 'book',
              position3D: [0.0, 2.1, -2.4]
            },
            {
              id: 'hotspot-amanah-stewardship',
              meshTargetName: 'BloomingGardenCenter',
              title: {
                en: 'Amanah: Guardians of Earth & Wildlife',
                id: 'Amanah Bumi: Penjaga Alam, Ilmu & Kasih Sayang'
              },
              explanation: {
                en: 'When children combine scientific learning (Ilmu), kindness to animals (Rahmah), and grateful prayer (Doa), the whole community blooms in peace.',
                id: 'Saat anak-anak memadukan semangat belajar (Ilmu), kasih sayang pada satwa (Rahmah), dan doa syukur, seluruh masyarakat hidup damai sejahtera.'
              },
              icon: 'sparkles',
              position3D: [0.0, 1.05, 0.15]
            }
          ],
          layers2d: [
            { layerUrl: 'images/scenes/sky_city_backdrop.webp', depthFactor: 0.15, title: 'Grand Exhibition Sunday Sky' },
            { layerUrl: 'images/scenes/planting_beds_mid.webp', depthFactor: 0.5, title: 'Garden, Zoo Atlas & Prayer Pavilion' },
            { layerUrl: 'images/scenes/planting_beds_fg.webp', depthFactor: 0.9, title: 'All Six Friends & Families' }
          ],
          dialogue: {
            en: {
              text: 'On Day Fourteen, all six friends presented their garden harvest and zoo discoveries to their families, ending their two-week adventure with a joyful prayer of peace!',
              audioStartMs: 0,
              audioEndMs: 8900,
              words: [
                { word: 'On', startMs: 0, endMs: 250 },
                { word: 'Day', startMs: 260, endMs: 520 },
                { word: 'Fourteen,', startMs: 530, endMs: 1050 },
                { word: 'all', startMs: 1060, endMs: 1300 },
                { word: 'six', startMs: 1310, endMs: 1600 },
                { word: 'friends', startMs: 1610, endMs: 2050 },
                { word: 'presented', startMs: 2060, endMs: 2650 },
                { word: 'their', startMs: 2660, endMs: 2900 },
                { word: 'garden', startMs: 2910, endMs: 3350 },
                { word: 'harvest', startMs: 3360, endMs: 3850 },
                { word: 'and', startMs: 3860, endMs: 4050 },
                { word: 'zoo', startMs: 4060, endMs: 4400 },
                {
                  word: 'discoveries',
                  startMs: 4410,
                  endMs: 5100,
                  isVocab: true,
                  definition: {
                    en: 'Exciting new things we learn and find when we study nature with curiosity.',
                    id: 'Pengetahuan dan temuan baru yang berharga dari hasil belajar serta mengamati alam.'
                  },
                  phonics: {
                    en: '[dih-SKUV-er-eez]',
                    id: '[te-MU-an]'
                  }
                },
                { word: 'to', startMs: 5110, endMs: 5300 },
                { word: 'their', startMs: 5310, endMs: 5550 },
                { word: 'families,', startMs: 5560, endMs: 6100 },
                { word: 'ending', startMs: 6110, endMs: 6500 },
                { word: 'their', startMs: 6510, endMs: 6750 },
                { word: 'two-week', startMs: 6760, endMs: 7250 },
                { word: 'adventure', startMs: 7260, endMs: 7750 },
                { word: 'with', startMs: 7760, endMs: 7950 },
                { word: 'a', startMs: 7960, endMs: 8100 },
                { word: 'prayer', startMs: 8110, endMs: 8450 },
                { word: 'of', startMs: 8460, endMs: 8600 },
                {
                  word: 'peace!',
                  startMs: 8610,
                  endMs: 8900,
                  isVocab: true,
                  definition: {
                    en: 'Warm harmony, safety, and love shared among neighbors, faiths, and all creatures.',
                    id: 'Kedamaian, ketenteraman, dan kasih sayang yang menyatukan seluruh makhluk.'
                  },
                  phonics: {
                    en: '[PEES]',
                    id: '[da-MAI]'
                  }
                }
              ]
            },
            id: {
              text: 'Pada Hari Keempat Belas, keenam sahabat memamerkan hasil kebun dan temuan Taman Satwa kepada keluarga, menutup petualangan dua minggu dengan doa kedamaian!',
              audioStartMs: 0,
              audioEndMs: 8900,
              words: [
                { word: 'Pada', startMs: 0, endMs: 280 },
                { word: 'Hari', startMs: 290, endMs: 600 },
                { word: 'Keempat', startMs: 610, endMs: 1050 },
                { word: 'Belas,', startMs: 1060, endMs: 1500 },
                { word: 'keenam', startMs: 1510, endMs: 1950 },
                { word: 'sahabat', startMs: 1960, endMs: 2450 },
                { word: 'memamerkan', startMs: 2460, endMs: 3100 },
                { word: 'hasil', startMs: 3110, endMs: 3450 },
                { word: 'kebun', startMs: 3460, endMs: 3850 },
                { word: 'dan', startMs: 3860, endMs: 4100 },
                {
                  word: 'temuan',
                  startMs: 4110,
                  endMs: 4600,
                  isVocab: true,
                  definition: {
                    en: 'Exciting new things we learn and find when we study nature with curiosity.',
                    id: 'Pengetahuan dan hal baru yang ditemukan saat belajar mengamati alam.'
                  },
                  phonics: {
                    en: '[dih-SKUV-er-ee]',
                    id: '[te-MU-an]'
                  }
                },
                { word: 'Taman', startMs: 4610, endMs: 5000 },
                { word: 'Satwa', startMs: 5010, endMs: 5450 },
                { word: 'kepada', startMs: 5460, endMs: 5850 },
                { word: 'keluarga,', startMs: 5860, endMs: 6450 },
                { word: 'menutup', startMs: 6460, endMs: 6950 },
                { word: 'petualangan', startMs: 6960, endMs: 7550 },
                { word: 'dua', startMs: 7560, endMs: 7850 },
                { word: 'minggu', startMs: 7860, endMs: 8200 },
                { word: 'dengan', startMs: 8210, endMs: 8450 },
                { word: 'doa', startMs: 8460, endMs: 8650 },
                {
                  word: 'kedamaian!',
                  startMs: 8660,
                  endMs: 8900,
                  isVocab: true,
                  definition: {
                    en: 'Warm harmony, safety, and love shared among neighbors, faiths, and all creatures.',
                    id: 'Suasana rukun, aman, tenteram, dan penuh kasih sayang di antara sesama.'
                  },
                  phonics: {
                    en: '[PEES]',
                    id: '[ke-da-MAI-an]'
                  }
                }
              ]
            }
          },
          quiz: [
            {
              id: 'quiz-01-14',
              question: {
                en: 'Over the 14-Day (2-Week) Series, how did gardening, studying, visiting the zoo, and praying connect together?',
                id: 'Selama Seri 14 Hari (2 Minggu), bagaimana kegiatan berkebun, belajar, ke Taman Satwa, dan berdoa saling terhubung?'
              },
              options: [
                {
                  text: {
                    en: 'Learning science helps us care for plants and animals, and prayer fills our hearts with gratitude and peace!',
                    id: 'Belajar ilmu membantu kita merawat tanaman & satwa, sedangkan berdoa memenuhi hati dengan syukur dan kedamaian!'
                  },
                  isCorrect: true
                },
                {
                  text: {
                    en: 'They have nothing to do with each other at all',
                    id: 'Tidak ada hubungannya sama sekali'
                  },
                  isCorrect: false
                },
                {
                  text: {
                    en: 'Only grown-ups are allowed to care for nature',
                    id: 'Hanya orang dewasa yang boleh menyayangi alam'
                  },
                  isCorrect: false
                }
              ],
              explanation: {
                en: 'Mabruk & Congratulations on completing all 14 Days! You are now a Master Explorer of the Friendship Garden & Sanctuary Zoo!',
                id: 'Alhamdulillah & Selamat menyelesaikan seluruh 14 Hari! Kamu kini resmi menjadi Penjelajah Utama Taman Sahabat & Taman Satwa!'
              }
            }
          ],
          videoSpec: {
            wonderTitle: {
              en: 'I Wonder Why? · Day 14: How Do Plants, Animals & Humans Share One Planet?',
              id: 'Aku Ingin Tahu! · Hari 14: Bagaimana Tanaman, Satwa & Manusia Berbagi Satu Bumi?'
            },
            wonderQuestion: {
              en: 'Why do trees breathe out the exact oxygen that animals and children need to breathe in?',
              id: 'Mengapa pohon menghembuskan oksigen segar yang dibutuhkan oleh satwa dan anak-anak untuk bernapas?'
            },
            youtubeEmbedId: 'xpxfaLv3qCM',
            facts: [
              {
                id: 'fact-earth-symbiosis',
                question: {
                  en: 'I Wonder Why: How do plants and animals help each other breathe?',
                  id: 'Mengapa Ya: Bagaimana tanaman dan hewan saling membantu bernapas?'
                },
                answer: {
                  en: 'Green plants take in carbon dioxide and release fresh oxygen (O2), while animals and humans breathe in oxygen and give back carbon dioxide—a perfect circle of life!',
                  id: 'Tanaman hijau menyerap karbon dioksida dan menghasilkan oksigen segar (O₂), sedangkan satwa dan manusia menghirup oksigen—siklus kehidupan yang sempurna!'
                },
                diagramType: 'zoo-habitat'
              },
              {
                id: 'fact-peace-harmony',
                question: {
                  en: 'I Wonder Why: Why is kindness the universal language of the world?',
                  id: 'Mengapa Ya: Mengapa kebaikan dan doa menjadi bahasa universal dunia?'
                },
                answer: {
                  en: 'Whether we are gardening, studying in class, feeding zoo animals, or praying in gratitude, every act of kindness makes our shared Earth brighter!',
                  id: 'Baik saat berkebun, belajar di kelas, menyayangi satwa di kebun binatang, maupun berdoa, setiap kebaikan membuat bumi kita semakin damai!'
                },
                diagramType: 'prayer-peace'
              }
            ]
          }
        }
      ]
    }
  ]
};
