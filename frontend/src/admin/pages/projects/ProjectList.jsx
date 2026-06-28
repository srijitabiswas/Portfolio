import { useEffect, useState } from "react";
import { api } from "../../api";
import ProjectForm from "./ProjectForm";
import "../../admin.css";

function formatRange(p) {
  if (p.displayDate) return p.displayDate; // not present on admin list endpoint, kept for safety
  return p.displayLabel || "—";
}

export default function ProjectList() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);   // project object or null
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      const data = await api.get("/projects/admin/all");
      setProjects(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (p) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await api.delete(`/projects/admin/${p._id}`);
    load();
  };

  const onTogglePublish = async (p) => {
    await api.patch(`/projects/admin/${p._id}/publish`);
    load();
  };

  const closeForm = (didSave) => {
    setEditing(null);
    setCreating(false);
    if (didSave) load();
  };

  return (
    <div>
      <div className="adm-pagehead">
        <div>
          <h1>Projects</h1>
          <p>Numbers are computed automatically from each project's dates — newest first.</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setCreating(true)}>+ Add Project</button>
      </div>

      {error && <div className="adm-error-banner">{error}</div>}
      {!projects && !error && <div className="adm-loading">Loading…</div>}

      {projects && (
        <div className="adm-table-wrap">
          {projects.length === 0 ? (
            <div className="adm-empty">No projects yet. Click "Add Project" to create one.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td><span className="adm-num-badge">{p.num}</span></td>
                    <td style={{ fontWeight: 700 }}>{p.title}</td>
                    <td style={{ color: "var(--adm-muted)" }}>{p.category}</td>
                    <td style={{ color: "var(--adm-muted)" }}>{formatRange(p)}</td>
                    <td>
                      <span className={`adm-badge ${p.published ? "adm-badge-live" : "adm-badge-draft"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => onTogglePublish(p)}>
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditing(p)}>Edit</button>
                        <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => onDelete(p)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {(editing || creating) && (
        <ProjectForm project={editing} onClose={closeForm} />
      )}
    </div>
  );
}
