'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/lib/authStore'
import toast from 'react-hot-toast'

interface PayChanguCheckoutProps {
  planType: 'monthly' | 'pay-per-doc'
  onSuccess?: () => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    PaychanguCheckout?: (config: any) => void
  }
}

export default function PayChanguCheckout({
  planType,
  onSuccess,
  onError,
}: PayChanguCheckoutProps) {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const scriptLoaded = useRef(false)

  // Load PayChangu script
  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement('script')
    script.src = 'https://in.paychangu.com/js/popup.js'
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to continue')
      onError?.('User not authenticated')
      return
    }

    setIsLoading(true)

    try {
      // Get checkout configuration from backend
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          planType,
          email: user.email,
          firstName: user.fullName.split(' ')[0],
          lastName: user.fullName.split(' ').slice(1).join(' ') || 'User',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate payment')
      }

      // Check if PayChangu is loaded
      if (!window.PaychanguCheckout) {
        throw new Error('PayChangu service not available')
      }

      // Trigger PayChangu checkout
      window.PaychanguCheckout(data.data.checkoutConfig)

      // Listen for payment completion
      const checkPaymentStatus = setInterval(async () => {
        try {
          const statusResponse = await fetch(
            `/api/payments/callback?tx_ref=${data.data.checkoutConfig.tx_ref}`
          )
          const statusData = await statusResponse.json()

          if (statusData.data?.status === 'COMPLETED') {
            clearInterval(checkPaymentStatus)
            setIsLoading(false)
            toast.success('Payment successful!')
            onSuccess?.()
          }
        } catch (error) {
          // Continue polling
        }
      }, 2000)

      // Stop polling after 5 minutes
      setTimeout(() => {
        clearInterval(checkPaymentStatus)
        setIsLoading(false)
      }, 5 * 60 * 1000)
    } catch (error) {
      setIsLoading(false)
      const errorMessage =
        error instanceof Error ? error.message : 'Payment failed'
      toast.error(errorMessage)
      onError?.(errorMessage)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !user}
      className="w-full px-6 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : planType === 'monthly' ? 'Subscribe Now' : 'Buy Now'}
    </button>
  )
}
