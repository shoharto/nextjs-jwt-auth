'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/lib/services/authApi';
import { useState } from 'react';
import type { ApiError } from '@/lib/types/api';
import { authUtils } from '@/lib/utils/auth';
import { createNavigation } from '@/lib/utils/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { styles } from '@/lib/styles';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const navigation = createNavigation(router);
  const [login] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      authUtils.setTokens(response.accessToken, response.refreshToken);
      navigation.goToDashboard();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.data?.message || 'An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      
      <Input<LoginFormData>
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
        placeholder="john@example.com"
      />

      <Input<LoginFormData>
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
} 