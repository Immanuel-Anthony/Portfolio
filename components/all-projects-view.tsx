"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectsGrid } from "@/components/ui/projects-grid";

export function AllProjectsView() {
  const [filter, setFilter] = useState<string>("all");

  const filters = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "mobile", name: "AI/ML" },
  ];

  // Pure fade-in animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        ease: "easeInOut", 
        duration: 0.3 
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        ease: "easeInOut", 
        duration: 0.3 
      },
    },
  };

  return (
    <motion.div 
      className="mb-20" 
      variants={container} 
      initial="hidden" 
      animate="show"
    >
      <motion.div variants={item} className="mb-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === filterItem.id
                  ? "bg-green-500 text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {filterItem.name}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <ProjectsGrid showViewAll={false} />
      </motion.div>

      <motion.div variants={item} className="mt-12">
        <h3 className="text-xl font-bold mb-4">Looking for more?</h3>
        <p className="text-gray-400 mb-4">
          Check out my GitHub profile for more projects and contributions.
        </p>
        <a
          href="https://github.com/Immanuel-Anthony"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View GitHub Profile
        </a>
      </motion.div>
    </motion.div>
  );
}