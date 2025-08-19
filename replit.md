# Overview

This is a full-stack React application for a business dashboard system called "FixParts" - a repair service management platform. The application provides a comprehensive interface for managing service requests, customers, parts inventory, and business analytics. Built with modern web technologies, it features a responsive design with a sidebar navigation, header with search functionality, and detailed request management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React 18 and TypeScript, using a component-based architecture with the following key decisions:

- **React Router Alternative**: Uses Wouter for lightweight client-side routing instead of React Router, chosen for its minimal bundle size and simple API
- **UI Component Library**: Implements shadcn/ui components built on Radix UI primitives, providing accessible and customizable components with consistent design
- **Styling Strategy**: Uses Tailwind CSS with CSS custom properties for theming, enabling easy theme switching and consistent design tokens
- **State Management**: Leverages TanStack Query (React Query) for server state management, eliminating the need for complex global state solutions
- **Form Handling**: Integrates React Hook Form with Zod validation for type-safe form management

## Backend Architecture
The backend follows an Express.js REST API pattern with the following design choices:

- **Framework**: Express.js chosen for its simplicity and extensive ecosystem
- **Storage Interface**: Implements an abstract storage interface (IStorage) allowing easy switching between different data persistence layers
- **Development Storage**: Uses in-memory storage (MemStorage) for development, with the interface ready for database integration
- **Middleware**: Custom logging middleware for API request tracking and error handling
- **Development Integration**: Vite integration for hot module replacement and seamless development experience

## Data Storage Solutions
The application is designed with database flexibility in mind:

- **ORM**: Drizzle ORM configured for PostgreSQL, chosen for its type-safety and performance
- **Schema Design**: Type-safe database schemas with Zod validation integration
- **Migration Support**: Built-in database migration support through Drizzle Kit
- **Development Strategy**: Memory-based storage for development with clear migration path to PostgreSQL

## Authentication and Authorization
Currently uses a placeholder structure with:
- User type definitions ready for authentication implementation
- Session management preparation through storage interface
- Frontend components designed to handle user state and permissions

## External Dependencies
- **Database**: PostgreSQL (via Neon serverless) configured but not yet active
- **UI Components**: Radix UI primitives for accessibility and customization
- **Font Integration**: Google Fonts integration for typography (Inter, DM Sans, Fira Code, Geist Mono)
- **Development Tools**: Replit integration for development environment optimization
- **Monitoring**: Ready for Sentry integration (referenced in attached assets)

The architecture emphasizes type safety, development experience, and scalability while maintaining simplicity in the core business logic implementation.