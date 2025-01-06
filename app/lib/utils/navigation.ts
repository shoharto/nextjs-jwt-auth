import { config } from '../config';
import { useRouter } from 'next/navigation';
import type { PublicPath, ProtectedPath } from '../config';

export const createNavigation = (router: ReturnType<typeof useRouter>) => ({
  goToLogin: () => router.push(config.routes.public.login as PublicPath),
  goToDashboard: () => router.push(config.routes.protected.dashboard as ProtectedPath),
  goToProfile: () => router.push(config.routes.protected.profile as ProtectedPath),
  isProtectedRoute: (path: string) => config.paths.protected.includes(path as ProtectedPath),
  isPublicRoute: (path: string) => config.paths.public.includes(path as PublicPath)
});

export type Navigation = ReturnType<typeof createNavigation>; 