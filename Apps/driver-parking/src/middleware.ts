import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {
  if (!publicRoutes.includes(req.nextUrl.pathname.toLowerCase())) {
    const cookie = req.cookies.get('session')?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    try {
      const response = await fetch('http://localhost:3010/api/v0/auth/check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookie}`
        }
      });
    if (!response.ok) {
        throw new Error('Invalid session');
      }
      
    } catch (error) {
      console.error('Session validation error:', error);
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