import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as {
      email: string;
      targetPath: string;
    };

    // Find the user
    const appUser = await prisma.appUser.findUnique({
      where: { email: decoded.email },
    });

    if (!appUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create a new session token
    const sessionToken = jwt.sign(
      {
        userId: appUser.id,
        email: appUser.email,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Create the response
    const response = NextResponse.json({
      success: true,
      email: appUser.email,
    });

    // Set the token in an HTTP-only cookie
    response.cookies.set(AUTH_COOKIE_NAME, sessionToken, AUTH_COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Error setting session:', error);
    return NextResponse.json(
      { error: 'Failed to set session' },
      { status: 500 }
    );
  }
}