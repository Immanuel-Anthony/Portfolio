"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PlayerBar } from "@/components/player-bar"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"
import { MobileMenu } from "@/components/mobile-menu"
import { usePathname } from "next/navigation"
import { SmallProfilePicture } from "./small-profile-picture"

export type NavItem = {
  name: string
  icon: React.ReactNode
  href: string
  active?: boolean
}

export type ProjectInfo = {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
}

export type ActiveSection = "projects" | "skills" | "experience" | "tools" | "contact"

interface SpotifyLayoutProps {
  children: React.ReactNode
  activeSection?: ActiveSection
  showFullProfile?: boolean
  githubUsername?: string
}

export function SpotifyLayout({
  children,
  activeSection: propActiveSection,
  showFullProfile = false,
  githubUsername = "Immanuel-Anthony",
}: SpotifyLayoutProps) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<ActiveSection>(propActiveSection || "projects")
  const [activeProject, setActiveProject] = useState<ProjectInfo | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Update active section based on pathname
  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("projects")
    } else if (pathname.includes("/projects")) {
      setActiveSection("projects")
    } else if (pathname.includes("/skills")) {
      setActiveSection("skills")
    } else if (pathname.includes("/experience")) {
      setActiveSection("experience")
    } else if (pathname.includes("/tools")) {
      setActiveSection("tools")
    } else if (pathname.includes("/contact")) {
      setActiveSection("contact")
    }
  }, [pathname])

  // If activeSection is provided as a prop, use it
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection)
    }
  }, [propActiveSection])

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {!isMobile ? (
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        ) : (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}

        <motion.main
          className={cn(
            "flex-1 overflow-auto bg-gradient-to-b from-neutral-900 to-black relative",
            isMobile ? "w-full" : "ml-60",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {!showFullProfile && <SmallProfilePicture githubUsername={githubUsername} />}
          {children}
        </motion.main>
      </div>
      <PlayerBar
        activeProject={activeProject}
        isMobile={isMobile}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    </div>
  )
}

