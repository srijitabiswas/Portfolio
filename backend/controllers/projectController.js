import Project from "../models/Project.js";
import { applyAutoNumbering } from "../utils/dateFormat.js";

/* ══ PUBLIC ROUTES ══ */

/** GET /api/projects — published only, auto-numbered, newest first */
export async function getPublicProjects(req, res) {
  const docs = await Project.find({ published: true }).lean();
  const numbered = applyAutoNumbering(docs);
  // Strip the heavy caseStudy payload from the list view — card only needs the summary fields
  const cards = numbered.map(({ caseStudy, ...rest }) => rest);
  res.json(cards);
}

/** GET /api/projects/:slug — full case study, published only */
export async function getPublicProjectBySlug(req, res) {
  const doc = await Project.findOne({ slug: req.params.slug, published: true }).lean();
  if (!doc) return res.status(404).json({ message: "Project not found" });

  // Recompute this project's position among ALL published projects so its
  // case-study page header shows the correct auto-generated "03" etc.
  const all = await Project.find({ published: true }).lean();
  const numbered = applyAutoNumbering(all);
  const withNum = numbered.find((p) => p.slug === doc.slug);

  res.json({ ...doc, num: withNum?.num, displayDate: withNum?.displayDate });
}

/* ══ ADMIN ROUTES (require requireAdmin middleware) ══ */

/** GET /api/admin/projects — ALL projects (published + drafts), auto-numbered */
export async function getAdminProjects(req, res) {
  const docs = await Project.find().sort({ createdAt: -1 }).lean();
  const published = docs.filter((p) => p.published);
  const numbered = applyAutoNumbering(published);
  const numMap = new Map(numbered.map((p) => [p.slug, p.num]));
  const withNums = docs.map((p) => ({ ...p, num: numMap.get(p.slug) ?? "—" }));
  res.json(withNums);
}

export async function getAdminProjectById(req, res) {
  const doc = await Project.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
}

export async function createProject(req, res) {
  try {
    const doc = await Project.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "A project with this slug already exists" });
    }
    res.status(400).json({ message: err.message });
  }
}

export async function updateProject(req, res) {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: "Project not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteProject(req, res) {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Project not found" });
  // Numbering is computed at fetch-time from remaining projects' dates —
  // nothing else needs to update. This is the whole point of never storing a manual number.
  res.json({ message: "Deleted" });
}

export async function togglePublish(req, res) {
  const doc = await Project.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Project not found" });
  doc.published = !doc.published;
  await doc.save();
  res.json(doc);
}
