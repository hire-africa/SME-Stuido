'use client'

import React from 'react'

interface ProposalData {
  businessName: string
  businessType: string
  sector: string
  description: string
  targetMarket: string
  monthlyRevenue?: number
  fundingNeeded?: number
  fundingPurpose?: string
  missionStatement?: string
  visionStatement?: string
  values?: string[]
  keyPoints?: string[]
}

export const ProposalTemplate = React.forwardRef<HTMLDivElement, { data: ProposalData }>(
  ({ data }, ref) => {
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
              BUSINESS <span style={{ color: '#f6ad55' }}>PROPOSAL</span>
            </h1>
            <p className="text-lg text-gray-300 mt-8">{data.businessName}</p>
            <p className="text-sm text-gray-400 mt-2">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Executive Summary Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              EXECUTIVE <span style={{ color: '#f6ad55' }}>SUMMARY</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">PROPOSAL OVERVIEW</p>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-justify">
                This proposal outlines a comprehensive business solution designed to address the strategic objectives and operational needs of {data.businessName}. Our approach combines industry expertise, proven methodologies, and innovative solutions to deliver measurable results and sustainable growth.
              </p>

              <p className="text-gray-700 leading-relaxed text-justify">
                {data.description || 'We understand the unique challenges facing modern businesses in today\'s competitive landscape. Our tailored approach ensures that every aspect of this proposal is aligned with your organizational goals, market positioning, and long-term vision for success.'}
              </p>

              {/* Key Highlights */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-800">Key Highlights</h3>
                {(data.keyPoints || [
                  'Strategic alignment with organizational objectives',
                  'Proven track record of successful implementations',
                  'Comprehensive support and ongoing partnership',
                ]).map((point, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: '#f6ad55' }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-700">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scope of Work Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              SCOPE OF <span style={{ color: '#f6ad55' }}>WORK</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">DETAILED PROJECT DELIVERABLES</p>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Phase 1: Discovery & Planning</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">•</span>
                    <span>Comprehensive needs assessment and stakeholder interviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">•</span>
                    <span>Strategic roadmap development aligned with business objectives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">•</span>
                    <span>Resource allocation and timeline establishment</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Phase 2: Implementation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Execution of project deliverables according to specifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Regular progress updates and quality assurance checkpoints</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    <span>Stakeholder collaboration and feedback integration</span>
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Phase 3: Deployment & Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span>Final testing, optimization, and deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span>Comprehensive training and documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span>Ongoing support and maintenance services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Investment & Timeline Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              INVESTMENT & <span style={{ color: '#f6ad55' }}>TIMELINE</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">PROJECT COSTS AND SCHEDULE</p>

            <div className="grid grid-cols-2 gap-12">
              {/* Investment Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Investment Summary</h3>
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Project Delivery</span>
                    <span className="font-bold text-gray-800">MK {(data.fundingNeeded ? Math.floor(data.fundingNeeded * 0.6) : 1500000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Support & Training</span>
                    <span className="font-bold text-gray-800">MK {(data.fundingNeeded ? Math.floor(data.fundingNeeded * 0.25) : 625000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-700">Contingency (10%)</span>
                    <span className="font-bold text-gray-800">MK {(data.fundingNeeded ? Math.floor(data.fundingNeeded * 0.15) : 375000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-emerald-500 bg-emerald-50 p-3 rounded">
                    <span className="font-bold text-gray-800">Total Investment</span>
                    <span className="text-2xl font-bold text-emerald-600">MK {(data.fundingNeeded || 2500000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <p className="text-sm font-semibold text-gray-800">Week 1-2</p>
                      <p className="text-xs text-gray-600">Discovery</p>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-gray-700 text-sm">Initial assessment and planning phase</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <p className="text-sm font-semibold text-gray-800">Week 3-8</p>
                      <p className="text-xs text-gray-600">Implementation</p>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-gray-700 text-sm">Core project execution and development</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <p className="text-sm font-semibold text-gray-800">Week 9-10</p>
                      <p className="text-xs text-gray-600">Deployment</p>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-gray-700 text-sm">Testing, training, and go-live support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Page */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              ABOUT <span style={{ color: '#f6ad55' }}>{data.businessName}</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">CLIENT ORGANIZATION</p>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Organization Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">ORGANIZATION NAME</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">BUSINESS TYPE</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">INDUSTRY SECTOR</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">TARGET MARKET</p>
                    <p className="text-lg text-gray-800 font-semibold">{data.targetMarket}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {data.description || 'Our organization is committed to delivering exceptional value through innovative solutions and strategic partnerships. We leverage industry expertise and best practices to achieve sustainable growth and market leadership.'}
                </p>
                {data.fundingPurpose && (
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-2">STRATEGIC OBJECTIVES</p>
                    <p className="text-gray-700 leading-relaxed">{data.fundingPurpose}</p>
                  </div>
                )}
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
            <p className="text-sm tracking-widest text-gray-400">FOR YOUR ATTENTION</p>
          </div>
        </div>
      </div>
    )
  }
)

ProposalTemplate.displayName = 'ProposalTemplate'
