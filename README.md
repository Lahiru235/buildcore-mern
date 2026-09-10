# Buildcore Construction — MERN Website

Full MERN stack rebuild of the Buildcore Construction site UI (MongoDB,
Express, React, Node). Navy/orange theme, all sections from the design
(hero, legacy/about, services, process, stats band, portfolio, team,
testimonials, blog, CTA with a working contact form, footer), backed by a
real API and database.

## Project structure

```
buildcore-mern/
├── backend/          Express + MongoDB API
│   ├── config/db.js
│   ├── models/        Service, Project, TeamMember, Testimonial, BlogPost, ContactMessage
│   ├── routes/         REST endpoints for each model
│   ├── seed/seed.js    Populates the DB with the site's real content
│   └── server.js
└── frontend/          React (Vite) app
    └── src/
        ├── api/api.js     axios client, one function per endpoint
        └── components/    Navbar, Hero, About, Services, Process,
                            StatsBand, Portfolio, Team, Testimonials,
                            Blog, CTA, Footer
```

## 1. Prerequisites

- Node.js 18+ and npm
- MongoDB running locally (`mongod`) or a MongoDB Atlas connection string

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI or port is different
npm run seed     # loads the site's content into MongoDB
npm run dev      # starts the API on http://localhost:5000
```

## 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev      # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`
(see `frontend/vite.config.js`), so just visit **http://localhost:5173**.

## 4. Admin panel

Visit **http://localhost:5173/admin** while both servers are running. The
dashboard shows services, projects, team members, testimonials, blog posts,
and contact messages from MongoDB. Use the search field to filter records,
select a record to view every stored field, and update contact message status
between `new`, `contacted`, and `closed`.

## 5. How it fits together

- Every content section (services, projects, team, testimonials, blog
  posts) fetches its data from the Express API on load. If the API is
  unreachable, each component falls back to the same content so the site
  still renders — useful while you're wiring things up.
- The "Get a Quote" form at the bottom of the page (`#contact`) POSTs to
  `/api/contact` and is saved as a `ContactMessage` document in MongoDB.
  `GET /api/contact` returns all submissions if you want to build an
  admin dashboard later.
- All content lives in the database, not hardcoded in the components —
  edit it via `backend/seed/seed.js` and re-run `npm run seed`, or build
  simple POST/PUT requests against the REST routes.

## 6. Editing in VS Code

1. Open the `buildcore-mern` folder in VS Code (`File > Open Folder`).
2. Install the "ES7+ React/Redux/React-Native snippets" extension if you
   want JSX snippets (optional).
3. Real photography: the current images are Unsplash placeholders.
   Replace the `image`/`photo` URLs in `backend/seed/seed.js` (and re-seed)
   with your client's real photos, or upload files to
   `frontend/public/images/` and reference them as `/images/filename.jpg`.
4. Colors, fonts, and spacing all live in `frontend/src/index.css`
   (`:root` variables) — change `--navy` / `--orange` there to re-theme
   the whole site.
5. Company details (phone, address, email, business hours) are in
   `frontend/src/components/Footer.jsx` and `Hero.jsx` — update these to
   match your client's real contact info.

## 7. Production build

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Netlify, Vercel, etc.) and the
`backend/` folder to any Node host (Render, Railway, an EC2 box) — just
set `CLIENT_ORIGIN` in the backend's `.env` to your deployed frontend URL,
and point the frontend's API calls at your deployed backend URL instead of
the local proxy.
