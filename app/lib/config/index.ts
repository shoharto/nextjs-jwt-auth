export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3000',
    timeout: 5000,
    endpoints: {
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
      },
      users: {
        profile: '/api/users/profile',
      },
    },
  },
  auth: {
    tokenExpiry: 3600,
    tokenNames: {
      access: 'accessToken',
      refresh: 'refreshToken',
    },
  },
  routes: {
    public: {
      home: '/',
      login: '/login',
      register: '/register',
    },
    protected: {
      dashboard: '/dashboard',
      profile: '/dashboard/profile',
    },
  },
  paths: {
    public: ['/login', '/register', '/'],
    protected: ['/dashboard', '/profile'],
    bypass: ['/_next', '/api', '/static', '/favicon.ico'],
  },
} as const;

export type PublicPath = typeof config.paths.public[number];
export type ProtectedPath = typeof config.paths.protected[number]; 