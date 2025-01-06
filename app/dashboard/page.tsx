'use client';
import { useGetProfileQuery } from '@/lib/services/authApi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { withAuth } from '@/components/hoc/withAuth';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

function DashboardPage() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardContent title={`Welcome, ${profile?.name}!`}>
      <p className="text-gray-600 dark:text-gray-400">
        Select an option from the sidebar to get started.
      </p>
    </DashboardContent>
  );
}

export default withAuth(DashboardPage); 