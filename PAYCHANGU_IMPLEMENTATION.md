# PayChangu Payment Integration Guide

## Overview
This document describes the PayChangu payment integration for SME Studio AI, enabling users to purchase subscription plans and pay-per-document credits.

## Architecture

### Components Created

#### 1. **PayChangu Service** (`lib/paychangu.ts`)
- `generateTransactionRef()` - Creates unique transaction references
- `createCheckoutConfig()` - Generates PayChangu checkout configuration
- `verifyPayment()` - Verifies payments with PayChangu API

#### 2. **Payment API Routes**

##### Initiate Payment (`app/api/payments/initiate/route.ts`)
- **POST** `/api/payments/initiate`
- Accepts: `userId`, `planType`, `email`, `firstName`, `lastName`
- Returns: Checkout configuration for PayChangu
- Creates pending payment record in database

##### Payment Callback (`app/api/payments/callback/route.ts`)
- **POST** `/api/payments/callback` - Webhook handler for payment verification
- **GET** `/api/payments/callback` - Status check endpoint
- Verifies payment with PayChangu API
- Updates user subscription or document credits
- Updates payment status in database

#### 3. **PayChangu Checkout Component** (`app/components/PayChanguCheckout.tsx`)
- Client-side component that triggers PayChangu payment flow
- Loads PayChangu script dynamically
- Handles payment success/error callbacks
- Polls for payment status completion

#### 4. **Updated Pricing Page** (`app/pricing/page.tsx`)
- Integrated PayChangu checkout buttons
- Shows checkout for authenticated users
- Redirects to signup for unauthenticated users

## Payment Flow

```
User clicks "Subscribe Now" / "Buy Now"
    ↓
PayChanguCheckout component loads
    ↓
Calls /api/payments/initiate
    ↓
Backend creates pending payment record
    ↓
Returns checkout configuration
    ↓
PayChangu popup opens
    ↓
User enters payment details
    ↓
PayChangu processes payment
    ↓
Webhook calls /api/payments/callback (POST)
    ↓
Backend verifies with PayChangu API
    ↓
Updates payment status to COMPLETED
    ↓
Updates user subscription/credits
    ↓
Component polls for completion
    ↓
Redirects to dashboard on success
```

## Plan Details

### Monthly Subscription
- **Amount**: MK 25,000
- **Currency**: MWK
- **Duration**: 30 days
- **Features**: Unlimited documents, all templates, priority support
- **Database Update**: 
  - `subscriptionActive` = true
  - `subscriptionPlan` = "monthly"
  - `subscriptionEndDate` = now + 30 days

### Pay As You Go
- **Amount**: MK 5,000 per document
- **Currency**: MWK
- **Duration**: Lifetime access
- **Features**: One document at a time
- **Database Update**:
  - `documentsRemaining` += 1

## Environment Variables

Add to `.env.local`:

```env
# PayChangu Payment Gateway
NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY=pub-test-HYSBQpa5K91mmXMHrjhkmC6mAjObPJ2u
PAYCHANGU_SECRET_KEY=your_paychangu_secret_key_here
```

**Note**: Replace `PAYCHANGU_SECRET_KEY` with your actual secret key from PayChangu dashboard.

## Testing

### Test Card
- **Card Number**: 4242 4242 4242 4242
- **Airtel Money**: 990000000

### Test Flow
1. Navigate to `/pricing`
2. Log in with test account
3. Click "Subscribe Now" or "Buy Now"
4. PayChangu popup opens
5. Enter test card details
6. Confirm payment
7. Check database for updated payment status
8. Verify user subscription status updated

## Database Schema

### Payment Model
```prisma
model Payment {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  amount        Float
  currency      String     @default("MWK")
  paymentMethod String     // "paychangu"
  status        PaymentStatus @default(PENDING)
  
  transactionId String?    @unique
  reference     String?    // tx_ref from PayChangu
  
  description   String?
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([userId])
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

### User Model Updates
```prisma
model User {
  // ... existing fields ...
  
  // Subscription
  subscriptionActive Boolean   @default(false)
  subscriptionPlan   String?   // "monthly" or "pay-per-doc"
  subscriptionEndDate DateTime?
  documentsRemaining Int       @default(0)
  
  payments      Payment[]
}
```

## Error Handling

### Common Errors

1. **Missing PayChangu Credentials**
   - Error: "Payment service not configured"
   - Solution: Add credentials to `.env.local`

2. **Payment Verification Failed**
   - Error: "Payment verification failed"
   - Solution: Check PayChangu API status, verify secret key

3. **User Not Authenticated**
   - Error: "Please log in to continue"
   - Solution: Redirect to login/signup

4. **Invalid Plan Type**
   - Error: "Invalid plan type"
   - Solution: Ensure planType is "monthly" or "pay-per-doc"

## Security Considerations

1. **Secret Key Protection**
   - Never expose `PAYCHANGU_SECRET_KEY` in client-side code
   - Always verify payments on backend
   - Use environment variables for sensitive data

2. **Transaction Verification**
   - Always verify payment with PayChangu API before updating user
   - Check transaction reference matches
   - Validate amount matches expected plan price

3. **CORS & HTTPS**
   - Use HTTPS in production
   - PayChangu script requires secure context
   - Configure CORS properly for webhook callbacks

## Webhook Configuration

In PayChangu Dashboard:
1. Go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payments/callback`
3. Select events: Payment Completed, Payment Failed
4. Save and test webhook

## Production Checklist

- [ ] Replace test public key with production key
- [ ] Replace test secret key with production key
- [ ] Update callback URLs to production domain
- [ ] Enable HTTPS
- [ ] Configure PayChangu webhooks
- [ ] Test payment flow end-to-end
- [ ] Set up payment monitoring/alerts
- [ ] Document payment troubleshooting procedures
- [ ] Set up subscription renewal reminders
- [ ] Implement refund policy

## Future Enhancements

1. **Subscription Management**
   - Allow users to cancel subscriptions
   - Implement subscription renewal
   - Add upgrade/downgrade functionality

2. **Payment History**
   - Display payment history in user dashboard
   - Generate invoices
   - Export payment reports

3. **Multiple Payment Methods**
   - Add Flutterwave integration
   - Support credit cards, mobile money, bank transfers
   - Add payment method selection

4. **Analytics**
   - Track conversion rates
   - Monitor failed payments
   - Revenue reporting

5. **Notifications**
   - Email receipts
   - Payment failure notifications
   - Subscription expiry reminders

## Support

For PayChangu API documentation, visit: https://paychangu.com/docs
For issues, contact: support@paychangu.com
