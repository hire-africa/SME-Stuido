# JWT Authentication Guide - SME Studio AI

## Overview

Complete JWT token-based authentication system with role-based access control (RBAC).

## Features

- ✅ JWT token generation and verification
- ✅ Secure password hashing with bcryptjs
- ✅ Login/Signup with automatic token generation
- ✅ Protected routes with middleware
- ✅ Role-based access control (CLIENT/ADMIN)
- ✅ Token persistence in localStorage
- ✅ Automatic redirect based on user role
- ✅ Toast notifications for auth events

## Architecture

### Files Created

```
lib/
├── jwt.ts                    # JWT utilities
├── authStore.ts              # Zustand auth store

app/
├── api/auth/
│   ├── login/route.ts        # Login endpoint
│   ├── signup/route.ts       # Signup endpoint
│   └── logout/route.ts       # Logout endpoint
├── login/page.tsx            # Login page (updated)
└── signup/page.tsx           # Signup page (updated)

middleware.ts                 # Protected routes middleware
```

## How It Works

### 1. Signup Flow

```
User fills signup form
    ↓
POST /api/auth/signup
    ↓
Validate input
    ↓
Hash password with bcryptjs
    ↓
Create user in database
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Store in Zustand store + localStorage
    ↓
Redirect to /client-dashboard
```

### 2. Login Flow

```
User fills login form
    ↓
POST /api/auth/login
    ↓
Find user by email
    ↓
Verify password with bcryptjs
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Store in Zustand store + localStorage
    ↓
Redirect based on role (ADMIN → /admin-dashboard, CLIENT → /client-dashboard)
```

### 3. Protected Routes

```
User accesses protected route
    ↓
Middleware checks for token
    ↓
Verify token signature and expiry
    ↓
Check user role
    ↓
Allow or redirect to appropriate page
```

## JWT Token Structure

### Payload
```json
{
  "userId": "user_id_here",
  "email": "user@example.com",
  "role": "CLIENT",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Token Expiry
- **Duration**: 7 days
- **Refresh**: Not implemented yet (can be added)

## Environment Variables

Add to `.env.local`:

```
JWT_SECRET=your_super_secret_jwt_key_change_in_production
DATABASE_URL=postgresql://user:password@localhost:5432/sme_studio_ai
```

⚠️ **Important**: Change `JWT_SECRET` in production!

## API Endpoints

### POST /api/auth/signup

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "businessName": "My Business",
  "phone": "+265 9XX XXX XXX"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "role": "CLIENT",
      "subscriptionActive": false
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

### POST /api/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "role": "CLIENT",
      "subscriptionActive": false,
      "subscriptionPlan": "monthly"
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### POST /api/auth/logout

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Client-Side Usage

### Using Auth Store

```typescript
import { useAuthStore } from '@/lib/authStore'

export default function MyComponent() {
  const { login, signup, logout, user, token, isAuthenticated, isAdmin } = useAuthStore()

  // Login
  const handleLogin = async () => {
    const success = await login('user@example.com', 'password123')
    if (success) {
      console.log('Logged in!')
    }
  }

  // Signup
  const handleSignup = async () => {
    const success = await signup(
      'user@example.com',
      'password123',
      'John Doe',
      'My Business',
      '+265 9XX XXX XXX'
    )
    if (success) {
      console.log('Account created!')
    }
  }

  // Logout
  const handleLogout = () => {
    logout()
  }

  // Check authentication
  if (isAuthenticated()) {
    console.log('User is logged in:', user)
  }

  // Check role
  if (isAdmin()) {
    console.log('User is admin')
  }

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <p>Welcome, {user?.fullName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </>
      )}
    </div>
  )
}
```

## Protected Routes

### Client Routes
- `/client-dashboard` - Requires CLIENT or ADMIN role
- `/editor/*` - Requires CLIENT or ADMIN role

### Admin Routes
- `/admin-dashboard` - Requires ADMIN role only

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/pricing` - Pricing page

## Middleware

The middleware (`middleware.ts`) automatically:

1. **Checks token validity** on protected routes
2. **Redirects to login** if token is missing/invalid
3. **Enforces role-based access** (ADMIN vs CLIENT)
4. **Adds user info to request headers** for API routes

## Security Best Practices

### ✅ Implemented
- Password hashing with bcryptjs (10 salt rounds)
- JWT token signing with secret
- HttpOnly cookies for token storage
- Token expiry (7 days)
- Role-based access control

### 🔒 Recommended for Production
- Use HTTPS only
- Implement token refresh mechanism
- Add rate limiting on auth endpoints
- Implement CSRF protection
- Add email verification
- Implement password reset flow
- Add 2FA (two-factor authentication)
- Monitor failed login attempts
- Implement account lockout after failed attempts

## Testing

### Test Signup
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

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3000/client-dashboard
```

## Troubleshooting

### "Cannot find module 'jsonwebtoken'"
- Run `npm install`
- Restart dev server

### "JWT_SECRET not found"
- Add `JWT_SECRET` to `.env.local`
- Restart dev server

### Token not persisting
- Check browser localStorage
- Check cookie settings in browser
- Verify `authStore.ts` is using persist middleware

### Always redirected to login
- Check token expiry
- Verify JWT_SECRET matches between signup and login
- Check middleware configuration

## Next Steps

1. ✅ Run `npm install` to install dependencies
2. ✅ Set up PostgreSQL database
3. ✅ Run `npx prisma migrate dev --name init`
4. ✅ Add `JWT_SECRET` to `.env.local`
5. ✅ Start dev server: `npm run dev`
6. ✅ Test signup at `http://localhost:3000/signup`
7. ✅ Test login at `http://localhost:3000/login`
8. ✅ Access dashboards after login

## File Reference

### lib/jwt.ts
- `generateToken()` - Create JWT token
- `verifyToken()` - Verify and decode token
- `decodeToken()` - Decode without verification
- `extractToken()` - Extract from Authorization header
- `isTokenExpired()` - Check if token expired

### lib/authStore.ts
- `useAuthStore()` - Zustand hook for auth state
- `login()` - Login action
- `signup()` - Signup action
- `logout()` - Logout action
- `isAuthenticated()` - Check if logged in
- `isAdmin()` - Check if admin

### middleware.ts
- Protects routes based on authentication
- Enforces role-based access control
- Adds user info to request headers

---

**JWT Authentication System Ready!**
