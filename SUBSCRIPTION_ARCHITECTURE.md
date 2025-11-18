# Subscription System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  Auth Store      │         │  Components      │          │
│  │  (Zustand)       │         │                  │          │
│  │                  │         │ - SubscriptionM. │          │
│  │ - user data      │         │ - SubscriptionG. │          │
│  │ - subscription   │         │ - Dashboard      │          │
│  │ - token          │         │ - Generate Pages │          │
│  └──────────────────┘         └──────────────────┘          │
│         ▲                              ▲                     │
│         │                              │                     │
│         └──────────────┬───────────────┘                     │
│                        │                                     │
│                   Fetch/Update                               │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                    ┌────▼─────────────────────────────┐
                    │    API Endpoints                 │
                    ├──────────────────────────────────┤
                    │ POST   /api/auth/login           │
                    │ POST   /api/auth/signup          │
                    │ GET    /api/projects             │
                    │ POST   /api/projects             │
                    │ POST   /api/payments/callback    │
                    └────┬──────────────────────────────┘
                         │
                    ┌────▼─────────────────────────────┐
                    │    Database (Prisma)             │
                    ├──────────────────────────────────┤
                    │ User                             │
                    │ ├─ subscriptionActive            │
                    │ ├─ subscriptionPlan              │
                    │ ├─ subscriptionEndDate           │
                    │ ├─ documentsRemaining            │
                    │ ├─ avatar                        │
                    │ └─ phone                         │
                    │                                  │
                    │ Project                          │
                    │ ├─ userId (FK)                   │
                    │ ├─ title                         │
                    │ ├─ type                          │
                    │ ├─ sector                        │
                    │ └─ status                        │
                    └──────────────────────────────────┘
```

## Data Flow

### 1. Authentication Flow
```
User Login
    ↓
POST /api/auth/login
    ↓
Verify credentials
    ↓
Generate JWT token
    ↓
Return user object with:
  - id, email, fullName
  - businessName, phone, avatar
  - subscriptionActive
  - subscriptionPlan
  - subscriptionEndDate
  - documentsRemaining
    ↓
Store in Zustand + localStorage
    ↓
Update UI with real data
```

### 2. Subscription Check Flow
```
User tries to access /generate/proposal
    ↓
Layout wrapper checks subscription
    ↓
Is subscriptionActive === true?
    ├─ YES → Render page
    └─ NO → Show subscription modal
              ↓
         User clicks "Upgrade Now"
              ↓
         PayChangu checkout
              ↓
         Payment processed
              ↓
         Callback updates User.subscriptionActive = true
              ↓
         User gains access
```

### 3. Real Data Flow
```
User logs in
    ↓
Auth store receives full user object
    ↓
Dashboard renders with:
  - user.fullName in welcome message
  - user.businessName in KPI card
  - user.avatar or initials in header
  - user.subscriptionActive status
  - user.subscriptionEndDate renewal date
    ↓
Fetch /api/projects with auth token
    ↓
Display real project counts
    ↓
Settings page shows user.* fields
```

## Component Hierarchy

```
App Layout
├── Auth Routes
│   ├── /login
│   └── /signup
├── Protected Routes
│   ├── /client-dashboard
│   │   ├── Dashboard Tab
│   │   │   └── Real KPI Cards
│   │   ├── Generate Tab
│   │   │   └── SubscriptionGuard
│   │   │       └── Document Generators
│   │   ├── Projects Tab
│   │   ├── Sectors Tab
│   │   └── Settings Tab
│   │       └── Real User Data
│   └── /generate/*
│       └── GenerateLayout (Subscription Check)
│           ├── /proposal
│           ├── /pitch-deck
│           ├── /company-profile
│           └── /loan-application
└── Modals
    └── SubscriptionModal
        ├── Monthly Plan
        └── Weekly Plan
```

## State Management

### Zustand Store (authStore.ts)
```typescript
interface AuthUser {
  id: string
  email: string
  fullName: string
  businessName: string
  phone?: string
  avatar?: string
  role: 'CLIENT' | 'ADMIN'
  subscriptionActive: boolean
  subscriptionPlan?: string
  subscriptionEndDate?: string
  documentsRemaining?: number
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setToken: (token: string | null) => void
  setUser: (user: AuthUser | null) => void
  login: (email, password) => Promise<boolean>
  signup: (...) => Promise<boolean>
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}
```

## API Response Structure

### Login/Signup Response
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "cuid123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "businessName": "My Business",
      "phone": "+265 999 123 456",
      "avatar": "https://...",
      "role": "CLIENT",
      "subscriptionActive": true,
      "subscriptionPlan": "monthly",
      "subscriptionEndDate": "2025-01-18T10:17:54.000Z",
      "documentsRemaining": 999
    }
  }
}
```

### Projects Response
```json
{
  "success": true,
  "data": [
    {
      "id": "proj123",
      "userId": "user123",
      "title": "My Proposal",
      "type": "PROPOSAL",
      "sector": "Agriculture",
      "status": "COMPLETED",
      "content": null,
      "metadata": null,
      "pdfUrl": null,
      "wordUrl": null,
      "pptUrl": null,
      "createdAt": "2025-01-10T10:00:00Z",
      "updatedAt": "2025-01-10T10:00:00Z"
    }
  ]
}
```

## Security Considerations

### Token Management
- JWT tokens stored in Zustand + localStorage
- Tokens passed in Authorization header for API calls
- Token verified on backend before returning data

### Subscription Verification
- Frontend checks `subscriptionActive` for UX
- Backend should verify subscription for critical operations
- PayChangu callback updates subscription status

### Data Privacy
- User passwords hashed with bcryptjs
- Sensitive data not exposed in API responses
- Phone and avatar optional fields

## Performance Optimizations

1. **Lazy Loading**: Projects fetched on dashboard mount
2. **Caching**: Auth data persisted in localStorage
3. **Conditional Rendering**: Subscription checks prevent unnecessary renders
4. **Memoization**: Components wrapped with proper dependencies

## Error Handling

```
API Error → Toast notification → User feedback
  ├─ 401 Unauthorized → Redirect to login
  ├─ 400 Bad Request → Show validation error
  ├─ 500 Server Error → Show generic error
  └─ Network Error → Show retry option
```

## Future Enhancements

1. **Subscription Management**
   - Cancel subscription
   - Change plan
   - View payment history

2. **Usage Tracking**
   - Documents generated count
   - API usage limits
   - Quota warnings

3. **Profile Management**
   - Upload profile picture
   - Edit user information
   - Change password

4. **Analytics**
   - Track subscription metrics
   - Monitor user engagement
   - Revenue reporting

5. **Notifications**
   - Subscription expiration warnings
   - Payment reminders
   - Feature announcements
