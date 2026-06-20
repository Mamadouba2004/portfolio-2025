# Mamadou Ba — Portfolio (2025)

Personal portfolio for **Mamadou Ba** — AI Engineer & CS junior at CUNY CSI.
Live at **[mamadouba2004.github.io/portfolio-2025](https://mamadouba2004.github.io/portfolio-2025/)**.

Built with React 18 + Vite, plain CSS (no UI framework), and a built-in AI chat
assistant called **Ba.AI** powered by Google Gemini 2.0 Flash via a Cloudflare
Worker proxy.

---

## What's on the site

| Section | Description |
|---|---|
| **Hero** | Name, title, intro, headshot, links to GitHub/LinkedIn/email |
| **About** | Short bio, what he's building, what he's looking for |
| **Projects** | 6 hand-picked projects (2 flagship / 2 reference / 2 smaller) with live demos, repo links, and status badges |
| **Experience** | Timeline of roles — Apex Forum, CSI Innovation Hub × Verizon, Mouse.org |
| **Tech** | Logo wall of tools and languages with brand colors |
| **Resume** | Embedded PDF viewer with download link |
| **Letters** | 3 recommendation letters (2 as embedded PDFs, 1 from LinkedIn) |
| **Ba.AI chat** | Inline section + floating dock — live Gemini answers, local fallback offline |
| **Contact** | Email, phone, GitHub, LinkedIn, quick links |

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite 5 + React 18** | Fast HMR in dev; minified, hashed assets in prod (~68KB gzipped JS) |
| Styling | **Plain CSS** (`src/portfolio.css`) | 3 switchable visual themes (aurora / grid / neural) + light/dark mode via CSS custom properties on `<html>` |
| Icons | **react-icons/si** (Simple Icons) | Brand logos with brand colors; zero extra HTTP requests |
| AI chat | **Google Gemini 2.0 Flash** via Cloudflare Worker | Free tier, server-side API key, per-IP rate limiting (40 req/day) |
| Hosting | **GitHub Pages** via GitHub Actions | Free, automatic deploys on push to `main` |
| Animation | Vanilla canvas (NeuralCanvas) | Pauses when tab is hidden or `prefers-reduced-motion` is set |

---

## Project layout

```
src/
  data.js            ← CONTENT: all page content (projects, experience, tech, letters, identity)
  knowledge.js       ← AI: Ba.AI knowledge base (system prompt + offline fallback facts)
  portfolio.css      ← STYLE: all styling, 3 themes, light/dark
  App.jsx            ← shell: background, nav, theme/mode toggles, canvas
  main.jsx           ← entry point
  components/
    common.jsx       ← shared: Icon set (SVG), Reveal (IntersectionObserver), mdToHtml
    sections.jsx     ← all page sections as named exports
    Chat.jsx         ← Ba.AI engine + inline section + floating dock

public/assets/
  mamadou-headshot.jpg          ← 169KB, 900px wide (optimized from original 12MB)
  Mamadou_Ba_Resume.pdf         ← current resume (replace to update)
  letters/
    seyi-fakoya-gamr.pdf        ← recommendation letter (Seyi Fakoya, CSI Innovation Hub)
    jasmine-cardona-csi.pdf     ← recommendation letter (Jasmine Cardona, CUNY CSI)

worker/
  src/worker.js      ← Cloudflare Worker: Gemini proxy + CORS + rate limiting
  wrangler.toml      ← Worker config (KV namespace ID goes here)
  README.md          ← step-by-step deploy guide for the Worker
  package.json       ← wrangler dev dep

.github/workflows/
  deploy.yml         ← GitHub Actions: npm ci → npm run build → GitHub Pages deploy
                       reads VITE_CHAT_API_URL from repo Actions variable
```

---

## Editing content — the two files you'll touch

### `src/data.js` — everything on the page

Single source of truth for all visible content. Edit this to update:
- **Projects** — title, description, tags, repo/demo links, status badge, `featured` flag
- **Experience** — roles, dates, bullet points
- **Tech** — the logo wall list
- **Letters** — add a PDF to `public/assets/letters/` and add an entry with `source`, or use `via` for a web link
- **Identity** — name, title, tagline, social links, headshot path, resume path

Asset paths use `import.meta.env.BASE_URL` so they resolve correctly in both dev (`/`) and prod (`/portfolio-2025/`).

To update the **resume**: replace `public/assets/Mamadou_Ba_Resume.pdf` with the new file (keep the same filename).

### `src/knowledge.js` — what Ba.AI knows

This is the AI chat's knowledge base. It has two parts:

**`SYSTEM_PROMPT`** — sent to Gemini on every message. Contains all the facts Gemini is allowed to answer from (about, experience, projects, skills, education). Edit this to keep the AI accurate as things change. Format rules are embedded at the top of the prompt.

**`FACTS`** — flat keyword-scored entries used when Gemini is unreachable (rate limited, offline, Worker down). Each entry has `k` (space-separated keywords) and `a` (the answer in markdown). The local retrieval picks whichever fact scores highest against the user's question.

**How it works (not a vector database):** The Worker sends `SYSTEM_PROMPT` + conversation history to Gemini in the request body. Gemini reads the embedded facts from the prompt. There's no external vector store — everything lives in this one JS file. The trade-off is simplicity and zero cost over retrieval precision.

To teach Ba.AI something new:
1. Add the fact to `SYSTEM_PROMPT` under the relevant section
2. Add a matching `FACTS` entry (for the offline fallback) with relevant keywords
3. Push to `main` — GitHub Actions deploys it automatically

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/portfolio-2025/
npm run build      # → dist/
npm run preview    # preview the production build locally
```

The chat works offline out of the box via the local `FACTS` keyword retrieval.
To test live Gemini locally, copy `.env.example` to `.env` and fill in the Worker URL:

```
VITE_CHAT_API_URL=https://baai-chat.<your-subdomain>.workers.dev
```

---

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`:
1. `npm ci`
2. `npm run build` (reads `VITE_CHAT_API_URL` from repo Actions variable)
3. Deploys `dist/` to GitHub Pages

To set or update the Worker URL:
**GitHub repo → Settings → Secrets and variables → Actions → Variables → `VITE_CHAT_API_URL`**

---

## Ba.AI chat — Cloudflare Worker

The Worker (`worker/`) sits between the site and the Gemini API:
- Holds `GEMINI_API_KEY` as a secret (never in git, never shipped to the browser)
- Locks CORS to `https://mamadouba2004.github.io`
- Rate-limits per visitor IP: 40 requests/day via KV
- Caps input at 600 chars, history at 12 turns, output at 320 tokens

**To deploy or redeploy the Worker**, see [worker/README.md](worker/README.md) — it's a step-by-step guide (Cloudflare account, wrangler login, KV create, secret put, deploy).

Worker URL (live): `https://baai-chat.mamadouba2004.workers.dev`

If the Worker is down or the visitor hits the rate cap, the site silently falls back to local keyword retrieval — the chat still works, just without Gemini.

---

## Performance notes

| Optimization | Detail |
|---|---|
| No `backdrop-filter: blur()` | Replaced with near-opaque `--card` fill; was causing scroll/typing jank on all glass cards |
| Single shared `IntersectionObserver` | One IO instance for all `<Reveal>` animations instead of per-element scroll listeners |
| Canvas pauses offscreen | `visibilitychange` event stops the neural canvas animation when the tab is hidden |
| `content-visibility: auto` | Applied to all `.sec-pad` sections for offscreen rendering savings |
| Headshot optimized | 12MB original → 169KB JPEG (900px wide, quality 82, via `sips`) |
| No UI framework | No Tailwind, no Framer Motion — plain CSS, ~28KB gzipped |

---

## Updating assets

| Asset | How to update |
|---|---|
| **Headshot** | Replace `public/assets/mamadou-headshot.jpg` — keep under 250KB (resize with `sips -Z 900 file.jpg`) |
| **Resume** | Replace `public/assets/Mamadou_Ba_Resume.pdf` |
| **Recommendation letters** | Add PDF to `public/assets/letters/`, update `letters[]` in `src/data.js` |
| **Projects** | Edit `projects[]` in `src/data.js` |
| **AI knowledge** | Edit `src/knowledge.js` — both `SYSTEM_PROMPT` and `FACTS` |
