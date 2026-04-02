'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, ArrowLeft, Share2, RotateCcw, CheckCircle, ExternalLink } from 'lucide-react'
import { t } from '@/lib/i18n'
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

function ProfileCard({ emoji, label, value, description }: {
  emoji: string; label: string; value: string; description: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 flex gap-4 items-start">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/30 to-purple-800/20 flex items-center justify-center text-xl flex-shrink-0 border border-purple-500/20">
        {emoji}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-white/40 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="font-bold text-white text-base mb-1">{value}</div>
        <div className="text-xs text-white/50 leading-relaxed">{description}</div>
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
          className={`h-2 flex-1 rounded-full origin-bottom ${i <= level ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-white/10'}`}
        />
      ))}
    </div>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [session, setSession] = useState<TestSession | null>(null)
  const [locale, setLocale] = useState<Locale>('ru')
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [barsVisible, setBarsVisible] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  useEffect(() => {
    // Check URL param for payment success
    const url = new URL(window.location.href)
    if (url.searchParams.get('paid') === '1') setPaySuccess(true)

    // Load session
    const loadSession = async () => {
      try {
        const res = await fetch(`/api/session/${id}`)
        if (res.ok) {
          const data = await res.json()
          setSession(data)
          setLocale(data.locale ?? 'ru')
        } else {
          throw new Error('not found')
        }
      } catch {
        // Fallback to localStorage
        const raw = localStorage.getItem('career_session')
        if (raw) {
          const data = JSON.parse(raw) as TestSession
          setSession(data)
          setLocale(data.locale ?? 'ru')
        } else {
          router.push('/career')
        }
      } finally {
        setLoading(false)
        setTimeout(() => setBarsVisible(true), 600)
      }
    }

    loadSession()
  }, [id, router])

  const handleUnlock = async () => {
    if (!session) return
    setPaying(true)
    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, locale }),
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      console.error(err)
    } finally {
      setPaying(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'CareerPath — Мои результаты',
        text: `Прошёл(а) тест на профессию. Моя профессия #1: ${session?.profile?.topProfessions[0]?.profession.name[locale]}. Попробуй!`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">✨</div>
          <div className="text-white/60">Загружаем результаты...</div>
        </div>
      </div>
    )
  }

  if (!session?.profile) return null

  const { profile } = session
  const isPaid = session.isPaid || paySuccess
  const previewProfession = profile.topProfessions[3] // #4 — shown free

  return (
    <div className="min-h-screen pb-20">

      {/* ── Nav ── */}
      <div className="sticky top-0 z-20 bg-[#0a0812]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/career')} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            CareerPath
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/career/test')} className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors text-xs px-3 py-1.5 glass rounded-lg">
              <RotateCcw className="w-3 h-3" />
              {t('results_retake', locale)}
            </button>
            <button onClick={handleShare} className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors text-xs px-3 py-1.5 glass rounded-lg">
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
              className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl p-4"
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-green-300 font-medium">{t('payment_success', locale)} Весь профиль разблокирован.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Free result header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            {t('results_free_title', locale)}
          </h1>
          {!isPaid && (
            <p className="text-white/50 text-sm">{t('results_free_subtitle', locale)}</p>
          )}
        </motion.div>

        {/* ── FREE: Profession #4 ── */}
        {!isPaid && previewProfession && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs text-white/40 uppercase tracking-widest mb-3">🔓 Профессия #4 из твоего топа</div>
            <div className="glass rounded-2xl p-5 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500" />

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{previewProfession.profession.emoji}</span>
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">{t('results_profession_no', locale)}4</div>
                    <h3 className="text-xl font-bold text-white">{previewProfession.profession.name[locale]}</h3>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-black text-purple-400">{previewProfession.matchPercent}%</div>
                  <div className="text-xs text-white/40">{t('results_match', locale)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MatchBar percent={previewProfession.matchPercent} animate={barsVisible} />
              </div>

              <p className="text-sm text-white/60 leading-relaxed">
                {previewProfession.profession.description[locale]}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── PAYWALL ── */}
        {!isPaid ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Blurred preview of locked content */}
            <div className="paywall-blur space-y-3 mb-4">
              {/* Fake top professions */}
              {[92, 87, 81].map((pct, i) => (
                <div key={i} className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center">🔒</div>
                    <div>
                      <div className="text-xs text-white/40 mb-0.5">Профессия #{i + 1}</div>
                      <div className="h-4 bg-white/10 rounded w-32" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-purple-400/60">{pct}%</div>
                </div>
              ))}
              {/* Fake profile card */}
              <div className="glass rounded-2xl p-5">
                <div className="h-3 bg-white/10 rounded w-48 mb-3" />
                <div className="h-3 bg-white/10 rounded w-64 mb-2" />
                <div className="h-3 bg-white/10 rounded w-40" />
              </div>
            </div>

            {/* Unlock card */}
            <div className="glass rounded-3xl p-6 border border-purple-500/30 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                <Lock className="w-7 h-7 text-purple-400" />
              </div>

              <h3 className="text-xl font-black text-white mb-2">{t('results_locked_title', locale)}</h3>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">{t('results_locked_subtitle', locale)}</p>

              {/* Feature list */}
              <div className="grid grid-cols-2 gap-2 mb-6 text-left">
                {[
                  '🏆 Топ-7 профессий',
                  '🧠 Склад мышления',
                  '🎭 Склад характера',
                  '👑 Уровень лидерства',
                  '⚡ Карьерный архетип',
                  '💪 Твои сильные стороны',
                  '🌱 Зоны роста',
                  '🎓 Куда идти учиться',
                  '🗺️ Первый шаг',
                  '♾️ Доступ навсегда',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleUnlock}
                disabled={paying}
                className="btn-primary w-full flex items-center justify-center gap-2 animate-pulse-glow text-base py-4"
              >
                {paying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('payment_processing', locale)}
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    {t('results_unlock_cta', locale)}
                  </>
                )}
              </button>

              <div className="mt-3 text-xs text-white/30 flex items-center justify-center gap-1.5">
                <span>🔒</span>
                <span>Безопасная оплата через LemonSqueezy</span>
                <span>·</span>
                <span>Мгновенный доступ</span>
              </div>
            </div>
          </motion.div>
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500" />
              <div className="text-xs text-purple-400 uppercase tracking-widest mb-3">{t('results_archetype', locale)}</div>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{profile.archetype.emoji}</div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{profile.archetype.name[locale]}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{profile.archetype.description[locale]}</p>
                </div>
              </div>
            </motion.div>

            {/* ── Personality portrait ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">{t('results_your_profile', locale)}</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <ProfileCard
                  emoji={profile.thinkingStyle.emoji}
                  label={t('results_thinking', locale)}
                  value={profile.thinkingStyle.name[locale]}
                  description={profile.thinkingStyle.description[locale]}
                />
                <ProfileCard
                  emoji={profile.characterType.emoji}
                  label={t('results_character', locale)}
                  value={profile.characterType.name[locale]}
                  description={profile.characterType.description[locale]}
                />
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{t('results_leadership', locale)}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{profile.leadershipLevel.emoji}</span>
                    <span className="font-bold text-white">{profile.leadershipLevel.name[locale]}</span>
                  </div>
                  <LeadershipBar level={profile.leadershipLevel.level} />
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">{profile.leadershipLevel.description[locale]}</p>
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{t('results_workstyle', locale)}</div>
                  <div className="font-bold text-white mb-1">
                    {t(`workstyle_${profile.workStyle}` as any, locale)}
                  </div>
                  <div className="text-xs text-white/40 mb-3">{t('results_career_pace', locale)}</div>
                  <div className="font-semibold text-purple-300 text-sm">
                    {t(`pace_${profile.careerPace}` as any, locale)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Strengths & Growth ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5">
                <div className="text-sm font-bold text-white mb-3">{t('results_strengths', locale)}</div>
                <div className="space-y-2">
                  {profile.strengths.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {s[locale]}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="text-sm font-bold text-white mb-3">{t('results_growth', locale)}</div>
                <div className="space-y-2">
                  {profile.growthZones.length > 0 ? profile.growthZones.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {g[locale]}
                    </motion.div>
                  )) : (
                    <div className="text-sm text-white/40">Всё сбалансировано 🎉</div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── Top 7 professions ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">{t('results_top7', locale)}</div>
              <div className="space-y-3">
                {profile.topProfessions.map((pm, i) => (
                  <motion.div
                    key={pm.profession.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className={`glass rounded-2xl p-4 ${i === 0 ? 'border border-purple-500/30 bg-purple-600/5' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                        i === 0 ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/20 border border-purple-500/30'
                        : i === 1 ? 'bg-white/8'
                        : 'bg-white/5'
                      }`}>
                        {pm.profession.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {i === 0 && <span className="text-xs text-purple-400 font-semibold">#1 Лучшее совпадение</span>}
                          {i === 1 && <span className="text-xs text-white/40 font-semibold">#2</span>}
                          {i >= 2 && <span className="text-xs text-white/30 font-semibold">#{i + 1}</span>}
                        </div>
                        <div className={`font-bold ${i === 0 ? 'text-white' : 'text-white/80'}`}>
                          {pm.profession.name[locale]}
                        </div>
                      </div>
                      <div className={`text-xl font-black flex-shrink-0 ${i === 0 ? 'text-purple-400' : 'text-white/60'}`}>
                        {pm.matchPercent}%
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <MatchBar percent={pm.matchPercent} animate={barsVisible} />
                    </div>

                    {i === 0 && (
                      <p className="text-xs text-white/50 leading-relaxed mt-2">
                        {pm.profession.description[locale]}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Education ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="text-xs text-white/40 uppercase tracking-widest mb-4">{t('results_education', locale)}</div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">{t('results_direction', locale)}</div>
                  <div className="font-bold text-white text-lg">{profile.education.directionName[locale]}</div>
                </div>

                <div>
                  <div className="text-xs text-white/40 mb-1.5">{t('results_specialties', locale)}</div>
                  <div className="text-sm text-purple-300 leading-relaxed">{profile.education.specialties[locale]}</div>
                </div>

                <div>
                  <div className="text-xs text-white/40 mb-1">{t('results_format', locale)}</div>
                  <div className="text-sm text-white/70">{profile.education.format[locale]}</div>
                </div>

                {profile.education.platforms.length > 0 && (
                  <div>
                    <div className="text-xs text-white/40 mb-2">{t('results_platforms', locale)}</div>
                    <div className="flex flex-wrap gap-2">
                      {profile.education.platforms.map(p => (
                        <span key={p} className="text-xs px-3 py-1.5 glass rounded-lg text-purple-300 border border-purple-500/20">
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/5 border border-purple-500/20"
            >
              <div className="text-sm font-bold text-white mb-2">{t('results_first_step', locale)}</div>
              <p className="text-white/70 text-sm leading-relaxed">{profile.education.firstStep[locale]}</p>
            </motion.div>

            {/* ── Share / Retake ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3"
            >
              <button
                onClick={handleShare}
                className="flex-1 glass glass-hover rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-white/60 font-medium"
              >
                <Share2 className="w-4 h-4" />
                {t('results_share', locale)}
              </button>
              <button
                onClick={() => router.push('/career/test')}
                className="flex-1 glass glass-hover rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-white/60 font-medium"
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
