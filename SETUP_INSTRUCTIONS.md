# SME Studio AI - Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Firebase
- Zustand
- Lucide React
- React Hot Toast

### 2. Configure Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your Firebase config

### 3. Set Environment Variables

Create `.env.local` in the root directory:

```bash
cp .env.example .env.local
```

Then update with your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Pages

### Public Pages
- **`/`** - Landing page with features, pricing, and CTA
- **`/signup`** - User registration form
- **`/login`** - User login form
- **`/pricing`** - Detailed pricing information

### Protected Pages (After Login)
- **`/dashboard`** - Main dashboard with document management
- **`/editor/[type]`** - Document editor (to be implemented)

## File Structure

```
app/
├── page.tsx                 # Landing page
├── layout.tsx              # Root layout with Toaster
├── globals.css             # Global styles & brand colors
├── signup/
│   └── page.tsx            # Signup page
├── login/
│   └── page.tsx            # Login page
├── dashboard/
│   └── page.tsx            # Dashboard with sidebar
└── pricing/
    └── page.tsx            # Pricing page

lib/
├── config.ts               # Configuration & constants
├── firebase.ts             # Firebase initialization
└── store.ts                # Zustand stores (auth & projects)

public/                      # Static assets (add logos, images here)
```

## Brand Implementation

### Colors
- **Primary (Emerald)**: `#059669` - Use for main CTAs, success states
- **Secondary (Navy)**: `#0F172A` - Use for text, backgrounds
- **Accent (Gold)**: `#EAB308` - Use for highlights, premium features
- **Gray**: `#F3F4F6` - Use for backgrounds

### Typography
- **Headings**: Poppins ExtraBold (already imported in globals.css)
- **Body**: Inter Regular (already imported)
- **Numbers**: Space Grotesk (use class `font-space`)

### Usage in Components
```tsx
// Colors
className="bg-emerald text-white"
className="text-navy"
className="bg-gold"

// Typography
className="text-3xl font-bold"  // Poppins
className="font-space"           // Space Grotesk for numbers
```

## Next Steps

### Phase 1: Complete Frontend
1. ✅ Landing page
2. ✅ Authentication pages
3. ✅ Dashboard
4. ✅ Pricing page
5. ⏳ Document editor page
6. ⏳ Admin panel

### Phase 2: Backend Integration
1. Firebase Authentication setup
2. Firestore database structure
3. Document generation API
4. Payment processing (PayChangu/Flutterwave)
5. AI integration (OpenAI/Claude)

### Phase 3: Features
1. WhatsApp chatbot integration
2. Email notifications
3. Tender reminder system
4. Investor directory
5. Marketplace

## Development Tips

### Adding New Pages
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Use existing components as templates

### Styling
- Use Tailwind classes for all styling
- Custom colors defined in `globals.css`
- Responsive design with `md:` breakpoints

### State Management
- Use Zustand stores in `lib/store.ts`
- Import and use hooks: `useAuthStore()`, `useProjectStore()`

### Firebase Integration
- Auth functions in `lib/firebase.ts`
- Update `lib/config.ts` for new constants

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Deploy to Other Platforms
- Netlify: Connect GitHub repo, set build command: `npm run build`
- AWS Amplify: Similar to Vercel
- Self-hosted: Use `npm run build && npm start`

## Troubleshooting

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
- Errors will resolve after `npm install` completes
- Run `npm run build` to check for build errors

### Firebase Connection Issues
- Verify `.env.local` has correct credentials
- Check Firebase project settings
- Ensure Firebase APIs are enabled

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the code comments
3. Check Firebase documentation
4. Review Next.js documentation

---

**Ready to build? Start with `npm run dev`!**
