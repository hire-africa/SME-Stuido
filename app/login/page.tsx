'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Sparkles, Loader } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isAdmin } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        router.push('/admin-dashboard')
      } else {
        router.push('/client-dashboard')
      }
    }
  }, [isAuthenticated, isAdmin, router])

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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const success = await login(formData.email, formData.password)
      
      if (success) {
        toast.success('Login successful!')
        // Small delay to ensure state is updated
        setTimeout(() => {
          const user = useAuthStore.getState().user
          if (user?.role === 'ADMIN') {
            router.push('/admin-dashboard')
          } else {
            router.push('/client-dashboard')
          }
        }, 500)
      } else {
        const authError = useAuthStore.getState().error
        setError(authError || 'Login failed')
        toast.error(authError || 'Login failed')
        setLoading(false)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      toast.error(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-navy">SME Studio AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-navy mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="#" className="text-sm text-emerald hover:underline">
              Forgot password?
            </Link>
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
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-emerald font-semibold hover:underline">
              Sign up here
            </Link>
          </p>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-800">Email: demo@smeai.com</p>
          <p className="text-xs text-blue-800">Password: demo123456</p>
        </div>
      </div>
    </div>
  )
}
