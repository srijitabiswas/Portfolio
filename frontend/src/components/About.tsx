import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "05+",  label: "Certifications" },
  { value: "05+",  label: "Projects" },
  { value: "8.47", label: "CGPA" },
  { value: "2+",   label: "Hackathons" },
];

const EXPERIENCE = [
  {
    role: "Product Design Trainee",
    company: "Employability.life",
    date: "Dec 2025 – Jan 2026",
    points: [
      "Led user research, wireframing, prototyping, and UI design across product cycles.",
      "Applied product-thinking frameworks to shape design decisions from concept to delivery.",
    ],
  },
  {
    role: "Social Media Manager",
    company: "Aperture Alchemist · Student Club",
    date: "Apr 2025 – Present",
    points: [
      "Planned and managed Instagram content strategy for community engagement and event promotion.",
      "Drove brand identity initiatives and grew community reach through visual storytelling.",
    ],
  },
];

const About = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ab-left > *", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".ab-left", start: "top 80%" },
      });
      gsap.from(".ab-photo-card", {
        scale: 0.9, opacity: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".ab-photo-card", start: "top 82%" },
      });
      gsap.from(".ab-exp-card", {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: ".ab-exp-list", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ab" id="about">
      <div className="ab-top">

        {/* LEFT */}
        <div className="ab-left">
          <h1 className="ab-h1">
            <span className="ab-h1-white">WHERE LOGIC</span>
            <span className="ab-h1-violet">MEETS CREATIVITY</span>
          </h1>

          <p className="ab-bio">
            I’m a developer and designer passionate about creating modern digital experiences. I bridge design and development to deliver scalable, user-centric applications with an emphasis on quality, usability, and performance.
          </p>
          <p className="ab-bio">
            My work includes responsive web applications, backend systems, and AI-powered solutions, solving real-world problems through thoughtful design and reliable technology.
          </p>

          <p className="ab-quote">&ldquo;Good products are built where logic meets creativity.&rdquo;</p>

          <div className="ab-stats">
            {STATS.map(s => (
              <div key={s.label} className="ab-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="ab-cta">
            Let's work together <span>→</span>
          </a>
        </div>

        {/* RIGHT — photo */}
        <div className="ab-right">
          <div className="ab-photo-card">
            <img src="/images/photo.jpeg" alt="Srijita Biswas" className="ab-photo-img" />
            <div className="ab-photo-badge">
              <span className="ab-status-dot" />
              Available for opportunities
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="ab-exp" id="work">
        <h2 className="ab-exp-h2">EXPERIENCE</h2>
        <div className="ab-exp-list">
          {EXPERIENCE.map(e => (
            <div key={e.role} className="ab-exp-card">
              <div className="ab-exp-top">
                <div>
                  <p className="ab-exp-role">{e.role}</p>
                  <p className="ab-exp-company">{e.company}</p>
                </div>
                <p className="ab-exp-date">{e.date}</p>
              </div>
              <ul className="ab-exp-points">
                {e.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ab { background: var(--bg); color: var(--text); padding: clamp(80px,10vw,130px) clamp(20px,5vw,64px) clamp(60px,8vw,100px); }

        .ab-top {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1.25fr 0.75fr;
          gap: clamp(40px,6vw,90px);
          align-items: center;
          margin-bottom: clamp(70px,9vw,120px);
        }

        .ab-h1 {
          display: flex; flex-direction: column;
          font-size: clamp(34px,5vw,64px);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1.04;
          margin-bottom: 26px;
        }
        .ab-h1-white {
          color: var(--text);
          text-shadow: 1.5px 0 rgba(110,231,255,0.5), -1.5px 0 rgba(244,114,182,0.4);
        }
        .ab-h1-violet {
          color: #8b5cf6;
          text-shadow: 1.5px 0 rgba(110,231,255,0.35), -1.5px 0 rgba(244,114,182,0.3);
        }

        .ab-bio {
          font-size: clamp(14px,1.3vw,16px);
          line-height: 1.8;
          color: rgba(var(--text-rgb),0.55);
          max-width: 560px;
          font-weight: 300;
          margin-bottom: 16px;
        }

        .ab-quote {
          font-size: 14px;
          font-style: italic;
          color: rgba(var(--text-rgb),0.38);
          margin: 14px 0 30px;
        }

        .ab-stats {
          display: flex;
          gap: clamp(24px,4vw,48px);
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .ab-stat { display: flex; flex-direction: column; gap: 4px; }
        .ab-stat strong {
          font-size: clamp(26px,3vw,34px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .ab-stat span {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(var(--text-rgb),0.4);
        }

        .ab-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #8b5cf6;
          border-bottom: 1.5px solid #8b5cf6;
          padding-bottom: 2px;
          transition: gap 0.2s ease;
        }
        .ab-cta:hover { gap: 14px; }

        /* photo */
        .ab-photo-card { position: relative; }
        .ab-photo-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          object-position: top;
          border-radius: 20px;
          border: 1px solid rgba(var(--text-rgb),0.1);
          box-shadow: 0 30px 70px rgba(139,92,246,0.18);
          display: block;
        }
        .ab-photo-badge {
          position: absolute;
          bottom: 16px; left: 16px; right: 16px;
          background: rgba(10,10,14,0.82);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 11px 16px;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
        }
        .ab-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.6);
          animation: abPulse 2s ease infinite;
        }
        @keyframes abPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        /* experience */
        .ab-exp { max-width: 1280px; margin: 0 auto; }
        .ab-exp-h2 {
          font-size: clamp(32px,4.5vw,54px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--text);
          text-shadow: 1.5px 0 rgba(110,231,255,0.4), -1.5px 0 rgba(244,114,182,0.3);
          margin-bottom: 32px;
        }
        .ab-exp-list { display: flex; flex-direction: column; gap: 16px; }
        .ab-exp-card {
          background: var(--bg-elevated);
          border: 1px solid rgba(var(--text-rgb),0.08);
          border-radius: 16px;
          padding: 26px 30px;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .ab-exp-card:hover {
          border-color: rgba(139,92,246,0.4);
          transform: translateY(-2px);
        }
        .ab-exp-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .ab-exp-role { font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .ab-exp-company { font-size: 13px; font-weight: 600; color: #8b5cf6; }
        .ab-exp-date { font-size: 12px; color: rgba(var(--text-rgb),0.4); font-weight: 500; white-space: nowrap; }
        .ab-exp-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ab-exp-points li {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(var(--text-rgb),0.5);
          font-weight: 300;
          padding-left: 18px;
          position: relative;
        }
        .ab-exp-points li::before {
          content: '';
          position: absolute;
          left: 0; top: 8px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #8b5cf6;
        }

        @media (max-width: 900px) {
          .ab-top { grid-template-columns: 1fr; gap: 40px; }
          .ab-right { order: -1; max-width: 320px; margin: 0 auto; }
          .ab-stats { gap: 24px; }
        }
      `}</style>
    </section>
  );
};

export default About;