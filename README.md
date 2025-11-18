# SME Studio AI

🚀 **Smart Tools for African Business Success**

An AI-powered platform that builds professional business documents for SMEs across Malawi & Africa. Create proposals, pitch decks, loan applications, financial projections, and more in minutes.

## Features

### Document Generation
- **Business Proposals** - Complete proposals with market analysis and financial projections
- **Pitch Decks** - Investor-ready presentations with modern templates
- **Loan Applications** - Bank-specific templates for Malawi banks
- **Company Profiles** - Professional profiles for tenders and partnerships
- **Cashflow Projections** - 12-month and 3-year financial forecasts
- **Executive Summaries** - Powerful one-page summaries
- **Branding Kits** - Logo concepts, color palettes, and taglines

### Smart Features
- **AI Business Coach** - Real-time advice on pricing, marketing, and strategy
- **Sector Intelligence** - Industry-specific insights and benchmarks
- **Multi-format Export** - PDF, Word, PowerPoint, and WhatsApp-ready formats
- **Template Library** - 50+ professional templates
- **Subscription Model** - Monthly unlimited access or pay-per-document

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Fonts**: Poppins (headings), Inter (body), Space Grotesk (numbers)

## Brand Colors

- **Emerald Green** (#059669) - Growth, success, primary action
- **Deep Navy** (#0F172A) - Trust, professionalism
- **Gold** (#EAB308) - Premium, highlights, secondary action
- **Soft White** (#FFFFFF) - Clean backgrounds
- **Cloud Gray** (#F3F4F6) - UI backgrounds

## Project Structure

```
sme-studio-ai/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── signup/page.tsx       # Signup page
│   ├── login/page.tsx        # Login page
│   ├── dashboard/page.tsx    # Dashboard
│   ├── pricing/page.tsx      # Pricing page
│   └── editor/[id]/page.tsx  # Document editor (to be built)
├── lib/
│   ├── config.ts             # Configuration
│   ├── firebase.ts           # Firebase setup
│   └── store.ts              # Zustand stores
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sme-studio-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Then update `.env.local` with your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Pages

- **`/`** - Landing page with features and pricing
- **`/signup`** - User registration
- **`/login`** - User login
- **`/pricing`** - Detailed pricing information
- **`/dashboard`** - User dashboard with document management
- **`/editor/[type]`** - Document editor (in development)

## Pricing Model

### Monthly Subscription
- **MK 25,000/month** (or $30 USD)
- Unlimited documents
- All templates
- AI Business Coach
- Priority support

### Pay As You Go
- **MK 5,000/document**
- One document at a time
- All formats
- Lifetime access
- No subscription required

## Development Roadmap

### Phase 1: Frontend (Current)
- ✅ Landing page
- ✅ Authentication pages
- ✅ Dashboard
- ✅ Pricing page
- ⏳ Document editor
- ⏳ Admin panel

### Phase 2: Backend
- ⏳ Firebase integration
- ⏳ Document generation engine
- ⏳ Payment processing (PayChangu, Flutterwave)
- ⏳ AI integration (OpenAI/Claude)

### Phase 3: Features
- ⏳ WhatsApp chatbot
- ⏳ Tender reminder system
- ⏳ Investor directory
- ⏳ Marketplace

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

See `.env.example` for all required variables.

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@smestudioai.com or visit our website.

---

**Made with ❤️ for African SMEs**
