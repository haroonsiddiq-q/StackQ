"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useHover } from "@/app/components/hooks/hover-logic";
import { ThemeToggle } from "@/app/components/ui/theme-toggle";
import { formatSongName, useMusicPlayer } from "@/app/components/ui/music-player";

interface OptionsMenuProps {
  songs: string[];
}

interface SongDropdownProps {
  songs: string[];
  currentSong?: string;
  onSelect: (song: string) => void;
}

function SongDropdown({ songs, currentSong, onSelect }: SongDropdownProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={panelRef} className="relative w-full">
      <button
        data-cursor-expand
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        className="uppercase w-full text-left px-2 py-1.5 bg-border border-background flex items-center gap-2"
      >
        <Music className="w-4 h-4 shrink-0 stroke-current stroke-3" />
        <span className="truncate">
          {currentSong ? formatSongName(currentSong) : "Songs"}
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto bg-border border-background shadow-lg z-30">
          {songs.map((song) => {
            const active = song === currentSong;
            return (
              <button
                key={song}
                data-cursor-expand
                onClick={() => {
                  onSelect(song);
                  setOpen(false);
                }}
                className={`block w-full text-left px-2 py-1.5 text-xs truncate ${active ? "text-accent" : "text-text"
                  }`}
              >
                {formatSongName(song)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

function VolumeControl({ volume, onChange }: VolumeControlProps) {
  return (
    <div className="w-full flex items-center gap-2 px-2 py-1.5 bg-border border-background">
      {volume === 0 ? (
        <VolumeX className="w-4 h-4 shrink-0 stroke-current stroke-3" />
      ) : (
        <Volume2 className="w-4 h-4 shrink-0 stroke-current stroke-3" />
      )}
      <input
        data-cursor-expand
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Volume"
        className="w-full accent-accent"
      />
    </div>
  );
}

export function OptionsMenu({ songs }: OptionsMenuProps) {
  const [isHover, hoverProps] = useHover();
  const {
    currentSong,
    playing,
    volume,
    setVolume,
    audioRef,
    handleEnded,
    togglePlay,
    selectSong,
  } = useMusicPlayer(songs);

  return (
    <div
      {...hoverProps}
      className="fixed font-pixel text-xs top-4 right-4 z-50 flex flex-col items-end"
    >
      <button
        data-cursor-expand
        className="uppercase p-4 bg-card border-8 border-slash"
      >
        Options
      </button>

      {isHover && (
        <div className="mt-2 w-84 flex flex-col gap-2 bg-card border-8 border-slash p-3">
          <div className="flex items-center justify-between">
            <span className="uppercase text-xs">Theme</span>
            <ThemeToggle />
          </div>

          <div className="py-2 bg-border">
            <button
              data-cursor-expand
              onClick={togglePlay}
              className="uppercase w-full text-left px-2 py-1.5 bg-border border-background flex items-center gap-2"
            >
              {playing ? (
                <Pause className="w-4 h-4 shrink-0 stroke-current stroke-3" />
              ) : (
                <Play className="w-4 h-4 shrink-0 stroke-current stroke-3" />
              )}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>

            <VolumeControl volume={volume} onChange={setVolume} />

            <SongDropdown songs={songs} currentSong={currentSong} onSelect={selectSong} />
          </div>

        </div>
      )}

      {currentSong && (
        <audio ref={audioRef} src={`audios/${currentSong}`} onEnded={handleEnded} />
      )}
    </div>
  );
}