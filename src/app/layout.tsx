import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mentivo.net'),
  title: {
    default: 'Mentivo — Career Aptitude Test & Personality Profile',
    template: '%s | Mentivo',
  },
  description: 'Take our free 30-question career aptitude test based on the Holland RIASEC model. Discover your top-7 career matches, thinking style, leadership level, career archetype and personalized education roadmap in just 8–10 minutes.',
  keywords: [
    'career aptitude test', 'career test', 'personality test', 'Holland RIASEC',
    'career profile', 'what career suits me', 'career guidance', 'free career test',
    'profession test', 'career counseling', 'career path test', 'vocational test',
    'тест на профессию', 'профориентация', 'тест на карьеру', 'психологический тест',
  ],
  authors: [{ name: 'Mentivo', url: 'https://www.mentivo.net' }],
  creator: 'Mentivo',
  publisher: 'Mentivo',
  category: 'education',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU', 'uk_UA', 'de_DE', 'es_ES', 'tr_TR', 'fr_FR'],
    url: 'https://www.mentivo.net',
    siteName: 'Mentivo',
    title: 'Mentivo — Free Career Aptitude Test & Personality Profile',
    description: 'Discover the career made for you. Free 30-question test based on Holland RIASEC. Get your top-7 career matches, thinking style, leadership level and full education roadmap.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mentivo — Career Aptitude Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mentivo',
    title: 'Mentivo — Free Career Aptitude Test',
    description: 'Find your perfect career in 8–10 minutes. Free test based on Holland RIASEC model. Top-7 career matches + full personality profile.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.mentivo.net',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {/* Ambient background orbs — subtle light */}
        <div className="orb w-[800px] h-[800px] bg-indigo-100/60 -top-80 -left-80" />
        <div className="orb w-[600px] h-[600px] bg-purple-100/40 top-1/2 -right-60" />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
