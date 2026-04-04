'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Share2, RotateCcw, CheckCircle,
  Brain, X, Check,
} from 'lucide-react'
import { t, getLT } from '@/lib/i18n'
import type { TestSession, Locale } from '@/types'

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

// ─── RIASEC Radar Chart ──────────────────────────────────────────────────────

function RiasecRadar({ scores, animate, locale }: {
  scores: Record<string, number>
  animate: boolean
  locale: Locale
}) {
  const KEYS = ['R', 'I', 'A', 'S', 'E', 'C'] as const
  const SIZE = 240
  const CX = SIZE / 2
  const CY = SIZE / 2
  const MAX_R = 90
  const LEVELS = 4

  const vals = KEYS.map(k => scores[k] ?? 0)
  const maxVal = Math.max(...vals, 1)

  const angle = (i: number) => (Math.PI * 2 * i) / KEYS.length - Math.PI / 2

  const pt = (i: number, ratio: number) => ({
    x: CX + Math.cos(angle(i)) * MAX_R * ratio,
    y: CY + Math.sin(angle(i)) * MAX_R * ratio,
  })

  const gridPoly = (ratio: number) =>
    KEYS.map((_, i) => { const p = pt(i, ratio); return `${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join(' ')

  const dataPoly = vals.map((v, i) => {
    const p = pt(i, v / maxVal)
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }).join(' ')

  const LABEL_R = MAX_R + 18

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.95 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center"
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="overflow-visible">
        {/* Grid rings */}
        {Array.from({ length: LEVELS }, (_, lv) => (
          <polygon key={lv} points={gridPoly((lv + 1) / LEVELS)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {/* Axis lines */}
        {KEYS.map((k, i) => {
          const end = pt(i, 1)
          return <line key={k} x1={CX} y1={CY} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />
        })}
        {/* Data shape */}
        <motion.polygon
          points={dataPoly}
          fill="rgba(99,102,241,0.2)"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        {/* Labels */}
        {KEYS.map((k, i) => {
          const a = angle(i)
          return (
            <text
              key={k}
              x={CX + Math.cos(a) * LABEL_R}
              y={CY + Math.sin(a) * LABEL_R}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="600"
              fill="#6b7280"
            >
              {k}
            </text>
          )
        })}
      </svg>
      <p className="text-xs text-gray-400 mt-2 text-center">
        {t('results_riasec_caption', locale)}
      </p>
    </motion.div>
  )
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

function PaymentModal({
  isOpen, onClose, onChoose, locale, paying,
}: {
  isOpen: boolean
  onClose: () => void
  onChoose: (plan: 'single' | 'full') => void
  locale: Locale
  paying: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[480px] bg-white rounded-[20px] p-6 z-[51] max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {t('modal_want_to_know', locale)}
              </h3>
              <p className="text-sm text-gray-500">
                {t('modal_result_ready', locale)}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-5">

              {/* Option 1 — Single */}
              <div
                className="p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
                onClick={() => onChoose('single')}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">{t('plan_single_title', locale)}</div>
                    <div className="space-y-1">
                      {[t('plan_single_d1', locale), t('plan_single_d2', locale)].map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xl font-black text-gray-900 flex-shrink-0">$0.50</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={(e) => { e.stopPropagation(); onChoose('single') }}
                  disabled={paying}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('plan_single_cta', locale)}
                </motion.button>
              </div>

              {/* Option 2 — Full (highlighted) */}
              <div className="relative">
                <div className="absolute -top-3 left-4 z-10">
                  <span className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full font-semibold">
                    {t('plan_full_badge', locale)}
                  </span>
                </div>
                <div
                  className="pt-5 p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => onChoose('full')}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-semibold text-gray-900 mb-2">{t('plan_full_title', locale)}</div>
                      <div className="space-y-1">
                        {[t('plan_full_d1', locale), t('plan_full_d2', locale), t('plan_full_d3', locale)].map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-xl font-black text-indigo-600 flex-shrink-0">$1.99</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={(e) => { e.stopPropagation(); onChoose('full') }}
                    disabled={paying}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {paying ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        {t('payment_processing', locale)}
                      </span>
                    ) : t('plan_full_cta', locale)}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Trust */}
            <p className="text-center text-xs text-gray-400 mb-2">{t('results_majority_choose', locale)}</p>
            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span>{t('results_instant_access', locale)}</span>
              <span>·</span>
              <span>{t('results_lifetime_access', locale)}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
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
  const [showModal, setShowModal] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paddle, setPaddle] = useState<any>(undefined)

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

  const handleUnlock = (plan: 'single' | 'full') => {
    if (!session || !paddle) return
    setPaying(true)
    const priceId = plan === 'single'
      ? (process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_SINGLE ?? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!)
      : process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
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

  const PROFILE_FEATURES = [
    t('results_feat_1', locale), t('results_feat_2', locale),
    t('results_feat_3', locale), t('results_feat_4', locale),
    t('results_feat_5', locale), t('results_feat_6', locale),
    t('results_feat_7', locale), t('results_feat_8', locale),
  ]

  return (
    <div className="min-h-screen pb-20 bg-[#F4F6FF]">

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onChoose={(plan) => { setShowModal(false); handleUnlock(plan) }}
        locale={locale}
        paying={paying}
      />

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

        {/* ════════════════════════════════════════════════════════
            PAYWALL — unpaid view
            ════════════════════════════════════════════════════════ */}
        {!isPaid ? (
          <>
            {/* 1. Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-2"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
                {t('results_found_title', locale)}
              </h1>
              <p className="text-sm text-gray-500">
                {t('results_found_sub', locale)}
              </p>
            </motion.div>

            {/* 2. RIASEC Radar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center"
            >
              <RiasecRadar
                scores={profile.scores as unknown as Record<string, number>}
                animate={barsVisible}
                locale={locale}
              />
            </motion.div>

            {/* 3. Seven profession cards */}
            <div className="space-y-3">
              {profile.topProfessions.map((pm, i) => (
                <motion.div
                  key={pm.profession.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  onClick={() => setShowModal(true)}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900 text-sm">
                      {t('results_profession_label', locale)} #{i + 1}
                    </span>
                    <span className="text-sm text-gray-500">{pm.matchPercent}%</span>
                  </div>
                  {/* Bar capped at 90% of percent — never reaches full width */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: barsVisible ? `${pm.matchPercent * 0.9}%` : 0 }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <button
                    className="text-sm text-indigo-600 font-medium hover:underline text-left"
                    onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
                  >
                    {t('results_reveal_link', locale)}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* 3. Info text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-gray-500 px-4"
            >
              {t('results_ranking_note', locale)}
            </motion.p>

            {/* 4. Profile preview block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {t('results_profile_ready_title', locale)}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {t('results_profile_ready_sub', locale)}
              </p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {PROFILE_FEATURES.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="btn-primary w-full text-base py-4 rounded-xl shadow-lg"
              >
                {t('results_unlock_all_btn', locale)}
              </motion.button>
            </motion.div>

            {/* 6. Micro trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="text-center space-y-1.5 pb-4"
            >
              <p className="text-xs text-gray-500">{t('results_majority_choose', locale)}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                <span>{t('results_instant_access', locale)}</span>
                <span>·</span>
                <span>{t('results_lifetime_access', locale)}</span>
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
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${i === 0 ? 'bg-indigo-100' : 'bg-gray-100'}`}>
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
