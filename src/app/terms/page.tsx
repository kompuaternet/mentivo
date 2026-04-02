'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-5 pt-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: April 2, 2026</p>

        <div className="space-y-8 text-white/65 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. About the Service</h2>
            <p>Mentivo (mentivo.net) provides online career aptitude tests that help users discover suitable professions and educational paths. By using this service, you agree to these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Service Description</h2>
            <p>Our career test consists of 30 questions analysing your personality, thinking style, values and work preferences. A free preview of results is provided to all users. Full results — including your Top-7 professions, personality profile, leadership level and educational recommendations — are available after a one-time payment.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. Payments</h2>
            <p>Payments are processed securely by Paddle.com (our Merchant of Record). We accept all major credit cards, PayPal and other methods supported by Paddle. All prices are shown in USD and include applicable taxes where required by law.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Refund Policy</h2>
            <p>We offer a 7-day money-back guarantee. If you are not satisfied with your results, contact us at support@mentivo.net within 7 days of purchase and we will issue a full refund — no questions asked.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Intellectual Property</h2>
            <p>All content on Mentivo — including questions, algorithms, text and design — is the property of Mentivo and protected by copyright law. You may not reproduce, distribute or create derivative works without our written permission.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Disclaimer</h2>
            <p>Career test results are for informational and guidance purposes only. They do not constitute professional career counselling. We do not guarantee specific career outcomes. Results are based on psychometric models and reflect general tendencies.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Limitation of Liability</h2>
            <p>Mentivo is not liable for any indirect, incidental or consequential damages arising from your use of the service. Our total liability is limited to the amount you paid for the service.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Contact</h2>
            <p>Questions about these Terms? Email us at <a href="mailto:support@mentivo.net" className="text-purple-400 hover:underline">support@mentivo.net</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
