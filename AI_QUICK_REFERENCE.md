# AI Features Quick Reference

## Setup (2 minutes)

### 1. Add API Key to `.env.local`
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Package
```bash
npm install openai
```

### 3. Restart Dev Server
```bash
npm run dev
```

## API Endpoints Overview

| Feature | Endpoint | Purpose |
|---------|----------|---------|
| Business Proposal | `POST /api/ai/proposal` | Generate comprehensive proposals |
| Pitch Deck | `POST /api/ai/pitch-deck` | Create 12-slide investor decks |
| Company Profile | `POST /api/ai/company-profile` | Professional company profiles |
| Cashflow | `POST /api/ai/cashflow` | Monthly financial projections |
| Pricing | `POST /api/ai/pricing` | Pricing strategy recommendations |
| Executive Summary | `POST /api/ai/executive-summary` | 1-page powerful summaries |
| Branding | `POST /api/ai/branding` | Brand strategy & guidelines |
| Business Coach | `POST /api/ai/coach` | Personalized business advice |
| Startup Roadmap | `POST /api/ai/roadmap` | 30-day execution plan |

## Quick API Examples

### Generate a Proposal
```bash
curl -X POST http://localhost:3000/api/ai/proposal \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Tech Solutions",
    "businessType": "Software",
    "sector": "ICT & Software",
    "description": "Custom business software",
    "targetMarket": "SMEs in Malawi",
    "monthlyRevenue": 500000
  }'
```

### Generate a Pitch Deck
```bash
curl -X POST http://localhost:3000/api/ai/pitch-deck \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "FarmTech",
    "tagline": "Connecting farmers to markets",
    "problemStatement": "Farmers struggle to reach buyers",
    "solution": "Mobile platform for direct sales",
    "targetMarket": "Smallholder farmers",
    "marketSize": "2 million farmers",
    "businessModel": "Commission-based",
    "fundingAmount": 5000000,
    "useOfFunds": "App development and marketing"
  }'
```

### Generate Cashflow
```bash
curl -X POST http://localhost:3000/api/ai/cashflow \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Mama'\''s Restaurant",
    "sector": "Restaurants & Fast-food",
    "monthlyRevenue": 800000,
    "monthlyExpenses": 500000,
    "growthRate": 0.08,
    "months": 12
  }'
```

### Get Business Coaching
```bash
curl -X POST http://localhost:3000/api/ai/coach \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Mwali Tailoring",
    "businessType": "Clothing & Fashion",
    "currentChallenge": "Sales have plateaued",
    "context": "3 employees, located in Lilongwe"
  }'
```

## Frontend Integration Template

```typescript
// lib/aiClient.ts
export async function callAIFeature(
  endpoint: string,
  data: Record<string, any>
) {
  const response = await fetch(`/api/ai/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

// Usage
const proposal = await callAIFeature('proposal', {
  businessName: 'My Business',
  businessType: 'Retail',
  sector: 'Retail shops',
  description: 'We sell clothing',
  targetMarket: 'Young professionals',
})
```

## React Component Example

```typescript
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export function ProposalGenerator() {
  const [loading, setLoading] = useState(false)
  const [proposal, setProposal] = useState('')

  const handleGenerate = async (formData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setProposal(data.data.proposal)
        toast.success('Proposal generated!')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Failed to generate proposal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={() => handleGenerate({...})}>
        {loading ? 'Generating...' : 'Generate Proposal'}
      </button>
      {proposal && <div>{proposal}</div>}
    </div>
  )
}
```

## Required Fields by Feature

### Proposal
- businessName
- businessType
- sector
- description
- targetMarket

### Pitch Deck
- businessName
- tagline
- problemStatement
- solution
- targetMarket
- marketSize
- businessModel
- fundingAmount
- useOfFunds

### Company Profile
- businessName
- businessType
- sector
- services (array)
- achievements (array)

### Cashflow
- businessName
- sector
- monthlyRevenue
- monthlyExpenses

### Pricing
- productName
- sector
- costOfProduction
- targetMarket

### Executive Summary
- businessName
- businessType
- problemStatement
- solution
- marketOpportunity

### Branding
- businessName
- businessType
- targetAudience
- brandPersonality

### Business Coach
- businessName
- businessType
- currentChallenge
- context

### Startup Roadmap
- businessName
- businessType
- launchDate
- initialBudget

## Response Format

All endpoints return:
```json
{
  "success": true,
  "data": {
    "proposal": "Generated content...",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

Or on error:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Common Use Cases

### Loan Application
1. Use **Proposal Generator** for full business plan
2. Use **Executive Summary** for 1-page overview
3. Use **Cashflow** for financial projections

### Investor Pitch
1. Use **Pitch Deck** for presentation outline
2. Use **Executive Summary** for elevator pitch
3. Use **Branding** for company positioning

### Business Planning
1. Use **Proposal** for comprehensive plan
2. Use **Cashflow** for financial modeling
3. Use **Business Coach** for strategy advice
4. Use **Startup Roadmap** for execution plan

### Pricing Strategy
1. Use **Pricing** for recommendations
2. Use **Business Coach** for market positioning
3. Use **Cashflow** to model profitability

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'openai'" | Run `npm install openai` |
| "API key not found" | Check `.env.local` has correct key |
| "Rate limit exceeded" | Wait or upgrade OpenAI plan |
| "Invalid request" | Check all required fields are provided |
| "Timeout" | Request took too long, try simpler input |

## Performance Tips

1. **Cache Results**
   - Store generated content in database
   - Reuse for similar businesses

2. **Optimize Inputs**
   - Keep descriptions concise
   - Use clear, specific language
   - Provide relevant context

3. **Batch Requests**
   - Generate multiple documents together
   - Reduce API calls

4. **Monitor Usage**
   - Track API calls per user
   - Set usage limits
   - Monitor costs

## Cost Estimation

| Feature | Est. Cost | Typical Use |
|---------|-----------|-------------|
| Proposal | $0.10-0.15 | Loan applications |
| Pitch Deck | $0.08-0.12 | Investor meetings |
| Cashflow | $0.08-0.12 | Financial planning |
| Pricing | $0.05-0.08 | Strategy |
| Executive Summary | $0.05-0.08 | Quick overview |
| Branding | $0.08-0.12 | Brand strategy |
| Business Coach | $0.08-0.12 | Consulting |
| Startup Roadmap | $0.10-0.15 | Launch planning |

**Monthly Budget**: ~$10-20 for 100-200 generations

## Production Checklist

- [ ] API key stored securely in `.env.local`
- [ ] Rate limiting implemented
- [ ] Error handling in place
- [ ] Logging configured
- [ ] User feedback mechanisms added
- [ ] Cost monitoring set up
- [ ] Cache strategy implemented
- [ ] Input validation added
- [ ] Security review completed
- [ ] Performance tested

## Next Steps

1. ✅ Install OpenAI package
2. ✅ Add API key to environment
3. ✅ Test endpoints locally
4. ✅ Build UI components
5. ✅ Integrate with payment system
6. ✅ Deploy to production
7. ✅ Monitor usage and costs
