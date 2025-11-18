'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import GeneratingLoader from '@/app/components/GeneratingLoader'

export default function ProposalGeneratorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [content, setContent] = useState('')

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    sector: '',
    description: '',
    targetMarket: '',
    monthlyRevenue: '',
    fundingNeeded: '',
    fundingPurpose: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerate = async () => {
    // Validate required fields
    if (!formData.businessName || !formData.businessType || !formData.sector || !formData.description || !formData.targetMarket) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessType: formData.businessType,
          sector: formData.sector,
          description: formData.description,
          targetMarket: formData.targetMarket,
          monthlyRevenue: formData.monthlyRevenue ? parseInt(formData.monthlyRevenue) : undefined,
          fundingNeeded: formData.fundingNeeded ? parseInt(formData.fundingNeeded) : undefined,
          fundingPurpose: formData.fundingPurpose,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate proposal')
      }

      setContent(data.data.proposal)
      setGenerated(true)
      toast.success('Proposal generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate proposal')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: 'docx' | 'txt') => {
    try {
      const response = await fetch('/api/export/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          businessName: formData.businessName,
          format,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to download document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${formData.businessName.replace(/\s+/g, '_')}_proposal.${format === 'docx' ? 'docx' : 'txt'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Document downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download document')
    }
  }

  // Show loading screen while generating
  if (loading) {
    return <GeneratingLoader />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy dark:text-white">Business Proposal Generator</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create a professional business proposal with AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {!generated ? (
          // Form
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g., Tech Solutions Ltd"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Development"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Sector <span className="text-red-500">*</span>
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                >
                  <option value="">Select a sector</option>
                  <option value="ICT">ICT</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Target Market */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Target Market <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="targetMarket"
                  value={formData.targetMarket}
                  onChange={handleInputChange}
                  placeholder="e.g., SMEs in Lilongwe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Monthly Revenue */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Monthly Revenue (MK)</label>
                <input
                  type="number"
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleInputChange}
                  placeholder="e.g., 500000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Funding Needed */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Funding Needed (MK)</label>
                <input
                  type="number"
                  name="fundingNeeded"
                  value={formData.fundingNeeded}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                Business Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your business, what you do, and your unique value proposition..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
              />
            </div>

            {/* Funding Purpose */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Funding Purpose</label>
              <textarea
                name="fundingPurpose"
                value={formData.fundingPurpose}
                onChange={handleInputChange}
                placeholder="How will you use the funding? (e.g., equipment, working capital, expansion)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-emerald text-white py-3 rounded-lg hover:bg-emerald/90 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Proposal'
              )}
            </button>
          </div>
        ) : (
          // Generated Content
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">Generated Proposal</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {content}
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Download Your Document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDownload('docx')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Download size={20} />
                  Download as Word (.docx)
                </button>
                <button
                  onClick={() => handleDownload('txt')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  <Download size={20} />
                  Download as Text (.txt)
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setGenerated(false)
                  setContent('')
                }}
                className="flex-1 px-6 py-3 border-2 border-emerald text-emerald rounded-lg hover:bg-emerald/10 transition font-medium"
              >
                Generate Another
              </button>
              <button
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
