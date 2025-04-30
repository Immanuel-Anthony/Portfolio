"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  Code,
  Briefcase,
  Wrench,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActiveSection } from "./spotify-layout";

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: React.Dispatch<React.SetStateAction<ActiveSection>>;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  const navItems = [
    { name: "Projects", icon: <Code size={20} />, href: "/projects", id: "projects" as ActiveSection },
    { name: "Skills", icon: <Heart size={20} />, href: "/skills", id: "skills" as ActiveSection },
    { name: "Experience", icon: <Briefcase size={20} />, href: "/experience", id: "experience" as ActiveSection },
    { name: "Tools & Technologies", icon: <Wrench size={20} />, href: "/tools", id: "tools" as ActiveSection },
    { name: "Contact", icon: <Mail size={20} />, href: "/contact", id: "contact" as ActiveSection },
  ];

  const handleNavigation = (section: ActiveSection) => {
    setActiveSection(section);
  };

  return (
    <div className="fixed w-60 top-0 bottom-20 bg-black flex flex-col z-0">
      <div className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2 text-white mb-8 px-3">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="font-bold">Portfolio</span>
        </Link>

        {/* Main Nav (Home, Search, Library) */}
        <nav className="mb-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium relative transition-colors",
                  isHomeActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
                onClick={() => handleNavigation("home")}
              >
                {isHomeActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute left-0 right-0 top-0 bottom-0 bg-neutral-800 rounded-md -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Home size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm">Home</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <Search size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm">Search</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <Library size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm">Your Library</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Buttons (Create Playlist, Liked Skills) */}
        <div className="px-2 space-y-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="bg-gray-400 hover:bg-white transition-colors rounded-sm p-1">
              <Plus size={16} className="text-black" />
            </div>
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="bg-gradient-to-br from-purple-600 to-blue-400 rounded-sm p-1">
              <Heart size={16} className="text-white" />
            </div>
            <span>Liked Skills</span>
          </button>
        </div>
      </div>

      {/* Portfolio Sections - Perfect alignment */}
      <div className="px-3 mt-2 flex-1 overflow-y-auto">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-2 px-3">Portfolio Sections</div>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = !isHomeActive && activeSection === item.id;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors relative group text-sm",
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    )}
                    onClick={() => handleNavigation(item.id)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 right-0 top-0 bottom-0 bg-neutral-800 rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
