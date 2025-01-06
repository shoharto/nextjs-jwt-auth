import { createApi } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, LoginRequest, RegisterRequest, RefreshTokenResponse } from '../types/auth';
import type { Profile } from '../types/api';
import { config } from '../config';
import { baseQueryWithReauth } from '../utils/baseQuery';
import { authUtils } from '../utils/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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
    refresh: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: config.api.endpoints.auth.refresh,
        method: 'POST',
        body: {
          refreshToken: authUtils.getRefreshToken(),
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useRefreshMutation,
} = authApi;

export const isAuthenticated = authUtils.isAuthenticated; 