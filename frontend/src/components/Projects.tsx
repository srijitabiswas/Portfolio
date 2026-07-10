import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function resolveAssetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${path}`;
}

type ProjectT = {
  id: string | number;
  num: string;
  title: string;
  cat: string;
  tags: string[];
  desc: string;
  path?: string;
  href?: string;
  img: string;
  icon: string;
  accent: string;
  filter: "UX" | "Dev" | "ML";
  type?: string;
};

/* Shown instantly on first render, and kept if the API is unreachable —
   the section never shows blank or breaks while the admin dashboard's
   data loads. Replaced the moment the API responds. */
const FALLBACK_PROJECTS: ProjectT[] = [
  {
    id: "mediflow", num: "01", title: "MediFlow", cat: "Full-Stack · AI Healthcare",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    desc: "AI-powered hospital queue & appointment system that predicts wait times in real time and tells patients exactly when to leave.",
    path: "/case/mediflow", img: "/images/mediflow.png", icon: "🏥", accent: "#22C55E", filter: "Dev",
  },
  {
    id: "glowai", num: "02", title: "Glow-AI", cat: "AI · Computer Vision · Marketplace",
    tags: ["React", "MediaPipe", "Groq LLM", "Tailwind"],
    desc: "AI beauty & salon marketplace with live facial-analysis scanning and an LLM concierge. Built in a 48-hour buildathon.",
    path: "/case/glowai", img: "/images/glowai.png", icon: "✨", accent: "#EC4899", filter: "ML",
  },
  {
    id: "savor", num: "03", title: "Savor", cat: "Full-Stack · Decision UX",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    desc: "Decision-first food ordering platform with a natural-language Crave Assistant and 1,100+ structured dish records.",
    path: "/case/savor", img: "/images/savor.png", icon: "🍽️", accent: "#D4712A", filter: "UX",
  },
];

/* Maps an API project document into the shape this component renders. */
function mapApiProject(p: any): ProjectT {
  return {
    id: p.slug,
    num: p.num,
    title: p.title,
    cat: p.category,
    tags: p.cardTags || [],
    desc: p.tagline,
    path: `/case/${p.slug}`,
    img: p.thumbnail || "",
    icon: p.icon || "🚀",
    accent: p.accent || "#8b5cf6",
    filter: p.filter,
    type: p.type || "",
  };
}

type Filter = "All" | "UX" | "Dev" | "ML" | "Hackathon" | "Academic" | "Personal" | "Work" ;
 
/* Each filter button defines its own match rule — UX/Dev/ML check the
   project's `filter` field, while Hackathon/Academic/Personal check its
   `type` field instead. Add a new button here any time you need another
   grouping; nothing else needs to change. */
const FILTER_MATCHERS: Record<Filter, (p: ProjectT) => boolean> = {
  All:       () => true,
  UX:        (p) => p.filter === "UX",
  Dev:       (p) => p.filter === "Dev",
  ML:        (p) => p.filter === "ML",
  Hackathon: (p) => p.type === "Hackathon",
  Academic:  (p) => p.type === "Academic",
  Personal:  (p) => p.type === "Personal Project",
  Work:      (p) => p.type === "Work",
};
const FILTERS: Filter[] = ["All", "Hackathon", "Academic", "Personal", "Work"];


/* ── Single project card with 3D mouse-tilt + glare ── */
function ProjectCard({ p, onOpen }: { p: ProjectT; onOpen: (p: ProjectT) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rx = (py - 0.5) * -3.5;
    const ry = (px - 0.5) * 3.5;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={cardRef}
      className="pj-card"
      style={{ "--pa": p.accent } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(p)}
    >
      <div className="pj-card-glare" />
      <div className="pj-card-img">
        {imgOk && p.img ? (
          <img src={p.img} alt={p.title} onError={() => setImgOk(false)} />
        ) : (
          <div className="pj-card-fallback">
            <span>{p.icon}</span>
          </div>
        )}
        {p.href && !p.path && <span className="pj-live-badge">Live ↗</span>}
      </div>
      <div className="pj-card-body">
        <div className="pj-card-top">
          <p className="pj-card-cat">{p.cat}</p>
          <button className="pj-arr" onClick={(e) => { e.stopPropagation(); onOpen(p); }}>↗</button>
        </div>
        <h3 className="pj-card-title">{p.title}</h3>
        <p className="pj-card-desc">{p.desc}</p>
        <div className="pj-tags">
          {p.tags.map((t) => <span key={t} className="pj-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<ProjectT[]>(FALLBACK_PROJECTS);
  console.log(projects.length);
  const navigate = useNavigate();

  /* Pull live, admin-managed project data — numbers, dates, content,
     everything — instead of a hardcoded array. */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setProjects(data.map(mapApiProject));
        }
      } catch {
        // Keep FALLBACK_PROJECTS already shown.
      }
    })();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".pj-head > *", { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.from(".pj-head > *", {
        y: 28, opacity: 0, filter: "blur(6px)", stagger: .1, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-head", start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cardTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardTriggerRef.current?.kill();

    if (reduceMotion) {
      gsap.set(".pj-card", { y: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }
    const tween = gsap.fromTo(".pj-card",
      { y: 36, opacity: 0, filter: "blur(6px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-grid", start: "top 88%", once: true },
      }
    );
    cardTriggerRef.current = tween.scrollTrigger ?? null;
  }, [active, projects, showAll]);

 const filtered = projects.filter(FILTER_MATCHERS[active]);
  const VISIBLE_COUNT = 3;
  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT);

 const openProject = (p: ProjectT) => {
  if (p.path) {
    sessionStorage.setItem("homeScrollY", String(window.scrollY));
    navigate(p.path);
  }
  else if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
};

  return (
    <section ref={ref} className="pj" id="projects">
      <div className="pj-inner">

        <div className="pj-head">
          <p className="pj-eye"><span>Selected Work</span></p>
          <h2 className="pj-h2">PROJECTS THAT<br /><em>DEFINE ME</em></h2>
          <div className="pj-filters">
            {FILTERS.map(f => (
              <button key={f} className={`pj-filter ${active === f ? "pj-filter-on" : ""}`}
                onClick={() => { setActive(f); setShowAll(false); }}>{f}</button>
            ))}
          </div>
        </div>

        <div className="pj-grid">
          {visible.map(p => (
            <ProjectCard key={p.id} p={p} onOpen={openProject} />
          ))}
        </div>

        {filtered.length > VISIBLE_COUNT && (
          <button className="pj-view-all-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <style>{`
        .pj { padding:clamp(80px,10vw,130px) clamp(20px,5vw,60px); background:var(--bg); }
        .pj-inner { max-width: 1280px; margin: 0 auto; }

        .pj-head { margin-bottom:56px; text-align:center; }
        .pj-eye {
          font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
          color:rgba(var(--text-rgb),0.35); margin-bottom:24px;
          display:flex; align-items:center; justify-content:center; gap:16px;
        }
        .pj-eye::before, .pj-eye::after { content:''; height:1px; width:80px; background:rgba(var(--text-rgb),0.15); }
        .pj-h2   {
          font-size:clamp(24px,3.4vw,40px); font-weight:900; letter-spacing:-.03em; line-height:1.1;
          margin-bottom:24px; color:var(--text); text-align:left;
        }
        .pj-h2 em { color:#8b5cf6; font-style:normal; }

        .pj-filters { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-start; }
        .pj-filter {
          padding:9px 22px; border-radius:99px; font-size:13px; font-weight:600; letter-spacing:.03em;
          border:1.5px solid rgba(var(--text-rgb),0.15); color:rgba(var(--text-rgb),0.55); background:transparent;
          transition:all .2s; cursor:pointer;
        }
        .pj-filter:hover { border-color:#8b5cf6; color:var(--text); }
        .pj-filter-on { background:#8b5cf6; border-color:#8b5cf6; color:#fff; }

        .pj-view-all-btn {
  display: block;
  margin: 36px auto 0;
  background: none;
  border: none;
  padding: 0;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: .02em;
  color: rgba(var(--text-rgb),.55);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color .2s;
}
.pj-view-all-btn:hover {
  color: #8b5cf6;
}

        .pj-grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:32px 28px;
          max-width: 1080px;
          margin: 0 auto;
        }

        .pj-card {
          position: relative;
          background:var(--bg-elevated);
          border-radius:18px;
          overflow:hidden;
          border:1px solid rgba(var(--text-rgb),0.12);
          cursor: pointer;
          transform-style: preserve-3d;
          transform:
            perspective(1000px)
            rotateX(var(--rx, 0deg))
            rotateY(var(--ry, 0deg))
            translateY(0);
          transition: transform .25s cubic-bezier(.22,1,.36,1), border-color .25s, box-shadow .25s;
          will-change: transform;
        }
        .pj-card:hover {
          box-shadow:0 30px 70px rgba(0,0,0,.5);
          border-color: var(--pa, #8b5cf6);
        }

        .pj-card-glare {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0) 55%
          );
          transition: opacity .3s ease;
        }
        .pj-card:hover .pj-card-glare { opacity: 1; }

        .pj-card-img {
          width:100%;
          height:150px;
          overflow:hidden;
          position:relative;
          background:var(--bg-elevated);
        }
        .pj-card-img img {
          width:100%; height:100%; object-fit:cover; object-position:top; display:block;
          transition:transform .5s ease;
        }
        .pj-card:hover .pj-card-img img { transform:scale(1.06); }

        .pj-card-fallback {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, var(--pa, #8b5cf6) 0%, #0a0a0a 130%);
        }
        .pj-card-fallback span { font-size:30px; filter: drop-shadow(0 4px 14px rgba(0,0,0,.4)); }

        .pj-live-badge {
          position:absolute; top:12px; right:12px;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(6px);
          border:1px solid var(--pa, #8b5cf6);
          color:#fff; font-size:10.5px; font-weight:700; letter-spacing:.04em;
          padding:5px 11px; border-radius:99px;
        }

        .pj-card-body { padding:22px 22px 24px; position:relative; z-index:2; }
        .pj-card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .pj-card-cat  { font-size:9.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color: var(--pa, #8b5cf6); }
        .pj-arr {
          width:28px; height:28px; border-radius:50%; border:1.5px solid var(--pa, rgba(var(--text-rgb),0.2));
          display:flex; align-items:center; justify-content:center; font-size:11px; color:var(--text); flex-shrink:0;
          transition:all .2s; background:none; cursor:pointer;
        }
        .pj-arr:hover { background:var(--pa, #8b5cf6); border-color:var(--pa, #8b5cf6); }
        .pj-card-title { font-size:16px; font-weight:800; letter-spacing:-.01em; color:var(--text); margin-bottom:10px; }
        .pj-card-desc {
          font-size:12.5px;
          line-height:1.7;
          color:rgba(var(--text-rgb),0.65);
          margin-bottom:18px;
          font-weight:400;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pj-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .pj-tag {
          padding:4px 11px;
          border-radius:99px;
          font-size:10px;
          font-weight:600;
          background:rgba(var(--text-rgb),0.07);
          border:1px solid rgba(var(--text-rgb),0.14);
          color:var(--text);
        }

        @media(max-width:1100px) {
          .pj-grid { grid-template-columns:repeat(2,minmax(0,1fr)); max-width: 720px; }
        }
        @media(max-width:640px) {
          .pj-grid { grid-template-columns:1fr; max-width: 420px; gap: 24px; }
          .pj-card { transform: none !important; }
          .pj-card-glare { display:none; }
        }
      `}</style>
    </section>
  );
}