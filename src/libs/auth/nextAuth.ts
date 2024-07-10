import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { db } from '@/libs/db'
import { authConfig } from './nextAuth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
