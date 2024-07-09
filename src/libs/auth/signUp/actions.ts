'use server'

import { hash } from 'bcryptjs'
import * as v from 'valibot'
import { getUserByEmail } from '@/db/user'
import { db } from '@/libs/db'
import { SignUpInputSchema } from './schema'

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

export const signUp = async (
  input: v.InferInput<typeof SignUpInputSchema>
): Promise<SignUpReturn> => {
  try {
    const output = v.parse(SignUpInputSchema, input)
    const user = await getUserByEmail(output.email)

    if (user !== null) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています',
        },
      }
    }

    const hashedPassword = await hash(output.password, 10)

    const { id } = await db.user.create({
      data: {
        email: output.email,
        password: hashedPassword,
      },
    })

    await db.profile.create({
      data: {
        userId: id,
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
