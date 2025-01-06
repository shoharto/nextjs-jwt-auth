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

  getAccessToken: () => {
    return localStorage.getItem(config.auth.tokenNames.access);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(config.auth.tokenNames.access);
  }
}; 