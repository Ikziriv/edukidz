import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStoryStore, SCENE_CHOREOGRAPHY } from '../../stores/storyStore';
import type {
  ActivityCategory,
  SelectableCharacterId,
  VideoCameraShot,
  VideoSourceMode,
  WonderFactCard
} from '../../types/story';
import { CHARACTER_PALETTES } from '../../constants/characterRegistry';
import { soundEngine } from '../../services/audioEngine';
import { useT } from '../../lib/i18n';
import { drawAnimatedBroadcastCharacter } from './canvas/drawBroadcastActor';
import { drawWonderScienceCutaway } from './canvas/drawWonderCutaway';
import { drawEpisodeBroadcastEnvironment } from './canvas/drawEpisodeStage';
import {
  extractYouTubeId,
  YouTubeEmbedPlayer,
  Mp4StreamPlayer
} from './ExternalVideoPlayers';
import { VideoStudioTopDock } from './VideoStudioTopDock';
import { CinemaSubtitleDock } from './CinemaSubtitleDock';

export const StoryVideoStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const [sourceMode, setSourceMode] = useState<VideoSourceMode>('studio-reel');
  const [cameraShot, setCameraShot] = useState<VideoCameraShot>('auto');
  const [activeFactIdx, setActiveFactIdx] = useState(0);
  const [showEpisodeStrip, setShowEpisodeStrip] = useState(false);
  const [isWonderCardExpanded, setIsWonderCardExpanded] = useState(true);
  const [autoNextEpisode, setAutoNextEpisode] = useState(true);
  const [customYoutubeInput, setCustomYoutubeInput] = useState(
    'https://www.youtube.com/watch?v=xpxfaLv3qCM'
  );
  const [activeYoutubeId, setActiveYoutubeId] = useState('xpxfaLv3qCM');
  const [customMp4Url, setCustomMp4Url] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );

  const currentStory = useStoryStore((s) => s.currentStory);
  const currentScene = useStoryStore((s) => s.currentScene);
  const currentSceneIndex = useStoryStore((s) => s.currentSceneIndex);
  const selectScene = useStoryStore((s) => s.selectScene);
  const nextScene = useStoryStore((s) => s.nextScene);
  const prevScene = useStoryStore((s) => s.prevScene);
  const language = useStoryStore((s) => s.language);
  const activeMode = useStoryStore((s) => s.activeMode);
  const isPlaying = useStoryStore((s) => s.isPlaying);
  const togglePlay = useStoryStore((s) => s.togglePlay);
  const activeWordIndex = useStoryStore((s) => s.activeWordIndex);
  const speakingCharacter = useStoryStore((s) => s.speakingCharacter);
  const openVocab = useStoryStore((s) => s.openVocab);
  const openQuiz = useStoryStore((s) => s.openQuiz);
  const t = useT();

  const totalEpisodes = currentStory.scenes.length;
  const activeDayNumber = currentScene.dayNumber ?? currentSceneIndex + 1;
  const activeCategory: ActivityCategory = currentScene.activityCategory ?? 'gardening';
  const wasPlayingRef = useRef(false);

  // Reset fact index and YouTube reference when switching episodes
  useEffect(() => {
    setActiveFactIdx(0);
    if (currentScene.videoSpec?.youtubeEmbedId) {
      setActiveYoutubeId(currentScene.videoSpec.youtubeEmbedId);
    }
  }, [currentScene.id, currentScene.videoSpec?.youtubeEmbedId]);

  // Continuous Series Auto-Advance
  useEffect(() => {
    if (isPlaying) {
      wasPlayingRef.current = true;
      return;
    }
    if (wasPlayingRef.current && !isPlaying && autoNextEpisode && activeWordIndex === -1) {
      wasPlayingRef.current = false;
      if (currentSceneIndex < totalEpisodes - 1) {
        const timer = window.setTimeout(() => {
          const st = useStoryStore.getState();
          if (!st.isPlaying && st.visualMode === 'VIDEO') {
            st.nextScene();
            window.setTimeout(() => {
              const s2 = useStoryStore.getState();
              if (!s2.isPlaying && s2.visualMode === 'VIDEO') {
                s2.togglePlay();
              }
            }, 350);
          }
        }, 1200);
        return () => window.clearTimeout(timer);
      }
    }
  }, [isPlaying, autoNextEpisode, activeWordIndex, currentSceneIndex, totalEpisodes]);

  const videoSpec = currentScene.videoSpec;
  const facts: WonderFactCard[] = videoSpec?.facts ?? [
    {
      id: 'default-fact',
      question: {
        en: 'I Wonder Why: How do tiny seeds wake up?',
        id: 'Mengapa Ya: Bagaimana benih kecil terbangun?'
      },
      answer: {
        en: 'Warm water softens the seed coat so the baby plant inside can stretch its roots downward and leaves upward!',
        id: 'Air hangat melunakkan kulit biji sehingga calon tanaman bisa menjulurkan akar ke bawah dan daun ke atas!'
      },
      diagramType: 'seed-roots'
    }
  ];
  const currentFact = facts[activeFactIdx % facts.length] ?? facts[0];
  const words = currentScene.dialogue[language].words;
  const totalWords = Math.max(1, words.length);
  const progressRatio = activeWordIndex >= 0 ? (activeWordIndex + 1) / totalWords : 0;

  const resolvedShot: Exclude<VideoCameraShot, 'auto'> =
    cameraShot !== 'auto'
      ? cameraShot
      : !isPlaying && activeWordIndex < 0
        ? 'establishing'
        : progressRatio < 0.25
          ? 'establishing'
          : progressRatio < 0.58
            ? 'closeup'
            : progressRatio < 0.85
              ? 'wonder-cutaway'
              : 'celebration';

  // Auto-cycle fact cards as narration progresses
  useEffect(() => {
    if (!isPlaying || facts.length <= 1) return;
    const targetIdx = Math.min(facts.length - 1, Math.floor(progressRatio * facts.length));
    setActiveFactIdx(targetIdx);
  }, [isPlaying, progressRatio, facts.length]);

  // Synchronize HTML5 <video> element with narration Play/Pause state
  useEffect(() => {
    if (sourceMode !== 'mp4-stream' || !videoElementRef.current) return;
    const vid = videoElementRef.current;
    if (isPlaying) {
      vid.play().catch(() => {
        /* browser autoplay guard */
      });
    } else {
      vid.pause();
    }
  }, [isPlaying, sourceMode]);

  const handleApplyYoutubeUrl = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      soundEngine.playSFX('chime');
      setActiveYoutubeId(extractYouTubeId(customYoutubeInput));
    },
    [customYoutubeInput]
  );

  // 60 FPS "I Wonder Why" Broadcast Animation Canvas Loop
  useEffect(() => {
    if (sourceMode !== 'studio-reel') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, rect.width);
      height = Math.max(240, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    const resizeObs = new ResizeObserver(updateSize);
    resizeObs.observe(canvas);

    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const store = useStoryStore.getState();
      const isNight = store.activeMode === 'sleeping';
      const speaking = store.speakingCharacter;
      const playing = store.isPlaying;

      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Broadcast Sky Backdrop
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isNight) {
        skyGrad.addColorStop(0, '#090d1a');
        skyGrad.addColorStop(0.6, '#17213c');
        skyGrad.addColorStop(1, '#1e293b');
      } else if (resolvedShot === 'celebration') {
        skyGrad.addColorStop(0, '#f59e0b');
        skyGrad.addColorStop(0.45, '#fde047');
        skyGrad.addColorStop(1, '#dcfce7');
      } else {
        skyGrad.addColorStop(0, '#38bdf8');
        skyGrad.addColorStop(0.55, '#bae6fd');
        skyGrad.addColorStop(1, '#fef9c3');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Virtual Camera Ken Burns Pan & Zoom Transform
      ctx.save();
      const zoom =
        resolvedShot === 'closeup'
          ? 1.16 + Math.sin(elapsed * 0.6) * 0.02
          : resolvedShot === 'wonder-cutaway'
            ? 1.04
            : 1.0 + Math.sin(elapsed * 0.45) * 0.035;
      const panX =
        resolvedShot === 'establishing'
          ? Math.sin(elapsed * 0.5) * 22
          : resolvedShot === 'wonder-cutaway'
            ? -width * 0.14
            : 0;
      ctx.translate(width / 2 + panX, height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-width / 2, -height / 2);

      // 2. Animated Sunbeams / Twinkling Stars
      if (isNight) {
        for (let i = 0; i < 24; i++) {
          const sx = ((i * 97) % 100) * (width / 100);
          const sy = ((i * 53) % 55) * (height / 100);
          const twinkle = 0.35 + Math.abs(Math.sin(elapsed * 2 + i)) * 0.65;
          ctx.fillStyle = `rgba(254, 240, 138, ${twinkle.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 3) + 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const sunX = width * 0.82;
        const sunY = height * 0.2;
        ctx.fillStyle = 'rgba(254, 240, 138, 0.32)';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 56 + Math.sin(elapsed * 2) * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drifting Clouds
      ctx.fillStyle = isNight ? 'rgba(148, 163, 184, 0.15)' : 'rgba(255, 255, 255, 0.78)';
      for (let c = 0; c < 4; c++) {
        const cx = ((c * 260 + elapsed * (12 + c * 3)) % (width + 180)) - 90;
        const cy = height * (0.16 + (c % 2) * 0.09);
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy - 6, 28, 0, Math.PI * 2);
        ctx.arc(cx + 42, cy, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Episode-Specific Broadcast Stage Environment (with PvZ Checkerboard Lawn & Smiling Botanical Buddies)
      const sceneObj = store.currentScene;
      const dayNum = sceneObj.dayNumber ?? store.currentSceneIndex + 1;
      const cat: ActivityCategory = sceneObj.activityCategory ?? 'gardening';
      const isLanternNight = isNight || dayNum === 7;

      drawEpisodeBroadcastEnvironment(ctx, width, height, dayNum, cat, isLanternNight, elapsed);

      // 4. Multi-Camera Character Stage Arrangement
      const beats = SCENE_CHOREOGRAPHY[sceneObj.id] ?? SCENE_CHOREOGRAPHY['scene-1'];
      const leadId: SelectableCharacterId = sceneObj.leadCharacter ?? beats[0]?.actor ?? 'aisyah';
      const compA: SelectableCharacterId =
        beats[1]?.actor && beats[1].actor !== leadId ? beats[1].actor : 'mateo';
      const compB: SelectableCharacterId =
        beats[2]?.actor && beats[2].actor !== leadId && beats[2].actor !== compA
          ? beats[2].actor
          : 'sofia';
      const primaryActor =
        CHARACTER_PALETTES[speaking] ?? CHARACTER_PALETTES[leadId] ?? CHARACTER_PALETTES.aisyah;
      const companionId: SelectableCharacterId = speaking === compA ? compB : compA;
      const companionActor = CHARACTER_PALETTES[companionId] ?? CHARACTER_PALETTES.mateo;
      const thirdActor = CHARACTER_PALETTES[compB] ?? CHARACTER_PALETTES.sofia;

      if (resolvedShot === 'closeup') {
        drawAnimatedBroadcastCharacter(
          ctx,
          companionActor,
          width * 0.36,
          height * 0.51,
          1.0,
          elapsed + 1.2,
          false,
          true
        );
        drawAnimatedBroadcastCharacter(
          ctx,
          primaryActor,
          width * 0.6,
          height * 0.49,
          1.2,
          elapsed,
          playing,
          !playing
        );
      } else if (resolvedShot === 'wonder-cutaway') {
        drawAnimatedBroadcastCharacter(
          ctx,
          primaryActor,
          width * 0.38,
          height * 0.52,
          1.08,
          elapsed,
          playing,
          true
        );
      } else if (resolvedShot === 'celebration') {
        const order: SelectableCharacterId[] = ['sofia', 'kenji', 'aisyah', 'mateo', 'mei', 'amara'];
        order.forEach((cid, idx) => {
          const charX = width * (0.17 + idx * 0.132);
          const charY = height * (0.53 + (idx % 2 === 0 ? 0.02 : -0.02));
          drawAnimatedBroadcastCharacter(
            ctx,
            CHARACTER_PALETTES[cid],
            charX,
            charY,
            0.84,
            elapsed + idx * 0.6,
            playing && cid === speaking,
            false
          );
        });
      } else {
        drawAnimatedBroadcastCharacter(
          ctx,
          thirdActor,
          width * 0.27,
          height * 0.54,
          0.9,
          elapsed + 0.8,
          false,
          false
        );
        drawAnimatedBroadcastCharacter(
          ctx,
          primaryActor,
          width * 0.5,
          height * 0.5,
          1.08,
          elapsed,
          playing,
          true
        );
        drawAnimatedBroadcastCharacter(
          ctx,
          companionActor,
          width * 0.73,
          height * 0.54,
          0.92,
          elapsed + 1.7,
          false,
          false
        );
      }

      ctx.restore();

      // 5. Render the Animated "I Wonder Why?" Science Cutaway Overlay
      if (resolvedShot === 'wonder-cutaway') {
        const cardW = Math.min(310, width * 0.44);
        const cardH = Math.min(225, height * 0.52);
        drawWonderScienceCutaway(
          ctx,
          width - cardW - 18,
          height * 0.16,
          cardW,
          cardH,
          currentFact.diagramType,
          elapsed,
          language
        );
      }

      // 6. Subtle Broadcast Vignette
      const vig = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(15, 23, 42, 0.32)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObs.disconnect();
    };
  }, [sourceMode, resolvedShot, currentFact.diagramType, language, currentScene.id]);

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none flex flex-col justify-between">
      {/* 1. ACTIVE VIDEO VIEWPORT LAYER */}
      {sourceMode === 'studio-reel' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          aria-label={t(
            'Animasi Video Cerita Interaktif I Wonder Why',
            'Interactive I Wonder Why Story Video Animation'
          )}
        />
      )}

      {sourceMode === 'youtube-embed' && (
        <YouTubeEmbedPlayer
          activeYoutubeId={activeYoutubeId}
          customYoutubeInput={customYoutubeInput}
          setCustomYoutubeInput={setCustomYoutubeInput}
          onApplyYoutubeUrl={handleApplyYoutubeUrl}
          onSelectSourceMode={setSourceMode}
        />
      )}

      {sourceMode === 'mp4-stream' && (
        <Mp4StreamPlayer
          videoElementRef={videoElementRef}
          mp4Src={videoSpec?.mp4Url || customMp4Url}
          customMp4Url={customMp4Url}
          setCustomMp4Url={setCustomMp4Url}
          onSelectSourceMode={setSourceMode}
        />
      )}

      {/* 2. PERIPHERAL TOP-RIGHT STUDIO DOCK & TOP-LEFT CURIOSITY BADGE */}
      <VideoStudioTopDock
        sourceMode={sourceMode}
        setSourceMode={setSourceMode}
        cameraShot={cameraShot}
        setCameraShot={setCameraShot}
        activeDayNumber={activeDayNumber}
        totalEpisodes={totalEpisodes}
        showEpisodeStrip={showEpisodeStrip}
        setShowEpisodeStrip={setShowEpisodeStrip}
        autoNextEpisode={autoNextEpisode}
        setAutoNextEpisode={setAutoNextEpisode}
        scenes={currentStory.scenes}
        currentSceneIndex={currentSceneIndex}
        selectScene={selectScene}
        language={language}
        isWonderCardExpanded={isWonderCardExpanded}
        setIsWonderCardExpanded={setIsWonderCardExpanded}
        activeFactIdx={activeFactIdx}
        setActiveFactIdx={setActiveFactIdx}
        facts={facts}
        currentFact={currentFact}
      />

      {/* 3. SLEEK CINEMA LOWER-THIRD SUBTITLE PILL */}
      {sourceMode === 'studio-reel' && (
        <CinemaSubtitleDock
          speakingCharacter={speakingCharacter}
          currentSceneIndex={currentSceneIndex}
          totalEpisodes={totalEpisodes}
          activeDayNumber={activeDayNumber}
          activeCategory={activeCategory}
          prevScene={prevScene}
          nextScene={nextScene}
          resolvedShot={resolvedShot}
          setCameraShot={setCameraShot}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          activeMode={activeMode}
          openQuiz={openQuiz}
          words={words}
          activeWordIndex={activeWordIndex}
          openVocab={openVocab}
        />
      )}
    </div>
  );
};
