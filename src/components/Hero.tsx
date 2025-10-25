'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, Github } from 'lucide-react'

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
          {/* 프로필 이미지 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">YBG</span>
                </div>
              </div>
            </div>
          </motion.div>

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
              프론트엔드 개발자
            </p>
          </motion.div>

          {/* 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>서울 서대문구</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <a 
                href="mailto:ybg6152@naver.com" 
                className="hover:text-blue-600 transition-colors"
              >
                ybg6152@naver.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              <a 
                href="https://github.com/WhyBusyy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                github.com/WhyBusyy
              </a>
            </div>
          </motion.div>

          {/* 소개 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-balance">
              Next.js, TypeScript, React 기반으로 웹 서비스를 개발해 온 프론트엔드 개발자입니다.
              <br />
              사용자 경험 중심의 UI 설계와 성능 최적화에 강점을 가지고 있으며,
              <br />
              필요에 따라 Nest.js와 Express.js를 활용한 백엔드 개발에도 참여한 경험이 있습니다.
            </p>
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
  )
}
