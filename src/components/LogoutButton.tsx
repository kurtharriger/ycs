'use client';

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