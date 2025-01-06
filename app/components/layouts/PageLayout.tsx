'use client';
import { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`p-8 ${className}`}>
      {children}
    </div>
  );
} 