'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, Globe } from 'lucide-react'

export default function Profile() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const educationData = [
    {
      institution: "한국해양대학교",
      major: "동아시아학",
      period: "2013.3 - 2021.2"
    }
  ]

  const languageData = [
    { name: "영어", level: "OPic IM1 (2023.9) / TOEIC 800 (2020.8)" },
    { name: "일본어", level: "기초회화" }
  ]

  const certificationData = [
    { name: "SQLD", date: "2024.4" },
    { name: "정보처리기사", date: "2024.6" }
  ]

  return (
    <section ref={ref} id="profile" className="py-20 section-padding bg-white dark:bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Profile</h2>
          
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* 학력 */}
              <div className="bg-white dark:bg-shadow-grey/80 rounded-xl p-6 border border-slate-200 dark:border-transparent card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-red-600 dark:text-red-500" />
                  학력
                </h3>
                {educationData.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                      {edu.institution}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {edu.major}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>

              {/* 외국어 */}
              <div className="bg-white dark:bg-shadow-grey/80 rounded-xl p-6 border border-slate-200 dark:border-transparent card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <Globe className="w-6 h-6 text-red-600 dark:text-red-500" />
                  외국어
                </h3>
                <div className="space-y-3">
                  {languageData.map((lang, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        {lang.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 자격증 */}
              <div className="bg-white dark:bg-shadow-grey/80 rounded-xl p-6 border border-slate-200 dark:border-transparent card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-red-600 dark:text-red-500" />
                  자격증
                </h3>
                <div className="space-y-3">
                  {certificationData.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {cert.name}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

