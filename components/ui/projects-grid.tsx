"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import type { ProjectInfo } from "@/components/spotify-layout"
import Link from "next/link"

interface ProjectsGridProps {
  limit?: number
  showViewAll?: boolean
}

export function ProjectsGrid({ limit, showViewAll = true }: ProjectsGridProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects: ProjectInfo[] = [
    {
      id: "project1",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with payment processing and inventory management",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      featured: true,
    },
    {
      id: "project2",
      title: "Task Management App",
      description: "A Kanban-style task management application with drag-and-drop functionality",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://task-manager-demo.com",
      featured: true,
    },
    {
      id: "project3",
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with location-based forecasts and historical data",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["Next.js", "OpenWeather API", "Chart.js", "Vercel"],
      githubUrl: "https://github.com/username/weather-app",
      liveUrl: "https://weather-app-demo.com",
      featured: true,
    },
    {
      id: "project4",
      title: "Social Media Platform",
      description: "A social media platform with real-time messaging and content sharing",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "GraphQL", "Apollo", "PostgreSQL"],
      githubUrl: "https://github.com/username/social-media",
      liveUrl: "https://social-media-demo.com",
      featured: true,
    },
    {
      id: "project5",
      title: "Portfolio Website",
      description: "A Spotify-inspired developer portfolio website",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio-demo.com",
      featured: true,
    },
    {
      id: "project6",
      title: "Fitness Tracker",
      description: "A fitness tracking application with workout plans and progress visualization",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React Native", "Redux", "Firebase", "D3.js"],
      githubUrl: "https://github.com/username/fitness-tracker",
      liveUrl: "https://fitness-tracker-demo.com",
      featured: true,
    },
    {
      id: "project7",
      title: "Recipe Sharing Platform",
      description: "A platform for sharing and discovering recipes with social features",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
      githubUrl: "https://github.com/username/recipe-app",
      liveUrl: "https://recipe-app-demo.com",
    },
    {
      id: "project8",
      title: "Budget Tracker",
      description: "A personal finance application for tracking expenses and income",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "Redux", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/budget-tracker",
      liveUrl: "https://budget-tracker-demo.com",
    },
    {
      id: "project9",
      title: "Movie Database",
      description: "A movie database application with search and filtering capabilities",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "TMDB API", "Styled Components"],
      githubUrl: "https://github.com/username/movie-database",
      liveUrl: "https://movie-database-demo.com",
    },
    {
      id: "project10",
      title: "Blog Platform",
      description: "A full-featured blog platform with markdown support",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/username/blog-platform",
      liveUrl: "https://blog-platform-demo.com",
    },
    {
      id: "project11",
      title: "E-Learning Platform",
      description: "An online learning platform with video courses and quizzes",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/e-learning",
      liveUrl: "https://e-learning-demo.com",
    },
    {
      id: "project12",
      title: "Real Estate Listings",
      description: "A real estate listing application with map integration",
      image: "/placeholder.svg?height=300&width=300",
      techStack: ["React", "Google Maps API", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/username/real-estate",
      liveUrl: "https://real-estate-demo.com",
    },
  ]

  // If limit is provided, only show that many projects
  const displayedProjects = limit ? projects.slice(0, limit) : projects

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{limit ? "Top Projects" : "All Projects"}</h2>
        {showViewAll && limit && (
          <Link href="/projects" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Show all
          </Link>
        )}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {displayedProjects.map((project) => (
          <motion.div
            key={project.id}
            className="relative bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors rounded-md overflow-hidden group"
            variants={item}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="p-4">
              <div className="w-full aspect-square rounded-md overflow-hidden mb-4 bg-neutral-900">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs bg-neutral-900 text-gray-300 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

