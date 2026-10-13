"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "개인 쇼핑몰 운영",
      description:
        "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
      devConnection:
        "사용자 구매 여정과 전환율에 대한 실전 감각을 UI/UX 설계에 직접 반영합니다.",
    },
    {
      title: "SNS 콘텐츠 운영",
      description:
        "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
      devConnection:
        "'만드는 나'가 아니라 '보는 사용자' 기준으로 판단하는 습관을 익혔고, 이를 UI와 카피 설계에 적용합니다.",
    },
    {
      title: "다양한 업계 경험",
      description: "제약, 금융 회사 근무 경험이 있습니다.",
      devConnection:
        "새로운 도메인의 비즈니스 로직을 빠르게 파악하고 개발에 반영하는 능력을 길렀습니다.",
    },
  ];

  return (
    <section ref={ref} id="experience" aria-labelledby="experience-title" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="experience-title" className="section-title">Beyond Code</h2>
          <p className="section-subtitle">
            개발 외의 경험이 개발자로서의 강점이 됩니다.
          </p>

          {/* 아이콘 칩·카드 없이 가는 선과 여백으로 나눈다 */}
          <ul className="grid max-w-4xl gap-x-12 sm:grid-cols-3">
            {experiences.map((experience) => (
              <li
                key={experience.title}
                className="border-t border-slate-200 dark:border-white/[0.1] pt-6 pb-8"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {experience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {experience.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-900 dark:text-slate-200">
                  {experience.devConnection}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
