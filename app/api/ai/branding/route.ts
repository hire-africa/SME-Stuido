import { NextRequest, NextResponse } from 'next/server'
import { generateBranding } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, businessType, targetAudience, brandPersonality } = body

    // Validate required fields
    if (!businessName || !businessType || !targetAudience || !brandPersonality) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate branding recommendations
    const branding = await generateBranding({
      businessName,
      businessType,
      targetAudience,
      brandPersonality,
    })

    return NextResponse.json({
      success: true,
      data: {
        branding,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Branding generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate branding',
      },
      { status: 500 }
    )
  }
}
