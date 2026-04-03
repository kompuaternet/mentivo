'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Share2, RotateCcw, CheckCircle,
  Trophy, Brain, Users, Crown, Zap, Shield, GraduationCap, Map,
  Clock
} from 'lucide-react'
import { t, getLT } from '@/lib/i18n'
import type { TestSession, Locale, UserProfile } from '@/types'

// ─── helpers ─────────────────────────────────────────────────────────────────

function MatchBar({ percent, animate }: { percent: number; animate: boolean }) {
  return (
    <div className="match-bar flex-1">
      <motion.div
        className="match-fill"
        initial={{ width: 0 }}
        animate={{ width: animate ? `${percent}%` : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

// Faded preview bar — fixed ~80% width with transparent right edge
function PreviewMatchBar({ animate }: { animate: boolean }) {
  return (
    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden flex-1">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: 'linear-gradient(to right, #6366f1 0%, #8b5cf6 60%, rgba(139,92,246,0) 100%)' }}
        initial={{ width: 0 }}
        animate={{ width: animate ? '83%' : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function ProfileCard({ emoji, label, value, description }: {
  emoji: string; label: string; value: string; description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex gap-4 items-start border border-gray-100 shadow-sm">
      <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0 border border-indigo-100">
        {emoji}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="font-bold text-gray-900 text-base mb-1">{value}</div>
        <div className="text-xs text-gray-500 leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

function LeadershipBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5 mt-1">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }}
          className={`h-2 flex-1 rounded-full origin-bottom ${i <= level ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-100'}`}
        />
      ))}
    </div>
  )
}

function useCountdown(startSeconds: number, sessionId: string) {
  const key = `timer_${sessionId}`
  const [remaining, setRemaining] = useState(() => {
    if (typeof window === 'undefined') return startSeconds
    const saved = sessionStorage.getItem(key)
    if (saved) {
      const { end } = JSON.parse(saved)
      const left = Math.floor((end - Date.now()) / 1000)
      return left > 0 ? left : 0
    }
    const end = Date.now() + startSeconds * 1000
    sessionStorage.setItem(key, JSON.stringify({ end }))
    return startSeconds
  })

  useEffect(() => {
    if (remaining <= 0) return
    const interval = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(interval); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  return { display: `${mm}:${ss}`, expired: remaining === 0 }
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function ResultsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [session, setSession] = useState<TestSession | null>(null)
  const [locale, setLocale] = useState<Locale>('en')
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [barsVisible, setBarsVisible] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)
  const [hoveredRank, setHoveredRank] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paddle, setPaddle] = useState<any>(undefined)

  const timer = useCountdown(24 * 60, id)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
    if (!token) return
    import('@paddle/paddle-js').then(({ initializePaddle }) => {
      initializePaddle({
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        token,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then((instance: any) => setPaddle(instance))
    })
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.get('paid') === '1') setPaySuccess(true)

    const loadSession = async () => {
      try {
        const res = await fetch(`/api/session/${id}`)
        if (res.ok) {
          const data = await res.json()
          setSession(data)
          setLocale(data.locale ?? 'en')
        } else throw new Error('not found')
      } catch {
        const raw = localStorage.getItem('career_session')
        if (raw) {
          const data = JSON.parse(raw) as TestSession
          setSession(data)
          setLocale(data.locale ?? 'en')
        } else router.push('/career')
      } finally {
        setLoading(false)
        setTimeout(() => setBarsVisible(true), 600)
      }
    }
    loadSession()
  }, [id, router])

  const handleUnlock = () => {
    if (!session || !paddle) return
    setPaying(true)
    paddle.Checkout.open({
      items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!, quantity: 1 }],
      customData: { session_id: session.id },
      settings: {
        successUrl: `${window.location.origin}/career/results/${session.id}?paid=1`,
      },
    })
    setPaying(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Mentivo — My career profile',
        text: `I just discovered my top career: ${session?.profile?.topProfessions[0]?.profession.name ? getLT(session.profile.topProfessions[0].profession.name, locale) : ''}. Try it!`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FF]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-7 h-7 text-indigo-600 animate-pulse" />
          </div>
          <div className="text-gray-600">Loading your results…</div>
        </div>
      </div>
    )
  }

  if (!session?.profile) return null

  const { profile } = session
  const isPaid = session.isPaid || paySuccess
  const previewProfession = profile.topProfessions[3]

  return (
    <div className="min-h-screen pb-20 bg-[#F4F6FF]">

      {/* ── Nav ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/career')} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Mentivo
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/career/test')} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-xs px-3 py-1.5 bg-gray-100 rounded-lg">
              <RotateCcw className="w-3 h-3" />
              {t('results_retake', locale)}
            </button>
            <button onClick={handleShare} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-xs px-3 py-1.5 bg-gray-100 rounded-lg">
              <Share2 className="w-3 h-3" />
              {t('results_share', locale)}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-8 space-y-6">

        {/* ── Payment success banner ── */}
        <AnimatePresence>
          {paySuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-700 font-medium">{t('payment_success', locale)} Full profile unlocked.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PAYWALL ── */}
        {!isPaid ? (
          <>
            {/* ── 1. Rankings list ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">
                {t('results_rankings_title', locale)}
              </div>
              <div className="space-y-1.5">
                {profile.topProfessions.map((pm, i) => {
                  const isOpen = i === 3
                  const isHovered = hoveredRank === i
                  // all locked uniform: text blur(6px), emoji blur(4px), reduce 25% on hover
                  const blurName  = isHovered ? 'blur(4.5px)' : 'blur(6px)'
                  const blurEmoji = isHovered ? 'blur(3px)'   : 'blur(4px)'
                  const blurPct   = isHovered ? 'blur(3px)'   : 'blur(4px)'
                  return (
                    <div
                      key={pm.profession.id}
                      className={`relative bg-white rounded-xl px-4 py-3 border flex items-center justify-between gap-3 transition-all duration-200 select-none ${
                        isOpen
                          ? 'border-indigo-200 shadow-md'
                          : 'border-gray-100 cursor-pointer'
                      }`}
                      style={!isOpen ? { opacity: isHovered ? 0.6 : 0.45 } : undefined}
                      onMouseEnter={() => !isOpen && setHoveredRank(i)}
                      onMouseLeave={() => setHoveredRank(null)}
                    >
                      {isOpen && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl" />
                      )}
                      {!isOpen && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/40 rounded-xl pointer-events-none" />
                      )}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span
                          className="text-xl flex-shrink-0 transition-all duration-200"
                          style={!isOpen ? { filter: blurEmoji } : undefined}
                        >
                          {pm.profession.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs mb-0.5 font-semibold ${isOpen ? 'text-indigo-500' : 'text-gray-400'}`}>
                            #{i + 1}
                          </div>
                          <div
                            className={`font-bold truncate transition-all duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}
                            style={!isOpen ? { filter: blurName } : undefined}
                          >
                            {getLT(pm.profession.name, locale)}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full font-semibold">
                            {t('results_profession_open_label', locale)}
                          </span>
                        ) : (
                          <span
                            className="text-lg font-black text-gray-400 tabular-nums transition-all duration-200"
                            style={{ filter: blurPct }}
                          >
                            {pm.matchPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* ── Trigger line ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-center text-sm font-bold leading-relaxed -mt-2"
              style={{ color: '#111111' }}
            >
              {t('results_free_subtitle', locale)}
            </motion.p>

            {/* ── 2. Open profession card (#4) ── */}
            {previewProfession && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{previewProfession.profession.emoji}</span>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">{t('results_profession_no', locale)}4</div>
                        <h3 className="text-xl font-bold text-gray-900">{getLT(previewProfession.profession.name, locale)}</h3>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap">
                        {t('results_strong_match', locale)}
                      </span>
                    </div>
                  </div>
                  {/* Micro-trigger under title */}
                  <p className="text-xs text-gray-400 mb-3 ml-12">
                    {t('results_almost_best', locale)}
                  </p>
                  {/* Faded preview bar */}
                  <div className="mb-4">
                    <PreviewMatchBar animate={barsVisible} />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {getLT(previewProfession.profession.description, locale)}
                  </p>
                  {/* Intrigue line — stronger color + hover underline */}
                  <p className="text-xs text-indigo-600 font-semibold hover:underline cursor-default">
                    {t('results_better_matches', locale)}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── 3. Main paywall card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

                {/* Title — no icon, just text */}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {t('results_full_ready_title', locale)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {t('results_full_ready_sub', locale)}
                  </p>
                </div>

                {/* What opens — 2 columns */}
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-left">
                  {[
                    { icon: Trophy,        titleKey: 'career_f1_title' as const, descKey: 'career_f1_desc' as const },
                    { icon: Brain,         titleKey: 'career_f2_title' as const, descKey: 'career_f2_desc' as const },
                    { icon: Users,         titleKey: 'career_f3_title' as const, descKey: 'career_f3_desc' as const },
                    { icon: Crown,         titleKey: 'career_f4_title' as const, descKey: 'career_f4_desc' as const },
                    { icon: Zap,           titleKey: 'career_f5_title' as const, descKey: 'career_f5_desc' as const },
                    { icon: Shield,        titleKey: 'career_f6_title' as const, descKey: 'career_f6_desc' as const },
                    { icon: GraduationCap, titleKey: 'career_f7_title' as const, descKey: 'career_f7_desc' as const },
                    { icon: Map,           titleKey: 'career_f8_title' as const, descKey: 'career_f8_desc' as const },
                  ].map(({ icon: Icon, titleKey, descKey }, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800 leading-tight">{t(titleKey, locale)}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">{t(descKey, locale)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timer — fear of loss */}
                <div className="flex items-center justify-center gap-1.5 mb-5 text-sm text-gray-500">
                  <span className="font-medium">{t('results_saved_24h', locale)}</span>
                  <span className="font-black text-gray-800 tabular-nums">{timer.display}</span>
                </div>

                {/* CTA Button — motion for hover scale */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUnlock}
                  disabled={paying}
                  className="btn-primary w-full text-base py-4 rounded-xl mb-3 shadow-lg"
                >
                  {paying ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      {t('payment_processing', locale)}
                    </span>
                  ) : (
                    t('results_unlock_cta', locale)
                  )}
                </motion.button>

                {/* Micro-text — single clean line */}
                <p className="text-center text-xs text-gray-400 mb-5">
                  {t('results_instant_access', locale)}
                </p>

                {/* Trigger */}
                <div className="bg-indigo-50 rounded-xl px-4 py-3 text-center text-sm text-indigo-700 font-medium mb-4">
                  {t('results_already_tested', locale)}
                </div>

                {/* Social trust */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="flex -space-x-1.5">
                    {['AM', 'JK', 'EV', 'SR'].map(initials => (
                      <div key={initials} className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-indigo-600">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span>{t('results_helped_thousands', locale)}</span>
                </div>
              </div>
            </motion.div>
          </>
        ) : (

          /* ════════════════════════════════════════════════════════
             PAID CONTENT — Full profile
             ════════════════════════════════════════════════════════ */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* ── Archetype ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
              <div className="text-xs text-indigo-600 uppercase tracking-widest mb-3 font-semibold">{t('results_archetype', locale)}</div>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{profile.archetype.emoji}</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{getLT(profile.archetype.name, locale)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{getLT(profile.archetype.description, locale)}</p>
                </div>
              </div>
            </motion.div>

            {/* ── Personality portrait ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">{t('results_your_profile', locale)}</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <ProfileCard
                  emoji={profile.thinkingStyle.emoji}
                  label={t('results_thinking', locale)}
                  value={getLT(profile.thinkingStyle.name, locale)}
                  description={getLT(profile.thinkingStyle.description, locale)}
                />
                <ProfileCard
                  emoji={profile.characterType.emoji}
                  label={t('results_character', locale)}
                  value={getLT(profile.characterType.name, locale)}
                  description={getLT(profile.characterType.description, locale)}
                />
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t('results_leadership', locale)}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{profile.leadershipLevel.emoji}</span>
                    <span className="font-bold text-gray-900">{getLT(profile.leadershipLevel.name, locale)}</span>
                  </div>
                  <LeadershipBar level={profile.leadershipLevel.level} />
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{getLT(profile.leadershipLevel.description, locale)}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t('results_workstyle', locale)}</div>
                  <div className="font-bold text-gray-900 mb-1">
                    {t(`workstyle_${profile.workStyle}` as any, locale)}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{t('results_career_pace', locale)}</div>
                  <div className="font-semibold text-indigo-600 text-sm">
                    {t(`pace_${profile.careerPace}` as any, locale)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Strengths & Growth ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3">{t('results_strengths', locale)}</div>
                <div className="space-y-2">
                  {profile.strengths.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      {getLT(s, locale)}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3">{t('results_growth', locale)}</div>
                <div className="space-y-2">
                  {profile.growthZones.length > 0 ? profile.growthZones.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {getLT(g, locale)}
                    </motion.div>
                  )) : (
                    <div className="text-sm text-gray-400">All balanced</div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── Top 7 professions ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">{t('results_top7', locale)}</div>
              <div className="space-y-3">
                {profile.topProfessions.map((pm, i) => (
                  <motion.div
                    key={pm.profession.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className={`bg-white rounded-2xl p-4 border shadow-sm ${i === 0 ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                        i === 0 ? 'bg-indigo-100'
                        : 'bg-gray-100'
                      }`}>
                        {pm.profession.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {i === 0 && <span className="text-xs text-indigo-600 font-semibold">#1 Best match</span>}
                          {i === 1 && <span className="text-xs text-gray-400 font-semibold">#2</span>}
                          {i >= 2 && <span className="text-xs text-gray-300 font-semibold">#{i + 1}</span>}
                        </div>
                        <div className={`font-bold ${i === 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                          {getLT(pm.profession.name, locale)}
                        </div>
                      </div>
                      <div className={`text-xl font-black flex-shrink-0 ${i === 0 ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {pm.matchPercent}%
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <MatchBar percent={pm.matchPercent} animate={barsVisible} />
                    </div>

                    {i === 0 && (
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        {getLT(pm.profession.description, locale)}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Education ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm"
            >
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">{t('results_education', locale)}</div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">{t('results_direction', locale)}</div>
                  <div className="font-bold text-gray-900 text-lg">{getLT(profile.education.directionName, locale)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1.5">{t('results_specialties', locale)}</div>
                  <div className="text-sm text-indigo-600 leading-relaxed font-medium">{getLT(profile.education.specialties, locale)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1">{t('results_format', locale)}</div>
                  <div className="text-sm text-gray-600">{getLT(profile.education.format, locale)}</div>
                </div>

                {profile.education.platforms.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-400 mb-2">{t('results_platforms', locale)}</div>
                    <div className="flex flex-wrap gap-2">
                      {profile.education.platforms.map(p => (
                        <span key={p} className="text-xs px-3 py-1.5 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100 font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── First step ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
            >
              <div className="text-sm font-bold text-gray-900 mb-2">{t('results_first_step', locale)}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{getLT(profile.education.firstStep, locale)}</p>
            </motion.div>

            {/* ── Share / Retake ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3"
            >
              <button
                onClick={handleShare}
                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-gray-600 font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {t('results_share', locale)}
              </button>
              <button
                onClick={() => router.push('/career/test')}
                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-gray-600 font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t('results_retake', locale)}
              </button>
            </motion.div>

          </motion.div>
        )}
      </div>
    </div>
  )
}
