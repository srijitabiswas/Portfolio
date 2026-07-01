import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../admin.css";

const LINKS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/hackathons", label: "Hackathons" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/exploring", label: "Currently Exploring" },
  { to: "/admin/social-links", label: "Social Links" },
  { to: "/admin/resume", label: "Resume" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-logo">Personal<span> </span>Dashboard</div>

        <a href="/" target="_blank" rel="noreferrer" className="adm-view-site">
          View Live Portfolio ↗
        </a>

        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `adm-nav-link${isActive ? " active" : ""}`}
          >
            {l.label}
          </NavLink>
        ))}
        <div className="adm-nav-bottom">
          <button className="adm-btn adm-btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={onLogout}>
            Log Out
          </button>
        </div>
      </aside>
      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
}