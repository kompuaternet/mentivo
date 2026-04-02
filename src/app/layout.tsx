import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareerPath — Найди профессию своей мечты',
  description: 'Пройди тест из 30 вопросов и узнай свой топ-7 профессий, склад мышления, уровень лидерства и куда идти учиться.',
  keywords: 'профессия, тест, карьера, выбор профессии, куда поступить, факультет',
  openGraph: {
    title: 'CareerPath — Найди профессию своей мечты',
    description: '30 вопросов. Глубокий анализ. Твой персональный профиль.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Ambient background orbs */}
        <div className="orb w-[600px] h-[600px] bg-purple-700/20 -top-40 -left-40" />
        <div className="orb w-[500px] h-[500px] bg-pink-700/15 top-1/2 -right-32" />
        <div className="orb w-[400px] h-[400px] bg-blue-700/10 bottom-0 left-1/3" />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
