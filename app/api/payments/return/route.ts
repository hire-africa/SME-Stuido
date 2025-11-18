import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tx_ref = searchParams.get('tx_ref')
    const status = searchParams.get('status')

    // Log the payment result
    console.log('PayChangu Return - TX Ref:', tx_ref, 'Status:', status)

    if (status === 'success') {
      // Payment successful - redirect to dashboard with success message
      return NextResponse.redirect(
        new URL(
          `/client-dashboard?payment=success&tx_ref=${tx_ref}`,
          request.url
        )
      )
    } else if (status === 'failed') {
      // Payment failed - redirect to settings with error message
      return NextResponse.redirect(
        new URL(
          `/client-dashboard?payment=failed&tx_ref=${tx_ref}`,
          request.url
        )
      )
    } else {
      // Unknown status - redirect to dashboard
      return NextResponse.redirect(new URL('/client-dashboard', request.url))
    }
  } catch (error) {
    console.error('Payment return handler error:', error)
    return NextResponse.redirect(new URL('/client-dashboard', request.url))
  }
}
