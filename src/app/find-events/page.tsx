'use client'

import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function FindEventsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
            <p className="text-gray-600 mb-6">
              We&apos;re working hard to bring you the best event discovery experience.
            </p>
            <p className="text-gray-600 mb-6">
              Events are currently by invite only. For access reach out to your community organizer or{' '}
              <Link href="/start-organizing" className="text-primary-600 hover:text-primary-800">
                start your own
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}