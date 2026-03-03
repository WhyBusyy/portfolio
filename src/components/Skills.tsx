"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Server, Cloud, Users } from "lucide-react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Language",
      icon: Code,
      skills: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
    },
    {
      title: "Frontend",
      icon: Code,
      skills: [
        "Next.js / React",
        "Zustand",
        "TanStack Query",
        "React Hook Form",
        "Tailwind CSS",
        "Emotion",
        "MUI",
        "Webpack",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "NestJS", "Express", "RESTful API", "SQL"],
    },
    {
      title: "DevOps",
      icon: Cloud,
      skills: [
        "AWS (EC2, S3, Amplify, CloudFront)",
        "Docker",
        "Git / GitHub",
        "GitHub Actions",
        "Vercel",
      ],
    },
    {
      title: "Collaboration",
      icon: Users,
      skills: ["Figma", "Notion", "Jira", "Slack", "Cursor IDE"],
    },
  ];

  return (
    <section
      ref={ref}
      id="skills"
      className="py-32 lg:py-40 section-padding bg-slate-50/50 dark:bg-white/[0.02]"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            프로젝트에서 사용한 기술 스택입니다.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1 }}
                className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-slate-100 dark:border-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide uppercase">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0 }}
                      animate={
                        isInView ? { opacity: 1 } : { opacity: 0 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.03,
                      }}
                      className="px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
