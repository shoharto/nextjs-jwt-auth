import { config } from '../config';
import { useRouter } from 'next/navigation';
import type { PublicPath, ProtectedPath } from '../config';

export const createNavigation = (router: ReturnType<typeof useRouter>) => ({
  goToLogin: () => router.replace(config.routes.public.login as PublicPath),
  goToDashboard: () => router.replace(config.routes.protected.dashboard as ProtectedPath),
  goToProfile: () => router.replace(config.routes.protected.profile as ProtectedPath),
  goToRegister: () => router.replace(config.routes.public.register as PublicPath),
  isProtectedRoute: (path: string) => config.paths.protected.includes(path as ProtectedPath),
  isPublicRoute: (path: string) => config.paths.public.includes(path as PublicPath)
});

export type Navigation = ReturnType<typeof createNavigation>; 