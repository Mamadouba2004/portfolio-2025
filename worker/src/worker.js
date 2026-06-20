/* ============================================================
   Ba.AI chat proxy — Cloudflare Worker
   Sits between the static site (GitHub Pages) and the Gemini API.
   - Keeps GEMINI_API_KEY server-side (never shipped to the browser)
   - Locks CORS to the allowed site origin(s)
   - Rate-limits per visitor IP (KV) to protect the free quota
   - Caps input size, history length, and output tokens

   Bindings (see wrangler.toml):
     - GEMINI_API_KEY  (secret)   `wrangler secret put GEMINI_API_KEY`
     - RATE_KV         (KV namespace)
   Vars (wrangler.toml [vars]):
     - ALLOWED_ORIGINS (comma-separated)  e.g. "https://mamadouba2004.github.io"
     - DAILY_LIMIT     (per-IP requests/day, default 40)
     - GEMINI_MODEL    (default "gemini-2.5-flash")
   ============================================================ */

const MAX_QUESTION_CHARS = 600;   // reject anything longer
const MAX_HISTORY_TURNS = 12;     // only send the most recent turns to Gemini
const MAX_OUTPUT_TOKENS = 320;    // cap Gemini's reply length

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: 'method_not_allowed' }, 405, cors);
    }
    // Reject cross-origin callers not on the allowlist.
    if (!isAllowedOrigin(origin, env)) {
      return json({ error: 'forbidden_origin' }, 403, cors);
    }

    // ---- parse + validate ----
    let payload;
    try { payload = await request.json(); }
    catch { return json({ error: 'bad_json' }, 400, cors); }

    const question = String(payload.question || '').trim();
    const system = String(payload.system || '').slice(0, 8000);
    const history = Array.isArray(payload.history) ? payload.history : [];
    if (!question) return json({ error: 'empty_question' }, 400, cors);
    if (question.length > MAX_QUESTION_CHARS) {
      return json({ error: 'question_too_long' }, 413, cors);
    }

    // ---- per-IP daily rate limit (KV) ----
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const dailyLimit = parseInt(env.DAILY_LIMIT || '40', 10);
    if (env.RATE_KV) {
      const key = `rl:${ip}:${utcDay()}`;
      const used = parseInt((await env.RATE_KV.get(key)) || '0', 10);
      if (used >= dailyLimit) {
        return json({ error: 'rate_limited' }, 429, cors);
      }
      // best-effort increment; expire after ~25h so the bucket self-cleans
      await env.RATE_KV.put(key, String(used + 1), { expirationTtl: 90000 });
    } else {
      // No KV binding — per-IP rate limiting is inactive. Surface this in logs
      // so a missing binding in a deployed environment doesn't go unnoticed.
      console.warn('[baai-chat] RATE_KV binding missing — per-IP rate limiting is disabled.');
    }

    // ---- build Gemini request ----
    const contents = [];
    for (const m of history.slice(-MAX_HISTORY_TURNS)) {
      const role = m.role === 'user' ? 'user' : 'model';
      const text = String(m.text || '').slice(0, MAX_QUESTION_CHARS);
      if (text) contents.push({ role, parts: [{ text }] });
    }
    // Gemini requires the conversation to start with a 'user' turn — drop any
    // leading 'model' messages (e.g. the bot's opening greeting).
    while (contents.length && contents[0].role === 'model') contents.shift();
    contents.push({ role: 'user', parts: [{ text: question }] });

    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;
    const body = {
      systemInstruction: system ? { parts: [{ text: system }] } : undefined,
      contents,
      generationConfig: { temperature: 0.6, maxOutputTokens: MAX_OUTPUT_TOKENS },
      // Omit safetySettings so Gemini applies its default content filters. The
      // system prompt is supplied by the browser, so default filtering is the
      // backstop against a tampered prompt eliciting unfiltered output.
    };

    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!r.ok) return json({ error: 'upstream_error' }, 502, cors);
      const data = await r.json();
      const reply = (data?.candidates?.[0]?.content?.parts || [])
        .map(p => p.text || '').join('').trim();
      if (!reply) return json({ error: 'empty_reply' }, 502, cors);
      return json({ reply }, 200, cors);
    } catch {
      return json({ error: 'fetch_failed' }, 502, cors);
    }
  },
};

/* ---- helpers ---- */
function utcDay() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}
function allowedList(env) {
  return String(env.ALLOWED_ORIGINS || '')
    .split(',').map(s => s.trim()).filter(Boolean);
}
function isAllowedOrigin(origin, env) {
  const list = allowedList(env);
  if (list.length === 0) {
    // No allowlist configured — open to all origins. Intended only for local
    // dev; in production ALLOWED_ORIGINS must be set. Log loudly so a missing
    // env var in a deployed environment is visible in the Worker logs.
    console.warn('[baai-chat] ALLOWED_ORIGINS is unset — CORS is open to all origins.');
    return true;
  }
  return list.includes(origin);
}
function corsHeaders(origin, env) {
  const list = allowedList(env);
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
  // Only echo Access-Control-Allow-Origin for callers we actually allow. A
  // blocked origin gets no ACAO header (browser blocks it) and we never leak
  // the configured allowlist to an unauthorized caller.
  if (list.length === 0) {
    headers['Access-Control-Allow-Origin'] = origin || '*'; // unconfigured => dev
  } else if (list.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}
function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
