# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate Sanity types from schema

## Architecture

This is a **Next.js 15 + Sanity CMS** project with the following key structure:

### Next.js App Router Structure
- **`app/(website)/`** - Public website pages (blog, services, main content)
- **`app/(admin)/studio/`** - Sanity Studio admin interface at `/studio`
- **`app/api/`** - API routes including draft mode
- **Route groups** `()` are used to organize without affecting URL structure

### Content Management
- **Sanity CMS** integration with visual editing capabilities
- **Draft mode** for content preview (`/draft-mode/enable`)
- **Sanity Studio** mounted at `/studio` route
- **Content types** defined in `sanity/schemaTypes/`
- **TypeScript types** auto-generated via `npm run typegen`

### Component Architecture
- **`components/main/`** - Main website components (services, headers, etc.)
- **`components/ui/`** - Reusable UI components
- **Styled with Tailwind CSS** and custom styling
- **Framer Motion** for animations
- **Headless UI** for accessible components

### Key Configuration
- **TypeScript build errors ignored** in production (`ignoreBuildErrors: true`)
- **Image optimization** configured for Sanity CDN, Microlink, and Cloudinary
- **Sanity config** includes Vision tool, Presentation tool, and Code Input plugin

### Content Structure
The project appears to be for a services/agency website with:
- Blog functionality
- Services/portfolio showcase
- Visual editing capabilities for content management