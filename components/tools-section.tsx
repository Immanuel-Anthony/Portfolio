"use client"

import { motion } from "framer-motion"

interface Tool {
  name: string
  icon: string
  category: string
}

export function ToolsSection() {
  const tools: Tool[] = [
    // Development
    { name: "VS Code", icon: "💻", category: "Development" },
    { name: "Git", icon: "🔄", category: "Development" },
    { name: "GitHub", icon: "🐙", category: "Development" },
    { name: "npm", icon: "📦", category: "Development" },
    { name: "Webpack", icon: "📦", category: "Development" },
    { name: "Babel", icon: "🔄", category: "Development" },

    // Design
    { name: "Figma", icon: "🎨", category: "Design" },
    { name: "Adobe XD", icon: "🎨", category: "Design" },
    { name: "Photoshop", icon: "🖌️", category: "Design" },

    // Testing
    { name: "Jest", icon: "🧪", category: "Testing" },
    { name: "React Testing Library", icon: "🧪", category: "Testing" },
    { name: "Cypress", icon: "🧪", category: "Testing" },

    // Deployment
    { name: "Vercel", icon: "🚀", category: "Deployment" },
    { name: "Netlify", icon: "🚀", category: "Deployment" },
    { name: "AWS", icon: "☁️", category: "Deployment" },
    { name: "Docker", icon: "🐳", category: "Deployment" },

    // Productivity
    { name: "Notion", icon: "📝", category: "Productivity" },
    { name: "Slack", icon: "💬", category: "Productivity" },
    { name: "Trello", icon: "📋", category: "Productivity" },
    { name: "Jira", icon: "🔄", category: "Productivity" },
  ]

  const categories = Array.from(new Set(tools.map((tool) => tool.category)))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-6">Tools & Technologies</h2>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">{category}</h3>

          <motion.div className="flex flex-wrap gap-3" variants={container} initial="hidden" animate="show">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <motion.div
                  key={tool.name}
                  className="bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors rounded-full px-4 py-2 flex items-center gap-2"
                  variants={item}
                  whileHover={{ y: -5 }}
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-medium">{tool.name}</span>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

