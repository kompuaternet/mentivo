'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-5 pt-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: April 2, 2026</p>

        <div className="space-y-8 text-white/65 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Who We Are</h2>
            <p>Mentivo (mentivo.net) is a career aptitude testing platform. This Privacy Policy explains how we collect, use and protect your personal data when you use our service.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Data We Collect</h2>
            <ul className="space-y-2 list-none">
              {[
                ['Test answers', 'Your responses to the 30 career test questions'],
                ['Results', 'Your career profile and profession matches'],
                ['Payment data', 'Processed by Paddle — we never store card numbers'],
                ['Technical data', 'IP address, browser type, device info (for analytics)'],
                ['Language preference', 'To show the service in your language'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">→</span>
                  <span><strong className="text-white/80">{title}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-2 list-none">
              {[
                'To calculate and display your career test results',
                'To process your payment and verify purchase',
                'To improve the accuracy of our algorithm',
                'To provide customer support',
                'To detect and prevent fraud',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Data Storage</h2>
            <p>Your test results are stored securely in our database hosted on Railway (EU region). We retain your data for up to 2 years or until you request deletion. Payment records are stored by Paddle in accordance with their privacy policy.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Third-Party Services</h2>
            <ul className="space-y-2 list-none">
              {[
                ['Paddle', 'Payment processing — paddle.com/privacy'],
                ['Railway', 'Database hosting — railway.app/privacy'],
                ['Vercel', 'Website hosting — vercel.com/legal/privacy-policy'],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">→</span>
                  <span><strong className="text-white/80">{name}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Cookies</h2>
            <p>We use minimal cookies: session storage to save your test progress, and language preference. We do not use advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Your Rights (GDPR)</h2>
            <p className="mb-2">If you are in the EU/EEA, you have the right to:</p>
            <ul className="space-y-1.5 list-none">
              {[
                'Access your personal data',
                'Correct inaccurate data',
                'Delete your data ("right to be forgotten")',
                'Export your data in a portable format',
                'Object to processing',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2">To exercise these rights, email <a href="mailto:support@mentivo.net" className="text-purple-400 hover:underline">support@mentivo.net</a></p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Children</h2>
            <p>Our service is available to users of all ages. We do not knowingly collect personal data from children under 13 without parental consent.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Contact</h2>
            <p>Privacy questions? Email <a href="mailto:support@mentivo.net" className="text-purple-400 hover:underline">support@mentivo.net</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
