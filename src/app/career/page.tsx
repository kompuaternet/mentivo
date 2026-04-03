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

const UNIVERSITIES = ['Harvard', 'Stanford', 'Cambridge', 'Yale', 'Berkeley', 'Oxford']
const MEDIA = ['Forbes', 'Psychology Today', 'The Guardian', 'BBC', 'Reuters']

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
      <div className="bg-indigo-600 text-white text-center h-10 px-4 text-sm font-medium flex items-center justify-center overflow-hidden">
        <span className="opacity-90 tracking-wide">{t('career_trust_bar', locale)}</span>
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
      <section className="flex flex-col items-center px-6 pt-24 pb-20 text-center max-w-3xl mx-auto w-full">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[2.1rem] sm:text-5xl md:text-[3.25rem] font-extrabold text-[#111827] leading-[1.13] mb-5 max-w-[640px]"
        >
          {t('hero_title', locale)}
          <br />
          <span className="gradient-text">{t('hero_title2', locale)}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-lg text-gray-500 font-normal max-w-[580px] leading-relaxed mb-9"
        >
          {t('hero_subtitle', locale).split('\n').join(' ')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="flex flex-col items-center w-full"
        >
          <button
            onClick={handleStart}
            className="btn-primary w-full sm:w-auto text-lg px-10 py-4 rounded-xl"
          >
            {t('hero_cta', locale)}
          </button>
          <p className="mt-4 text-sm text-gray-400">{t('hero_timer_line', locale)}</p>
          <p className="mt-2 text-xs text-gray-300">{t('hero_micro', locale)}</p>
        </motion.div>
      </section>

      {/* ── University trust logos ── */}
      <section className="py-8 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Based on research from leading universities
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {UNIVERSITIES.map(uni => (
              <div key={uni} className="uni-logo">
                {uni}
              </div>
            ))}
          </div>
        </div>
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
