import React from 'react';
import { Tv, Link2 } from 'lucide-react';
import type { VideoSourceMode } from '../../types/story';
import { useT } from '../../lib/i18n';

export function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').slice(0, 11) || 'xpxfaLv3qCM';
    }
    const vParam = url.searchParams.get('v');
    if (vParam) return vParam.slice(0, 11);
    const parts = url.pathname.split('/');
    const embedIdx = parts.indexOf('embed');
    if (embedIdx !== -1 && parts[embedIdx + 1]) {
      return parts[embedIdx + 1].slice(0, 11);
    }
  } catch {
    // ignore invalid URL
  }
  return 'xpxfaLv3qCM';
}

interface YouTubeEmbedPlayerProps {
  activeYoutubeId: string;
  customYoutubeInput: string;
  setCustomYoutubeInput: (val: string) => void;
  onApplyYoutubeUrl: (e: React.FormEvent) => void;
  onSelectSourceMode: (mode: VideoSourceMode) => void;
}

export const YouTubeEmbedPlayer: React.FC<YouTubeEmbedPlayerProps> = ({
  activeYoutubeId,
  customYoutubeInput,
  setCustomYoutubeInput,
  onApplyYoutubeUrl,
  onSelectSourceMode
}) => {
  const t = useT();

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-950 pt-14 pb-24 px-3 sm:px-6">
      <div className="relative flex-1 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/40 bg-black">
        <iframe
          key={activeYoutubeId}
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${activeYoutubeId}?rel=0&modestbranding=1&playsinline=1`}
          title="EduKidz I Wonder Why Educational Animation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <form
        onSubmit={onApplyYoutubeUrl}
        className="mt-2 max-w-3xl w-full mx-auto flex flex-wrap items-center gap-1.5 bg-slate-900/90 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white z-30 pointer-events-auto"
      >
        <Tv size={15} className="text-red-400 shrink-0" aria-hidden="true" />
        <span className="font-bold text-amber-300 shrink-0">
          {t('Referensi Video:', 'Video Reference:')}
        </span>
        <input
          type="text"
          value={customYoutubeInput}
          onChange={(e) => setCustomYoutubeInput(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=xpxfaLv3qCM"
          className="flex-1 min-w-[180px] bg-slate-800/90 text-white px-2.5 py-1 rounded-lg border border-white/15 text-xs focus:outline-none focus:border-amber-400"
          aria-label={t('URL atau ID YouTube', 'YouTube URL or ID')}
        />
        <button
          type="submit"
          className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
        >
          {t('Muat Video', 'Load Video')}
        </button>
        <button
          type="button"
          onClick={() => onSelectSourceMode('studio-reel')}
          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          {t('Kembali ke Animasi Studio', 'Back to Studio Reel')}
        </button>
      </form>
    </div>
  );
};

interface Mp4StreamPlayerProps {
  videoElementRef: React.RefObject<HTMLVideoElement | null>;
  mp4Src: string;
  customMp4Url: string;
  setCustomMp4Url: (val: string) => void;
  onSelectSourceMode: (mode: VideoSourceMode) => void;
}

export const Mp4StreamPlayer: React.FC<Mp4StreamPlayerProps> = ({
  videoElementRef,
  mp4Src,
  customMp4Url,
  setCustomMp4Url,
  onSelectSourceMode
}) => {
  const t = useT();

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-950 pt-14 pb-24 px-3 sm:px-6">
      <div className="relative flex-1 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/40 bg-black flex items-center justify-center">
        <video
          ref={videoElementRef}
          src={mp4Src}
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
        />
      </div>
      <div className="mt-2 max-w-3xl w-full mx-auto flex flex-wrap items-center gap-1.5 bg-slate-900/90 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white z-30 pointer-events-auto">
        <Link2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
        <span className="font-bold text-emerald-300 shrink-0">MP4 / HLS URL:</span>
        <input
          type="url"
          value={customMp4Url}
          onChange={(e) => setCustomMp4Url(e.target.value)}
          placeholder="https://.../episode-01.mp4"
          className="flex-1 min-w-[180px] bg-slate-800/90 text-white px-2.5 py-1 rounded-lg border border-white/15 text-xs focus:outline-none focus:border-emerald-400"
        />
        <button
          type="button"
          onClick={() => onSelectSourceMode('studio-reel')}
          className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
        >
          {t('Mode Animasi Interaktif', 'Interactive Animation Reel')}
        </button>
      </div>
    </div>
  );
};

