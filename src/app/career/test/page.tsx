'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2, ArrowRight, Brain, Lightbulb, Users, Target, Wrench } from 'lucide-react'
import { QUESTIONS, TOTAL_QUESTIONS } from '@/data/questions'
import { calculateProfile } from '@/lib/scoring'
import { t, detectLocale, getLT } from '@/lib/i18n'
import type { Locale } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// ─── Insight types ─────────────────────────────────────────────────────────────

type InsightType = 'analytical' | 'creative' | 'social' | 'strategic' | 'practical'

interface InsightData {
  type: InsightType
  percentile: number
}

const INSIGHT_CONFIG: Record<InsightType, {
  titleKey: 'insight_t_analytical_title' | 'insight_t_creative_title' | 'insight_t_social_title' | 'insight_t_strategic_title' | 'insight_t_practical_title'
  descKey: 'insight_t_analytical_desc' | 'insight_t_creative_desc' | 'insight_t_social_desc' | 'insight_t_strategic_desc' | 'insight_t_practical_desc'
  icon: React.ElementType
  gradient: string
  ring: string
  iconColor: string
}> = {
  analytical: { titleKey: 'insight_t_analytical_title', descKey: 'insight_t_analytical_desc', icon: Brain, gradient: 'from-indigo-50 to-blue-100', ring: '#C7D2FE', iconColor: 'text-indigo-600' },
  creative: { titleKey: 'insight_t_creative_title', descKey: 'insight_t_creative_desc', icon: Lightbulb, gradient: 'from-purple-50 to-pink-100', ring: '#DDD6FE', iconColor: 'text-purple-600' },
  social: { titleKey: 'insight_t_social_title', descKey: 'insight_t_social_desc', icon: Users, gradient: 'from-green-50 to-teal-100', ring: '#A7F3D0', iconColor: 'text-green-600' },
  strategic: { titleKey: 'insight_t_strategic_title', descKey: 'insight_t_strategic_desc', icon: Target, gradient: 'from-orange-50 to-yellow-100', ring: '#FDE68A', iconColor: 'text-orange-600' },
  practical: { titleKey: 'insight_t_practical_title', descKey: 'insight_t_practical_desc', icon: Wrench, gradient: 'from-sky-50 to-cyan-100', ring: '#BAE6FD', iconColor: 'text-sky-600' },
}

// Determine insight type from partial answers
function getInsight(answers: Record<number, string>): InsightData {
  try {
    const profile = calculateProfile(answers)
    const s = profile.scores
    const dims: { type: InsightType; score: number }[] = [
      { type: 'analytical', score: (s.I ?? 0) + (s.analytical ?? 0) },
      { type: 'creative',   score: (s.A ?? 0) + (s.creative ?? 0) },
      { type: 'social',     score: (s.S ?? 0) + (s.empathetic ?? 0) },
      { type: 'strategic',  score: (s.E ?? 0) + (s.strategic ?? 0) },
      { type: 'practical',  score: (s.R ?? 0) + (s.C ?? 0) },
    ]
    const total = dims.reduce((sum, d) => sum + d.score, 0)
    const dominant = dims.reduce((max, d) => d.score > max.score ? d : max, dims[0])
    const percentile = total > 0
      ? Math.min(96, Math.max(72, Math.round((dominant.score / total) * 100 * 2.8 + 62)))
      : 85
    return { type: dominant.type, percentile }
  } catch {
    return { type: 'analytical', percentile: 85 }
  }
}

// Breakpoints: show insight after completing question at these indices (0-based)
const INSIGHT_AT = [6, 13, 20] // after Q7, Q14, Q21

// ─── Illustration ─────────────────────────────────────────────────────────────

function InsightIllustration({ type }: { type: InsightType }) {
  const cfg = INSIGHT_CONFIG[type]
  const Icon = cfg.icon
  return (
    <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
      {/* Outer decorative ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-60`}
      />
      {/* Middle ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-6 rounded-full`}
        style={{ background: cfg.ring + '80' }}
      />
      {/* Inner circle with icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
        className={`relative z-10 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center`}
        style={{ boxShadow: `0 0 0 4px ${cfg.ring}` }}
      >
        <Icon className={`w-9 h-9 ${cfg.iconColor}`} />
      </motion.div>
      {/* Orbiting dot 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-sm"
          style={{ border: `2px solid ${cfg.ring}` }} />
      </motion.div>
      {/* Orbiting dot 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
          style={{ background: cfg.ring }} />
      </motion.div>
    </div>
  )
}

// ─── Insight Screen ───────────────────────────────────────────────────────────

function InsightScreen({ data, locale, onContinue, questionNum }: {
  data: InsightData
  locale: Locale
  onContinue: () => void
  questionNum: number
}) {
  const cfg = INSIGHT_CONFIG[data.type]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-[#F4F6FF]"
    >
      {/* Progress indicator */}
      <div className="text-xs text-gray-400 font-semibold mb-8 uppercase tracking-widest">
        {questionNum} / {TOTAL_QUESTIONS}
      </div>

      {/* Illustration */}
      <InsightIllustration type={data.type} />

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-400 mb-3 font-medium"
      >
        {t('insight_subheading', locale)}
      </motion.p>

      {/* Percentile badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
        style={{ background: cfg.ring + '60', color: cfg.iconColor.replace('text-', '').replace('-600', '') }}
      >
        <span className={cfg.iconColor} style={{ fontSize: '13px' }}>
          {t('insight_top_pct', locale)} {data.percentile}%
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-4 max-w-sm"
      >
        {t(cfg.titleKey, locale)}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-gray-500 text-center leading-relaxed max-w-sm mb-10"
      >
        {t(cfg.descKey, locale)}
      </motion.p>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onContinue}
        className="btn-primary flex items-center gap-2 px-8 py-4 text-base rounded-xl"
      >
        {t('insight_btn', locale)}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TestPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('en')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [saving, setSaving] = useState(false)
  const [insight, setInsight] = useState<InsightData | null>(null)

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

    // Check if this is an insight breakpoint
    if (INSIGHT_AT.includes(current) && current < TOTAL_QUESTIONS - 1) {
      setSelected(null)
      const data = getInsight(newAnswers)
      setInsight(data)
      return
    }

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
          id: sessionId, locale, answers: newAnswers, profile, isPaid: false,
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

  const handleContinueInsight = () => {
    setInsight(null)
    setDirection('forward')
    setCurrent(c => c + 1)
  }

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

  // ── Saving screen ──
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

  // ── Insight screen ──
  if (insight) {
    return (
      <AnimatePresence mode="wait">
        <InsightScreen
          key="insight"
          data={insight}
          locale={locale}
          onContinue={handleContinueInsight}
          questionNum={current + 1}
        />
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FF]">

      {/* ── Top progress bar ── */}
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

      {/* ── Bottom dots ── */}
      <div className="flex justify-center gap-1.5 pb-8">
        {QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className={`rounded-full transition-all duration-200 ${
              i < current ? 'w-2 h-2 bg-indigo-400'
              : i === current ? 'w-4 h-2 bg-indigo-600'
              : 'w-2 h-2 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
