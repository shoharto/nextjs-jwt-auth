import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import type { Profile } from '../types/api';
import { config } from '../config';
import { authUtils } from '../utils/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = authUtils.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: config.api.endpoints.auth.login,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: config.api.endpoints.auth.register,
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: config.api.endpoints.auth.logout,
        method: 'POST',
      }),
    }),
    getProfile: builder.query<Profile, void>({
      query: () => config.api.endpoints.users.profile,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;

export const isAuthenticated = authUtils.isAuthenticated; 