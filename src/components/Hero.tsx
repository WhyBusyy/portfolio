"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center section-padding relative"
    >
      <div className="container-max-width text-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base tracking-widest uppercase text-slate-400 dark:text-slate-500"
          >
            유병규 · Frontend Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text leading-[1.2]">
                2.5GB → 3MB
              </h1>
              <Link
                href="/projects/editor-migration"
                className="inline-block text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1 tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                에디터 패키지 경량화 →
              </Link>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-700 dark:text-slate-300 leading-[1.2]">
                3일 1회 → 2주 1회
              </p>
              <Link
                href="/projects/cms-development"
                className="inline-block text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1 tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                콘텐츠 관련 개발 요청 →
              </Link>
            </div>
            <div>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-500 dark:text-slate-400 leading-[1.2]">
                13점 → 78점
              </p>
              <Link
                href="/projects/performance-optimization"
                className="inline-block text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1 tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Lighthouse 성능 점수 →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed text-balance">
              줄이고, 자동화하고, 빠르게 합니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-6 pt-4"
          >
            <a
              href="#work"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:opacity-70 transition-opacity cursor-pointer"
            >
              프로젝트 보기 &darr;
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              연락하기
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-slate-300 dark:border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
