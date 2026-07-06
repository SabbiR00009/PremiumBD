# PremiumBD — Luxury Beauty & Fashion

E-commerce store for authentic premium cosmetics, skincare, fragrance and fashion imported
from the USA and Europe, sold in Bangladesh.

**Stack:** React 18 + TypeScript + Vite + Tailwind (frontend) · Express + Mongoose + JWT
(backend, single-file `server.js`) · MongoDB Atlas.

## Features

- Browse/search/filter products by category, brand keyword and country of origin
- Product detail with stock states; cart with stock-aware quantities (localStorage)
- JWT auth: register, login, session restore (`/api/auth/me`)
- Checkout with shipping address → order stored with status tracking
- "My orders" page with status chips
- Admin panel: add products, view registered users (admin-only API + UI)

## Demo accounts (after seeding)

| Role     | Email                  | Password     |
|----------|------------------------|--------------|
| Admin    | admin@premiumbd.com    | Admin@123    |
| Customer | customer@premiumbd.com | Customer@123 |

## Setup

```bash
npm install
cp .env.example .env       # fill in MONGODB_URI, DB_NAME, JWT_SECRET
npm run seed               # loads demo accounts + 8 products
npm run dev:full           # starts API (:5005) + frontend (:5173) together
```

Open http://localhost:5173.

| Command              | What it does                                  |
|----------------------|-----------------------------------------------|
| `npm run dev`        | Frontend only (Vite, port 5173)               |
| `npm run dev:server` | API only (Express with --watch, port 5005)    |
| `npm run dev:full`   | Both, with colored logs                       |
| `npm run seed`       | Reset + seed the database                     |
| `npm run build`      | Production build of the frontend into `dist/` |

The frontend reads `VITE_API_URL` (defaults to `http://localhost:5005`) if you host the API
elsewhere.

## Environment variables (`.env` — never commit this file)

```
CLIENT_URL=http://localhost:5173   # CORS origin
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net   # no db name
DB_NAME=premiumbd
JWT_SECRET=<long random string>
PORT=5005
```

## Deployment sketch

- **Frontend**: `npm run build` → deploy `dist/` to Vercel/Netlify; set `VITE_API_URL` to the API's URL at build time.
- **API**: `server.js` is a long-running Express server → host on Render/Railway free tier
  (GitHub Pages **cannot** host it — it only serves static files).
- Set the API host's env vars from the table above, and point `CLIENT_URL` at the deployed frontend origin.

## Security notes

- `.env` was accidentally committed in this repo's early history and has been purged; the
  exposed Atlas password must be considered compromised — **rotate it in Atlas → Database
  Access** if you haven't already.
- Passwords are bcrypt-hashed (12 rounds); JWTs expire after 30 days.
