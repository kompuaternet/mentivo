'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Brain } from 'lucide-react'
import { QUESTIONS, TOTAL_QUESTIONS } from '@/data/questions'
import { calculateProfile } from '@/lib/scoring'
import { t, detectLocale } from '@/lib/i18n'
import type { Locale } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function TestPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('ru')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('career_locale') as Locale | null
    setLocale(saved ?? detectLocale())
  }, [])

  const question = QUESTIONS[current]
  const progress = Math.round(((current) / TOTAL_QUESTIONS) * 100)
  const blockProgress = QUESTIONS.filter(q => q.block === question.block)
  const blockCurrent = blockProgress.findIndex(q => q.id === question.id) + 1

  // Count unique blocks for nav
  const totalBlocks = Array.from(new Set(QUESTIONS.map(q => q.block))).length

  const handleSelect = useCallback(async (optionId: string) => {
    setSelected(optionId)

    const newAnswers = { ...answers, [question.id]: optionId }
    setAnswers(newAnswers)

    // Small delay for animation
    await new Promise(r => setTimeout(r, 320))

    if (current < TOTAL_QUESTIONS - 1) {
      setDirection('forward')
      setSelected(null)
      setCurrent(c => c + 1)
    } else {
      // Test complete — calculate and save
      setSaving(true)
      try {
        const profile = calculateProfile(newAnswers)
        const sessionId = uuidv4()
        const session = {
          id: sessionId,
          locale,
          answers: newAnswers,
          profile,
          isPaid: false,
          createdAt: new Date().toISOString(),
        }

        // Save to API (also stored in DB)
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session),
        })

        // Also save locally as fallback
        localStorage.setItem('career_session', JSON.stringify(session))

        router.push(`/results/${sessionId}`)
      } catch (err) {
        // Fallback: save locally and redirect
        const profile = calculateProfile(newAnswers)
        const sessionId = uuidv4()
        const session = { id: sessionId, locale, answers: newAnswers, profile, isPaid: false, createdAt: new Date().toISOString() }
        localStorage.setItem('career_session', JSON.stringify(session))
        router.push(`/results/${sessionId}`)
      }
    }
  }, [answers, current, locale, question.id, router])

  const handleBack = () => {
    if (current === 0) {
      router.push('/')
      return
    }
    setDirection('back')
    setSelected(null)
    setCurrent(c => c - 1)
  }

  const variants = {
    enter: (dir: string) => ({
      x: dir === 'forward' ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({
      x: dir === 'forward' ? -60 : 60,
      opacity: 0,
    }),
  }

  if (saving) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4 animate-float">🧠</div>
          <div className="text-xl font-semibold text-white mb-2">Анализируем твои ответы...</div>
          <div className="text-white/40">Строим твой профиль</div>
          <div className="mt-6 flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                className="w-2.5 h-2.5 rounded-full bg-purple-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-[#0a0812]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-5 py-4">

          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('test_back', locale)}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">{t('test_block', locale)} {question.block}/{totalBlocks}</span>
              <span className="text-purple-400 font-bold">{question.blockEmoji}</span>
            </div>

            <div className="text-sm font-semibold text-white/60">
              <span className="text-white font-bold">{current + 1}</span>
              <span className="text-white/30"> {t('test_of', locale)} {TOTAL_QUESTIONS}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Block name & percent */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-white/40">{question.blockName[locale]}</span>
            <span className="text-xs font-bold text-purple-400">{progress}% {t('test_complete', locale)}</span>
          </div>
        </div>
      </div>

      {/* ── Question ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Block badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="text-2xl">{question.blockEmoji}</span>
                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                  {question.blockName[locale]}
                </span>
              </motion.div>

              {/* Question text */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
                {question.text[locale]}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleSelect(opt.id)}
                    disabled={selected !== null}
                    className={`option-card text-left w-full ${selected === opt.id ? 'selected' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Letter badge */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                        selected === opt.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/8 text-white/40'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>

                      <span className={`text-sm md:text-base leading-relaxed pt-1 transition-colors ${
                        selected === opt.id ? 'text-white' : 'text-white/75'
                      }`}>
                        {opt.text[locale]}
                      </span>
                    </div>

                    {/* Selection indicator */}
                    {selected === opt.id && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 origin-left"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Block dots ── */}
      <div className="flex justify-center gap-2 pb-8">
        {QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className={`rounded-full transition-all ${
              i < current
                ? 'w-2 h-2 bg-purple-500'
                : i === current
                  ? 'w-3 h-2 bg-purple-400'
                  : 'w-2 h-2 bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
