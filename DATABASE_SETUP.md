# SME Studio AI - PostgreSQL Database Setup

## Prerequisites

- PostgreSQL 12+ installed
- Node.js 18+
- npm or yarn

## Installation Steps

### 1. Install PostgreSQL

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run installer and remember the password for `postgres` user
- Default port: 5432

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sme_studio_ai;

# Create user
CREATE USER sme_user WITH PASSWORD 'your_secure_password';

# Grant privileges
ALTER ROLE sme_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE sme_studio_ai TO sme_user;

# Exit
\q
```

### 3. Configure Environment Variables

Create `.env.local` with:

```
# Database
DATABASE_URL="postgresql://sme_user:your_secure_password@localhost:5432/sme_studio_ai"

# Firebase (keep existing)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Install Prisma

Already added to `package.json`. Run:

```bash
npm install
```

### 5. Initialize Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Open Prisma Studio (optional - visual database explorer)
npx prisma studio
```

### 6. Verify Database

```bash
# Connect to database
psql -U sme_user -d sme_studio_ai

# List tables
\dt

# Exit
\q
```

## Database Schema

### Users Table
- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `fullName` - User's full name
- `businessName` - Business name
- `phone` - Contact number
- `role` - CLIENT or ADMIN
- `subscriptionActive` - Boolean
- `subscriptionPlan` - "monthly" or "pay-per-doc"
- `subscriptionEndDate` - When subscription expires
- `documentsRemaining` - For pay-per-doc users

### Projects Table
- `id` - Unique identifier
- `userId` - Reference to User
- `title` - Document title
- `type` - PROPOSAL, PITCH_DECK, LOAN_APPLICATION, etc.
- `sector` - Business sector
- `status` - DRAFT, COMPLETED, DOWNLOADED, ARCHIVED
- `content` - JSON document data
- `pdfUrl` - Generated PDF URL
- `wordUrl` - Generated Word URL
- `pptUrl` - Generated PowerPoint URL

### Payments Table
- `id` - Unique identifier
- `userId` - Reference to User
- `amount` - Payment amount
- `currency` - MWK, USD, etc.
- `paymentMethod` - paychangu, flutterwave
- `status` - PENDING, COMPLETED, FAILED, REFUNDED
- `transactionId` - External transaction ID
- `reference` - Payment reference

### Templates Table
- `id` - Unique identifier
- `name` - Template name
- `type` - Document type
- `sector` - Industry sector
- `content` - JSON template content
- `isActive` - Boolean

### AdminLogs Table
- `id` - Unique identifier
- `adminId` - Reference to Admin User
- `action` - Action performed
- `targetType` - Type of target (user, payment, project)
- `targetId` - ID of target
- `details` - JSON details

### SectorIntelligence Table
- `id` - Unique identifier
- `sector` - Sector name (unique)
- `description` - Sector description
- `averagePrice` - Average pricing
- `riskFactors` - Array of risks
- `opportunities` - Array of opportunities
- `marketSize` - Market size info
- `growthRate` - Growth rate

### Analytics Table
- `id` - Unique identifier
- `totalUsers` - Total user count
- `activeUsers` - Active user count
- `totalDocuments` - Total documents created
- `totalRevenue` - Total revenue
- `date` - Date of analytics

## Common Commands

### Prisma CLI

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Deploy migrations
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# View schema
npx prisma db pull
```

### PostgreSQL CLI

```bash
# Connect to database
psql -U sme_user -d sme_studio_ai

# List databases
\l

# List tables
\dt

# Describe table
\d table_name

# Run SQL file
\i /path/to/file.sql

# Exit
\q
```

## Backup & Restore

### Backup Database

```bash
pg_dump -U sme_user -d sme_studio_ai > backup.sql
```

### Restore Database

```bash
psql -U sme_user -d sme_studio_ai < backup.sql
```

## Troubleshooting

### Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env.local
- Check port 5432 is accessible

### Permission Denied

```
FATAL: Ident authentication failed for user "sme_user"
```

**Solution:**
- Update `pg_hba.conf` to use md5 authentication
- Restart PostgreSQL

### Migration Issues

```bash
# Reset and try again
npx prisma migrate reset

# Or manually fix
npx prisma migrate resolve --rolled-back migration_name
```

## Security Best Practices

1. **Use Strong Passwords**
   - Minimum 16 characters
   - Mix of uppercase, lowercase, numbers, symbols

2. **Restrict Access**
   - Only allow local connections in development
   - Use VPN/SSH tunneling in production

3. **Regular Backups**
   - Automated daily backups
   - Test restore procedures

4. **Monitor Logs**
   - Check PostgreSQL logs for errors
   - Monitor slow queries

5. **Update Regularly**
   - Keep PostgreSQL updated
   - Update Prisma regularly

## Production Deployment

### Using Managed Services

**Recommended Options:**
- AWS RDS PostgreSQL
- Heroku PostgreSQL
- DigitalOcean Managed Databases
- Railway
- Supabase (PostgreSQL + Auth)

### Environment Variables

```
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

### Migrations

```bash
# Run migrations before deploying
npx prisma migrate deploy
```

## Next Steps

1. Set up PostgreSQL locally
2. Configure `.env.local`
3. Run `npx prisma migrate dev --name init`
4. Start development server: `npm run dev`
5. Access admin dashboard: `http://localhost:3000/admin-dashboard`
6. Access client dashboard: `http://localhost:3000/client-dashboard`

---

**Database setup complete! Ready for development.**
