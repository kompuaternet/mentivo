import { NextRequest, NextResponse } from 'next/server'
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'

lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! })

export async function POST(req: NextRequest) {
  const { sessionId, locale } = await req.json()

  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

  try {
    const { data, error } = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      process.env.LEMONSQUEEZY_VARIANT_ID!,
      {
        checkoutOptions: {
          embed: false,
          media: false,
          logo: true,
        },
        checkoutData: {
          // Pass session ID so webhook can mark it as paid
          custom: { session_id: sessionId },
        },
        productOptions: {
          name: 'CareerPath — Полный профиль',
          description: 'Топ-7 профессий, склад характера, уровень лидерства, куда учиться',
          redirectUrl: `${origin}/results/${sessionId}?paid=1`,
          receiptButtonText: 'Смотреть результат',
          receiptThankYouNote: 'Спасибо! Твой полный профиль готов.',
        },
      }
    )

    if (error || !data) {
      console.error('[checkout]', error)
      return NextResponse.json({ error: 'checkout_failed' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl: data.data.attributes.url })
  } catch (err) {
    console.error('[checkout]', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
