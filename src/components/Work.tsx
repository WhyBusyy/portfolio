"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

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
              title: "QA 자동화 봇 (Smoke·Unit·E2E + AI 테스트 생성)",
              period: "2026년 3월 - 현재",
              description:
                "PR마다 테스트를 자동 실행하고, 변경 diff를 분석해 Playwright 테스트를 AI로 생성·검증하는 QA 봇 설계·구축. 팀의 PR Gate로 정착해 상시 실행 (Playwright · Claude API)",
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
                "직전 배포 이후 커밋을 티켓별로 Slack에 자동 정리하는 Composite Action과 Notion 배포 기록 자동화를 직접 구축 (DX)",
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
                "수백 개 파일 규모의 구조 재설계. 후보 4안 비교와 의존성 전수조사 끝에 완전한 Vertical Slice 대신 하이브리드를 택하고, 7규칙 검증 CLI를 모든 PR에서 상시 검증하도록 고정 (Frontend)",
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
              title: "디자인 시스템 구현 및 전면 적용",
              period: "2026년 3월 ~ 7월",
              description:
                "페이지·컴포넌트마다 적용된 스타일 기준이 달랐던 상태에서, 디자인 측이 정의한 토큰 체계를 코드로 구현하고 따로 마크업된 요소를 공용 컴포넌트로 대체한 뒤 정합 규칙을 만들어 유지보수 기준을 세움 (Frontend)",
              slug: "design-system" as string | null,
            },
            {
              title: "웨비나 라이브 스트리밍 페이지",
              period: "2026년 2월",
              description:
                "Naver Cloud Player 기반 라이브 스트리밍 시청 페이지와 사전예약·실시간 참여 현황 기능 구현. Route Colocation 첫 적용 사례 (Frontend)",
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
                "비정형 벤더 담당 지역 데이터 표준화 → 주소 기반 자동매칭 구축(성공률 90%+) → JSON 158,000줄 DB 마이그레이션 + 서버 이관까지 완성 (Fullstack)",
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
          title: "QA 인프라 유지보수 및 AI QA 봇 고도화",
          period: "2026년 상반기 - 현재",
          description:
            "PR Gate로 운영 중인 QA 인프라와 스테이징 QA 환경을 맡아, 화면이 바뀔 때마다 깨지는 테스트를 정리하고 실행 시간을 관리하며, AI 테스트 생성 봇의 생성 범위와 검증 단계를 넓혀 가는 중 (Playwright · Claude API)",
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
          title: "운영 안정성 및 유지보수성 개선",
          period: "2024년 하반기 - 현재",
          description:
            "운영 단계에서 발생하는 이슈 대응을 주도하며, 프론트엔드 전반의 안정성과 유지보수성 개선 (Frontend)",
          slug: null as string | null,
        },
      ],
    },
  ];

type Item = { title: string; period: string; description: string; slug: string | null };

const career = careerData[0];
const TABS: { label: string; items: Item[] }[] = [
  { label: "전체", items: [...career.tracks.flatMap((t) => t.items), ...career.ongoing] },
  ...career.tracks.map((t) => ({ label: t.label.replace(" · ", "·"), items: t.items })),
  { label: "진행 중", items: career.ongoing },
];

/** 한 줄: 평소엔 제목·기간만, 누르면 설명과 상세 링크가 펼쳐진다 */
function Row({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  const panelId = `work-${item.title.replace(/\s+/g, "-")}`;
  return (
    <li className="transition-opacity duration-200 group-hover/list:opacity-45 hover:!opacity-100 focus-within:!opacity-100 motion-reduce:transition-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:grid-cols-[9rem_1fr_auto] rounded"
      >
        <span className="order-2 col-span-2 text-sm tabular-nums text-slate-500 dark:text-slate-400 sm:order-none sm:col-span-1">
          {item.period}
        </span>
        <span className="text-[17px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
          {item.title}
        </span>
        <ChevronDown
          className={`h-4 w-4 self-center text-slate-500 transition-transform duration-300 dark:text-slate-400 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 sm:pl-[calc(9rem+1rem)]">
            <p className="max-w-[65ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            {item.slug && (
              <Link
                href={`/projects/${item.slug}`}
                tabIndex={open ? 0 : -1}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
              >
                자세히 보기
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Work() {
  const [tab, setTab] = useState(0);
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const items = TABS[tab].items;

  return (
    <section id="work" aria-labelledby="work-title" className="py-28 lg:py-36 section-padding">
      <div className="container-max-width">
        <h2 id="work-title" className="section-title">
          Projects
        </h2>
        <p className="section-subtitle">실무에서 수행한 프로젝트와 기여 내용입니다.</p>

        {/* 회사 정보 */}
        <div className="flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2 ring-1 ring-slate-200 dark:ring-0">
            <Image src={career.logo} alt={`${career.company} 로고`} width={138} height={22} className="h-auto w-full" />
          </div>
          <div>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{career.company}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {career.period}, {career.roles.join(", ")}
            </p>
            <p className="mt-2 max-w-[65ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              {career.motto}
            </p>
          </div>
        </div>

        {/* 트랙 탭 */}
        <div role="tablist" aria-label="작업 분류" className="mt-12 flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => {
                setTab(i);
                setOpenTitle(null);
              }}
              className={`rounded-md px-3.5 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${
                tab === i
                  ? "bg-slate-900 font-semibold text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.06]"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 tabular-nums ${tab === i ? "opacity-70" : "text-slate-500 dark:text-slate-400"}`}>
                {t.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* 접히는 목록: 마우스를 올린 줄만 또렷하게 */}
        <ul role="tabpanel" className="group/list mt-6 max-w-4xl">
          {items.map((item) => (
            <Row
              key={item.title}
              item={item}
              open={openTitle === item.title}
              onToggle={() => setOpenTitle((cur) => (cur === item.title ? null : item.title))}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
