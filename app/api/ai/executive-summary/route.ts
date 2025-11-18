import { NextRequest, NextResponse } from 'next/server'
import { generateExecutiveSummary } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, businessType, problemStatement, solution, marketOpportunity, fundingNeeded, keyMetrics } =
      body

    // Validate required fields
    if (!businessName || !businessType || !problemStatement || !solution || !marketOpportunity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate executive summary
    const summary = await generateExecutiveSummary({
      businessName,
      businessType,
      problemStatement,
      solution,
      marketOpportunity,
      fundingNeeded,
      keyMetrics,
    })

    return NextResponse.json({
      success: true,
      data: {
        summary,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Executive summary generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate executive summary',
      },
      { status: 500 }
    )
  }
}
