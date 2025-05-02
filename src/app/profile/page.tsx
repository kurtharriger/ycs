'use client';

import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Force a hard refresh to ensure auth state is cleared
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Error</h2>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Get initials from name
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{initials}</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{profile.name}</h2>
          <p className="mt-2 text-sm text-gray-600">{profile.email}</p>
          {profile.phoneNumber && (
            <p className="mt-2 text-sm text-gray-600">{profile.phoneNumber}</p>
          )}
        </div>
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}