# Simulated Payment Flow Guide

## Overview

The subscription system now uses **simulated payments** for testing. When a user clicks "Subscribe Now", the following happens:

1. **Loading Toast** - Shows "Processing [Plan] subscription..." message
2. **Simulated Delay** - Waits 2 seconds to simulate payment processing
3. **Database Update** - Activates subscription in the database
4. **Success Toast** - Shows success message with checkmark
5. **Page Reload** - Refreshes to show updated subscription status

## How It Works

### User Flow

```
User clicks "Subscribe Now"
    ↓
SubscriptionModal opens (or from Settings tab)
    ↓
User selects Monthly or Weekly plan
    ↓
Click "Subscribe Now" button
    ↓
Loading toast appears: "Processing Monthly subscription..."
    ↓
2-second simulated payment delay
    ↓
API call to /api/auth/subscribe
    ↓
Database updated:
  - subscriptionActive = true
  - subscriptionPlan = "monthly" or "weekly"
  - subscriptionEndDate = 30 or 7 days from now
  - documentsRemaining = 999
    ↓
Payment record created in database
    ↓
Success toast: "✅ Monthly subscription activated! You now have unlimited access."
    ↓
Page reloads after 1.5 seconds
    ↓
User sees updated dashboard with subscription active
```

## API Endpoint

### POST /api/auth/subscribe

**Request:**
```json
{
  "plan": "monthly" or "weekly",
  "amount": 25000 or 10000
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Monthly subscription activated successfully",
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "subscriptionActive": true,
      "subscriptionPlan": "monthly",
      "subscriptionEndDate": "2025-02-18T10:17:54.000Z",
      "documentsRemaining": 999
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Unauthorized" or "Invalid token" or "Failed to process subscription"
}
```

## Testing the Simulated Payment

### Test Case 1: Monthly Subscription
1. Login to account without subscription
2. Go to Settings tab
3. Click "Subscribe Now" on Monthly Plan
4. See loading toast for 2 seconds
5. See success toast
6. Page reloads
7. Dashboard shows "Subscription: Active"
8. Can now access document generators

### Test Case 2: Weekly Subscription
1. Login to account without subscription
2. Click "Generate Documents" tab
3. See "Subscription Required" message
4. Click "Upgrade Now"
5. SubscriptionModal opens
6. Click "Subscribe Now" on Weekly Plan
7. See loading toast for 2 seconds
8. See success toast
9. Page reloads
10. Can now access generators

### Test Case 3: From Dashboard
1. Login without subscription
2. Go to Settings tab
3. See both Monthly and Weekly plans
4. Click either "Subscribe Now"
5. Modal opens
6. Complete subscription
7. Dashboard updates

## Database Changes

When subscription is activated:

```sql
UPDATE "User" SET
  subscriptionActive = true,
  subscriptionPlan = 'monthly',
  subscriptionEndDate = NOW() + INTERVAL '30 days',
  documentsRemaining = 999
WHERE id = 'user_id';

INSERT INTO "Payment" (
  userId,
  amount,
  currency,
  paymentMethod,
  status,
  transactionId,
  description
) VALUES (
  'user_id',
  25000,
  'MWK',
  'simulated',
  'COMPLETED',
  'SIM_1234567890_abc123def',
  'Monthly Subscription - Simulated Payment'
);
```

## Simulated Payment Details

- **Payment Method**: `simulated`
- **Status**: Always `COMPLETED`
- **Transaction ID**: Format: `SIM_{timestamp}_{random}`
- **Amount**: 25,000 (monthly) or 10,000 (weekly)
- **Currency**: MWK
- **Processing Time**: 2 seconds (simulated)

## Switching from Simulated to Real Payments

When you're ready to use real PayChangu payments:

1. **Update SubscriptionModal.tsx**:
   ```typescript
   // Replace simulated payment with PayChangu checkout
   if (typeof window !== 'undefined' && (window as any).PaychanguCheckout) {
     (window as any).PaychanguCheckout({
       public_key: process.env.NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY,
       tx_ref: tx_ref,
       amount: amount,
       currency: 'MWK',
       // ... rest of PayChangu config
     })
   }
   ```

2. **Keep the /api/auth/subscribe endpoint** - It will be called by PayChangu callback

3. **Update payment method** - Change from `'simulated'` to `'paychangu'`

## Testing Checklist

- [ ] Can subscribe to Monthly plan
- [ ] Can subscribe to Weekly plan
- [ ] Loading toast appears
- [ ] Success toast appears
- [ ] Page reloads after success
- [ ] Dashboard shows active subscription
- [ ] Can access document generators
- [ ] Subscription end date is correct
- [ ] Payment record created in database
- [ ] User can see subscription in Settings

## Troubleshooting

### Issue: "Unauthorized" error
**Solution**: Make sure you're logged in and have valid token

### Issue: "Failed to process subscription"
**Solution**: Check API endpoint is accessible and database is connected

### Issue: Page doesn't reload
**Solution**: Check browser console for errors, may need manual refresh

### Issue: Subscription doesn't activate
**Solution**: 
- Check database for Payment record
- Verify User.subscriptionActive is true
- Check subscriptionEndDate is in future

## Files Modified

- `app/components/SubscriptionModal.tsx` - Simulated payment handler
- `app/client-dashboard/page.tsx` - Updated buttons to use modal
- `app/api/auth/subscribe/route.ts` - NEW: Handles subscription activation

## Next Steps

1. **Test thoroughly** - Try all subscription flows
2. **Monitor database** - Check Payment and User records
3. **Gather feedback** - Get user feedback on flow
4. **Integrate PayChangu** - When ready for real payments
5. **Add email notifications** - Send confirmation emails
