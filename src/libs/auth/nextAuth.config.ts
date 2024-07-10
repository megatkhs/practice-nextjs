import { compare } from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import * as v from 'valibot'
import { getUserByEmail } from '@/db/user'
import { SignInSchema } from '@/schemas/SignInSchema'

export const authConfig = {
  providers: [
    credentials({
      async authorize(credentials) {
        try {
          const output = v.parse(SignInSchema, credentials)

          const user = await getUserByEmail(output.email)
          if (user === null) return null

          const passwordsMatch = await compare(output.password, user.password)

          if (passwordsMatch) return user
        } catch (error) {
          return null
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
