"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileSectionProps {
  title?: string;
  githubUsername?: string;
}

export function ProfileSection({
  title = "Top Projects",
  githubUsername = "your-github-username",
}: ProfileSectionProps) {
  const [profilePic, setProfilePic] = useState("/placeholder.svg?height=192&width=192");

  useEffect(() => {
    if (githubUsername) {
      // ✅ Dynamically fetch GitHub avatar
      setProfilePic(`https://github.com/${githubUsername}.png`);
    }
  }, [githubUsername]);

  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-end gap-6 pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-black/50 border-4 border-neutral-700/50">
        {/* ✅ Replaced Image component with dynamically fetched profilePic */}
        <img
          src={profilePic}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Profile</div>
        <h1 className="text-7xl font-bold tracking-tight">Immanuel Anthony</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <span className="font-medium">{title}</span>
          <span>•</span>
          <span>Only visible to you</span>
        </div>
        <p className="text-gray-300 mt-2 max-w-2xl">
          Back-End developer specializing in Java and Spring Boot. Occasional Python developer, interested in
          Artificial Intelligence and Machine Learning.
        </p>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="text-gray-400">
            <span className="text-white font-medium">13</span> Projects
          </div>
          <div className="text-gray-400">
            <span className="text-white font-medium">21</span> Technologies
          </div>
        </div>
      </div>
    </motion.div>
  );
}
