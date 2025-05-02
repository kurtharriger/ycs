import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Generate a 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a 6-digit code
    const code = generateCode();

    // Store the code in the database with expiration and attempt count
    await prisma.authCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        attempts: 0,
      },
    });

    // Send email if RESEND_API_KEY is set, otherwise log to console
    if (resend) {
      await resend.emails.send({
        from: 'noreply@yourcommunity.space',
        to: email,
        subject: 'Your verification code',
        html: `
          <h1>Your verification code</h1>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        `,
      });
    } else {
      console.log('Email not sent (RESEND_API_KEY not set). Would have sent:', {
        from: 'noreply@yourcommunity.space',
        to: email,
        subject: 'Your verification code',
        html: `
          <h1>Your verification code</h1>
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      code: process.env.NODE_ENV === 'development' ? code : undefined
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}