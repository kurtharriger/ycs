/**
 * @file LogoutButton.tsx
 * @description A simple logout button component that handles user logout functionality.
 * Makes a POST request to the logout endpoint and forces a page refresh to clear
 * authentication state.
 *
 * @component
 * @example
 * ```tsx
 * <LogoutButton />
 * ```
 */

'use client';

/**
 * LogoutButton Component
 *
 * @returns {JSX.Element} A button that triggers the logout process
 *
 * @remarks
 * - Makes a POST request to /api/auth/logout
 * - Forces a hard page refresh after successful logout
 * - Handles error cases with console logging
 * - Uses Tailwind CSS for styling
 */
export default function LogoutButton() {
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
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-primary-600 text-sm sm:text-base px-2 py-1"
    >
      Logout
    </button>
  );
}