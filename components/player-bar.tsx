"use client"; // Ensure this component runs on the client side only

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "./PlayerProvider";
import { motion } from "framer-motion";
import { useEffect } from "react";
import type { ProjectInfo } from "./spotify-layout"; // Adjust path if needed

interface PlayerBarProps {
  activeProject: ProjectInfo | null;
  isMobile: boolean;
  toggleMobileMenu: () => void; // Function passed from parent
}

export function PlayerBar({
  activeProject,
  isMobile,
  toggleMobileMenu,
}: PlayerBarProps) {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolumeChange,
  } = usePlayer();

  // Ensuring toggleMobileMenu is used only on the client-side
  useEffect(() => {
    // You can directly call the function here if needed
    console.log("toggleMobileMenu function is ready to be used");
    // For example, you can call toggleMobileMenu in an event or when the component mounts
    // toggleMobileMenu();
  }, [toggleMobileMenu]); // Add toggleMobileMenu as a dependency

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-16 bg-black/90 border-t border-neutral-800 fixed bottom-0 left-0 right-0 flex items-center justify-between w-full px-6">
      {/* Song Info */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <img
          src={songs[currentSongIndex]?.albumArt || ""}
          alt={songs[currentSongIndex]?.title || "Unknown Song"}
          className="w-12 h-12 rounded-md object-cover shadow-md"
        />
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">
            {songs[currentSongIndex]?.title || "Unknown Title"}
          </span>
          <span className="text-gray-400 text-xs">
            {songs[currentSongIndex]?.author || "Unknown Author"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-[38%] -ml-10">
        <div className="flex items-center gap-5 mb-[1px]">
          <button
            onClick={handlePrev}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={16} />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-black rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform shadow-md mt-[4px]"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          </motion.button>
          <button
            onClick={handleNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Seek Bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0.001}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-1 accent-green-500 rounded-lg cursor-pointer"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 min-w-[180px] justify-end">
        <button
          onClick={() => handleVolumeChange(volume === 0 ? 50 : 0)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="w-[100px] h-1 accent-green-500 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}
