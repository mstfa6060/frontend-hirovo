# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hirovo is a Turkish job search platform. This repository contains the landing website with job search, blog, company profiles, and career guide pages. The site runs as a standalone Next.js server with middleware-based auth and i18n routing.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build standalone output
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

**Stack:** Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS

**Standalone Server:** The site uses `output: 'standalone'` with middleware for auth and i18n. Next.js Image Optimization is enabled with remote patterns for `cms.hirovo.com`.

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

## Internationalization (i18n)

The site supports 50 languages using next-intl. Translations are stored in `messages/` folder.

**Translation Workflow:**
1. Create/edit Turkish content in `messages/tr.json` first
2. Wait for user approval of Turkish content
3. When user says "push", run `npm run translate:all` to generate other languages
4. The translation script uses Google Translate API (google-translate-api-x package)

**Key i18n Files:**
- `i18n/config.ts` - Language configuration (50 locales, RTL detection)
- `i18n/request.ts` - next-intl server configuration
- `i18n/routing.ts` - Routing config with locale prefix
- `scripts/translate-all.js` - Auto-translation script
- `messages/*.json` - Translation files per language

**SEO Content Structure:**
- `messages/cities.json` - 15 city-specific pages (Istanbul, Ankara, Izmir, etc.)
- `messages/sectors.json` - 10 sector pages (teknoloji, saglik, finans, etc.)
- `messages/positions.json` - 10 position pages (yazilimci, satis, muhasebe, etc.)
- `messages/guides.json` - 8 career guide pages (cv-yazma, mulakat-hazirligi, etc.)

All content is merged into `tr.json` for use in the application.

**SEO Page Routes:**
- `/sehirler/[city]` - City-based job listings
- `/sektorler/[sector]` - Sector-based job listings
- `/pozisyonlar/[position]` - Position-based job listings
- `/rehberler/[guide]` - Career guides

## Language (Legacy)

The `lib/hirovo-api/src/errors/locales/` contains translations for error messages in 45+ languages for the API client.
