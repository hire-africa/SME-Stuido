# Demo Users - SME Studio AI

## 🎯 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Database
```bash
npx prisma migrate dev --name init
```

### Step 3: Seed Demo Data
```bash
npm run seed
```

### Step 4: Start Server
```bash
npm run dev
```

### Step 5: Login
Visit `http://localhost:3000/login` and use credentials below

---

## 👤 Demo Credentials

### CLIENT USER
```
Email:    client@demo.com
Password: password123
Role:     CLIENT
```
**Access:** Client Dashboard at `/client-dashboard`

### ADMIN USER
```
Email:    admin@demo.com
Password: admin123
Role:     ADMIN
```
**Access:** Admin Dashboard at `/admin-dashboard`

---

## 📊 What's Included in Demo Data

### Demo Client User
- ✅ Active subscription (Monthly plan)
- ✅ 3 sample projects (Proposal, Pitch Deck, Loan Application)
- ✅ 2 sample payments (completed)
- ✅ Full profile information

### Demo Admin User
- ✅ Admin access to all features
- ✅ Can manage users, payments, templates
- ✅ Access to platform settings

### Sample Projects
1. **My First Business Proposal** (COMPLETED)
   - Type: Business Proposal
   - Sector: Retail
   - Status: Completed

2. **Tech Startup Pitch Deck** (DRAFT)
   - Type: Pitch Deck
   - Sector: ICT
   - Status: Draft

3. **Bank Loan Application** (COMPLETED)
   - Type: Loan Application
   - Sector: Agriculture
   - Status: Completed

### Sample Payments
1. MK 25,000 - Monthly Subscription (COMPLETED)
2. MK 5,000 - Single Document (COMPLETED)

### Sample Templates
1. Professional Business Proposal
2. Investor Pitch Deck
3. Bank Loan Application Form

### Sector Intelligence
1. **Retail** - MK 500B market, 12% growth
2. **ICT** - MK 200B market, 25% growth
3. **Agriculture** - MK 800B market, 8% growth

---

## 🔄 Resetting Demo Data

To reset and recreate demo data:

```bash
# Reset database (deletes all data)
npx prisma migrate reset

# Or manually:
npx prisma db push --force-reset
npm run seed
```

---

## 📝 Creating Custom Demo Users

### Option 1: Via Signup Page
1. Visit `http://localhost:3000/signup`
2. Fill in form with your details
3. Account created automatically

### Option 2: Via API
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yourname@example.com",
    "password": "password123",
    "fullName": "Your Name",
    "businessName": "Your Business",
    "phone": "+265 9XX XXX XXX"
  }'
```

### Option 3: Modify Seed Script
Edit `prisma/seed.ts` and add more users:

```typescript
const newUser = await prisma.user.create({
  data: {
    email: 'newemail@demo.com',
    password: await bcrypt.hash('password123', 10),
    fullName: 'New User',
    businessName: 'New Business',
    phone: '+265 9XX XXX XXX',
    role: 'CLIENT',
    subscriptionActive: true,
    subscriptionPlan: 'monthly',
    subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    documentsRemaining: 999,
  },
})
```

Then run: `npm run seed`

---

## 🧪 Testing Flows

### Test Client Dashboard
1. Login with `client@demo.com` / `password123`
2. View 3 sample projects
3. Create new document
4. Check analytics
5. Update account settings

### Test Admin Dashboard
1. Login with `admin@demo.com` / `admin123`
2. View overview metrics
3. Manage users (see client user)
4. View payments
5. Manage templates
6. Update platform settings

### Test Authentication
1. Try logging in with wrong password → Error
2. Try accessing `/client-dashboard` without login → Redirect to login
3. Login → Token stored in localStorage
4. Logout → Token cleared
5. Try accessing dashboard → Redirect to login

---

## 🔐 Security Notes

### Demo Credentials
- ⚠️ These are for **development only**
- ⚠️ Change passwords in production
- ⚠️ Never use these in production environment
- ⚠️ Delete seed script before deploying

### Password Security
- Passwords are hashed with bcryptjs
- 10 salt rounds for security
- Never stored in plain text
- Use strong passwords in production

---

## 📱 What You Can Test

### Client Features
- ✅ View dashboard with stats
- ✅ View sample projects
- ✅ Create new documents
- ✅ View analytics
- ✅ Update account settings
- ✅ Logout

### Admin Features
- ✅ View overview metrics
- ✅ Manage users
- ✅ View payments
- ✅ Manage templates
- ✅ Update platform settings
- ✅ View sector intelligence

### Authentication
- ✅ Signup with validation
- ✅ Login with JWT
- ✅ Protected routes
- ✅ Role-based redirect
- ✅ Logout
- ✅ Token persistence

---

## 🐛 Troubleshooting

### "npm run seed" fails
```bash
# Make sure dependencies are installed
npm install

# Make sure database is initialized
npx prisma migrate dev --name init

# Try again
npm run seed
```

### "Cannot find module" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

### Demo users not appearing
```bash
# Check database connection
npx prisma studio

# Verify seed ran successfully
npm run seed

# Check for errors in output
```

### Login fails with demo credentials
1. Verify seed script ran successfully
2. Check database has users: `npx prisma studio`
3. Try creating new user via signup
4. Check browser console for errors

---

## 📊 Database Verification

### Check Demo Data
```bash
# Open Prisma Studio
npx prisma studio

# Then navigate to:
# - Users table (should see client@demo.com and admin@demo.com)
# - Projects table (should see 3 projects)
# - Payments table (should see 2 payments)
# - Templates table (should see 3 templates)
```

### Via PostgreSQL CLI
```bash
psql -U sme_user -d sme_studio_ai

# List users
SELECT email, role, "subscriptionActive" FROM "User";

# List projects
SELECT title, type, status FROM "Project";

# List payments
SELECT amount, status FROM "Payment";

# Exit
\q
```

---

## 🎓 Learning Path

1. **Signup** → Create your own account
2. **Login** → Use demo credentials
3. **Explore Client Dashboard** → View projects and analytics
4. **Explore Admin Dashboard** → Manage users and payments
5. **Create Documents** → Try creating new documents
6. **Test Logout** → Verify token clearing
7. **Test Protected Routes** → Try accessing without login

---

## 📝 Seed Script Details

The seed script (`prisma/seed.ts`) creates:

### Users (2)
- 1 CLIENT user with subscription
- 1 ADMIN user

### Projects (3)
- Business Proposal (Completed)
- Pitch Deck (Draft)
- Loan Application (Completed)

### Payments (2)
- Monthly subscription payment
- Single document payment

### Templates (3)
- Business Proposal template
- Pitch Deck template
- Loan Application template

### Sectors (3)
- Retail sector intelligence
- ICT sector intelligence
- Agriculture sector intelligence

### Analytics (1)
- Daily analytics record

---

## 🚀 Next Steps

1. ✅ Run seed script
2. ✅ Login with demo credentials
3. ✅ Explore dashboards
4. ✅ Test features
5. ⏳ Create custom users
6. ⏳ Build document editor
7. ⏳ Integrate payments

---

## 💡 Tips

- Use `npx prisma studio` to view/edit data visually
- Check browser console for any errors
- Check terminal for server logs
- Demo data is recreated each time you run seed
- Passwords are case-sensitive
- Email addresses must be unique

---

## 🎉 Ready to Test!

Your demo users are ready. Start with:

```bash
npm run dev
```

Then login at: `http://localhost:3000/login`

**Happy testing! 🚀**
