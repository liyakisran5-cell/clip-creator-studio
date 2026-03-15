# TikTok-Style App

## Overview
A full-featured TikTok-style social media frontend application built with React, TypeScript, Vite, and Tailwind CSS. Migrated from Lovable to Replit.

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (runs on port 5000)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Animations**: Framer Motion
- **Auth**: Firebase Auth (Google, Email, Username) with demo mode support
- **Icons**: Lucide React + react-icons

## Auth System
3 login methods implemented in `src/pages/AuthPage.tsx`:
- **Google Login** - Works in demo mode when Firebase not configured
- **Email & Password** - Standard login + signup
- **Username Login** - Username + password via user registry

Auth state managed in `src/contexts/AuthContext.tsx`.
User data (username, social links, devices) stored in localStorage.

## Firebase Setup (Optional)
3 environment variables for full Firebase auth (optional):
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_API_KEY`

Without Firebase config, app runs in "demo mode" with local storage auth.

## Pages
- `/` - Main video feed (For You / Following)
- `/auth` - Login / Signup page
- `/username-setup` - Username picker after signup
- `/profile/:username` - User profile with social links
- `/discover` - Discover/search page
- `/sounds` - Sounds Library (12+ tracks, categories, search)
- `/upload` - Upload with AI captions, privacy toggle, sound picker
- `/inbox` - Notifications inbox
- `/dm/:username` - Direct messages
- `/follow/:username` - Follow list
- `/analytics` - Creator analytics
- `/settings` - Settings with social links, device management
- `/sound/:songName` - Sound detail page
- `/admin` - Admin panel with analytics charts

## Key Features Implemented
1. **Demo Mode Auth** - Google login works without Firebase configuration
2. **Unique Username Checker** - Real-time availability check while typing
3. **Video Privacy Toggle** - Public/Private selector on upload
4. **AI Auto-Captioning** - AI caption generation on upload page
5. **Sounds Library** - `/sounds` page with 12 tracks, categories, search, favorites
6. **Video Analytics for Admins** - Area/Line/Bar charts in admin dashboard
7. **Watermark on Download** - Canvas-based watermark with username + app brand
8. **Forgot Password** - Firebase email reset flow
9. **Social Media Linking** - Instagram, YouTube, Facebook on profile + settings
10. **Device Management** - View/logout active sessions in settings

## Key Files
- `src/lib/firebase.ts` - Firebase initialization
- `src/contexts/AuthContext.tsx` - Auth context + user management
- `src/pages/AuthPage.tsx` - Full auth UI (3 login methods)
- `src/pages/UsernameSetup.tsx` - Username picker after signup
- `src/pages/SoundsLibraryPage.tsx` - Sounds library
- `src/data/sounds.ts` - Sounds mock data
- `src/components/tiktok/ShareSheet.tsx` - Share with watermark download
- `src/components/tiktok/BottomNav.tsx` - Navigation (Home, Discover, +, Sounds, Profile)
- `src/pages/admin/Dashboard.tsx` - Admin analytics with recharts

## Running the App
`npm run dev` — accessible on port 5000
