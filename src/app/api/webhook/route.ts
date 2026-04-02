import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Verify Paddle webhook signature (ts=...;h1=...)
function verifySignature(body: string, signature: string, secret: string): boolean {
  const parts = signature.split(';')
  const tsPart = parts.find(p => p.startsWith('ts='))
  const h1Part = parts.find(p => p.startsWith('h1='))
  if (!tsPart || !h1Part) return false

  const ts = tsPart.slice(3)
  const h1 = h1Part.slice(3)
  const digest = crypto.createHmac('sha256', secret).update(`${ts}:${body}`).digest('hex')

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(h1))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('paddle-signature') ?? ''
  const secret = process.env.PADDLE_WEBHOOK_SECRET ?? ''

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

  const eventType = payload.event_type as string | undefined

  if (eventType === 'transaction.completed') {
    const data = payload.data as Record<string, unknown> | undefined
    const customData = data?.custom_data as Record<string, string> | undefined
    const sessionId = customData?.session_id

    if (sessionId) {
      try {
        await prisma.session.update({
          where: { id: sessionId },
          data: { isPaid: true },
        })
        console.log(`[webhook] session ${sessionId} marked as paid`)
      } catch (err) {
        console.error('[webhook] db update failed', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}

