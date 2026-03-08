"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
          slug: "frontend-architecture" as string | null,
        },
        {
          title: "프론트엔드 성능 최적화",
          period: "2025년 상반기",
          description:
            "렌더링 최적화 및 구조 개선을 통해 Chrome Lighthouse 성능 점수를 13점 → 78점으로 개선하며 사용자 경험 향상에 기여 (Frontend)",
          slug: "performance-optimization" as string | null,
        },
        {
          title: "자체 CMS 구축",
          period: "2025년 하반기 ~ 2026년 상반기",
          description:
            "프론트엔드와 백엔드 전 과정을 단독으로 개발한 자체 CMS 구축을 통한 운영 효율 및 개발 생산성 개선 (Frontend, Backend)",
          slug: "cms-development" as string | null,
        },
        {
          title: "운영 안정성 및 유지보수성 개선",
          period: "2024년 하반기 - 현재",
          description:
            "운영 단계에서 발생하는 이슈 대응을 주도하며, 프론트엔드 전반의 안정성과 유지보수성 개선 (Frontend)",
          slug: null as string | null,
        },
        {
          title: "백엔드 API 개발 및 수정",
          period: "2025년 상반기 - 현재",
          description:
            "백엔드 리소스가 제한된 환경에서 Node.js 기반 API 개발·수정 작업을 병행하며 서비스 개발 및 운영 효율성 확보 (Backend)",
          slug: null as string | null,
        },
        {
          title: "웨비나 라이브 스트리밍 페이지 구현",
          period: "2026년 2월",
          description:
            "Naver Cloud Player 기반 라이브 스트리밍 웨비나 페이지를 구현하고, 사전예약 및 실시간 현황 확인 기능을 개발 (Frontend)",
          slug: null as string | null,
        },
        {
          title: "WYSIWYG 에디터 마이그레이션",
          period: "2026년 3월",
          description:
            "CKEditor에서 Tiptap 에디터로 마이그레이션하여 패키지 크기 2.5GB → 3MB, 운영 배포 시간 약 50% 단축 (12분 → 6분) (Frontend)",
          slug: "editor-migration" as string | null,
        },
      ],
    },
  ];

  return (
    <section ref={ref} id="work" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Work</h2>
          <p className="section-subtitle">
            실무에서 수행한 프로젝트와 기여 내용입니다.
          </p>

          <div className="max-w-4xl mx-auto space-y-16">
            {careerData.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Company Header */}
                <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-white/10 flex items-center justify-center p-2.5">
                      {career.logo ? (
                        <Image
                          src={career.logo}
                          alt={`${career.company} 로고`}
                          width={44}
                          height={44}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xl font-bold text-slate-600">
                          {career.company.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {career.company}
                      </h3>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                        {career.period}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {career.motto}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {career.roles.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-0">
                  {career.projects.map((project, idx) => {
                    const content = (
                      <div className={`flex gap-6 ${project.slug ? "group cursor-pointer" : ""}`}>
                        {/* Timeline */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2" />
                          {idx < career.projects.length - 1 && (
                            <div className="w-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-10">
                          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                            {project.period}
                          </p>
                          <h4 className={`text-base font-semibold text-slate-900 dark:text-white mb-2 ${project.slug ? "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" : ""}`}>
                            {project.title}
                            {project.slug && (
                              <span className="inline-block ml-1.5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                                &rarr;
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + idx * 0.1,
                        }}
                      >
                        {project.slug ? (
                          <Link href={`/projects/${project.slug}`}>
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
