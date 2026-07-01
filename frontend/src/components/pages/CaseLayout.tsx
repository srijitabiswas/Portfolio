import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
interface Tag { label: string; }
interface Section { title: string; body: string | string[]; }
 
interface CaseLayoutProps {
  num: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  color: string;
  accent: string;
  overview: string;
  problem: string;
  solution: string;
  sections: Section[];
  links?: { label: string; href: string; icon?: string }[];
  team?: string[];
  techStack?: { label: string; items: string[] }[];
}
 
export default function CaseLayout({
  num, title, subtitle, category, tags, color, accent,
  overview, problem, solution, sections, links, team, techStack
}: CaseLayoutProps) {
  const navigate = useNavigate();
 
  useEffect(() => { window.scrollTo(0, 0); }, []);
 
  return (
    <div className="cs-page">

      {/* HERO */}
      <div className="cs-hero" style={{ background: color }}>
        <div className="cs-hero-inner">
          <div className="cs-hero-left">
            <span className="cs-num" style={{ color: accent }}>{num}</span>
            <p className="cs-cat" style={{ color: accent }}>{category}</p>
            <h1 className="cs-title">{title}</h1>
            <p className="cs-subtitle">{subtitle}</p>
            <div className="cs-tags">
              {tags.map(t => (
                <span key={t} className="cs-tag" style={{ borderColor: accent + "44", color: accent, background: accent + "11" }}>{t}</span>
              ))}
            </div>
            {links && links.length > 0 && (
              <div className="cs-links">
                {links.map(l => (
                  <a key={l.label} href={l.href} target="_blank" className="cs-link" style={{ background: accent, color: "#fff" }}>
                    {l.icon && <span>{l.icon}</span>} {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="cs-hero-right">
            <div className="cs-hero-card" style={{ borderColor: accent + "22" }}>
              <p className="cs-hero-card-label">Overview</p>
              <p className="cs-hero-card-text">{overview}</p>
            </div>
          </div>
        </div>
      </div>
 
      {/* BODY */}
      <div className="cs-body">
 
        {/* PROBLEM & SOLUTION */}
        <div className="cs-ps-grid">
          <div className="cs-ps-card cs-problem">
            <div className="cs-ps-icon" style={{ background: accent + "15", color: accent }}>⚡</div>
            <h3 className="cs-ps-title">Problem</h3>
            <p className="cs-ps-text">{problem}</p>
          </div>
          <div className="cs-ps-card cs-solution">
            <div className="cs-ps-icon" style={{ background: accent + "15", color: accent }}>✦</div>
            <h3 className="cs-ps-title">Solution</h3>
            <p className="cs-ps-text">{solution}</p>
          </div>
        </div>
 
        {/* SECTIONS */}
        {sections.map((s, i) => (
          <div key={i} className="cs-section">
            <h2 className="cs-section-title" style={{ color: accent }}>{s.title}</h2>
            {Array.isArray(s.body) ? (
              <ul className="cs-list">
                {s.body.map((item, j) => (
                  <li key={j} className="cs-list-item">
                    <span className="cs-list-dot" style={{ background: accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cs-section-text">{s.body}</p>
            )}
          </div>
        ))}
 
        {/* TECH STACK */}
        {techStack && techStack.length > 0 && (
          <div className="cs-section">
            <h2 className="cs-section-title" style={{ color: accent }}>Tech Stack</h2>
            <div className="cs-tech-grid">
              {techStack.map(group => (
                <div key={group.label} className="cs-tech-group">
                  <p className="cs-tech-label">{group.label}</p>
                  <div className="cs-tech-pills">
                    {group.items.map(item => (
                      <span key={item} className="cs-tech-pill" style={{ borderColor: accent + "33", color: accent }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* TEAM */}
        {team && team.length > 0 && (
          <div className="cs-section">
            <h2 className="cs-section-title" style={{ color: accent }}>Team</h2>
            <div className="cs-team">
              {team.map(m => (
                <div key={m} className="cs-team-member" style={{ borderColor: accent + "33", background: accent + "08" }}>
                  <div className="cs-team-avatar" style={{ background: accent + "22", color: accent }}>
                    {m.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* BACK */}
        <div className="cs-footer-nav">
          <button className="cs-back-btn" onClick={() => navigate(-1)} style={{ color: accent, borderColor: accent }}>
            ← Back to All Projects
          </button>
        </div>
      </div>
 
      <style>{`
        .cs-page { min-height: 100vh; background: var(--cs-bg); font-family: var(--font); }
 
        /* Back button */
        .cs-back {
          position: fixed; top: 20px; left: 24px; z-index: 100;
          background: rgba(255,255,255,.92); backdrop-filter: blur(12px);
          border: 1px solid var(--cs-border); border-radius: 99px;
          padding: 10px 20px; font-size: 13px; font-weight: 700; color: var(--cs-ink);
          cursor: pointer; transition: all .2s; font-family: var(--font);
        }
        .cs-back:hover { background: var(--cs-ink); color: #fff; border-color: var(--cs-ink); }
 
        /* Hero */
        .cs-hero { padding: clamp(80px,10vw,120px) clamp(24px,5vw,80px) clamp(60px,8vw,100px); }
        .cs-hero-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(40px,5vw,80px); align-items: center; }
        .cs-num { font-size: clamp(48px,8vw,96px); font-weight: 900; letter-spacing: -.04em; line-height: 1; display: block; margin-bottom: 8px; opacity: .25; }
        .cs-cat { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; margin-bottom: 16px; }
        .cs-title { font-size: clamp(38px,6vw,76px); font-weight: 900; letter-spacing: -.04em; line-height: 1.05; color: #0a0a1a; margin-bottom: 16px; }
        .cs-subtitle { font-size: clamp(16px,1.6vw,20px); line-height: 1.7; color: rgba(5,5,5,.6); margin-bottom: 24px; font-weight: 300; max-width: 500px; }
 
        .cs-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .cs-tag { padding: 6px 16px; border-radius: 99px; font-size: 12px; font-weight: 600; border: 1.5px solid; }
 
        .cs-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .cs-link { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all .25s; }
        .cs-link:hover { opacity: .85; transform: translateY(-2px); }
 
        .cs-hero-card { background: rgba(255,255,255,.7); backdrop-filter: blur(12px); border: 1px solid; border-radius: 20px; padding: 32px; }
        .cs-hero-card-label { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--cs-ink-60); margin-bottom: 12px; }
        .cs-hero-card-text { font-size: clamp(15px,1.4vw,17px); line-height: 1.8; color: var(--cs-ink); font-weight: 400; }
 
        /* Body */
        .cs-body { max-width: 900px; margin: 0 auto; padding: clamp(60px,8vw,100px) clamp(24px,5vw,60px); }
 
        /* Problem / Solution */
        .cs-ps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 60px; }
        .cs-ps-card { background: var(--cs-card); border: 1px solid var(--cs-border); border-radius: 20px; padding: 28px; }
        .cs-ps-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
        .cs-ps-title { font-size: clamp(18px,1.8vw,22px); font-weight: 800; color: var(--cs-ink); margin-bottom: 10px; }
        .cs-ps-text { font-size: clamp(14px,1.3vw,16px); line-height: 1.78; color: var(--cs-ink-60); font-weight: 300; }
 
        /* Sections */
        .cs-section { margin-bottom: 52px; }
        .cs-section-title { font-size: clamp(22px,2.5vw,30px); font-weight: 800; letter-spacing: -.02em; margin-bottom: 20px; }
        .cs-section-text { font-size: clamp(15px,1.4vw,18px); line-height: 1.8; color: var(--cs-ink-60); font-weight: 300; }
 
        .cs-list { display: flex; flex-direction: column; gap: 12px; list-style: none; }
        .cs-list-item { display: flex; align-items: flex-start; gap: 14px; font-size: clamp(14px,1.3vw,17px); line-height: 1.7; color: var(--cs-ink-60); font-weight: 300; }
        .cs-list-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
 
        /* Tech */
        .cs-tech-grid { display: flex; flex-direction: column; gap: 20px; }
        .cs-tech-group {}
        .cs-tech-label { font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--cs-ink-60); margin-bottom: 10px; }
        .cs-tech-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .cs-tech-pill { padding: 8px 16px; border-radius: 99px; font-size: 13px; font-weight: 600; border: 1.5px solid; background: transparent; }
 
        /* Team */
        .cs-team { display: flex; flex-wrap: wrap; gap: 12px; }
        .cs-team-member { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-radius: 14px; border: 1px solid; font-size: 14px; font-weight: 600; color: var(--cs-ink); }
        .cs-team-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }
 
        /* Footer nav */
        .cs-footer-nav { margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--cs-border); }
        .cs-back-btn { padding: 14px 28px; border-radius: 10px; border: 1.5px solid; font-size: 14px; font-weight: 700; background: none; cursor: pointer; font-family: var(--font); transition: all .2s; }
        .cs-back-btn:hover { opacity: .7; }
 
        @media(max-width: 760px) {
          .cs-hero-inner { grid-template-columns: 1fr; }
          .cs-ps-grid { grid-template-columns: 1fr; }
          .cs-back { position: static; margin: 20px 24px 0; display: inline-flex; }
        }
      `}</style>
    </div>
  );
}