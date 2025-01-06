export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile'
} as const;

export const TOKEN_NAMES = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export const PROTECTED_PATHS = ['/dashboard', '/profile'] as const;
export const PUBLIC_PATHS = ['/login', '/register', '/'] as const;
export const BYPASS_PATHS = ['/_next', '/api', '/static', '/favicon.ico'] as const;

export type ProtectedPath = typeof PROTECTED_PATHS[number];
export type PublicPath = typeof PUBLIC_PATHS[number]; 