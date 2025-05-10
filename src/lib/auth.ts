/**
 * @file auth.ts
 * @description Authentication utility functions and constants for managing auth cookies
 *
 * @module Auth
 */

/**
 * Name of the authentication cookie used throughout the application
 * @constant {string}
 */
export const AUTH_COOKIE_NAME = 'auth-token';

/**
 * Configuration options for the authentication cookie
 * @constant {Object}
 * @property {boolean} httpOnly - Prevents JavaScript access to the cookie
 * @property {boolean} secure - Only sends cookie over HTTPS in production
 * @property {string} sameSite - Prevents CSRF attacks
 * @property {string} path - Cookie path
 * @property {number} maxAge - Cookie expiration time in seconds (7 days)
 */
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
};

/**
 * Configuration options for clearing the authentication cookie
 * @constant {Object}
 * @property {number} maxAge - Set to 0 to expire immediately
 */
export const AUTH_COOKIE_CLEAR_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  maxAge: 0, // Expire immediately
};