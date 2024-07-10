import * as v from 'valibot'

export const SignInSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, '入力してください。'),
    v.email('メールアドレスを入力していください。')
  ),
  password: v.pipe(v.string(), v.minLength(8, '8文字以上入力してください。')),
})
