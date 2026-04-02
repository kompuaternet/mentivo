import { NextResponse } from 'next/server'

// Paddle uses client-side checkout (Paddle.js overlay)
// This endpoint is kept for compatibility but not used
export async function POST() {
  return NextResponse.json({ ok: true })
}
