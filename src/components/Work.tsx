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
      period: "2024.05 - 현재",
      logo: "/platpharm-logo.svg",
      motto:
        "약국과 제약사 간의 상품 주문, 결제, 장부관리까지 한 번에 처리할 수 있는 B2B 직거래 통합관리 플랫폼 '플랫팜' 프론트엔드 개발 및 운영",
      roles: ["Frontend 개발", "Backend 개발"],
      tracks: [
        {
          label: "품질 · 자동화",
          items: [
            {
              title: "QA 자동화 봇 (스모크·단위·E2E + AI 테스트 생성)",
              period: "2026년 3월 - 현재",
              description:
                "PR마다 90개 이상의 테스트를 자동 실행하고, 변경 diff를 분석해 Playwright 테스트를 AI로 생성·검증하는 QA 봇 설계·구축. 5개월 넘게 PR 게이트로 지속 실행 (Playwright · Claude API)",
              slug: "qa-automation-bot" as string | null,
            },
            {
              title: "브랜치 동기화 자동화 CI",
              period: "2026년 6월",
              description:
                "브랜치 간 동기화와 충돌 해소를 자동화하는 보조 CI 3종 구축, 잘못된 베이스의 머지를 required check로 차단 (GitHub Actions)",
              slug: null as string | null,
            },
            {
              title: "배포 알림·기록 자동화",
              period: "2026년 5월",
              description:
                "직전 배포 이후 커밋을 티켓별로 Slack에 자동 정리하는 Composite Action과 Notion 배포 기록 자동화(9곳)를 직접 구축 (DX)",
              slug: "dx-automation" as string | null,
            },
            {
              title: "사내 회의 알림 봇",
              period: "2026년 5월",
              description:
                "노션이 Slack에 올린 회의 메시지를 파싱해 참여자에게 10분 전·시작 시 개인 DM, 평일 오전 당일 일정을 일괄 안내하는 전 구성원 대상 편의 자동화 (Node.js)",
              slug: "meeting-notifier-bot" as string | null,
            },
          ],
        },
        {
          label: "아키텍처 · 성능",
          items: [
            {
              title: "프론트엔드 아키텍처 마이그레이션 (VSA 하이브리드)",
              period: "2026년 4월",
              description:
                "수백 개 파일 규모의 구조 재설계. 후보 4안 비교 후 의존성 전수조사로 완전한 Vertical Slice를 기각하고 하이브리드 채택, 7규칙 검증 CLI를 모든 PR에서 상시 검증하도록 고정 (Frontend)",
              slug: "vsa-migration" as string | null,
            },
            {
              title: "WYSIWYG 에디터 마이그레이션",
              period: "2026년 3월",
              description:
                "CKEditor에서 Tiptap 에디터로 마이그레이션하여 패키지 크기 2.5GB → 3MB, 운영 배포 시간 약 50% 단축 (12분 → 6분) (Frontend)",
              slug: "editor-migration" as string | null,
            },
            {
              title: "프론트엔드 성능 최적화",
              period: "2025년 상반기",
              description:
                "코드 스플리팅·메모이제이션 등 프론트엔드 최적화로 초기 로딩 전방위 개선, 현재 데스크톱 실측 초기 렌더 0.6s·메인스레드 블로킹 10ms 수준 (Frontend)",
              slug: "performance-optimization" as string | null,
            },
          ],
        },
        {
          label: "제품 개발",
          items: [
            {
              title: "다단계 승인 플로우 어드민 재설계",
              period: "2026년 4월 ~ 7월",
              description:
                "등록·수정·승인 흐름에 흩어져 있던 모달 6개를 통합 모달 1개(9모드)로 재설계, 상세 진입 API 4회 → 1회, 낙관적 잠금으로 동시 편집 충돌 방어 (Fullstack)",
              slug: "admin-approval-flow" as string | null,
            },
            {
              title: "웨비나 라이브 스트리밍 페이지",
              period: "2026년 2월",
              description:
                "Naver Cloud Player 기반 라이브 스트리밍 시청 페이지와 사전예약·실시간 참여 현황 기능 구현. 라우트 코로케이션 첫 적용 사례 (Frontend)",
              slug: "webinar-live" as string | null,
            },
            {
              title: "자체 CMS 구축",
              period: "2026년 1월",
              description:
                "프론트엔드와 백엔드 전 과정을 1개월 만에 단독 개발한 자체 CMS 구축을 통한 운영 효율 및 개발 생산성 개선 (Fullstack)",
              slug: "cms-development" as string | null,
            },
            {
              title: "대형 제약사 신규 서비스 제안 페이지",
              period: "2026년 1월",
              description:
                "계약 해지를 앞둔 고객사에 제안할 신규 서비스 시연 페이지를 구현, 서비스 전환을 통해 계약 유지로 연결 (Frontend)",
              slug: null as string | null,
            },
            {
              title: "영업 담당자 자동매칭 시스템 구축 및 DB 마이그레이션",
              period: "2025년 8월 ~ 2026년 3월",
              description:
                "비정형 벤더 데이터 표준화 → 주소 기반 자동매칭 구축(성공률 90%+) → JSON 158,000줄 DB 마이그레이션 + 서버 이관까지 완성 (Fullstack)",
              slug: "vendor-matching" as string | null,
            },
            {
              title: "서비스 초기 구축 참여",
              period: "2024년 하반기",
              description:
                "B2B 직거래 플랫폼 '플랫팜'의 초기 구축 단계부터 참여, 벤더사별로 다른 요구사항을 수용하는 프론트엔드 구조와 공통 컴포넌트 체계 구성 (Frontend)",
              slug: null as string | null,
            },
          ],
        },
      ],
      ongoing: [
        {
          title: "백엔드 API 개발 및 수정",
          period: "2025년 상반기 - 현재",
          description:
            "백엔드 리소스가 제한된 환경에서 Node.js 기반 API 개발·수정 작업을 병행하며 서비스 개발 및 운영 효율성 확보 (Backend)",
          slug: null as string | null,
        },
        {
          title: "운영 안정성 및 유지보수성 개선",
          period: "2024년 하반기 - 현재",
          description:
            "운영 단계에서 발생하는 이슈 대응을 주도하며, 프론트엔드 전반의 안정성과 유지보수성 개선 (Frontend)",
          slug: null as string | null,
        },
      ],
    },
  ];

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="work-title" className="section-title">Work</h2>
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
                <div
                  className="sticky top-12 z-10 pt-2 pb-8 mb-10 flex flex-col sm:flex-row gap-6 items-start
                  [mask-image:linear-gradient(to_bottom,black_70%,transparent)]
                  bg-white dark:bg-dark-bg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white border border-slate-200 dark:border-white/10 flex items-center justify-center p-2">
                      {career.logo ? (
                        <Image
                          src={career.logo}
                          alt={`${career.company} 로고`}
                          width={138}
                          height={22}
                          className="w-full h-auto"
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
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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

                {/* Projects — 트랙별 그룹 */}
                {career.tracks.map((track, trackIdx) => (
                  <div key={track.label} className={trackIdx > 0 ? "mt-4" : ""}>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-6">
                      {track.label}
                    </p>
                    <div className="space-y-0">
                    {track.items.map((project, idx) => {
                      const content = (
                        <div
                          className={`flex gap-6 ${
                            project.slug ? "group cursor-pointer" : ""
                          }`}
                        >
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2" />
                            {idx < track.items.length - 1 && (
                              <div className="w-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
                            )}
                          </div>
                          <div className="flex-1 pb-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                              {project.period}
                            </p>
                            <h4
                              className={`text-base font-semibold text-slate-900 dark:text-white mb-2 ${
                                project.slug
                                  ? "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                  : ""
                              }`}
                            >
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
                            delay: 0.3 + trackIdx * 0.1 + idx * 0.06,
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
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-white/[0.06] my-10" />

                {/* Ongoing */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-6">
                    Ongoing
                  </p>
                  <div className="space-y-0">
                    {career.ongoing.map((item, idx) => (
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
                          delay: 0.5 + idx * 0.1,
                        }}
                      >
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 mt-2" />
                            {idx < career.ongoing.length - 1 && (
                              <div className="w-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
                            )}
                          </div>
                          <div className="flex-1 pb-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                              {item.period}
                            </p>
                            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                              {item.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
