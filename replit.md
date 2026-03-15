# TikTok-Style App

## Overview
A TikTok-style social media frontend application built with React, TypeScript, Vite, and Tailwind CSS. Migrated from Lovable to Replit.

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (runs on port 5000)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Animations**: Framer Motion

## Pages
- `/` - Main video feed (For You / Following tabs)
- `/profile/:username` - User profile page
- `/discover` - Discover/search page
- `/upload` - Upload video page
- `/inbox` - Notifications inbox
- `/dm/:username` - Direct messages
- `/follow/:username` - Follow list page
- `/analytics` - Analytics dashboard
- `/settings` - User settings
- `/sound/:songName` - Sound/audio page
- `/admin` - Admin panel (dashboard, users, videos, reports, settings)

## Key Directories
- `src/pages/` - Page components
- `src/components/` - Reusable components (including shadcn/ui in `src/components/ui/`)
- `src/components/tiktok/` - TikTok-specific components
- `src/layouts/` - Layout components (e.g. AdminLayout)
- `src/data/` - Static/mock data
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions

## Running the App
The app starts with `npm run dev` and is accessible on port 5000.

## Migration Notes
- Removed `lovable-tagger` dependency from vite config (Lovable-specific)
- Updated Vite server to bind to `0.0.0.0` on port 5000 for Replit compatibility
- All hosts allowed for Replit's proxied preview environment
