'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, MapPin, Github, Heart } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
    {
      icon: Mail,
      label: "이메일",
      value: "ybg6152@naver.com",
      href: "mailto:ybg6152@naver.com",
      color: "from-red-600 to-red-500"
    },
    {
      icon: MapPin,
      label: "위치",
      value: "서울 서대문구",
      href: null,
      color: "from-red-500 to-red-600"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/WhyBusyy",
      href: "https://github.com/WhyBusyy",
      color: "from-red-600 to-red-500"
    }
  ]

  return (
    <section ref={ref} id="contact" className="py-20 section-padding bg-white dark:bg-dark-bg">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title">Contact</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-balance">
              함께 성장할 수 있는 기회를 찾고 있습니다.
              <br />
              궁금한 점이 있으시면 언제든지 연락주세요!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                className="bg-white dark:bg-shadow-grey/80 rounded-2xl p-6 border border-slate-200 dark:border-transparent card-hover"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${contact.color} flex items-center justify-center`}>
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {contact.label}
                </h3>
                
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">
                    {contact.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="border-t border-slate-200 dark:border-slate-700 pt-8"
          >
            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <Heart className="w-4 h-4 text-red-600 dark:text-red-500" />
              <span>Copyright. WhyBusyy all rights reserved.</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

