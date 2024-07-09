import { db } from '@/libs/db'

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}
