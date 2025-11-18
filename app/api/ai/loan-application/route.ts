import { NextRequest, NextResponse } from 'next/server'
import { generateLoanApplication } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      businessName,
      businessType,
      businessDescription,
      loanAmount,
      loanPurpose,
      repaymentPeriod,
      bankName,
      ownerName,
      yearsInBusiness,
      currentRevenue,
      employeeCount,
    } = body

    if (!businessName || !businessType || !loanAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const content = await generateLoanApplication({
      businessName,
      businessType,
      businessDescription,
      loanAmount,
      loanPurpose,
      repaymentPeriod,
      bankName,
      ownerName,
      yearsInBusiness,
      currentRevenue,
      employeeCount,
    })

    return NextResponse.json({
      success: true,
      content,
    })
  } catch (error) {
    console.error('Loan application generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate loan application' },
      { status: 500 }
    )
  }
}
