'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="about" className="py-20 section-padding bg-white dark:bg-slate-900">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 sm:p-12"
            >
              <div className="space-y-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-balance">
                  기술적 문제 해결에 집중하면서도, 제품의 성장과 팀의 효율성을 함께 고민하는 
                  <span className="font-semibold gradient-text"> 협업 중심의 개발자</span>입니다.
                </p>
                
                <p className="text-balance">
                  사용자 경험을 최우선으로 생각하며, 성능 최적화와 접근성을 고려한 
                  <span className="font-semibold gradient-text"> 품질 높은 웹 애플리케이션</span>을 개발합니다.
                </p>
                
                <p className="text-balance">
                  지속적인 학습과 성장을 통해 최신 기술 트렌드를 파악하고, 
                  <span className="font-semibold gradient-text"> 실무에 적용</span>하는 것을 즐깁니다.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

