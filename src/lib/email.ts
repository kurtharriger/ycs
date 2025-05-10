/**
 * @file email.ts
 * @description Email sending functionality using AWS SES
 *
 * @module Email
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

/**
 * Parameters for sending an email
 * @interface EmailParams
 * @property {string} to - Recipient email address
 * @property {string} subject - Email subject
 * @property {string} body - Email body content
 */
interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

/**
 * Response from email sending attempt
 * @interface EmailResponse
 * @property {boolean} success - Whether the email was sent successfully
 * @property {Error} [error] - Error object if sending failed
 */
interface EmailResponse {
  success: boolean;
  error?: Error;
}

/**
 * AWS SES client instance
 * @constant {SESClient}
 *
 * @remarks
 * - Configured with AWS credentials from environment variables
 * - Uses OIDC for secure credential management
 */
const ses = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN || '',
  }),
});

/**
 * Sends an email using AWS SES
 * @param {EmailParams} params - Email parameters
 * @returns {Promise<EmailResponse>} Result of the email sending attempt
 *
 * @example
 * ```typescript
 * const result = await sendEmail({
 *   to: 'user@example.com',
 *   subject: 'Welcome!',
 *   body: 'Welcome to YourCommunity.Space'
 * });
 * ```
 */
export async function sendEmail({
  to,
  subject,
  body,
}: EmailParams): Promise<EmailResponse> {
  const params = {
    Source: 'YourCommunity.Space <noreply@yourcommunity.space>',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: body,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    await ses.send(new SendEmailCommand(params));
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error as Error };
  }
}