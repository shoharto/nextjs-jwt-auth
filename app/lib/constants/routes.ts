export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PROFILE: '/dashboard/profile',
  },
} as const; 