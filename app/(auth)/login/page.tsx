'use client';
import LoginForm from '@/components/forms/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import { withAuth } from '@/components/hoc/withAuth';
import { config } from '@/lib/config';

function LoginPage() {
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link 
              href={config.routes.public.register}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default withAuth(LoginPage, false); 