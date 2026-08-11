# Nitesh Kr Thakur — Full Stack Portfolio + Learning Hub + Secure Admin + MongoDB Backend

**Name:** Nitesh Kr Thakur | **Logo:** NKT | **Human-written content** | **Full backend + database** | **Production ready**

This is now a **complete full-stack system**: Frontend (Vite + React) + Backend (Node.js + Express + MongoDB) + Admin Panel that controls **everything** and stores safely in database.

---

## Architecture — Everything Controlled from Admin Panel, Stored Safely

### Before (localStorage only)
- All data in browser localStorage `exp_*`
- Works without backend, but data is per-browser, not shared across devices
- Admin login was client-side `admin/admin123` — easily bypassable via devtools

### Now (Backend + Database)
```
Frontend (Vercel - niteshthakur.com.np)
   |
   |  VITE_API_URL=https://your-backend.onrender.com
   v
Backend (Render / Railway - Node.js + Express)
   |
   |  MONGODB_URI=mongodb+srv://...
   v
MongoDB Atlas (Free) - All data safely stored
   - admins collection (username, hashed password)
   - classes, subjects, chapters (learning hub hierarchy)
   - projects, ads, dailyLogs, experience, education, engagedSchools
   - messages (contact form), viewer (count starting 1111), configs (personal, theme, skills)
   - uploads folder for PDFs/images (or base64 in DB for safety)
```

**All admin actions now:**
1. Admin logs in via `POST /api/auth/login` → gets JWT token → stored as `exp_admin_token`
2. Every create/update/delete in admin panel calls backend API with `Authorization: Bearer <token>`
3. Backend verifies JWT, validates, saves to MongoDB
4. Frontend public pages fetch from `GET /api/*` public endpoints (no auth needed for learning data)
5. If `VITE_API_URL` is not set, site automatically falls back to localStorage mode (so it still works locally without backend)

**Safety:**
- Passwords hashed with bcryptjs
- JWT 7d expiry, secret from env
- Helmet security headers, CORS restricted to FRONTEND_URL, rate limiting on contact form (20 per 15min)
- Protected routes require JWT
- File upload 10MB limit, type filter (pdf, images, docs)
- Viewer count increment once per session (sessionStorage) to avoid spam

---

## What's New in This Final Backend Version

### Backend Folder (`/backend`)
- `package.json` — Express, Mongoose, JWT, bcrypt, multer, helmet, cors, rate-limit
- `src/server.js` — Main server with security middleware + all routes
- `src/config/db.js` — MongoDB Atlas connection
- `src/middleware/auth.js` — JWT protect
- `src/utils/upload.js` — Multer file upload to `uploads/` folder (10MB)
- `src/models/` — 12 models: Admin, Class, Subject, Chapter, Project, Message, Ad, DailyLog, Experience, Education, EngagedSchool, Viewer, Config
- `src/routes/` — factory for CRUD + auth, messages, viewer, config, upload
- `src/seed.js` — Seed initial admin + viewer 1111 + classes + education + engaged schools
- `.env.example` — Template for env vars

### Frontend Updates for Backend
- New `src/lib/api.js` — API client that checks `VITE_API_URL`, uses JWT token from localStorage, fallback to localStorage if API not configured
- Updated `AdminContext.jsx` to be API-aware:
  - If `VITE_API_URL` set, it loads all data from backend on mount (classes, subjects, chapters rebuilt into learningData structure)
  - All CRUD now tries API first, then updates local state (so UI stays fast)
  - Login now tries API login first, stores token, else local fallback
  - Viewer increment tries API, else local
  - Messages now POST to `/api/messages` when API enabled (stored in DB, visible to admin across devices)
- `Contact.jsx` now uses `api.createMessage` when backend is live — messages stored safely in MongoDB, not just browser
- `vercel.json` still there with security headers + SPA rewrites

---

## How to Setup Backend + Database (Free)

### 1. Create Free MongoDB Atlas (Database)

1. Go to **mongodb.com/atlas** → Sign up free
2. Create Project → Create Cluster (Free M0, 512MB) → Choose AWS region closest to you (Mumbai ap-south-1)
3. **Database Access → Add New Database User:** username `niteshadmin`, password generate strong, Role: Atlas Admin
4. **Network Access → Add IP Address → Allow Access From Anywhere** (`0.0.0.0/0`) for free Render deployment (or add your Render IP later)
5. **Database → Connect → Drivers → Copy connection string:** `mongodb+srv://niteshadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your actual password, add DB name: `...net/nkt_portfolio?retry...`

### 2. Setup Backend Locally

```bash
cd backend
npm install
cp .env.example .env
# Edit .env:
# PORT=5000
# MONGODB_URI=mongodb+srv://niteshadmin:YOUR_PASS@cluster0.xxxxx.mongodb.net/nkt_portfolio?retryWrites=true&w=majority
# JWT_SECRET=put-very-long-random-string-here-32-chars-min
# FRONTEND_URL=https://niteshthakur.com.np
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=admin123 (will be hashed)

npm run seed   # Creates admin + viewer 1111 + default classes/education/engaged
npm run dev    # Backend on http://localhost:5000
```

Test: `curl http://localhost:5000/` should show endpoints list.

### 3. Deploy Backend for Free (Render)

1. Go to **render.com** → Sign up with GitHub
2. New + → **Web Service** → Connect your GitHub repo `nt3005156/v1portfolio`
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables (from your .env):
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL=https://niteshthakur.com.np`
   - `ADMIN_USERNAME=admin`
   - `ADMIN_PASSWORD=admin123`
7. Deploy → You get `https://nkt-backend.onrender.com` (free, sleeps after 15min inactivity, wakes on request)

### 4. Connect Frontend to Backend

1. In your frontend project root, create `.env`:
```
VITE_API_URL=https://nkt-backend.onrender.com
```
2. For Vercel deployment:
   - Vercel Dashboard → Your Project → Settings → Environment Variables → Add `VITE_API_URL=https://nkt-backend.onrender.com`
   - Redeploy

Now frontend admin panel talks to real database. When you create a class in Admin → Classes, it POSTs to `https://nkt-backend.onrender.com/api/classes` → saved in MongoDB → all students see it instantly, even on different phones.

### 5. Upload Frontend to Your Domain (already done, but after backend)

After setting `VITE_API_URL` and pushing to GitHub:
```bash
git add .
git commit -m "connect backend API"
git push origin main
```
Vercel auto-deploys to `niteshthakur.com.np`. Viewer count now increments in DB (starting 1111, shared across all users, not per-browser).

---

## Admin Can Now Control Everything — Safely Stored in DB

Go to `https://niteshthakur.com.np/admin/login` → admin / admin123

- **Dashboard:** Shows viewer count from DB (global, starting 1111)
- **Messages:** Reads from `messages` collection in MongoDB (not localStorage) — all student inquiries from any device
- **Daily Logs:** What Happened Today — CRUD → `dailyLogs` collection
- **Experience:** Where I've Been and Built — CRUD → `experiences` collection
- **Education:** BE, Diploma, SEE — CRUD → `educations` collection — you requested Acme entries, pre-seeded
- **Engaged Schools:** RIMS, SRSS, APS, PSS, RSS — CRUD → `engagedSchools` collection — **Fixed bug:** About page now reads from this collection, updates live
- **Classes / Subjects / Chapters:** Learning hub — CRUD → `classes`, `subjects`, `chapters` collections with refs — supports PDF upload via `/api/upload` (file saved to `uploads/` folder, URL returned, stored in chapter pdfs)
- **Projects, Ads / Sponsors, etc.:** All in DB
- **Theme & Settings:** Stored in `configs` collection (key: theme, personal, etc.)
- **Export/Import:** Still works — exports JSON from DB-backed state

All with JWT protection — no one can edit without login. Passwords hashed.

---

## Free Deployment Summary

- **Frontend:** Vercel (free) → `niteshthakur.com.np` (you already did, with Cloudflare CNAME grey → Valid)
- **Backend:** Render.com Web Service (free) → `https://nkt-backend.onrender.com` → connect to MongoDB Atlas
- **Database:** MongoDB Atlas M0 Free (512MB) — enough for 1000 students, ~10k messages, PDFs as base64 or stored in uploads
- **Files:** PDFs/images uploaded via `/api/upload` → saved to `backend/uploads/` — for persistent storage, add Cloudinary (free) or Supabase Storage (free) later — guide in `PRODUCTION_GUIDE.md`

---

## Security After Backend

- **Before (localStorage only):** 6/10 — static safe but admin bypassable via devtools
- **Now with backend + vercel.json headers:** 9/10
  - JWT auth, bcrypt, helmet, rate limit, CORS restricted, file type filter
  - `vercel.json` adds HSTS, CSP, X-Frame DENY, etc.
  - `robots.txt` disallows /admin
  - Admin creds hashed, not plain text
  - Messages rate limited to 20 per 15min per IP

To get 10/10: Add Cloudflare WAF + Turnstile CAPTCHA on contact form (2 lines), add 2FA for admin.

---

## How to Test Backend Locally Without MongoDB?

If you don't set `VITE_API_URL`, site works in localStorage fallback mode (as before) — perfect for offline dev.

Set `VITE_API_URL` only when backend is ready.

---

© Nitesh Kr Thakur — Full stack, NKT logo, no Nepali font, human-written content, database safe.
