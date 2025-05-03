import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Find the code
    const authCode = await prisma.authCode.findFirst({
      where: {
        email,
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
    });

    if (!authCode) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      );
    }

    // Increment attempts first
    const updatedAuthCode = await prisma.authCode.update({
      where: { id: authCode.id },
      data: { attempts: authCode.attempts + 1 },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Verification attempt:', {
        email,
        code,
        storedCode: authCode.code,
        attempts: updatedAuthCode.attempts,
      });
    }

    // Check if too many attempts
    if (updatedAuthCode.attempts > 3) {
      // Delete the code after too many attempts
      await prisma.authCode.delete({
        where: { id: authCode.id },
      });
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new code.' },
        { status: 400 }
      );
    }

    // If code doesn't match, return error but keep the attempts counter
    if (authCode.code !== code) {
      return NextResponse.json(
        { error: 'Invalid code' },
        { status: 400 }
      );
    }

    // Get or create user
    let appUser = await prisma.appUser.findUnique({
      where: { email },
    });

    if (!appUser) {
      // Create new user
      appUser = await prisma.appUser.create({
        data: {
          email,
          emailVerified: new Date(), // Since they just verified their email
          role: email === process.env.ADMIN_USER ? 'ADMIN' : 'MEMBER',
          status: 'ACTIVE'
        },
      });
    } else if (!appUser.emailVerified) {
      // Update existing user's email verification status
      appUser = await prisma.appUser.update({
        where: { id: appUser.id },
        data: {
          emailVerified: new Date(),
          // Update role if this is the admin user
          ...(email === process.env.ADMIN_USER ? { role: 'ADMIN' } : {})
        },
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    // Create a session token
    const token = jwt.sign(
      {
        email,
        userId: appUser.id,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Set the cookie
    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Delete the used code
    await prisma.authCode.delete({
      where: { id: authCode.id },
    });

    // Check if user needs to complete their profile
    const needsProfileCompletion = !appUser.name || !appUser.emailVerified;

    return NextResponse.json({
      success: true,
      user: {
        id: appUser.id,
        email: appUser.email,
        name: appUser.name,
      },
      needsProfileCompletion,
      token,
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}