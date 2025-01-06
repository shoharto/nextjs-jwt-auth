import { config } from '../config';

export const authUtils = {
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(config.auth.tokenNames.access, accessToken);
    localStorage.setItem(config.auth.tokenNames.refresh, refreshToken);
  },
  
  clearTokens: () => {
    localStorage.removeItem(config.auth.tokenNames.access);
    localStorage.removeItem(config.auth.tokenNames.refresh);
  },

  getAccessToken: () => localStorage.getItem(config.auth.tokenNames.access),
  
  getRefreshToken: () => localStorage.getItem(config.auth.tokenNames.refresh),
  
  isAuthenticated: () => !!localStorage.getItem(config.auth.tokenNames.access),
}; 