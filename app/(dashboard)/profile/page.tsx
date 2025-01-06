'use client';
import { useGetProfileQuery } from '@/lib/services/authApi';
import { withAuth } from '@/components/hoc/withAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

function ProfilePage() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <p className="mt-1">{profile?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="mt-1">{profile?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage); 