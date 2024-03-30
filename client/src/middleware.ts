import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes, protectedRoutes } from './routes/routes'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (protectedRoutes.includes(request.nextUrl.pathname) && !res.ok) {
    request.cookies.delete('access_token')
    const response = NextResponse.redirect(new URL('/login', request.url))

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && res.ok) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
