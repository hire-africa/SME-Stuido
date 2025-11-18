import { NextRequest, NextResponse } from 'next/server'
import { generatePricing } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { productName, sector, costOfProduction, targetMarket, competitorPrices } = body

    // Validate required fields
    if (!productName || !sector || costOfProduction === undefined || !targetMarket) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate pricing recommendations
    const pricing = await generatePricing({
      productName,
      sector,
      costOfProduction,
      targetMarket,
      competitorPrices,
    })

    return NextResponse.json({
      success: true,
      data: {
        pricing,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Pricing generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate pricing',
      },
      { status: 500 }
    )
  }
}
