'use server'

import { AuthError } from 'next-auth'
import * as v from 'valibot'
import { SignInSchema } from '@/schemas/SignInSchema'
import { signIn as NextAuthSignIn } from '../nextAuth'

type SignInReturn =
  | {
      isSuccess: true
      message: string
    }
  | {
      isSuccess: false
      error: {
        message: string
      }
    }

export const signIn = async (values: v.InferInput<typeof SignInSchema>): Promise<SignInReturn> => {
  try {
    const { email, password } = v.parse(SignInSchema, values)
    await NextAuthSignIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })

    return {
      isSuccess: true,
      message: 'ログインに成功しました。',
    }
  } catch (error) {
    if (error instanceof v.ValiError) {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが間違っています。',
            },
          }
        default:
          return {
            isSuccess: false,
            error: {
              message: 'ログインに失敗しました。',
            },
          }
      }
    }

    throw error
  }
}
