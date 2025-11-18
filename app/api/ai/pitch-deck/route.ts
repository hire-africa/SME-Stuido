import { NextRequest, NextResponse } from 'next/server'
import { generatePitchDeck } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      businessName,
      tagline,
      problemStatement,
      solution,
      targetMarket,
      marketSize,
      businessModel,
      fundingAmount,
      useOfFunds,
    } = body

    // Validate required fields
    if (
      !businessName ||
      !tagline ||
      !problemStatement ||
      !solution ||
      !targetMarket ||
      !marketSize ||
      !businessModel ||
      !fundingAmount ||
      !useOfFunds
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate pitch deck
    const pitchDeck = await generatePitchDeck({
      businessName,
      tagline,
      problemStatement,
      solution,
      targetMarket,
      marketSize,
      businessModel,
      fundingAmount,
      useOfFunds,
    })

    return NextResponse.json({
      success: true,
      data: {
        pitchDeck,
        slideCount: 12,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Pitch deck generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate pitch deck',
      },
      { status: 500 }
    )
  }
}
