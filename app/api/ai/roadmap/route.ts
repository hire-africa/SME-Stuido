import { NextRequest, NextResponse } from 'next/server'
import { generateStartupRoadmap } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, businessType, launchDate, initialBudget } = body

    // Validate required fields
    if (!businessName || !businessType || !launchDate || !initialBudget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate startup roadmap
    const roadmap = await generateStartupRoadmap({
      businessName,
      businessType,
      launchDate,
      initialBudget,
    })

    return NextResponse.json({
      success: true,
      data: {
        roadmap,
        duration: '30 days',
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Startup roadmap generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate startup roadmap',
      },
      { status: 500 }
    )
  }
}
