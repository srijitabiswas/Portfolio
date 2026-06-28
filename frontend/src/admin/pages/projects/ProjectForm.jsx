import { useState } from "react";
import { api, API_URL } from "../../api";
import "../../admin.css";

const emptyProject = {
  title: "", slug: "", category: "", tagline: "", thumbnail: "", accent: "#8B5CF6", icon: "🚀",
  startDate: "", endDate: "", datePrecision: "month", type: "", displayLabel: "",
  cardTags: [], filter: "Dev", links: [], published: true,
  caseStudy: {
    subtitle: "", tags: [], color: "#1A1A1A", overview: "", problem: "", solution: "",
    sections: [], techStack: [], team: [],
  },
};

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ── small reusable array-of-strings editor (comma-style add) ── */
function StringListField({ label, values, onChange, placeholder, hint }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    onChange([...values, draft.trim()]);
    setDraft("");
  };
  return (
    <div className="adm-field">
      <label>{label}</label>
      <div className="adm-array-row">
        <input
          className="adm-input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
        />
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={add}>Add</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        {values.map((v, i) => (
          <span key={i} className="adm-badge adm-badge-draft" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {v}
            <button type="button" onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 12 }}>✕</button>
          </span>
        ))}
      </div>
      {hint && <div className="adm-hint">{hint}</div>}
    </div>
  );
}

/* ── links array editor {label, href, icon} ── */
function LinksField({ links, onChange }) {
  const update = (i, key, val) => {
    const next = [...links];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  return (
    <div className="adm-field">
      <label>External Links</label>
      {links.map((l, i) => (
        <div className="adm-array-row" key={i}>
          <div className="adm-row" style={{ flex: 1 }}>
            <input className="adm-input" placeholder="Label (Live Demo)" value={l.label}
              onChange={(e) => update(i, "label", e.target.value)} />
            <input className="adm-input" placeholder="https://…" value={l.href}
              onChange={(e) => update(i, "href", e.target.value)} />
            <input className="adm-input" style={{ maxWidth: 60 }} placeholder="🌐" value={l.icon}
              onChange={(e) => update(i, "icon", e.target.value)} />
          </div>
          <button type="button" className="adm-array-remove" onClick={() => onChange(links.filter((_, idx) => idx !== i))}>✕</button>
        </div>
      ))}
      <button type="button" className="adm-add-row-btn" onClick={() => onChange([...links, { label: "", href: "", icon: "🌐" }])}>
        + Add Link
      </button>
    </div>
  );
}

/* ── sections array editor {title, body} — body as multiline textarea, one bullet per line ── */
function SectionsField({ sections, onChange }) {
  const update = (i, key, val) => {
    const next = [...sections];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  return (
    <div className="adm-field">
      <label>Sections (Key Features, Core Innovation, User Flow, Future Scope, etc.)</label>
      {sections.map((s, i) => (
        <div key={i} style={{ border: "1px solid var(--adm-border)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div className="adm-array-row">
            <input className="adm-input" placeholder="Section title (e.g. Key Features)" value={s.title}
              onChange={(e) => update(i, "title", e.target.value)} />
            <button type="button" className="adm-array-remove" onClick={() => onChange(sections.filter((_, idx) => idx !== i))}>✕</button>
          </div>
          <textarea
            className="adm-textarea"
            placeholder="One point per line — multiple lines become a bulleted list. A single line stays as a paragraph."
            value={Array.isArray(s.body) ? s.body.join("\n") : (s.body || "")}
            onChange={(e) => {
              const lines = e.target.value.split("\n");
              const body = lines.length > 1 ? lines.filter((l) => l.trim() !== "") : e.target.value;
              update(i, "body", body);
            }}
          />
        </div>
      ))}
      <button type="button" className="adm-add-row-btn" onClick={() => onChange([...sections, { title: "", body: "" }])}>
        + Add Section
      </button>
    </div>
  );
}

/* ── tech stack groups {label, items[]} ── */
function TechStackField({ techStack, onChange }) {
  const update = (i, key, val) => {
    const next = [...techStack];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  return (
    <div className="adm-field">
      <label>Tech Stack (Frontend / Backend / Additional / Deployment)</label>
      {techStack.map((g, i) => (
        <div className="adm-array-row" key={i}>
          <div className="adm-row" style={{ flex: 1 }}>
            <input className="adm-input" placeholder="Group label (e.g. Backend)" value={g.label}
              onChange={(e) => update(i, "label", e.target.value)} />
            <input className="adm-input" placeholder="Comma-separated: Node.js, Express, MongoDB"
              value={(g.items || []).join(", ")}
              onChange={(e) => update(i, "items", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </div>
          <button type="button" className="adm-array-remove" onClick={() => onChange(techStack.filter((_, idx) => idx !== i))}>✕</button>
        </div>
      ))}
      <button type="button" className="adm-add-row-btn" onClick={() => onChange([...techStack, { label: "", items: [] }])}>
        + Add Tech Group
      </button>
    </div>
  );
}

export default function ProjectForm({ project, onClose }) {
  const isEdit = !!project;
  const [form, setForm] = useState(() => {
    if (!project) return JSON.parse(JSON.stringify(emptyProject));
    return {
      ...emptyProject,
      ...project,
      startDate: project.startDate ? project.startDate.slice(0, 10) : "",
      endDate: project.endDate ? project.endDate.slice(0, 10) : "",
      caseStudy: { ...emptyProject.caseStudy, ...project.caseStudy },
    };
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setCase = (key, val) => setForm((f) => ({ ...f, caseStudy: { ...f.caseStudy, [key]: val } }));

  const onTitleChange = (val) => {
    set("title", val);
    if (!slugTouched) set("slug", slugify(val));
  };

  const onThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.upload("/upload", file);
      set("thumbnail", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        endDate: form.endDate || undefined,
      };
      if (isEdit) {
        await api.put(`/projects/admin/${project._id}`, payload);
      } else {
        await api.post("/projects/admin", payload);
      }
      onClose(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(false); }}>
      <form className="adm-modal" onSubmit={onSubmit}>
        <div className="adm-modal-head">
          <h2>{isEdit ? `Edit "${project.title}"` : "Add New Project"}</h2>
          <button type="button" className="adm-modal-close" onClick={() => onClose(false)}>✕</button>
        </div>

        {error && <div className="adm-error-banner">{error}</div>}

        <div className="adm-section-divider">Basic Information</div>

        <div className="adm-field">
          <label>Project Title</label>
          <input className="adm-input" required value={form.title} onChange={(e) => onTitleChange(e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Slug (used in the URL /case/&lt;slug&gt;)</label>
          <input className="adm-input" required value={form.slug}
            onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
        </div>
        <div className="adm-row">
          <div className="adm-field">
            <label>Category</label>
            <input className="adm-input" required placeholder="Full-Stack · AI Healthcare" value={form.category}
              onChange={(e) => set("category", e.target.value)} />
          </div>
          <div className="adm-field">
            <label>Filter Group</label>
            <select className="adm-select" value={form.filter} onChange={(e) => set("filter", e.target.value)}>
              <option value="UX">UX</option>
              <option value="Dev">Dev</option>
              <option value="ML">ML</option>
            </select>
          </div>
        </div>
        <div className="adm-field">
          <label>Short Tagline (shown on the card)</label>
          <textarea className="adm-textarea" required value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </div>

        <div className="adm-row">
          <div className="adm-field">
            <label>Text Color</label>
            <input className="adm-input" type="color" value={form.accent} onChange={(e) => set("accent", e.target.value)} style={{ height: 40 }} />
          </div>
          <div className="adm-field">
            <label>Fallback Icon (emoji, used if no thumbnail)</label>
            <input className="adm-input" value={form.icon} onChange={(e) => set("icon", e.target.value)} />
          </div>
        </div>

        <div className="adm-field">
          <label>Thumbnail Image</label>
          <input className="adm-input" type="file" accept="image/*" onChange={onThumbnailUpload} />
          {uploading && <div className="adm-hint">Uploading…</div>}
          {form.thumbnail && (
            <div className="adm-upload-preview">
              <img
                src={form.thumbnail.startsWith("http") ? form.thumbnail : `${API_URL.replace(/\/api\/?$/, "")}${form.thumbnail}`}
                className="adm-thumb" alt=""
              />
              <span className="adm-hint">{form.thumbnail}</span>
            </div>
          )}
        </div>

        <div className="adm-section-divider">Dates &amp; Ordering</div>
        <p className="adm-hint" style={{ marginBottom: 12 }}>
          There is no manual number field — projects are automatically sorted newest-first by these dates.
        </p>
        <div className="adm-row">
          <div className="adm-field">
            <label>Start Date</label>
            <input className="adm-input" type="date" required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </div>
          <div className="adm-field">
            <label>End Date (optional)</label>
            <input className="adm-input" type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
          </div>
        </div>
        <div className="adm-row">
          <div className="adm-field">
            <label>Date Display Precision</label>
            <select className="adm-select" value={form.datePrecision} onChange={(e) => set("datePrecision", e.target.value)}>
              <option value="month">Month only (e.g. "Mar 2026")</option>
              <option value="day">Exact day (e.g. "16 Jun 2026")</option>
            </select>
          </div>
          <div className="adm-field">
            <label>Type / Label</label>
            <select className="adm-select" value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="">— none —</option>
              <option>Hackathon</option>
              <option>Personal Project</option>
              <option>Internship</option>
              <option>Freelance</option>
              <option>Team Project</option>
              <option>Academic</option>
            </select>
          </div>
        </div>
        <div className="adm-field">
          <label>Manual Date Override (optional)</label>
          <input className="adm-input" placeholder='e.g. "24 Aug 2025 (36-hour Hackathon)"' value={form.displayLabel}
            onChange={(e) => set("displayLabel", e.target.value)} />
          <div className="adm-hint">Leave blank to auto-generate from the dates above using the precision setting.</div>
        </div>

        <div className="adm-section-divider">Card Details</div>
        <StringListField label="Tech Tags (shown on the card)" values={form.cardTags}
          onChange={(v) => set("cardTags", v)} placeholder="React" />
        <LinksField links={form.links} onChange={(v) => set("links", v)} />

        <div className="adm-checkbox-row" style={{ marginBottom: 16 }}>
          <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          <label htmlFor="published" style={{ margin: 0, textTransform: "none", fontWeight: 500, color: "#fff" }}>
            Published (visible on the live site)
          </label>
        </div>

        <div className="adm-section-divider">Case Study</div>

        <div className="adm-field">
          <label>Subtitle</label>
          <textarea className="adm-textarea" value={form.caseStudy.subtitle} onChange={(e) => setCase("subtitle", e.target.value)} />
        </div>
        <StringListField label="Case Page Tags" values={form.caseStudy.tags}
          onChange={(v) => setCase("tags", v)} placeholder="React" />
        <div className="adm-field">
          <label>Case Page Background Tint</label>
          <input className="adm-input" type="color" value={form.caseStudy.color} onChange={(e) => setCase("color", e.target.value)} style={{ height: 40 }} />
        </div>
        <div className="adm-field">
          <label>Overview</label>
          <textarea className="adm-textarea" value={form.caseStudy.overview} onChange={(e) => setCase("overview", e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Problem</label>
          <textarea className="adm-textarea" value={form.caseStudy.problem} onChange={(e) => setCase("problem", e.target.value)} />
        </div>
        <div className="adm-field">
          <label>Solution</label>
          <textarea className="adm-textarea" value={form.caseStudy.solution} onChange={(e) => setCase("solution", e.target.value)} />
        </div>

        <SectionsField sections={form.caseStudy.sections} onChange={(v) => setCase("sections", v)} />
        <TechStackField techStack={form.caseStudy.techStack} onChange={(v) => setCase("techStack", v)} />
        <StringListField label="Team Members" values={form.caseStudy.team}
          onChange={(v) => setCase("team", v)} placeholder="Srijita Biswas" />

        <div className="adm-modal-actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => onClose(false)}>Cancel</button>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={saving || uploading}>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}