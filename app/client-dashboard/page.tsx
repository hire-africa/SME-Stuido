'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, FileText, LogOut, Menu, X, Settings, 
  TrendingUp, Clock, Eye, Download, Trash2,
  Zap, ArrowRight, 
  BookOpen, Presentation, Building2, Calculator, Palette, Briefcase, Check, Lock, RefreshCw
} from 'lucide-react'
import { useAuthStore } from '@/lib/authStore'
import SubscriptionModal from '@/app/components/SubscriptionModal'
import toast from 'react-hot-toast'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, logout, user, refreshUser } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [userProjects, setUserProjects] = useState<any[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/login')
    }

    // Check for payment status in URL
    const searchParams = new URLSearchParams(window.location.search)
    const paymentStatus = searchParams.get('payment')

    if (paymentStatus === 'success') {
      toast.success('Payment successful! Your subscription is now active.')
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else if (paymentStatus === 'failed') {
      toast.error('Payment failed. Please try again.')
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Fetch user projects
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token : ''}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setUserProjects(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    if (user?.id) {
      fetchProjects()
    }

    // Scripts are loaded by PayChanguProvider in layout
  }, [isAuthenticated, router, user?.id])

  if (!mounted || !isAuthenticated()) {
    return null
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleRefreshUser = async () => {
    setIsRefreshing(true)
    const success = await refreshUser()
    setIsRefreshing(false)
    
    if (success) {
      toast.success('Profile updated!')
    } else {
      toast.error('Failed to refresh profile')
    }
  }

  const documentGenerators = [
    { 
      id: 'proposal', 
      name: 'Business Proposal', 
      icon: BookOpen,
      description: 'Full proposal with 10+ sections',
      features: ['Executive Summary', 'Market Analysis', 'Financials', 'Timeline']
    },
    { 
      id: 'pitch', 
      name: 'Pitch Deck', 
      icon: Presentation,
      description: '10-12 investor-ready slides',
      features: ['Modern Templates', 'Charts & Graphs', 'Financial Highlights', 'Use of Funds']
    },
    { 
      id: 'loan', 
      name: 'Loan Application', 
      icon: Building2,
      description: 'Bank-specific templates',
      features: ['NBS', 'FDH', 'National Bank', 'Standard Bank']
    },
    { 
      id: 'profile', 
      name: 'Company Profile', 
      icon: Briefcase,
      description: 'For tenders & clients',
      features: ['About Us', 'Team', 'Portfolio', 'Services']
    },
    { 
      id: 'cashflow', 
      name: 'Cashflow Engine', 
      icon: BarChart3,
      description: '12-month projections',
      features: ['Revenue', 'Costs', 'Breakeven', '3-Year Forecast']
    },
    { 
      id: 'pricing', 
      name: 'Auto-Pricing Tool', 
      icon: Calculator,
      description: 'Data-driven pricing',
      features: ['Industry Benchmarks', 'Markups', 'Packages', 'Discounts']
    },
    { 
      id: 'summary', 
      name: 'Executive Summary', 
      icon: FileText,
      description: 'Powerful 1-page summary',
      features: ['Investors', 'Banks', 'Donors', 'Boards']
    },
    { 
      id: 'branding', 
      name: 'Branding Kit', 
      icon: Palette,
      description: 'Complete brand strategy',
      features: ['Logo Concepts', 'Color Palette', 'Tagline', 'Templates']
    },
  ]

  const sectors = [
    'Agriculture', 'Restaurants', 'Transport', 'Hardware', 'Retail', 
    'Fashion', 'ICT', 'Fintech', 'Tourism', 'Manufacturing', 
    'Creative', 'Music', 'Beauty', 'Cooperatives', 'Wholesale'
  ]

  const recentProjects = [
    { id: 1, name: 'My Farm Business Proposal', type: 'Business Proposal', sector: 'Agriculture', date: '12/28/2025', status: 'Completed', downloads: 2 },
    { id: 2, name: 'Tech Startup Pitch', type: 'Pitch Deck', sector: 'ICT', date: '12/26/2025', status: 'Completed', downloads: 1 },
    { id: 3, name: 'Restaurant Cashflow', type: 'Cashflow Engine', sector: 'Restaurants', date: '12/24/2025', status: 'Draft', downloads: 0 },
    { id: 4, name: 'Bank Loan Application', type: 'Loan Application', sector: 'Retail', date: '12/22/2025', status: 'Completed', downloads: 3 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-navy text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-40`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ✦
              </div>
              <span className="text-lg font-bold text-white">SME Studio</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-emerald text-white' : 'hover:bg-gray-800'}`}>
            <BarChart3 size={20} />
            {sidebarOpen && <span className="font-medium">Dashboard</span>}
          </button>
          <button 
            onClick={() => setActiveTab('generate')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'generate' ? 'bg-emerald text-white' : 'hover:bg-gray-800'}`}>
            <Zap size={20} />
            {sidebarOpen && <span>Generate</span>}
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'projects' ? 'bg-emerald text-white' : 'hover:bg-gray-800'}`}>
            <FileText size={20} />
            {sidebarOpen && <span>My Documents</span>}
          </button>
          <button 
            onClick={() => setActiveTab('sectors')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'sectors' ? 'bg-emerald text-white' : 'hover:bg-gray-800'}`}>
            <TrendingUp size={20} />
            {sidebarOpen && <span>Sector Templates</span>}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'settings' ? 'bg-emerald text-white' : 'hover:bg-gray-800'}`}>
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-white">
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold text-navy dark:text-white">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'generate' && 'Generate Documents'}
              {activeTab === 'projects' && 'My Documents'}
              {activeTab === 'sectors' && 'Sector Templates'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user?.fullName}! Create professional documents with AI</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefreshUser}
              disabled={isRefreshing}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
              title="Refresh profile data"
            >
              <RefreshCw size={20} className={`text-gray-600 dark:text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.fullName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Documents Created</p>
                    <FileText size={18} className="text-emerald" />
                  </div>
                  <p className="text-3xl font-bold text-navy dark:text-white">{userProjects.length}</p>
                  <p className="text-xs text-green-600 mt-2">Total documents</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                    <Download size={18} className="text-emerald" />
                  </div>
                  <p className="text-3xl font-bold text-navy dark:text-white">{userProjects.filter(p => p.status === 'COMPLETED').length}</p>
                  <p className="text-xs text-green-600 mt-2">Ready to download</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Business Name</p>
                    <Briefcase size={18} className="text-gold" />
                  </div>
                  <p className="text-lg font-bold text-navy dark:text-white truncate">{user?.businessName}</p>
                  <p className="text-xs text-gray-500 mt-2">Your company</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subscription</p>
                    <Clock size={18} className={user?.subscriptionActive ? 'text-emerald' : 'text-red-500'} />
                  </div>
                  <p className={`text-3xl font-bold ${user?.subscriptionActive ? 'text-emerald dark:text-emerald-400' : 'text-red-500'}`}>
                    {user?.subscriptionActive ? 'Active' : 'Inactive'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {user?.subscriptionActive && user?.subscriptionEndDate 
                      ? `Renews ${new Date(user.subscriptionEndDate).toLocaleDateString()}`
                      : 'No active subscription'}
                  </p>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-navy dark:text-white mb-6">Recent Documents</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Sector</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProjects.map((project) => (
                        <tr key={project.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{project.name}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.type}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.sector}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 flex gap-2">
                            <button className="text-emerald hover:underline text-xs flex items-center gap-1">
                              <Eye size={14} /> View
                            </button>
                            <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                              <Download size={14} /> Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* GENERATE TAB */}
          {activeTab === 'generate' && (
            <>
              {!user?.subscriptionActive ? (
                <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-300 rounded-lg p-8 text-center">
                  <Lock size={48} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Subscription Required</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">You need an active subscription to access document generators</p>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="bg-emerald text-white px-8 py-3 rounded-lg hover:bg-emerald/90 transition font-semibold inline-flex items-center gap-2"
                  >
                    <Zap size={20} />
                    Upgrade Now
                  </button>
                </div>
              ) : (
                <>
                  {/* Subscription Status Banner */}
                  <div className="mb-8 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-2 border-emerald rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-navy dark:text-white mb-1">Unlimited Access</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Your subscription includes unlimited access to all document generators</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.subscriptionPlan === 'monthly' ? 'Monthly' : 'Weekly'} Plan</p>
                        <p className="text-2xl font-bold text-emerald">MK {user?.subscriptionPlan === 'monthly' ? '25,000' : '10,000'}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.subscriptionEndDate ? `Renews ${new Date(user.subscriptionEndDate).toLocaleDateString()}` : 'Active'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Select a document type to generate with AI. Answer simple questions and get professional documents in minutes.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {documentGenerators.map((generator) => {
                      const IconComponent = generator.icon
                      const getGeneratorPath = (id: string) => {
                        switch (id) {
                          case 'proposal':
                            return '/generate/proposal'
                          case 'pitch':
                            return '/generate/pitch-deck'
                          case 'profile':
                            return '/generate/company-profile'
                          case 'loan':
                            return '/generate/loan-application'
                          default:
                            return '#'
                        }
                      }
                      
                      const path = getGeneratorPath(generator.id)
                      const isAvailable = path !== '#'
                      
                      return (
                        <button
                          key={generator.id}
                          onClick={() => {
                            if (isAvailable) {
                              router.push(path)
                            } else {
                              toast.success(`${generator.name} coming soon...`)
                            }
                          }}
                          className={`bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-emerald hover:shadow-xl transition text-left group ${
                            !isAvailable ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="mb-4 inline-block p-3 bg-emerald/10 rounded-lg group-hover:bg-emerald/20 transition">
                            <IconComponent size={32} className="text-emerald" />
                          </div>
                          <h3 className="font-bold text-navy dark:text-white mb-1 text-lg">{generator.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{generator.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {isAvailable ? 'Included in subscription' : 'Coming soon'}
                            </span>
                            <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald transition" />
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Sector Templates Section */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">Choose Your Sector</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Get industry-specific insights, pricing norms, and growth opportunities</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {sectors.map((sector) => (
                        <button
                          key={sector}
                          onClick={() => toast.success(`Loading ${sector} template...`)}
                          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-emerald hover:shadow-lg transition text-center group"
                        >
                          <p className="font-semibold text-navy dark:text-white text-sm group-hover:text-emerald transition">{sector}</p>
                          <p className="text-xs text-gray-500 mt-1">Industry insights</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-navy dark:text-white mb-6">All Your Documents</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Sector</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Created</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{project.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.type}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.sector}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <button className="text-emerald hover:underline text-xs flex items-center gap-1">
                            <Eye size={14} /> View
                          </button>
                          <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                            <Download size={14} /> Download
                          </button>
                          <button className="text-red-600 hover:underline text-xs">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTORS TAB */}
          {activeTab === 'sectors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sectors.map((sector) => (
                  <div key={sector} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">{sector}</h3>
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Industry Insights</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Market trends, opportunities, and challenges specific to {sector}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Local Pricing Norms</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Competitive pricing benchmarks for your sector</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Growth Opportunities</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Expansion strategies and market gaps</p>
                      </div>
                    </div>
                    <button className="w-full bg-emerald text-white py-2 rounded-lg hover:bg-emerald/90 transition text-sm font-medium">
                      Use {sector} Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Subscription Plans Section */}
              <div>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Choose Your Plan</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Select a subscription plan to get unlimited access to all document generators</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Monthly Plan */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald transition">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-navy dark:text-white">Monthly Plan</h4>
                      <span className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-semibold">Popular</span>
                    </div>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-emerald mb-1">MK 25,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-emerald flex-shrink-0" />
                        <span>Unlimited document generation</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-emerald flex-shrink-0" />
                        <span>All 8 AI generators</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-emerald flex-shrink-0" />
                        <span>Sector templates</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-emerald flex-shrink-0" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-emerald flex-shrink-0" />
                        <span>Cancel anytime</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="w-full bg-emerald text-white py-3 rounded-lg hover:bg-emerald/90 transition font-semibold"
                    >
                      Subscribe Now
                    </button>
                  </div>

                  {/* Weekly Plan */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-gold transition">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-navy dark:text-white">Weekly Plan</h4>
                      <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-semibold">Pay-Per-Week</span>
                    </div>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gold mb-1">MK 10,000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">per week</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-gold flex-shrink-0" />
                        <span>Unlimited document generation</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-gold flex-shrink-0" />
                        <span>All 8 AI generators</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-gold flex-shrink-0" />
                        <span>Sector templates</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-gold flex-shrink-0" />
                        <span>Basic support</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Check size={18} className="text-gold flex-shrink-0" />
                        <span>Flexible billing</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="w-full bg-gold text-white py-3 rounded-lg hover:bg-gold/90 transition font-semibold"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Settings Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-navy dark:text-white mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Full Name</label>
                    <input type="text" defaultValue={user?.fullName} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Business Name</label>
                    <input type="text" defaultValue={user?.businessName} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Email</label>
                    <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Phone</label>
                    <input type="tel" defaultValue={user?.phone || ''} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald" />
                  </div>
                  <button className="px-6 py-2 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition font-medium">Save Changes</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
    </div>
  )
}
