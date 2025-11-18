'use client'

import React from 'react'

interface PitchDeckData {
  businessName: string
  businessType: string
  businessDescription: string
  sector: string
  targetMarket: string
  problemStatement?: string
  solutionStatement?: string
  marketSize?: string
  fundingNeeded?: number
  fundingUse?: string
  projectedRevenue?: number
  teamSize?: number
}

export const PitchDeckTemplate = React.forwardRef<HTMLDivElement, { data: PitchDeckData }>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="bg-white text-gray-800 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Slide 1: Title Slide */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-between text-white overflow-hidden p-16"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          <div className="text-center flex-1 flex flex-col justify-center z-10">
            <h1 className="text-7xl font-bold mb-4">
              {data.businessName}
            </h1>
            <p className="text-3xl text-yellow-400 font-bold mb-8">{data.businessType}</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{data.businessDescription}</p>
          </div>

          <div className="text-center pb-8">
            <div style={{ backgroundColor: '#f6ad55' }} className="h-1 w-32 mx-auto mb-4"></div>
            <p className="text-sm text-gray-300">Investment Opportunity</p>
          </div>
        </div>

        {/* Slide 2: The Problem */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              THE <span style={{ color: '#f6ad55' }}>PROBLEM</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">MARKET OPPORTUNITY</p>

            <div className="space-y-8">
              <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                {data.problemStatement || 'The current market faces significant challenges that create a substantial opportunity for innovative solutions. Businesses struggle with inefficiencies, high costs, and limited access to quality services.'}
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-4xl font-bold text-yellow-400 mb-2">$2B+</p>
                  <p className="text-gray-700">Market Size</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-4xl font-bold text-yellow-400 mb-2">45%</p>
                  <p className="text-gray-700">Annual Growth</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-4xl font-bold text-yellow-400 mb-2">1000s</p>
                  <p className="text-gray-700">Potential Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Our Solution */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              OUR <span style={{ color: '#f6ad55' }}>SOLUTION</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">HOW WE ADDRESS THE MARKET NEED</p>

            <div className="space-y-8">
              <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                {data.solutionStatement || 'We provide an innovative, comprehensive solution that directly addresses market pain points. Our platform combines cutting-edge technology with exceptional customer service to deliver unmatched value.'}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-6 bg-yellow-50 p-6 rounded-lg">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: '#f6ad55' }}
                  >
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Innovative Technology</h3>
                    <p className="text-gray-700">Leveraging latest technologies for superior performance</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-lg">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: '#f6ad55' }}
                  >
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Customer-Centric Approach</h3>
                    <p className="text-gray-700">Designed with customer needs at the forefront</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-yellow-50 p-6 rounded-lg">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: '#f6ad55' }}
                  >
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Scalable Model</h3>
                    <p className="text-gray-700">Built to grow with market demand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4: Market Opportunity */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              MARKET <span style={{ color: '#f6ad55' }}>OPPORTUNITY</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">MARKET SIZE AND GROWTH POTENTIAL</p>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Target Market</h3>
                  <p className="text-gray-700 mb-4">{data.targetMarket}</p>
                  <p className="text-gray-700">Market Size: {data.marketSize || '$2 Billion+'}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Growth Potential</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Year 1</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-gray-700 font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Year 2</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <span className="text-gray-700 font-bold">55%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Year 3</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-gray-700 font-bold">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 5: Business Model */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              BUSINESS <span style={{ color: '#f6ad55' }}>MODEL</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">HOW WE GENERATE REVENUE</p>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Revenue Streams</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="font-bold text-gray-800">Subscription Model</p>
                    <p className="text-gray-600 text-sm">Recurring monthly/annual fees</p>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="font-bold text-gray-800">Premium Services</p>
                    <p className="text-gray-600 text-sm">Value-added premium offerings</p>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="font-bold text-gray-800">Enterprise Solutions</p>
                    <p className="text-gray-600 text-sm">Custom enterprise packages</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Financial Projections</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">Year 1 Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">MK {(data.projectedRevenue || 5000000).toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">Year 2 Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">MK {(data.projectedRevenue ? Math.floor(data.projectedRevenue * 2.5) : 12500000).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 font-semibold">Year 3 Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">MK {(data.projectedRevenue ? Math.floor(data.projectedRevenue * 5) : 25000000).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: Funding Request */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              FUNDING <span style={{ color: '#f6ad55' }}>REQUEST</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">INVESTMENT OPPORTUNITY</p>

            <div className="space-y-8">
              <div className="bg-yellow-50 p-8 rounded-lg text-center mb-8">
                <p className="text-sm text-gray-500 font-semibold mb-2">SEEKING INVESTMENT</p>
                <p className="text-5xl font-bold text-gray-800">MK {(data.fundingNeeded || 5000000).toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Product Development</p>
                  <p className="text-2xl font-bold text-gray-800">40%</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Marketing & Sales</p>
                  <p className="text-2xl font-bold text-gray-800">35%</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Operations</p>
                  <p className="text-2xl font-bold text-gray-800">25%</p>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">Use of Funds</h3>
                <p className="text-gray-700">
                  {data.fundingUse || 'The investment will be strategically allocated to accelerate product development, expand market reach through targeted marketing and sales initiatives, and strengthen operational infrastructure to support rapid growth.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 7: Team */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-2">
              OUR <span style={{ color: '#f6ad55' }}>TEAM</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">EXPERIENCED LEADERSHIP</p>

            <div className="space-y-8">
              <p className="text-lg text-gray-700">
                Our team comprises experienced professionals with a proven track record of success in the industry. With {data.teamSize || 15}+ team members, we bring diverse expertise and complementary skills to drive the company forward.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">FOUNDER & CEO</p>
                  <p className="text-lg font-bold text-gray-800">Leadership Excellence</p>
                  <p className="text-gray-600 text-sm mt-2">Visionary leader with 15+ years of industry experience</p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">CTO</p>
                  <p className="text-lg font-bold text-gray-800">Technical Innovation</p>
                  <p className="text-gray-600 text-sm mt-2">Expert in cutting-edge technology and product development</p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">CFO</p>
                  <p className="text-lg font-bold text-gray-800">Financial Strategy</p>
                  <p className="text-gray-600 text-sm mt-2">Strategic financial planning and investor relations</p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">VP SALES</p>
                  <p className="text-lg font-bold text-gray-800">Market Growth</p>
                  <p className="text-gray-600 text-sm mt-2">Proven sales leader with strong market connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 8: Call to Action */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          <div className="text-center z-10">
            <h1 className="text-6xl font-bold mb-4">LET'S BUILD</h1>
            <h2 className="text-5xl font-bold text-yellow-400 mb-8">THE FUTURE</h2>
            <p className="text-lg text-gray-300 mb-12">Join us in revolutionizing the industry</p>
            <div style={{ backgroundColor: '#f6ad55' }} className="h-1 w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }
)

PitchDeckTemplate.displayName = 'PitchDeckTemplate'
