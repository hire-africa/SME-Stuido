/**
 * PayChangu Payment Service
 * Handles payment initialization and verification
 */

export interface PayChanguCheckoutConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  callback_url: string
  return_url: string
  customer: {
    email: string
    first_name: string
    last_name: string
  }
  customization: {
    title: string
    description: string
  }
  meta?: {
    plan_type?: string
    user_id?: string
    [key: string]: any
  }
}

export interface PaymentVerificationResponse {
  success: boolean
  message: string
  data?: {
    id: string
    tx_ref: string
    amount: number
    currency: string
    status: string
    customer: {
      email: string
      first_name: string
      last_name: string
    }
  }
}

/**
 * Generate a unique transaction reference
 */
export function generateTransactionRef(): string {
  return `tx_${Date.now()}_${Math.floor(Math.random() * 1000000)}`
}

/**
 * Create PayChangu checkout configuration
 */
export function createCheckoutConfig(
  publicKey: string,
  amount: number,
  currency: string,
  email: string,
  firstName: string,
  lastName: string,
  planType: string,
  userId: string,
  callbackUrl: string,
  returnUrl: string
): PayChanguCheckoutConfig {
  return {
    public_key: publicKey,
    tx_ref: generateTransactionRef(),
    amount,
    currency,
    callback_url: callbackUrl,
    return_url: returnUrl,
    customer: {
      email,
      first_name: firstName,
      last_name: lastName,
    },
    customization: {
      title: `SME Studio AI - ${planType === 'monthly' ? 'Monthly Subscription' : 'Pay As You Go'}`,
      description: `Purchase ${planType === 'monthly' ? 'monthly subscription' : 'document credit'} for SME Studio AI`,
    },
    meta: {
      plan_type: planType,
      user_id: userId,
    },
  }
}

/**
 * Verify payment with PayChangu API
 */
export async function verifyPayment(
  transactionRef: string,
  secretKey: string
): Promise<PaymentVerificationResponse> {
  try {
    const response = await fetch('https://api.paychangu.com/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        tx_ref: transactionRef,
      }),
    })

    if (!response.ok) {
      return {
        success: false,
        message: 'Payment verification failed',
      }
    }

    const data = await response.json()
    return {
      success: data.success,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return {
      success: false,
      message: 'Payment verification error',
    }
  }
}
