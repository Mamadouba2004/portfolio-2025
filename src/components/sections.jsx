/* ============================================================
   Page sections: Hero, About, Projects, Experience,
   Tech, Resume, Letters, Contact
   ============================================================ */
import React from 'react';
import {
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiHtml5,
  SiPandas, SiNumpy, SiScikitlearn, SiClaude, SiLangchain,
  SiGooglegemini, SiGithub, SiJupyter, SiStreamlit,
} from 'react-icons/si';
import { PORTFOLIO as P } from '../data.js';
import { Icon, Reveal } from './common.jsx';

/* Brand logos for the tech wall (only the ones with recognizable marks). */
const TECH_ICONS = {
  'Python': SiPython,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'C / C++': SiCplusplus,
  'HTML / CSS': SiHtml5,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'scikit-learn': SiScikitlearn,
  'Claude API': SiClaude,
  'LangChain': SiLangchain,
  'Gemini API': SiGooglegemini,
  'Git / GitHub': SiGithub,
  'Jupyter': SiJupyter,
  'Streamlit': SiStreamlit,
};
/* Official-ish brand colors, tuned to stay readable on a dark background.
   Logos with a near-black/very-dark brand mark (GitHub, LangChain) are left
   out so they inherit currentColor and adapt to light/dark mode. */
const TECH_COLORS = {
  'Python': '#5A9FD4',
  'TypeScript': '#3178C6',
  'JavaScript': '#E8C500',
  'C / C++': '#5C8DBC',
  'HTML / CSS': '#E34F26',
  'Pandas': '#E70488',
  'NumPy': '#4DABCF',
  'scikit-learn': '#F7931E',
  'Claude API': '#D97757',
  'Gemini API': '#9277C7',
  'Jupyter': '#F37626',
  'Streamlit': '#FF4B4B',
};
/* Tasteful stroke-glyph fallbacks for tools without a clean brand logo. */
const TECH_FALLBACK = {
  'SQL': 'database',
  'SQL schema design': 'database',
  'ChromaDB': 'database',
  'Power BI': 'chart',
  'Excel': 'chart',
  'ETL pipelines': 'code',
  'VS Code': 'code',
  'RAG pipelines': 'spark',
  'Gradio': 'spark',
  'Eval harnesses': 'check',
  'Copilot Studio': 'bolt',
  'Power Automate': 'bolt',
};

/* ---------- HERO ---------- */
export function Hero() {
  const id = P.identity;
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div>
          <Reveal tag="div">
            <span className="status-pill"><span className="status-dot"></span>{id.availability}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1>AI Engineer<br />building <span className="gtext">systems<br />that ship.</span></h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-role">{id.role}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="hero-lede">{id.lede}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#chat"><Icon name="spark" />Chat with my AI</a>
              <a className="btn btn-ghost" href="#work"><Icon name="arrow" />View my work</a>
              <a className="btn btn-ghost" href={id.resume} target="_blank" rel="noopener noreferrer"><Icon name="download" />Resume</a>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <div className="hero-meta">
              {P.heroMeta.map((m, i) => (
                <div className="m" key={i}><b>{m.n}</b><span>{m.l}</span></div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={240} className="hero-visual">
          <div className="portrait">
            <div className="portrait-ring"></div>
            <img src={id.headshot} alt={id.name} width="900" height="1350" />
            <div className="portrait-badge">
              <span className="dot"></span>
              <div>
                <b>{id.name}</b>
                <span>{id.location}</span>
              </div>
            </div>
          </div>
          <div className="float-chip fc-1"><i>{'{ }'}</i> RAG · Agents · Eval</div>
          <div className="float-chip fc-2"><Icon name="bolt" style={{ width: 14, height: 14, color: 'var(--accent)' }} /> Apex Forum · AI Lead</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
export function About() {
  const id = P.identity;
  return (
    <section id="about" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">About</span></Reveal>
        <div className="about-grid">
          <div>
            <Reveal delay={60}>
              <p className="about-lead">I turn ambiguous problems into <em>intelligent systems</em> — from RAG pipelines and agents to data pipelines that move real business metrics.</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="about-body">
                <p>I'm a {P.education.degree} student at {P.education.school} and the AI Lead at Apex Forum, where I ship automation and analytics that teams actually rely on. My focus is production-minded AI: retrieval quality, output guardrails, and evaluation harnesses that catch failure before it reaches a user.</p>
                <p>I care about rigor — C++ data structures from first principles, ML models I can defend, and metrics I can prove. I'm pursuing technology consulting, AI/ML engineering, and data analytics roles.</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="hero-cta" style={{ marginTop: 28 }}>
                <a className="btn btn-ghost btn-sm" href={id.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" />LinkedIn</a>
                <a className="btn btn-ghost btn-sm" href={id.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
              </div>
            </Reveal>
          </div>
          <div className="pillars">
            {P.pillars.map((p, i) => (
              <Reveal delay={i * 90} key={i}>
                <div className="glass pillar">
                  <div className="pillar-ic"><Icon name={p.ic} /></div>
                  <div>
                    <h4>{p.h}</h4>
                    <p>{p.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECT CARD ---------- */
/* Uniform, lightweight card — no full-width spanning, no fake browser mock.
   Flagship projects get a subtle "Featured" tag + accent instead. */
function ProjectCard({ pr }) {
  const badgeClass = pr.status === 'live' ? 'live' : pr.status === 'wip' ? 'wip' : 'done';
  return (
    <div className={`glass proj-card ${pr.featured ? 'is-featured' : ''}`}>
      <div className="proj-top">
        <div className="proj-ic"><Icon name={pr.icon} /></div>
        <div className="proj-tags">
          {pr.featured && <span className="badge feat"><Icon name="spark" style={{ width: 12, height: 12 }} />Featured</span>}
          <span className={`badge ${badgeClass}`}><span className="bd"></span>{pr.statusLabel}</span>
        </div>
      </div>
      <h3>{pr.title}</h3>
      <div className="proj-sub">{pr.sub}</div>
      <p className="proj-desc">{pr.desc}</p>
      {pr.metrics && (
        <div className="proj-metrics">
          {pr.metrics.map((m, i) => (<div className="pm" key={i}><b>{m.b}</b><span>{m.s}</span></div>))}
        </div>
      )}
      <div className="chips">
        {pr.tech.map((t, i) => (<span className="chip" key={i}>{t}</span>))}
      </div>
      <div className="proj-actions">
        {pr.demo && (
          <a className="btn btn-primary btn-sm" href={pr.demo} target="_blank" rel="noopener noreferrer"><Icon name="external" />Live Demo</a>
        )}
        {pr.repo && (
          <a className="btn btn-ghost btn-sm" href={pr.repo} target="_blank" rel="noopener noreferrer"><Icon name="github" />View Code</a>
        )}
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
export function Projects() {
  return (
    <section id="work" className="sec-pad">
      <div className="wrap">
        <div className="proj-head">
          <div>
            <Reveal><span className="eyebrow">Selected Work</span></Reveal>
            <Reveal delay={60}><h2 className="sec-title">Projects I've shipped</h2></Reveal>
          </div>
          <Reveal delay={120}>
            <a className="btn btn-ghost btn-sm" href={P.identity.github + '?tab=repositories'} target="_blank" rel="noopener noreferrer"><Icon name="github" />All repos</a>
          </Reveal>
        </div>
        <div className="proj-grid">
          {P.projects.map((pr, i) => (
            <Reveal key={pr.title} delay={(i % 3) * 70}>
              <ProjectCard pr={pr} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */
export function Experience() {
  return (
    <section id="experience" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">Experience</span></Reveal>
        <Reveal delay={60}><h2 className="sec-title">Where I've made impact</h2></Reveal>
        <div className="timeline">
          {P.experience.map((ex, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="tl-item">
                <div className="tl-when">
                  <b>{ex.when}</b>
                  <span className="loc"><Icon name="pin" style={{ width: 13, height: 13 }} />{ex.mode}</span>
                </div>
                <div className="tl-body">
                  <h4>{ex.role}</h4>
                  <div className="org">{ex.org}</div>
                  <ul>
                    {ex.bullets.map((b, j) => (<li key={j} dangerouslySetInnerHTML={{ __html: b }} />))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={60}>
            <div className="tl-item">
              <div className="tl-when">
                <b>{P.education.years}</b>
                <span className="loc"><Icon name="cap" style={{ width: 13, height: 13 }} />{P.education.grad}</span>
              </div>
              <div className="tl-body">
                <h4>{P.education.degree}</h4>
                <div className="org">{P.education.school}</div>
                <div className="chips" style={{ marginTop: 4 }}>
                  {P.education.coursework.map((c, i) => (<span className="chip" key={i}>{c}</span>))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- TECH (logo wall) ---------- */
/* Map each technology to a brand logo (react-icons / Simple Icons) where one
   exists, falling back to a stroke glyph from our own Icon set otherwise. */
function TechTile({ name }) {
  const brand = TECH_ICONS[name];
  const color = TECH_COLORS[name];
  return (
    <div className="logo-tile" title={name}>
      <span className="logo-mark" style={color ? { color } : undefined}>
        {brand ? React.createElement(brand) : <Icon name={TECH_FALLBACK[name] || 'code'} />}
      </span>
      <span className="logo-name">{name}</span>
    </div>
  );
}

export function Tech() {
  return (
    <section id="stack" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">Toolkit</span></Reveal>
        <Reveal delay={60}><h2 className="sec-title">Technologies I work with</h2></Reveal>
        <div className="tech-wall">
          {P.tech.map((c, i) => (
            <Reveal key={c.cat} delay={i * 70}>
              <div className="tech-group">
                <h4>{c.cat}</h4>
                <div className="logo-grid">
                  {c.items.map((t) => (<TechTile name={t} key={t} />))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RESUME ---------- */
export function ResumeSec() {
  const id = P.identity;
  return (
    <section id="resume" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">Resume</span></Reveal>
        <div className="resume-wrap">
          <Reveal className="resume-doc">
            <div className="doc-bar"><i></i><i></i><i></i><span className="nm">Mamadou_Ba_Resume.pdf</span></div>
            <iframe src={id.resume + '#view=FitH'} title="Mamadou Ba resume" loading="lazy"></iframe>
          </Reveal>
          <Reveal delay={80} className="resume-side">
            <h3>The one-page version.</h3>
            <p>Everything on this site, distilled. Open it inline or take a copy with you.</p>
            <div className="resume-facts">
              <div className="rfact"><span className="ic"><Icon name="cap" /></span><div>{P.education.degree} · <b>{P.education.school}</b></div></div>
              <div className="rfact"><span className="ic"><Icon name="brief" /></span><div>{id.currentRole}</div></div>
              <div className="rfact"><span className="ic"><Icon name="pin" /></span><div>{id.location} · <b>{id.availability}</b></div></div>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href={id.resume} download><Icon name="download" />Download PDF</a>
              <a className="btn btn-ghost" href={id.resume} target="_blank" rel="noopener noreferrer"><Icon name="external" />Open full</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- LETTERS ---------- */
export function Letters() {
  return (
    <section id="letters" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">References</span></Reveal>
        <Reveal delay={60}><h2 className="sec-title">Recommendation letters</h2></Reveal>
        <Reveal delay={100}><p className="sec-sub">Written references from supervisors, faculty, and program leads. Full letters available on request.</p></Reveal>
        <div className="letters-grid">
          {P.letters.map((l, i) => {
            const initials = l.name.split(' ').slice(0, 2).map(w => w[0]).join('');
            return (
              <Reveal key={l.name} delay={i * 80}>
                <div className="glass letter">
                  <div className="quote-mark">“</div>
                  <blockquote>{l.quote}</blockquote>
                  <div className="letter-by">
                    <div className="letter-av">{initials}</div>
                    <div>
                      <b>{l.name}</b>
                      <span>{l.title}</span>
                    </div>
                  </div>
                  <div className="letter-actions">
                    {l.source ? (
                      <a className="btn btn-ghost btn-sm" href={l.source} target="_blank" rel="noopener noreferrer"><Icon name="external" />Read full letter</a>
                    ) : l.via ? (
                      <span className="letter-via"><Icon name={l.via === 'LinkedIn' ? 'linkedin' : 'check'} style={{ width: 14, height: 14 }} />via {l.via}</span>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT / FOOTER ---------- */
export function Contact() {
  const id = P.identity;
  return (
    <section id="contact" className="sec-pad contact">
      <div className="wrap">
        <Reveal className="glass contact-card">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Let's talk</span>
          <h2>Building something<br />intelligent? <span className="gtext">Let's chat.</span></h2>
          <p>{id.availability} in technology consulting, AI/ML engineering, and data analytics. The inbox is always open.</p>
          <div className="contact-cta">
            <a className="btn btn-primary" href={`mailto:${id.email}?subject=Let's talk — opportunity for Mamadou`}><Icon name="mail" />{id.email}</a>
            <a className="btn btn-ghost" href={id.resume} target="_blank" rel="noopener noreferrer"><Icon name="download" />Resume</a>
          </div>
          <div className="socials">
            <a className="social-btn" href={id.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a className="social-btn" href={id.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a className="social-btn" href={`mailto:${id.email}`} aria-label="Email"><Icon name="mail" /></a>
            {id.phone && <a className="social-btn" href={`tel:${id.phone.replace(/[^0-9+]/g, '')}`} aria-label="Phone"><Icon name="phone" /></a>}
          </div>
        </Reveal>
        <div className="footer-base">
          <p>© 2026 {id.name}. Built from scratch.</p>
          <p>{id.location} · {id.phone}</p>
        </div>
      </div>
    </section>
  );
}
