# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hirovo is a Turkish job search platform. This repository contains the landing website that promotes the mobile app (available on Google Play). The site is a static Next.js export with pages for home, privacy policy, and terms of service.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build static export to /out
npm run lint     # Run ESLint
npm run start    # Start production server (not used for static export)
```

## Architecture

**Stack:** Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS

**Static Export:** The site uses `output: 'export'` for static HTML generation. Images are unoptimized to support this mode.

**Key Directories:**
- `app/` - Pages and components using App Router
- `app/components/` - Shared components (Header, Footer, ContentCard)
- `lib/hirovo-api/` - API client library (excluded from TS compilation, contains error locales for 45+ languages)

**Path Alias:** `@/*` maps to project root

## Styling

Uses Tailwind CSS with custom brand configuration in `tailwind.config.ts`:
- Brand colors: `hirovo-blue` (#1677f0), `hirovo-teal` (#10cbb4)
- Custom shadows: `shadow-card`, `shadow-btn`, `shadow-btn-hover`
- Gradient classes defined in `globals.css`: `.gradient-bg`, `.btn-gradient`

## Language

All user-facing content is in Turkish. The `lib/hirovo-api/src/errors/locales/` contains translations for error messages in 45+ languages for the API client.
