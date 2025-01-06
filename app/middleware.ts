import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_PATHS, BYPASS_PATHS, AUTH_ROUTES } from './lib/constants/auth';
import { TOKEN_NAMES } from './lib/constants/auth';
import type { PublicPath } from './lib/constants/auth';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(TOKEN_NAMES.ACCESS)?.value;
  const isPublicPath = PUBLIC_PATHS.includes(path as PublicPath);
  const isBypassPath = BYPASS_PATHS.some(prefix => path.startsWith(prefix));

  // Bypass static and api routes
  if (isBypassPath) {
    return NextResponse.next();
  }

  // Force redirect to dashboard if logged in and trying to access public pages (including root)
  if ((isPublicPath || path === '/') && token) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, request.url));
  }

  // Force redirect to login if not logged in and trying to access protected routes
  if (!isPublicPath && !token) {
    const loginUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 