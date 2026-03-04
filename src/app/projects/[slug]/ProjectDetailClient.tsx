"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectData } from "@/types/project";

interface Props {
  project: ProjectData;
  prev: ProjectData | null;
  next: ProjectData | null;
}

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailClient({ project, prev, next }: Props) {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <section className="py-32 lg:py-40 section-padding">
        <div className="container-max-width">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>목록으로</span>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mt-12"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {project.period}
              </span>
              <span className="w-px h-3 bg-slate-200 dark:bg-white/[0.08]" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {project.role}
              </span>
              <span className="w-px h-3 bg-slate-200 dark:bg-white/[0.08]" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {project.company}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-white/[0.04] text-slate-600
                             dark:text-slate-400 rounded-lg text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 section-padding">
        <AnimatedSection className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-6">
            Overview
          </p>
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.overview.lead}
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.overview.detail}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Challenges & Solutions */}
      {project.challenges.length > 0 && (
        <section className="py-20 section-padding">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
                Challenges & Solutions
              </p>
            </AnimatedSection>

            <div className="space-y-8">
              {project.challenges.map((challenge, index) => (
                <AnimatedSection key={index} delay={index * 0.15}>
                  <div
                    className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8
                               border border-slate-100 dark:border-white/[0.04]"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                      {challenge.title}
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Before */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                            Before
                          </span>
                        </div>
                        <p
                          className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-4
                                     border-l-2 border-slate-200 dark:border-white/[0.06]"
                        >
                          {challenge.before}
                        </p>
                      </div>

                      {/* After */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                            After
                          </span>
                        </div>
                        <p
                          className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-4
                                     border-l-2 border-blue-600 dark:border-blue-400"
                        >
                          {challenge.after}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Metrics */}
      {project.metrics.length > 0 && (
        <section className="py-20 section-padding bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-10">
                Impact
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.metrics.map((metric, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center p-8">
                    <p className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
                        {metric.change}
                      </p>
                    )}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                      {metric.label}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <section className="py-20 section-padding border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400
                           hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    이전
                  </p>
                  <p className="font-medium">{prev.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/#work"
              className="text-sm text-slate-400 dark:text-slate-500
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
            >
              모든 프로젝트
            </Link>

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400
                           hover:text-slate-900 dark:hover:text-white transition-colors text-right"
              >
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    다음
                  </p>
                  <p className="font-medium">{next.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
