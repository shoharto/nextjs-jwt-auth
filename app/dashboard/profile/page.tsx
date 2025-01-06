'use client';
import { useGetProfileQuery } from '@/lib/services/authApi';
import { withAuth } from '@/components/hoc/withAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

function ProfilePage() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardContent title="Profile">
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
    </DashboardContent>
  );
}

export default withAuth(ProfilePage); 