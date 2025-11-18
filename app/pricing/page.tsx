'use client'

import Link from 'next/link'
import { CheckCircle, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import PayChanguCheckout from '@/app/components/PayChanguCheckout'

export default function PricingPage() {
  const { isAuthenticated: checkAuth } = useAuthStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-navy">SME Studio AI</span>
          </Link>
          <Link href="/signup" className="px-4 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-navy mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your business. No hidden fees.</p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Subscription */}
          <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-navy mb-2">Monthly Subscription</h3>
            <p className="text-gray-600 mb-6">Perfect for active SMEs</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-emerald">MK 25,000</span>
              <p className="text-gray-600 text-sm mt-2">/month or $30 USD</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">Unlimited documents</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">All document types</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">50+ templates</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">AI Business Coach</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">PDF, Word, PowerPoint exports</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">Sector intelligence</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald flex-shrink-0" />
                <span className="text-gray-700">WhatsApp integration</span>
              </li>
            </ul>
            {checkAuth() ? (
              <PayChanguCheckout planType="monthly" />
            ) : (
              <Link href="/signup" className="w-full block text-center px-6 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition font-semibold">
                Subscribe Now
              </Link>
            )}
          </div>

          {/* Pay Per Document */}
          <div className="border-2 border-gold rounded-xl p-8 bg-navy/5 hover:shadow-lg transition relative">
            <div className="absolute top-0 right-0 bg-gold text-navy px-4 py-1 rounded-bl-lg rounded-tr-xl text-sm font-bold">POPULAR</div>
            <h3 className="text-2xl font-bold text-navy mb-2">Pay As You Go</h3>
            <p className="text-gray-600 mb-6">For occasional users</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gold">MK 5,000</span>
              <p className="text-gray-600 text-sm mt-2">/document</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">One document at a time</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">All document types</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">50+ templates</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">PDF, Word, PowerPoint exports</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">Lifetime access</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">No subscription required</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0" />
                <span className="text-gray-700">Email support</span>
              </li>
            </ul>
            {checkAuth() ? (
              <PayChanguCheckout planType="pay-per-doc" />
            ) : (
              <Link href="/signup" className="w-full block text-center px-6 py-3 bg-gold text-navy rounded-lg hover:bg-gold/90 transition font-semibold">
                Try Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-navy mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. No questions asked, no penalties.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-navy mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept PayChangu (MWK), Flutterwave (USD, KES, NGN, ZAR), and other local payment methods.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-navy mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-navy mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can switch between plans at any time. Changes take effect immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-emerald-100 mb-8">Join thousands of African SMEs building professional documents with AI.</p>
          <Link href="/signup" className="inline-block px-8 py-3 bg-white text-emerald rounded-lg hover:bg-gray-100 transition font-semibold">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 SME Studio AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
