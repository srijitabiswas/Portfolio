import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Landing() {
  const sec = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  /* Always point to whatever resume was most recently uploaded
     via the admin dashboard. Falls back to the static /resume.pdf
     if none has been uploaded yet or the API is unreachable. */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/resume`);
        if (!res.ok) return;
        const data = await res.json();
        if (data?.fileUrl) {
          const url = data.fileUrl.startsWith("http")
            ? data.fileUrl
            : `${API_URL.replace(/\/api$/, "")}${data.fileUrl}`;
          setResumeUrl(url);
        }
      } catch {
        // keep the static fallback
      }
    })();
  }, []);

  /* ── Entrance animations ── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [".ln-intro-line", ".ln-main-heading", ".ln-tagline", ".ln-description", ".ln-actions", ".ln-socials", ".ln-portrait-bg"],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      /* Hero entrance — sequential fade + slight upward reveal */
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".ln-portrait-bg",   { opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
        .from(".ln-intro-line",    { y: 22, opacity: 0, duration: 0.6,  ease: "power3.out" }, 0.15)
        .from(".ln-main-heading",  { y: 36, opacity: 0, duration: 0.8,  ease: "power3.out" }, 0.3)
        .from(".ln-tagline",       { y: 18, opacity: 0, duration: 0.55, ease: "power3.out" }, 0.55)
        .from(".ln-description",   { y: 16, opacity: 0, duration: 0.55, ease: "power3.out" }, 0.68)
        .from(".ln-actions",       { y: 14, opacity: 0, duration: 0.5,  ease: "power3.out" }, 0.82)
        .from(".ln-socials",       { y: 10, opacity: 0, duration: 0.45, ease: "power3.out" }, 0.95);

      /* Hero gently recedes as the user scrolls past it — adds depth,
         scroll itself stays fully native (scrub-linked transform only). */
      gsap.to(".ln-hero-content", {
        y: -40, opacity: 0.15, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      /* What I Do scroll transition (unchanged) */
      gsap.fromTo(".ln-what",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".ln-what", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ln-what-heading",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".ln-what", start: "top 82%", once: true } }
      );
      gsap.fromTo(".ln-wid-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.15,
          scrollTrigger: { trigger: ".ln-wid-cards", start: "top 85%", once: true } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  /* ── Subtle cursor parallax on the background portrait ── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const hero = heroRef.current;
    const portrait = portraitRef.current;
    if (!hero || !portrait) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = px * 24;   // max ~24px drift
      ty = py * 16;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      portrait.style.transform = `translate(${cx}px, ${cy}px) scale(1.08)`;
      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Magnetic buttons (subtle) ── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const buttons = document.querySelectorAll<HTMLElement>(".ln-magnetic");
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${mx * 0.12}px, ${my * 0.16}px)`;
      };
      const leave = () => { el.style.transform = "translate(0,0)"; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const goTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const CARDS = [
    { icon:"💻", title:"Develop",    color:"#60A5FA", border:"rgba(96,165,250,0.3)",  bg:"rgba(96,165,250,0.05)",
      text:"Build responsive web applications and interactive digital products with a focus on performance and usability." },
    { icon:"🎨", title:"Design",     color:"#A78BFA", border:"rgba(167,139,250,0.3)", bg:"rgba(167,139,250,0.05)",
      text:"Create intuitive interfaces, user flows, and user‑centered experiences through research and design thinking." },
    { icon:"🤖", title:"Explore AI", color:"#F472B6", border:"rgba(244,114,182,0.3)", bg:"rgba(244,114,182,0.05)",
      text:"Experiment with machine learning and intelligent systems to build solutions for real‑world problems." },
  ];

  return (
    <section ref={sec} className="ln" id="home">

      {/* ══ HERO — redesigned: centered, typography-first, portrait as atmosphere ══ */}
      <div className="ln-hero" ref={heroRef} id="hero">

        {/* Background portrait — atmospheric texture, not a featured image */}
        <div className="ln-portrait-wrap">
          <div className="ln-portrait-bg" ref={portraitRef}
            style={{ backgroundImage: "url('/images/avatar.png')" }} />
          <div className="ln-portrait-overlay" />
        </div>

        <div className="ln-hero-content">

          <p className="ln-intro-line">
            Hi, I'm <span className="ln-intro-accent">Srijita Biswas</span>
          </p>

          <h1 className="ln-main-heading">
            <span className="ln-heading-white">DEVELOPER &amp;</span>{" "}
            <span className="ln-heading-grad">DESIGNER</span>
          </h1>

          <p className="ln-tagline">
            Crafting elegant interfaces.<br />
            Engineering seamless experiences.
          </p>

          <p className="ln-description">
            I build modern web applications with a strong focus on performance,
            usability, and aesthetics—transforming ideas into polished digital products.
          </p>

          <div className="ln-actions">
            <a href="#work" className="ln-btn-fill ln-magnetic"
               onClick={(e) => { e.preventDefault(); goTo("#work"); }}>
              Explore My Work
            </a>
            <a href={resumeUrl} target="_blank" className="ln-btn-out ln-magnetic">
              View Resume
            </a>
          </div>

          <div className="ln-socials">
            <a href="https://github.com/srijitabiswas" target="_blank" rel="noreferrer" className="ln-social">GitHub</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/srijita-biswas-9690a3284" target="_blank" rel="noreferrer" className="ln-social">LinkedIn</a>
          </div>

        </div>
      </div>

      {/* ══ WHAT I DO ══ (unchanged) */}
      <div className="ln-what" id="what">
        <div className="ln-what-inner">
          <div className="ln-what-heading">
            <h2 className="ln-what-title">WHAT<br />I DO</h2>
          </div>
          <div className="ln-wid-cards">
            {CARDS.map((c) => (
              <div key={c.title} className="ln-wid-card"
                style={{ "--card-color":c.color, "--card-border":c.border, "--card-bg":c.bg } as React.CSSProperties}>
                <span className="ln-wid-icon">{c.icon}</span>
                <div>
                  <p className="ln-wid-title" style={{ color: c.color }}>{c.title}</p>
                  <p className="ln-wid-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ln { background:#000; color:#fff; }

        /* ══════════════ HERO — redesigned ══════════════ */
        .ln-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: calc(var(--nav-h) + 20px) 24px 40px;
          background: #000;
        }

        /* Background portrait — atmospheric texture */
        .ln-portrait-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .ln-portrait-bg {
          position: absolute;
          inset: -5%;
          background-size: cover;
          background-position: 72% 12%;
          background-repeat: no-repeat;
          transform: scale(1.08);
          opacity: 0.3;
          will-change: transform;
        }
        /* light fade at the very bottom only — the portrait itself should
           stay clearly visible, not buried under a heavy vignette */
        .ln-portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.85) 100%);
        }

        .ln-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transform: translateY(40px);
        }

        /* ── Intro line ── */
        .ln-intro-line {
          font-size: clamp(16px, 1.8vw, 26px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 18px;
        }
        .ln-intro-accent { color: #8b5cf6; font-weight: 700; }

        /* ── Main heading — dominant, single line on desktop ── */
        .ln-main-heading {
          width: 100%;
          font-size: clamp(32px, 6.2vw, 108px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 0.96;
          white-space: nowrap;
          margin: 0 0 30px;
        }
        .ln-heading-white {
          color: #fff;
          text-shadow: 0 0 50px rgba(139,92,246,0.22);
        }
        .ln-heading-grad {
          background: linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 55%, #6d28d9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 60px rgba(139,92,246,0.45);
        }

        /* ── Tagline ── */
        .ln-tagline {
          font-style: italic;
          font-weight: 500;
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.6;
          color: rgba(255,255,255,0.55);
          margin: 0 0 26px;
        }

        /* ── Description ── */
        .ln-description {
          max-width: 680px;
          margin: 0 0 40px;
          font-size: clamp(13.5px, 1.05vw, 16px);
          line-height: 1.85;
          color: #B3B3B3;
          font-weight: 300;
        }

        /* ── Buttons ── */
        .ln-actions { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin: 0 0 30px; }
        .ln-magnetic { transition: transform 0.2s cubic-bezier(.22,1,.36,1); }
        .ln-btn-fill,.ln-btn-out {
          display:inline-flex; align-items:center;
          padding:16px 32px; font-size:14px; font-weight:700;
          border-radius:10px; transition:background .25s, box-shadow .25s, border-color .25s;
          text-decoration:none; font-family:var(--font);
        }
        .ln-btn-fill { background:#8b5cf6; color:#fff; box-shadow:0 6px 28px rgba(139,92,246,.4); }
        .ln-btn-fill:hover { box-shadow:0 10px 34px rgba(139,92,246,.55); }
        .ln-btn-out  { background:rgba(255,255,255,.04); color:#fff; border:1.5px solid rgba(255,255,255,.3); }
        .ln-btn-out:hover { background:rgba(255,255,255,.1); }

        /* ── Social links — low opacity until hover ── */
        .ln-socials { display:flex; align-items:center; gap:10px; opacity:0.55; transition:opacity .3s; }
        .ln-socials:hover { opacity:1; }
        .ln-socials span { color:rgba(255,255,255,.25); }
        .ln-social { font-size:13px; font-weight:600; color:rgba(255,255,255,.7); transition:color .2s; text-decoration:none; }
        .ln-social:hover { color:#8b5cf6; }

        /* ══════════════ WHAT I DO (unchanged) ══════════════ */
        .ln-what {
          background: #000;
          padding: clamp(30px,5vw,50px) clamp(20px,5vw,60px) 80px;
          border-top: 1px solid rgba(255,255,255,.06);
          opacity: 1;
        }
        .ln-what-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 220px 1fr;
          gap: clamp(60px,8vw,120px); align-items: center;
        }
        .ln-what-heading { display:flex; align-items:center; }
        .ln-what-title {
          font-size: clamp(42px,6vw,80px);
          font-weight: 900; letter-spacing:-.04em; line-height:.92; color:#fff; margin:0;
        }
        .ln-wid-cards { display:flex; flex-direction:column; gap:20px; }
        .ln-wid-card {
          display:flex; align-items:flex-start; gap:18px;
          padding:24px 28px;
          background:var(--card-bg); border:1px solid var(--card-border);
          border-radius:16px;
          transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          cursor:default;
        }
        .ln-wid-card:hover {
          transform:translateX(8px);
          border-color:var(--card-color);
          box-shadow:0 0 32px rgba(139,92,246,0.1);
        }
        .ln-wid-icon  { font-size:28px; flex-shrink:0; margin-top:2px; }
        .ln-wid-title { font-size:16px; font-weight:800; margin-bottom:7px; letter-spacing:.01em; }
        .ln-wid-text  { font-size:14px; line-height:1.72; color:rgba(255,255,255,.44); font-weight:300; }

        /* ══════════════ RESPONSIVE ══════════════ */
        @media(max-width:900px) {
          .ln-main-heading { white-space: normal; font-size: clamp(34px, 9vw, 64px); }
          .ln-portrait-bg { opacity: 0.25; transform: scale(1.05) !important; }
          .ln-hero-content { padding: 0 20px; }
          .ln-description { max-width: 92%; }

          .ln-what { padding:60px 20px; }
          .ln-what-inner { grid-template-columns:1fr; gap:32px; }
          .ln-what-title { font-size:clamp(40px,11vw,64px); }
        }
        @media(max-width:560px) {
          .ln-main-heading { font-size: clamp(30px, 11vw, 46px); }
          .ln-actions { flex-direction: column; width: 100%; max-width: 320px; }
          .ln-btn-fill, .ln-btn-out { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}