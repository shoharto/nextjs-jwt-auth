'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/lib/services/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ApiError } from '@/lib/types/api';
import { config } from '@/lib/config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { styles } from '@/lib/styles';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [error, setError] = useState<string>('');
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      await register(data).unwrap();
      router.push(`${config.routes.public.login}?registered=true`);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      
      <Input<RegisterFormData>
        label="Full Name"
        name="name"
        register={registerField}
        error={errors.name?.message}
        placeholder="John Doe"
      />

      <Input<RegisterFormData>
        label="Email"
        name="email"
        type="email"
        register={registerField}
        error={errors.email?.message}
        placeholder="john@example.com"
      />

      <Input<RegisterFormData>
        label="Password"
        name="password"
        type="password"
        register={registerField}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
} 