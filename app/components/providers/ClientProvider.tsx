'use client';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useEffect, useState } from 'react';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
} 