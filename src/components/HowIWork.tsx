'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Smile, Lightbulb, CheckCircle } from 'lucide-react'

export default function HowIWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const workPrinciples = [
    {
      icon: Smile,
      title: "과정에서 재미를 찾습니다",
      description: "목표 달성도 중요하지만 일의 과정에서 재미를 찾는 편입니다.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "긍정적 영향을 추구합니다",
      description: "회사와 세상에 긍정적 영향을 주는 일은 그 자체로 동기부여가 됩니다.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Lightbulb,
      title: "유연한 문제 해결",
      description: "문제가 생겨도 그 상황 안에서 일을 진행할 수 있는 방향을 찾습니다.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CheckCircle,
      title: "꼼꼼한 업무 처리",
      description: "맡은 임무를 면밀하게 처리합니다.",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section ref={ref} id="how-i-work" className="py-20 section-padding bg-white dark:bg-slate-900">
      <div className="container-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">How I Work</h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 sm:p-12 mb-12"
            >
              <p className="text-center text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-balance">
                저의 업무 철학과 가치관을 소개합니다.
                <br />
                이러한 원칙들이 제가 개발자로서 성장하는 데 중요한 기반이 되고 있습니다.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {workPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${principle.color} flex-shrink-0`}>
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
  )
}

