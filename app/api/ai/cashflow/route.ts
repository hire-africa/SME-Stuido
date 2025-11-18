import { NextRequest, NextResponse } from 'next/server'
import { generateCashflow } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { businessName, sector, monthlyRevenue, monthlyExpenses, seasonalityFactor, growthRate, months } = body

    // Validate required fields
    if (!businessName || !sector || monthlyRevenue === undefined || monthlyExpenses === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate cashflow
    const cashflow = await generateCashflow({
      businessName,
      sector,
      monthlyRevenue,
      monthlyExpenses,
      seasonalityFactor: seasonalityFactor || 1,
      growthRate: growthRate || 0.05,
      months: months || 12,
    })

    return NextResponse.json({
      success: true,
      data: {
        cashflow,
        period: `${months || 12} months`,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Cashflow generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate cashflow',
      },
      { status: 500 }
    )
  }
}
