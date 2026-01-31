"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Mail, Github, GraduationCap, Globe, Award } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const personalInfo = [
    { icon: User, label: "이름", value: "유병규" },
    { icon: MapPin, label: "위치", value: "서울 서대문구" },
    { icon: Mail, label: "이메일", value: "ybg6152@naver.com", href: "mailto:ybg6152@naver.com" },
    { icon: Github, label: "GitHub", value: "github.com/WhyBusyy", href: "https://github.com/WhyBusyy" },
  ];

  const educationData = [
    {
      institution: "한국해양대학교",
      major: "동아시아학",
      period: "2013.3 - 2021.2"
    }
  ];

  const languageData = [
    { name: "영어", level: "OPic IM1 (2023.9) / TOEIC 800 (2020.8)" },
    { name: "일본어", level: "기초회화" }
  ];

  const certificationData = [
    { name: "SQLD", date: "2024.4" },
    { name: "정보처리기사", date: "2024.6" }
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 section-padding bg-white dark:bg-dark-bg"
    >
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-shadow-grey/80 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-transparent card-hover"
            >
              <div className="space-y-8">
                {/* 개인 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  {personalInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              target={info.href.startsWith('http') ? '_blank' : undefined}
                              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-slate-800 dark:text-slate-200 font-medium hover:text-red-600 dark:hover:text-red-500 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-slate-800 dark:text-slate-200 font-medium">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 구분선 */}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>

                {/* 학력 */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      학력
                    </h3>
                  </div>
                  {educationData.map((edu, index) => (
                    <div key={index} className="ml-12 space-y-2">
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {edu.institution}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        {edu.major}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 구분선 */}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>

                {/* 외국어 */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      외국어
                    </h3>
                  </div>
                  <div className="ml-12 space-y-3">
                    {languageData.map((lang, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                          {lang.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {lang.level}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>

                {/* 자격증 */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      자격증
                    </h3>
                  </div>
                  <div className="ml-12 space-y-3">
                    {certificationData.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {cert.name}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
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
