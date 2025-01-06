'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/services/authApi';
import { AUTH_ROUTES } from '@/lib/constants/auth';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>, 
  requireAuth = true
) {
  return function AuthComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const auth = isAuthenticated();
      if (requireAuth && !auth) {
        router.replace(AUTH_ROUTES.LOGIN);
      } else if (!requireAuth && auth) {
        router.replace(AUTH_ROUTES.DASHBOARD);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
} 