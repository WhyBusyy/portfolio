"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type SkillLevel = "core" | "proficient" | "familiar";

interface Skill {
  name: string;
  level: SkillLevel;
}

/** 숙련도는 배경 칩 대신 글자 굵기와 진하기로만 구분한다 */
const getSkillStyle = (level: SkillLevel): string => {
  switch (level) {
    case "core":
      return "font-semibold text-slate-900 dark:text-white";
    case "proficient":
      return "text-slate-600 dark:text-slate-300";
    case "familiar":
      return "text-slate-500 dark:text-slate-400";
  }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories: {
    title: string;
    skills: Skill[];
  }[] = [
    {
      title: "Language",
      skills: [
        { name: "TypeScript", level: "core" },
        { name: "JavaScript", level: "core" },
        { name: "HTML", level: "proficient" },
        { name: "CSS", level: "proficient" },
        { name: "Dart", level: "familiar" },
        { name: "SQL", level: "familiar" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "Next.js / React", level: "core" },
        { name: "SSR / RSC", level: "core" },
        { name: "Zustand", level: "core" },
        { name: "TanStack Query", level: "core" },
        { name: "반응형 / 모바일 웹", level: "proficient" },
        { name: "React Hook Form", level: "proficient" },
        { name: "Tailwind CSS", level: "proficient" },
        { name: "Emotion", level: "proficient" },
        { name: "MUI", level: "proficient" },
        { name: "Webpack", level: "familiar" },
        { name: "Vite", level: "familiar" },
        { name: "Framer Motion", level: "familiar" },
      ],
    },
    {
      title: "Testing",
      skills: [
        { name: "Playwright (E2E)", level: "core" },
        { name: "Jest", level: "proficient" },
        { name: "Testing Library", level: "proficient" },
        { name: "Stagehand", level: "familiar" },
      ],
    },
    {
      title: "Mobile",
      skills: [
        { name: "Flutter", level: "familiar" },
        { name: "Dart", level: "familiar" },
      ],
    },
    {
      title: "Backend",
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
      skills: [
        { name: "Figma", level: "core" },
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
      aria-labelledby="skills-title"
      className="py-32 lg:py-40 section-padding"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="skills-title" className="section-title">Skills</h2>
          <p className="section-subtitle">프로젝트에서 사용한 기술 스택입니다.</p>

          {/* 범례: 글자 굵기 자체가 범례가 되도록 같은 스타일로 보여 준다 */}
          <p className="mb-8 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <span className={getSkillStyle("core")}>주력</span>
            <span className={getSkillStyle("proficient")}>능숙</span>
            <span className={getSkillStyle("familiar")}>사용해 봄</span>
          </p>

          {/* 카드 격자 대신 사양표: 왼쪽 분야, 오른쪽 기술 */}
          <dl className="max-w-4xl divide-y divide-slate-200 dark:divide-white/[0.1] border-y border-slate-200 dark:border-white/[0.1]">
            {skillCategories.map((category) => (
              <div key={category.title} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="text-sm text-slate-500 dark:text-slate-400">{category.title}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] leading-relaxed">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className={getSkillStyle(skill.level)}>
                      {skill.name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
