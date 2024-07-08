import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Practice Next.js',
  description: 'Next.jsの素振りをするプロジェクトです',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
