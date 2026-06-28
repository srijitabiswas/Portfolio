import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEFAULT_LINKS = [
  { platform: "Email",    url: "mailto:srijitabiswas05@gmail.com" },
  { platform: "GitHub",   url: "https://github.com/srijitabiswas" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/srijita-biswas-9690a3284" },
];

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState(DEFAULT_LINKS);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/social-links`);
        const data = await res.json();
        if (Array.isArray(data) && data.length) setLinks(data);
      } catch {
        // keep DEFAULT_LINKS already shown
      }
    })();
  }, []);

  const emailLink = links.find((l) => l.platform === "Email");
  const emailUrl = emailLink?.url || "mailto:srijitabiswas05@gmail.com";
  const emailAddress = emailUrl.replace(/^mailto:/, "");
  const socialOnly = links.filter((l) => l.platform !== "Email");

  useEffect(() => {
    const t = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(".ct-eyebrow",  { y:16, opacity:0, duration:.7, ease:"expo.out", scrollTrigger:{ trigger:".ct-eyebrow", start:"top 88%" } });
        gsap.from(".ct-heading",  { y:32, opacity:0, duration:.8, ease:"expo.out", scrollTrigger:{ trigger:".ct-heading", start:"top 88%" }, delay:.05 });
        gsap.from(".ct-tagline",  { y:20, opacity:0, duration:.7, ease:"expo.out", scrollTrigger:{ trigger:".ct-tagline", start:"top 88%" }, delay:.1 });
        gsap.from(".ct-cta-row",  { y:20, opacity:0, duration:.7, ease:"expo.out", scrollTrigger:{ trigger:".ct-cta-row", start:"top 88%" }, delay:.15 });
        gsap.from(".ct-divider",  { scaleX:0, duration:.9, ease:"expo.out", transformOrigin:"left", scrollTrigger:{ trigger:".ct-divider", start:"top 90%" }, delay:.1 });
        gsap.from(".ct-col",      { y:24, opacity:0, stagger:.1, duration:.7, ease:"expo.out", scrollTrigger:{ trigger:".ct-grid", start:"top 90%" }, delay:.1 });
      }, ref);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section ref={ref} className="ct" id="contact">
      <div className="ct-wrap s-wrap">

        {/* ── TOP: heading block ── */}
        <p className="ct-eyebrow">CONTACT</p>

        <h2 className="ct-heading">
          <span className="ct-heading-line1">Let's build something</span><br/>
          <span className="ct-heading-accent">meaningful together</span>
        </h2>

        <p className="ct-tagline">
          Available for internships, collaborations, and project discussions.<br/>
          Feel free to reach out — I'd love to hear from you.
        </p>

        {/* CTA button row */}
        <div className="ct-cta-row">
          <a href={emailUrl} className="ct-cta-btn">
            Send me a message →
          </a>
          <button className="ct-copy-btn" onClick={copyEmail}>
            {copied ? "✓ Copied!" : "Copy email"}
          </button>
        </div>

        {/* ── DIVIDER ── */}
        <div className="ct-divider"/>

        {/* ── BOTTOM GRID: 4 columns ── */}
        <div className="ct-grid">

          {/* Col 1 — Email + Location */}
          <div className="ct-col">
            <p className="ct-col-label">Email</p>
            <a href={emailUrl} className="ct-col-link">
              {emailAddress} ↗
            </a>

            <div className="ct-col-gap"/>

            <p className="ct-col-label">Location</p>
            <p className="ct-col-val">Kolkata, West Bengal, India</p>
            <p className="ct-col-sub">Open to remote · onsite · hybrid</p>
            <p className="ct-col-sub ct-col-pref">
              Preferred: Kolkata · Bangalore · Hyderabad
            </p>

            <div className="ct-col-gap"/>

            <p className="ct-col-label">Response time</p>
            <p className="ct-col-val">Usually within 24 hours ⚡</p>
          </div>

          {/* Col 2 — Social */}
          <div className="ct-col">
            <p className="ct-col-label">Social</p>
            <div className="ct-links">
              {socialOnly.map((l) => (
                <a key={l.platform} href={l.url} target="_blank" rel="noreferrer" className="ct-link">
{l.platform} <span className="ct-arr">↗</span>                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Open to */}
          <div className="ct-col">
            <p className="ct-col-label">Open to</p>
            <div className="ct-open-list">
              <p className="ct-open-item">UI/UX Designer</p>
              <p className="ct-open-item">Frontend Developer</p>
              <p className="ct-open-item">AI/ML Projects</p>
            </div>
            <p className="ct-col-sub" style={{marginTop:"6px"}}>Internships &amp; full-time roles</p>
          </div>

          {/* Col 4 — Credit + year */}
          <div className="ct-col ct-col-right">
            <p className="ct-credit-label">Designed and Developed</p>
            <p className="ct-credit-label">by <span className="ct-credit-name">Srijita Biswas</span></p>
            <div className="ct-col-gap"/>
            <p className="ct-year">© 2026</p>
          </div>

        </div>
      </div>

      <style>{`
        /* ── BASE ── */
        .ct {
          background: #000;
          color: #fff;
          padding: clamp(48px,6vw,80px) clamp(20px,5vw,60px) 0;
        }
        .ct-wrap { padding-bottom: clamp(48px,6vw,80px); }

        /* ── EYEBROW ── */
        .ct-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #8b5cf6;
          margin-bottom: 24px;
        }

        /* ── HEADING ── */
        .ct-heading {
          font-size: clamp(26px, 4vw, 54px);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.05;
          color: #fff;
          margin-bottom: 20px;
          max-width: 100%;
          width: fit-content;
        }
        .ct-heading-line1  { white-space: nowrap; }
        .ct-heading-accent { color: #8b5cf6; white-space: nowrap; }

        /* ── TAGLINE ── */
        .ct-tagline {
          font-size: clamp(14px,1.4vw,17px);
          line-height: 1.78;
          color: rgba(255,255,255,.42);
          font-weight: 300;
          max-width: 500px;
          margin-bottom: 36px;
        }

        /* ── CTA ROW ── */
        .ct-cta-row { display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom: 60px; }

        .ct-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px;
          background: #8b5cf6;
          color: #fff;
          border-radius: 8px;
          font-size: 14px; font-weight: 700;
          text-decoration: none;
          transition: all .25s;
          box-shadow: 0 4px 20px rgba(139,92,246,.35);
          font-family: var(--font);
        }
        .ct-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(139,92,246,.5); background: #7c3aed; }

        .ct-copy-btn {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,.4);
          background: none; border: none;
          cursor: pointer;
          font-family: var(--font);
          transition: color .2s;
          padding: 0;
        }
        .ct-copy-btn:hover { color: #8b5cf6; }

        /* ── DIVIDER ── */
        .ct-divider {
          height: 1px;
          background: rgba(255,255,255,.1);
          margin-bottom: 52px;
        }

        /* ── BOTTOM GRID ── */
        .ct-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1.2fr 1.4fr;
          gap: clamp(24px,4vw,60px);
          align-items: start;
        }

        /* ── COLUMN SHARED ── */
        .ct-col {}
        .ct-col-right { text-align: left; }

        .ct-col-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-bottom: 10px;
        }
        .ct-col-val {
          font-size: clamp(14px,1.3vw,16px);
          font-weight: 500;
          color: #fff;
          margin-bottom: 4px;
          line-height: 1.5;
        }
        .ct-col-sub {
          font-size: 12px;
          color: rgba(255,255,255,.38);
          font-weight: 400;
          line-height: 1.6;
        }
        .ct-col-pref { margin-top: 3px; }
        .ct-col-gap  { height: 24px; }

        /* ── EMAIL LINK ── */
        .ct-col-link {
          font-size: clamp(13px,1.2vw,15px);
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          transition: color .2s;
          display: inline-block;
          line-height: 1.5;
        }
        .ct-col-link:hover { color: #8b5cf6; }

        /* ── SOCIAL LINKS ── */
        .ct-links { display:flex; flex-direction:column; gap:6px; }
        .ct-link {
          font-size: clamp(15px,1.6vw,19px);
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color .2s;
          line-height: 1.6;
        }
        .ct-link:hover { color: #8b5cf6; }
        .ct-arr {
          font-size: 14px;
          color: rgba(255,255,255,.4);
          transition: color .2s, transform .2s;
        }
        .ct-link:hover .ct-arr { color: #8b5cf6; transform: translate(2px,-2px); }

        /* ── OPEN TO ── */
        .ct-open-list { display:flex; flex-direction:column; gap:4px; }
        .ct-open-item {
          font-size: clamp(14px,1.3vw,16px);
          font-weight: 500;
          color: #fff;
          line-height: 1.65;
        }

        /* ── CREDIT ── */
        .ct-credit-label {
          font-size: clamp(14px,1.3vw,16px);
          font-weight: 400;
          color: rgba(255,255,255,.55);
          line-height: 1.6;
          margin: 0;
        }
        .ct-credit-name {
          color: #8b5cf6;
          font-weight: 600;
        }
        .ct-year {
          font-size: 13px;
          color: rgba(255,255,255,.25);
          font-weight: 400;
        }

        /* ── MOBILE ── */
        @media(max-width: 900px) {
          .ct-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px 24px;
          }
          .ct-col-right { text-align: left; }
        }
        @media(max-width: 560px) {
          .ct-grid { grid-template-columns: 1fr; gap: 32px; }
          .ct-heading { font-size: clamp(22px,6vw,34px); }
          .ct-heading-line1,
          .ct-heading-accent { white-space: normal; }
        }
      `}</style>
    </section>
  );
}