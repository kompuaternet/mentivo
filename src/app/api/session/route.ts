import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, locale, answers, profile, isPaid } = body

    await prisma.session.upsert({
      where: { id },
      update: { locale, answers, profile, isPaid },
      create: { id, locale, answers, profile, isPaid: isPaid ?? false },
    })

    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('[session POST]', err)
    // Don't fail — results page has localStorage fallback
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
