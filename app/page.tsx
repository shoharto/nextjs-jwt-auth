'use client';
import Image from 'next/image';
import Link from 'next/link';
import { withAuth } from '@/components/hoc/withAuth';
import { config } from '@/lib/config';

function Home() {
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
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to Next.js Auth
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Get started by creating an account or signing in
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href={config.routes.public.register}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </Link>
          <Link
            href={config.routes.public.login}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home, false);
