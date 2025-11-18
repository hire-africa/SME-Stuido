'use client'

import React from 'react'

interface LoanApplicationData {
  businessName: string
  businessType: string
  businessDescription: string
  loanAmount: number
  loanPurpose: string
  repaymentPeriod: string
  bankName?: string
  ownerName: string
  yearsInBusiness: number
  currentRevenue: number
  employeeCount: number
}

export const LoanApplicationTemplate = React.forwardRef<HTMLDivElement, { data: LoanApplicationData }>(
  ({ data }, ref) => {
    const monthlyPayment = data.loanAmount / (parseInt(data.repaymentPeriod) * 12)
    const interestRate = 12 // Assumed 12% annual interest

    return (
      <div ref={ref} className="bg-white text-gray-800 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Cover Page */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            style={{
              width: '40px',
              height: '80px',
              backgroundColor: '#f6ad55',
              clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)',
            }}
          />
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            style={{
              width: '40px',
              height: '80px',
              backgroundColor: '#f6ad55',
              clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)',
            }}
          />

          {/* Title */}
          <div className="text-center z-10">
            <h1 className="text-7xl font-bold mb-2">
              LOAN <span style={{ color: '#f6ad55' }}>APPLICATION</span>
            </h1>
            <p className="text-lg text-gray-300 mt-8">{data.businessName}</p>
            <p className="text-sm text-gray-400 mt-2">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Application Summary Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              APPLICATION <span style={{ color: '#f6ad55' }}>SUMMARY</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">LOAN REQUEST OVERVIEW</p>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                This loan application is submitted by {data.businessName}, a {data.businessType} business seeking financing to support business growth and operational objectives. The applicant is requesting a loan amount of MK {data.loanAmount.toLocaleString()} to be repaid over {data.repaymentPeriod} years.
              </p>

              <p className="text-gray-700 leading-relaxed text-justify">
                {data.businessDescription || 'The business has demonstrated consistent performance and growth potential. This loan will be utilized to strengthen operational capacity, expand market reach, and achieve strategic business objectives.'}
              </p>

              {/* Key Loan Details */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-800">Loan Request Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">LOAN AMOUNT</p>
                    <p className="text-2xl font-bold text-emerald-600">MK {data.loanAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">REPAYMENT PERIOD</p>
                    <p className="text-2xl font-bold text-blue-600">{data.repaymentPeriod} Years</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">MONTHLY PAYMENT</p>
                    <p className="text-2xl font-bold text-purple-600">MK {Math.round(monthlyPayment).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">INTEREST RATE</p>
                    <p className="text-2xl font-bold text-orange-600">{interestRate}% p.a.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              BUSINESS <span style={{ color: '#f6ad55' }}>INFORMATION</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">APPLICANT AND BUSINESS DETAILS</p>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">BUSINESS NAME</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">BUSINESS TYPE</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">YEARS IN BUSINESS</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.yearsInBusiness} Years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">EMPLOYEE COUNT</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.employeeCount} Employees</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Financial Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">CURRENT ANNUAL REVENUE</p>
                    <p className="text-lg text-gray-800 font-semibold">MK {data.currentRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">OWNER/APPLICANT NAME</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">LOAN PURPOSE</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{data.loanPurpose}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Use and Impact Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              LOAN USE & <span style={{ color: '#f6ad55' }}>IMPACT</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">UTILIZATION AND EXPECTED OUTCOMES</p>

            <div className="space-y-8">
              {/* Use of Funds */}
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Primary Use of Funds</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.loanPurpose || 'The loan will be utilized to support business expansion, operational improvements, and strategic initiatives that will enhance business performance and market competitiveness.'}
                </p>
              </div>

              {/* Expected Impact */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Expected Business Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Increased operational capacity and market reach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Enhanced revenue generation and profitability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Improved business sustainability and growth trajectory</span>
                  </li>
                </ul>
              </div>

              {/* Repayment Capacity */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Repayment Capacity</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Based on current financial performance and projected revenue growth, the business demonstrates strong capacity to service the loan obligation. The monthly payment of MK {Math.round(monthlyPayment).toLocaleString()} represents a manageable portion of projected monthly revenue.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 font-semibold mb-2">DEBT SERVICE COVERAGE RATIO</p>
                  <p className="text-2xl font-bold text-purple-600">1.8x</p>
                  <p className="text-xs text-gray-600 mt-1">Indicates strong ability to meet loan obligations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Projections Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              FINANCIAL <span style={{ color: '#f6ad55' }}>PROJECTIONS</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">3-YEAR REVENUE AND GROWTH FORECAST</p>

            <div className="space-y-8">
              {/* Revenue Projections */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Projected Revenue Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm font-semibold text-gray-700">Year 1</p>
                      <p className="text-lg font-bold text-gray-800">MK {(data.currentRevenue * 1.15).toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-emerald-200 rounded-full h-8" style={{ width: '100%' }}></div>
                    <p className="text-sm font-semibold text-emerald-600">+15%</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm font-semibold text-gray-700">Year 2</p>
                      <p className="text-lg font-bold text-gray-800">MK {(data.currentRevenue * 1.32).toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-blue-200 rounded-full h-8" style={{ width: '100%' }}></div>
                    <p className="text-sm font-semibold text-blue-600">+32%</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm font-semibold text-gray-700">Year 3</p>
                      <p className="text-lg font-bold text-gray-800">MK {(data.currentRevenue * 1.52).toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-purple-200 rounded-full h-8" style={{ width: '100%' }}></div>
                    <p className="text-sm font-semibold text-purple-600">+52%</p>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">PROFIT MARGIN</p>
                  <p className="text-3xl font-bold text-emerald-600">18%</p>
                  <p className="text-xs text-gray-600 mt-2">Year 3 projection</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">ROI</p>
                  <p className="text-3xl font-bold text-blue-600">35%</p>
                  <p className="text-xs text-gray-600 mt-2">Expected return</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">PAYBACK PERIOD</p>
                  <p className="text-3xl font-bold text-purple-600">2.5 Yrs</p>
                  <p className="text-xs text-gray-600 mt-2">Loan repayment timeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              TERMS & <span style={{ color: '#f6ad55' }}>CONDITIONS</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">LOAN AGREEMENT DETAILS</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Loan Terms</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 font-semibold">LOAN AMOUNT</p>
                    <p className="text-lg font-bold text-gray-800">MK {data.loanAmount.toLocaleString()}</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-500 font-semibold">INTEREST RATE</p>
                    <p className="text-lg font-bold text-gray-800">{interestRate}% per annum</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-gray-500 font-semibold">LOAN PERIOD</p>
                    <p className="text-lg font-bold text-gray-800">{data.repaymentPeriod} Years</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="text-sm text-gray-500 font-semibold">MONTHLY PAYMENT</p>
                    <p className="text-lg font-bold text-gray-800">MK {Math.round(monthlyPayment).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Conditions and Covenants</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">✓</span>
                    <span>Loan funds to be used solely for stated business purposes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">✓</span>
                    <span>Quarterly financial reporting and business performance updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">✓</span>
                    <span>Maintenance of business insurance and asset protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">✓</span>
                    <span>Timely payment of all loan obligations and interest</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Page */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            style={{
              width: '40px',
              height: '80px',
              backgroundColor: '#f6ad55',
              clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)',
            }}
          />
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            style={{
              width: '40px',
              height: '80px',
              backgroundColor: '#f6ad55',
              clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)',
            }}
          />

          {/* Content */}
          <div className="text-center z-10">
            <h1 className="text-6xl font-bold mb-4">THANK YOU</h1>
            <p className="text-2xl text-gray-300 mb-8">{data.businessName}</p>
            <p className="text-sm tracking-widest text-gray-400">FOR YOUR APPLICATION</p>
          </div>
        </div>
      </div>
    )
  }
)

LoanApplicationTemplate.displayName = 'LoanApplicationTemplate'
