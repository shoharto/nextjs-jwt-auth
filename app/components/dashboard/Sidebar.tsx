'use client';
import Link from 'next/link';
import { useLogoutMutation } from '@/lib/services/authApi';
import { clearAuthData } from '@/lib/utils/auth';
import { config } from '@/lib/config';

export function DashboardSidebar() {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
      window.location.href = config.routes.public.login;
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
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 