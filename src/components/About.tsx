"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  User,
  MapPin,
  Mail,
  Github,
  GraduationCap,
  Globe,
  Award,
} from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const personalInfo = [
    { icon: User, label: "이름", value: "유병규" },
    { icon: MapPin, label: "위치", value: "서울 서대문구" },
    {
      icon: Mail,
      label: "이메일",
      value: "ybg6152@naver.com",
      href: "mailto:ybg6152@naver.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/WhyBusyy",
      href: "https://github.com/WhyBusyy",
    },
  ];

  const educationData = [
    {
      institution: "한국해양대학교",
      major: "동아시아학",
      period: "2013.3 - 2021.2",
    },
  ];

  const languageData = [
    { name: "영어", level: "OPic IM1 (2023.9) / TOEIC 800 (2020.8)" },
    { name: "일본어", level: "기초회화" },
  ];

  const certificationData = [
    { name: "SQLD", date: "2024.4" },
    { name: "정보처리기사", date: "2024.6" },
  ];

  return (
    <section ref={ref} id="about" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">개발자로서의 기본 정보를 소개합니다.</p>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                {personalInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 15 }
                      }
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={
                              info.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              info.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-white/[0.06]" />

              {/* Education, Languages, Certifications - 3 columns */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                      학력
                    </h3>
                  </div>
                  {educationData.map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {edu.major}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                      외국어
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {languageData.map((lang, index) => (
                      <div key={index}>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {lang.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {lang.level}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                      자격증
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {certificationData.map((cert, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {cert.name}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {cert.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
