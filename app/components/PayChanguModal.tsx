'use client'

import { useState } from 'react'
import { X, DollarSign, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

interface PayChanguModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  planName: string
}

export default function PayChanguModal({ isOpen, onClose, amount, planName }: PayChanguModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'airtel' | null>(null)

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          planName,
          paymentMethod,
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        // Redirect to PayChangu checkout
        window.location.href = data.checkoutUrl
      } else {
        toast.error(data.error || 'Payment initiation failed')
      }
    } catch (error) {
      toast.error('Failed to initiate payment')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy dark:text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Plan Details */}
        <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Plan</p>
          <p className="text-lg font-semibold text-navy dark:text-white mb-2">{planName}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-emerald">MK {amount.toLocaleString()}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-navy dark:text-white mb-3">Select Payment Method</p>
          <div className="space-y-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                paymentMethod === 'card'
                  ? 'border-emerald bg-emerald/5'
                  : 'border-gray-200 dark:border-gray-700 hover:border-emerald'
              }`}
            >
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                💳
              </div>
              <div className="text-left">
                <p className="font-semibold text-navy dark:text-white">Debit/Credit Card</p>
                <p className="text-xs text-gray-500">Visa, Mastercard</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('airtel')}
              className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                paymentMethod === 'airtel'
                  ? 'border-emerald bg-emerald/5'
                  : 'border-gray-200 dark:border-gray-700 hover:border-emerald'
              }`}
            >
              <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                📱
              </div>
              <div className="text-left">
                <p className="font-semibold text-navy dark:text-white">Airtel Money</p>
                <p className="text-xs text-gray-500">Mobile money</p>
              </div>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            ✓ Secure payment powered by PayChangu
            <br />
            ✓ Your subscription will be activated immediately after payment
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handlePayment}
            disabled={!paymentMethod || loading}
            className="w-full bg-emerald text-white py-3 rounded-lg hover:bg-emerald/90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign size={18} />
                Pay MK {amount.toLocaleString()}
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 dark:bg-gray-700 text-navy dark:text-white py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
