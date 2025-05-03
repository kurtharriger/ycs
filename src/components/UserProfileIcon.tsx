'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfileIcon() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't show anything on the complete-registration page
  if (pathname === '/complete-registration') {
    return null;
  }

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
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

  return (
    <Link
      href="/profile"
      className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      <Image
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=6366f1&color=fff`}
        alt={`${user.name || 'User'} profile picture`}
        width={32}
        height={32}
        className="object-cover"
      />
    </Link>
  );
}