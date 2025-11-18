// Firebase Configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Brand Colors
export const colors = {
  emerald: '#059669',
  navy: '#0F172A',
  gold: '#EAB308',
  white: '#FFFFFF',
  gray: '#F3F4F6',
}

// Pricing
export const pricing = {
  monthly: {
    mwk: 25000,
    usd: 30,
  },
}

// Document Types
export const documentTypes = [
  { id: 'proposal', name: 'Business Proposal', icon: 'FileText' },
  { id: 'pitch-deck', name: 'Pitch Deck', icon: 'Presentation' },
  { id: 'loan-app', name: 'Loan Application', icon: 'FileCheck' },
  { id: 'company-profile', name: 'Company Profile', icon: 'Building2' },
  { id: 'cashflow', name: 'Cashflow Projection', icon: 'TrendingUp' },
  { id: 'executive-summary', name: 'Executive Summary', icon: 'BookOpen' },
  { id: 'branding-kit', name: 'Branding Kit', icon: 'Palette' },
]

// Sectors
export const sectors = [
  'Agriculture',
  'Restaurants & Fast-food',
  'Transport',
  'Hardware & Construction',
  'Retail Shops',
  'Clothing & Fashion',
  'ICT & Software',
  'Fintech',
  'Tourism & Hospitality',
  'Manufacturing',
  'Creative Businesses',
  'Music & Events',
  'Beauty & Salons',
  'Cooperatives & VSLA',
  'Wholesale & Trading',
]
