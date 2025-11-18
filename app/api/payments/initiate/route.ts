import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createCheckoutConfig } from '@/lib/paychangu'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planType, email, firstName, lastName } = body

    // Validate required fields
    if (!userId || !planType || !email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate plan type
    if (!['monthly', 'pay-per-doc'].includes(planType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan type' },
        { status: 400 }
      )
    }

    // Get PayChangu credentials from environment
    const publicKey = process.env.NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY
    const secretKey = process.env.PAYCHANGU_SECRET_KEY

    if (!publicKey || !secretKey) {
      console.error('PayChangu credentials not configured')
      return NextResponse.json(
        { success: false, error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    // Determine amount and currency based on plan
    let amount: number
    let description: string

    if (planType === 'monthly') {
      amount = 25000 // MWK
      description = 'Monthly Subscription - Unlimited documents'
    } else {
      amount = 5000 // MWK
      description = 'Pay As You Go - Single document'
    }

    // Get callback URLs from environment
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const callbackUrl = `${baseUrl}/api/payments/callback`
    const returnUrl = `${baseUrl}/dashboard?payment=success`

    // Create checkout configuration
    const checkoutConfig = createCheckoutConfig(
      publicKey,
      amount,
      'MWK',
      email,
      firstName,
      lastName,
      planType,
      userId,
      callbackUrl,
      returnUrl
    )

    // Save pending payment to database
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'MWK',
        paymentMethod: 'paychangu',
        status: 'PENDING',
        reference: checkoutConfig.tx_ref,
        description,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        checkoutConfig,
        paymentId: payment.id,
      },
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
