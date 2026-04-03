'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ArrowRight, Clock, Star, ChevronDown, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { LOCALES, detectLocale, t } from '@/lib/i18n'
import type { Locale } from '@/types'

const TESTS = [
  {
    id: 'career',
    href: '/career',
    titleKey: 'hub_test_career_title' as const,
    subtitleKey: 'hub_test_career_subtitle' as const,
    descKey: 'hub_test_career_desc' as const,
    featureKeys: ['hub_test_career_f1', 'hub_test_career_f2', 'hub_test_career_f3', 'hub_test_career_f4'] as const,
    badgeKey: 'hub_popular' as const,
    time: '8–10',
    questions: 30,
    color: 'border-indigo-200 bg-white hover:border-indigo-300 hover:shadow-indigo-100',
    accent: 'bg-indigo-600',
    badgeColor: 'text-indigo-700 border-indigo-200 bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-700',
    available: true,
  },
  {
    id: 'iq',
    href: '#',
    titleKey: 'hub_test_iq_title' as const,
    subtitleKey: 'hub_test_iq_subtitle' as const,
    descKey: 'hub_test_iq_desc' as const,
    featureKeys: ['hub_test_iq_f1', 'hub_test_iq_f2', 'hub_test_iq_f3', 'hub_test_iq_f4'] as const,
    badgeKey: 'hub_soon' as const,
    time: '15–20',
    questions: 40,
    color: 'border-gray-200 bg-white opacity-70',
    accent: 'bg-blue-500',
    badgeColor: 'text-gray-500 border-gray-200 bg-gray-50',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    available: false,
  },
  {
    id: 'mbti',
    href: '#',
    titleKey: 'hub_test_mbti_title' as const,
    subtitleKey: 'hub_test_mbti_subtitle' as const,
    descKey: 'hub_test_mbti_desc' as const,
    featureKeys: ['hub_test_mbti_f1', 'hub_test_mbti_f2', 'hub_test_mbti_f3', 'hub_test_mbti_f4'] as const,
    badgeKey: 'hub_soon' as const,
    time: '10–12',
    questions: 60,
    color: 'border-gray-200 bg-white opacity-70',
    accent: 'bg-green-500',
    badgeColor: 'text-gray-500 border-gray-200 bg-gray-50',
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
    available: false,
  },
]

const TEST_ICONS = ['🧭', '🧠', '🎭']

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
    <main className="min-h-screen flex flex-col bg-[#F4F6FF]">

      {/* Nav */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Mentivo</span>
          </div>

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
                        localStorage.setItem('career_locale', l.code)
                        setLangOpen(false)
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
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 px-6 text-center max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 mb-6"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{t('hub_badge', locale)}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight"
        >
          {t('hub_title_a', locale)}{' '}
          <span className="gradient-text">{t('hub_title_b', locale)}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-xl mx-auto"
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => test.available && router.push(test.href)}
              className={`rounded-3xl p-6 border shadow-sm transition-all flex flex-col ${test.color} ${test.available ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''}`}
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border self-start mb-4 ${test.badgeColor}`}>
                {t(test.badgeKey, locale)}
              </div>

              {/* Icon + Title */}
              <div className={`w-12 h-12 rounded-xl ${test.iconBg} flex items-center justify-center text-2xl mb-3`}>
                {TEST_ICONS[i]}
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1">{t(test.titleKey, locale)}</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{t(test.subtitleKey, locale)}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{t(test.descKey, locale)}</p>

              {/* Features */}
              <div className="space-y-1.5 mb-6 flex-1">
                {test.featureKeys.map((fk, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    {t(fk, locale)}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {test.time} min
                  </div>
                  <div>{test.questions} {t('hub_questions', locale)}</div>
                </div>
                {test.available && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    {t('hub_start', locale)} <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-6 bg-white text-center text-gray-400 text-xs">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Brain className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="font-semibold text-gray-600">Mentivo</span>
        </div>
        <p className="mb-3 text-gray-400">{t('hub_badge', locale)}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/refund" className="hover:text-gray-600 transition-colors">Refund Policy</Link>
        </div>
      </footer>

    </main>
  )
}
