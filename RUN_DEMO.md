# 🚀 Run Demo - Quick Instructions

## 5-Minute Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Initialize Database
```bash
npx prisma migrate dev --name init
```

### 3️⃣ Create Demo Users
```bash
npm run seed
```

You'll see output like:
```
✅ Demo Client User Created:
   Email: client@demo.com
   Password: password123
   Role: CLIENT

✅ Demo Admin User Created:
   Email: admin@demo.com
   Password: admin123
   Role: ADMIN
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

### 5️⃣ Open in Browser
Visit: `http://localhost:3000`

---

## 🔑 Login Credentials

### For Client Dashboard
```
Email:    client@demo.com
Password: password123
```
→ Go to: `http://localhost:3000/login`

### For Admin Dashboard
```
Email:    admin@demo.com
Password: admin123
```
→ Go to: `http://localhost:3000/login`

---

## ✨ What You Get

### Client Dashboard Includes:
- ✅ 3 sample projects
- ✅ 2 sample payments
- ✅ Analytics dashboard
- ✅ Account settings
- ✅ Active subscription

### Admin Dashboard Includes:
- ✅ Overview metrics
- ✅ User management (see client user)
- ✅ Payment tracking
- ✅ Template management
- ✅ Platform settings

---

## 🎯 Try These

1. **Login** with client credentials
2. **View Dashboard** - See sample projects
3. **Create Document** - Click "Create New"
4. **Check Analytics** - View usage stats
5. **Logout** - Clear session
6. **Login as Admin** - Access admin dashboard
7. **Manage Users** - See client user listed
8. **View Payments** - See transaction history

---

## 🆘 If Something Goes Wrong

### Dependencies Issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Issue
```bash
npx prisma migrate reset
npm run seed
```

### Server Won't Start
```bash
# Kill any running processes
# Then try again
npm run dev
```

### Can't Login
```bash
# Verify seed ran successfully
npx prisma studio

# Check Users table for demo users
```

---

## 📚 Full Documentation

- `COMPLETE_SETUP.md` - Full setup guide
- `JWT_AUTH_GUIDE.md` - Authentication details
- `DEMO_USERS.md` - Demo user information
- `DATABASE_SETUP.md` - Database configuration

---

## 🎉 You're Ready!

Everything is set up. Just run:

```bash
npm run dev
```

Then visit: `http://localhost:3000/login`

**Enjoy! 🚀**
