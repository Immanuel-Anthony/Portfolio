"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { fetchGitHubRepos } from "@/lib/github"

interface ProjectInfo {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
}

interface ProjectsGridProps {
  limit?: number
  showViewAll?: boolean
}

export function ProjectsGrid({ limit, showViewAll = true }: ProjectsGridProps) {
  const [projects, setProjects] = useState<ProjectInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const repos = await fetchGitHubRepos()
        setProjects(repos)
      } catch (error) {
        console.error("Error fetching GitHub repos:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return <p className="text-center">Loading projects...</p>
  }

  const displayedProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold">{limit ? "Top Projects" : "All Projects"}</h2>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <motion.div
            key={project.id}
            className="relative bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors rounded-md overflow-hidden group"
          >
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

              <div className="flex items-center gap-4 mt-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                >
                  <Github size={20} />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
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
  )
}
