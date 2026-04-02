'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function RefundPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-5 pt-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-black text-white mb-2">Refund Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: April 2, 2026</p>

        {/* Highlight box */}
        <div className="glass rounded-2xl p-6 border border-green-500/20 bg-green-500/5 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold text-lg mb-1">7-Day Money-Back Guarantee</div>
              <div className="text-white/60 text-sm">Not happy with your results? We'll refund you in full — no questions asked. Just email us within 7 days of your purchase.</div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-white/65 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">How to Request a Refund</h2>
            <ol className="space-y-3 list-none">
              {[
                ['Email us', 'Send an email to support@mentivo.net within 7 days of your purchase'],
                ['Include', 'Your order number (from your Paddle receipt email)'],
                ['Wait', 'We will process your refund within 1–3 business days'],
                ['Receive', 'Refund goes back to your original payment method'],
              ].map(([step, desc], i) => (
                <li key={step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">{i + 1}</div>
                  <span><strong className="text-white/80">{step}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Eligibility</h2>
            <ul className="space-y-2 list-none">
              {[
                'Request is made within 7 days of purchase',
                'Order was placed on mentivo.net',
                'You have not already received a refund for this order',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Processing Time</h2>
            <p>Refunds are processed within 1–3 business days. Depending on your bank or payment provider, it may take an additional 3–5 business days to appear on your statement.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Questions</h2>
            <p>Email us at <a href="mailto:support@mentivo.net" className="text-purple-400 hover:underline">support@mentivo.net</a> — we typically respond within 24 hours.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
