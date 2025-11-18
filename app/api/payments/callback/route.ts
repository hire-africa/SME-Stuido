import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyPayment } from '@/lib/paychangu'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tx_ref } = body

    if (!tx_ref) {
      return NextResponse.json(
        { success: false, error: 'Missing transaction reference' },
        { status: 400 }
      )
    }

    // Find payment by reference
    const payment = await prisma.payment.findUnique({
      where: { reference: tx_ref },
      include: { user: true },
    })

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Verify payment with PayChangu API
    const secretKey = process.env.PAYCHANGU_SECRET_KEY
    if (!secretKey) {
      console.error('PayChangu secret key not configured')
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 500 }
      )
    }

    const verification = await verifyPayment(tx_ref, secretKey)

    if (!verification.success) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      })

      return NextResponse.json({
        success: false,
        error: 'Payment verification failed',
      })
    }

    // Payment successful - update payment record
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'COMPLETED',
        transactionId: verification.data?.id,
      },
    })

    // Update user subscription based on plan type
    const planType = payment.description?.includes('Monthly')
      ? 'monthly'
      : 'pay-per-doc'

    if (planType === 'monthly') {
      // Set subscription active for 30 days
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)

      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          subscriptionActive: true,
          subscriptionPlan: 'monthly',
          subscriptionEndDate: endDate,
        },
      })
    } else {
      // Add document credit for pay-per-doc
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          documentsRemaining: {
            increment: 1,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and processed successfully',
      data: {
        paymentId: payment.id,
        status: 'COMPLETED',
      },
    })
  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.json(
      { success: false, error: 'Callback processing failed' },
      { status: 500 }
    )
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tx_ref = searchParams.get('tx_ref')
    const status = searchParams.get('status')

    if (!tx_ref) {
      return NextResponse.json(
        { success: false, error: 'Missing transaction reference' },
        { status: 400 }
      )
    }

    // Find payment
    const payment = await prisma.payment.findUnique({
      where: { reference: tx_ref },
    })

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      )
    }

    // If status is failed, update payment
    if (status === 'failed') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      })
    }

    return NextResponse.json({
      success: true,
      data: payment,
    })
  } catch (error) {
    console.error('Payment status check error:', error)
    return NextResponse.json(
      { success: false, error: 'Status check failed' },
      { status: 500 }
    )
  }
}
