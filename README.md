# Mamadou Ba — Portfolio (2025)

Personal portfolio for Mamadou Ba — AI Engineer & CS student. Built with
**React 18 + Vite**, plain CSS (no UI framework), and a small **Ba.AI** chat
assistant. Deployed to **GitHub Pages** at `/portfolio-2025/`.

## Stack
- **React 18 + Vite 5** — fast production build (minified, hashed assets).
- **Plain CSS** (`src/portfolio.css`) — 3 switchable visual themes
  (aurora / grid / neural) + light/dark mode, driven by `data-theme` /
  `data-mode` on `<html>`.
- **react-icons** (Simple Icons) — brand logos for the tech "logo wall".
- **Gemini** chat via a **Cloudflare Worker** proxy (see `worker/`).

## Project layout
```
src/
  data.js            # single source of truth for ALL page content
  knowledge.js       # Ba.AI knowledge base (system prompt + local fallback facts)
  portfolio.css      # all styling + themes
  App.jsx            # shell: background, nav, theme/mode, composition
  main.jsx           # entry
  components/
    common.jsx       # Icon set, Reveal (IntersectionObserver), markdown-lite
    sections.jsx     # Hero, About, Projects, Experience, Tech, Resume, Letters, Contact
    Chat.jsx         # Ba.AI engine + inline section + floating dock
public/assets/       # headshot, resume PDF, recommendation-letter PDFs
worker/              # Cloudflare Worker: Gemini proxy + rate limiting
```

## Editing content
Everything is data-driven — edit **`src/data.js`** (projects, experience, tech,
letters, identity) and **`src/knowledge.js`** (what the chatbot knows). No
component edits needed for content changes.

- **Resume:** replace `public/assets/Mamadou_Ba_Resume.pdf` (any length; the
  embedded viewer scrolls).
- **Recommendation letters:** add the PDF to `public/assets/letters/` and point
  `letters[].source` at it, or set `letters[].via` for an online reference.

## Develop
```bash
npm install
npm run dev      # http://localhost:5173/portfolio-2025/
npm run build    # -> dist/
npm run preview
```

## AI chat
The chat works offline out of the box via local keyword retrieval. To enable
**live Gemini**, deploy the Worker in `worker/` (see `worker/README.md`) and set
the repo Actions **variable** `VITE_CHAT_API_URL` to the Worker URL. If unset,
the site silently uses the local fallback.

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml` → `npm run build` →
GitHub Pages. (`npm run deploy` also publishes `dist/` via `gh-pages`.)
