'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Server, Cloud, Users, Palette } from 'lucide-react'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      skills: [
        {
          name: "React, Next.js, TypeScript",
          description: "실서비스 운영 경험 기반으로 SSR·CSR·SSG 하이브리드 렌더링 구조 전환 및 성능 최적화 수행"
        },
        {
          name: "상태관리",
          description: "TanStack Query, Zustand, Redux 등 상태관리 라이브러리 실무 활용"
        },
        {
          name: "성능 최적화",
          description: "Dynamic Import, Prefetching, Lazy Loading 등 성능 개선 기법 적용"
        },
        {
          name: "UI/UX 설계",
          description: "컴포넌트 단위 UI/UX 설계 및 재사용성 높은 아키텍처 구성 경험"
        },
        {
          name: "웹 표준",
          description: "웹 표준과 접근성(Accessibility) 고려한 마크업"
        },
        {
          name: "스타일링",
          description: "Tailwind CSS / Emotion을 활용한 컴포넌트 스타일링"
        }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-green-500 to-green-600",
      skills: [
        {
          name: "Node.js / NestJS / Express",
          description: "운영 중인 서비스에서 상품·리뷰 API 설계 및 배포"
        },
        {
          name: "서버 로직",
          description: "미들웨어, 인증 로직, 라우팅 설계 등 서버 사이드 로직 구현 경험"
        },
        {
          name: "미디어 처리",
          description: "FFmpeg을 활용한 영상 HLS 변환 및 S3 업로드 자동화 구현"
        },
        {
          name: "데이터베이스",
          description: "필요한 데이터 구조를 설계하고 SQL 쿼리 직접 작성"
        }
      ]
    },
    {
      title: "DevOps / Infra",
      icon: Cloud,
      color: "from-purple-500 to-purple-600",
      skills: [
        {
          name: "AWS",
          description: "EC2, S3, Amplify, CloudFront를 통한 CI/CD 파이프라인 구축 및 자동 배포 관리"
        },
        {
          name: "Docker",
          description: "로컬 환경 통합 및 테스트 환경 배포 자동화 구성 경험"
        },
        {
          name: "Git / GitHub",
          description: "Branch 전략, PR 리뷰 기반 협업 경험"
        },
        {
          name: "자동화",
          description: "GitHub Actions를 통한 자동 빌드/배포 파이프라인 구성"
        }
      ]
    },
    {
      title: "Collaboration / Tools",
      icon: Users,
      color: "from-orange-500 to-orange-600",
      skills: [
        {
          name: "디자인 도구",
          description: "Figma / Notion을 활용한 디자이너 및 PM과의 UI 협업 및 일정 관리"
        },
        {
          name: "AI 도구",
          description: "Cursor IDE / AI 기반 생산성 툴로 반복 작업 자동화 및 코드 리팩토링 효율 향상"
        },
        {
          name: "프로젝트 관리",
          description: "Jira / Slack을 통한 스프린트 단위 이슈 관리 및 팀 커뮤니케이션 경험"
        }
      ]
    }
  ]

  return (
    <section ref={ref} id="skills" className="py-20 section-padding bg-white dark:bg-slate-900">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

