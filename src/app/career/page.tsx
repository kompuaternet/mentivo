'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Brain, Star, ChevronDown,
  Trophy, Users, Crown, Zap, Shield, GraduationCap, Map,
  BarChart3, CheckCircle, Lock
} from 'lucide-react'
import { LOCALES, detectLocale, t } from '@/lib/i18n'
import type { Locale } from '@/types'
import Link from 'next/link'

const UNIVERSITIES = [
  'Harvard', 'Stanford', 'MIT', 'Cambridge', 'Oxford',
  'Yale', 'Princeton', 'Johns Hopkins', 'Berkeley',
]
const MEDIA = ['Forbes', 'Psychology Today', 'The Guardian', 'BBC', 'Reuters']

// ── RIASEC Hexagon ────────────────────────────────────────────────────────────

const RIASEC_SEGMENTS = [
  { id: 'R', fill: 'rgba(99,102,241,0.82)' },
  { id: 'I', fill: 'rgba(79,70,229,0.88)' },
  { id: 'A', fill: 'rgba(139,92,246,0.82)' },
  { id: 'S', fill: 'rgba(167,139,250,0.78)' },
  { id: 'E', fill: 'rgba(109,40,217,0.80)' },
  { id: 'C', fill: 'rgba(96,165,250,0.78)' },
]

function RiasecHexagon() {
  const cx = 130, cy = 130, r = 108, gap = 3
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 90) * Math.PI / 180
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  // Shrink each triangle slightly inward for a gap between segments
  const segPath = (i: number) => {
    const a = pts[i], b = pts[(i + 1) % 6]
    const shrink = (p: { x: number; y: number }) => ({
      x: cx + (p.x - cx) * (1 - gap / r),
      y: cy + (p.y - cy) * (1 - gap / r),
    })
    const sa = shrink(a), sb = shrink(b)
    const ic = { x: cx + (sa.x - cx) * 0.12, y: cy + (sa.y - cy) * 0.12 }
    return `M ${ic.x} ${ic.y} L ${sa.x} ${sa.y} L ${sb.x} ${sb.y} Z`
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
      className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] drop-shadow-sm"
    >
      <svg viewBox="0 0 260 260" width="100%" height="100%">
        {/* Outer hex ring */}
        <polygon
          points={pts.map(p => `${p.x * 260/260},${p.y * 260/260}`).join(' ')}
          fill="none"
          stroke="rgba(99,102,241,0.18)"
          strokeWidth="1"
        />
        {/* Mid ring */}
        <polygon
          points={pts.map(p => {
            const sc = 0.6
            return `${cx + (p.x - cx) * sc},${cy + (p.y - cy) * sc}`
          }).join(' ')}
          fill="none"
          stroke="rgba(99,102,241,0.12)"
          strokeWidth="1"
        />
        {/* Inner ring */}
        <polygon
          points={pts.map(p => {
            const sc = 0.3
            return `${cx + (p.x - cx) * sc},${cy + (p.y - cy) * sc}`
          }).join(' ')}
          fill="none"
          stroke="rgba(99,102,241,0.1)"
          strokeWidth="1"
        />
        {/* Spokes */}
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
        ))}
        {/* Colored segments */}
        {RIASEC_SEGMENTS.map((seg, i) => (
          <path key={seg.id} d={segPath(i)} fill={seg.fill} />
        ))}
        {/* Center circle */}
        <circle cx={cx} cy={cy} r={14} fill="white"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(99,102,241,0.2))' }} />
        {/* Vertex dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill="white"
            stroke={RIASEC_SEGMENTS[i].fill} strokeWidth="2" />
        ))}
        {/* Letter labels just inside each vertex */}
        {pts.map((p, i) => {
          const sc = 0.78
          const lx = cx + (p.x - cx) * sc
          const ly = cy + (p.y - cy) * sc
          return (
            <text key={i} x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="10" fontWeight="700" fill="white" opacity="0.9"
              letterSpacing="0.5">
              {RIASEC_SEGMENTS[i].id}
            </text>
          )
        })}
      </svg>
    </motion.div>
  )
}

// ── Profile Preview Card ───────────────────────────────────────────────────────

const PREVIEW_BARS = [
  { key: 'Analytical',  pct: 85, color: '#6366F1' },
  { key: 'Strategic',   pct: 72, color: '#7C3AED' },
  { key: 'Creative',    pct: 60, color: '#8B5CF6' },
  { key: 'Social',      pct: 45, color: '#A78BFA' },
  { key: 'Practical',   pct: 38, color: '#818CF8' },
]

function ProfilePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden max-w-lg mx-auto w-full"
    >
      {/* Card header */}
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900 truncate">Professional Profile</div>
          <div className="text-xs text-gray-400">Type: Analytical Researcher</div>
        </div>
        <div className="flex-shrink-0 text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full border border-green-100">
          ✓ Ready
        </div>
      </div>

      {/* Bar chart */}
      <div className="px-5 py-5 space-y-3">
        {PREVIEW_BARS.map((bar, i) => (
          <div key={bar.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-gray-600">{bar.key}</span>
              <span className="text-xs font-bold text-gray-500">{bar.pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: bar.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Locked hint */}
      <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="blur-[3px] select-none pointer-events-none">
          <div className="text-xs text-gray-500 font-medium mb-2">Top career matches</div>
          <div className="flex gap-2 flex-wrap">
            {['Data Analyst', 'Research Scientist', 'Strategist'].map(p => (
              <span key={p} className="text-xs bg-white border border-gray-200 px-2.5 py-1 rounded-full text-gray-600">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-white/90 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <Lock className="w-3 h-3" />
            Unlock full results
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('en')
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('career_locale') as Locale | null
    setLocale(saved ?? detectLocale())
  }, [])

  const selectedLang = LOCALES.find(l => l.code === locale) ?? LOCALES[1]

  const handleStart = () => {
    localStorage.setItem('career_locale', locale)
    router.push('/career/test')
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F4F6FF]">

      {/* ── Trust banner — static ── */}
      <div className="bg-indigo-600 text-white text-center h-10 px-4 text-sm font-normal flex items-center justify-center overflow-hidden">
        <span className="opacity-80 tracking-wide">{t('career_trust_bar', locale)}</span>
      </div>

      {/* ── Nav ── */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Mentivo</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 bg-white transition-colors"
              >
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl overflow-hidden z-50 min-w-[160px] shadow-xl"
                  >
                    {LOCALES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLocale(l.code)
                          setLangOpen(false)
                          localStorage.setItem('career_locale', l.code)
                        }}
                        className={`w-full px-4 py-2.5 flex items-center gap-2.5 text-sm hover:bg-gray-50 transition-colors ${locale === l.code ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleStart}
              className="btn-primary text-sm px-5 py-2 flex items-center gap-1.5 rounded-lg"
            >
              {t('career_start_now', locale)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-16 sm:pt-20 pb-16 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-1"
          >
            <h1 className="mb-5">
              <span className="block text-[2.1rem] sm:text-[2.8rem] md:text-[3rem] font-bold text-[#111827] leading-[1.13]">
                {t('hero_title', locale)}
              </span>
              <span className="block text-[1.45rem] sm:text-[1.9rem] md:text-[2.1rem] font-semibold gradient-text leading-[1.2] mt-1">
                {t('hero_title2', locale)}
              </span>
            </h1>

            <p className="text-[1.05rem] text-[#6b7280] font-normal max-w-[480px] leading-[1.6] mb-9">
              {t('hero_subtitle', locale)}
            </p>

            <div className="flex flex-col items-center lg:items-start w-full">
              <button
                onClick={handleStart}
                className="btn-primary w-full sm:w-auto text-lg px-10 py-[15px] rounded-2xl hover:scale-[1.02] transition-transform duration-150"
              >
                {t('hero_cta', locale)}
              </button>
              <p className="mt-4 text-sm text-[#9ca3af]">{t('hero_timer_line', locale)}</p>
              <p className="mt-1.5 text-xs text-[#9ca3af]">{t('hero_no_signup', locale)}</p>
            </div>
          </motion.div>

          {/* Right: RIASEC Hexagon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center order-2"
          >
            <div className="relative">
              {/* Glow behind hexagon */}
              <div className="absolute inset-0 rounded-full bg-indigo-100/60 blur-3xl scale-75 -z-10" />
              <RiasecHexagon />
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center max-w-[220px]">
              {t('riasec_caption', locale)}
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── Methodology strip ── */}
      <section className="py-8 px-6 bg-white border-y border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
          <GraduationCap className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <p className="text-sm text-gray-500 leading-relaxed text-center">
            {t('research_credit', locale)}
          </p>
        </div>
      </section>

      {/* ── Result Preview ── */}
      <section className="py-14 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          >
            {t('preview_title', locale)}
          </motion.h2>
          <p className="text-sm text-gray-400">{t('preview_sub', locale)}</p>
        </div>
        <ProfilePreview />
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12"
        >
          {t('how_title', locale)}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: t('how_1_title', locale), desc: t('how_1_desc', locale), color: 'bg-indigo-50 text-indigo-600' },
            { icon: Brain, title: t('how_2_title', locale), desc: t('how_2_desc', locale), color: 'bg-purple-50 text-purple-600' },
            { icon: Map, title: t('how_3_title', locale), desc: t('how_3_desc', locale), color: 'bg-blue-50 text-blue-600' },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('career_step', locale)} {i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-10 px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-indigo-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{t('career_what_title', locale)}</h2>
          <p className="text-gray-500 mb-8">{t('career_what_sub', locale)}</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { Icon: Trophy, titleKey: 'career_f1_title' as const, descKey: 'career_f1_desc' as const, color: 'text-yellow-500 bg-yellow-50' },
              { Icon: Brain, titleKey: 'career_f2_title' as const, descKey: 'career_f2_desc' as const, color: 'text-blue-500 bg-blue-50' },
              { Icon: Users, titleKey: 'career_f3_title' as const, descKey: 'career_f3_desc' as const, color: 'text-green-500 bg-green-50' },
              { Icon: Crown, titleKey: 'career_f4_title' as const, descKey: 'career_f4_desc' as const, color: 'text-purple-500 bg-purple-50' },
              { Icon: Zap, titleKey: 'career_f5_title' as const, descKey: 'career_f5_desc' as const, color: 'text-orange-500 bg-orange-50' },
              { Icon: Shield, titleKey: 'career_f6_title' as const, descKey: 'career_f6_desc' as const, color: 'text-indigo-500 bg-indigo-50' },
              { Icon: GraduationCap, titleKey: 'career_f7_title' as const, descKey: 'career_f7_desc' as const, color: 'text-pink-500 bg-pink-50' },
              { Icon: Map, titleKey: 'career_f8_title' as const, descKey: 'career_f8_desc' as const, color: 'text-teal-500 bg-teal-50' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t(item.titleKey, locale)}</div>
                  <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{t(item.descKey, locale)}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{t('career_free_note', locale)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>{t('career_paid_note', locale)}</span>
              </div>
            </div>
            <button onClick={handleStart} className="btn-primary flex items-center gap-2 rounded-xl">
              {t('career_start_now', locale)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-black text-gray-900 text-center mb-8"
        >
          What people say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { textKey: 'testimonial_1_text' as const, nameKey: 'testimonial_1_name' as const, initials: 'AM', color: 'bg-indigo-100 text-indigo-700' },
            { textKey: 'testimonial_2_text' as const, nameKey: 'testimonial_2_name' as const, initials: 'JK', color: 'bg-purple-100 text-purple-700' },
            { textKey: 'testimonial_3_text' as const, nameKey: 'testimonial_3_name' as const, initials: 'EV', color: 'bg-blue-100 text-blue-700' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t(item.textKey, locale)}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${item.color}`}>
                  {item.initials}
                </div>
                <span className="text-gray-500 text-sm font-medium">{t(item.nameKey, locale)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Media mentions ── */}
      <section className="py-8 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            As featured in
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {MEDIA.map(m => (
              <span key={m} className="text-sm font-bold text-gray-400 tracking-wide">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {t('career_cta_title', locale)}
          </h2>
          <p className="text-gray-500 mb-8">{t('career_cta_sub', locale)}</p>
          <button onClick={handleStart} className="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto rounded-xl">
            {t('career_start_now', locale)}
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {['Free test', 'No registration', 'Results in 8 min'].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-gray-400 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-700">Mentivo</span>
            <span className="text-gray-300 text-sm mx-2">·</span>
            <span className="text-gray-400 text-sm">{t('footer_tagline', locale)}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="/refund" className="hover:text-gray-600 transition-colors">Refund</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
