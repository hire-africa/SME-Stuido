const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash passwords
  const clientPassword = await bcrypt.hash('password123', 10)
  const adminPassword = await bcrypt.hash('admin123', 10)

  // Delete existing demo users
  await prisma.user.deleteMany({
    where: {
      email: {
        in: ['client@demo.com', 'admin@demo.com'],
      },
    },
  })

  // Create demo client user
  const clientUser = await prisma.user.create({
    data: {
      email: 'client@demo.com',
      password: clientPassword,
      fullName: 'Demo Client',
      businessName: 'Demo Business Ltd',
      phone: '+265 999 123 456',
      role: 'CLIENT',
      subscriptionActive: true,
      subscriptionPlan: 'monthly',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      documentsRemaining: 999,
    },
  })

  console.log('✅ Demo Client User Created:')
  console.log(`   Email: ${clientUser.email}`)
  console.log(`   Password: password123`)
  console.log(`   Role: CLIENT`)
  console.log()

  // Create demo admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: adminPassword,
      fullName: 'Demo Admin',
      businessName: 'SME Studio AI',
      phone: '+265 999 654 321',
      role: 'ADMIN',
      subscriptionActive: true,
      subscriptionPlan: 'monthly',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      documentsRemaining: 999,
    },
  })

  console.log('✅ Demo Admin User Created:')
  console.log(`   Email: ${adminUser.email}`)
  console.log(`   Password: admin123`)
  console.log(`   Role: ADMIN`)
  console.log()

  // Create sample projects for client
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        userId: clientUser.id,
        title: 'My First Business Proposal',
        type: 'PROPOSAL',
        sector: 'Retail',
        status: 'COMPLETED',
        content: {
          title: 'Business Proposal',
          sections: ['Executive Summary', 'Market Analysis', 'Financial Projections'],
        },
      },
    }),
    prisma.project.create({
      data: {
        userId: clientUser.id,
        title: 'Tech Startup Pitch Deck',
        type: 'PITCH_DECK',
        sector: 'ICT',
        status: 'DRAFT',
        content: {
          title: 'Pitch Deck',
          slides: 10,
        },
      },
    }),
    prisma.project.create({
      data: {
        userId: clientUser.id,
        title: 'Bank Loan Application',
        type: 'LOAN_APPLICATION',
        sector: 'Agriculture',
        status: 'COMPLETED',
        content: {
          title: 'Loan Application',
          amount: 5000000,
          currency: 'MWK',
        },
      },
    }),
  ])

  console.log('✅ Sample Projects Created:')
  projects.forEach((project, index) => {
    console.log(`   ${index + 1}. ${project.title} (${project.status})`)
  })
  console.log()

  // Create sample payments
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        userId: clientUser.id,
        amount: 25000,
        currency: 'MWK',
        paymentMethod: 'paychangu',
        status: 'COMPLETED',
        transactionId: 'TXN_001_DEMO',
        reference: 'Monthly Subscription',
        description: 'Monthly subscription payment',
      },
    }),
    prisma.payment.create({
      data: {
        userId: clientUser.id,
        amount: 5000,
        currency: 'MWK',
        paymentMethod: 'flutterwave',
        status: 'COMPLETED',
        transactionId: 'TXN_002_DEMO',
        reference: 'Single Document',
        description: 'Pay-per-document payment',
      },
    }),
  ])

  console.log('✅ Sample Payments Created:')
  payments.forEach((payment, index) => {
    console.log(`   ${index + 1}. MK ${payment.amount} - ${payment.status}`)
  })
  console.log()

  // Create sample templates
  const templates = await Promise.all([
    prisma.template.create({
      data: {
        name: 'Professional Business Proposal',
        type: 'PROPOSAL',
        sector: 'General',
        description: 'A comprehensive business proposal template',
        content: {
          sections: ['Executive Summary', 'Problem Statement', 'Solution', 'Pricing', 'Timeline'],
        },
        isActive: true,
      },
    }),
    prisma.template.create({
      data: {
        name: 'Investor Pitch Deck',
        type: 'PITCH_DECK',
        sector: 'Tech',
        description: 'Modern pitch deck template for investors',
        content: {
          slides: ['Title', 'Problem', 'Solution', 'Market', 'Business Model', 'Financials', 'Team', 'Ask'],
        },
        isActive: true,
      },
    }),
    prisma.template.create({
      data: {
        name: 'Bank Loan Application Form',
        type: 'LOAN_APPLICATION',
        sector: 'Finance',
        description: 'Standard bank loan application template',
        content: {
          sections: ['Personal Info', 'Business Info', 'Loan Details', 'Financial Statements'],
        },
        isActive: true,
      },
    }),
  ])

  console.log('✅ Sample Templates Created:')
  templates.forEach((template, index) => {
    console.log(`   ${index + 1}. ${template.name}`)
  })
  console.log()

  // Create sector intelligence
  const sectors = await Promise.all([
    prisma.sectorIntelligence.create({
      data: {
        sector: 'Retail',
        description: 'Retail and e-commerce sector',
        averagePrice: 45000,
        riskFactors: ['Competition', 'Supply Chain', 'Consumer Behavior'],
        opportunities: ['Online Sales', 'Expansion', 'New Products'],
        marketSize: 'MK 500 Billion',
        growthRate: '12% annually',
      },
    }),
    prisma.sectorIntelligence.create({
      data: {
        sector: 'ICT',
        description: 'Information and Communication Technology',
        averagePrice: 75000,
        riskFactors: ['Rapid Change', 'Cybersecurity', 'Talent Shortage'],
        opportunities: ['Cloud Services', 'AI/ML', 'Digital Transformation'],
        marketSize: 'MK 200 Billion',
        growthRate: '25% annually',
      },
    }),
    prisma.sectorIntelligence.create({
      data: {
        sector: 'Agriculture',
        description: 'Agricultural and farming sector',
        averagePrice: 35000,
        riskFactors: ['Weather', 'Pests', 'Market Volatility'],
        opportunities: ['Organic Farming', 'Export', 'Technology'],
        marketSize: 'MK 800 Billion',
        growthRate: '8% annually',
      },
    }),
  ])

  console.log('✅ Sector Intelligence Created:')
  sectors.forEach((sector, index) => {
    console.log(`   ${index + 1}. ${sector.sector} - Growth: ${sector.growthRate}`)
  })
  console.log()

  // Create analytics record
  const analytics = await prisma.analytics.create({
    data: {
      totalUsers: 2,
      activeUsers: 2,
      totalDocuments: 3,
      totalRevenue: 30000,
      date: new Date(),
    },
  })

  console.log('✅ Analytics Record Created:')
  console.log(`   Total Users: ${analytics.totalUsers}`)
  console.log(`   Active Users: ${analytics.activeUsers}`)
  console.log(`   Total Documents: ${analytics.totalDocuments}`)
  console.log(`   Total Revenue: MK ${analytics.totalRevenue}`)
  console.log()

  console.log('🎉 Database seeding completed successfully!')
  console.log()
  console.log('📝 Demo Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log()
  console.log('CLIENT USER:')
  console.log('  Email:    client@demo.com')
  console.log('  Password: password123')
  console.log('  URL:      http://localhost:3000/login')
  console.log()
  console.log('ADMIN USER:')
  console.log('  Email:    admin@demo.com')
  console.log('  Password: admin123')
  console.log('  URL:      http://localhost:3000/login')
  console.log()
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
