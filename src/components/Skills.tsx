"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Server, Cloud, Users } from "lucide-react";

type SkillLevel = "core" | "proficient" | "familiar";

interface Skill {
  name: string;
  level: SkillLevel;
}

const getSkillStyle = (level: SkillLevel): string => {
  switch (level) {
    case "core":
      return "px-3 py-1.5 bg-blue-50 dark:bg-blue-500/[0.08] text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium";
    case "proficient":
      return "px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium";
    case "familiar":
      return "px-3 py-1.5 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 dark:text-slate-500 rounded-lg text-xs";
    default:
      return "px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium";
  }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories: {
    title: string;
    icon: typeof Code;
    skills: Skill[];
  }[] = [
    {
      title: "Language",
      icon: Code,
      skills: [
        { name: "TypeScript", level: "core" },
        { name: "JavaScript", level: "core" },
        { name: "HTML", level: "proficient" },
        { name: "CSS", level: "proficient" },
        { name: "SQL", level: "familiar" },
      ],
    },
    {
      title: "Frontend",
      icon: Code,
      skills: [
        { name: "Next.js / React", level: "core" },
        { name: "Zustand", level: "core" },
        { name: "TanStack Query", level: "core" },
        { name: "React Hook Form", level: "proficient" },
        { name: "Tailwind CSS", level: "proficient" },
        { name: "Emotion", level: "proficient" },
        { name: "MUI", level: "proficient" },
        { name: "Webpack", level: "familiar" },
        { name: "Framer Motion", level: "familiar" },
      ],
    },
    {
      title: "Backend",
      icon: Server,
      skills: [
        { name: "Node.js", level: "proficient" },
        { name: "NestJS", level: "proficient" },
        { name: "Express", level: "proficient" },
        { name: "RESTful API", level: "proficient" },
        { name: "SQL", level: "familiar" },
      ],
    },
    {
      title: "DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS (EC2, S3, Amplify, CloudFront)", level: "proficient" },
        { name: "Docker", level: "familiar" },
        { name: "Git / GitHub", level: "core" },
        { name: "GitHub Actions", level: "core" },
        { name: "Vercel", level: "proficient" },
      ],
    },
    {
      title: "Collaboration",
      icon: Users,
      skills: [
        { name: "Figma", level: "proficient" },
        { name: "Notion", level: "proficient" },
        { name: "Jira", level: "proficient" },
        { name: "Slack", level: "proficient" },
        { name: "Cursor IDE", level: "proficient" },
        { name: "Claude Code CLI", level: "proficient" },
      ],
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

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Core
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Proficient
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Familiar
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 + categoryIndex * 0.1,
                }}
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
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.03,
                      }}
                      className={getSkillStyle(skill.level)}
                    >
                      {skill.name}
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
