import { auth } from '@/libs/auth/nextAuth'

const publicRoutes: string[] = []

const authRoutes: string[] = ['/signup', '/signin']

const apiAuthPrefix: string = '/api/auth'

const DEFAULT_LOGIN_REDIRECT: string = '/'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/signup', nextUrl))
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
