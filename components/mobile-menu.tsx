"use client"

import { X, Code, Heart, Briefcase, Wrench, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ActiveSection } from "./spotify-layout"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
}

export function MobileMenu({ isOpen, setIsOpen, activeSection, setActiveSection }: MobileMenuProps) {
  const navItems = [
    { name: "Projects", icon: <Code size={24} />, href: "/projects", id: "projects" as ActiveSection },
    { name: "Skills", icon: <Heart size={24} />, href: "/skills", id: "skills" as ActiveSection },
    { name: "Experience", icon: <Briefcase size={24} />, href: "/experience", id: "experience" as ActiveSection },
    { name: "Tools & Technologies", icon: <Wrench size={24} />, href: "/tools", id: "tools" as ActiveSection },
    { name: "Contact", icon: <Mail size={24} />, href: "/contact", id: "contact" as ActiveSection },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-50 overflow-y-auto"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center p-4 border-b border-neutral-800">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="font-bold text-white">Portfolio</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <X size={24} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors",
                      activeSection === item.id ? "bg-neutral-800 text-white" : "text-gray-300 hover:text-white",
                    )}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsOpen(false)
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

