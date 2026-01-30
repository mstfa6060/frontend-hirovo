import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Hirovo - Is Bulma & Ilan Platformu',
  description: 'Hirovo, is arama ve ilan platformudur. Is ilanlarini kesfet, kolayca basvur ve kariyer firsatlarini takip et.',
  keywords: 'is bulma, is ilanlari, kariyer, is arama, personel ilanlari, eleman arayanlar, ise alim, Hirovo',
  robots: 'index, follow',
  openGraph: {
    title: 'Hirovo - Is Bulma & Kariyer Platformu',
    description: 'Hirovo ile is ilanlarini kesfet, basvur ve kariyer firsatlarini takip et.',
    url: 'https://hirovo.com',
    siteName: 'Hirovo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/logo/hirovo_logo_white.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col gradient-bg text-white font-sans leading-relaxed">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
