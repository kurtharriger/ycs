/**
 * @file AuthContext.tsx
 * @description Provides authentication context and functionality throughout the application.
 * Manages user state, login/logout operations, and profile updates.
 *
 * @module AuthContext
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * User interface representing the authenticated user's data
 * @interface User
 */
interface User {
  name: string;
  email: string;
  phoneNumber?: string | null;
}

/**
 * Authentication context interface defining available auth operations and state
 * @interface AuthContextType
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, code: string) => Promise<{ needsProfileCompletion: boolean }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to auth context
 *
 * @returns {JSX.Element} Provider component that wraps the application with auth context
 *
 * @remarks
 * - Manages user authentication state
 * - Handles login/logout operations
 * - Provides user profile updates
 * - Automatically fetches user data on mount
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * Handles user login with email and verification code
   * @param {string} email - User's email address
   * @param {string} code - Verification code
   * @returns {Promise<{ needsProfileCompletion: boolean }>} Indicates if profile completion is needed
   * @throws {Error} If login fails
   */
  const login = async (email: string, code: string) => {
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to verify code');
      }

      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }

      return { needsProfileCompletion: data.needsProfileCompletion };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    }
  };

  /**
   * Handles user logout
   * @returns {Promise<void>}
   * @throws {Error} If logout fails
   */
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
      throw err;
    }
  };

  /**
   * Updates user profile data
   * @param {Partial<User>} userData - Partial user data to update
   */
  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * @returns {AuthContextType} Authentication context with user state and operations
 * @throws {Error} If used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}