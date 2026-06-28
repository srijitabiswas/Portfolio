/**
 * Generic CRUD factory used by Certification, Experience, Skill,
 * Exploring, and SocialLink — these all follow the exact same
 * list/get/create/update/delete/reorder pattern, so we define it once
 * here instead of repeating near-identical controller code five times.
 *
 * Project is intentionally NOT built on this factory — it has the
 * embedded caseStudy structure and date-driven auto-numbering, which
 * needs its own dedicated controller (see projectController.js).
 */
export function createCrudController(Model, { hasPublished = false } = {}) {
  return {
    /* Public — only published items (if the model supports it), sorted by `order` */
    async getPublic(req, res) {
      const filter = hasPublished ? { published: true } : {};
      const docs = await Model.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      res.json(docs);
    },

    /* Admin — everything, including drafts */
    async getAdminAll(req, res) {
      const docs = await Model.find().sort({ order: 1, createdAt: -1 }).lean();
      res.json(docs);
    },

    async getAdminById(req, res) {
      const doc = await Model.findById(req.params.id).lean();
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    },

    async create(req, res) {
      try {
        const doc = await Model.create(req.body);
        res.status(201).json(doc);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },

    async update(req, res) {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doc) return res.status(404).json({ message: "Not found" });
        res.json(doc);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },

    async remove(req, res) {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    },

    /* Only relevant for models with a `published` field */
    async togglePublish(req, res) {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      doc.published = !doc.published;
      await doc.save();
      res.json(doc);
    },

    /* Bulk reorder — admin drags items in a list, sends back an array of {id, order} */
    async reorder(req, res) {
      const { order } = req.body; // [{ id, order }, ...]
      if (!Array.isArray(order)) {
        return res.status(400).json({ message: "Expected { order: [{id, order}] }" });
      }
      await Promise.all(
        order.map(({ id, order: o }) => Model.findByIdAndUpdate(id, { order: o }))
      );
      res.json({ message: "Reordered" });
    },
  };
}
