import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Aptitude Test — Find Your Perfect Career in 8 Minutes',
  description: 'Free 30-question career aptitude test based on the Holland RIASEC model. Discover your top-7 career matches with percentages, thinking style (Analyst/Creator/Strategist/Empath), leadership level, career archetype, strengths and a personalized education roadmap.',
  keywords: [
    'career aptitude test', 'free career test', 'Holland RIASEC test', 'career personality test',
    'what career is right for me', 'career quiz', 'vocational test', 'career profile',
    'тест на профессию бесплатно', 'карьерный тест', 'профориентация онлайн',
  ],
  alternates: {
    canonical: 'https://www.mentivo.net/career',
  },
  openGraph: {
    title: 'Free Career Aptitude Test — Discover Your Top-7 Careers | Mentivo',
    description: 'Take our 30-question career test and get your personalized career profile: top-7 matches, thinking style, leadership level and education roadmap. Based on Holland RIASEC.',
    url: 'https://www.mentivo.net/career',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Career Aptitude Test — Mentivo',
      },
    ],
  },
  twitter: {
    title: 'Free Career Aptitude Test — Discover Your Top-7 Careers',
    description: 'Get your personalized career profile in 8–10 minutes. Based on Holland RIASEC model.',
  },
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
