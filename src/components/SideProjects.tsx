"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Github,
  ExternalLink,
  Globe,
  Database,
  ShoppingCart,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SideProject {
  title: string;
  description: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
  screenshot: string | null;
  category: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
}

const sideProjects: SideProject[] = [
  {
    title: "포트폴리오 사이트",
    description:
      "미니멀리즘 스타일을 적용한 개인 포트폴리오. Framer Motion 애니메이션과 다크모드를 구현했습니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/WhyBusyy/portfolio",
    demo: null,
    screenshot: "/portfolio.png",
    category: "Frontend",
    icon: Globe,
    gradient:
      "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
    accentColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "서버 헬스체크 모니터링",
    description:
      "API 엔드포인트를 주기적으로 모니터링하고 장애 시 TTS 음성 알림을 제공하는 크로스 플랫폼 CLI 도구",
    techStack: ["Python", "CLI", "Cross-Platform", "DevOps"],
    github: "https://github.com/WhyBusyy/health-check",
    demo: null,
    screenshot: null,
    category: "DevOps",
    icon: Terminal,
    gradient:
      "from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10",
    accentColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function SideProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="side-projects"
      className="py-32 lg:py-40 section-padding bg-slate-50/50 dark:bg-white/[0.02]"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Side Projects</h2>
          <p className="section-subtitle">
            개인적으로 만들어본 프로젝트들입니다.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sideProjects.map((project, index) => {
              const IconComponent = project.icon;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group bg-white dark:bg-white/[0.03] rounded-2xl overflow-hidden
                             border border-slate-100 dark:border-white/[0.04]"
                >
                  {/* Screenshot / Placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/[0.04]">
                    {project.screenshot ? (
                      <img
                        src={project.screenshot}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
                      >
                        {/* Glow behind icon */}
                        <div
                          className={`absolute w-24 h-24 bg-gradient-to-br ${project.gradient} blur-2xl opacity-40`}
                        />
                        <IconComponent className="w-12 h-12 text-slate-400 dark:text-slate-500 relative z-10" />
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1
                                    bg-white/80 dark:bg-white/[0.08] backdrop-blur-sm rounded-full
                                    ${project.accentColor}`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 border-t border-slate-100 dark:border-white/[0.04]">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-slate-50 dark:bg-white/[0.04] text-slate-500
                                       dark:text-slate-400 rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {(project.github || project.demo) && (
                      <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.04]">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
