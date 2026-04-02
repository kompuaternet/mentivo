'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, ArrowRight, CheckCircle, Lock, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  { emoji: '🏆', text: 'Top-7 career matches with match percentage' },
  { emoji: '🧠', text: 'Thinking style profile (Analyst, Creator, Strategist, Empath)' },
  { emoji: '🎭', text: 'Character type (Introvert, Extrovert, Ambivert)' },
  { emoji: '👑', text: 'Leadership level — from Executor to Visionary' },
  { emoji: '⚡', text: 'Career archetype (Explorer, Builder, Creator…)' },
  { emoji: '💪', text: 'Personal strengths and growth areas' },
  { emoji: '🎓', text: 'Education direction, specialties and platforms' },
  { emoji: '🗺️', text: 'Concrete first step to start right now' },
  { emoji: '♾️', text: 'Lifetime access to your results' },
]

export default function PricingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Mentivo</span>
        </Link>
        <Link href="/career" className="text-white/50 hover:text-white/80 text-sm transition-colors">
          Take the test
        </Link>
      </nav>

      {/* Hero */}
      <section className="py-12 px-6 text-center max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium text-purple-300 mb-6 border border-purple-500/20"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>One-time payment · Lifetime access</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
        >
          Career Profile Test
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/55 text-lg max-w-xl mx-auto"
        >
          Discover your top career matches, thinking style, character type, leadership level and personalised education roadmap.
        </motion.p>
      </section>

      {/* Pricing card */}
      <section className="px-6 pb-16 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-purple-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500" />

          {/* Free tier */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Free</div>
                <div className="text-2xl font-black text-white">$0</div>
              </div>
              <div className="text-3xl">🔓</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>30-question personality test</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60 mt-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>Career match #4 from your top list (preview)</span>
            </div>
          </div>

          {/* Paid tier */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-purple-400 uppercase tracking-widest mb-1">Full Profile</div>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-black text-white">$1.99</div>
                  <div className="text-white/40 text-sm mb-1">one-time</div>
                </div>
              </div>
              <div className="text-3xl">🏆</div>
            </div>

            <div className="space-y-2.5 mb-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="flex-shrink-0">{f.emoji}</span>
                  <span>{f.text}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => router.push('/career')}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4"
            >
              Start the test — free
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-white/30 text-center mt-3">
              Free to start · Unlock after completing the test
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6 mt-8 text-xs text-white/30"
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure payment via Paddle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>SSL encrypted</span>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-16 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What do I get after payment?',
              a: 'Immediate access to your full career profile: top-7 professions with match percentages, your thinking style, character type, leadership level, career archetype, strengths, growth areas, and a personalised education roadmap.',
            },
            {
              q: 'Is the test really based on science?',
              a: 'Yes. The test is built on the Holland RIASEC model — one of the most widely used and validated frameworks in career counselling and vocational psychology.',
            },
            {
              q: 'Can I get a refund?',
              a: 'Yes. We offer a full refund within 14 days of purchase if you are not satisfied. See our Refund Policy for details.',
            },
            {
              q: 'How long do I have access?',
              a: 'Forever. Your results are saved and accessible anytime via your unique results link.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="font-semibold text-white text-sm mb-2">{item.q}</div>
              <div className="text-white/55 text-sm leading-relaxed">{item.a}</div>
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
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-white/50 transition-colors">Refund Policy</Link>
        </div>
      </footer>

    </main>
  )
}
