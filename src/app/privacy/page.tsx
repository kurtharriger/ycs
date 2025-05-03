import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Your Community Space',
  description: 'Privacy policy for Your Community Space',
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
      <p className="mb-8">
        YourCommunity.Space (&quot;YCS&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your information when you use our platform.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Account Information: When you sign up, we collect your name and email address.</li>
          <li>Event Participation: We collect data related to events you create, join, or attend.</li>
          <li>Usage Data: We may collect technical data such as your IP address, device information, and interaction with the platform.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To operate and improve the platform</li>
          <li>To send account-related notifications and platform updates</li>
          <li>To connect you with event organizers and attendees</li>
        </ul>
        <p className="mb-4">
          We do not sell your email address or use it to market third-party products.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Visibility and Sharing</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Creating an Event: Your name will be publicly visible as the host of the event.</li>
          <li>Joining an Event: Your name will be shared with the event organizer and other attendees.</li>
          <li>Community Interaction: Participation in discussions or public areas of the site may display your name.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Your Choices</h2>
        <p className="mb-4">You may:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Update your profile and notification preferences</li>
          <li>Delete your account at any time, which will remove your personal information from our platform (excluding required logs for legal compliance)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
        <p className="mb-4">
          We take appropriate security measures to protect your information from unauthorized access, use, or disclosure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this policy to reflect platform improvements or legal requirements. We&apos;ll notify you of significant changes via email or in-platform notification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          For any questions or concerns, please contact us at:
        </p>
        <p className="mb-4">
          Email: support@yourcommunity.space
        </p>
      </section>
    </div>
  )
}