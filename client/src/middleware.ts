import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes, protectedRoutes } from './routes/routes'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('access_token')?.value

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete('access_token')
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('access_token')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
