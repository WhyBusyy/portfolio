"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const careerData = [
    {
      company: "주식회사 루멘테라",
      period: "2024.05 ~ 현재",
      logo: "/platpharm-logo.svg",
      motto:
        "약국과 제약사 간의 상품 주문, 결제, 장부관리까지 한 번에 처리할 수 있는 B2B 직거래 통합관리 플랫폼 '플랫팜' 프론트엔드 개발 및 운영",
      roles: ["Frontend 개발", "Backend 개발"],
      projects: [
        {
          title: "서비스 초기 설계 및 프론트엔드 구조 설계",
          period: "2024년 하반기",
          description:
            "서비스 초기 설계 단계부터 참여하여, 다양한 벤더사 요구사항을 반영한 확장 가능한 프론트엔드 구조 설계 및 기능 고도화를 주도 (Frontend)",
        },
        {
          title: "프론트엔드 성능 최적화",
          period: "2025년 상반기",
          description:
            "렌더링 최적화 및 구조 개선을 통해 Chrome Lighthouse 성능 점수를 13점 → 78점으로 개선하며 사용자 경험 향상에 기여 (Frontend)",
        },
        {
          title: "자체 CMS 구축",
          period: "2025년 하반기 ~ 2026년 상반기",
          description:
            "프론트엔드와 백엔드 전 과정을 단독으로 개발한 자체 CMS 구축을 통한 운영 효율 및 개발 생산성 개선 (Frontend, Backend)",
        },
        {
          title: "운영 안정성 및 유지보수성 개선",
          period: "2024년 하반기 - 현재",
          description:
            "운영 단계에서 발생하는 이슈 대응을 주도하며, 프론트엔드 전반의 안정성과 유지보수성 개선 (Frontend)",
        },
        {
          title: "백엔드 API 개발 및 수정",
          period: "2025년 상반기 - 현재",
          description:
            "백엔드 리소스가 제한된 환경에서 Node.js 기반 API 개발·수정 작업을 병행하며 서비스 개발 및 운영 효율성 확보 (Backend)",
        },
      ],
    },
  ];

  return (
    <section
      ref={ref}
      id="work"
      className="py-20 section-padding"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Work</h2>

          <div className="max-w-5xl mx-auto space-y-12">
            {careerData.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-white/50 dark:bg-shadow-grey/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-transparent space-y-6 card-hover"
              >
                {/* 회사 정보 */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* 로고 영역 (원형) */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-white border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-3">
                      {career.logo ? (
                        <img
                          src={career.logo}
                          alt={`${career.company} 로고`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                          {career.company.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 회사 정보 */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">
                        {career.company}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
                        {career.period}
                      </p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 italic">
                      "{career.motto}"
                    </p>

                    {/* 역할 태그 */}
                    <div className="flex flex-wrap gap-2">
                      {career.roles.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 프로젝트 목록 */}
                <div className="space-y-4 md:ml-28 ml-0">
                  {career.projects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.1 + idx * 0.1,
                      }}
                      className="flex gap-4"
                    >
                      {/* 세로 바 */}
                      <div className="flex-shrink-0 w-1 bg-slate-800 dark:bg-slate-200 rounded-full"></div>

                      {/* 프로젝트 정보 */}
                      <div className="flex-1 space-y-1">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {project.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {project.period}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
