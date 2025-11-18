'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/authStore'
import SubscriptionModal from '@/app/components/SubscriptionModal'
import { Lock, Zap } from 'lucide-react'

export default function GenerateLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!mounted || !isAuthenticated()) {
    return null
  }

  // Check if user has active subscription
  if (!user?.subscriptionActive) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-8 text-center">
          <Lock size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">Subscription Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need an active subscription to access document generators. Upgrade your plan to get started.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/client-dashboard')}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-navy dark:text-white font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="flex-1 bg-emerald text-white px-4 py-2 rounded-lg hover:bg-emerald/90 transition font-semibold inline-flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Upgrade
            </button>
          </div>
        </div>
        <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
      </div>
    )
  }

  return <>{children}</>
}
