'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Building2, Phone, ArrowRight, Sparkles, Loader } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const { signup, isAuthenticated } = useAuthStore()

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/client-dashboard')
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.fullName || !formData.businessName || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.fullName,
        formData.businessName,
        formData.phone
      )

      if (success) {
        toast.success('Account created successfully!')
        router.push('/client-dashboard')
      } else {
        const authError = useAuthStore.getState().error
        setError(authError || 'Signup failed')
        toast.error(authError || 'Signup failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-navy dark:text-white">SME Studio AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Start building professional documents in minutes</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Business Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="My Awesome Business"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+265 9XX XXX XXX"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald text-white py-2 rounded-lg font-semibold hover:bg-emerald/90 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald mb-1">7</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Document Types</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald mb-1">50+</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Templates</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald mb-1">24/7</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}
