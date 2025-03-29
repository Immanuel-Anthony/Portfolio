"use client";

import { useState, useEffect } from "react";

interface AvatarProps {
  githubUsername?: string;
  size?: number; // Size for flexibility
}

export function Avatar({ githubUsername = "your-github-username", size = 48 }: AvatarProps) {
  const [profilePic, setProfilePic] = useState("/placeholder.svg");

  useEffect(() => {
    if (githubUsername) {
      // ✅ Fetch GitHub PFP dynamically
      setProfilePic(`https://github.com/${githubUsername}.png`);
    }
  }, [githubUsername]);

  return (
    <img
      src={profilePic}
      alt="Profile"
      className={`rounded-full border-2 border-neutral-700`}
      width={size}
      height={size}
    />
  );
}
