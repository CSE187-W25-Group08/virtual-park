import { NextRequest, NextResponse } from 'next/server'
import { check } from './auth/service'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const middlewareInitial = createMiddleware(routing);

const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const response = middlewareInitial(req)
  const segments = req.nextUrl.pathname.split('/');
  // const locale = segments[1];
  const pathname = '/' + segments.slice(2).join('/');
  
  if (!publicRoutes.includes(pathname)) {
    try {
      const cookie = req.cookies.get('session')?.value;
      await check(cookie)
    } catch {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
  return response
}

export const config = {
  matcher: ['/(en|es)?/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

