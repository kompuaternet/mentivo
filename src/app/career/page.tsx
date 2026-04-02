'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Brain, Zap, Star, Users, Globe, ChevronDown } from 'lucide-react'
import { LOCALES, detectLocale, t } from '@/lib/i18n'
import type { Locale } from '@/types'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('ru')
  const [langOpen, setLangOpen] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLocale(detectLocale())
    // Animate counter
    const target = 24817
    const step = Math.ceil(target / 80)
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const selectedLang = LOCALES.find(l => l.code === locale)!

  const handleStart = () => {
    localStorage.setItem('career_locale', locale)
    router.push('/career/test')
  }

  return (
    <main className="min-h-screen flex flex-col">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Mentivo</span>
        </motion.div>

        {/* Language picker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
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
                    onClick={() => { setLocale(l.code); setLangOpen(false) }}
                    className={`w-full px-4 py-2.5 flex items-center gap-2.5 text-sm hover:bg-white/10 transition-colors ${locale === l.code ? 'text-purple-400' : 'text-white/80'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-purple-300 mb-8 border border-purple-500/20"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{t('career_badge', locale)}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
        >
          <span className="text-white">{t('hero_title', locale).split(' ').slice(0, 2).join(' ')} </span>
          <span className="gradient-text">{t('hero_title', locale).split(' ').slice(2).join(' ')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-12"
        >
          {t('hero_subtitle', locale)}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleStart}
            className="btn-primary animate-pulse-glow flex items-center gap-3 text-lg px-8 py-4"
          >
            {t('hero_cta', locale)}
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="flex -space-x-2">
              {['🧑‍💻', '👩‍🎨', '👨‍🔬', '👩‍💼'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-sm border-2 border-[#0a0812]">
                  {e}
                </div>
              ))}
            </div>
            <span>{count.toLocaleString()} {t('hero_stats_tests', locale)}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-6 mt-16 w-full max-w-lg"
        >
          {[
            { value: '30', label: 'вопросов', sub: t('hero_stats_tests', locale) },
            { value: '25+', label: 'профессий', sub: t('hero_stats_professions', locale) },
            { value: '8–10', label: 'минут', sub: t('hero_stats_min', locale) },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white text-center mb-14"
        >
          {t('how_title', locale)}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📝', title: t('how_1_title', locale), desc: t('how_1_desc', locale), color: 'from-purple-600/20 to-purple-800/10' },
            { icon: '🧠', title: t('how_2_title', locale), desc: t('how_2_desc', locale), color: 'from-pink-600/20 to-pink-800/10' },
            { icon: '🚀', title: t('how_3_title', locale), desc: t('how_3_desc', locale), color: 'from-blue-600/20 to-blue-800/10' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 bg-gradient-to-br ${step.color} relative overflow-hidden`}
            >
              <div className="absolute -top-4 -right-4 text-6xl opacity-10">{step.icon}</div>
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">{t('career_step', locale)} {i + 1}</div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500" />

          <h2 className="text-3xl font-black text-white mb-3">{t('career_what_title', locale)}</h2>
          <p className="text-white/50 mb-8">{t('career_what_sub', locale)}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: '🏆', titleKey: 'career_f1_title' as const, descKey: 'career_f1_desc' as const },
              { emoji: '🧠', titleKey: 'career_f2_title' as const, descKey: 'career_f2_desc' as const },
              { emoji: '🎭', titleKey: 'career_f3_title' as const, descKey: 'career_f3_desc' as const },
              { emoji: '👑', titleKey: 'career_f4_title' as const, descKey: 'career_f4_desc' as const },
              { emoji: '⚡', titleKey: 'career_f5_title' as const, descKey: 'career_f5_desc' as const },
              { emoji: '💪', titleKey: 'career_f6_title' as const, descKey: 'career_f6_desc' as const },
              { emoji: '🎓', titleKey: 'career_f7_title' as const, descKey: 'career_f7_desc' as const },
              { emoji: '🗺️', titleKey: 'career_f8_title' as const, descKey: 'career_f8_desc' as const },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{t(item.titleKey, locale)}</div>
                  <div className="text-white/45 text-xs mt-0.5">{t(item.descKey, locale)}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/50 text-sm">
              {t('career_free_note', locale)}<br />
              {t('career_paid_note', locale)}
            </div>
            <button onClick={handleStart} className="btn-primary flex items-center gap-2">
              {t('career_start_now', locale)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { textKey: 'testimonial_1_text' as const, nameKey: 'testimonial_1_name' as const, emoji: '🧑‍💻' },
            { textKey: 'testimonial_2_text' as const, nameKey: 'testimonial_2_name' as const, emoji: '👩‍🎨' },
            { textKey: 'testimonial_3_text' as const, nameKey: 'testimonial_3_name' as const, emoji: '👨‍🎓' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">"{t(item.textKey, locale)}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-sm">
                  {item.emoji}
                </div>
                <span className="text-white/50 text-xs">{t(item.nameKey, locale)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {t('career_cta_title', locale)}
          </h2>
          <p className="text-white/50 mb-8">{t('career_cta_sub', locale)}</p>
          <button onClick={handleStart} className="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto">
            {t('career_start_now', locale)}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-white/50">Mentivo</span>
        </div>
        <p className="mb-3">{t('footer_tagline', locale)}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap text-xs">
          <Link href="/pricing" className="hover:text-white/50 transition-colors">Pricing</Link>
          <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
          <Link href="/refund" className="hover:text-white/50 transition-colors">Refund Policy</Link>
        </div>
      </footer>

    </main>
  )
}
