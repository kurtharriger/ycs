import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_CLEAR_OPTIONS } from '@/lib/auth';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the auth token cookie
    response.cookies.set(AUTH_COOKIE_NAME, '', AUTH_COOKIE_CLEAR_OPTIONS);

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}