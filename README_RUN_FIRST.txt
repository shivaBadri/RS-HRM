RISE NEXT HRM - SUPABASE VERSION
================================

This version does NOT use MongoDB. It uses Supabase, so there is no MongoDB SRV/DNS issue.

LOGIN
-----
Admin Email: admin@risenext.in
Password: admin123

STEP 1 - SUPABASE SQL SETUP
---------------------------
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Open backend/SUPABASE_SQL_SETUP.sql from this zip
4. Paste full SQL
5. Click Run

STEP 2 - BACKEND .env
---------------------
backend/.env is already filled with your Supabase project URL and anon key.
If needed, update:
SUPABASE_URL=https://wzugysugdtgfclqfncta.supabase.co
SUPABASE_KEY=your anon public key
CLIENT_URL=http://localhost:5173

STEP 3 - RUN BACKEND
--------------------
Open CMD in backend folder:

npm install
node seed.js
node server.js

Expected output:
Supabase seed completed
Server running on port 5000
Database: Supabase

STEP 4 - RUN FRONTEND
---------------------
Open new CMD in frontend folder:

npm install
npm run dev

Open:
http://localhost:5173/login

STEP 5 - PUSH TO GITHUB
-----------------------
From project root:

git init
git add .
git commit -m "Supabase HRM version"
git branch -M main
git remote set-url origin https://github.com/shivaBadri/New-HRM.git
git push -u origin main

RENDER BACKEND ENV VARIABLES
----------------------------
Set these in Render backend service:

SUPABASE_URL=https://wzugysugdtgfclqfncta.supabase.co
SUPABASE_KEY=your anon public key
CLIENT_URL=https://your-frontend-url
JWT_SECRET=risehr_secret
PORT=5000
NODE_ENV=production

FRONTEND ENV FOR LIVE
---------------------
In frontend create .env for local or Vercel/Netlify variable:

VITE_API_URL=https://your-render-backend-url.onrender.com

Then build/deploy frontend.

NOTES
-----
- No credentials are shown on login page.
- Rise Next logo added on login and sidebar.
- MongoDB/Mongoose removed from backend runtime.
- Run Supabase SQL before node seed.js.
