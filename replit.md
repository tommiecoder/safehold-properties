# Real Estate Investment Platform - replit.md

## Overview

This is a full-stack real estate investment platform built with React/TypeScript frontend and Express.js backend. The application serves as a property marketplace focusing on premium Nigerian real estate investments, with operations extending to South Africa. It features property listings, search functionality, lead capture forms, team profiles, and testimonials.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **Error Handling**: Centralized error middleware
- **Logging**: Custom request/response logging middleware

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Storage Pattern**: Repository pattern with in-memory fallback

## Key Components

### Core Features
1. **Property Management**: CRUD operations for property listings with search and filtering
2. **Lead Capture**: Contact forms and inquiry management system
3. **Team Profiles**: Team member management with social links
4. **Testimonials**: Customer testimonial system with featured content
5. **WhatsApp Integration**: Direct messaging widget for customer support

### UI Components
- Comprehensive component library using Radix UI primitives
- Custom-styled components following design system
- Responsive design with mobile-first approach
- Accessible form components with validation

### Business Logic
- Property search with multiple filter criteria (type, location, price range, bedrooms, bathrooms)
- Featured content highlighting system
- Lead qualification through structured forms
- Multi-location support (Lagos, Abuja, Abeokuta, Asaba, South Africa)

## Data Flow

### Frontend Data Flow
1. **Query Management**: TanStack Query handles API requests with caching
2. **Form Submission**: React Hook Form → Zod validation → API calls
3. **State Updates**: Optimistic updates with query invalidation
4. **Error Handling**: Toast notifications for user feedback

### Backend Data Flow
1. **Request Processing**: Express middleware → Route handlers
2. **Data Validation**: Zod schemas for request/response validation
3. **Storage Layer**: Service layer → Storage interface → Database/Memory
4. **Response Formation**: Structured JSON responses with error handling

### Database Schema
- **Properties**: Core property data with images, amenities, and metadata
- **Inquiries**: Lead capture data with property associations
- **Team Members**: Staff profiles with social media links
- **Testimonials**: Customer feedback with featured flags

## External Dependencies

### Frontend Dependencies
- **UI Library**: Radix UI components for accessibility
- **Styling**: Tailwind CSS with custom theme configuration
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for image galleries

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM with Zod integration
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Build Tools
- **Bundling**: Vite for frontend, esbuild for backend
- **Development**: Hot reload with Vite dev server
- **Replit Integration**: Cartographer plugin and runtime error overlay

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with Express API proxy
- **TypeScript**: Real-time compilation with incremental builds
- **Database**: Development database with Drizzle migrations

### Production Build
- **Frontend**: Vite production build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Assets**: Static file serving through Express
- **Environment**: NODE_ENV-based configuration switching

### Database Management
- **Migrations**: Drizzle Kit push/migrate commands
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Connection**: Environment-based DATABASE_URL configuration

### Hosting Considerations
- **Static Assets**: Frontend served through Express in production
- **API Routes**: Express server handles all `/api/*` endpoints
- **Database**: PostgreSQL compatible (configured for Neon)
- **Environment Variables**: DATABASE_URL required for operation