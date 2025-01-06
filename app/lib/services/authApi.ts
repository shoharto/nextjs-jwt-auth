import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import type { Profile } from '../types/api';
import { TOKEN_NAMES } from '../constants/auth';
import { API_BASE_URL } from '../constants/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_NAMES.ACCESS);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation, 
  useGetProfileQuery 
} = authApi;

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(TOKEN_NAMES.ACCESS);
}; 