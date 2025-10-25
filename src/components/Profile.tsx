'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin, Mail, GraduationCap, Award, Globe } from 'lucide-react'

export default function Profile() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const careerData = [
    {
      company: "주식회사 루멘테라",
      period: "2024.05 ~ 현재",
      position: "약국 직거래 통합관리 플랫폼, 플랫팜",
      description: "약국과 제약사 간의 상품 주문, 결제, 장부관리까지 한 번에 처리할 수 있는 B2B 직거래 통합관리 플랫폼으로, 약국 유통 구조의 디지털 전환을 목표로 하는 서비스입니다.",
      achievements: [
        "계약직 3개월 후 성과를 인정받아 정규직 전환",
        "SSR/CSR 혼합 렌더링 구조 전환으로 사용자 경험 개선",
        "Lighthouse 성능 점수 13점 → 78점 (메인페이지) 달성",
        "CDN 폰트를 로컬 임베디드 폰트로 전환하여 초기 렌더링 시간 단축",
        "NextAuth 기반 쿠키 세션 방식으로 인증 보안성과 유지보수성 강화"
      ],
      techStack: ["Next.js", "React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Emotion", "MUI", "Webpack"]
    }
  ]

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
    <section ref={ref} id="profile" className="py-20 section-padding bg-slate-50 dark:bg-slate-800">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Profile</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 경력 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold gradient-text flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                경력
              </h3>
              
              {careerData.map((career, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 card-hover">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        {career.company}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {career.period}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        {career.position}
                      </p>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {career.description}
                    </p>
                    
                    <div>
                      <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        주요 업무 및 성과
                      </h5>
                      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        {career.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        기술 스택
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {career.techStack.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 학력, 외국어, 자격증 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* 학력 */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6" />
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
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <Globe className="w-6 h-6" />
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
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 card-hover">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6" />
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

