"use client";

import { useState } from "react";

type SkillLevel = "core" | "proficient" | "familiar";

interface Skill {
  name: string;
  level: SkillLevel;
}

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

/** 두 분야에 걸친 기술은 타일 하나로 합치고, 속한 분야를 모두 기억한다 */
const tiles = (() => {
  const map = new Map<string, { name: string; level: SkillLevel; cats: string[] }>();
  for (const c of skillCategories) {
    for (const sk of c.skills) {
      const t = map.get(sk.name);
      if (t) t.cats.push(c.title);
      else map.set(sk.name, { name: sk.name, level: sk.level, cats: [c.title] });
    }
  }
  // 숙련도(타일 색)별로 묶어 보여 준다
  const order: SkillLevel[] = ["core", "proficient", "familiar"];
  return [...map.values()].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
})();

const LEVEL_LABEL: Record<SkillLevel, string> = {
  core: "Core",
  proficient: "Proficient",
  familiar: "Familiar",
};

/** 숙련도는 타일 자체로 구분한다: Core는 진한 면, Proficient는 옅은 면, Familiar는 테두리만 */
const tileCls: Record<SkillLevel, string> = {
  core: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
  proficient: "bg-slate-100 text-slate-900 dark:bg-white/[0.08] dark:text-white",
  familiar: "ring-1 ring-inset ring-slate-300 text-slate-600 dark:ring-white/20 dark:text-slate-300",
};

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const focus = preview ?? selected;

  const filters = ["All", ...skillCategories.map((c) => c.title)];

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-28 lg:py-36 section-padding">
      <div className="container-max-width">
        <h2 id="skills-title" className="section-title">
          Skills
        </h2>
        <p className="section-subtitle">프로젝트에서 사용한 기술 스택입니다.</p>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {/* 분야 필터: 누르면 고정, 마우스를 올리면 미리 보기 */}
          <div role="group" aria-label="분야 필터" className="flex flex-wrap gap-2" onMouseLeave={() => setPreview(null)}>
            {filters.map((f) => {
              const value = f === "All" ? null : f;
              const on = selected === value;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(value)}
                  onMouseEnter={() => setPreview(value)}
                  className={`rounded-md px-3.5 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${
                    on
                      ? "bg-slate-900 font-semibold text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* 범례: 타일 모양 그대로 */}
          <ul className="flex gap-3 text-xs text-slate-600 dark:text-slate-300" aria-label="숙련도 범례">
            {(Object.keys(LEVEL_LABEL) as SkillLevel[]).map((lv) => (
              <li key={lv} className="flex items-center gap-1.5">
                <span className={`h-3 w-3 rounded-sm ${tileCls[lv]}`} aria-hidden="true" />
                {LEVEL_LABEL[lv]}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {tiles.map((t) => {
            const lit = !focus || t.cats.includes(focus);
            return (
              <li
                key={t.name}
                className={`flex min-h-[4.75rem] flex-col justify-between rounded-md p-3 transition-opacity duration-200 motion-reduce:transition-none ${tileCls[t.level]} ${
                  lit ? "opacity-100" : "opacity-20"
                }`}
              >
                <span className="text-[11px] opacity-70">{t.cats.join(", ")}</span>
                <span className="text-[15px] font-semibold leading-snug">
                  {t.name}
                  <span className="sr-only">, {LEVEL_LABEL[t.level]}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
