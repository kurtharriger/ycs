'use server'

import { Resend } from 'resend'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/lib/auth'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function requestEarlyAccess() {
  const adminEmail = process.env.ADMIN_USER
  if (!adminEmail) {
    throw new Error('Admin email not configured')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)
  if (!token) {
    throw new Error('User not authenticated')
  }

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set')
  }

  // Verify the token
  const decoded = jwt.verify(token.value, jwtSecret) as {
    userId: string
    email: string
  }

  // Get user from database using user ID
  const user = await prisma.appUser.findUnique({
    where: {
      id: decoded.userId
    },
    select: {
      name: true,
      email: true
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (resend) {
    await resend.emails.send({
      from: 'noreply@yourcommunity.space',
      to: adminEmail,
      subject: 'Early Access Request',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="format-detection" content="telephone=no">
            <meta name="x-apple-disable-message-reformatting">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Early Access Request</h1>
            <p style="font-size: 16px;">
              ${user.name} (${user.email}) has requested early access to yourcommunity.space
            </p>
          </body>
        </html>
      `,
    })
  } else {
    console.log('Email not sent (RESEND_API_KEY not set). Would have sent:', {
      from: 'noreply@yourcommunity.space',
      to: adminEmail,
      subject: 'Early Access Request',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="format-detection" content="telephone=no">
            <meta name="x-apple-disable-message-reformatting">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Early Access Request</h1>
            <p style="font-size: 16px;">
              ${user.name} (${user.email}) has requested early access to yourcommunity.space
            </p>
          </body>
        </html>
      `,
    })
  }

  return { success: true }
}