# SME Studio AI - Admin & Client Dashboards + PostgreSQL

## 🎯 What's New

### 1. Two Separate Dashboards

#### Client Dashboard (`/client-dashboard`)
- **My Documents** - View, download, delete projects
- **Create New** - Quick access to all document types
- **Analytics** - Personal usage statistics
- **Settings** - Account management
- **Subscription Info** - Plan details and renewal date

#### Admin Dashboard (`/admin-dashboard`)
- **Overview** - Key metrics and charts
- **User Management** - View, edit, delete users
- **Payment Management** - Track all transactions
- **Template Management** - Create and manage templates
- **Settings** - Platform configuration

### 2. PostgreSQL Database

Complete Prisma schema with 8 models:
- **Users** - User accounts with roles (CLIENT/ADMIN)
- **Projects** - Documents with metadata
- **Payments** - Transaction tracking
- **Templates** - Reusable document templates
- **AdminLogs** - Audit trail
- **SectorIntelligence** - Industry data
- **Analytics** - Platform metrics

### 3. API Routes

RESTful API endpoints for database operations:
- `GET/POST /api/users` - User management
- `GET/POST /api/projects` - Document management
- `GET/POST /api/payments` - Payment tracking
- `GET/POST /api/templates` - Template management

## 📁 New Files Created

### Pages
- ✅ `app/client-dashboard/page.tsx` - Client dashboard (400+ lines)
- ✅ `app/admin-dashboard/page.tsx` - Admin dashboard (450+ lines)

### Database
- ✅ `prisma/schema.prisma` - Complete database schema
- ✅ `app/api/users/route.ts` - User API endpoints

### Documentation
- ✅ `DATABASE_SETUP.md` - PostgreSQL setup guide
- ✅ `DASHBOARDS_AND_DB.md` - This file

## 🗄️ Database Schema Overview

### Users Model
```
- id (String, unique)
- email (String, unique)
- password (String, hashed)
- fullName (String)
- businessName (String)
- phone (String, optional)
- role (CLIENT | ADMIN)
- subscriptionActive (Boolean)
- subscriptionPlan (String: "monthly" | "pay-per-doc")
- subscriptionEndDate (DateTime, optional)
- documentsRemaining (Int)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Projects Model
```
- id (String, unique)
- userId (String, foreign key)
- title (String)
- type (PROPOSAL | PITCH_DECK | LOAN_APPLICATION | COMPANY_PROFILE | CASHFLOW | EXECUTIVE_SUMMARY | BRANDING_KIT)
- sector (String)
- status (DRAFT | COMPLETED | DOWNLOADED | ARCHIVED)
- content (JSON)
- metadata (JSON)
- pdfUrl (String, optional)
- wordUrl (String, optional)
- pptUrl (String, optional)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Payments Model
```
- id (String, unique)
- userId (String, foreign key)
- amount (Float)
- currency (String: "MWK", "USD", etc.)
- paymentMethod (String: "paychangu" | "flutterwave")
- status (PENDING | COMPLETED | FAILED | REFUNDED)
- transactionId (String, unique, optional)
- reference (String, optional)
- description (String, optional)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Templates Model
```
- id (String, unique)
- name (String)
- type (DocumentType)
- sector (String, optional)
- description (String, optional)
- content (JSON)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### AdminLogs Model
```
- id (String, unique)
- adminId (String, foreign key)
- action (String)
- targetType (String, optional)
- targetId (String, optional)
- details (JSON, optional)
- createdAt (DateTime)
```

### SectorIntelligence Model
```
- id (String, unique)
- sector (String, unique)
- description (String, optional)
- averagePrice (Float, optional)
- riskFactors (String[])
- opportunities (String[])
- marketSize (String, optional)
- growthRate (String, optional)
- data (JSON, optional)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Analytics Model
```
- id (String, unique)
- totalUsers (Int)
- activeUsers (Int)
- totalDocuments (Int)
- totalRevenue (Float)
- date (DateTime, unique)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up PostgreSQL
Follow `DATABASE_SETUP.md` for:
- Installing PostgreSQL
- Creating database
- Configuring `.env.local`

### 3. Initialize Database
```bash
npx prisma migrate dev --name init
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Dashboards
- **Client Dashboard**: `http://localhost:3000/client-dashboard`
- **Admin Dashboard**: `http://localhost:3000/admin-dashboard`

## 📊 Client Dashboard Features

### My Documents Tab
- Table view of all projects
- Status indicators (Draft, Completed, Downloaded)
- Quick actions: View, Download, Delete
- Sort and filter capabilities

### Create New Tab
- Grid of 6 document types
- Quick-create buttons
- Links to editor

### Analytics Tab
- Document usage breakdown
- Monthly activity stats
- Performance metrics

### Settings Tab
- Profile information
- Business details
- Email and phone

## 🛠️ Admin Dashboard Features

### Overview Tab
- 4 key metrics cards
- Revenue trend chart
- User growth chart
- Month-over-month comparisons

### User Management Tab
- Complete user list
- Plan and status information
- Join dates
- Quick actions: View, Edit, Delete
- Add new user button

### Payment Management Tab
- All transactions
- Status tracking (Completed, Pending)
- Payment method info
- Date and amount
- Quick actions

### Template Management Tab
- Template cards
- Type and sector info
- Status indicators
- Edit and delete buttons
- Add template button

### Settings Tab
- Platform configuration
- Pricing settings
- Support email
- Subscription prices

## 🔌 API Endpoints (Ready to Implement)

### Users
```
GET    /api/users              # List all users (admin)
POST   /api/users              # Create new user
GET    /api/users/[id]         # Get user by ID
PUT    /api/users/[id]         # Update user
DELETE /api/users/[id]         # Delete user
```

### Projects
```
GET    /api/projects           # List user's projects
POST   /api/projects           # Create new project
GET    /api/projects/[id]      # Get project details
PUT    /api/projects/[id]      # Update project
DELETE /api/projects/[id]      # Delete project
```

### Payments
```
GET    /api/payments           # List payments (admin)
POST   /api/payments           # Create payment
GET    /api/payments/[id]      # Get payment details
PUT    /api/payments/[id]      # Update payment status
```

### Templates
```
GET    /api/templates          # List templates
POST   /api/templates          # Create template (admin)
PUT    /api/templates/[id]     # Update template (admin)
DELETE /api/templates/[id]     # Delete template (admin)
```

## 🔐 Security Considerations

### Authentication
- Implement JWT tokens
- Secure password hashing (bcryptjs)
- Role-based access control (RBAC)

### Authorization
- Verify user role before admin operations
- Check user ownership of projects
- Validate payment transactions

### Data Protection
- Hash passwords before storing
- Encrypt sensitive data
- Use environment variables for secrets
- Implement rate limiting

## 📈 Next Steps

### Phase 1: Backend Integration
1. ✅ Database schema created
2. ⏳ Implement authentication API
3. ⏳ Create user management API
4. ⏳ Build payment processing API
5. ⏳ Add document generation API

### Phase 2: Frontend Integration
1. ⏳ Connect dashboards to API
2. ⏳ Implement real data loading
3. ⏳ Add form submissions
4. ⏳ Error handling and validation

### Phase 3: Advanced Features
1. ⏳ WhatsApp integration
2. ⏳ Email notifications
3. ⏳ Document export (PDF, Word, PPT)
4. ⏳ Analytics dashboard

## 📚 File Structure

```
app/
├── client-dashboard/
│   └── page.tsx              # Client dashboard
├── admin-dashboard/
│   └── page.tsx              # Admin dashboard
└── api/
    └── users/
        └── route.ts          # User API endpoints

prisma/
└── schema.prisma             # Database schema

docs/
├── DATABASE_SETUP.md         # PostgreSQL setup
└── DASHBOARDS_AND_DB.md      # This file
```

## 🎨 Dashboard Design

### Color Scheme
- **Primary**: Emerald (#059669)
- **Secondary**: Navy (#0F172A)
- **Accent**: Gold (#EAB308)
- **Background**: Gray (#F3F4F6)

### Components
- Responsive sidebars
- Data tables with actions
- Stat cards
- Form inputs
- Status badges
- Action buttons

## 🧪 Testing Checklist

- [ ] PostgreSQL connection working
- [ ] Prisma migrations successful
- [ ] Client dashboard loads
- [ ] Admin dashboard loads
- [ ] Navigation between tabs works
- [ ] Sample data displays correctly
- [ ] Responsive design on mobile
- [ ] API endpoints respond

## 📞 Support

For database issues, see `DATABASE_SETUP.md`
For dashboard features, check component code
For API implementation, refer to `app/api/users/route.ts`

---

**Admin & Client Dashboards + PostgreSQL Database Ready!**
