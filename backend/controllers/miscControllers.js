import { Skill, Exploring, SocialLink, Resume } from "../models/misc.js";
import { createCrudController } from "../utils/crudFactory.js";

export const skillController     = createCrudController(Skill, { hasPublished: true });
export const exploringController = createCrudController(Exploring, { hasPublished: false });
export const socialLinkController = createCrudController(SocialLink, { hasPublished: false });

/* Resume is special — there's only ever ONE active resume.
   Uploading a new one deactivates the previous one automatically,
   so the public download button always points to the latest. */
export const resumeController = {
  async getPublic(req, res) {
    const active = await Resume.findOne({ active: true }).sort({ createdAt: -1 }).lean();
    if (!active) return res.status(404).json({ message: "No resume uploaded yet" });
    res.json(active);
  },

  async getAdminAll(req, res) {
    const docs = await Resume.find().sort({ createdAt: -1 }).lean();
    res.json(docs);
  },

  async upload(req, res) {
    // req.fileUrl is set by the upload route after processUploadedFile()
    await Resume.updateMany({}, { active: false });
    const doc = await Resume.create({
      fileUrl: req.fileUrl,
      fileName: req.body.fileName || "resume.pdf",
      active: true,
    });
    res.status(201).json(doc);
  },

  async remove(req, res) {
    const doc = await Resume.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  },
};
