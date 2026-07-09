"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  songs: string[]; // filenames living in public/audios
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Turns "lofi-rainy-day_v2.mp3" into "lofi rainy day v2"
function formatSongName(filename: string): string {
  return filename.replace(/\.(mp3|wav|ogg|m4a)$/i, "").replace(/[-_]+/g, " ");
}

export function MusicPlayer({ songs }: MusicPlayerProps) {
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Shuffle only on the client, in an effect — never during the initial
  // render — so the server-rendered HTML and the first client render
  // match exactly (Math.random() in render would cause a hydration error).
  useEffect(() => {
    setQueue(shuffle(songs));
  }, [songs]);

  const currentSong = queue[index];

  const handleEnded = () => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= queue.length) {
        setQueue(shuffle(songs)); // reshuffle so the next loop isn't identical
        return 0;
      }
      return next;
    });
  };

  // Browsers block audio with sound until the user interacts with the
  // page at least once, so the first click both starts playback and
  // flips `started`. After that, the same button toggles play/pause.
  const togglePlay = () => {
    if (!started) {
      setStarted(true);
      setPlaying(true);
      // audio.play() is called by the effect below once currentSong is set
      return;
    }
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play().catch(() => {});
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay was blocked (no user gesture yet) — reflect that in the UI
        setPlaying(false);
      });
    }
  }, [currentSong, playing]);

  if (songs.length === 0) return null;

  return (
    <div
      data-cursor-expand
      onClick={togglePlay}
      role="button"
      aria-label={playing ? "Pause background music" : "Play background music"}
      className="group fixed bottom-6 right-6 z-50 flex items-center select-none"
    >
      {/* the spinning dish */}
      <div
        className={`relative w-12 h-12 shrink-0 rounded-full border-4 border-border bg-card shadow-lg flex items-center justify-center ${
          playing ? "animate-spin-slow" : ""
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-accent" />
        {/* a couple of grooves so it reads as a record/dish, not just a dot */}
        <div className="absolute inset-1.5 rounded-full border border-border/60" />
      </div>

      {/* label that expands on hover */}
      <div className="ml-0 max-w-0 overflow-hidden group-hover:max-w-60 group-hover:ml-3 transition-all duration-300 ease-out whitespace-nowrap">
        <p className="text-sm text-text bg-card border border-border px-3 py-1.5 rounded-full">
          {!started
            ? "Click to play music"
            : currentSong
              ? formatSongName(currentSong)
              : "Loading..."}
        </p>
      </div>

      {currentSong && (
        <audio ref={audioRef} src={`audios/${currentSong}`} onEnded={handleEnded} />
      )}
    </div>
  );
}