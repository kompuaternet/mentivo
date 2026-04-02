import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await prisma.session.findUnique({ where: { id } })
    if (!session) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json(session)
  } catch (err) {
    console.error('[session GET]', err)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }
}

// Mark as paid (called from webhook)
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.session.update({ where: { id }, data: { isPaid: true } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }
}
