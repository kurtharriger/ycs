import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, phoneNumber } = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME);

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    // Verify the token
    const decoded = jwt.verify(token.value, jwtSecret) as {
      email: string;
      userId: string;
    };

    // Update the user and create their personal community
    const appUser = await prisma.appUser.update({
      where: { id: decoded.userId },
      data: {
        name,
        phoneNumber,
        personalCommunity: {
          create: {
            name: `${name}'s Community`,
            type: 'PERSONAL',
            description: 'Personal Community'
          }
        }
      },
    });

    // Create a new session token with updated info
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
    console.error('Error completing registration:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to complete registration' },
      { status: 500 }
    );
  }
}