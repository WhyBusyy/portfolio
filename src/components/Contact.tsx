"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Github } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "이메일",
      value: "ybg6152@naver.com",
      href: "mailto:ybg6152@naver.com",
    },
    {
      icon: MapPin,
      label: "위치",
      value: "서울 서대문구",
      href: null,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/WhyBusyy",
      href: "https://github.com/WhyBusyy",
    },
  ];

  return (
    <section ref={ref} id="contact" className="py-32 lg:py-40 section-padding">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">Contact</h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed text-balance mb-16 max-w-xl mx-auto"
          >
            함께 성장할 수 있는 기회를 찾고 있습니다.
            <br />
            궁금한 점이 있으시면 언제든지 연락주세요.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-12">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <contact.icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {contact.value}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-t border-slate-100 dark:border-white/[0.04] pt-8"
          >
            <p className="text-xs text-slate-400 dark:text-slate-600">
              &copy; {new Date().getFullYear()} WhyBusyy. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
