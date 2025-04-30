"use client";

import { motion } from "framer-motion";

interface Tool {
  name: string;
  icon: string;
  category: string;
}

export function ToolsSection() {
  const tools: Tool[] = [
    { name: "VS Code", icon: "💻", category: "Development" },
    { name: "Git", icon: "🔄", category: "Development" },
    { name: "GitHub", icon: "🐙", category: "Development" },
    { name: "Maven", icon: "📦", category: "Development" },
    { name: "Postman", icon: "📬", category: "Development" },
    { name: "Apache Tomcat", icon: "🌐", category: "Development" },
    { name: "MongoDB", icon: "💾", category: "Databases" },
    { name: "MySQL", icon: "💾", category: "Databases" },
    { name: "Microsoft SQL", icon: "💾", category: "Databases" },
    { name: "JUnit", icon: "🧪", category: "Testing" },
    { name: "Mockito", icon: "🧪", category: "Testing" },
    { name: "SonarQube", icon: "🔎", category: "Testing" },
    { name: "TensorFlow", icon: "🧠", category: "Machine Learning" },
    { name: "PyTorch", icon: "⚡", category: "Machine Learning" },
    { name: "OpenAI Whisper", icon: "🤖", category: "Machine Learning" },
    { name: "CrewAI", icon: "💼", category: "Machine Learning" },
    { name: "Redis", icon: "🔑", category: "Productivity" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "Kubernetes", icon: "☸️", category: "DevOps" }
  ];

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <div className="mb-20">
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">{category}</h3>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <motion.div
                  key={tool.name}
                  className="relative bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-full px-4 py-2 flex items-center gap-2 shadow-md shadow-green-500/20 will-change-transform"
                  variants={item}
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-medium text-white">{tool.name}</span>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
