import { NextRequest, NextResponse } from 'next/server';
import { check } from './auth/service';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const middlewareInitial = createMiddleware(routing);

const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const localeMatch = req.nextUrl.pathname.match(/^\/(en|es)(\/|$)/)
  const locale = localeMatch?.[1] || 'en'
  const pathname = req.nextUrl.pathname.replace(/^\/(en|es)\//, '/');
  console.log('pathname', pathname);

  // If the route is protected
  if (!publicRoutes.includes(pathname)) {
    try {
      console.log('attempting to get cookie');
      const cookie = req.cookies.get('session')?.value;
      await check(cookie);
    } catch {
      console.log('redirecting to /');
      const redirectURL = new URL(`/${locale}/login`, req.url)
      return NextResponse.redirect(redirectURL)
    }
  }

  // Always await the internal i18n middleware
  return await middlewareInitial(req);
}

export const config = {
  matcher: ['/(en|es)?/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
