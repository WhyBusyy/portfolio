"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CmsFragment,
  EditorFragment,
  MatchingFragment,
  QaFragment,
} from "./featured/fragments";

/** 문구는 프로젝트 상세와 Decisions 에 이미 공개된 내용만 줄여 쓴다. */
const CASES = [
  {
    slug: "vendor-matching",
    track: "제품 개발",
    title: "영업 담당자 자동매칭",
    decision:
      "벤더마다 지역 분류가 10여 개에서 3,000여 개까지 달라, 표기를 먼저 표준화하고 정확히 맞지 않는 값만 유사도 매칭으로 넘겼습니다.",
    metric: "담당자 배정이 늦어 밀리던 신규 계약, 이제 90% 이상 자동 배정",
    scale: "JSON 158,000줄 DB 마이그레이션과 서버 이관까지",
    proposed: true,
    Fragment: MatchingFragment,
  },
  {
    slug: "cms-development",
    track: "제품 개발",
    title: "자체 CMS 구축",
    decision:
      "외부 Headless CMS를 붙이지 않고 기존 서버 위에 필요한 범위만 가볍게 만들었습니다.",
    metric: "콘텐츠 개발 요청 3일 1회 → 2주 1회",
    scale: "프론트엔드·백엔드 1개월 단독 개발",
    proposed: true,
    Fragment: CmsFragment,
  },
  {
    slug: "qa-automation-bot",
    track: "품질 · 자동화",
    title: "QA 자동화 봇",
    decision:
      "AI가 만든 테스트는 참고용으로 분리하고 고정 테스트만 PR Gate로 썼습니다.",
    metric: "PR마다 90+ 테스트 자동 실행",
    scale: "Smoke·Unit·E2E 3계층, AI 생성 테스트는 검증 후 참고용",
    proposed: true,
    Fragment: QaFragment,
  },
  {
    slug: "editor-migration",
    track: "성능",
    title: "WYSIWYG 에디터 마이그레이션",
    decision:
      "완제품 에디터 대신 Headless 에디터를 골라 툴바를 직접 만들었습니다.",
    metric: "에디터 의존성 2.5GB → 3MB",
    scale: "운영 배포 시간 12분 → 6분",
    proposed: true,
    Fragment: EditorFragment,
  },
];

/** 문제를 직접 찾아 기획부터 구현까지 맡은 작업 표시 */
const PROPOSED = (
  <span className="ml-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
    직접 기획
  </span>
);

/** 한 사례가 차지하는 스크롤 길이 (화면 높이 대비) */
const STEP_VH = 70;

export default function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Motion useScroll 로 섹션 진행도(0~1)를 받아, 사례 번호가 바뀔 때만 상태를 갱신한다.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(CASES.length - 1, Math.floor(p * CASES.length));
    setActive((cur) => (cur === next ? cur : next));
  });

  /** 목록을 누르면 그 사례가 활성화되는 스크롤 위치로 이동 */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: top + range * ((i + 0.5) / CASES.length),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const heading = (
    <>
      {/* 부제 없음: 아래 항목(트랙·제목·판단 한 줄)이 섹션 설명을 대신한다 */}
      <h2 id="featured-title" className="section-title mb-10">
        Selected Work
      </h2>
    </>
  );

  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="section-padding"
    >
      {/* ── 데스크톱: 화면 고정 + 스크롤 전환 ── */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${CASES.length * STEP_VH + 100}vh` }}
      >
        {/* 위쪽 기준으로 고정: 펼침 높이가 사례마다 달라도 제목·목록이 움직이지 않는다 */}
        <div className="sticky top-0 flex h-screen items-start pt-[14vh]">
          <div className="container-max-width w-full">
            <div className="grid grid-cols-[5fr_6fr] items-start gap-16">
              <div>
                <div>{heading}</div>
                <ol className="space-y-1">
                  {CASES.map((c, i) => {
                    const on = i === active;
                    return (
                      <li key={c.slug}>
                        <div
                          className={`border-l-2 py-3 pl-5 transition-colors motion-reduce:transition-none ${
                            on
                              ? "border-slate-900 dark:border-white"
                              : "border-slate-200 dark:border-white/[0.1]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => goTo(i)}
                            aria-current={on ? "step" : undefined}
                            className="flex w-full items-baseline gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded"
                          >
                            <span
                              className={`text-xs tabular-nums ${
                                on
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <span className="block text-xs text-slate-500 dark:text-slate-400">
                                {c.track}
                                {c.proposed && PROPOSED}
                              </span>
                              <span
                                className={`block text-lg font-semibold ${
                                  on
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                {c.title}
                              </span>
                            </span>
                          </button>

                          {/* 펼침: grid-rows 0fr↔1fr 로 높이를 부드럽게 */}
                          <div
                            className={`grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none ${
                              on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="pl-8 pt-3">
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                  {c.decision}
                                </p>
                                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                                  {c.metric}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  {c.scale}
                                </p>
                                <Link
                                  href={`/projects/${c.slug}`}
                                  tabIndex={on ? 0 : -1}
                                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  의사결정 과정 보기
                                  <ArrowUpRight
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* 오른쪽: 사례별 UI 조각을 한 칸에 겹쳐 두고 활성 것만 보이게 (높이 고정) */}
              <div>
                <div className="grid pt-[7.5rem]">
                  {CASES.map(({ slug, Fragment }, i) => (
                    <div
                      key={slug}
                      aria-hidden={i !== active}
                      className={`[grid-area:1/1] self-start transition-all duration-500 motion-reduce:transition-none ${
                        i === active
                          ? "opacity-100 scale-100"
                          : "pointer-events-none opacity-0 scale-[0.98]"
                      }`}
                    >
                      <Fragment active={i === active} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 모바일·태블릿: 카드를 위아래로 쌓는다 ── */}
      <div className="container-max-width py-24 lg:hidden">
        {heading}
        {/* 항목마다 옅은 경계선과 넉넉한 위아래 여백으로 구분한다 */}
        <ol className="divide-y divide-slate-200/80 dark:divide-white/[0.08]">
          {CASES.map(
            (
              {
                slug,
                track,
                title,
                decision,
                metric,
                scale,
                proposed,
                Fragment,
              },
              i,
            ) => (
              <li key={slug} className="py-14 first:pt-0 last:pb-10">
                <Fragment active />
                <div className="mt-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {String(i + 1).padStart(2, "0")} · {track}
                    {proposed && PROPOSED}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {decision}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {metric}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {scale}
                  </p>
                  <Link
                    href={`/projects/${slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    의사결정 과정 보기
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  );
}
