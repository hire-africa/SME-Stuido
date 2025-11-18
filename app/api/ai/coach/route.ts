import { NextRequest, NextResponse } from 'next/server'
import { getBusinessCoachAdvice } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, businessType, currentChallenge, context } = body

    // Validate required fields
    if (!businessName || !businessType || !currentChallenge || !context) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get business coach advice
    const advice = await getBusinessCoachAdvice({
      businessName,
      businessType,
      currentChallenge,
      context,
    })

    return NextResponse.json({
      success: true,
      data: {
        advice,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Business coach error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get business advice',
      },
      { status: 500 }
    )
  }
}
