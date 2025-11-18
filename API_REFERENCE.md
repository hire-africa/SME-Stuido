# API Reference - SME Studio AI

## Base URL
```
http://localhost:3000/api
```

---

## AI Features API

### 1. Business Proposal Generator

**Endpoint**: `POST /ai/proposal`

**Description**: Generate comprehensive business proposals with 10+ sections

**Request**:
```json
{
  "businessName": "Tech Solutions Ltd",
  "businessType": "Software Development",
  "sector": "ICT & Software",
  "description": "We develop custom business management software",
  "targetMarket": "SMEs in Malawi",
  "monthlyRevenue": 500000,
  "fundingNeeded": 2000000,
  "fundingPurpose": "Expand team and marketing"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "proposal": "Full proposal text...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, sector, description, targetMarket

---

### 2. Pitch Deck Generator

**Endpoint**: `POST /ai/pitch-deck`

**Description**: Create 12-slide investor pitch deck outlines

**Request**:
```json
{
  "businessName": "FarmTech Solutions",
  "tagline": "Connecting farmers to markets",
  "problemStatement": "Farmers struggle to reach buyers directly",
  "solution": "Mobile platform connecting farmers to retailers",
  "targetMarket": "Smallholder farmers in Malawi",
  "marketSize": "2 million farmers",
  "businessModel": "Commission-based (5% per transaction)",
  "fundingAmount": 5000000,
  "useOfFunds": "App development, marketing, team"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pitchDeck": "Slide-by-slide content...",
    "slideCount": 12,
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: All fields are required

---

### 3. Company Profile Generator

**Endpoint**: `POST /ai/company-profile`

**Description**: Create professional company profiles for tenders and partnerships

**Request**:
```json
{
  "businessName": "Malawi Logistics Ltd",
  "businessType": "Logistics & Transportation",
  "yearsInOperation": 5,
  "teamSize": 12,
  "services": ["Courier services", "Bulk transport", "Cold chain logistics"],
  "achievements": ["Delivered 100,000+ packages", "99% on-time delivery"],
  "sector": "Transport"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "profile": "Company profile content...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, sector, services, achievements

---

### 4. Cashflow Projections

**Endpoint**: `POST /ai/cashflow`

**Description**: Generate 12-month financial projections with analysis

**Request**:
```json
{
  "businessName": "Mama's Restaurant",
  "sector": "Restaurants & Fast-food",
  "monthlyRevenue": 800000,
  "monthlyExpenses": 500000,
  "seasonalityFactor": 1.2,
  "growthRate": 0.08,
  "months": 12
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "cashflow": "Month-by-month projections...",
    "period": "12 months",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, sector, monthlyRevenue, monthlyExpenses

---

### 5. Pricing Recommendations

**Endpoint**: `POST /ai/pricing`

**Description**: Generate data-driven pricing strategies

**Request**:
```json
{
  "productName": "Handmade soap bars",
  "sector": "Beauty & Cosmetics",
  "costOfProduction": 1500,
  "targetMarket": "Urban middle-class women",
  "competitorPrices": "MK 3,000 - MK 5,000"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pricing": "Pricing recommendations...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: productName, sector, costOfProduction, targetMarket

---

### 6. Executive Summary Generator

**Endpoint**: `POST /ai/executive-summary`

**Description**: Create powerful 1-page business summaries

**Request**:
```json
{
  "businessName": "Green Energy Solutions",
  "businessType": "Renewable Energy",
  "problemStatement": "Malawi faces energy shortage affecting businesses",
  "solution": "Solar panel installation and maintenance services",
  "marketOpportunity": "50,000+ businesses need reliable power",
  "fundingNeeded": 3000000,
  "keyMetrics": {
    "targetCustomers": "500 businesses in year 1",
    "projectedRevenue": "MK 50M in year 1"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "summary": "Executive summary content...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, problemStatement, solution, marketOpportunity

---

### 7. Branding Recommendations

**Endpoint**: `POST /ai/branding`

**Description**: Generate comprehensive branding strategy and guidelines

**Request**:
```json
{
  "businessName": "Mwali Crafts",
  "businessType": "Handmade crafts & souvenirs",
  "targetAudience": "Tourists and gift buyers",
  "brandPersonality": "Authentic, vibrant, culturally proud"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "branding": "Branding recommendations...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, targetAudience, brandPersonality

---

### 8. Business Coach

**Endpoint**: `POST /ai/coach`

**Description**: Get personalized business coaching and improvement suggestions

**Request**:
```json
{
  "businessName": "Mwali Tailoring",
  "businessType": "Clothing & Fashion",
  "currentChallenge": "Sales have plateaued at MK 2M/month",
  "context": "We have 3 employees, located in Lilongwe, target young professionals"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "advice": "Business coaching advice...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, currentChallenge, context

---

### 9. Startup Roadmap Generator

**Endpoint**: `POST /ai/roadmap`

**Description**: Create detailed 30-day startup execution roadmap

**Request**:
```json
{
  "businessName": "Digital Marketing Agency",
  "businessType": "Marketing & Advertising",
  "launchDate": "2024-02-01",
  "initialBudget": 5000000
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "roadmap": "Week-by-week roadmap...",
    "duration": "30 days",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Required Fields**: businessName, businessType, launchDate, initialBudget

---

## Payment API

### 1. Initiate Payment

**Endpoint**: `POST /payments/initiate`

**Description**: Initiate a payment for a plan

**Request**:
```json
{
  "userId": "user_id_here",
  "planType": "monthly",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "checkoutConfig": {
      "public_key": "pub-test-...",
      "tx_ref": "tx_1234567890",
      "amount": 25000,
      "currency": "MWK",
      "callback_url": "...",
      "return_url": "...",
      "customer": {...},
      "customization": {...},
      "meta": {...}
    },
    "paymentId": "payment_id_here"
  }
}
```

**Required Fields**: userId, planType, email, firstName, lastName

**Plan Types**: "monthly" | "pay-per-doc"

---

### 2. Payment Callback (Webhook)

**Endpoint**: `POST /payments/callback`

**Description**: Webhook handler for payment verification

**Request** (from PayChangu):
```json
{
  "tx_ref": "tx_1234567890"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Payment verified and processed successfully",
  "data": {
    "paymentId": "payment_id_here",
    "status": "COMPLETED"
  }
}
```

---

### 3. Check Payment Status

**Endpoint**: `GET /payments/callback?tx_ref=tx_1234567890`

**Description**: Check the status of a payment

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "payment_id",
    "userId": "user_id",
    "amount": 25000,
    "currency": "MWK",
    "status": "COMPLETED",
    "reference": "tx_1234567890",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Authentication API

### 1. Sign Up

**Endpoint**: `POST /auth/signup`

**Description**: Register a new user

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe",
  "businessName": "My Business",
  "phone": "+265123456789"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "role": "CLIENT",
      "subscriptionActive": false
    }
  }
}
```

**Required Fields**: email, password, fullName, businessName

---

### 2. Login

**Endpoint**: `POST /auth/login`

**Description**: Log in an existing user

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "role": "CLIENT",
      "subscriptionActive": true
    }
  }
}
```

**Required Fields**: email, password

---

### 3. Logout

**Endpoint**: `POST /auth/logout`

**Description**: Log out the current user

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

### Common Error Codes

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Missing required fields | Incomplete request body |
| 400 | Invalid plan type | planType not "monthly" or "pay-per-doc" |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not found | Resource doesn't exist |
| 500 | Failed to generate | API error or service issue |

---

## Rate Limiting

Currently no rate limiting implemented. Recommended limits:

- **Per user**: 100 requests/day
- **Per IP**: 1000 requests/day
- **Per endpoint**: 10 requests/minute

---

## Authentication

Include JWT token in request headers:

```
Authorization: Bearer <jwt_token>
```

Or use httpOnly cookies (automatically handled by Next.js).

---

## Testing with cURL

### Test AI Endpoint
```bash
curl -X POST http://localhost:3000/api/ai/proposal \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "businessType": "Retail",
    "sector": "Retail shops",
    "description": "Test description",
    "targetMarket": "General public"
  }'
```

### Test Payment Initiation
```bash
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_id",
    "planType": "monthly",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword123",
    "fullName": "New User",
    "businessName": "New Business"
  }'
```

---

## Response Times

Expected response times:

| Endpoint | Time |
|----------|------|
| AI Proposal | 10-15 seconds |
| AI Pitch Deck | 8-12 seconds |
| AI Company Profile | 5-8 seconds |
| AI Cashflow | 8-10 seconds |
| AI Pricing | 5-7 seconds |
| AI Executive Summary | 5-8 seconds |
| AI Branding | 8-10 seconds |
| AI Business Coach | 8-12 seconds |
| AI Startup Roadmap | 10-15 seconds |
| Payment Initiate | <1 second |
| Auth Endpoints | <1 second |

---

## Webhook Events

PayChangu sends webhooks for:

1. **Payment Completed**
   - Triggers: User subscription activated
   - Endpoint: `/api/payments/callback`

2. **Payment Failed**
   - Triggers: Payment marked as failed
   - Endpoint: `/api/payments/callback`

---

## API Versioning

Current version: **v1**

Future versions will use URL prefix: `/api/v2/...`

---

## Support

For API issues:
- Check documentation files
- Review code examples
- Test with curl
- Check console logs
- Contact support@openai.com (for AI issues)
- Contact support@paychangu.com (for payment issues)

---

**Last Updated**: 2024-01-18
**API Version**: 1.0
**Status**: Production Ready
