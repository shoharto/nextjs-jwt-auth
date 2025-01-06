'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/lib/services/authApi';
import { authUtils } from '@/lib/utils/auth';
import { createNavigation } from '@/lib/utils/navigation';
import { config } from '@/lib/config';
import { Button } from '@/components/ui/Button';

export function DashboardSidebar() {
  const router = useRouter();
  const navigation = createNavigation(router);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      authUtils.clearTokens();
      navigation.goToLogin();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="h-full flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4">
          <Link 
            href={config.routes.protected.profile}
            className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Profile
          </Link>
        </nav>
        <div className="p-4 border-t dark:border-gray-800">
          <Button variant="danger" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
} 