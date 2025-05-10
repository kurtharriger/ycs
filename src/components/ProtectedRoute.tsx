/**
 * @file ProtectedRoute.tsx
 * @description A wrapper component that protects routes requiring authentication.
 * Redirects unauthenticated users to the login page and shows a loading state
 * while checking authentication status.
 *
 * @component
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <YourProtectedComponent />
 * </ProtectedRoute>
 * ```
 */

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ProtectedRoute Component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be protected
 *
 * @returns {JSX.Element} Renders children if authenticated, loading spinner while checking,
 * or redirects to login if unauthenticated
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}