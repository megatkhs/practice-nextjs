import * as v from 'valibot'

export const SignUpInputSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, '必須項目です。'),
    v.email('メールアドレスを入力していください')
  ),
  password: v.pipe(v.string(), v.minLength(8, '8文字以上入力してください。')),
})

export type SignUpInput = v.InferInput<typeof SignUpInputSchema>
