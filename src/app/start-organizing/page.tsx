import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Organizing - Coming Soon',
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
          <p className="text-gray-600">
            For early access, please reach out to{' '}
            <a href="mailto:support@yourcommunity.space" className="text-blue-600 hover:text-blue-800">
              support@yourcommunity.space
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}