# LingoConnect

A mobile-first language learning app: short video lessons paired with quizzes, daily progress tracking, and five starter languages (English, Spanish, French, Mandarin, German).

Built with React + Vite + Tailwind CSS on the frontend, and Supabase (Postgres + Auth) on the backend.

## Stack

- **Frontend**: React 19, React Router 7, Tailwind CSS 4, Vite
- **Backend**: Supabase (email/password auth, Postgres for progress sync)
- **Fallback**: if Supabase isn't configured, progress is stored in `localStorage` so the app still works locally

## Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Supabase project's URL and anon key:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then, in the Supabase SQL editor for that project, run `supabase/schema.sql` once to create the `progress` table and its row-level security policies.

```bash
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run lint      # oxlint
```

Without real Supabase credentials, signup/login will fail (no backend to talk to) but the rest of the UI still renders — the app falls back to `localStorage` for progress so you can browse lessons locally.

## Deploying

### 1. GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create lingoconnect --source=. --private --push
```

(or create the repo on github.com and `git remote add origin <url>` + `git push -u origin main`)

### 2. Supabase

Create a project at [supabase.com](https://supabase.com), then run `supabase/schema.sql` in its SQL editor.

### 3. Netlify

This repo includes `netlify.toml` (build command, publish dir, and the SPA redirect rule React Router needs). To deploy:

1. [New site from Git](https://app.netlify.com) → pick this repo.
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Add environment variables under **Site settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

`.env` is gitignored, so these must be set in Netlify's dashboard directly — they won't come from the repo.
