import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Verify LemonSqueezy webhook signature
function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(digest, 'hex'),
    Buffer.from(signature, 'hex')
  )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-signature') ?? ''
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? ''

  // Verify signature in production
  if (process.env.NODE_ENV === 'production' && secret) {
    if (!verifySignature(body, signature, secret)) {
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
    }
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const eventName = payload.meta?.['event_name'] as string

  // We only care about successful orders
  if (eventName === 'order_created') {
    const customData = payload.meta?.['custom_data'] as Record<string, string> | undefined
    const sessionId = customData?.['session_id']

    if (sessionId) {
      try {
        await prisma.session.update({
          where: { id: sessionId },
          data: { isPaid: true },
        })
        console.log(`[webhook] session ${sessionId} marked as paid`)
      } catch (err) {
        console.error('[webhook] db update failed', err)
        // Still return 200 so LS doesn't retry
      }
    }
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing (we need raw body for signature verification)
export const config = { api: { bodyParser: false } }
