'use client'

import { X, Lock, Zap, Check } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { user, refreshUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubscribe = async (plan: 'monthly' | 'weekly') => {
    const amount = plan === 'monthly' ? 25000 : 10000
    const planName = plan === 'monthly' ? 'Monthly' : 'Weekly'
    
    setIsLoading(true)
    
    // Show loading toast
    const loadingToast = toast.loading(`Processing ${planName} subscription...`)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update user subscription in database
      const response = await fetch('/api/auth/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan,
          amount: amount,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        toast.error(data.error || 'Subscription failed', { id: loadingToast })
        setIsLoading(false)
        return
      }
      
      // Refresh user data from database
      await refreshUser()
      
      // Update auth store with new subscription data
      toast.success(`✅ ${planName} subscription activated! You now have unlimited access.`, { id: loadingToast })
      
      // Close modal after success
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Failed to process subscription. Please try again.', { id: loadingToast })
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald/10 rounded-lg">
              <Lock size={24} className="text-emerald" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white">Upgrade to Premium</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unlock unlimited access to all features</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Feature Highlight */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-6 border border-emerald/20">
            <div className="flex items-start gap-3">
              <Zap size={24} className="text-emerald flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-navy dark:text-white mb-2">Why Subscribe?</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    <span>Unlimited document generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    <span>Access to all 8 AI generators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    <span>Industry-specific templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <div className="border-2 border-emerald rounded-lg p-6 bg-emerald/5">
              <h4 className="text-xl font-bold text-navy dark:text-white mb-2">Monthly Plan</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Most Popular</p>
              <div className="mb-6">
                <p className="text-4xl font-bold text-emerald mb-1">MK 25,000</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
              </div>
              <button
                onClick={() => {
                  handleSubscribe('monthly')
                  onClose()
                }}
                className="w-full bg-emerald text-white py-3 rounded-lg hover:bg-emerald/90 transition font-semibold"
              >
                Subscribe Now
              </button>
            </div>

            {/* Weekly Plan */}
            <div className="border-2 border-gold rounded-lg p-6 bg-gold/5">
              <h4 className="text-xl font-bold text-navy dark:text-white mb-2">Weekly Plan</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Pay-Per-Week</p>
              <div className="mb-6">
                <p className="text-4xl font-bold text-gold mb-1">MK 10,000</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">per week</p>
              </div>
              <button
                onClick={() => {
                  handleSubscribe('weekly')
                  onClose()
                }}
                className="w-full bg-gold text-white py-3 rounded-lg hover:bg-gold/90 transition font-semibold"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p>All plans include a 7-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
