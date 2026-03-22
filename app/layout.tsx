import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'
import './globals.css'

const peace = localFont({
  src: [
    {
      path: '/fonts/PeaceSans.ttf',
    },
  ],
  variable: '--font-peace',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mont',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EDG Informatique',
  description: 'Nous transformons vos idées métier en logiciels rentables',
  keywords: ['développement', 'agence', 'algeria', 'next.js'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${peace.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
