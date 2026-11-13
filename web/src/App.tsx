import { useEffect } from 'react';
import { useStoryStore } from './stores/storyStore';
import { TopNavBar } from './components/navigation/TopNavBar';
import { ChapterRail } from './components/story/ChapterRail';
import { StoryStage } from './components/stage/StoryStage';
import { KaraokeReader } from './components/study/KaraokeReader';
import { PlaybackDock } from './components/controls/PlaybackDock';
import { CharacterRoster } from './components/story/CharacterRoster';
import { HotspotModal } from './components/modals/HotspotModal';
import { VocabModal } from './components/modals/VocabModal';
import { QuizModal } from './components/modals/QuizModal';

export function App() {
  const activeMode = useStoryStore((s) => s.activeMode);
  const currentStory = useStoryStore((s) => s.currentStory);
  const togglePlay = useStoryStore((s) => s.togglePlay);
  const nextScene = useStoryStore((s) => s.nextScene);
  const prevScene = useStoryStore((s) => s.prevScene);
  const selectScene = useStoryStore((s) => s.selectScene);

  // Keyboard accessibility: Space to play/pause, Left/Right for scenes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or button
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevScene();
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < currentStory.scenes.length) {
          selectScene(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextScene, prevScene, selectScene, currentStory.scenes.length]);

  return (
    <div className={`theme-${activeMode} min-h-screen flex flex-col justify-between relative`}>
      {/* Dynamic Paper Grain & Glow Backdrop */}
      <div className="app-backdrop" aria-hidden="true" />

      {/* Main App Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Floating Header */}
        <TopNavBar />

        {/* Story Workspace */}
        <main id="story" className="max-w-6xl mx-auto px-3 sm:px-6 pt-3 pb-32 w-full space-y-5">
          {/* Unified Editorial Display Header & 14-Day Chapter Rail */}
          <ChapterRail />

          {/* Dual 3D / 2D Viewport Stage */}
          <StoryStage />

          {/* Bilingual Phonics Karaoke Reader */}
          <KaraokeReader />

          {/* Interactive Character Roster */}
          <CharacterRoster />
        </main>
      </div>

      {/* Floating Bottom Playback Dock (z-[70] stays accessible in Fullscreen mode) */}
      <footer className="fixed bottom-0 left-0 right-0 z-[70] pointer-events-none">
        <div className="pointer-events-auto">
          <PlaybackDock />
        </div>
      </footer>

      {/* Accessible Interactive Modals */}
      <HotspotModal />
      <VocabModal />
      <QuizModal />
    </div>
  );
}

export default App;
