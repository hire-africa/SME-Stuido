import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, businessName, phone } = body

    // Validate input
    if (!email || !password || !fullName || !businessName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        businessName,
        phone: phone || null,
        role: 'CLIENT',
        subscriptionActive: false,
      },
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'CLIENT' | 'ADMIN',
    })

    // Return user data and token
    const response = NextResponse.json(
      {
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            businessName: user.businessName,
            phone: user.phone,
            avatar: user.avatar,
            role: user.role,
            subscriptionActive: user.subscriptionActive,
            subscriptionPlan: user.subscriptionPlan,
            subscriptionEndDate: user.subscriptionEndDate?.toISOString(),
            documentsRemaining: user.documentsRemaining,
          },
        },
      },
      { status: 201 }
    )

    // Set token in httpOnly cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Signup failed' },
      { status: 500 }
    )
  }
}
