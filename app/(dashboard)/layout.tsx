'use client';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { withAuth } from '@/components/hoc/withAuth';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-950">
        {children}
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);