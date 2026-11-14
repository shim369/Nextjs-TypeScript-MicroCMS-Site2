import { Syne, Inter_Tight, JetBrains_Mono } from "next/font/google"
import './styles/globals.scss'
import type { Metadata } from 'next'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { RevealObserver } from './components/RevealObserver'

const syne = Syne({
  weight: ['500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const interTight = Inter_Tight({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NEXT TECH | Increasing Business Velocity through Technology',
    template: '%s | NEXT TECH',
  },
  description: 'NEXT TECH — tailor-made web solutions with HTML, CSS, JavaScript, Python and more. Since 2023.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${interTight.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS is available (prevents hidden content without JS) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
