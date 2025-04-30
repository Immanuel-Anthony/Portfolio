"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export function ExperienceSection() {
  const experiences: Experience[] = [
    {
      id: "exp1",
      role: "AI Developer Intern",
      company: "Forage AI",
      location: "Remote",
      period: "February 2025 - August 2025",
      description: [
        "Contributed to a Proof of Concept (POC) for a live AI-driven project.",
        "Developed scripts to accurately extract data points using AI agents.",
        "Automated key processes to enhance workflow efficiency.",
        "Assisted in Quality Assurance (QA), ensuring the accuracy and reliability of AI outputs.",
        "Created the final UI and integrated the entire backend with the frontend"
      ],
    },
    {
      id: "exp2",
      role: "Research Paper Contributor",
      company: "Università degli Studi di Padova",
      location: "Padova, Italy",
      period: "November 2023 - November 2024",
      description: [
        "Project: POLAND - A Hybrid Framework for Automated Programming Language Detection",
        "Led the development of a machine learning model to detect programming languages from code snippets, achieving high accuracy.",
        "Independently implemented core algorithms and collaborated with professors and peers to enhance project effectiveness.",
        "Designed and developed an SBOM (Software Bill of Materials) reporting tool that:",
        "  • Extracts CVE IDs for security vulnerabilities.",
        "  • Generates enriched vulnerability reports with detailed analysis beyond initial severity scores."
      ],
    },
    {
      id: "exp3",
      role: "Technical Head",
      company: "FusionTech Club",
      location: "University Campus",
      period: "2024 - 2025",
      description: [
        "Organized and led technical workshops and events to enhance the technical skills of club members.",
        "Managed club activities and resources effectively, ensuring smooth operations and efficient use of resources.",
        "Launched “Self-Governing Day,” empowering club members to conduct classes for junior students, promoting knowledge sharing and peer learning."
      ],
    },
  ];

  // Pure fade-in animation only
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-6 text-white">Experience</h2>

      <motion.div
        className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-700"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="mb-8 relative before:absolute before:left-[-8px] before:top-2 before:w-4 before:h-4 before:bg-green-500 before:rounded-full before:z-10"
            variants={item}
          >
            <div className="relative bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-lg p-6 shadow-lg shadow-green-500/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="text-green-500 font-medium">{exp.company}</div>
                </div>
                <div className="flex items-center text-gray-400 text-sm mt-2 md:mt-0">
                  <Calendar size={14} className="mr-1 text-green-400" />
                  {exp.period}
                </div>
              </div>

              <div className="flex items-center text-gray-400 text-sm mb-4">
                <MapPin size={14} className="mr-1 text-green-400" />
                {exp.location}
              </div>

              <ul className="space-y-2">
                {exp.description.map((desc, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    variants={item}
                  >
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-white">{desc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}