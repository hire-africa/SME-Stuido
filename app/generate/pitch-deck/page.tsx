'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import GeneratingLoader from '@/app/components/GeneratingLoader'

export default function PitchDeckGeneratorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [content, setContent] = useState('')

  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    marketSize: '',
    businessModel: '',
    fundingAmount: '',
    useOfFunds: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerate = async () => {
    // Validate required fields
    if (
      !formData.businessName ||
      !formData.tagline ||
      !formData.problemStatement ||
      !formData.solution ||
      !formData.targetMarket ||
      !formData.marketSize ||
      !formData.businessModel ||
      !formData.fundingAmount ||
      !formData.useOfFunds
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          tagline: formData.tagline,
          problemStatement: formData.problemStatement,
          solution: formData.solution,
          targetMarket: formData.targetMarket,
          marketSize: formData.marketSize,
          businessModel: formData.businessModel,
          fundingAmount: parseInt(formData.fundingAmount),
          useOfFunds: formData.useOfFunds,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate pitch deck')
      }

      setContent(data.data.pitchDeck)
      setGenerated(true)
      toast.success('Pitch deck generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate pitch deck')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/export/pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          businessName: formData.businessName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to download presentation')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${formData.businessName.replace(/\s+/g, '_')}_pitch_deck.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Document downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download presentation')
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
              <h1 className="text-2xl font-bold text-navy dark:text-white">Pitch Deck Generator</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create investor-ready pitch deck slides with AI</p>
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
                  placeholder="e.g., TechStart Solutions"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Tagline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="e.g., Empowering SMEs with Technology"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
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
                  placeholder="e.g., Small businesses in Southern Africa"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Market Size */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Market Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="marketSize"
                  value={formData.marketSize}
                  onChange={handleInputChange}
                  placeholder="e.g., $500M TAM"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Business Model */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Business Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessModel"
                  value={formData.businessModel}
                  onChange={handleInputChange}
                  placeholder="e.g., SaaS with subscription"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>

              {/* Funding Amount */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                  Funding Amount (MK) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
                />
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                placeholder="What problem are you solving?"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
              />
            </div>

            {/* Solution */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                Solution <span className="text-red-500">*</span>
              </label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleInputChange}
                placeholder="How do you solve this problem?"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-emerald"
              />
            </div>

            {/* Use of Funds */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                Use of Funds <span className="text-red-500">*</span>
              </label>
              <textarea
                name="useOfFunds"
                value={formData.useOfFunds}
                onChange={handleInputChange}
                placeholder="How will you use the funding? (e.g., 40% product development, 30% marketing, 30% operations)"
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
                'Generate Pitch Deck'
              )}
            </button>
          </div>
        ) : (
          // Generated Content
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">Generated Pitch Deck</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {content}
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Download Your Pitch Deck</h3>
              <div className="flex justify-center">
                <button
                  onClick={() => handleDownload()}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Download size={20} />
                  Download as Professional Slides (.docx)
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
