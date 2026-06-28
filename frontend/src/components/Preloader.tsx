import { useEffect, useRef } from "react";

interface Props { done: boolean; }

const Preloader = ({ done }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done && ref.current) {
      ref.current.classList.add("preloader--out");
      const t = setTimeout(() => {
        if (ref.current) ref.current.style.display = "none";
      }, 900);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <div ref={ref} className="preloader">
      <div className="preloader__inner">
        <div className="preloader__name">
          <span className="preloader__s">S</span>
          <span className="preloader__rest">RIJITA</span>
        </div>
        <div className="preloader__bar">
          <div className="preloader__fill" />
        </div>
        <p className="preloader__sub">UI·UX Designer &amp; Developer</p>
      </div>

      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .preloader--out {
          opacity: 0;
          transform: translateY(-8px);
        }
        .preloader__inner {
          text-align: center;
        }
        .preloader__name {
          font-size: clamp(64px, 12vw, 160px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--white);
          margin-bottom: 28px;
          overflow: hidden;
        }
        .preloader__s {
          color: var(--accent);
          display: inline-block;
          animation: preloaderS 0.6s cubic-bezier(.16,1,.3,1) 0.1s both;
        }
        .preloader__rest {
          display: inline-block;
          animation: preloaderRest 0.7s cubic-bezier(.16,1,.3,1) 0.2s both;
        }
        @keyframes preloaderS {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: none; }
        }
        @keyframes preloaderRest {
          from { opacity:0; transform: translateX(20px); }
          to   { opacity:1; transform: none; }
        }
        .preloader__bar {
          width: 240px;
          height: 2px;
          background: rgba(255,255,255,0.12);
          border-radius: 99px;
          margin: 0 auto 16px;
          overflow: hidden;
        }
        .preloader__fill {
          height: 100%;
          width: 0%;
          background: var(--accent);
          border-radius: 99px;
          animation: fillBar 2.2s cubic-bezier(.4,0,.2,1) 0.3s forwards;
        }
        @keyframes fillBar {
          to { width: 100%; }
        }
        .preloader__sub {
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          animation: fadeUp 0.6s ease 0.5s both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;