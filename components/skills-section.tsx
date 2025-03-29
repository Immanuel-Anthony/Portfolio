"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code, Database, Globe, Server, Smartphone, Terminal } from "lucide-react"

interface Skill {
  name: string
  icon: React.ReactNode
  level: number
  category: string
}

export function SkillsSection() {
  const skills: Skill[] = [
    // Frontend
    { name: "React", icon: <Code />, level: 90, category: "Frontend" },
    { name: "Next.js", icon: <Globe />, level: 85, category: "Frontend" },
    { name: "TypeScript", icon: <Code />, level: 80, category: "Frontend" },
    { name: "Tailwind CSS", icon: <Code />, level: 95, category: "Frontend" },
    { name: "JavaScript", icon: <Code />, level: 90, category: "Frontend" },
    { name: "HTML/CSS", icon: <Code />, level: 95, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: <Server />, level: 85, category: "Backend" },
    { name: "Express", icon: <Server />, level: 80, category: "Backend" },
    { name: "MongoDB", icon: <Database />, level: 75, category: "Backend" },
    { name: "PostgreSQL", icon: <Database />, level: 70, category: "Backend" },

    // Mobile
    { name: "React Native", icon: <Smartphone />, level: 65, category: "Mobile" },

    // DevOps
    { name: "Git", icon: <Terminal />, level: 85, category: "DevOps" },
    { name: "Docker", icon: <Terminal />, level: 70, category: "DevOps" },
    { name: "CI/CD", icon: <Terminal />, level: 65, category: "DevOps" },
  ]

  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

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
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">{category}</h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <motion.div
                  key={skill.name}
                  className="bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors rounded-md p-4"
                  variants={item}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-500/20 text-green-500 p-2 rounded-md">{skill.icon}</div>
                    <h4 className="font-medium">{skill.name}</h4>
                  </div>

                  <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

