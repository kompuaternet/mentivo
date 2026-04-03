'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { QUESTIONS, TOTAL_QUESTIONS } from '@/data/questions'
import { calculateProfile } from '@/lib/scoring'
import { t, detectLocale, getLT } from '@/lib/i18n'
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
  const totalBlocks = Array.from(new Set(QUESTIONS.map(q => q.block))).length

  const handleSelect = useCallback(async (optionId: string) => {
    setSelected(optionId)

    const newAnswers = { ...answers, [question.id]: optionId }
    setAnswers(newAnswers)

    await new Promise(r => setTimeout(r, 300))

    if (current < TOTAL_QUESTIONS - 1) {
      setDirection('forward')
      setSelected(null)
      setCurrent(c => c + 1)
    } else {
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
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session),
        })
        localStorage.setItem('career_session', JSON.stringify(session))
        router.push(`/career/results/${sessionId}`)
      } catch {
        const profile = calculateProfile(newAnswers)
        const sessionId = uuidv4()
        const session = { id: sessionId, locale, answers: newAnswers, profile, isPaid: false, createdAt: new Date().toISOString() }
        localStorage.setItem('career_session', JSON.stringify(session))
        router.push(`/career/results/${sessionId}`)
      }
    }
  }, [answers, current, locale, question.id, router])

  const handleBack = () => {
    if (current === 0) { router.push('/career'); return }
    setDirection('back')
    setSelected(null)
    setCurrent(c => c - 1)
  }

  const variants = {
    enter: (dir: string) => ({ x: dir === 'forward' ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({ x: dir === 'forward' ? -50 : 50, opacity: 0 }),
  }

  if (saving) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FF]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center px-6"
        >
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{t('test_analyzing', locale)}</div>
          <div className="text-gray-500">{t('test_analyzing_sub', locale)}</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FF]">

      {/* ── Top progress bar (full width, absolute top) ── */}
      <div className="h-1 bg-indigo-100 w-full fixed top-0 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* ── Nav ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 mt-1">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('test_back', locale)}
          </button>

          <div className="text-sm text-gray-400">
            <span className="font-bold text-gray-700">{current + 1}</span>
            {' '}{t('test_of', locale)}{' '}
            <span className="font-semibold text-gray-500">{TOTAL_QUESTIONS}</span>
          </div>

          <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {t('test_block', locale)} {question.block}/{totalBlocks}
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
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Block label */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
                  {getLT(question.blockName, locale)}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-7 leading-snug">
                {getLT(question.text, locale)}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSelect(opt.id)}
                    disabled={selected !== null}
                    className={`option-card text-left w-full group ${selected === opt.id ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number circle */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        selected === opt.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                      }`}>
                        {selected === opt.id
                          ? <CheckCircle2 className="w-4 h-4" />
                          : i + 1
                        }
                      </div>

                      <span className={`text-sm md:text-base leading-relaxed transition-colors ${
                        selected === opt.id ? 'text-indigo-900 font-medium' : 'text-gray-700'
                      }`}>
                        {getLT(opt.text, locale)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom progress dots ── */}
      <div className="flex justify-center gap-1.5 pb-8">
        {QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className={`rounded-full transition-all duration-200 ${
              i < current
                ? 'w-2 h-2 bg-indigo-400'
                : i === current
                  ? 'w-4 h-2 bg-indigo-600'
                  : 'w-2 h-2 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
