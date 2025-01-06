export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
  },
  auth: {
    tokenExpiry: 3600,
  },
} as const; 