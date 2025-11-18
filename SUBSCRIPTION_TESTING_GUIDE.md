# Subscription & Real Data Testing Guide

## Quick Start

### Demo Accounts
```
WITH SUBSCRIPTION:
Email: client@demo.com
Password: password123
Status: Active subscription (30 days)

WITHOUT SUBSCRIPTION:
Create a new account during signup
Status: No subscription by default
```

## Test Scenarios

### Scenario 1: User Without Subscription
1. Create a new account or login to account without subscription
2. Navigate to `/client-dashboard`
3. Click on "Generate Documents" tab
4. **Expected**: See "Subscription Required" message with "Upgrade Now" button
5. Click "Upgrade Now"
6. **Expected**: Subscription modal appears with two plans

### Scenario 2: User With Subscription
1. Login as `client@demo.com` (password: `password123`)
2. Navigate to `/client-dashboard`
3. **Expected**: Dashboard shows:
   - Welcome message: "Welcome back, Demo Client!"
   - KPI Cards show:
     - Documents Created: Real count from database
     - Completed: Real count of completed documents
     - Business Name: "Demo Business Ltd"
     - Subscription: "Active" with green indicator
     - Renewal date: 30 days from now

4. Click "Generate Documents" tab
5. **Expected**: See subscription banner showing:
   - "Unlimited Access"
   - Monthly Plan: MK 25,000
   - Renewal date
   - All 8 document generators available

### Scenario 3: Real User Profile Data
1. Login to any account
2. Navigate to Settings tab
3. **Expected**: Fields populated with real data:
   - Full Name: User's actual name
   - Business Name: User's business
   - Email: User's email
   - Phone: User's phone (if provided)

4. Check top-right avatar
5. **Expected**: 
   - If avatar URL exists: Shows profile picture
   - If no avatar: Shows initials (e.g., "DC" for "Demo Client")

### Scenario 4: Document Generation Access
1. Login without subscription
2. Try to access `/generate/proposal`
3. **Expected**: Blocked with subscription modal
4. Try to access `/generate/pitch-deck`
5. **Expected**: Blocked with subscription modal

### Scenario 5: Subscription Modal
1. Click "Upgrade Now" from any protected page
2. **Expected**: Modal shows:
   - Two plan options (Monthly & Weekly)
   - Feature list with checkmarks
   - Pricing information
   - "Subscribe Now" buttons

3. Click "Subscribe Now" for Monthly Plan
4. **Expected**: PayChangu checkout opens

### Scenario 6: Dashboard KPI Cards
1. Login with subscription
2. Check dashboard KPI cards
3. **Expected**: All cards show real data:
   - Documents Created: Count of all user projects
   - Completed: Count of COMPLETED projects
   - Business Name: From user profile
   - Subscription: Status and renewal date

### Scenario 7: Recent Documents Table
1. Login with subscription
2. Dashboard tab shows "Recent Documents"
3. **Expected**: 
   - Table populated with real projects
   - Shows project names, types, sectors, dates, statuses
   - Action buttons (View, Download) available

## API Endpoints to Test

### Fetch Projects
```bash
GET /api/projects
Headers: Authorization: Bearer {token}
Expected: Array of user's projects
```

### Create Project
```bash
POST /api/projects
Headers: Authorization: Bearer {token}
Body: {
  "title": "My Project",
  "type": "PROPOSAL",
  "sector": "Agriculture",
  "content": null,
  "metadata": null
}
Expected: Created project object
```

### Login
```bash
POST /api/auth/login
Body: {
  "email": "client@demo.com",
  "password": "password123"
}
Expected: User object with subscription fields
```

## Verification Checklist

- [ ] Users without subscription cannot access generators
- [ ] Users with subscription can access generators
- [ ] Dashboard shows real user name
- [ ] Dashboard shows real business name
- [ ] Dashboard shows real subscription status
- [ ] Dashboard shows real document counts
- [ ] Settings page shows real user data
- [ ] Avatar shows initials or image
- [ ] Subscription modal appears when needed
- [ ] PayChangu integration works
- [ ] Projects API returns real data
- [ ] Subscription end date displays correctly

## Troubleshooting

### Issue: "Subscription Required" always shows
- Check user's `subscriptionActive` field in database
- Verify token is being passed correctly
- Check browser console for errors

### Issue: User data not showing
- Verify user fields are populated in database
- Check authStore is receiving full user object
- Verify localStorage has correct auth data

### Issue: Projects not loading
- Check API endpoint is accessible
- Verify token is valid
- Check database has projects for user
- Look at network tab in DevTools

### Issue: Avatar not showing
- Check avatar URL is valid
- Verify image URL is accessible
- Check fallback initials display

## Database Queries for Testing

### Check user subscription status
```sql
SELECT id, email, fullName, businessName, subscriptionActive, subscriptionPlan, subscriptionEndDate 
FROM "User" 
WHERE email = 'client@demo.com';
```

### Check user projects
```sql
SELECT id, title, type, sector, status, createdAt 
FROM "Project" 
WHERE userId = '{userId}' 
ORDER BY createdAt DESC;
```

### Update subscription for testing
```sql
UPDATE "User" 
SET subscriptionActive = true, subscriptionPlan = 'monthly', subscriptionEndDate = NOW() + INTERVAL '30 days'
WHERE email = 'test@example.com';
```
