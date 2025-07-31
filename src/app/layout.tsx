import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const sora = Sora({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'HealTique',
  description: 'Call Scheduling App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
