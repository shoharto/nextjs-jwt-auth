'use client';
import { withAuth } from '@/components/hoc/withAuth';
import { config } from '@/lib/config';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

function Home() {
  return (
    <AuthLayout
      title="Welcome to Next.js Auth"
      subtitle="Get started by creating an account or signing in"
    >
      <div className="space-y-4">
        <Link href={config.routes.public.register}>
          <Button>Create Account</Button>
        </Link>
        <Link href={config.routes.public.login}>
          <Button variant="secondary">Sign In</Button>
        </Link>
      </div>
    </AuthLayout>
  );
}

export default withAuth(Home, false);
