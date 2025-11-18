'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Loader2, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import GeneratingLoader from '@/app/components/GeneratingLoader'
import { LoanApplicationTemplate } from '@/app/components/LoanApplicationTemplate'

export default function LoanApplicationGeneratorPage() {
  const router = useRouter()
  const templateRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [content, setContent] = useState('')
  const [downloadLoading, setDownloadLoading] = useState(false)

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessDescription: '',
    loanAmount: '',
    loanPurpose: '',
    repaymentPeriod: '',
    bankName: '',
    ownerName: '',
    yearsInBusiness: '',
    currentRevenue: '',
    employeeCount: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.businessName || !formData.businessType || !formData.loanAmount) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/loan-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate loan application')
      }

      const data = await response.json()
      setContent(data.content)
      setGenerated(true)
      toast.success('Loan application generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate loan application')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setDownloadLoading(true)
    try {
      if (format === 'pdf') {
        const html2pdf = (await import('html2pdf.js')).default
        
        if (templateRef.current) {
          const element = templateRef.current
          const opt = {
            margin: 0,
            filename: `${formData.businessName.replace(/\s+/g, '_')}_loan_application.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
          }
          html2pdf().set(opt).from(element).save()
          toast.success('PDF downloaded successfully!')
        }
      } else {
        const response = await fetch('/api/export/loan-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName: formData.businessName,
            businessType: formData.businessType,
            businessDescription: formData.businessDescription,
            loanAmount: formData.loanAmount ? parseInt(formData.loanAmount) : 0,
            loanPurpose: formData.loanPurpose,
            repaymentPeriod: formData.repaymentPeriod,
            ownerName: formData.ownerName,
            yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : 0,
            currentRevenue: formData.currentRevenue ? parseInt(formData.currentRevenue) : 0,
            employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : 0,
            format: 'docx',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to download document')
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${formData.businessName.replace(/\s+/g, '_')}_loan_application.docx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Document downloaded successfully!')
      }
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download document')
    } finally {
      setDownloadLoading(false)
    }
  }

  // Show loading screen while generating
  if (loading) {
    return <GeneratingLoader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
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
              <h1 className="text-2xl font-bold text-navy dark:text-white">Loan Application Generator</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create professional bank loan applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {!generated ? (
          <>
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
              <h2 className="text-xl font-bold text-navy dark:text-white mb-6">Loan Application Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select business type</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Services">Services</option>
                    <option value="Technology">Technology</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Transport">Transport</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Loan Amount (MWK) *
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter loan amount"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Repayment Period */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Repayment Period (Months)
                  </label>
                  <input
                    type="number"
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleInputChange}
                    placeholder="e.g., 24"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select bank</option>
                    <option value="National Bank of Malawi">National Bank of Malawi</option>
                    <option value="Standard Bank">Standard Bank</option>
                    <option value="FDH Bank">FDH Bank</option>
                    <option value="Nedbank">Nedbank</option>
                    <option value="Stanbic Bank">Stanbic Bank</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Owner/Manager Name
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Enter owner name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Years in Business */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Current Revenue */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Current Annual Revenue (MWK)
                  </label>
                  <input
                    type="number"
                    name="currentRevenue"
                    value={formData.currentRevenue}
                    onChange={handleInputChange}
                    placeholder="Enter annual revenue"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Employee Count */}
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Loan Purpose */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Loan Purpose
                  </label>
                  <textarea
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    placeholder="Describe what the loan will be used for"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Business Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your business, products/services, and market position"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-navy dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Loan Application'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* Preview - Full Document Template */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-navy dark:text-white flex items-center gap-2">
                  <FileText size={24} />
                  Document Preview
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This is exactly how your document will look when downloaded</p>
              </div>
              
              {/* Template Preview */}
              <div className="overflow-auto max-h-[600px] bg-gray-100 dark:bg-gray-900 p-4">
                <div className="bg-white shadow-lg">
                  <LoanApplicationTemplate
                    ref={templateRef}
                    data={{
                      businessName: formData.businessName,
                      businessType: formData.businessType,
                      businessDescription: formData.businessDescription,
                      loanAmount: formData.loanAmount ? parseInt(formData.loanAmount) : 0,
                      loanPurpose: formData.loanPurpose,
                      repaymentPeriod: formData.repaymentPeriod,
                      ownerName: formData.ownerName,
                      yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : 0,
                      currentRevenue: formData.currentRevenue ? parseInt(formData.currentRevenue) : 0,
                      employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : 0,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Download Your Loan Application</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={downloadLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloadLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download as PDF
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownload('docx')}
                  disabled={downloadLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloadLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download as Word (.docx)
                    </>
                  )}
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
                className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-medium"
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
