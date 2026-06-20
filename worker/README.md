# Ba.AI chat proxy (Cloudflare Worker)

A tiny, free serverless proxy that lets the static portfolio (on GitHub Pages)
use the **Gemini API** without ever exposing the API key in the browser. It also
**rate-limits** each visitor so the free quota can't be drained.

```
visitor → portfolio (GitHub Pages) → THIS Worker (holds key) → Gemini 2.0 Flash
```

This is a **separate, one-time deploy** from the website. The website itself is
never re-deployed for this — it just needs the Worker's URL.

---

## One-time setup (~10 minutes, all free)

### 1. Get a free Gemini API key
- Go to **https://aistudio.google.com/apikey** → "Create API key".
- Copy it. (Free tier is plenty for a portfolio.)

### 2. Create a free Cloudflare account
- Sign up at **https://dash.cloudflare.com/sign-up** (no card needed for Workers free tier).

### 3. Install + log in to Wrangler
From this `worker/` folder:
```bash
npm install
npx wrangler login          # opens a browser to authorize
```

### 4. Create the rate-limit KV store
```bash
npx wrangler kv namespace create RATE_KV
```
Copy the printed `id` into `wrangler.toml` (replace `REPLACE_WITH_KV_NAMESPACE_ID`).

### 5. Add the Gemini key as a secret (never committed)
```bash
npx wrangler secret put GEMINI_API_KEY
# paste your key when prompted
```

### 6. Confirm the allowed origin
In `wrangler.toml`, `ALLOWED_ORIGINS` should be your site's origin with **no
trailing slash**:
```
ALLOWED_ORIGINS = "https://mamadouba2004.github.io"
```

### 7. Deploy
```bash
npx wrangler deploy
```
Wrangler prints a URL like `https://baai-chat.<your-subdomain>.workers.dev`.
**That URL is what the website needs.**

---

## Point the website at the Worker

The site reads the Worker URL from `VITE_CHAT_API_URL` at build time.

- **Production (GitHub Pages):** in the GitHub repo →
  **Settings → Secrets and variables → Actions → Variables → New variable**:
  - Name: `VITE_CHAT_API_URL`
  - Value: `https://baai-chat.<your-subdomain>.workers.dev`

  Then push to `main` (or re-run the deploy workflow). The build injects it.

- **Local testing:** copy `.env.example` to `.env` in the project root and set
  `VITE_CHAT_API_URL` to the Worker URL, then `npm run dev`.

If `VITE_CHAT_API_URL` is unset, the chat silently uses the built-in local
keyword-retrieval fallback — so the site always works.

---

## Guardrails (already enforced in `src/worker.js`)
- **CORS** locked to `ALLOWED_ORIGINS`.
- **Per-IP daily cap** = `DAILY_LIMIT` (default 40) via KV.
- **Max question length** 600 chars; **history** trimmed to last 12 turns.
- **Response capped** at 320 output tokens.

Tune any of these in `wrangler.toml` (`DAILY_LIMIT`, `GEMINI_MODEL`) or the
constants at the top of `src/worker.js`.

## Watch live logs
```bash
npx wrangler tail
```
