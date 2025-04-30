// components/ClientLayout.tsx

"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerProvider } from "@/components/PlayerProvider";
import { PlayerBar } from "@/components/player-bar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeProject = null;
  const isMobile = false;
  const toggleMobileMenu = () => {};

  useEffect(() => {
    // Client-side effect logic here
    console.log("ClientLayout is mounted");
  }, []); // Empty dependency ensures it runs once after the component mounts

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <PlayerProvider>
        {children}
        <PlayerBar
          activeProject={activeProject}
          isMobile={isMobile}
          toggleMobileMenu={toggleMobileMenu}
        />
      </PlayerProvider>
    </ThemeProvider>
  );
}