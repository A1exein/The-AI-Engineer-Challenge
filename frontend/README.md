# Mental Coach — Frontend

Next.js chat UI for the Mental Coach API. Talk to a supportive AI coach; your messages are sent to the FastAPI backend and you get replies in the chat.

## Run locally

1. **Install dependencies** (from this `frontend` folder):

   ```bash
   cd frontend
   npm install
   ```

2. **Start the backend** (from the project root, in another terminal):

   ```bash
   export OPENAI_API_KEY=sk-...
   uv run uvicorn api.index:app --reload
   ```

   The API will be at `http://localhost:8000`.

3. **Start the frontend** (from `frontend`):

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The app will use `http://localhost:8000` as the API URL by default.

4. **Optional — custom API URL**  
   Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` if your backend runs elsewhere (e.g. on Vercel, set it to your deployed API URL).

## Deploy on Vercel

- Build: `npm run build` (runs in the `frontend` directory).
- Set `NEXT_PUBLIC_API_URL` in the Vercel project to your deployed API base URL so the chat works in production.

## Scripts

| Command       | Description                |
|---------------|----------------------------|
| `npm run dev` | Dev server (port 3000)     |
| `npm run build` | Production build         |
| `npm run start` | Run production build     |
| `npm run lint` | Run ESLint                |
