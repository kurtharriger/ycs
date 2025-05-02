export const AUTH_COOKIE_NAME = 'auth-token';
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
};

export const AUTH_COOKIE_CLEAR_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  maxAge: 0, // Expire immediately
};