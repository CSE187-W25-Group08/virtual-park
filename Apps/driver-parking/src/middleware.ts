import { NextRequest, NextResponse } from 'next/server'
import {check} from './auth/service'
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const middlewareInitial = createMiddleware(routing);

const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const response = middlewareInitial(req)
  const pathname = req.nextUrl.pathname.replace(/^\/(en|es)/, '') || '/';
  if (!publicRoutes.includes(pathname)) {
    try {
      const cookie = req.cookies.get('session')?.value;
      await check(cookie)
    } catch {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/(en|es)/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ],
}

