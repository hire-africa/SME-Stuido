# PayChangu Quick Start Guide

## Setup (5 minutes)

### 1. Update Environment Variables
Edit `.env.local`:
```env
NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY=pub-test-HYSBQpa5K91mmXMHrjhkmC6mAjObPJ2u
PAYCHANGU_SECRET_KEY=your_paychangu_secret_key_here
```

Get your keys from: https://dashboard.paychangu.com/settings/api-keys

### 2. Verify Database Schema
Run migrations if needed:
```bash
npx prisma migrate dev
```

The Payment model and User subscription fields are already in `prisma/schema.prisma`.

### 3. Test the Integration

#### Option A: Local Testing
```bash
npm run dev
```
1. Go to http://localhost:3000/pricing
2. Sign up or log in
3. Click "Subscribe Now" or "Buy Now"
4. Use test card: `4242 4242 4242 4242`

#### Option B: Direct API Testing
```bash
# Initiate payment
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "planType": "monthly",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Check payment status
curl http://localhost:3000/api/payments/callback?tx_ref=tx_123456
```

## How It Works

### For Users
1. **Browse Plans** → Visit `/pricing` page
2. **Authenticate** → Log in with account
3. **Select Plan** → Click "Subscribe Now" or "Buy Now"
4. **PayChangu Popup** → Enter payment details
5. **Confirm** → Complete payment
6. **Automatic Activation** → Subscription/credits added instantly

### For Developers

#### Initiate Payment
```typescript
// Frontend
const response = await fetch('/api/payments/initiate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    planType: 'monthly',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
  })
})

const { data } = await response.json()
// data.checkoutConfig contains PayChangu configuration
// data.paymentId is the database payment record ID
```

#### Handle Payment Success
```typescript
// Backend automatically handles via webhook
// Payment status updated to COMPLETED
// User subscription activated
// Email receipt sent (if enabled in PayChangu)
```

#### Check Payment Status
```typescript
// Frontend polling
const response = await fetch(`/api/payments/callback?tx_ref=${txRef}`)
const payment = await response.json()
console.log(payment.data.status) // PENDING, COMPLETED, or FAILED
```

## Plan Pricing

| Plan | Amount | Currency | Duration | Use Case |
|------|--------|----------|----------|----------|
| Monthly | MK 25,000 | MWK | 30 days | Active SMEs |
| Pay As You Go | MK 5,000 | MWK | Lifetime | Occasional users |

## Database Schema

### Payment Record
```javascript
{
  id: "cuid",
  userId: "user_id",
  amount: 25000,
  currency: "MWK",
  paymentMethod: "paychangu",
  status: "COMPLETED", // PENDING, COMPLETED, FAILED, REFUNDED
  transactionId: "paychangu_tx_id",
  reference: "tx_1234567890",
  description: "Monthly Subscription - Unlimited documents",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### User Subscription Fields
```javascript
{
  subscriptionActive: true,
  subscriptionPlan: "monthly", // or "pay-per-doc"
  subscriptionEndDate: "2024-02-01T00:00:00Z",
  documentsRemaining: 5
}
```

## Testing Scenarios

### ✅ Successful Payment
1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any CVC
4. Expected: Payment marked COMPLETED, user subscription activated

### ❌ Failed Payment
1. Use card: `5555 5555 5555 4444`
2. Expected: Payment marked FAILED, user not charged

### 📱 Mobile Money
1. Use Airtel Money: `990000000`
2. Expected: Payment processed via mobile money

## Troubleshooting

### "Payment service not configured"
- Check `.env.local` has both keys
- Restart dev server after updating env

### "PayChangu service not available"
- Check PayChangu script loaded: `window.PaychanguCheckout` exists
- Check browser console for script errors
- Verify internet connection

### "Payment verification failed"
- Check `PAYCHANGU_SECRET_KEY` is correct
- Verify PayChangu API status
- Check payment reference exists in database

### "User not authenticated"
- Ensure user is logged in before clicking subscribe
- Check auth token in localStorage

## Production Deployment

### Before Going Live
1. [ ] Get production API keys from PayChangu
2. [ ] Update `.env.local` with production keys
3. [ ] Update callback URLs to production domain
4. [ ] Enable HTTPS
5. [ ] Configure PayChangu webhooks in dashboard
6. [ ] Test full payment flow
7. [ ] Set up payment monitoring

### Production Environment Variables
```env
NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY=pub-live-xxxxxxxxxxxxx
PAYCHANGU_SECRET_KEY=secret-live-xxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

## Common Tasks

### Check User Subscription Status
```sql
SELECT 
  email,
  subscriptionActive,
  subscriptionPlan,
  subscriptionEndDate,
  documentsRemaining
FROM "User"
WHERE id = 'user_id';
```

### View Payment History
```sql
SELECT 
  id,
  amount,
  currency,
  status,
  reference,
  createdAt
FROM "Payment"
WHERE userId = 'user_id'
ORDER BY createdAt DESC;
```

### Manually Activate Subscription
```sql
UPDATE "User"
SET 
  subscriptionActive = true,
  subscriptionPlan = 'monthly',
  subscriptionEndDate = NOW() + INTERVAL '30 days'
WHERE id = 'user_id';
```

## Support Resources

- **PayChangu Docs**: https://paychangu.com/docs
- **PayChangu Dashboard**: https://dashboard.paychangu.com
- **Implementation Guide**: See `PAYCHANGU_IMPLEMENTATION.md`
- **API Reference**: Check inline code comments

## Next Steps

1. ✅ Set up environment variables
2. ✅ Test with local dev server
3. ✅ Verify database updates
4. ✅ Test with production keys
5. ✅ Deploy to production
6. ✅ Monitor payments in dashboard
