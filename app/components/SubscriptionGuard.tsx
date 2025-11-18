'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/authStore'
import SubscriptionModal from './SubscriptionModal'

interface SubscriptionGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function SubscriptionGuard({ children, fallback }: SubscriptionGuardProps) {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Check if user has active subscription
  const hasSubscription = user?.subscriptionActive === true

  if (!hasSubscription) {
    return (
      <>
        {fallback || (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This feature requires an active subscription
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald text-white px-6 py-2 rounded-lg hover:bg-emerald/90 transition"
            >
              Upgrade Now
            </button>
          </div>
        )}
        <SubscriptionModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    )
  }

  return <>{children}</>
}
