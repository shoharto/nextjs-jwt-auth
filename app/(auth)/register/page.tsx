'use client';
import RegisterForm from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { withAuth } from '@/components/hoc/withAuth';
import { config } from '@/lib/config';
import { AuthLayout } from '@/components/layouts/AuthLayout';

function RegisterPage() {
  return (
    <AuthLayout 
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link 
            href={config.routes.public.login}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default withAuth(RegisterPage, false); 