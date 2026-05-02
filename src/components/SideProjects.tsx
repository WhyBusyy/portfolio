"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Globe,
  Smartphone,
  Terminal,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SideProject {
  title: string;
  description: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
  demoLabel?: string;
  npm?: string | null;
  screenshot: string | null;
  imageFit?: "cover" | "contain";
  category: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
}

const sideProjects: SideProject[] = [
  {
    title: "루틴 체크 - 매일 습관 트래커",
    description:
      "iOS 앱스토어에 출시한 루틴 트래커. Swift WidgetKit으로 Small/Medium/Large 위젯 3종을 직접 구현하고, Skia 기반 12주 히트맵으로 지속을 시각화했습니다.",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "MMKV",
      "Skia",
      "Swift",
    ],
    github: "https://github.com/WhyBusyy/routine-check-app",
    demo: "https://apps.apple.com/kr/app/%EB%A3%A8%ED%8B%B4-%EC%B2%B4%ED%81%AC-%EB%A7%A4%EC%9D%BC-%EC%8A%B5%EA%B4%80-%ED%8A%B8%EB%9E%98%EC%BB%A4/id6762101450",
    demoLabel: "App Store",
    screenshot: "/routine-check.webp",
    imageFit: "contain",
    category: "Mobile",
    icon: Smartphone,
    gradient:
      "from-pink-500/20 to-rose-500/20 dark:from-pink-500/10 dark:to-rose-500/10",
    accentColor: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "tiptap-editor-kit",
    description:
      "Tiptap 기반 WYSIWYG 에디터 npm 패키지. React와 Vanilla JS 두 가지 entry point를 제공하며, 풀 툴바와 이미지 업로드를 지원합니다.",
    techStack: ["Tiptap", "ProseMirror", "TypeScript", "React", "tsup"],
    github: "https://github.com/WhyBusyy/tiptap-editor-kit",
    demo: "/demo/tiptap-editor-kit",
    npm: "https://www.npmjs.com/package/tiptap-editor-kit",
    screenshot: "/tiptap-editor-kit-demo.png",
    category: "npm Package",
    icon: Package,
    gradient:
      "from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10",
    accentColor: "text-violet-600 dark:text-violet-400",
  },
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
    screenshot: "/health-check.png",
    category: "DevOps",
    icon: Terminal,
    gradient:
      "from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10",
    accentColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Re:Gym",
    description:
      "Flutter 기반 크로스플랫폼 앱 프로젝트. 현재 개발 진행 중입니다.",
    techStack: ["Flutter", "Dart"],
    github: null,
    demo: null,
    screenshot: "/re-gym.png",
    category: "Mobile",
    icon: Smartphone,
    gradient:
      "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10",
    accentColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export default function SideProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
      );
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-side-card]");
    const step = card
      ? card.getBoundingClientRect().width + 24
      : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX;
    dragStartScrollRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.pageX - dragStartXRef.current;
    dragDistanceRef.current = Math.abs(dx);
    el.scrollLeft = dragStartScrollRef.current - dx;
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragDistanceRef.current > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragDistanceRef.current = 0;
  };

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

          <div className="relative max-w-5xl mx-auto">
            {/* Left Arrow */}
            <button
              type="button"
              aria-label="이전 프로젝트"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                         w-10 h-10 items-center justify-center rounded-full
                         bg-white/90 dark:bg-white/[0.08] backdrop-blur
                         border border-slate-200 dark:border-white/[0.08]
                         shadow-sm hover:shadow-md
                         text-slate-600 dark:text-slate-300
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-all
                         disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              aria-label="다음 프로젝트"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
                         w-10 h-10 items-center justify-center rounded-full
                         bg-white/90 dark:bg-white/[0.08] backdrop-blur
                         border border-slate-200 dark:border-white/[0.08]
                         shadow-sm hover:shadow-md
                         text-slate-600 dark:text-slate-300
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-all
                         disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll container */}
            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onClickCapture={onClickCapture}
              className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4
                         [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                         scroll-smooth select-none
                         ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              {sideProjects.map((project, index) => {
                const IconComponent = project.icon;

                return (
                  <motion.div
                    key={project.title}
                    data-side-card
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="group flex-shrink-0 w-[280px] sm:w-[340px]
                               bg-white dark:bg-white/[0.03] rounded-2xl overflow-hidden
                               border border-slate-100 dark:border-white/[0.04]
                               snap-start"
                  >
                    {/* Screenshot / Placeholder */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/[0.04]">
                      {project.screenshot ? (
                        <img
                          src={project.screenshot}
                          alt={project.title}
                          draggable={false}
                          className={`w-full h-full transition-transform duration-500 pointer-events-none ${
                            project.imageFit === "contain"
                              ? "object-contain"
                              : "object-cover"
                          }`}
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
                      {(project.github || project.demo || project.npm) && (
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
                          {project.npm && (
                            <a
                              href={project.npm}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Package className="w-3.5 h-3.5" />
                              npm
                            </a>
                          )}
                          {project.demo &&
                            (project.demo.startsWith("/") ? (
                              <Link
                                href={`${project.demo}?from=portfolio`}
                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                                           hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {project.demoLabel ?? "Demo"}
                              </Link>
                            ) : (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400
                                           hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {project.demoLabel ?? "Demo"}
                              </a>
                            ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
