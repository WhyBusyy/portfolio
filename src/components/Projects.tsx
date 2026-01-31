'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Smartphone, Monitor, Globe } from 'lucide-react'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      name: "플랫팜",
      type: ["모바일", "반응형"],
      projectScale: "사내 서비스",
      participation: "프론트 100%",
      description: "약국과 제약사 간의 상품 주문, 결제, 장부관리까지 한 번에 처리할 수 있는 B2B 직거래 통합관리 플랫폼으로, 약국 유통 구조의 디지털 전환을 목표로 하는 서비스입니다.",
      framework: "Next.js",
      libraries: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Emotion", "MUI", "Webpack", "Node.js"],
      contributions: [
        "서비스 초기 설계 단계부터 참여하여, 다양한 벤더사 요구사항을 반영한 확장 가능한 프론트엔드 구조 설계 및 기능 고도화를 주도",
        "운영 단계에서 발생하는 이슈 대응을 주도하며, 프론트엔드 전반의 안정성과 유지보수성 개선",
        "프론트엔드 성능 개선을 단독으로 담당, 렌더링 최적화 및 구조 개선을 통해 Chrome Lighthouse 성능 점수를 13점 → 78점으로 개선하며 사용자 경험 향상에 기여",
        "백엔드 리소스가 제한된 환경에서 Node.js 기반 API 개발·수정 작업을 병행하며 서비스 개발 및 운영 효율성 확보"
      ],
      demoLink: null,
      githubLink: null
    }
  ]

  const getTypeIcon = (type: string) => {
    if (type.includes("모바일")) return Smartphone
    if (type.includes("PC")) return Monitor
    return Globe
  }

  return (
    <section ref={ref} id="projects" className="py-20 section-padding bg-white dark:bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Projects</h2>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white dark:bg-shadow-grey/80 rounded-2xl p-6 sm:p-8 card-hover"
              >
                <div className="space-y-6">
                  {/* 프로젝트 헤더 */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{project.projectScale}</span>
                        </div>
                        <span>•</span>
                        <span>{project.participation}</span>
                      </div>
                    </div>
                    
                    {/* 타입 아이콘 */}
                    <div className="flex gap-2">
                      {project.type.map((typeItem, idx) => {
                        const Icon = getTypeIcon(typeItem)
                        return (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-white dark:bg-shadow-grey/80 flex items-center justify-center"
                            title={typeItem}
                          >
                            <Icon className="w-5 h-5 text-red-600 dark:text-red-500" />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 프로젝트 설명 */}
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* 프레임워크 및 라이브러리 */}
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      프레임워크
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                        {project.framework}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      라이브러리
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.libraries.map((lib, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                        >
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 작업 기여도 */}
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      작업 기여도
                    </h4>
                    <ul className="space-y-2">
                      {project.contributions.map((contribution, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-red-600 dark:text-red-500 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 링크 */}
                  {(project.demoLink || project.githubLink) && (
                    <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>보기</span>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>깃허브</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
