'use client'

import { useState, useTransition } from 'react'
import { SignUpInputSchema, signUp } from '@/libs/auth/signUp'
import { useValibotForm } from '@/libs/form'

export const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const { register, handleSubmit } = useValibotForm({
    mode: 'onBlur',
    schema: SignUpInputSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = handleSubmit((values) => {
    setError(undefined)

    startTransition(async () => {
      const result = await signUp(values)

      if (!result.isSuccess) {
        setError(result.error?.message)
        return
      }

      console.log(result.message)
    })
  })
  return (
    <form
      className="mx-auto grid max-w-80 space-y-4 rounded-lg border border-neutral-200 p-6 shadow"
      noValidate
      onSubmit={onSubmit}
    >
      <input
        type="email"
        className="rounded-md border border-neutral-400 bg-white px-4 py-2"
        placeholder="メールアドレス"
        required
        {...register('email')}
      />
      <input
        type="password"
        className="rounded-md border border-neutral-400 bg-white px-4 py-2"
        placeholder="パスワード"
        required
        {...register('password')}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="rounded-md bg-sky-500 px-4 py-2 font-bold text-white"
        disabled={isPending}
      >
        登録
      </button>
    </form>
  )
}
