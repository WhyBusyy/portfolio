'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, ShoppingCart, Users, Heart } from 'lucide-react'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      icon: Trophy,
      title: "스포츠 애호가",
      description: "축구, 헬스를 비롯한 다양한 스포츠를 좋아합니다.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: ShoppingCart,
      title: "개인 쇼핑몰 운영",
      description: "개인 쇼핑몰 운영을 통해 월매출 1,000만원 이상 달성한 경험이 있습니다.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "SNS 마케팅",
      description: "SNS 계정 팔로워 10,000명 이상 달성한 경험이 있습니다.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "다양한 업계 경험",
      description: "제약, 금융 회사 근무 경험이 있습니다.",
      color: "from-pink-500 to-pink-600"
    }
  ]

  return (
    <section ref={ref} id="experience" className="py-20 section-padding bg-slate-50 dark:bg-slate-800">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Experience</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-hover text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${experience.color} flex items-center justify-center`}>
                  <experience.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                  {experience.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {experience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

