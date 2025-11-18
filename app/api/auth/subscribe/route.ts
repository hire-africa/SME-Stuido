import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie or header
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { plan, amount } = body

    if (!plan || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing plan or amount' },
        { status: 400 }
      )
    }

    // Validate plan
    if (!['monthly', 'weekly'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Calculate subscription end date
    const endDate = new Date()
    if (plan === 'monthly') {
      endDate.setDate(endDate.getDate() + 30)
    } else {
      endDate.setDate(endDate.getDate() + 7)
    }

    // Update user subscription
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        subscriptionActive: true,
        subscriptionPlan: plan,
        subscriptionEndDate: endDate,
        documentsRemaining: 999, // Unlimited for subscription
      },
    })

    // Create payment record for tracking
    await prisma.payment.create({
      data: {
        userId: decoded.userId,
        amount: amount,
        currency: 'MWK',
        paymentMethod: 'simulated',
        status: 'COMPLETED',
        transactionId: `SIM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        description: `${plan === 'monthly' ? 'Monthly' : 'Weekly'} Subscription - Simulated Payment`,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: `${plan === 'monthly' ? 'Monthly' : 'Weekly'} subscription activated successfully`,
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            businessName: updatedUser.businessName,
            phone: updatedUser.phone,
            avatar: updatedUser.avatar,
            role: updatedUser.role,
            subscriptionActive: updatedUser.subscriptionActive,
            subscriptionPlan: updatedUser.subscriptionPlan,
            subscriptionEndDate: updatedUser.subscriptionEndDate?.toISOString(),
            documentsRemaining: updatedUser.documentsRemaining,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
