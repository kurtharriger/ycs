# YourCommunity.Space Project Structure

This document provides an overview of the project structure and key files to help AI assistants understand the codebase.

## Root Configuration Files

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration
- `vercel.json` - Vercel deployment configuration

## Source Code (`src/`)

### App Directory (`src/app/`)
- `page.tsx` - Main landing page
- `layout.tsx` - Root layout component
- `globals.css` - Global styles
- `actions.ts` - Server actions for data mutations

#### API Routes (`src/app/api/`)
- `auth/` - Authentication endpoints
  - `complete-registration/route.ts` - Complete user registration
  - `logout/route.ts` - User logout
  - `send-link/route.ts` - Send authentication link
  - `verify-code/route.ts` - Verify authentication code
- `profile/route.ts` - User profile management
- `register/route.ts` - User registration

#### Pages (`src/app/`)
- `complete-registration/page.tsx` - Profile completion page
- `find-events/page.tsx` - Event discovery page
- `login/page.tsx` - Login page
- `privacy/page.tsx` - Privacy policy
- `profile/page.tsx` - User profile page
- `start-organizing/` - Organizer onboarding
  - `page.tsx` - Main organizer page
  - `layout.tsx` - Organizer section layout
- `terms/page.tsx` - Terms of service

### Components (`src/components/`)
- `LogoutButton.tsx` - Logout functionality
- `ProtectedRoute.tsx` - Route protection wrapper
- `UserProfileIcon.tsx` - User profile display

### Contexts (`src/contexts/`)
- `AuthContext.tsx` - Authentication state management

### Libraries (`src/lib/`)
- `auth.ts` - Authentication utilities
- `db.ts` - Database client configuration
- `email.ts` - Email sending functionality

### Utils (`src/utils/`)
- `url.ts` - URL manipulation utilities

### Other
- `middleware.ts` - Next.js middleware configuration
- `instrumentation.ts` - Application instrumentation

## Database (`prisma/`)
- `schema.prisma` - Database schema definition
- `migrations/` - Database migration files

## Public Assets (`public/`)
- `logo.svg` - Application logo
- Various SVG icons and assets

## Documentation
- `README.md` - Project overview and setup
- `LICENSE.md` - Project license
- `CONTRIBUTOR_LICENSE_AGREEMENT.md` - Contributor agreement

## Scripts
- `scripts/ensure-admin.ts` - Admin user setup

## Key Features

1. **Authentication System**
   - Email-based authentication
   - Profile completion flow
   - Protected routes

2. **User Management**
   - Profile management
   - Registration process
   - Session handling

3. **Event Management**
   - Event discovery
   - Organizer tools
   - Community features

4. **Infrastructure**
   - Next.js 13+ App Router
   - Prisma ORM
   - AWS SES for emails
   - Tailwind CSS for styling

## Development Considerations

1. **Authentication**
   - Uses cookie-based authentication
   - Implements protected routes
   - Handles user sessions

2. **Database**
   - PostgreSQL with Prisma ORM
   - Migration-based schema management
   - Type-safe database access

3. **Email**
   - AWS SES integration
   - OIDC for secure credentials
   - Template-based emails

4. **Styling**
   - Tailwind CSS for styling
   - Responsive design
   - Custom component library

5. **API**
   - RESTful API endpoints
   - Server actions for mutations
   - Type-safe API routes