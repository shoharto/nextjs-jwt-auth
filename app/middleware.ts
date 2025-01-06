import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('accessToken')?.value;
  const publicPaths = ['/login', '/register', '/'];
  const isPublicPath = publicPaths.includes(path);

  // Public paths bypass
  if (path.startsWith('/_next') || 
      path.startsWith('/api') || 
      path.startsWith('/static') || 
      path === '/favicon.ico') {
    return NextResponse.next();
  }

  // Force redirect to dashboard if logged in and trying to access public pages
  if (isPublicPath && token) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    return response;
  }

  // Force redirect to login if not logged in and trying to access protected routes
  if (!isPublicPath && !token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 