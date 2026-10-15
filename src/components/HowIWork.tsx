"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const workPrinciples = [
  {
    title: "필요한 일은 먼저 제안합니다",
    description:
      "같은 일이 반복되는 게 보이면 그냥 넘기지 않습니다. QA 봇, 자체 CMS, 배포 알림 모두 문제를 정리해 해결안을 기획하고, 팀에 제안해 직접 만들었습니다.",
    href: "/projects/dx-automation",
    hrefLabel: "배포 알림·기록 자동화",
  },
  {
    title: "근거를 보고 구조를 정합니다",
    description:
      "좋은 구조인지는 방법론이 아니라 우리 코드가 결정한다고 봅니다. 후보 네 가지를 비교하고 의존성을 전수조사해, 정답으로 통하던 안 대신 하이브리드 구조를 택했습니다.",
    href: "/projects/vsa-migration",
    hrefLabel: "아키텍처 마이그레이션",
  },
  {
    title: "AI에 안전장치를 붙입니다",
    description:
      "검증이 자동으로 걸리면 AI 산출물을 더 과감하게 쓸 수 있습니다. 테스트 생성 파이프라인에 문법 검증과 DB Read-only 강제를 넣어 실제 데이터를 건드리지 않게 했습니다.",
    href: "/projects/qa-automation-bot",
    hrefLabel: "QA 자동화 봇",
  },
  {
    title: "규칙은 검사 도구와 문서로 남깁니다",
    description:
      "규칙을 사람 기억에 맡기면 시간이 지나면서 무너집니다. 아키텍처 규칙은 검증 도구로, 디자인 시스템 규칙은 문서로 남겼습니다.",
    href: "/projects/design-system",
    hrefLabel: "디자인 시스템",
  },
];


type Principle = (typeof workPrinciples)[number];

/**
 * 원칙 한 줄. 화면 중앙을 지나는 동안 제목이 흐린 색에서 진한 색으로 채워져,
 * 한 번에 원칙 하나씩 읽히게 한다. 동작 줄이기 설정이면 처음부터 진하게 보인다.
 */
function PrincipleRow({ p }: { p: Principle }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 55%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.22, 1]);

  return (
    <li ref={ref} className="grid gap-4 py-10 lg:grid-cols-[6fr_5fr] lg:gap-16 lg:py-14">
      <motion.h3
        style={reduce ? undefined : { opacity }}
        className="text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
      >
        {p.title}
      </motion.h3>
      <div className="lg:pt-2">
        <p className="max-w-[65ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {p.description}
        </p>
        <Link
          href={p.href}
          className="mt-4 inline-block text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
        >
          {p.hrefLabel} &rarr;
        </Link>
      </div>
    </li>
  );
}

export default function HowIWork() {
  return (
    <section id="how-i-work" aria-labelledby="how-i-work-title" className="py-28 lg:py-36 section-padding">
      <div className="container-max-width">
        <h2 id="how-i-work-title" className="section-title">
          How I Work
        </h2>
        <p className="section-subtitle !mb-4">일할 때 지키는 기준입니다.</p>
        <ul>
          {workPrinciples.map((p) => (
            <PrincipleRow key={p.title} p={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
