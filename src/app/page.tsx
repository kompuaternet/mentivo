'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ArrowRight, Clock, Star, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { LOCALES, detectLocale, t } from '@/lib/i18n'
import type { Locale } from '@/types'

const TESTS = [
  {
    id: 'career',
    href: '/career',
    emoji: '🧭',
    titleKey: 'hub_test_career_title' as const,
    subtitleKey: 'hub_test_career_subtitle' as const,
    descKey: 'hub_test_career_desc' as const,
    featureKeys: ['hub_test_career_f1', 'hub_test_career_f2', 'hub_test_career_f3', 'hub_test_career_f4'] as const,
    badgeKey: 'hub_popular' as const,
    time: '8–10',
    questions: 30,
    color: 'from-purple-600/20 to-pink-600/10',
    border: 'border-purple-500/20',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    available: true,
  },
  {
    id: 'iq',
    href: '#',
    emoji: '🧠',
    titleKey: 'hub_test_iq_title' as const,
    subtitleKey: 'hub_test_iq_subtitle' as const,
    descKey: 'hub_test_iq_desc' as const,
    featureKeys: ['hub_test_iq_f1', 'hub_test_iq_f2', 'hub_test_iq_f3', 'hub_test_iq_f4'] as const,
    badgeKey: 'hub_soon' as const,
    time: '15–20',
    questions: 40,
    color: 'from-blue-600/20 to-cyan-600/10',
    border: 'border-blue-500/20',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    available: false,
  },
  {
    id: 'mbti',
    href: '#',
    emoji: '🎭',
    titleKey: 'hub_test_mbti_title' as const,
    subtitleKey: 'hub_test_mbti_subtitle' as const,
    descKey: 'hub_test_mbti_desc' as const,
    featureKeys: ['hub_test_mbti_f1', 'hub_test_mbti_f2', 'hub_test_mbti_f3', 'hub_test_mbti_f4'] as const,
    badgeKey: 'hub_soon' as const,
    time: '10–12',
    questions: 60,
    color: 'from-green-600/20 to-emerald-600/10',
    border: 'border-green-500/20',
    badgeColor: 'text-green-400 border-green-500/30 bg-green-500/10',
    available: false,
  },
]

export default function HubPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('en')
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('career_locale') as Locale | null
    setLocale(saved ?? detectLocale())
  }, [])

  const selectedLang = LOCALES.find(l => l.code === locale) ?? LOCALES[1]

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

        {/* Language picker */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(v => !v)}
            className="glass glass-hover rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/80"
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
                className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden z-50 min-w-[160px] shadow-2xl"
              >
                {LOCALES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); localStorage.setItem('career_locale', l.code); setLangOpen(false) }}
                    className={`w-full px-4 py-2.5 flex items-center gap-2.5 text-sm hover:bg-white/10 transition-colors ${locale === l.code ? 'text-purple-400' : 'text-white/80'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
          <span>{t('hub_badge', locale)}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
        >
          {t('hub_title_a', locale)}{' '}
          <span className="gradient-text">{t('hub_title_b', locale)}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/55 text-lg max-w-xl mx-auto"
        >
          {t('hub_subtitle', locale)}
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
                {t(test.badgeKey, locale)}
              </div>

              {/* Title */}
              <div className="text-4xl mb-3">{test.emoji}</div>
              <h2 className="text-xl font-black text-white mb-1">{t(test.titleKey, locale)}</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{t(test.subtitleKey, locale)}</p>
              <p className="text-sm text-white/60 leading-relaxed mb-5">{t(test.descKey, locale)}</p>

              {/* Features */}
              <div className="space-y-1.5 mb-6 flex-1">
                {test.featureKeys.map((fk, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-white/55">
                    <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    {t(fk, locale)}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-white/35">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {test.time} min
                  </div>
                  <div>{test.questions} {t('hub_questions', locale)}</div>
                </div>
                {test.available && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-purple-400">
                    {t('hub_start', locale)} <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-6 text-center text-white/25 text-xs mt-auto">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="font-semibold text-white/35">Mentivo</span>
        </div>
        <p className="mb-3">{t('hub_badge', locale)} · mentivo.net</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/pricing" className="hover:text-white/50 transition-colors">Pricing</Link>
          <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
          <Link href="/refund" className="hover:text-white/50 transition-colors">Refund Policy</Link>
        </div>
      </footer>

    </main>
  )
}
