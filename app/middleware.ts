import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { config } from './lib/config';
import type { PublicPath } from './lib/config';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(config.auth.tokenNames.access)?.value;
  const isPublicPath = config.paths.public.includes(path as PublicPath);
  const isBypassPath = config.paths.bypass.some(prefix => path.startsWith(prefix));

  if (isBypassPath) {
    return NextResponse.next();
  }

  if ((isPublicPath || path === '/') && token) {
    return NextResponse.redirect(new URL(config.routes.protected.dashboard, request.url));
  }

  if (!isPublicPath && !token) {
    const loginUrl = new URL(config.routes.public.login, request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
} 