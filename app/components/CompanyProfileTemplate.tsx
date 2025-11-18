'use client'

import React from 'react'

interface CompanyProfileData {
  businessName: string
  businessType: string
  businessDescription: string
  sector: string
  targetMarket: string
  yearFounded?: number
  employeeCount?: number
  currentRevenue?: number
  missionStatement?: string
  visionStatement?: string
  values?: string[]
  services?: string[]
  teamMembers?: Array<{ name: string; position: string }>
}

export const CompanyProfileTemplate = React.forwardRef<HTMLDivElement, { data: CompanyProfileData }>(
  ({ data }, ref) => {
    const yearInBusiness = data.yearFounded ? new Date().getFullYear() - data.yearFounded : 0

    return (
      <div ref={ref} className="bg-white text-gray-800 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Cover Page */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-between text-white overflow-hidden p-16"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Logo Area */}
          <div className="text-center pt-20">
            <div
              className="w-16 h-16 mx-auto mb-8 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: '#f6ad55' }}
            >
              {data.businessName.charAt(0)}
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center z-10 flex-1 flex flex-col justify-center">
            <h1 className="text-6xl font-bold mb-4">
              COMPANY <span style={{ color: '#f6ad55' }}>PROFILE</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-2">{data.businessName}</p>
            <p className="text-sm text-gray-400">{data.businessType}</p>
          </div>

          {/* Footer */}
          <div className="text-center pb-8">
            <div style={{ backgroundColor: '#f6ad55' }} className="h-1 w-24 mx-auto mb-4"></div>
            <p className="text-sm text-gray-300">Professional Business Overview</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12">
              TABLE OF <span style={{ color: '#f6ad55' }}>CONTENTS</span>
            </h2>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">01</span>
                  <p className="text-lg text-gray-700">About Our Company</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">02</span>
                  <p className="text-lg text-gray-700">Mission & Vision</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">03</span>
                  <p className="text-lg text-gray-700">Our Services</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">04</span>
                  <p className="text-lg text-gray-700">Company Highlights</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">05</span>
                  <p className="text-lg text-gray-700">Core Values</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">06</span>
                  <p className="text-lg text-gray-700">Leadership Team</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">07</span>
                  <p className="text-lg text-gray-700">Why Choose Us</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">08</span>
                  <p className="text-lg text-gray-700">Contact Information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              ABOUT <span style={{ color: '#f6ad55' }}>OUR COMPANY</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">WHO WE ARE AND WHAT WE DO</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Company Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {data.businessDescription || 'We are a dynamic and innovative company dedicated to delivering exceptional value to our clients and stakeholders. With a strong commitment to excellence and customer satisfaction, we have established ourselves as a trusted leader in our industry.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-500 font-semibold mb-2">INDUSTRY SECTOR</p>
                  <p className="text-2xl font-bold text-gray-800">{data.sector}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-500 font-semibold mb-2">TARGET MARKET</p>
                  <p className="text-2xl font-bold text-gray-800">{data.targetMarket}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-500 font-semibold mb-2">YEARS IN BUSINESS</p>
                  <p className="text-2xl font-bold text-gray-800">{yearInBusiness}+ Years</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-500 font-semibold mb-2">TEAM SIZE</p>
                  <p className="text-2xl font-bold text-gray-800">{data.employeeCount || 50}+ Employees</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              MISSION & <span style={{ color: '#f6ad55' }}>VISION</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">OUR PURPOSE AND FUTURE DIRECTION</p>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="bg-yellow-100 p-8 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-3">OUR MISSION</p>
                  <p className="text-lg font-bold text-gray-800">
                    {data.missionStatement || 'To deliver innovative solutions that create lasting value for our clients, employees, and communities while maintaining the highest standards of integrity and excellence.'}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-gray-100 p-8 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-3">OUR VISION</p>
                  <p className="text-lg font-bold text-gray-800">
                    {data.visionStatement || 'To be the leading provider of innovative solutions in our industry, recognized for our commitment to excellence, customer satisfaction, and sustainable growth.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              CORE <span style={{ color: '#f6ad55' }}>VALUES</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">PRINCIPLES THAT GUIDE OUR BUSINESS</p>

            <div className="grid grid-cols-2 gap-8">
              {(data.values || [
                'Integrity & Transparency',
                'Customer Excellence',
                'Innovation & Creativity',
                'Team Collaboration',
              ]).map((value, index) => (
                <div key={index} className="border-l-4 border-yellow-400 pl-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: '#f6ad55' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        We are committed to upholding this value in all our business operations and interactions.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              OUR <span style={{ color: '#f6ad55' }}>SERVICES</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">COMPREHENSIVE SOLUTIONS FOR YOUR BUSINESS</p>

            <div className="space-y-6">
              {(data.services || [
                'Strategic Consulting & Business Advisory',
                'Digital Transformation Solutions',
                'Operational Excellence Programs',
                'Technology Implementation & Support',
              ]).map((service, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: '#f6ad55' }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service}</h3>
                    <p className="text-gray-600">
                      We provide comprehensive solutions tailored to meet your specific business needs and objectives.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="w-full min-h-screen p-16 flex flex-col justify-center" style={{ pageBreakAfter: 'always' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              WHY CHOOSE <span style={{ color: '#f6ad55' }}>US</span>
            </h2>
            <p className="text-xs text-gray-500 mb-12">OUR COMPETITIVE ADVANTAGES</p>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Proven Track Record</h3>
                    <p className="text-gray-600 text-sm">Years of successful projects and satisfied clients</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Expert Team</h3>
                    <p className="text-gray-600 text-sm">Highly skilled professionals with industry expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Innovation</h3>
                    <p className="text-gray-600 text-sm">Cutting-edge solutions and continuous improvement</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Customer Focus</h3>
                    <p className="text-gray-600 text-sm">Dedicated support and personalized service</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Quality Assurance</h3>
                    <p className="text-gray-600 text-sm">Rigorous quality standards and best practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400 mt-1">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Reliability</h3>
                    <p className="text-gray-600 text-sm">Consistent delivery and long-term partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Thank You */}
        <div
          className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
            minHeight: '100vh',
          }}
        >
          <div className="text-center z-10">
            <h1 className="text-6xl font-bold mb-4">THANK YOU</h1>
            <p className="text-2xl text-gray-300 mb-8">{data.businessName}</p>
            <div style={{ backgroundColor: '#f6ad55' }} className="h-1 w-24 mx-auto mb-8"></div>
            <p className="text-sm text-gray-400">For Your Interest in Our Company</p>
          </div>
        </div>
      </div>
    )
  }
)

CompanyProfileTemplate.displayName = 'CompanyProfileTemplate'
