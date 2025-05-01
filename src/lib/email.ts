import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

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
}: {
  to: string;
  subject: string;
  body: string;
}) {
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
    return { success: false, error };
  }
}