import { NextRequest, NextResponse } from 'next/server'
import { check } from './auth/service'

const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
  if (!publicRoutes.includes(req.nextUrl.pathname)) {
    try {
      const cookie = req.cookies.get('session')?.value;
      await check(cookie)
    } catch {
      //return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

