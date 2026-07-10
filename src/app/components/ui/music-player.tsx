"use client";

import { useEffect, useRef, useState } from "react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function formatSongName(filename: string): string {
  return filename.replace(/\.mp3$/i, "");
}

export function useMusicPlayer(songs: string[]) {
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setQueue(shuffle(songs));
  }, [songs]);

  const currentSong = queue[index];

  useEffect(() => {
    if (started) return;

    const start = () => {
      setStarted(true);
      setPlaying(true);
    };

    document.addEventListener("pointerdown", start, { once: true });
    document.addEventListener("keydown", start, { once: true });

    return () => {
      document.removeEventListener("pointerdown", start);
      document.removeEventListener("keydown", start);
    };
  }, [started]);

  const handleEnded = () => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= queue.length) {
        setQueue(shuffle(songs));
        return 0;
      }
      return next;
    });
  };

  const togglePlay = () => {
    if (!started) {
      setStarted(true);
      setPlaying(true);
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

  const selectSong = (song: string) => {
    const songIndex = queue.indexOf(song);
    if (songIndex !== -1) setIndex(songIndex);
    setStarted(true);
    setPlaying(true);
  };

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [currentSong, playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return {
    currentSong,
    playing,
    volume,
    setVolume,
    audioRef,
    handleEnded,
    togglePlay,
    selectSong,
  };
}