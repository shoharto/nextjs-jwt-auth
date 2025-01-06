import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { authUtils } from './auth';
import { config } from '../config';
import type { RefreshTokenResponse } from '../types/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = authUtils.getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery({
      url: config.api.endpoints.auth.refresh,
      method: 'POST',
      body: {
        refreshToken: authUtils.getRefreshToken(),
      },
    }, api, extraOptions);

    if (refreshResult.data) {
      // Store the new tokens
      const { accessToken, refreshToken } = refreshResult.data as RefreshTokenResponse;
      authUtils.setTokens(accessToken, refreshToken);

      // Retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      authUtils.clearTokens();
      window.location.href = config.routes.public.login;
    }
  }

  return result;
}; 