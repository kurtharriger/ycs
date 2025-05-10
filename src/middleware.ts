/**
 * @file middleware.ts
 * @description Next.js middleware configuration file
 *
 * @module Middleware
 *
 * @remarks
 * Authentication protection is now handled in the routes using the useAuth hook
 * instead of middleware. This provides more granular control over protected routes
 * and better integration with the React component lifecycle.
 */

/**
 * Next.js middleware configuration
 * @constant {Object}
 * @property {string[]} matcher - Array of paths to match (empty as auth is handled in routes)
 */
export const config = {
  matcher: [] // No middleware needed
}