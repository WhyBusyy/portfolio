"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DetailItem {
  label: string;
  detail: string;
  /** 제목 옆 작은 배지 (예: 검증 게이트) */
  badge?: string;
}

/**
 * 인터랙티브 다이어그램 아래에 붙는 설명 칸.
 * 모든 설명을 같은 격자 칸에 겹쳐 두고 현재 것만 보이게 해서, 항목을 바꿔도 높이가 변하지 않는다.
 */
export default function DetailPanel({
  items,
  active,
  onChange,
  hint,
  countLabel,
}: {
  items: DetailItem[];
  active: number | null;
  onChange: (i: number | null) => void;
  /** 아무것도 고르지 않았을 때 안내 문구 */
  hint: string;
  /** 고르기 전 오른쪽에 보이는 개수 표기 (예: "8단계") */
  countLabel: string;
}) {
  const last = items.length - 1;
  const current = active === null ? null : items[active];
  const navBtn =
    "rounded-md border border-slate-200 dark:border-white/[0.1] p-1.5 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";

  return (
    <div className="mt-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, (active ?? 0) - 1))}
          disabled={active === null || active === 0}
          aria-label="이전 항목"
          className={navBtn}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onChange(active === null ? 0 : Math.min(last, active + 1))}
          disabled={active === last}
          aria-label="다음 항목"
          className={navBtn}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        {active !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="px-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            전체 보기
          </button>
        )}
        <span className="ml-auto text-xs tabular-nums text-slate-500 dark:text-slate-400">
          {active === null ? countLabel : `${active + 1} / ${items.length}`}
        </span>
      </div>

      <div aria-hidden="true" className="mt-3 grid text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <p className={`[grid-area:1/1] ${active === null ? "" : "invisible"}`}>{hint}</p>
        {items.map((it, i) => (
          <p key={it.label} className={`[grid-area:1/1] ${active === i ? "" : "invisible"}`}>
            <span className="font-semibold text-slate-900 dark:text-white">{it.label}</span>
            {it.badge && (
              <span className="ml-2 rounded px-1.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                {it.badge}
              </span>
            )}
            <span className="mt-1 block">{it.detail}</span>
          </p>
        ))}
      </div>
      {/* 화면 낭독기에는 현재 항목만 알린다 */}
      <p aria-live="polite" className="sr-only">
        {current ? `${current.label}. ${current.detail}` : ""}
      </p>
    </div>
  );
}
