import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

import { decrypt } from './auth/jwtAuth'

const publicRoutes = ['/login', '/signup']
const encodedKey = new TextEncoder().encode(process.env.MASTER_SECRET)

export default async function middleware(req: NextRequest) {
  if (!publicRoutes.includes(req.nextUrl.pathname.toLowerCase())) {
    const cookie = req.cookies.get('session')?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    try {
      const decryptedToken = await decrypt(cookie);
      await jwtVerify(decryptedToken, encodedKey, { algorithms: ['HS256'] });
    } catch {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }
  return NextResponse.next();
}
// export default async function middleware(req: NextRequest) {
//   console.log('[Middleware] Reached middleware at', req.nextUrl.pathname);

//   if (req.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/login', req.nextUrl));
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}