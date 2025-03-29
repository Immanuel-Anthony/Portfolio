"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string[]
}

export function ExperienceSection() {
  const experiences: Experience[] = [
    {
      id: "exp1",
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      description: [
        "Led the development of a React-based dashboard that improved user engagement by 40%",
        "Implemented performance optimizations that reduced load times by 60%",
        "Mentored junior developers and conducted code reviews",
        "Collaborated with design and product teams to create intuitive user experiences",
      ],
    },
    {
      id: "exp2",
      role: "Full Stack Developer",
      company: "Digital Solutions LLC",
      location: "New York, NY",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Developed and maintained multiple client projects using React, Node.js, and MongoDB",
        "Created RESTful APIs and implemented authentication systems",
        "Optimized database queries resulting in 30% faster response times",
        "Participated in agile development processes and sprint planning",
      ],
    },
    {
      id: "exp3",
      role: "Junior Web Developer",
      company: "Creative Web Agency",
      location: "Boston, MA",
      period: "Jun 2019 - Feb 2020",
      description: [
        "Built responsive websites for clients across various industries",
        "Implemented frontend designs using HTML, CSS, and JavaScript",
        "Assisted in the development of a content management system",
        "Collaborated with the design team to ensure pixel-perfect implementations",
      ],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>

      <motion.div
        className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-700"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="mb-8 relative before:absolute before:left-[-8px] before:top-2 before:w-4 before:h-4 before:bg-green-500 before:rounded-full before:z-10"
            variants={item}
          >
            <div className="bg-neutral-800/50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className="text-green-500 font-medium">{exp.company}</div>
                </div>
                <div className="flex items-center text-gray-400 text-sm mt-2 md:mt-0">
                  <Calendar size={14} className="mr-1" />
                  {exp.period}
                </div>
              </div>

              <div className="flex items-center text-gray-400 text-sm mb-4">
                <MapPin size={14} className="mr-1" />
                {exp.location}
              </div>

              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

