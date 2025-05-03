import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Organizing - YourCommunity.Space',
  description: 'Start organizing events in your community',
}

export default function StartOrganizingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600 mb-6">
            We&apos;re working hard to bring you the best event organization tools.
          </p>
          <p className="text-gray-600 mb-6">
            Events are currently by invite only. Request early access to become an organizer.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:support@yourcommunity.space?subject=Request%20Early%20Access%20to%20Organize%20Events"
              className="block w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Request Early Access
            </a>
            <p className="text-sm text-gray-500">
              Our team will review your request and get back to you soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}