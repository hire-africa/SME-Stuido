# AI Features Integration Guide

## Overview

All AI features in SME Studio AI are powered by OpenAI's GPT-4 model. This guide covers setup, usage, and API endpoints.

## Setup

### 1. Environment Configuration

Add to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies

```bash
npm install openai
```

### 3. Verify Installation

```bash
npm run dev
```

Check that the app starts without errors.

## AI Features

### 1. Business Proposal Generator

**Endpoint**: `POST /api/ai/proposal`

**Purpose**: Generate comprehensive business proposals for loan applications, investor pitches, or business planning.

**Request Body**:
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
    "proposal": "Full proposal text with all sections...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Sections Generated**:
- Executive Summary
- Company Overview
- Market Analysis
- Products/Services
- Marketing Strategy
- Operational Plan
- Management Team
- Financial Projections
- Risk Analysis
- Implementation Timeline

---

### 2. Pitch Deck Generator

**Endpoint**: `POST /api/ai/pitch-deck`

**Purpose**: Create investor-ready pitch deck outlines with 12 slides.

**Request Body**:
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

**Slides Included**:
1. Title Slide
2. Problem
3. Solution
4. Market Opportunity
5. Business Model
6. Traction/Proof
7. Team
8. Financial Projections
9. Use of Funds
10. Competitive Advantage
11. Call to Action
12. Contact

---

### 3. Company Profile Generator

**Endpoint**: `POST /api/ai/company-profile`

**Purpose**: Create professional company profiles for tenders, clients, and partnerships.

**Request Body**:
```json
{
  "businessName": "Malawi Logistics Ltd",
  "businessType": "Logistics & Transportation",
  "yearsInOperation": 5,
  "teamSize": 12,
  "services": ["Courier services", "Bulk transport", "Cold chain logistics"],
  "achievements": ["Delivered 100,000+ packages", "99% on-time delivery", "ISO certified"],
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

**Sections Included**:
- Company Overview
- Mission & Vision
- Our Services
- Why Choose Us
- Team Highlights
- Key Achievements
- Client Testimonials
- Contact Information

---

### 4. Cashflow Projections

**Endpoint**: `POST /api/ai/cashflow`

**Purpose**: Generate detailed monthly cashflow projections with financial analysis.

**Request Body**:
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

**Analysis Includes**:
- Revenue projections with seasonal adjustments
- Operating expenses breakdown
- Capital expenditures
- Cash inflows and outflows
- Cumulative cash position
- Break-even analysis
- Key assumptions
- Risk factors

---

### 5. Pricing Recommendations

**Endpoint**: `POST /api/ai/pricing`

**Purpose**: Generate data-driven pricing strategies based on costs and market analysis.

**Request Body**:
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

**Recommendations Include**:
- Recommended Retail Price
- Wholesale Price
- Markup Analysis
- Profit Margin Breakdown
- Discount Strategy
- Package Options
- Seasonal Pricing Adjustments
- Competitive Positioning

---

### 6. Executive Summary Generator

**Endpoint**: `POST /api/ai/executive-summary`

**Purpose**: Create powerful 1-page executive summaries for investors and banks.

**Request Body**:
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
    "projectedRevenue": "MK 50M in year 1",
    "breakeven": "Month 8"
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

**Sections Included**:
- Company Overview
- Problem & Opportunity
- Solution & Unique Value Proposition
- Market Size & Target
- Business Model
- Financial Highlights
- Funding Request & Use of Funds
- Call to Action

---

### 7. Branding Recommendations

**Endpoint**: `POST /api/ai/branding`

**Purpose**: Generate comprehensive branding strategy and visual guidelines.

**Request Body**:
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

**Recommendations Include**:
- Brand Mission & Vision
- Brand Values
- Brand Personality Traits
- Tagline Options (3-5)
- Color Palette (with hex codes)
- Typography Suggestions
- Logo Concept Ideas
- Brand Voice Guidelines
- Social Media Bio Template
- Brand Story

---

### 8. AI Business Coach

**Endpoint**: `POST /api/ai/coach`

**Purpose**: Get personalized business coaching and improvement suggestions.

**Request Body**:
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

**Advice Includes**:
- Root Cause Analysis
- 3-5 Actionable Solutions
- Implementation Steps
- Expected Outcomes
- Resources Needed
- Timeline
- Success Metrics
- Potential Risks & Mitigation

---

### 9. Startup Roadmap Generator

**Endpoint**: `POST /api/ai/roadmap`

**Purpose**: Create a detailed 30-day startup execution roadmap.

**Request Body**:
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

**Roadmap Includes**:
- **Week 1**: Foundation (Legal, Financial, Team)
- **Week 2**: Operations (Suppliers, Systems, QA)
- **Week 3**: Marketing (Brand Launch, Social Media)
- **Week 4**: Launch & Optimization (Soft Launch, Feedback)

Each task includes:
- Specific action items
- Responsible person
- Budget allocation
- Success metrics
- Dependencies

---

## Frontend Integration Example

```typescript
// Example: Generate a business proposal
async function generateProposal() {
  const response = await fetch('/api/ai/proposal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: 'My Business',
      businessType: 'Retail',
      sector: 'Retail shops',
      description: 'We sell clothing and accessories',
      targetMarket: 'Young professionals',
      monthlyRevenue: 300000,
    }),
  })

  const data = await response.json()
  if (data.success) {
    console.log('Proposal:', data.data.proposal)
  } else {
    console.error('Error:', data.error)
  }
}
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

**Common Errors**:
- `Missing required fields` - Check all required parameters
- `Failed to generate [feature]` - API error, check OpenAI status
- `Invalid input` - Validate input data format

## Rate Limiting

OpenAI API has rate limits. For production:
- Implement request queuing
- Add exponential backoff for retries
- Cache results when possible
- Monitor API usage

## Cost Considerations

Each API call uses OpenAI credits:
- Proposal generation: ~$0.10-0.15
- Pitch deck: ~$0.08-0.12
- Other features: ~$0.05-0.10

**Optimization**:
- Cache frequently requested templates
- Batch similar requests
- Use smaller models for simple tasks
- Implement usage limits per user

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Test proposal generation
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

### Production Testing

1. Test with real user data
2. Verify output quality
3. Monitor API usage
4. Check response times
5. Test error scenarios

## Security

### Best Practices

1. **API Key Protection**
   - Never expose `OPENAI_API_KEY` in client-side code
   - Always call AI endpoints from backend
   - Rotate keys regularly

2. **Input Validation**
   - Validate all user inputs
   - Sanitize text before sending to API
   - Check for prompt injection attempts

3. **Rate Limiting**
   - Implement per-user rate limits
   - Add request throttling
   - Monitor for abuse

4. **Data Privacy**
   - Don't send sensitive data to OpenAI
   - Comply with data protection regulations
   - Inform users about AI usage

## Troubleshooting

### "Cannot find module 'openai'"
- Run `npm install openai`
- Restart dev server

### "API key not found"
- Check `.env.local` has `OPENAI_API_KEY`
- Verify key is correct
- Restart dev server

### "Rate limit exceeded"
- Wait before making new requests
- Implement request queuing
- Contact OpenAI for higher limits

### "Invalid request"
- Check request body format
- Verify all required fields
- Check field data types

## Future Enhancements

1. **Streaming Responses**
   - Real-time generation feedback
   - Progressive content delivery

2. **Multi-language Support**
   - Generate in Chichewa, English, etc.
   - Localized recommendations

3. **Document Export**
   - PDF generation
   - Word document creation
   - PowerPoint slides

4. **Caching & Optimization**
   - Cache similar requests
   - Batch API calls
   - Reduce API costs

5. **Advanced Analytics**
   - Track which features are used
   - Monitor generation quality
   - Optimize prompts based on feedback

## Support

- **OpenAI Documentation**: https://platform.openai.com/docs
- **API Status**: https://status.openai.com
- **Support**: support@openai.com
