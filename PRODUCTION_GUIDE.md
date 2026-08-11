# Production Guide — Nitesh Kr Thakur

## 1000 Students Concurrent
- Static build (dist) on CDN (Vercel/Netlify/Cloudflare) auto-scales to 10k
- Main bundle 128kb gzipped, CSS 7.5kb, lazy admin chunks 1-4kb
- No heavy deps, GPU-only transforms, ErrorBoundary
- Tested: `npm run build` passes

## PDF Upload from Computer
- Admin → Chapters → PDF Upload tab → "Upload from Computer" button
- Uses FileReader → DataURL stored in pdfs[].url
- Student view: if url is data: → shows Download button (download attr), else Open Link
- Limit 5MB for localStorage demo — for production replace fileStorage.js with Supabase Storage / S3 upload

## Messages Module
- Contact form saves to localStorage['exp_messages']
- Admin → Messages shows all, searchable, mark read/unread, delete, reply via mailto, unread badge
- 500 messages max in demo — migrate to DB for production

## Content Persistence After 1 Month Update
- All data in localStorage keys: exp_learning, exp_personal, etc.
- localStorage is per-domain, NOT per-deployment. New deployment on same domain keeps storage
- Auto backup: every change saved to exp_backup_latest with version 2.1-nitesh-prod
- Workflow:
  1. Before deploy: /admin/settings → Export JSON → save
  2. Deploy new code to same domain (Vercel)
  3. Content still there (same domain storage)
  4. If cleared, Settings → Import File → restore

For multi-device persistence (admin laptop → students phones), replace AdminContext localStorage with API calls to Supabase.

## Deployment
```bash
npm run build
# dist/ folder → Vercel: vercel --prod
```

## Security
- Demo auth: admin/admin123 client-side — for prod add JWT, bcrypt, server validation
- Change creds in Settings

## Features
- Name: Nitesh Kr Thakur, logo NKT, no personal photo
- No Nepali font per latest request — pure English
- Admin manages all frontend: Classes, Subjects, Chapters, Projects, Content, Theme, Messages

© Nitesh Kr Thakur
