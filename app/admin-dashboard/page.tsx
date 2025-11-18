'use client'

import { useState } from 'react'
import { 
  BarChart3, Users, DollarSign, FileText, LogOut, Menu, X, Settings, 
  TrendingUp, CheckCircle, Clock, Trash2, Edit, Eye
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Monthly', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Pay-per-doc', status: 'active', joinDate: '2025-01-10' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', plan: 'Monthly', status: 'inactive', joinDate: '2024-12-20' },
  ]

  const payments = [
    { id: 1, user: 'John Doe', amount: 25000, currency: 'MWK', status: 'completed', date: '2025-01-15', method: 'PayChangu' },
    { id: 2, user: 'Jane Smith', amount: 5000, currency: 'MWK', status: 'completed', date: '2025-01-14', method: 'Flutterwave' },
    { id: 3, user: 'Bob Wilson', amount: 25000, currency: 'MWK', status: 'pending', date: '2025-01-13', method: 'PayChangu' },
  ]

  const templates = [
    { id: 1, name: 'Business Proposal v1', type: 'Proposal', sector: 'General', status: 'active' },
    { id: 2, name: 'Pitch Deck Template', type: 'Pitch Deck', sector: 'Tech', status: 'active' },
    { id: 3, name: 'Loan Application Form', type: 'Loan', sector: 'Finance', status: 'active' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-navy text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-40`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <span className="text-xl font-bold">Admin Panel</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'overview' ? 'bg-emerald hover:bg-emerald/90' : 'hover:bg-gray-800'}`}>
            <BarChart3 size={20} />
            {sidebarOpen && <span>Overview</span>}
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'users' ? 'bg-emerald hover:bg-emerald/90' : 'hover:bg-gray-800'}`}>
            <Users size={20} />
            {sidebarOpen && <span>Users</span>}
          </button>
          <button onClick={() => setActiveTab('payments')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'payments' ? 'bg-emerald hover:bg-emerald/90' : 'hover:bg-gray-800'}`}>
            <DollarSign size={20} />
            {sidebarOpen && <span>Payments</span>}
          </button>
          <button onClick={() => setActiveTab('templates')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'templates' ? 'bg-emerald hover:bg-emerald/90' : 'hover:bg-gray-800'}`}>
            <FileText size={20} />
            {sidebarOpen && <span>Templates</span>}
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'settings' ? 'bg-emerald hover:bg-emerald/90' : 'hover:bg-gray-800'}`}>
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin User</span>
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-bold">AD</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Dashboard Overview</h2>
              
              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-navy mt-2">1,234</p>
                      <p className="text-xs text-green-600 mt-1">+12% this month</p>
                    </div>
                    <Users className="text-emerald" size={40} />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-navy mt-2">MK 2.5M</p>
                      <p className="text-xs text-green-600 mt-1">+8% this month</p>
                    </div>
                    <DollarSign className="text-gold" size={40} />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Documents Created</p>
                      <p className="text-3xl font-bold text-navy mt-2">5,678</p>
                      <p className="text-xs text-green-600 mt-1">+15% this month</p>
                    </div>
                    <FileText className="text-blue-500" size={40} />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Subscriptions</p>
                      <p className="text-3xl font-bold text-navy mt-2">456</p>
                      <p className="text-xs text-green-600 mt-1">+5% this month</p>
                    </div>
                    <TrendingUp className="text-purple-500" size={40} />
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-navy mb-4">Revenue Trend</h3>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                    Chart placeholder - Revenue trend
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-navy mb-4">User Growth</h3>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                    Chart placeholder - User growth
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-navy">User Management</h2>
                <button className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition">Add User</button>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-navy font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.plan}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="text-emerald hover:underline"><Eye size={16} /></button>
                          <button className="text-blue-600 hover:underline"><Edit size={16} /></button>
                          <button className="text-red-600 hover:underline"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Payment Management</h2>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Method</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-navy font-medium">{payment.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.amount.toLocaleString()} {payment.currency}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {payment.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.date}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="text-emerald hover:underline"><Eye size={16} /></button>
                          <button className="text-blue-600 hover:underline"><Edit size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-navy">Template Management</h2>
                <button className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition">Add Template</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-navy">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.type} • {template.sector}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{template.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 border border-emerald text-emerald rounded-lg hover:bg-emerald/5 transition text-sm">Edit</button>
                      <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Admin Settings</h2>
              <div className="bg-white rounded-lg p-6 border border-gray-200 max-w-2xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Platform Name</label>
                    <input type="text" defaultValue="SME Studio AI" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Support Email</label>
                    <input type="email" defaultValue="support@smestudioai.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Monthly Subscription Price (MWK)</label>
                    <input type="number" defaultValue="25000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Pay-per-Document Price (MWK)</label>
                    <input type="number" defaultValue="5000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald" />
                  </div>
                  <button className="px-6 py-2 bg-emerald text-white rounded-lg hover:bg-emerald/90 transition">Save Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
