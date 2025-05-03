import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

interface EmailResponse {
  success: boolean;
  error?: Error;
}

const ses = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN || '',
  }),
});

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