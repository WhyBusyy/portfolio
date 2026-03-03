"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Users, Heart } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      icon: ShoppingCart,
      title: "개인 쇼핑몰 운영",
      description:
        "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
      devConnection:
        "사용자 구매 여정과 전환율에 대한 실전 감각을 UI/UX 설계에 직접 반영합니다.",
    },
    {
      icon: Users,
      title: "SNS 마케팅",
      description:
        "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
      devConnection:
        "데이터 기반 의사결정과 A/B 테스트 사고방식을 자연스럽게 체득했습니다.",
    },
    {
      icon: Heart,
      title: "다양한 업계 경험",
      description: "제약, 금융 회사 근무 경험이 있습니다.",
      devConnection:
        "새로운 도메인의 비즈니스 로직을 빠르게 파악하고 개발에 반영하는 능력을 길렀습니다.",
    },
  ];

  return (
    <section ref={ref} id="experience" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Beyond Code</h2>
          <p className="section-subtitle">
            개발 외의 경험이 개발자로서의 강점이 됩니다.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/[0.04] p-6"
              >
                {/* Icon */}
                <div className="w-10 h-10 mb-5 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
                  <experience.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {experience.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {experience.description}
                </p>

                {/* Dev Connection */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] mt-4">
                  <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                    {experience.devConnection}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
