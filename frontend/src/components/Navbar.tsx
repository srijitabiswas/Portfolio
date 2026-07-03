import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

const links = [
  { label: "About",    href: "#about"    },
  { label: "Work",     href: "#work"     },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    // system → light → dark → system …
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const themeIcon = theme === "system" ? "💻" : resolvedTheme === "dark" ? "🌙" : "☀️";
  const themeLabel = theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav ref={navRef} className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#" className="nav__logo" aria-label="Home">
          Srijita
        </a>

        {/* Desktop links */}
        <ul className="nav__links">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={e => { e.preventDefault(); handleLink(l.href); }}
                 className="nav__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <button
            className="nav__theme-toggle"
            onClick={cycleTheme}
            aria-label={`Theme: ${themeLabel}. Click to change.`}
            title={`Theme: ${themeLabel}`}
          >
            <span>{themeIcon}</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}
                 onClick={e => { e.preventDefault(); handleLink(l.href); }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button className="mobile-theme-toggle" onClick={cycleTheme}>
              {themeIcon} {themeLabel} Mode
            </button>
          </li>
        </ul>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 64px);
          z-index: 500;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }
        .nav::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #c084fc, #8b5cf6);
          opacity: 0.9;
        }
        .nav--scrolled {
          background: var(--bg);
          opacity: 0.97;
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .nav__logo {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .nav__links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav__link {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-50);
          position: relative;
          transition: color 0.2s;
        }
        .nav__link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        .nav__link:hover { color: var(--text); }
        .nav__link:hover::after { width: 100%; }

        .nav__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Theme toggle ── */
        .nav__theme-toggle {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--bg-card);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav__theme-toggle:hover { border-color: var(--accent); transform: rotate(15deg); }
        .mobile-theme-toggle {
          background: none; border: none;
          font-size: 22px; font-weight: 700;
          color: var(--text); cursor: pointer;
          letter-spacing: -0.01em;
        }
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 4px;
        }
        .nav__burger span {
          display: block;
          width: 24px; height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nav__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav__burger--open span:nth-child(2) { opacity: 0; }
        .nav__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--bg);
          z-index: 490;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mobile-menu--open {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu ul {
          list-style: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .mobile-menu ul a {
          font-size: clamp(32px, 8vw, 56px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          transition: color 0.2s;
        }
        .mobile-menu ul a:hover { color: var(--accent); }

        @media (max-width: 860px) {
          .nav__links, .nav__actions { display: none; }
          .nav__burger { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;