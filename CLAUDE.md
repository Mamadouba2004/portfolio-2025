# CLAUDE.md — Portfolio Project Reference

This file is for Claude (AI assistant) to read at the start of any session on this project.
It captures the decisions, architecture, and rules that matter for maintaining this codebase.

---

## What this project is

Mamadou Ba's personal portfolio website. Live at:
`https://mamadouba2004.github.io/portfolio-2025/`

Built with React 18 + Vite 5, plain CSS (no UI framework), and a built-in AI chat assistant
(Ba.AI) powered by Google Gemini 2.0 Flash via a Cloudflare Worker proxy.

---

## The two files that control everything visible on the site

### `src/data.js` — all page content
Single source of truth for the entire site: identity, hero stats, projects, experience,
education, tech stack, recommendation letters. Changing anything about Mamadou's background,
roles, or projects means editing this file. Asset paths use `import.meta.env.BASE_URL` so
they resolve in both dev (`/`) and prod (`/portfolio-2025/`).

### `src/knowledge.js` — Ba.AI knowledge base
Everything the chatbot knows. Two parts:
- `SYSTEM_PROMPT`: the facts sent to Gemini on every message. This is what drives live answers.
- `FACTS`: flat keyword-scored entries for the offline fallback (fires when Gemini is down/rate-limited).

**Critical rule: these two files must stay in sync.** If you update experience, projects, education,
or availability in `data.js`, you MUST update `knowledge.js` (both SYSTEM_PROMPT and the relevant
FACTS entries) in the same commit. This is the "butterfly effect" — the site renders from `data.js`
but Ba.AI answers from `knowledge.js`. If they diverge, the chatbot gives wrong info.

**Knowledge-only layer.** The `SYSTEM_PROMPT` has an `=== EXTRA CONTEXT (not shown on the site) ===`
section near the end. This is the place for facts about Mamadou that the chatbot should know but
that do NOT appear anywhere on the visual site — hackathons, certifications, talks, side projects,
what he's currently learning, work style, interests, etc. The sync rule runs ONE direction here:
everything on the site must be in knowledge.js, but knowledge.js may hold extra facts the site
doesn't show. When the user says "remember this about me" or "the bot should know X," add it to
EXTRA CONTEXT (and optionally a FACTS entry for the offline bot) — no data.js change needed.

---

## Current state of Mamadou's profile (keep updated)

- **School:** Baruch College (CUNY), CIS-BBA, Data Analytics concentration, expected May 2028 (transferred from CUNY College of Staten Island). This is the ONE canonical grad date — do not reintroduce CSI / "May 2027" anywhere.
- **Availability:** Open to Fall 2026 & Summer 2027 internships
- **Current role:** Operations Analyst & AI Lead at Apex Forum (Mar 2025 – Present)
- **Upcoming (NOT started yet):** Project Management Intern at MTA, HQ Supplier Management (starts Jun 29, 2026) — keep phrased as incoming/future, not in-progress
- **Location:** New York City area
- **NOTE:** The resume PDF (public/assets/Mamadou_Ba_Resume.pdf) may still show CSI / "Expected May 2027" — it must be re-exported from Baruch and re-dropped to match the site. Code cannot fix a PDF's contents.

---

## Architecture decisions (don't reverse these without reason)

**No `backdrop-filter: blur()` on glass cards.** Was the root cause of scroll and typing jank
(forced GPU compositing on every frame of the animated background). The `.glass` class uses
a near-opaque `--card` CSS variable instead.

**Single shared `IntersectionObserver` for Reveal animations.** One IO instance in `common.jsx`
handles all scroll reveals. Per-element scroll listeners caused jank.

**Ba.AI is not a vector database.** The SYSTEM_PROMPT is stuffed with all facts and sent to
Gemini in every request body. No ChromaDB, no embeddings, no external store. Trade-off:
simplicity and zero cost over retrieval precision. Only becomes a problem if the knowledge base
grows beyond Gemini's context window (~30k tokens), which is far away.

**Cloudflare Worker for the Gemini proxy.** Keeps the API key server-side, rate-limits per IP
(40 req/day via KV), locks CORS to the GitHub Pages origin. The site falls back silently to
local keyword retrieval if the Worker is down. Worker URL:
`https://baai-chat.mamadouba2004.workers.dev`

**`VITE_CHAT_API_URL` is a GitHub Actions variable** (not a secret — it's just a URL).
Set at: repo Settings → Secrets and variables → Actions → Variables → `VITE_CHAT_API_URL`.
It gets baked into the JS bundle at build time.

**`GEMINI_API_KEY` is a Cloudflare secret.** Set via `npx wrangler secret put GEMINI_API_KEY`
from the `worker/` directory. Never committed to git. Never in `wrangler.toml`.

---

## File layout

```
src/
  data.js            ← EDIT THIS for all page content
  knowledge.js       ← EDIT THIS for Ba.AI knowledge (must stay in sync with data.js)
  portfolio.css      ← all styles, 3 themes (aurora/grid/neural), light/dark
  App.jsx            ← shell: canvas background, nav, theme/mode toggles
  main.jsx           ← entry point
  components/
    common.jsx       ← Icon (SVG set), Reveal (IntersectionObserver), mdToHtml
    sections.jsx     ← all sections: Hero, About, Projects, Experience, Tech, Resume, Letters, Contact
    Chat.jsx         ← Ba.AI engine + inline section + floating dock

public/assets/
  mamadou-headshot.jpg          ← keep under 250KB (resize: sips -Z 900 file.jpg)
  Mamadou_Ba_Resume.pdf         ← replace to update resume (keep filename)
  letters/
    seyi-fakoya-gamr.pdf
    jasmine-cardona-csi.pdf

worker/
  src/worker.js      ← Cloudflare Worker source
  wrangler.toml      ← Worker config (has KV namespace ID)
  README.md          ← step-by-step deploy guide
```

---

## Styling and themes

Themes are driven by `data-theme` and `data-mode` attributes on `<html>`:
- Themes: `aurora` (default), `grid`, `neural`
- Modes: `dark` (default), `light`

CSS custom properties do the rest — no JS class toggling. All theme vars are in
`src/portfolio.css` under `:root`, `[data-theme="grid"]`, `[data-theme="neural"]`,
and `[data-mode="light"]`.

---

## Commit rules

- No "Co-Authored-By: Claude" lines in commits.
- No trailing summaries at the end of responses ("Here's what I did...").
- Don't add comments explaining what code does — only add a comment if the WHY is non-obvious.
- Don't create new files unless necessary. Prefer editing existing ones.

---

## Deploy flow

1. Push to `main` → GitHub Actions runs `.github/workflows/deploy.yml`
2. Build step reads `VITE_CHAT_API_URL` from repo Actions variable
3. Deploys `dist/` to GitHub Pages

To update the Worker (Gemini proxy): `cd worker && npx wrangler deploy`
Full Worker setup instructions: `worker/README.md`

---

## When updating content

**To update anything on the site:**
1. Edit `src/data.js`
2. Mirror the change in `src/knowledge.js` (SYSTEM_PROMPT + matching FACTS entry)
3. `npm run build` to verify clean build
4. Push to `main`

**To add a recommendation letter:**
1. Drop PDF in `public/assets/letters/`
2. Add entry to `letters[]` in `src/data.js` with `source: BASE + "assets/letters/filename.pdf"`

**To add a project:**
1. Add to `projects[]` in `src/data.js`
2. Add to the FLAGSHIP PROJECTS section in `knowledge.js` SYSTEM_PROMPT
3. Add a matching FACTS entry in `knowledge.js`
