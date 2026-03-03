"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

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
            Frontend Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight gradient-text leading-[1.1]"
          >
            WhyBusyy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
              Next.js, TypeScript, React 기반의 웹 서비스를 개발하는
              <br className="hidden sm:block" />
              프론트엔드 개발자입니다.
            </p>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-500 leading-relaxed text-balance">
              사용자 경험 중심의 UI 설계와 성능 최적화에 강점을 가지고 있으며,
              <br className="hidden sm:block" />
              프론트엔드와 백엔드를 아우르는 유기적인 개발을 수행합니다.
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
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 text-sm font-medium
                         text-slate-500 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              이력서
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
