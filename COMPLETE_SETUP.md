# SME Studio AI - Complete Setup Guide

## 🚀 Quick Start (5 Steps)

### Step 1: Install Dependencies
```bash
cd "c:\Users\BLACKSLEEKY\Documents\SME Tools"
npm install
```

### Step 2: Set Up PostgreSQL Database

**Windows:**
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install and remember the password for `postgres` user
3. Open PostgreSQL command line:
```bash
psql -U postgres
```

4. Create database and user:
```sql
CREATE DATABASE sme_studio_ai;
CREATE USER sme_user WITH PASSWORD 'your_secure_password';
ALTER ROLE sme_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE sme_studio_ai TO sme_user;
\q
```

### Step 3: Configure Environment Variables

Create `.env.local` in project root:

```
# Database
DATABASE_URL="postgresql://sme_user:your_secure_password@localhost:5432/sme_studio_ai"

# JWT Secret (change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Firebase (optional for now)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 4: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📋 What You Can Do Now

### Public Pages
- **Home** - `http://localhost:3000`
- **Pricing** - `http://localhost:3000/pricing`

### Authentication
- **Signup** - `http://localhost:3000/signup`
  - Create new account
  - Automatic login after signup
  - Redirects to client dashboard

- **Login** - `http://localhost:3000/login`
  - Login with email/password
  - Automatic role-based redirect
  - Token stored in localStorage

### Protected Dashboards
- **Client Dashboard** - `http://localhost:3000/client-dashboard`
  - View documents
  - Create new documents
  - Analytics
  - Account settings

- **Admin Dashboard** - `http://localhost:3000/admin-dashboard`
  - User management
  - Payment tracking
  - Template management
  - Platform settings

---

## 🔐 Authentication System

### How It Works

1. **Signup**
   - User fills form with email, password, name, business
   - Password hashed with bcryptjs
   - User created in database
   - JWT token generated
   - Token stored in localStorage
   - Redirected to client dashboard

2. **Login**
   - User enters email/password
   - Password verified against hash
   - JWT token generated
   - Token stored in localStorage
   - Redirected based on role (ADMIN → admin dashboard, CLIENT → client dashboard)

3. **Protected Routes**
   - Middleware checks for valid token
   - Verifies token signature and expiry
   - Enforces role-based access
   - Redirects to login if unauthorized

### Test Credentials

After signup, use your created account to login.

Or create a test user via API:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "businessName": "Test Business",
    "phone": "+265 9XX XXX XXX"
  }'
```

---

## 📁 Project Structure

```
SME Tools/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── login/page.tsx              # Login page ✅ JWT integrated
│   ├── signup/page.tsx             # Signup page ✅ JWT integrated
│   ├── pricing/page.tsx            # Pricing page
│   ├── client-dashboard/page.tsx   # Client dashboard
│   ├── admin-dashboard/page.tsx    # Admin dashboard
│   └── api/
│       └── auth/
│           ├── login/route.ts      # Login API ✅
│           ├── signup/route.ts     # Signup API ✅
│           └── logout/route.ts     # Logout API ✅
│
├── lib/
│   ├── config.ts                   # Configuration
│   ├── firebase.ts                 # Firebase setup
│   ├── store.ts                    # Zustand store
│   ├── jwt.ts                      # JWT utilities ✅
│   └── authStore.ts                # Auth store ✅
│
├── prisma/
│   └── schema.prisma               # Database schema
│
├── middleware.ts                   # Protected routes ✅
│
├── package.json                    # Dependencies
├── .env.example                    # Environment template
├── .env.local                      # Your environment (create this)
│
└── docs/
    ├── README.md
    ├── SETUP_INSTRUCTIONS.md
    ├── DATABASE_SETUP.md
    ├── DASHBOARDS_AND_DB.md
    ├── JWT_AUTH_GUIDE.md
    └── COMPLETE_SETUP.md           # This file
```

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma migrate dev   # Create migration
npx prisma migrate deploy # Deploy migrations
npx prisma studio       # Open Prisma Studio
npx prisma db push      # Push schema to database
npx prisma db pull      # Pull schema from database

# Linting
npm run lint             # Run ESLint
```

---

## 🎯 Features Implemented

### ✅ Frontend
- Landing page with features and pricing
- Responsive design (mobile, tablet, desktop)
- Navigation and routing
- Form validation and error handling
- Toast notifications

### ✅ Authentication
- JWT token generation and verification
- Secure password hashing (bcryptjs)
- Login/Signup with validation
- Protected routes with middleware
- Role-based access control (RBAC)
- Token persistence in localStorage
- Automatic redirect based on role

### ✅ Database
- PostgreSQL with Prisma ORM
- 8 database models (Users, Projects, Payments, Templates, etc.)
- User roles (CLIENT, ADMIN)
- Subscription tracking
- Payment management
- Admin logs for audit trail

### ✅ Dashboards
- Client Dashboard with 4 tabs (Documents, Create, Analytics, Settings)
- Admin Dashboard with 5 tabs (Overview, Users, Payments, Templates, Settings)
- Responsive sidebars
- Data tables with actions
- Stat cards and charts

### ✅ API Endpoints
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET/POST /api/users` - User management
- Ready for more endpoints

---

## 🚨 Troubleshooting

### "npm: command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart terminal

### "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### "Database connection refused"
- Check PostgreSQL is running
- Verify DATABASE_URL in .env.local
- Check port 5432 is accessible

### "JWT_SECRET not found"
- Add `JWT_SECRET` to `.env.local`
- Restart dev server

### "Always redirected to login"
- Check token in browser localStorage
- Verify JWT_SECRET matches
- Check middleware.ts configuration

### "Cannot login after signup"
- Check database has user record
- Verify password hashing works
- Check API response in browser console

---

## 📊 Database Schema

### Users
- id, email, password, fullName, businessName, phone
- role (CLIENT/ADMIN), subscriptionActive, subscriptionPlan
- subscriptionEndDate, documentsRemaining

### Projects
- id, userId, title, type, sector, status
- content (JSON), metadata (JSON)
- pdfUrl, wordUrl, pptUrl

### Payments
- id, userId, amount, currency, paymentMethod
- status (PENDING/COMPLETED/FAILED/REFUNDED)
- transactionId, reference

### Templates
- id, name, type, sector, description
- content (JSON), isActive

### AdminLogs
- id, adminId, action, targetType, targetId, details

### SectorIntelligence
- id, sector, description, averagePrice
- riskFactors, opportunities, marketSize, growthRate

### Analytics
- id, totalUsers, activeUsers, totalDocuments
- totalRevenue, date

---

## 🔒 Security Checklist

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens with expiry
- ✅ Protected routes with middleware
- ✅ Role-based access control
- ✅ Environment variables for secrets
- ⏳ HTTPS in production (configure)
- ⏳ Rate limiting (add)
- ⏳ CSRF protection (add)
- ⏳ Email verification (add)
- ⏳ Password reset (add)

---

## 📚 Documentation

- **README.md** - Project overview
- **SETUP_INSTRUCTIONS.md** - Quick start
- **DATABASE_SETUP.md** - PostgreSQL setup
- **DASHBOARDS_AND_DB.md** - Dashboard features
- **JWT_AUTH_GUIDE.md** - Authentication details
- **COMPLETE_SETUP.md** - This file

---

## 🎓 Next Steps

### Immediate (Ready to implement)
1. Test signup and login
2. Test client dashboard
3. Test admin dashboard
4. Create test users

### Short Term (1-2 weeks)
1. Implement document editor
2. Add document generation
3. Integrate payment processing
4. Add email notifications

### Medium Term (2-4 weeks)
1. AI integration (OpenAI/Claude)
2. WhatsApp chatbot
3. Advanced analytics
4. Tender reminder system

### Long Term (1-2 months)
1. Mobile app
2. Marketplace
3. Investor directory
4. Advanced reporting

---

## 💡 Tips

1. **Development**: Use `npm run dev` and keep it running
2. **Database**: Use `npx prisma studio` to view/edit data
3. **Testing**: Create test accounts to verify flows
4. **Debugging**: Check browser console for errors
5. **Logs**: Check terminal for server errors

---

## 📞 Support

For issues:
1. Check the relevant documentation file
2. Review browser console for errors
3. Check terminal for server errors
4. Verify .env.local configuration
5. Ensure PostgreSQL is running

---

## ✨ You're All Set!

Your SME Studio AI application is ready to use with:
- ✅ Full authentication system
- ✅ PostgreSQL database
- ✅ Admin & Client dashboards
- ✅ Protected routes
- ✅ JWT tokens
- ✅ Role-based access

**Start with:** `npm run dev`

**Then visit:** `http://localhost:3000`

---

**Happy coding! 🚀**
