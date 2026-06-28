import { useEffect, useState } from "react";
import { api } from "../api";
import "../admin.css";

export default function ResumeManager() {
  const [resumes, setResumes] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const data = await api.get("/resume/admin/all");
      setResumes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await api.upload("/resume/admin/upload", file);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onDelete = async (r) => {
    if (!confirm("Delete this resume file?")) return;
    await api.delete(`/resume/admin/${r._id}`);
    load();
  };

  return (
    <div>
      <div className="adm-pagehead">
        <div>
          <h1>Resume</h1>
          <p>The public "View Resume" button always points to the most recently uploaded file.</p>
        </div>
      </div>

      {error && <div className="adm-error-banner">{error}</div>}

      <div className="adm-table-wrap" style={{ padding: 22, marginBottom: 24 }}>
        <label className="adm-btn adm-btn-primary" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading…" : "Upload New Resume (PDF)"}
          <input type="file" accept="application/pdf" onChange={onUpload} disabled={uploading} style={{ display: "none" }} />
        </label>
      </div>

      {!resumes && !error && <div className="adm-loading">Loading…</div>}

      {resumes && (
        <div className="adm-table-wrap">
          {resumes.length === 0 ? (
            <div className="adm-empty">No resume uploaded yet.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr><th>File</th><th>Uploaded</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {resumes.map((r) => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 700 }}>
                      <a href={r.fileUrl} target="_blank" rel="noreferrer" style={{ color: "var(--adm-accent)" }}>{r.fileName}</a>
                    </td>
                    <td style={{ color: "var(--adm-muted)" }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`adm-badge ${r.active ? "adm-badge-live" : "adm-badge-draft"}`}>
                        {r.active ? "Active" : "Replaced"}
                      </span>
                    </td>
                    <td>
                      <div className="adm-table-actions">
                        <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => onDelete(r)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
