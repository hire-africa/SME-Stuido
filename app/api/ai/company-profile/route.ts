import { NextRequest, NextResponse } from 'next/server'
import { generateCompanyProfile } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, businessType, yearsInOperation, teamSize, services, achievements, sector } = body

    // Validate required fields
    if (!businessName || !businessType || !sector || !services || !achievements) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate company profile
    const profile = await generateCompanyProfile({
      businessName,
      businessType,
      yearsInOperation: yearsInOperation || 1,
      teamSize: teamSize || 1,
      services: Array.isArray(services) ? services : [services],
      achievements: Array.isArray(achievements) ? achievements : [achievements],
      sector,
    })

    return NextResponse.json({
      success: true,
      data: {
        profile,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Company profile generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate company profile',
      },
      { status: 500 }
    )
  }
}
