# DigitalOcean Database Migration Guide

## Database Connection Details

Your application has been configured to connect to a DigitalOcean PostgreSQL database.

**Note**: Database credentials are stored in `.env.local` (not committed to git). Contact the team for access credentials.

## Configuration Files Updated

### 1. `.env` (created)
Contains the DATABASE_URL and all environment variables needed for the application.

### 2. `.env.local` (updated)
Updated with the DigitalOcean database connection string.

### 3. `.env.example` (updated)
Template file showing the structure of required environment variables.

## Running Migrations

### Option 1: Deploy Existing Migrations
When the database is accessible, run:

```bash
npx prisma migrate deploy
```

This will apply all pending migrations from the `prisma/migrations` folder.

### Option 2: Create Fresh Database
If starting fresh, run:

```bash
npx prisma db push
```

This will create all tables based on your Prisma schema.

### Option 3: Reset Database (Caution!)
To reset the entire database and reapply migrations:

```bash
npx prisma migrate reset
```

**Warning**: This will delete all data!

## Prisma Client Generation

The Prisma Client has already been generated. To regenerate it after schema changes:

```bash
npx prisma generate
```

## Verifying Connection

To test the database connection:

```bash
npx prisma db execute --stdin < query.sql
```

Or use Prisma Studio to explore the database:

```bash
npx prisma studio
```

## Database Schema

The following tables will be created:

- **User**: User accounts and authentication
- **Project**: User projects/documents
- **Payment**: Payment transactions
- **Subscription**: User subscription information
- **Document**: Generated documents

## Next Steps

1. Ensure the DigitalOcean database is accessible from your network
2. Run `npx prisma migrate deploy` to apply migrations
3. Verify tables are created: `npx prisma studio`
4. Test the application with `npm run dev`

## Troubleshooting

### Connection Timeout
- Check if the database is running
- Verify firewall rules allow connections on port 25060
- Ensure your IP is whitelisted in DigitalOcean

### SSL Certificate Issues
- The connection string includes `sslmode=require`
- DigitalOcean uses valid SSL certificates
- If issues persist, try `sslmode=prefer` temporarily

### Migration Conflicts
If migrations fail, check:
- Database is empty (first time setup)
- No other processes are running migrations
- Sufficient disk space on the database server

## Backup

Before running migrations on production:

```bash
# Create a backup (use credentials from .env.local)
pg_dump <DATABASE_URL> > backup.sql
```

## Security Notes

⚠️ **Important**: The database credentials are now in your `.env` file. 

- Never commit `.env` to version control
- Use `.env.local` for local development
- For production, set environment variables directly in your deployment platform
- Rotate credentials periodically
- Use strong passwords for database access
