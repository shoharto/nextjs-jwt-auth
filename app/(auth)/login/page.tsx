'use client';
import LoginForm from '@/components/forms/LoginForm';
import Link from 'next/link';
import { withAuth } from '@/components/hoc/withAuth';
import { config } from '@/lib/config';
import { AuthLayout } from '@/components/layouts/AuthLayout';

function LoginPage() {
  return (
    <AuthLayout 
      title="Sign in to your account"
      subtitle={
        <>
          Don&apos;t have an account?{' '}
          <Link 
            href={config.routes.public.register}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default withAuth(LoginPage, false); 