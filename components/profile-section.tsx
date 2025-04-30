"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProfileSectionProps {
  title?: string;
  githubUsername?: string;
}

export function ProfileSection({
  title = "Top Projects",
  githubUsername = "Immanuel-Anthony", // Default username
}: ProfileSectionProps) {
  const [profilePic, setProfilePic] = useState("/placeholder.svg?height=192&width=192");
  const [repositoriesCount, setRepositoriesCount] = useState<number>(0);

  // Fetch repositories count from GitHub API
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
          throw new Error("GitHub API error: " + response.statusText);
        }

        const repos = await response.json();
        setRepositoriesCount(repos.length || 0); // Set repository count
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    }

    if (githubUsername) {
      fetchRepos();
    }
  }, [githubUsername]);

  // Dynamically fetch GitHub avatar
  useEffect(() => {
    if (githubUsername) {
      setProfilePic(`https://github.com/${githubUsername}.png`);
    }
  }, [githubUsername]);

  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-end gap-6 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-black/50 border-4 border-neutral-700/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <img src={profilePic} alt="Profile" className="object-cover w-full h-full" />
      </motion.div>
      <motion.div 
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Profile</div>
        <h1 className="text-7xl font-bold tracking-tight">Immanuel Anthony</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <span className="font-medium">{title}</span>
          <span>•</span>
          <span>Only visible to you</span>
        </div>
        <p className="text-gray-300 mt-2 max-w-2xl">
          Python developer, interested in Artificial Intelligence and Machine Learning. Occasional Back-End developer specializing in Java and Spring Boot.
        </p>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="text-gray-400">
            <span className="text-white font-medium">{repositoriesCount}</span>{" "}
            {repositoriesCount === 1 ? "Project" : "Projects"}
          </div>
          <div className="text-gray-400">
            <span className="text-white font-medium">21</span> Technologies
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}