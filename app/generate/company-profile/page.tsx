'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Loader2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import GeneratingLoader from '@/app/components/GeneratingLoader'

export default function CompanyProfileGeneratorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [content, setContent] = useState('')

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    sector: '',
    yearsInOperation: '1',
    teamSize: '1',
    services: [''],
    achievements: [''],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (field: 'services' | 'achievements', index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: 'services' | 'achievements') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }))
  }

  const removeArrayItem = (field: 'services' | 'achievements', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleGenerate = async () => {
    // Validate required fields
    if (
      !formData.businessName ||
      !formData.businessType ||
      !formData.sector ||
      formData.services.filter((s) => s.trim()).length === 0 ||
      formData.achievements.filter((a) => a.trim()).length === 0
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/company-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessType: formData.businessType,
          sector: formData.sector,
          yearsInOperation: parseInt(formData.yearsInOperation),
          teamSize: parseInt(formData.teamSize),
          services: formData.services.filter((s) => s.trim()),
          achievements: formData.achievements.filter((a) => a.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate company profile')
      }

      setContent(data.data.profile)
      setGenerated(true)
      toast.success('Company profile generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate company profile')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/export/company-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          businessName: formData.businessName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to download document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${formData.businessName.replace(/\s+/g, '_')}_company_profile.pptx`
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
              <h1 className="text-2xl font-bold text-navy dark:text-white">Company Profile Generator</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create a professional company profile for tenders & clients</p>
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
                  placeholder="e.g., ABC Consulting Ltd"
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
                  placeholder="e.g., Management Consulting"
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

              {/* Years in Operation */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Years in Operation</label>
                <input
                  type="number"
                  name="yearsInOperation"
                  value={formData.yearsInOperation}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>
            </div>

            {/* Services */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                Services <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.services.map((service, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => handleArrayChange('services', index, e.target.value)}
                      placeholder="e.g., Business Strategy Consulting"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                    />
                    {formData.services.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('services', index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addArrayItem('services')}
                className="mt-2 text-sm text-emerald hover:underline font-medium"
              >
                + Add Service
              </button>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                Key Achievements <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                      placeholder="e.g., Served 500+ clients across Africa"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                    />
                    {formData.achievements.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('achievements', index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addArrayItem('achievements')}
                className="mt-2 text-sm text-emerald hover:underline font-medium"
              >
                + Add Achievement
              </button>
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
                'Generate Company Profile'
              )}
            </button>
          </div>
        ) : (
          // Generated Content
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">Generated Company Profile</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {content}
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Download Your Company Profile</h3>
              <div className="flex justify-center">
                <button
                  onClick={() => handleDownload()}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Download size={20} />
                  Download as Professional Slides (.pptx)
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
