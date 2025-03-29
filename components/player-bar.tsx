"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Github } from "lucide-react";

interface Song {
  id: string;
  title: string;
  author: string;
  albumArt: string;
  src: string;
}

interface PlayerBarProps {
  isMobile?: boolean;
  toggleMobileMenu?: () => void;
}

export function PlayerBar({ isMobile, toggleMobileMenu }: PlayerBarProps) {
  const songs: Song[] = [
    {
      id: "song1",
      title: "hope to see you again",
      author: "antent",
      albumArt: "/hope-to-see-you-again.jpg",
      src: "/hope-to-see-you-again.mp3",
    },
    {
      id: "song2",
      title: "snowfall",
      author: "reidenshi and Øneheart",
      albumArt: "/snowfall.jpg",
      src: "/snowfall.mp3",
    },
    {
      id: "song3",
      title: "rain inside",
      author: "Antent and Øneheart",
      albumArt: "/rain_inside.jpg",
      src: "/rain_inside.mp3",
    },
    {
      id: "song4",
      title: "your eyes",
      author: "Antent",
      albumArt: "/your_eyes.jpg",
      src: "/your_eyes.mp3",
    },
    {
      id: "song5",
      title: "i’ll be your reason",
      author: "Antent",
      albumArt: "/your_reason.jpg",
      src: "/your_reason.mp3",
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Cleanup and reset the audio when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current.load();
      audioRef.current.volume = volume / 100;
      audioRef.current.currentTime = 0;

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
      }
    } else {
      audioRef.current = new Audio(songs[currentSongIndex].src);
      audioRef.current.volume = volume / 100;
      audioRef.current.currentTime = 0;

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
      }
    }
  }, [currentSongIndex]);

  // ✅ Handle play/pause properly without overlapping
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // ✅ Handle song end to go to the next song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  // ✅ Update currentTime and duration dynamically
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    setVolume(newVolume);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-20 bg-neutral-900 border-t border-neutral-800 fixed bottom-0 left-0 right-0 flex items-center justify-between w-full">
      {/* Song Info Section */}
      <div className="flex-1 flex items-center gap-4 pl-4 min-w-[200px]">
        <img
          src={songs[currentSongIndex].albumArt}
          alt={songs[currentSongIndex].title}
          className="w-14 h-14 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-medium">{songs[currentSongIndex].title}</span>
          <span className="text-gray-400 text-sm">{songs[currentSongIndex].author}</span>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex-1 max-w-[800px] flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={16} />
          </button>
          <button
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          </button>
          <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
        </div>

        {/* Seek Bar */}
        <div className="w-full flex items-center gap-2 px-4">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0.001}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume and GitHub Section */}
      <div className="flex-1 flex items-center justify-end gap-4 pr-4 min-w-[200px]">
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Github size={20} />
        </a>
      </div>
    </div>
  );
}
