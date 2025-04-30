"use client";

import { useEffect, useState } from "react";
import { SpotifyLayout } from "@/components/spotify-layout";
import { ProfileSection } from "@/components/profile-section";
import { ProjectsGrid } from "@/components/ui/projects-grid";

export default function Home() {
  const githubUsername = "Immanuel-Anthony";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents black screen on initial load

  return (
    <SpotifyLayout showFullProfile={true} githubUsername={githubUsername}>
      <div className="flex flex-col gap-8 p-6">
        <ProfileSection githubUsername={githubUsername} />
        <ProjectsGrid limit={6} showViewAll={true} />
      </div>
    </SpotifyLayout>
  );
}
