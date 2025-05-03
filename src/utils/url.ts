/**
 * Determines the base URL for the application.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL environment variable
 * 2. Development: http://localhost:3000
 * 3. Production: https://{host}
 */
export function getBaseUrl(request?: Request): string {
  // Allow override with NEXT_PUBLIC_APP_URL
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // In production, use the actual host with https
  const host = request?.headers.get('host') ?? 'yourcommunity.space';
  return `https://${host}`;
}