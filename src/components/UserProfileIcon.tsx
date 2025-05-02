'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface UserInfo {
  name: string;
  email: string;
}

export default function UserProfileIcon() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]); // Re-run when pathname changes

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
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
        alt={user.name}
        width={32}
        height={32}
        className="object-cover"
      />
    </Link>
  );
}