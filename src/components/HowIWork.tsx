"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Smile, Lightbulb, CheckCircle } from "lucide-react";

export default function HowIWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const workPrinciples = [
    {
      icon: Smile,
      title: "과정에서 재미를 찾습니다",
      description: "목표 달성도 중요하지만 일의 과정에서 재미를 찾는 편입니다.",
    },
    {
      icon: Target,
      title: "긍정적 영향을 추구합니다",
      description:
        "회사와 세상에 긍정적 영향을 주는 일은 그 자체로 동기부여가 됩니다.",
    },
    {
      icon: Lightbulb,
      title: "유연한 문제 해결",
      description:
        "문제가 생겨도 그 상황 안에서 일을 진행할 수 있는 방향을 찾습니다.",
    },
    {
      icon: CheckCircle,
      title: "꼼꼼한 업무 처리",
      description: "맡은 임무를 면밀하게 처리합니다.",
    },
  ];

  return (
    <section
      ref={ref}
      id="how-i-work"
      className="py-32 lg:py-40 section-padding bg-slate-50/50 dark:bg-white/[0.02]"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">How I Work</h2>
          <p className="section-subtitle">일에 임하는 저만의 원칙입니다.</p>

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
