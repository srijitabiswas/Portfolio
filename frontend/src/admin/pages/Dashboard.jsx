import { useEffect, useState } from "react";
import { api } from "../api";
import "../admin.css";

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [projects, certs, exp, skills] = await Promise.all([
          api.get("/projects/admin/all"),
          api.get("/certifications/admin/all"),
          api.get("/experience/admin/all"),
          api.get("/skills/admin/all"),
        ]);
        setCounts({
          projects: projects.length,
          published: projects.filter((p) => p.published).length,
          certs: certs.length,
          exp: exp.length,
          skills: skills.length,
        });
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  return (
    <div>
      <div className="adm-pagehead">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your portfolio content</p>
        </div>
      </div>

      {error && <div className="adm-error-banner">{error}</div>}

      {!counts && !error && <div className="adm-loading">Loading…</div>}

      {counts && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[
            { label: "Total Projects", value: counts.projects },
            { label: "Published Projects", value: counts.published },
            { label: "Certifications", value: counts.certs },
            { label: "Experience Entries", value: counts.exp },
            { label: "Skills", value: counts.skills },
          ].map((c) => (
            <div key={c.label} className="adm-table-wrap" style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{c.value}</div>
              <div style={{ fontSize: 12.5, color: "var(--adm-muted)", marginTop: 4 }}>{c.label}</div>
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: 28, fontSize: 13, color: "var(--adm-muted)" }}>
        Use the sidebar to manage each section. Project numbering (01, 02…) is calculated
        automatically from each project's dates — newest first. There's nothing to set manually.
      </p>
    </div>
  );
}
