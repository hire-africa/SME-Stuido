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
  const prompt = `You are an expert business consultant. Generate a PROFESSIONAL and ENHANCED business proposal for the following SME. 

IMPORTANT: 
- Rephrase and improve ALL user input to be more professional and compelling
- Add industry-specific insights and best practices
- Enhance descriptions with concrete examples and metrics
- Do NOT simply repeat what the user wrote - make it better
- Add strategic recommendations based on the sector
- Include realistic financial projections if not provided
- Make it suitable for bank loan applications and investor pitches

Business Information:
Business Name: ${input.businessName}
Business Type: ${input.businessType}
Sector: ${input.sector}
Description: ${input.description}
Target Market: ${input.targetMarket}
Monthly Revenue: ${input.monthlyRevenue ? `MK ${input.monthlyRevenue.toLocaleString()}` : 'Not specified'}
Funding Needed: ${input.fundingNeeded ? `MK ${input.fundingNeeded.toLocaleString()}` : 'Not specified'}
Funding Purpose: ${input.fundingPurpose || 'Not specified'}

Create a comprehensive business proposal with these sections:
1. Executive Summary - Compelling 2-3 sentence overview with key metrics
2. Company Overview - Enhanced description of the business and its unique value proposition
3. Market Analysis - Industry trends, market size, and growth opportunities in the ${input.sector} sector
4. Products/Services - Detailed description with competitive advantages
5. Marketing Strategy - Specific, actionable marketing tactics for the ${input.targetMarket}
6. Operational Plan - Realistic operational structure and processes
7. Management Team - Team capabilities and experience (create realistic profiles if not provided)
8. Financial Projections - 3-year projections with realistic growth rates for the ${input.sector}
9. Risk Analysis - Potential risks and mitigation strategies
10. Implementation Timeline - Specific milestones and timelines

Make it professional, data-driven, and compelling. Use industry standards for the ${input.sector} sector in Malawi/Africa.`

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
  const prompt = `You are an expert pitch deck consultant who has helped startups raise millions. Create a COMPELLING and ENHANCED investor pitch deck for:

IMPORTANT:
- Rephrase and enhance ALL user input to be more compelling and investor-ready
- Add specific market data and statistics
- Strengthen the problem statement with real market pain points
- Enhance the solution with unique value propositions
- Add realistic financial projections and growth metrics
- Do NOT simply repeat what the user wrote - make it significantly better
- Use persuasive language that resonates with investors

Business Information:
Business: ${input.businessName}
Tagline: ${input.tagline}
Problem: ${input.problemStatement}
Solution: ${input.solution}
Target Market: ${input.targetMarket}
Market Size: ${input.marketSize}
Business Model: ${input.businessModel}
Funding Needed: MK ${input.fundingAmount.toLocaleString()}
Use of Funds: ${input.useOfFunds}

Generate compelling slide-by-slide content for:
1. Title Slide - Attention-grabbing hook
2. Problem - Quantified market pain point with statistics
3. Solution - Clear, compelling solution with unique advantages
4. Market Opportunity - Market size, growth rate, and TAM/SAM/SOM
5. Business Model - Revenue streams and unit economics
6. Traction/Proof - Early wins, partnerships, or proof of concept
7. Team - Impressive team background and relevant experience
8. Financial Projections - 3-year revenue, profitability, and key metrics
9. Use of Funds - Clear allocation (e.g., 40% product, 35% marketing, 25% operations)
10. Competitive Advantage - Defensible moats and competitive positioning
11. Call to Action - Clear next steps and investment ask
12. Contact - Contact information and social proof

Make it compelling, data-driven, and investor-ready. Use realistic metrics for the African market.`

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
  const prompt = `You are an expert brand consultant. Create a PROFESSIONAL and COMPELLING company profile for:

IMPORTANT:
- Rephrase and enhance ALL user input to be more professional and compelling
- Add industry-specific language and best practices
- Enhance service descriptions with concrete benefits and outcomes
- Transform achievements into impressive metrics and results
- Create a compelling mission and vision if not provided
- Add strategic positioning and market differentiation
- Do NOT simply repeat what the user wrote - make it significantly better
- Make it suitable for tenders, client pitches, and business development

Company Information:
Company: ${input.businessName}
Type: ${input.businessType}
Years in Operation: ${input.yearsInOperation}
Team Size: ${input.teamSize}
Services: ${input.services.join(', ')}
Key Achievements: ${input.achievements.join(', ')}
Sector: ${input.sector}

Generate a comprehensive company profile with:
1. Company Overview - Enhanced description highlighting market position and expertise
2. Mission & Vision - Compelling mission and vision statements
3. Our Services - Detailed service descriptions with benefits and outcomes
4. Why Choose Us - 5-6 compelling reasons with specific differentiators
5. Team Highlights - Impressive team background and relevant expertise
6. Key Achievements - Quantified achievements and success metrics
7. Client Testimonials - Suggested testimonial format and examples
8. Contact Information - Professional contact details and call to action

Make it professional, engaging, and compelling. Use industry standards for the ${input.sector} sector in Malawi/Africa. Ensure it stands out and differentiates the company from competitors.`

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
  const prompt = `You are an expert loan application consultant who has helped hundreds of businesses secure bank financing. Create a PROFESSIONAL and COMPELLING bank loan application document.

IMPORTANT:
- Rephrase and enhance ALL user input to be more professional and bank-ready
- Strengthen the business description with market positioning and competitive advantages
- Enhance the loan purpose with specific, measurable outcomes
- Create realistic financial projections and repayment calculations
- Add compelling narratives that demonstrate business viability
- Do NOT simply repeat what the user wrote - make it significantly better
- Use language that banks want to see - emphasize stability, growth, and repayment capacity
- Include realistic assumptions based on the ${input.businessType} sector

Business Information:
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

Create a comprehensive loan application document with these sections:

## LOAN APPLICATION FORM

### APPLICANT INFORMATION
- Full Name and Background
- Business Name and Registration
- Contact Information
- Years in Operation and Experience

### BUSINESS OVERVIEW
- Enhanced business description highlighting market position
- Products/Services with competitive advantages
- Market positioning and growth trajectory
- Unique value propositions

### LOAN REQUEST
- Amount Requested with justification
- Specific purpose and expected outcomes
- Detailed fund utilization breakdown
- Timeline for fund deployment and ROI

### FINANCIAL INFORMATION
- Current Annual Revenue and growth trend
- Profitability metrics and margins
- Assets and liabilities
- Cash flow analysis and projections
- Debt service capacity analysis

### REPAYMENT PLAN
- Proposed repayment schedule with calculations
- Monthly/Quarterly repayment amounts
- Primary and secondary sources of repayment
- Contingency plans and risk mitigation

### COLLATERAL/SECURITY
- Proposed collateral with valuation
- Collateral insurance coverage
- Additional security measures

### MANAGEMENT & OPERATIONS
- Management team experience and qualifications
- Organizational structure
- Operational capacity and scalability
- Growth and expansion plans

### RISK MITIGATION
- Identified business and market risks
- Specific mitigation strategies
- Contingency plans
- Industry experience and track record

### SUPPORTING DOCUMENTS CHECKLIST
- Business Registration Certificate
- Tax Clearance Certificate
- Bank Statements (Last 6-12 months)
- Financial Statements and Audits
- Proof of Collateral
- Personal Identification
- Business Plan
- Market Analysis

Make the application professional, compelling, and bank-ready. Emphasize business viability, repayment capacity, and growth potential. Use realistic metrics for the ${input.businessType} sector in Malawi/Africa.`

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
