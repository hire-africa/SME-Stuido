# SME Studio AI - Quick Reference Guide

## 🚀 Start Here (3 Steps)

```bash
# 1. Install
npm install

# 2. Setup Database
npx prisma migrate dev --name init

# 3. Run
npm run dev
```

Visit: `http://localhost:3000`

---

## 📍 What's Where

| Feature | Location | Status |
|---------|----------|--------|
| Landing Page | `/` | ✅ Ready |
| Signup | `/signup` | ✅ JWT Ready |
| Login | `/login` | ✅ JWT Ready |
| Pricing | `/pricing` | ✅ Ready |
| Client Dashboard | `/client-dashboard` | ✅ Ready |
| Admin Dashboard | `/admin-dashboard` | ✅ Ready |
| Document Editor | `/editor/[type]` | ⏳ To Build |

---

## 🔐 Authentication

### Signup Flow
```
/signup → Form → POST /api/auth/signup → Token → /client-dashboard
```

### Login Flow
```
/login → Form → POST /api/auth/login → Token → Dashboard (by role)
```

### Protected Routes
```
Middleware checks token → Verify role → Allow or Redirect
```

---

## 📁 Key Files

### Authentication
```
lib/jwt.ts                          # JWT utilities
lib/authStore.ts                    # Auth state management
app/api/auth/login/route.ts         # Login endpoint
app/api/auth/signup/route.ts        # Signup endpoint
app/api/auth/logout/route.ts        # Logout endpoint
middleware.ts                       # Route protection
```

### Pages
```
app/login/page.tsx                  # Login page
app/signup/page.tsx                 # Signup page
app/client-dashboard/page.tsx       # Client dashboard
app/admin-dashboard/page.tsx        # Admin dashboard
```

### Database
```
prisma/schema.prisma                # Database schema
.env.local                          # Environment variables
```

---

## 🔧 Environment Setup

### Create `.env.local`
```
DATABASE_URL=postgresql://sme_user:password@localhost:5432/sme_studio_ai
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### PostgreSQL Setup
```bash
# Connect
psql -U postgres

# Create database
CREATE DATABASE sme_studio_ai;
CREATE USER sme_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE sme_studio_ai TO sme_user;
\q
```

---

## 💻 Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run linter

npx prisma migrate dev   # Create migration
npx prisma studio       # View database
npx prisma generate     # Generate Prisma client
```

---

## 🎯 User Flows

### New User
```
1. Visit /signup
2. Fill form (email, password, name, business)
3. Click "Create Account"
4. Auto-login with JWT token
5. Redirected to /client-dashboard
```

### Existing User
```
1. Visit /login
2. Enter email & password
3. Click "Login"
4. Token verified
5. Redirected to dashboard (by role)
```

### Admin User
```
1. Login with admin account
2. Redirected to /admin-dashboard
3. Access user management, payments, templates
4. Can manage platform settings
```

---

## 🔑 API Endpoints

### Authentication
```
POST /api/auth/signup
  Request: { email, password, fullName, businessName, phone }
  Response: { token, user }

POST /api/auth/login
  Request: { email, password }
  Response: { token, user }

POST /api/auth/logout
  Response: { success, message }
```

### Users (Ready to implement)
```
GET /api/users              # List users (admin)
POST /api/users             # Create user
GET /api/users/[id]         # Get user
PUT /api/users/[id]         # Update user
DELETE /api/users/[id]      # Delete user
```

---

## 🗄️ Database Models

### User
```
id, email, password (hashed), fullName, businessName, phone
role (CLIENT|ADMIN), subscriptionActive, subscriptionPlan
subscriptionEndDate, documentsRemaining, createdAt, updatedAt
```

### Project
```
id, userId, title, type, sector, status
content (JSON), metadata (JSON)
pdfUrl, wordUrl, pptUrl, createdAt, updatedAt
```

### Payment
```
id, userId, amount, currency, paymentMethod
status (PENDING|COMPLETED|FAILED|REFUNDED)
transactionId, reference, createdAt, updatedAt
```

### Template
```
id, name, type, sector, description
content (JSON), isActive, createdAt, updatedAt
```

---

## 🎨 UI Components

### Pages
- Landing page with hero, features, pricing
- Login/Signup forms with validation
- Client dashboard with 4 tabs
- Admin dashboard with 5 tabs

### Features
- Responsive design (mobile, tablet, desktop)
- Toast notifications (success, error)
- Loading states with spinners
- Status badges (draft, completed, etc.)
- Data tables with actions
- Stat cards with metrics

---

## 🔒 Security

### Implemented
- ✅ Password hashing (bcryptjs)
- ✅ JWT token signing
- ✅ Token expiry (7 days)
- ✅ HttpOnly cookies
- ✅ Protected routes
- ✅ Role-based access
- ✅ Input validation

### Recommended
- 🔒 HTTPS in production
- 🔒 Rate limiting
- 🔒 CSRF protection
- 🔒 Email verification
- 🔒 Password reset
- 🔒 2FA support

---

## 🧪 Quick Test

### Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "businessName": "Test Business"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📊 Project Status

### ✅ Complete
- Landing page
- Authentication system (JWT)
- Login/Signup pages
- Client dashboard
- Admin dashboard
- PostgreSQL database
- Protected routes
- Role-based access

### ⏳ To Do
- Document editor
- Document generation
- Payment processing
- AI integration
- WhatsApp chatbot
- Email notifications

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Project overview |
| COMPLETE_SETUP.md | Full setup guide |
| JWT_AUTH_GUIDE.md | Authentication details |
| DATABASE_SETUP.md | PostgreSQL setup |
| DASHBOARDS_AND_DB.md | Dashboard features |
| AUTHENTICATION_SUMMARY.md | Auth system summary |
| QUICK_REFERENCE.md | This file |

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| npm not found | Install Node.js |
| Database error | Check PostgreSQL running |
| JWT_SECRET missing | Add to .env.local |
| Token invalid | Restart dev server |
| Always redirected | Check localStorage |
| API error | Check browser console |

---

## 🎓 Learning Path

1. **Start** → Run `npm run dev`
2. **Test** → Visit `http://localhost:3000`
3. **Signup** → Create account at `/signup`
4. **Login** → Login at `/login`
5. **Explore** → Check dashboards
6. **Read** → Review documentation
7. **Build** → Implement next features

---

## 💡 Tips

- Use `npx prisma studio` to view database
- Check browser console for errors
- Check terminal for server logs
- Use `npm run dev` for development
- Keep `.env.local` secure
- Change `JWT_SECRET` in production

---

## 🚀 Next Steps

1. ✅ Setup complete
2. ✅ Authentication working
3. ⏳ Build document editor
4. ⏳ Add payment processing
5. ⏳ Integrate AI
6. ⏳ Deploy to production

---

## 📞 Need Help?

1. Check COMPLETE_SETUP.md
2. Review JWT_AUTH_GUIDE.md
3. Check browser console
4. Check terminal logs
5. Verify .env.local

---

**Ready to build! 🚀**

Start with: `npm run dev`
