# Gervo Residences — Construction Management System

**Project:** Proposed 2-Storey Residence with Pool  
**Location:** Pueblo del Sol, Tagaytay City  
**Owner:** Mr. and Mrs. Gervo  
**Contractor:** LLUID Builders Inc.  
**Contract Amount:** ₱5,830,536  
**Target Turnover:** August 25, 2026  

---

## Deploy to Vercel (Free — 5 minutes)

### Option A: Drag & Drop (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up free
2. Click **"Add New Project"**
3. Click **"Browse"** and select this entire folder
4. Click **Deploy**
5. Your app is live at `https://gervo-cms.vercel.app` (or similar)

### Option B: Via GitHub (Best for updates)

1. Create a free [github.com](https://github.com) account
2. Create a new repository called `gervo-cms`
3. Upload all files in this folder to that repo
4. Go to [vercel.com](https://vercel.com) → Add New Project → Import from GitHub
5. Select your repo → Deploy
6. Every time you push an update to GitHub, Vercel auto-redeploys ✅

---

## How to Update the App

All project data is in `src/App.jsx` at the top of the file.

### Update phase progress
Find `phaseProgress` in the `App()` function:
```js
const [phaseProgress, setPhaseProgress] = useState({
  A: 75,  // Roofing — change this number
  B: 30,  // GF Slab
  ...
})
```

### Update billing status
Find `PROGRESS_BILLINGS` and change `status` values:
- `"upcoming"` → `"pending"` (when billing is submitted)
- `"pending"` → `"paid"` (when payment is received)

### Update procurement status
Find `URGENT_PROCUREMENT` and change `status`:
- `"pending"` → `"ordered"` → `"delivered"`

---

## Tabs

| Tab | Purpose | Who Uses It |
|-----|---------|-------------|
| Dashboard | Overview of everything | Owner |
| Progress | Update % per phase | Owner / PM |
| Procurement | Track material orders | Owner / PM |
| Billing | Track payments | Owner |
| Site Report | Weekly checklist form | Foreman Julius |
| BOQ | Full bill of quantities | Owner / Reference |

---

## Tech Stack
- React 18
- Vite 5
- No external UI libraries (pure inline styles)
- No database (state is in-memory per session)

## Future Upgrades
- Connect to Supabase for persistent data storage
- Add photo upload in site reports
- Email notifications for billing reminders
- PDF export of weekly reports
