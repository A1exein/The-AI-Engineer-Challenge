# Deploying the Mental Coach App on Vercel

This repo contains **two** deployable parts: the **API** (FastAPI in `/api`) and the **frontend** (Next.js in `/frontend`). The root `vercel.json` sends all traffic to the API, so if you deploy from the repo root with the default config, you only get the API—and visiting your Vercel URL shows `{"status":"ok"}` (the API root) instead of the Mental Coach chat page.

To see the **Mental Coach UI** at your main URL, you need to deploy the **frontend** and point it at your API.

## Option: Two Vercel projects (recommended)

Use two projects from the same GitHub repo: one for the API, one for the frontend. The “main” URL you share is the frontend project.

### 1. API project (you may already have this)

- **Repo:** This repository.
- **Root Directory:** Leave empty (repo root).
- **Build:** Vercel will use the root `vercel.json` and run the Python API.
- **Environment variables:** Set `OPENAI_API_KEY` (see [api/README.md](../api/README.md)).
- **URL:** e.g. `your-api.vercel.app` — this is your API base URL.

### 2. Frontend project (Mental Coach page)

- **Repo:** Same repository.
- **Root Directory:** `frontend`
- **Framework Preset:** Next.js (auto-detected).
- **Environment variables:**
  - `NEXT_PUBLIC_API_URL` = your API project URL (e.g. `https://your-api.vercel.app`)  
    No trailing slash.
- **URL:** e.g. `your-app.vercel.app` — **this** is the link you share; it shows the Mental Coach chat page.

### Steps in the Vercel dashboard

1. Create a **new project** from the same repo (or duplicate the existing one and change its root).
2. In **Settings → General**, set **Root Directory** to `frontend`. Apply.
3. In **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = `https://<your-api-project>.vercel.app` **(no trailing slash—a trailing slash causes a CORS error when chatting)**
   - (Optional) Add `OPENAI_API_KEY` here too if you want to use the same key; the frontend does not use it, only the API project does.)
4. Redeploy the frontend project.

Use the **frontend project’s** URL as your app link; that’s where users see the Mental Coach page. The API project URL is only used as the backend for the frontend.
