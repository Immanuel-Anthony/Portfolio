"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { fetchGitHubRepos } from "@/lib/github";

interface ProjectInfo {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

interface ProjectsGridProps {
  limit?: number;
  showViewAll?: boolean;
}

export function ProjectsGrid({ limit, showViewAll = true }: ProjectsGridProps) {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const repos = await fetchGitHubRepos();
        setProjects(repos);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-green-400">Loading projects...</p>;
  }

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  // Pure fade-in animation with no horizontal movement.
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, ease: "easeInOut", duration: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { ease: "easeInOut", duration: 0.3 },
    },
  };

  return (
    <div className="mb-20">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {displayedProjects.map((project) => (
          <motion.div
            key={project.id}
            className="relative bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-xl overflow-hidden group shadow-lg shadow-green-500/10"
            variants={item}
          >
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>

              <div className="flex items-center gap-4 mt-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-black p-3 rounded-full hover:scale-110 transition-transform shadow-md shadow-green-500/20"
                >
                  <Github size={20} />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-md shadow-white/20"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
