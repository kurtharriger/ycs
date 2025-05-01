import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST() {
  try {
    const result = await sendEmail({
      to: 'kurtharriger@gmail.com',
      subject: 'New Interest in YourCommunity.Space',
      body: `Someone has expressed interest in YourCommunity.Space by clicking the "Get Started" button.

Time: ${new Date().toISOString()}
`,
    });

    if (!result.success) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { message: 'Thank you for your interest!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling interest:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}