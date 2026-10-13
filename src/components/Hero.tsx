"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

/** 증거 패널: 수치마다 전후를 보여 주는 작은 시각화. 수치는 프로젝트 상세에 공개된 값이다. */
const PROOFS = [
  {
    key: "editor",
    metric: "2.5GB → 3MB",
    label: "에디터 의존성",
    href: "/projects/editor-migration",
  },
  {
    key: "qa",
    metric: "수동 QA → PR 게이트",
    label: "PR마다 테스트 90개 이상",
    href: "/projects/qa-automation-bot",
  },
  {
    key: "cms",
    metric: "3일 1회 → 2주 1회",
    label: "콘텐츠 관련 개발 요청",
    href: "/projects/cms-development",
  },
] as const;

const AUTO_MS = 4200;

function EditorVisual() {
  return (
    <div className="space-y-5">
      {[
        { name: "CKEditor", value: "2.5GB", w: "100%", accent: false },
        { name: "Tiptap + 직접 만든 툴바", value: "3MB", w: "3px", accent: true },
      ].map((b) => (
        <div key={b.name}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">{b.name}</span>
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">{b.value}</span>
          </div>
          <div
            className={`mt-2 h-3 rounded-sm ${b.accent ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-300 dark:bg-white/20"}`}
            style={{ width: b.w }}
          />
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        node_modules 기준입니다. 운영 배포 시간도 12분에서 6분으로 줄었습니다.
      </p>
    </div>
  );
}

function QaVisual() {
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300">PR이 열리면 자동으로 실행</p>
      <ul className="mt-3 space-y-2.5">
        {["스모크", "단위", "E2E", "AI 생성 테스트 (참고용, 쓰기 차단)"].map((t) => (
          <li key={t} className="flex items-center gap-2.5 text-[15px] text-slate-800 dark:text-slate-100">
            <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 2주(14칸) 위에 요청이 들어온 날을 표시한다: 3일에 1번 vs 2주에 1번 */
function CmsVisual() {
  const rows = [
    { name: "CMS 도입 전", days: [1, 4, 7, 10, 13], accent: false },
    { name: "CMS 도입 후", days: [14], accent: true },
  ];
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.name}>
          <p className="text-sm text-slate-600 dark:text-slate-300">{r.name}</p>
          <div className="mt-2 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => i + 1).map((d) => {
              const on = r.days.includes(d);
              return (
                <span
                  key={d}
                  className={`h-6 rounded-sm ${
                    on
                      ? r.accent
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-slate-500 dark:bg-slate-300"
                      : "bg-slate-200/70 dark:bg-white/[0.06]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        2주 동안 개발 요청이 들어온 날을 칸으로 나타냈습니다.
      </p>
    </div>
  );
}

const VISUALS = { editor: EditorVisual, qa: QaVisual, cms: CmsVisual };

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // 사용자가 건드리기 전까지만 자동으로 넘긴다 (동작 줄이기 설정이면 넘기지 않음)
  useEffect(() => {
    if (reduce || touched) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % PROOFS.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, touched, reduce]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const Visual = VISUALS[PROOFS[active].key];

  return (
    <section id="hero" className="section-padding pt-28 pb-20 lg:flex lg:min-h-[100dvh] lg:items-center">
      <div className="container-max-width grid w-full items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
        {/* 왼쪽: 한 문장 + 버튼. LCP 요소라 투명도 애니메이션을 걸지 않는다 */}
        <div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400">유병규 · Frontend Engineer</p>
          <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.15] tracking-[-0.035em] text-slate-900 dark:text-white sm:text-6xl">
            반복을 없애고,
            <br />
            기준을 코드에 남깁니다.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Next.js·TypeScript로 웹 서비스를 만드는 프론트엔드 개발자입니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#featured"
              className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
            >
              연락하기
            </a>
          </div>
        </div>

        {/* 오른쪽: 증거 패널 */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl bg-slate-50 p-6 dark:bg-white/[0.035] sm:p-7"
        >
          <div role="tablist" aria-label="주요 성과" className="flex flex-col gap-1">
            {PROOFS.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="hero-proof-panel"
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 rounded-md px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${
                    on ? "bg-white dark:bg-white/[0.06]" : "hover:bg-white/60 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`text-xl font-bold tracking-[-0.02em] sm:text-2xl ${
                      on ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {p.metric}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{p.label}</span>
                </button>
              );
            })}
          </div>

          <div
            id="hero-proof-panel"
            role="tabpanel"
            className="mt-6 border-t border-slate-200 pt-6 dark:border-white/[0.08]"
          >
            {/* 시각화 높이를 고정해 탭을 바꿔도 패널이 들썩이지 않게 한다 */}
            <div className="min-h-[13.5rem]">
              <Visual />
            </div>
            <Link
              href={PROOFS[active].href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              어떻게 했는지 보기
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
