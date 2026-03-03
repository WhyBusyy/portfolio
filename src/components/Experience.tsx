"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, ShoppingCart, Users, Heart } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      icon: Trophy,
      title: "스포츠 애호가",
      description: "축구, 헬스를 비롯한 다양한 스포츠를 좋아합니다.",
    },
    {
      icon: ShoppingCart,
      title: "개인 쇼핑몰 운영",
      description:
        "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
    },
    {
      icon: Users,
      title: "SNS 마케팅",
      description:
        "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
    },
    {
      icon: Heart,
      title: "다양한 업계 경험",
      description: "제약, 금융 회사 근무 경험이 있습니다.",
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
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            개발 외에도 다양한 경험을 쌓아왔습니다.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
                  <experience.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {experience.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {experience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
