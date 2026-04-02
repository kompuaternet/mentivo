import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Full Career Profile for $1.99',
  description: 'Unlock your complete career profile for just $1.99 (one-time payment). Get top-7 career matches with percentages, thinking style, character type, leadership level, career archetype, strengths, growth areas, education roadmap and your first step. Lifetime access.',
  keywords: [
    'career test price', 'career profile cost', 'career aptitude test pricing',
    'buy career test', 'unlock career results', 'career personality test',
  ],
  alternates: {
    canonical: 'https://www.mentivo.net/pricing',
  },
  openGraph: {
    title: 'Pricing — Full Career Profile for $1.99 | Mentivo',
    description: 'Get your complete career profile for $1.99. Top-7 careers, personality insights, leadership level and education roadmap. One-time payment, lifetime access.',
    url: 'https://www.mentivo.net/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
