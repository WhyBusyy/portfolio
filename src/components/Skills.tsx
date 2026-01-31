'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Server, Cloud, Users, Palette } from 'lucide-react'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Language",
      icon: Code,
      color: "from-red-600 to-red-500",
      skills: [
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "SQL"
      ]
    },
    {
      title: "Frontend",
      icon: Code,
      color: "from-red-600 to-red-500",
      skills: [
        "Next.js / React",
        "Zustand",
        "TanStack Query",
        "React Hook Form",
        "Tailwind CSS",
        "Emotion",
        "MUI",
        "Webpack",
        "Framer Motion"
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-red-600 to-red-500",
      skills: [
        "Node.js",
        "NestJS",
        "Express",
        "RESTful API",
        "SQL"
      ]
    },
    {
      title: "DevOps",
      icon: Cloud,
      color: "from-red-600 to-red-500",
      skills: [
        "AWS (EC2, S3, Amplify, CloudFront)",
        "Docker",
        "Git / GitHub",
        "GitHub Actions",
        "Vercel"
      ]
    },
    {
      title: "Collaboration / Tools",
      icon: Users,
      color: "from-red-600 to-red-500",
      skills: [
        "Figma",
        "Notion",
        "Jira",
        "Slack",
        "Cursor IDE"
      ]
    }
  ]

  return (
    <section ref={ref} id="skills" className="py-20 section-padding bg-white dark:bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-shadow-grey/80 rounded-xl p-6 border border-slate-200 dark:border-transparent card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-red-600 dark:text-red-500 mt-1">•</span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

