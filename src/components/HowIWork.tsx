"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Microscope, ShieldCheck, Wrench, FileCode2 } from "lucide-react";
import Link from "next/link";

export default function HowIWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const workPrinciples = [
    {
      icon: Microscope,
      title: "정답을 의심합니다",
      description:
        "좋은 구조인지는 방법론이 아니라 우리 코드가 결정한다고 봅니다. 후보 네 가지를 비교하고 의존성을 전수조사해, 정답으로 통하던 안 대신 하이브리드 구조를 택했습니다.",
      href: "/projects/vsa-migration",
      hrefLabel: "아키텍처 마이그레이션",
    },
    {
      icon: ShieldCheck,
      title: "AI에 안전장치를 붙입니다",
      description:
        "검증이 자동으로 걸리면 AI 산출물을 더 과감하게 쓸 수 있습니다. 테스트 생성 파이프라인에 문법 검증과 데이터 쓰기 차단을 넣어 실제 데이터를 건드리지 않게 했습니다.",
      href: "/projects/qa-automation-bot",
      hrefLabel: "QA 자동화 봇",
    },
    {
      icon: Wrench,
      title: "맡은 일만 하지 않습니다",
      description:
        "팀이 반복해서 소모하는 시간은 누군가 줄여야 한다고 믿습니다. 배포 확인과 QA를 도구로 만들었습니다.",
      href: "/projects/dx-automation",
      hrefLabel: "배포 알림·기록 자동화",
    },
    {
      icon: FileCode2,
      title: "규칙을 코드에 남깁니다",
      description:
        "규칙을 사람 기억에 맡기면 시간이 지나면서 무너집니다. 아키텍처 규칙은 검증 도구로, 디자인 시스템 규칙은 문서로 남겼습니다.",
      href: "/projects/design-system",
      hrefLabel: "디자인 시스템",
    },
  ];

  return (
    <section
      ref={ref}
      id="how-i-work"
      aria-labelledby="how-i-work-title"
      className="py-32 lg:py-40 section-padding bg-slate-50/50 dark:bg-white/[0.02]"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="how-i-work-title" className="section-title">How I Work</h2>
          <p className="section-subtitle">일할 때 지키는 기준입니다.</p>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8">
              {workPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <principle.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {principle.description}
                    </p>
                    <Link
                      href={principle.href}
                      className="inline-block mt-2 text-xs text-blue-600 dark:text-blue-400
                                 hover:opacity-70 transition-opacity"
                    >
                      {principle.hrefLabel} &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
