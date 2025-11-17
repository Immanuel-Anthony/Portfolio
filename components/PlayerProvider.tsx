"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // Changed from useRouter

interface Song {
  id: string;
  title: string;
  author: string;
  albumArt: string;
  src: string;
}

interface PlayerContextType {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  togglePlay: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (time: number) => void;
  handleVolumeChange: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const songs: Song[] = [
    {
      id: "song1",
      title: "hope to see you again",
      author: "antent",
      albumArt: `/portfolio/hope-to-see-you-again.jpg`,
      src: `/portfolio/hope-to-see-you-again.mp3`,
    },
    {
      id: "song2",
      title: "snowfall",
      author: "reidenshi and Øneheart",
      albumArt: `/portfolio/snowfall.jpg`,
      src: `/portfolio/snowfall.mp3`,
    },
    {
      id: "song3",
      title: "rain inside",
      author: "Antent and Øneheart",
      albumArt: `/portfolio/rain_inside.jpg`,
      src: `/portfolio/rain_inside.mp3`,
    },
    {
      id: "song4",
      title: "your eyes",
      author: "Antent",
      albumArt: `/portfolio/your_eyes.jpg`,
      src: `/portfolio/your_eyes.mp3`,
    },
    {
      id: "song5",
      title: "i'll be your reason",
      author: "Antent",
      albumArt: `/portfolio/your_reason.jpg`,
      src: `/portfolio/your_reason.mp3`,
    },
  ];


  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio only on client side
  useEffect(() => {
    // This hook only runs in the browser, not during SSR
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSongIndex].src);
      audioRef.current.volume = volume / 100;
    } else {
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSongIndex, songs, isPlaying, volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleEnded = () => handleNext();
    audioRef.current.addEventListener("ended", handleEnded);
    
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateTime = () => setCurrentTime(audioRef.current!.currentTime);
    const setAudioData = () => setDuration(audioRef.current!.duration);

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateTime);
      audioRef.current?.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    setVolume(volume);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
}