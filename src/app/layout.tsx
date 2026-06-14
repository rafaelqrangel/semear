import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Samear — Arquiteto da Vida',
  description: 'Descubra o valor do seu tempo e construa a vida que você quer.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn(dmSerif.variable, inter.variable)}>
      <body className="font-sans antialiased bg-[#fdeee4] text-[#2d2620]">
        {children}
      </body>
    </html>
  )
}
