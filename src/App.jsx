/* ============================================================
   App shell: background, nav, theme/mode control, composition
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO as P } from './data.js';
import { Icon } from './components/common.jsx';
import { useChatEngine, ChatDock, ChatInline } from './components/Chat.jsx';
import { Hero, About, Projects, Experience, Tech, ResumeSec, Letters, Contact } from './components/sections.jsx';

const THEMES = [
  { id: 'aurora', label: 'Aurora' },
  { id: 'grid', label: 'Grid' },
  { id: 'neural', label: 'Neural' },
];

/* ---- animated neural constellation (only runs for neural theme) ---- */
function NeuralCanvas({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, w, h, nodes = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * DPR; cv.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(70, Math.floor(w * h / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.7,
      }));
    }
    function accent() {
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c08bff';
    }
    function hex2rgb(hx) {
      const m = hx.replace('#', ''); const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    // Read --accent once and refresh only when the theme/mode attributes change,
    // instead of calling getComputedStyle (a forced style recalc) every frame.
    let rgb = hex2rgb(accent());
    const attrObserver = new MutationObserver(() => { rgb = hex2rgb(accent()); });
    attrObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-mode'] });
    function draw() {
      const [r, g, b] = rgb;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], c = nodes[j];
          const dx = a.x - c.x, dy = a.y - c.y, d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    // Pause the loop while the tab is hidden so we don't burn CPU in the background.
    function onVisibility() {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    }
    resize();
    if (reduce) { draw(); cancelAnimationFrame(raf); } else { draw(); }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      attrObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [active]);
  return <canvas ref={ref}></canvas>;
}

function Background({ theme }) {
  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-layer bg-aurora"><div className="orb3"></div></div>
      <div className="bg-layer bg-grid"><div className="glow"></div><div className="scan"></div></div>
      <div className="bg-layer bg-neural"><div className="glow"></div><NeuralCanvas active={theme === 'neural'} /></div>
      <div className="grain"></div>
    </div>
  );
}

/* ---- Nav ---- */
function Nav({ theme, setTheme, mode, setMode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true }); h();
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [['#work', 'Work'], ['#about', 'About'], ['#experience', 'Experience'], ['#resume', 'Resume'], ['#chat', 'Chat']];
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-brand" href="#top">
        <span className="nav-logo">{P.identity.initials}</span>
        {P.identity.name}
      </a>
      <div className="nav-links">
        {links.map(([h, l]) => (<a key={h} href={h}>{l}</a>))}
      </div>
      <div className="nav-right">
        <div className="theme-switch" role="group" aria-label="Visual theme">
          {THEMES.map(t => (
            <button key={t.id} className={`theme-dot t-${t.id} ${theme === t.id ? 'active' : ''}`}
              onClick={() => setTheme(t.id)} title={t.label} aria-label={`${t.label} theme`}><i></i></button>
          ))}
        </div>
        <button className="icon-btn" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} aria-label="Toggle light / dark">
          <Icon name={mode === 'dark' ? 'sun' : 'moon'} />
        </button>
        <a className="btn btn-primary btn-sm" href="#contact" style={{ marginLeft: 4 }}><Icon name="mail" />Get in touch</a>
      </div>
    </nav>
  );
}

/* ---- Root ---- */
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('mb_theme') || 'aurora');
  const [mode, setMode] = useState(() => localStorage.getItem('mb_mode') || 'dark');
  const chat = useChatEngine();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mb_theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mb_mode', mode);
  }, [mode]);

  return (
    <React.Fragment>
      <Background theme={theme} />
      <Nav theme={theme} setTheme={setTheme} mode={mode} setMode={setMode} />
      <main>
        <Hero />
        <About />
        <Projects />
        <ChatInline api={chat} />
        <Experience />
        <Tech />
        <ResumeSec />
        <Letters />
        <Contact />
      </main>
      <ChatDock api={chat} />
    </React.Fragment>
  );
}
