'use client'

import Link from 'next/link'
import { ArrowRight, FileText, Zap, TrendingUp, Users, Sparkles, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-navy">SME Studio AI</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/pricing" className="px-4 py-2 text-navy dark:text-white hover:text-emerald transition">
              Pricing
            </Link>
            <Link href="/login" className="px-4 py-2 text-navy dark:text-white hover:text-emerald transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full">
            <p className="text-emerald font-semibold text-sm">🚀 AI-Powered Business Documents</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-navy dark:text-white leading-tight">
            Build Your Business
            <span className="text-emerald block">In Minutes, Not Months</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional business proposals, pitch decks, loan applications, and financial projections. Powered by AI. Built for African SMEs.
          </p>
          <div className="flex gap-4 justify-center pt-4 flex-wrap">
            <Link href="/signup" className="px-8 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition flex items-center gap-2 font-semibold">
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link href="#features" className="px-8 py-3 border-2 border-emerald text-emerald rounded-lg hover:bg-emerald/5 transition font-semibold">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold mb-2">1000+</div>
              <p className="text-gray-300">SMEs Empowered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">10M+</div>
              <p className="text-gray-300">MWK in Funding Unlocked</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">50+</div>
              <p className="text-gray-300">Document Templates</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">24/7</div>
              <p className="text-gray-300">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-navy dark:text-white text-center mb-16">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <FileText className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Business Proposals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI-generated professional proposals with market analysis, financial projections, and competitive advantage.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <TrendingUp className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Pitch Decks</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Investor-ready pitch decks with modern templates, charts, and financial highlights. Export to PDF or PowerPoint.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <Zap className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Loan Applications</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bank-specific templates for NBS, FDH, National Bank, and more. Includes repayment plans and collateral details.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <Users className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Company Profiles</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professional company profiles for tenders, clients, and partners. Showcase your team, portfolio, and services.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <TrendingUp className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Cashflow Engine</h3>
            <p className="text-gray-600 dark:text-gray-400">
              12-month cashflow projections with profit/loss analysis, breakeven calculations, and visual charts.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-emerald hover:shadow-lg transition">
            <Sparkles className="text-emerald mb-4" size={40} />
            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">AI Business Coach</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get real-time advice on pricing, marketing strategies, and business improvements powered by AI.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="bg-gray dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-navy dark:text-white text-center mb-16">
            Built for Your Industry
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['Agriculture', 'Restaurants', 'Transport', 'Retail', 'Fashion', 'ICT', 'Tourism', 'Manufacturing', 'Creative', 'Music & Events', 'Beauty & Salons', 'Trading'].map((sector) => (
              <div key={sector} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-center hover:border-emerald transition">
                <p className="text-navy dark:text-white font-semibold">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-navy dark:text-white text-center mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Monthly */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">Monthly Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald">MK 25,000</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">/month</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald" />
                <span className="text-gray-700 dark:text-gray-300">Unlimited documents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald" />
                <span className="text-gray-700 dark:text-gray-300">All templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald" />
                <span className="text-gray-700 dark:text-gray-300">AI Business Coach</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald" />
                <span className="text-gray-700 dark:text-gray-300">Priority support</span>
              </li>
            </ul>
            <Link href="/signup" className="w-full block text-center px-6 py-3 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition font-semibold">
              Get Started
            </Link>
          </div>

          {/* Pay Per Document */}
          <div className="bg-navy text-white border-2 border-gold rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Pay As You Go</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">MK 5,000</span>
              <p className="text-gray-300 text-sm mt-2">/document</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-gold" />
                <span className="text-gray-200">One document at a time</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-gold" />
                <span className="text-gray-200">All formats (PDF, Word, PPTX)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-gold" />
                <span className="text-gray-200">No subscription required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-gold" />
                <span className="text-gray-200">Lifetime access</span>
              </li>
            </ul>
            <Link href="/signup" className="w-full block text-center px-6 py-3 bg-gold text-navy rounded-lg hover:bg-gold/90 transition font-semibold">
              Try Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Business?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of African SMEs creating professional documents with AI.
          </p>
          <Link href="/signup" className="inline-block px-8 py-3 bg-white text-emerald rounded-lg hover:bg-gray-100 transition font-semibold">
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition">Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SME Studio AI. Smart Tools for African Business Success.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
