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