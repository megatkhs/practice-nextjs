'use server'

import { hash } from 'bcryptjs'
import * as v from 'valibot'
import { getUserByEmail } from '@/db/user'
import { db } from '@/libs/db'
import { SignUpSchema } from '@/schemas/SignUpSchema'

type SignUpReturn =
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

export const signUp = async (input: v.InferInput<typeof SignUpSchema>): Promise<SignUpReturn> => {
  try {
    const { email, password } = v.parse(SignUpSchema, input)
    const user = await getUserByEmail(email)

    if (user !== null) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています',
        },
      }
    }

    const hashedPassword = await hash(password, 10)

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return {
      isSuccess: true,
      message: 'サインアップに成功しました。',
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

    return {
      isSuccess: false,
      error: {
        message: 'サインアップに失敗しました。',
      },
    }
  }
}
