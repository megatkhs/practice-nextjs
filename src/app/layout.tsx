import Link from 'next/link'
import { auth } from '@/libs/auth'
import { signOut } from '@/libs/auth/nextAuth'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Practice Next.js',
  description: 'Next.jsの素振りをするプロジェクトです',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="ja">
      <body>
        <header className="flex min-h-12 items-center justify-between gap-2 px-4 shadow">
          <Link className="font-bold" href="/">
            Practice Next.js
          </Link>

          <nav className="flex items-end gap-2">
            {session === null ? (
              <>
                <Link href="/signup">アカウント登録</Link>
                <Link href="/signin">ログイン</Link>
              </>
            ) : (
              <form
                action={async () => {
                  'use server'

                  await signOut()
                }}
              >
                <button type="submit">ログアウト</button>
              </form>
            )}
          </nav>
        </header>

        {children}
      </body>
    </html>
  )
}
