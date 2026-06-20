/* ============================================================
   Ba.AI — portfolio chat assistant
   Live: POSTs to the Cloudflare Worker proxy (Gemini) when configured.
   Fallback: local keyword retrieval over KB.FACTS (offline-safe).
   ============================================================ */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KB } from '../knowledge.js';
import { Icon, mdToHtml, Reveal } from './common.jsx';

// Worker endpoint (set VITE_CHAT_API_URL at build time). Empty => local only.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '';
// Client-side guardrail: cap a single visitor session so the API can't be hammered.
const MAX_SESSION_MESSAGES = 25;
const REQUEST_TIMEOUT_MS = 22000;

/* ---- local retrieval (offline-safe) ---- */
function localAnswer(q) {
  const words = q.toLowerCase().replace(/[^a-z0-9+ ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  let best = null, bestScore = 0;
  for (const f of KB.FACTS) {
    const keys = f.k.split(' ');
    let score = 0;
    for (const w of words) for (const k of keys) {
      if (k === w) score += 2;
      else if (k.startsWith(w) || w.startsWith(k)) score += 1;
    }
    if (score > bestScore) { bestScore = score; best = f; }
  }
  return bestScore >= 2 ? best.a : KB.FALLBACK;
}

async function getReply(history, q) {
  // Try the live assistant (Gemini via Worker) first; fall back to local retrieval.
  if (CHAT_API_URL) {
    try {
      const convo = history.filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: KB.SYSTEM_PROMPT, history: convo, question: q }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = (data.reply || '').trim();
        if (text) return text.replace(/^Ba\.AI:\s*/i, '');
      }
      // 429 (rate limited) or any non-OK falls through to local retrieval.
    } catch (e) { /* network/timeout — fall through to local */ }
  }
  return localAnswer(q);
}

export function useChatEngine() {
  const [messages, setMessages] = useState([{ role: 'bot', text: KB.GREETING }]);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const userCountRef = useRef(0);

  const send = useCallback(async (raw) => {
    const q = (raw || '').trim();
    if (!q || busyRef.current) return;
    if (userCountRef.current >= MAX_SESSION_MESSAGES) {
      setMessages(m => [...m, { role: 'user', text: q }, {
        role: 'bot',
        text: "That's a lot of great questions! 🙌 For anything more, reach Mamadou directly at [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu).",
      }]);
      return;
    }
    userCountRef.current += 1;
    busyRef.current = true; setBusy(true);
    setMessages(m => [...m, { role: 'user', text: q }]);
    const history = messages.concat({ role: 'user', text: q });
    const reply = await getReply(history, q);
    setMessages(m => [...m, { role: 'bot', text: reply }]);
    busyRef.current = false; setBusy(false);
  }, [messages]);

  return { messages, busy, send, suggestions: KB.suggestions };
}

/* ---- shared thread UI ---- */
export function ChatThread({ api }) {
  const { messages, busy, send, suggestions } = api;
  const [draft, setDraft] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy]);

  const submit = (e) => { e && e.preventDefault(); send(draft); setDraft(''); };
  const showSuggest = messages.length <= 1;

  return (
    <React.Fragment>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="msg-av">{m.role === 'bot' ? <Icon name="spark" style={{ width: 16, height: 16 }} /> : 'You'.slice(0, 1)}</div>
            <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: mdToHtml(m.text) }} />
          </div>
        ))}
        {busy && (
          <div className="msg bot">
            <div className="msg-av"><Icon name="spark" style={{ width: 16, height: 16 }} /></div>
            <div className="msg-bubble"><div className="typing"><i></i><i></i><i></i></div></div>
          </div>
        )}
      </div>
      {showSuggest && (
        <div className="chat-suggest">
          {suggestions.map((s, i) => (
            <button key={i} className="suggest-chip" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}
      <form className="chat-input" onSubmit={submit}>
        <input value={draft} onChange={e => setDraft(e.target.value)} maxLength={500}
          placeholder={"Ask about projects, RAG, availability…"} aria-label="Message" />
        <button type="submit" disabled={busy || !draft.trim()} aria-label="Send">
          <Icon name="send" />
        </button>
      </form>
    </React.Fragment>
  );
}

/* ---- floating dock ---- */
export function ChatDock({ api }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className={`chat-launcher ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} role="button" aria-label="Open chat assistant">
        <div className="cl-ic"><Icon name="chat" /></div>
        <div>
          <b>Chat with Ba.AI</b>
          <span>Ask about my work</span>
        </div>
      </div>
      <div className={`chat-panel ${open ? 'open' : ''}`} role="dialog" aria-label="Ba.AI assistant">
        <div className="chat-head">
          <div className="ch-av"><Icon name="spark" /><span className="on"></span></div>
          <div className="ch-meta">
            <b>Ba.AI</b>
            <span>Mamadou's assistant</span>
          </div>
          <button className="icon-btn ch-close" onClick={() => setOpen(false)} aria-label="Close chat"><Icon name="x" /></button>
        </div>
        <ChatThread api={api} variant="dock" />
      </div>
    </React.Fragment>
  );
}

/* ---- inline section ---- */
export function ChatInline({ api }) {
  return (
    <section id="chat" className="sec-pad">
      <div className="wrap">
        <Reveal className="glass chat-section-card">
          <div className="chat-intro">
            <span className="eyebrow">Ask my AI</span>
            <h2>Chat with my<br /><span className="gtext">AI assistant</span></h2>
            <p>Don't have time to read it all? Ba.AI answers recruiter questions about my projects, experience, and skills — grounded in my real background, in real time.</p>
            <div className="hero-meta" style={{ marginTop: 8 }}>
              <div className="m"><b>RAG</b><span>powered, like my work</span></div>
              <div className="m"><b>24/7</b><span>always available</span></div>
            </div>
          </div>
          <div className="chat-inline">
            <ChatThread api={api} variant="inline" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
