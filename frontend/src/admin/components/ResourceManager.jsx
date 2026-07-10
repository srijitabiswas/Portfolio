import { useEffect, useState } from "react";
import { api } from "../api";
import "../admin.css";

function fmtCell(val, type) {
  if (val == null || val === "") return "—";
  if (type === "date") return new Date(val).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
}

function FormField({ field, value, onChange }) {
  const v = value ?? (field.type === "array" || field.type === "lines" ? [] : "");

  if (field.type === "textarea") {
    return <textarea className="adm-textarea" required={field.required} value={v} onChange={(e) => onChange(e.target.value)} />;
  }
  if (field.type === "date") {
    return <input className="adm-input" type="date" required={field.required}
      value={v ? String(v).slice(0, 10) : ""} onChange={(e) => onChange(e.target.value)} />;
  }
  if (field.type === "number") {
    return <input className="adm-input" type="number" required={field.required} value={v}
      onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
  }
  if (field.type === "checkbox") {
    return <input type="checkbox" checked={!!v} onChange={(e) => onChange(e.target.checked)} />;
  }
  if (field.type === "select") {
    return (
      <select className="adm-select" value={v} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => <option key={o} value={o}>{o || "— none —"}</option>)}
      </select>
    );
  }
  if (field.type === "array") {
    return (
      <input className="adm-input" placeholder="Comma-separated"
        value={Array.isArray(v) ? v.join(", ") : ""}
        onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
    );
  }
  if (field.type === "lines") {
    // One full point per line becomes one bullet — unlike "array" (comma-split),
    // this doesn't break a sentence apart at every comma inside it.
    return (
      <textarea
        className="adm-textarea"
        placeholder="One point per line"
        value={Array.isArray(v) ? v.join("\n") : ""}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
      />
    );
  }
  if (field.type === "file") {
    return <ImageField value={v} onChange={onChange} />;
  }
  return <input className="adm-input" type="text" required={field.required} value={v} onChange={(e) => onChange(e.target.value)} />;
}

function ImageField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.upload("/upload", file);
      onChange(url);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <input className="adm-input" type="file" accept="image/*,application/pdf" onChange={onPick} />
      {uploading && <div className="adm-hint">Uploading…</div>}
      {value && <div className="adm-hint" style={{ marginTop: 6 }}>{value}</div>}
    </div>
  );
}

export default function ResourceManager({ config }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // {} for new, object for edit, null for closed
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await api.get(`${config.endpoint}/admin/all`);
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, [config.endpoint]);

  const onDelete = async (item) => {
    if (!confirm(`Delete this entry?`)) return;
    await api.delete(`${config.endpoint}/admin/${item._id}`);
    load();
  };

  const onTogglePublish = async (item) => {
    await api.patch(`${config.endpoint}/admin/${item._id}/publish`);
    load();
  };

  const openNew = () => {
    const blank = {};
    config.fields.forEach((f) => { blank[f.key] = (f.type === "array" || f.type === "lines") ? [] : f.type === "checkbox" ? true : ""; });
    setEditing(blank);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editing._id) {
        await api.put(`${config.endpoint}/admin/${editing._id}`, editing);
      } else {
        await api.post(`${config.endpoint}/admin`, editing);
      }
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="adm-pagehead">
        <div>
          <h1>{config.title}</h1>
          {config.subtitle && <p>{config.subtitle}</p>}
        </div>
        <button className="adm-btn adm-btn-primary" onClick={openNew}>+ Add {config.singular}</button>
      </div>

      {error && !editing && <div className="adm-error-banner">{error}</div>}
      {!items && !error && <div className="adm-loading">Loading…</div>}

      {items && (
        <div className="adm-table-wrap">
          {items.length === 0 ? (
            <div className="adm-empty">Nothing here yet. Click "Add {config.singular}" to create one.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  {config.columns.map((c) => <th key={c.key}>{c.label}</th>)}
                  {config.hasPublish && <th>Status</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    {config.columns.map((c) => (
                      <td key={c.key} style={c.key === config.columns[0].key ? { fontWeight: 700 } : { color: "var(--adm-muted)" }}>
                        {fmtCell(item[c.key], c.type)}
                      </td>
                    ))}
                    {config.hasPublish && (
                      <td>
                        <span className={`adm-badge ${item.published ? "adm-badge-live" : "adm-badge-draft"}`}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                      </td>
                    )}
                    <td>
                      <div className="adm-table-actions">
                        {config.hasPublish && (
                          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => onTogglePublish(item)}>
                            {item.published ? "Unpublish" : "Publish"}
                          </button>
                        )}
                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditing(item)}>Edit</button>
                        <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => onDelete(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {editing && (
        <div className="adm-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditing(null); }}>
          <form className="adm-modal" onSubmit={onSubmit}>
            <div className="adm-modal-head">
              <h2>{editing._id ? `Edit ${config.singular}` : `Add ${config.singular}`}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditing(null)}>✕</button>
            </div>

            {error && <div className="adm-error-banner">{error}</div>}

            {config.fields.map((f) => (
              <div className="adm-field" key={f.key}>
                <label>{f.label}</label>
                <FormField
                  field={f}
                  value={editing[f.key]}
                  onChange={(val) => setEditing((prev) => ({ ...prev, [f.key]: val }))}
                />
                {f.hint && <div className="adm-hint">{f.hint}</div>}
              </div>
            ))}

            <div className="adm-modal-actions">
              <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}