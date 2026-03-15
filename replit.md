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
- **Auth**: Firebase Auth (Google, Email, Phone OTP, Username)
- **Icons**: Lucide React + react-icons

## Auth System
4 login methods implemented in `src/pages/AuthPage.tsx`:
- **Google Login** - One-tap via Firebase Google provider
- **Email & Password** - Standard login + signup
- **Phone OTP** - 6-digit SMS verification via Firebase Phone Auth
- **Username Login** - Username + password via user registry

Auth state managed in `src/contexts/AuthContext.tsx`.
User data (username, social links, devices) stored in localStorage.

## Firebase Setup Required
3 environment variables needed for real Firebase auth:
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_API_KEY`

Without these, app runs in "demo mode" (local storage auth, OTP demo code: 123456).

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
1. **OTP SMS Login** - Firebase Phone Auth with 6-digit OTP UI
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
- `src/pages/AuthPage.tsx` - Full auth UI (all 4 methods)
- `src/pages/UsernameSetup.tsx` - Username picker after signup
- `src/pages/SoundsLibraryPage.tsx` - Sounds library
- `src/data/sounds.ts` - Sounds mock data
- `src/components/tiktok/ShareSheet.tsx` - Share with watermark download
- `src/components/tiktok/BottomNav.tsx` - Navigation (Home, Discover, +, Sounds, Profile)
- `src/pages/admin/Dashboard.tsx` - Admin analytics with recharts

## Running the App
`npm run dev` — accessible on port 5000
