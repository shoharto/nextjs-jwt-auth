'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/lib/services/authApi';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import type { ApiError } from '@/lib/types/api';
import { AUTH_ROUTES, TOKEN_NAMES } from '@/lib/constants/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginFormContent() {
  const searchParams = useSearchParams();
  const [login] = useLoginMutation();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      const response = await login(data).unwrap();
      if (response.accessToken) {
        localStorage.setItem(TOKEN_NAMES.ACCESS, response.accessToken);
        localStorage.setItem(TOKEN_NAMES.REFRESH, response.refreshToken);
        window.location.href = AUTH_ROUTES.DASHBOARD;
      }
    } catch (err) {
      console.error('Login error:', err);
      const apiError = err as ApiError;
      setError(apiError.data?.message || 'Login failed. Please try again.');
    }
  };

  const registered = searchParams.get('registered');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {registered && (
        <div className="text-sm text-green-600 text-center">
          Registration successful! Please sign in.
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-500 text-center">{error}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
} 