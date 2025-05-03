'use client'

import { requestEarlyAccess } from '../actions'
import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function StartOrganizingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const result = await requestEarlyAccess()
      if (result.success) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Failed to submit request:', error)
      setError('Failed to submit request. Please try again.')
    }
  }

  return (
    <ProtectedRoute>
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
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                  Thanks for your interest! We will reach out when your access is granted.
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    className="block w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Request Early Access
                  </button>
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}