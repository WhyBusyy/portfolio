"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-max-width text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* 메인 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">WhyBusyy</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400">
              웹 개발자 / 프론트엔드 개발자
            </p>
          </motion.div>


          {/* 자기소개 멘트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-balance">
                <span className="font-semibold gradient-text">
                  Next.js·TypeScript·React 기반
                </span>
                의 웹 서비스를 개발해 온 프론트엔드 개발자입니다.
              </p>

              <p className="text-balance">
                <span className="font-semibold gradient-text">
                  Node.js 백엔드 개발 경험
                </span>
                을 바탕으로 프론트엔드와 서버 간의 구조를 이해하며, API
                설계부터 UI 구현까지 유기적인 개발을 수행해 왔습니다.
              </p>

              <p className="text-balance">
                직무를 가리지 않는{" "}
                <span className="font-semibold gradient-text">
                  원활한 커뮤니케이션
                </span>
                을 통해 협업 시 시너지를 창출합니다.
              </p>
              <p className="text-balance">
                <span className="font-semibold gradient-text">
                  사용자 경험 중심의 UI 설계와 성능 최적화
                </span>
                에 강점을 보유하고 있습니다.
              </p>
            </div>
          </motion.div>

          {/* 스크롤 인디케이터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
