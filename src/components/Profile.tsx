"use client";

import { ArrowUpRight } from "lucide-react";

/**
 * 마무리 섹션: 기존 About · Beyond Code · Contact 를 하나로 합쳤다.
 * 왼쪽은 연락처(가장 큰 행동), 오른쪽은 이력 사실과 비개발 경험.
 * 문구는 기존 섹션의 것을 그대로 옮겼다.
 */
const background = [
  { label: "학력", lines: ["한국해양대학교 동아시아학", "2013.3 - 2021.2"] },
  { label: "자격증", lines: ["정보처리기사 (2024.6)", "SQLD (2024.4)"] },
  { label: "어학", lines: ["영어: OPIc IM1 (2023.9), TOEIC 800 (2020.8)", "일본어: 기초회화"] },
];

const beyondCode = [
  {
    title: "개인 쇼핑몰 운영",
    description: "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
    devConnection: "사용자 구매 여정과 전환율에 대한 실전 감각을 UI/UX 설계에 직접 반영합니다.",
  },
  {
    title: "SNS 콘텐츠 운영",
    description: "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
    devConnection:
      "'만드는 나'가 아니라 '보는 사용자' 기준으로 판단하는 습관을 익혔고, 이를 UI와 카피 설계에 적용합니다.",
  },
  {
    title: "다양한 업계 경험",
    description: "제약, 금융 회사 근무 경험이 있습니다.",
    devConnection: "새로운 도메인의 비즈니스 로직을 빠르게 파악하고 개발에 반영하는 능력을 길렀습니다.",
  },
];

const linkCls =
  "inline-flex items-center gap-1 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded";

export default function Profile() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-28 lg:py-36 section-padding">
      <div className="container-max-width grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* 왼쪽: 연락처 */}
        <div id="contact" className="scroll-mt-24">
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">연락처</p>
          <a
            href="mailto:ybg6152@naver.com"
            className={`${linkCls} mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-3xl`}
          >
            ybg6152@naver.com
          </a>
          <ul className="mt-6 space-y-2 text-[15px] text-slate-600 dark:text-slate-300">
            <li>
              <a
                href="https://github.com/WhyBusyy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                github.com/WhyBusyy
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>서울 서대문구</li>
          </ul>
        </div>

        {/* 오른쪽: 이력 사실 + 비개발 경험 */}
        <div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {background.map((b) => (
              <div key={b.label}>
                <dt className="text-sm text-slate-500 dark:text-slate-400">{b.label}</dt>
                {b.lines.map((l) => (
                  <dd key={l} className="mt-1 text-[15px] leading-relaxed text-slate-900 dark:text-slate-100">
                    {l}
                  </dd>
                ))}
              </div>
            ))}
          </dl>

          <h3 className="mt-16 text-lg font-semibold text-slate-900 dark:text-white">Beyond Code</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            개발 외의 경험이 개발자로서의 강점이 됩니다.
          </p>
          <ul className="mt-6 space-y-7">
            {beyondCode.map((e) => (
              <li key={e.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="text-[15px] font-semibold text-slate-900 dark:text-white">{e.title}</p>
                <div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{e.description}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-900 dark:text-slate-200">
                    {e.devConnection}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 마지막 행동 유도: 페이지 끝에서 연락으로 이어지게 한다 */}
      <div className="container-max-width mt-24 flex flex-col items-start gap-5 border-t border-slate-200 pt-10 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-2xl">
          함께 풀 문제가 있다면 편하게 연락 주세요.
        </p>
        <a
          href="mailto:ybg6152@naver.com"
          className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          메일 보내기
        </a>
      </div>

      <p className="container-max-width mt-10 text-xs text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} WhyBusyy
      </p>
    </section>
  );
}
