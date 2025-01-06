'use client';
import Image from 'next/image';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: ReactNode;
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/next.svg"
            alt="Logo"
            width={180}
            height={37}
            className="mx-auto dark:invert"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-900 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
} 