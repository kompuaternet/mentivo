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
  pulse: string
}> = {
  analytical: { titleKey: 'insight_t_analytical_title', descKey: 'insight_t_analytical_desc', icon: Brain,     gradient: 'from-indigo-50 to-blue-100',   ring: '#C7D2FE', iconColor: 'text-indigo-600',  pulse: 'rgba(99,102,241,0.15)' },
  creative:   { titleKey: 'insight_t_creative_title',   descKey: 'insight_t_creative_desc',   icon: Lightbulb, gradient: 'from-purple-50 to-pink-100',   ring: '#DDD6FE', iconColor: 'text-purple-600',  pulse: 'rgba(139,92,246,0.15)' },
  social:     { titleKey: 'insight_t_social_title',     descKey: 'insight_t_social_desc',     icon: Users,     gradient: 'from-green-50 to-teal-100',    ring: '#A7F3D0', iconColor: 'text-green-600',   pulse: 'rgba(16,185,129,0.15)' },
  strategic:  { titleKey: 'insight_t_strategic_title',  descKey: 'insight_t_strategic_desc',  icon: Target,    gradient: 'from-orange-50 to-yellow-100', ring: '#FDE68A', iconColor: 'text-orange-600',  pulse: 'rgba(245,158,11,0.15)' },
  practical:  { titleKey: 'insight_t_practical_title',  descKey: 'insight_t_practical_desc',  icon: Wrench,    gradient: 'from-sky-50 to-cyan-100',      ring: '#BAE6FD', iconColor: 'text-sky-600',     pulse: 'rgba(14,165,233,0.15)' },
}

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

const INSIGHT_AT = [6, 13, 20]

// ─── Illustration ─────────────────────────────────────────────────────────────

function InsightIllustration({ type }: { type: InsightType }) {
  const cfg = INSIGHT_CONFIG[type]
  const Icon = cfg.icon
  return (
    <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-60`}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-6 rounded-full"
        style={{ background: cfg.ring + '80' }}
      />
      {/* Pulsing inner circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.06, 1], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="relative z-10 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center"
        style={{ boxShadow: `0 0 0 4px ${cfg.ring}, 0 0 24px ${cfg.pulse}` }}
      >
        <Icon className={`w-9 h-9 ${cfg.iconColor}`} />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-sm"
          style={{ border: `2px solid ${cfg.ring}` }} />
      </motion.div>
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
  const [resonance, setResonance] = useState<'yes' | 'partly' | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-[#F4F6FF]"
    >
      {/* Progress */}
      <div className="text-xs text-gray-400 font-semibold mb-8 uppercase tracking-widest">
        {questionNum} / {TOTAL_QUESTIONS}
      </div>

      <InsightIllustration type={data.type} />

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-400 mb-3 font-medium text-center"
      >
        {t('insight_subheading', locale)}
      </motion.p>

      {/* "Analysis in progress" badge — replaces percentile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 bg-gray-100 text-gray-500"
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"
        />
        {t('insight_analyzing', locale)}
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-gray-500 text-center leading-relaxed max-w-sm mb-3"
      >
        {t(cfg.descKey, locale).split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
        ))}
      </motion.div>

      {/* Wow trigger */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="text-xs text-indigo-500 font-medium mb-8"
      >
        {t('insight_wow', locale)}
      </motion.p>

      {/* Resonance check */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col items-center gap-3 mb-8"
      >
        <p className="text-sm text-gray-400">{t('insight_confirm_q', locale)}</p>
        <div className="flex gap-3">
          {(['yes', 'partly'] as const).map(val => (
            <button
              key={val}
              onClick={() => setResonance(val)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                resonance === val
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {t(val === 'yes' ? 'insight_confirm_yes' : 'insight_confirm_partly', locale)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
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
  const [microFlash, setMicroFlash] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('career_locale') as Locale | null
    setLocale(saved ?? detectLocale())
  }, [])

  const question = QUESTIONS[current]
  const progress = Math.round(((current) / TOTAL_QUESTIONS) * 100)
  const totalBlocks = Array.from(new Set(QUESTIONS.map(q => q.block))).length
  const minsLeft = Math.max(1, Math.ceil((TOTAL_QUESTIONS - current) * 8 / TOTAL_QUESTIONS))

  const handleSelect = useCallback(async (optionId: string) => {
    if (selected !== null) return
    setSelected(optionId)

    const newAnswers = { ...answers, [question.id]: optionId }
    setAnswers(newAnswers)

    // Micro-gamification: flash after Q5
    if (current === 4) {
      setMicroFlash(true)
      setTimeout(() => setMicroFlash(false), 1000)
    }

    await new Promise(r => setTimeout(r, 260))

    if (INSIGHT_AT.includes(current) && current < TOTAL_QUESTIONS - 1) {
      setSelected(null)
      setInsight(getInsight(newAnswers))
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
        const session = { id: sessionId, locale, answers: newAnswers, profile, isPaid: false, createdAt: new Date().toISOString() }
        await fetch('/api/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(session) })
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
  }, [answers, current, locale, question.id, router, selected])

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

      {/* ── Micro-flash toast ── */}
      <AnimatePresence>
        {microFlash && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg pointer-events-none"
          >
            {t('test_analysis_forming', locale)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 mt-1">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('test_back', locale)}
          </button>

          <div className="text-center">
            <div className="text-sm font-bold text-gray-800 leading-none">
              {current + 1} <span className="font-normal text-gray-400">/ {TOTAL_QUESTIONS}</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              ~{minsLeft} {t('test_mins_left', locale)}
            </div>
          </div>

          <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {t('test_block', locale)} {question.block}/{totalBlocks}
          </div>
        </div>
      </div>

      {/* ── Question ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-[620px]">
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                {getLT(question.text, locale)}
              </h2>

              {/* Micro-hint */}
              <p className="text-xs text-gray-400 mb-7 font-medium">
                {t('test_micro_hint', locale)}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.id)}
                    disabled={selected !== null}
                    className={`option-card text-left w-full group transition-all ${selected === opt.id ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        selected === opt.id
                          ? 'bg-white/25 text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                      }`}>
                        {selected === opt.id
                          ? <CheckCircle2 className="w-4 h-4" />
                          : i + 1
                        }
                      </div>
                      <span className={`text-sm md:text-base leading-relaxed transition-colors ${
                        selected === opt.id ? 'text-white font-medium' : 'text-gray-700'
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
          <motion.div
            key={q.id}
            animate={{
              width: i === current ? 16 : 8,
              backgroundColor: i < current ? '#818CF8' : i === current ? '#6366f1' : '#E5E7EB',
            }}
            transition={{ duration: 0.25 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
