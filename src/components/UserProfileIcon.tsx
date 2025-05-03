'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function UserProfileIcon() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show logout button on complete-registration page
  if (pathname === '/complete-registration') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="text-gray-600 hover:text-primary-600 text-sm sm:text-base px-2 py-1 disabled:opacity-50"
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-gray-600 hover:text-primary-600 text-sm sm:text-base px-2 py-1"
      >
        Login
      </Link>
    );
  }

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  if (!user.name) {
    return (
      <Link
        href="/complete-registration"
        className="text-gray-600 hover:text-primary-600 text-sm sm:text-base px-2 py-1"
      >
        Complete Profile
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      <Image
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
        alt={`${user.name} profile picture`}
        width={32}
        height={32}
        className="object-cover"
      />
    </Link>
  );
}