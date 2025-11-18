import { NextRequest, NextResponse } from 'next/server'
import { generateProposal } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      businessName,
      businessType,
      sector,
      description,
      targetMarket,
      monthlyRevenue,
      fundingNeeded,
      fundingPurpose,
    } = body

    // Validate required fields
    if (!businessName || !businessType || !sector || !description || !targetMarket) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate proposal
    const proposal = await generateProposal({
      businessName,
      businessType,
      sector,
      description,
      targetMarket,
      monthlyRevenue,
      fundingNeeded,
      fundingPurpose,
    })

    return NextResponse.json({
      success: true,
      data: {
        proposal,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Proposal generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate proposal',
      },
      { status: 500 }
    )
  }
}
