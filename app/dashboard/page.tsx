'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Menu, X, TrendingUp, Users, Settings, LogOut, Download, Sparkles, Trash2 } from 'lucide-react'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [projects] = useState([
    {
      id: 1,
      title: 'My First Business Proposal',
      type: 'Business Proposal',
      sector: 'Retail',
      status: 'completed',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      title: 'Tech Startup Pitch Deck',
      type: 'Pitch Deck',
      sector: 'ICT',
      status: 'draft',
      createdAt: '2025-01-14',
    },
  ])

  const documentTypes = [
    { id: 'proposal', name: 'Business Proposal', icon: '📄', color: 'bg-blue-50 border-blue-200' },
    { id: 'pitch', name: 'Pitch Deck', icon: '📊', color: 'bg-purple-50 border-purple-200' },
    { id: 'loan', name: 'Loan Application', icon: '🏦', color: 'bg-green-50 border-green-200' },
    { id: 'profile', name: 'Company Profile', icon: '🏢', color: 'bg-orange-50 border-orange-200' },
    { id: 'cashflow', name: 'Cashflow', icon: '📈', color: 'bg-red-50 border-red-200' },
    { id: 'summary', name: 'Executive Summary', icon: '📋', color: 'bg-yellow-50 border-yellow-200' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-navy text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-40`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <span className="text-xl font-bold">SME Studio</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald hover:bg-emerald/90 transition">
            <FileText size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <TrendingUp size={20} />
            {sidebarOpen && <span>Analytics</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <Users size={20} />
            {sidebarOpen && <span>Team</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </Link>
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
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, John Doe</span>
            <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center text-white font-bold">JD</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Documents Created</p>
                  <p className="text-3xl font-bold text-navy mt-2">12</p>
                </div>
                <FileText className="text-emerald" size={40} />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Downloads</p>
                  <p className="text-3xl font-bold text-navy mt-2">8</p>
                </div>
                <Download className="text-emerald" size={40} />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Subscription</p>
                  <p className="text-lg font-bold text-emerald mt-2">Active</p>
                  <p className="text-xs text-gray-500 mt-1">Renews in 15 days</p>
                </div>
                <Sparkles className="text-gold" size={40} />
              </div>
            </div>
          </div>

          {/* Create New Document */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">Create New Document</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {documentTypes.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/editor/${doc.id}`}
                  className={`border-2 ${doc.color} rounded-lg p-6 hover:shadow-lg transition cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{doc.icon}</div>
                  <h3 className="font-semibold text-navy mb-2">{doc.name}</h3>
                  <p className="text-sm text-gray-600">Create a new {doc.name.toLowerCase()}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Recent Documents</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sector</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-navy font-medium">{project.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.sector}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.createdAt}</td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <Link href={`/editor/${project.id}`} className="text-emerald hover:underline">
                          Edit
                        </Link>
                        <button className="text-red-600 hover:underline">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
