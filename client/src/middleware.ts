'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes, protectedRoutes } from './routes/routes'
import { authFetcher } from './app/login/actions'

export async function middleware(request: NextRequest) {
  const res = await authFetcher(`/auth/me`, true)

  if (protectedRoutes.includes(request.nextUrl.pathname) && !res.ok) {
    request.cookies.delete('Authentication')
    const response = NextResponse.redirect(new URL('/login', request.url))

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && res.ok) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
