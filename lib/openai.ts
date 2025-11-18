import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate a business proposal using AI
 */
export async function generateProposal(input: {
  businessName: string
  businessType: string
  sector: string
  description: string
  targetMarket: string
  monthlyRevenue?: number
  fundingNeeded?: number
  fundingPurpose?: string
}): Promise<string> {
  const prompt = `Generate a professional business proposal for the following SME:

Business Name: ${input.businessName}
Business Type: ${input.businessType}
Sector: ${input.sector}
Description: ${input.description}
Target Market: ${input.targetMarket}
Monthly Revenue: ${input.monthlyRevenue ? `MK ${input.monthlyRevenue.toLocaleString()}` : 'Not specified'}
Funding Needed: ${input.fundingNeeded ? `MK ${input.fundingNeeded.toLocaleString()}` : 'Not specified'}
Funding Purpose: ${input.fundingPurpose || 'Not specified'}

Please create a comprehensive business proposal with the following sections:
1. Executive Summary
2. Company Overview
3. Market Analysis
4. Products/Services
5. Marketing Strategy
6. Operational Plan
7. Management Team
8. Financial Projections
9. Risk Analysis
10. Implementation Timeline

Make it professional, detailed, and suitable for bank loan applications or investor pitches.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate a pitch deck outline
 */
export async function generatePitchDeck(input: {
  businessName: string
  tagline: string
  problemStatement: string
  solution: string
  targetMarket: string
  marketSize: string
  businessModel: string
  fundingAmount: number
  useOfFunds: string
}): Promise<string> {
  const prompt = `Create a professional investor pitch deck outline with 12 slides for:

Business: ${input.businessName}
Tagline: ${input.tagline}
Problem: ${input.problemStatement}
Solution: ${input.solution}
Target Market: ${input.targetMarket}
Market Size: ${input.marketSize}
Business Model: ${input.businessModel}
Funding Needed: MK ${input.fundingAmount.toLocaleString()}
Use of Funds: ${input.useOfFunds}

Generate slide-by-slide content for:
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

Make it compelling, data-driven, and investor-ready.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate a company profile
 */
export async function generateCompanyProfile(input: {
  businessName: string
  businessType: string
  yearsInOperation: number
  teamSize: number
  services: string[]
  achievements: string[]
  sector: string
}): Promise<string> {
  const prompt = `Create a professional company profile for:

Company: ${input.businessName}
Type: ${input.businessType}
Years in Operation: ${input.yearsInOperation}
Team Size: ${input.teamSize}
Services: ${input.services.join(', ')}
Key Achievements: ${input.achievements.join(', ')}
Sector: ${input.sector}

Generate a comprehensive company profile with:
1. Company Overview
2. Mission & Vision
3. Our Services
4. Why Choose Us
5. Team Highlights
6. Key Achievements
7. Client Testimonials (suggested)
8. Contact Information

Make it professional, engaging, and suitable for tenders and client pitches.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate cashflow projections
 */
export async function generateCashflow(input: {
  businessName: string
  sector: string
  monthlyRevenue: number
  monthlyExpenses: number
  seasonalityFactor?: number
  growthRate?: number
  months?: number
}): Promise<string> {
  const months = input.months || 12
  const growthRate = input.growthRate || 0.05
  const seasonalityFactor = input.seasonalityFactor || 1

  const prompt = `Generate a detailed ${months}-month cashflow projection for:

Business: ${input.businessName}
Sector: ${input.sector}
Current Monthly Revenue: MK ${input.monthlyRevenue.toLocaleString()}
Current Monthly Expenses: MK ${input.monthlyExpenses.toLocaleString()}
Seasonality Factor: ${seasonalityFactor}
Expected Monthly Growth Rate: ${(growthRate * 100).toFixed(1)}%

Create a month-by-month cashflow projection including:
1. Revenue projections (with seasonal adjustments)
2. Operating expenses breakdown
3. Capital expenditures
4. Cash inflows and outflows
5. Cumulative cash position
6. Break-even analysis
7. Key assumptions
8. Risk factors

Format as a detailed table with monthly columns and include summary insights.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate pricing recommendations
 */
export async function generatePricing(input: {
  productName: string
  sector: string
  costOfProduction: number
  targetMarket: string
  competitorPrices?: string
}): Promise<string> {
  const prompt = `Generate pricing recommendations for:

Product/Service: ${input.productName}
Sector: ${input.sector}
Cost of Production: MK ${input.costOfProduction.toLocaleString()}
Target Market: ${input.targetMarket}
Competitor Prices: ${input.competitorPrices || 'Not specified'}

Provide:
1. Recommended Retail Price
2. Wholesale Price (if applicable)
3. Markup Analysis
4. Profit Margin Breakdown
5. Discount Strategy
6. Package Options
7. Seasonal Pricing Adjustments
8. Competitive Positioning
9. Price Elasticity Considerations
10. Implementation Timeline

Base recommendations on industry standards for the ${input.sector} sector in Malawi/Africa.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate executive summary
 */
export async function generateExecutiveSummary(input: {
  businessName: string
  businessType: string
  problemStatement: string
  solution: string
  marketOpportunity: string
  fundingNeeded?: number
  keyMetrics?: Record<string, string>
}): Promise<string> {
  const prompt = `Create a powerful 1-page executive summary for:

Business: ${input.businessName}
Type: ${input.businessType}
Problem: ${input.problemStatement}
Solution: ${input.solution}
Market Opportunity: ${input.marketOpportunity}
Funding Needed: ${input.fundingNeeded ? `MK ${input.fundingNeeded.toLocaleString()}` : 'Not specified'}
Key Metrics: ${input.keyMetrics ? JSON.stringify(input.keyMetrics) : 'Not specified'}

Generate a concise, compelling executive summary with:
1. Company Overview (2-3 sentences)
2. Problem & Opportunity
3. Solution & Unique Value Proposition
4. Market Size & Target
5. Business Model
6. Financial Highlights
7. Funding Request & Use of Funds
8. Call to Action

Make it powerful enough to capture investor/banker attention in 60 seconds.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate branding recommendations
 */
export async function generateBranding(input: {
  businessName: string
  businessType: string
  targetAudience: string
  brandPersonality: string
}): Promise<string> {
  const prompt = `Generate comprehensive branding recommendations for:

Business Name: ${input.businessName}
Type: ${input.businessType}
Target Audience: ${input.targetAudience}
Brand Personality: ${input.brandPersonality}

Provide:
1. Brand Mission & Vision
2. Brand Values
3. Brand Personality Traits
4. Tagline Options (3-5)
5. Color Palette Recommendations (with hex codes)
6. Typography Suggestions
7. Logo Concept Ideas
8. Brand Voice Guidelines
9. Social Media Bio Template
10. Brand Story

Make recommendations that resonate with the African market and the target audience.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * AI Business Coach - provide improvement suggestions
 */
export async function getBusinessCoachAdvice(input: {
  businessName: string
  businessType: string
  currentChallenge: string
  context: string
}): Promise<string> {
  const prompt = `You are an experienced business coach for African SMEs. Provide actionable advice for:

Business: ${input.businessName}
Type: ${input.businessType}
Challenge: ${input.currentChallenge}
Context: ${input.context}

Provide:
1. Root Cause Analysis
2. 3-5 Actionable Solutions
3. Implementation Steps
4. Expected Outcomes
5. Resources Needed
6. Timeline
7. Success Metrics
8. Potential Risks & Mitigation

Be practical, specific, and culturally relevant to the African business context.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate a 30-day startup roadmap
 */
export async function generateStartupRoadmap(input: {
  businessName: string
  businessType: string
  launchDate: string
  initialBudget: number
}): Promise<string> {
  const prompt = `Create a detailed 30-day startup roadmap for:

Business: ${input.businessName}
Type: ${input.businessType}
Launch Date: ${input.launchDate}
Initial Budget: MK ${input.initialBudget.toLocaleString()}

Generate a week-by-week roadmap with:

WEEK 1: Foundation
- Legal & Registration Tasks
- Financial Setup
- Team Onboarding

WEEK 2: Operations
- Supplier/Vendor Setup
- Systems & Processes
- Quality Assurance

WEEK 3: Marketing
- Brand Launch
- Social Media Setup
- Initial Marketing Campaign

WEEK 4: Launch & Optimization
- Soft Launch
- Customer Feedback
- Adjustments & Scaling

For each task include:
- Specific action items
- Responsible person
- Budget allocation
- Success metrics
- Dependencies

Make it practical and achievable with the given budget.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 2500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}

/**
 * Generate a bank loan application using AI
 */
export async function generateLoanApplication(input: {
  businessName: string
  businessType: string
  businessDescription: string
  loanAmount: string
  loanPurpose: string
  repaymentPeriod: string
  bankName: string
  ownerName: string
  yearsInBusiness: string
  currentRevenue: string
  employeeCount: string
}): Promise<string> {
  const prompt = `Generate a professional bank loan application document for the following business:

Business Name: ${input.businessName}
Business Type: ${input.businessType}
Owner/Manager: ${input.ownerName || 'Not specified'}
Years in Business: ${input.yearsInBusiness || 'Not specified'}
Current Annual Revenue: ${input.currentRevenue ? `MK ${input.currentRevenue}` : 'Not specified'}
Number of Employees: ${input.employeeCount || 'Not specified'}
Bank: ${input.bankName || 'Not specified'}

Loan Details:
- Loan Amount Requested: MK ${input.loanAmount}
- Repayment Period: ${input.repaymentPeriod} months
- Purpose: ${input.loanPurpose}

Business Description:
${input.businessDescription}

Please create a comprehensive loan application document with the following sections:

## LOAN APPLICATION FORM

### APPLICANT INFORMATION
- Full Name
- Business Name
- Business Registration Number
- Contact Information
- Years in Operation

### BUSINESS OVERVIEW
- Business Description
- Products/Services Offered
- Market Position
- Competitive Advantages

### LOAN REQUEST
- Amount Requested
- Purpose of Loan
- How Funds Will Be Used
- Expected Timeline for Fund Utilization

### FINANCIAL INFORMATION
- Current Annual Revenue
- Current Liabilities
- Assets
- Profitability Status
- Cash Flow Analysis

### REPAYMENT PLAN
- Proposed Repayment Period
- Monthly/Quarterly Repayment Amount
- Source of Repayment
- Contingency Plan

### COLLATERAL/SECURITY
- Proposed Collateral
- Collateral Value
- Insurance Coverage

### MANAGEMENT & OPERATIONS
- Management Team Experience
- Number of Employees
- Operational Capacity
- Growth Plans

### RISK MITIGATION
- Identified Risks
- Mitigation Strategies
- Contingency Plans

### SUPPORTING DOCUMENTS CHECKLIST
- Business Registration Certificate
- Tax Clearance Certificate
- Bank Statements (Last 6 months)
- Financial Statements
- Proof of Collateral
- Personal Identification
- Business Plan

Make the application professional, detailed, and suitable for bank submission. Include specific details from the provided information and make it compelling for loan approval.`

  const message = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 3500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.choices[0].message.content
  if (content) {
    return content
  }

  throw new Error('Unexpected response format from OpenAI')
}
