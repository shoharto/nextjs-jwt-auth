'use client';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/Card';

type DashboardContentProps = {
  title: string;
  children: React.ReactNode;
};

export function DashboardContent({ title, children }: DashboardContentProps) {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <Card>{children}</Card>
    </PageLayout>
  );
} 