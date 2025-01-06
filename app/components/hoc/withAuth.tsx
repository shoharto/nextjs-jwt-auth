'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/services/authApi';
import { config } from '@/lib/config';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requireAuth: boolean = true
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const isAuthed = isAuthenticated();

    useEffect(() => {
      if (requireAuth && !isAuthed) {
        router.replace(config.routes.public.login);
      } else if (!requireAuth && isAuthed) {
        router.replace(config.routes.protected.dashboard);
      }
    }, [router, isAuthed]);

    if (requireAuth && !isAuthed) {
      return null;
    }

    if (!requireAuth && isAuthed) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 