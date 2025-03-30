"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Server, Terminal, Package, FileText } from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

export function SkillsSection() {
  const skills: Skill[] = [
    { name: "Java", icon: <Code />, category: "Languages" },
    { name: "Python", icon: <Code />, category: "Languages" },
    { name: "C/C++", icon: <Code />, category: "Languages" },
    { name: "JavaScript", icon: <Code />, category: "Languages" },
    { name: "HTML/CSS", icon: <Code />, category: "Languages" },
    { name: "Spring Boot", icon: <Package />, category: "Frameworks" },
    { name: "CrewAI", icon: <Globe />, category: "Frameworks" },
    { name: "React", icon: <Code />, category: "Frameworks" },
    { name: "OpenAI Whisper", icon: <FileText />, category: "Frameworks" },
    { name: "ASP.NET (C#)", icon: <Code />, category: "Frameworks" },
    { name: "MongoDB", icon: <Database />, category: "Databases" },
    { name: "MySQL", icon: <Database />, category: "Databases" },
    { name: "Microsoft SQL", icon: <Database />, category: "Databases" },
    { name: "SQLite", icon: <Database />, category: "Databases" },
    { name: "Git", icon: <Terminal />, category: "Tools" },
    { name: "Postman", icon: <Terminal />, category: "Tools" },
    { name: "Redis", icon: <Server />, category: "Tools" },
    { name: "Maven", icon: <Terminal />, category: "Tools" },
    { name: "Apache Tomcat", icon: <Server />, category: "Tools" },
    { name: "Machine Learning Frameworks", icon: <Code />, category: "Machine Learning" },
    { name: "JUnit", icon: <Terminal />, category: "Testing" },
    { name: "Mockito", icon: <Terminal />, category: "Testing" },
    { name: "SonarCloud", icon: <Terminal />, category: "Testing" },
    { name: "CI/CD Tools", icon: <Terminal />, category: "DevOps" },
    { name: "GitHub Actions", icon: <Terminal />, category: "DevOps" },
  ];

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  // ⚡ EVEN FASTER FADE-IN ANIMATION
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, ease: "easeInOut", duration: 0.3 },
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
      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-bold mb-5 text-white tracking-wide">{category}</h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <motion.div
                  key={skill.name}
                  className="relative bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-xl p-5 shadow-md shadow-green-500/30"
                  variants={item}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium text-white">{skill.name}</h4>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
