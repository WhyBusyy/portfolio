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
      color: "from-red-600 to-red-500",
    },
    {
      icon: Target,
      title: "긍정적 영향을 추구합니다",
      description:
        "회사와 세상에 긍정적 영향을 주는 일은 그 자체로 동기부여가 됩니다.",
      color: "from-red-600 to-red-500",
    },
    {
      icon: Lightbulb,
      title: "유연한 문제 해결",
      description:
        "문제가 생겨도 그 상황 안에서 일을 진행할 수 있는 방향을 찾습니다.",
      color: "from-red-600 to-red-500",
    },
    {
      icon: CheckCircle,
      title: "꼼꼼한 업무 처리",
      description: "맡은 임무를 면밀하게 처리합니다.",
      color: "from-red-600 to-red-500",
    },
  ];

  return (
    <section
      ref={ref}
      id="how-i-work"
      className="py-20 section-padding bg-white dark:bg-dark-bg"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">How I Work</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {workPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  className="bg-white dark:bg-shadow-grey/80 rounded-2xl p-6 border border-slate-200 dark:border-transparent card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${principle.color} flex-shrink-0`}
                    >
                      <principle.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        {principle.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
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
