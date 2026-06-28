import { useEffect, useRef } from "react";

const Cursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    // Scale ring on hover
    const hoverEls = document.querySelectorAll("a, button, [data-cursor]");
    const grow  = () => ring.classList.add("cursor-ring--grow");
    const shrink = () => ring.classList.remove("cursor-ring--grow");

    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      hoverEls.forEach(el => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          border-radius: 50%;
        }
        .cursor-dot {
          width: 8px; height: 8px;
          background: var(--accent);
          margin-left: -4px;
          margin-top: -4px;
        }
        .cursor-ring {
          width: 38px; height: 38px;
          border: 1.5px solid var(--accent);
          margin-left: -19px;
          margin-top: -19px;
          transition: width 0.25s ease, height 0.25s ease,
                      margin 0.25s ease, border-color 0.25s ease;
        }
        .cursor-ring--grow {
          width: 58px; height: 58px;
          margin-left: -29px;
          margin-top: -29px;
          border-color: rgba(46,95,232,0.4);
        }
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
};

export default Cursor;