import Link from 'next/link'
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
      <body>
        <header className="flex min-h-12 items-center justify-between gap-2 px-4 shadow">
          <Link className="font-bold" href="/">
            Practice Next.js
          </Link>

          <nav className="items-end">
            <Link href="/login">ログイン</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  )
}
