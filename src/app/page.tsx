'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, ArrowRight, Clock, Star } from 'lucide-react'

const TESTS = [
  {
    id: 'career',
    href: '/career',
    emoji: '🧭',
    title: 'Тест на профессию',
    subtitle: 'Карьерный профиль',
    description: 'Узнай какие профессии подходят именно тебе по модели Holland RIASEC',
    features: ['Топ-7 профессий', 'Склад мышления', 'Карьерный архетип', 'Куда учиться'],
    time: '8–10 мин',
    questions: 30,
    color: 'from-purple-600/20 to-pink-600/10',
    border: 'border-purple-500/20',
    badge: 'Самый популярный',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    available: true,
  },
  {
    id: 'iq',
    href: '#',
    emoji: '🧠',
    title: 'IQ тест',
    subtitle: 'Интеллект и логика',
    description: 'Измерь свой коэффициент интеллекта с помощью научных задач',
    features: ['Числовой интеллект', 'Логическое мышление', 'Пространственный IQ', 'Вербальный анализ'],
    time: '15–20 мин',
    questions: 40,
    color: 'from-blue-600/20 to-cyan-600/10',
    border: 'border-blue-500/20',
    badge: 'Скоро',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    available: false,
  },
  {
    id: 'mbti',
    href: '#',
    emoji: '🎭',
    title: 'Тест личности',
    subtitle: 'MBTI профиль',
    description: 'Определи свой тип личности из 16 возможных архетипов',
    features: ['16 типов личности', 'Сильные стороны', 'Стиль общения', 'Совместимость'],
    time: '10–12 мин',
    questions: 60,
    color: 'from-green-600/20 to-emerald-600/10',
    border: 'border-green-500/20',
    badge: 'Скоро',
    badgeColor: 'text-green-400 border-green-500/30 bg-green-500/10',
    available: false,
  },
]

export default function HubPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Mentivo</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 px-6 text-center max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-purple-300 mb-6 border border-purple-500/20"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Психологические тесты с научным подходом</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
        >
          Познай себя —{' '}
          <span className="gradient-text">выбери путь</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/55 text-lg max-w-xl mx-auto"
        >
          Коллекция точных тестов которые помогут понять себя, выбрать профессию и построить карьеру
        </motion.p>
      </section>

      {/* Tests grid */}
      <section className="flex-1 px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-5">
          {TESTS.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => test.available && router.push(test.href)}
              className={`glass rounded-3xl p-6 border ${test.border} bg-gradient-to-br ${test.color} relative overflow-hidden flex flex-col ${test.available ? 'cursor-pointer hover:scale-[1.02] transition-transform' : 'opacity-70'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-40" />

              {/* Badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border self-start mb-4 ${test.badgeColor}`}>
                {test.badge}
              </div>

              {/* Title */}
              <div className="text-4xl mb-3">{test.emoji}</div>
              <h2 className="text-xl font-black text-white mb-1">{test.title}</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{test.subtitle}</p>
              <p className="text-sm text-white/60 leading-relaxed mb-5">{test.description}</p>

              {/* Features */}
              <div className="space-y-1.5 mb-6 flex-1">
                {test.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-white/55">
                    <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-white/35">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {test.time}
                  </div>
                  <div>{test.questions} вопросов</div>
                </div>
                {test.available && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-purple-400">
                    Начать <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-6 text-center text-white/25 text-xs">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="font-semibold text-white/35">Mentivo</span>
        </div>
        <p>Психологические тесты · mentivo.net</p>
      </footer>

    </main>
  )
}
