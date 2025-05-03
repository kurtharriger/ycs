import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Your Community Space',
  description: 'Terms of service for Your Community Space',
}

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service for YourCommunity.Space (YCS)</h1>
      <p className="mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
      <p className="mb-8">
        Welcome to YourCommunity.Space (&quot;YCS&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website, services, and platform. By using YCS, you agree to these Terms.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Your Account</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You must be at least 13 years old to use YCS.</li>
          <li>You are responsible for your account and any activity under it.</li>
          <li>You agree to provide accurate information and keep it up to date.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Using the Platform</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You may use YCS to create, discover, and participate in community events.</li>
          <li>By creating an event, your name will be publicly visible as the host.</li>
          <li>When you join an event, your name will be shared with the organizer and other attendees.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Community Guidelines</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Treat other members with respect.</li>
          <li>Do not post or promote content that is unlawful, discriminatory, threatening, or otherwise harmful.</li>
          <li>Events must comply with local laws and community standards.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Content and Ownership</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You retain ownership of content you post, but grant YCS a license to display, share, and promote it on the platform.</li>
          <li>YCS reserves the right to remove or moderate content that violates these Terms or disrupts the community.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Email and Notifications</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>We may email you regarding your account, event activity, or platform updates.</li>
          <li>Your email address will never be sold or used to market third-party products.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Limited Liability and Use at Your Own Risk</h2>
        <p className="mb-4">
          YCS provides tools for members to connect through events, but we <strong>do not vet, screen, or perform background checks</strong> on event organizers or attendees. Please remember that all in-person interactions carry some level of risk.
        </p>
        <p className="mb-4">
          We encourage you to use discretion and good judgment when participating in events or communicating with others through the platform. YCS is <strong>not responsible for any disputes, injuries, losses, or damages</strong> that may occur as a result of your participation in events or interactions with other members.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You may delete your account at any time by contacting support@yourcommunity.space.</li>
          <li>We may suspend or terminate accounts that violate these Terms or abuse the platform.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Dispute Resolution</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Any disputes or claims related to your use of YCS will be resolved exclusively through binding arbitration, rather than in court.</li>
          <li>You waive the right to bring or join any class-action lawsuits against YCS.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
        <p className="mb-4">
          YCS is provided &quot;as is.&quot; While we strive to maintain reliable service, we make no guarantees about availability, accuracy, or safety. Participation in events is at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Significant updates will be communicated via email or in-platform notice. Continued use of YCS after such updates constitutes acceptance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p className="mb-4">
          For questions, account deletion, or data access requests, please contact us at:
        </p>
        <p className="mb-4">
          support@yourcommunity.space
        </p>
      </section>
    </div>
  )
}