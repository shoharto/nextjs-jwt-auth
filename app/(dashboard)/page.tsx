'use client';
import { useGetProfileQuery } from '@/lib/services/authApi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { withAuth } from '@/components/hoc/withAuth';

function DashboardPage() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {profile?.name}!</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage); 