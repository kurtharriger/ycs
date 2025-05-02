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
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="format-detection" content="telephone=no">
              <meta name="x-apple-disable-message-reformatting">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-size: 24px; margin-bottom: 20px;">Your verification code</h1>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 16px;">Your verification code is:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #000; margin: 10px 0;">
                  <span data-verification-code="${code}">${code}</span>
                </div>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
              </div>

              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </body>
          </html>
        `,
      });
    } else {
      console.log('Email not sent (RESEND_API_KEY not set). Would have sent:', {
        from: 'noreply@yourcommunity.space',
        to: email,
        subject: 'Your verification code',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="format-detection" content="telephone=no">
              <meta name="x-apple-disable-message-reformatting">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-size: 24px; margin-bottom: 20px;">Your verification code</h1>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 16px;">Your verification code is:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #000; margin: 10px 0;">
                  <span data-verification-code="${code}">${code}</span>
                </div>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
              </div>

              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </body>
          </html>
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