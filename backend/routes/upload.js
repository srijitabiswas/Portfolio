import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import { upload, processUploadedFile } from "../utils/upload.js";

const router = express.Router();

/**
 * Generic single-file upload, used by every admin form that needs an
 * image (project thumbnail, certification image, company logo, etc).
 * Returns { url } — the admin form then saves that URL on its own document.
 */
router.post("/", requireAdmin, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const relativeUrl = await processUploadedFile(req.file);
    // Return a fully-qualified URL (not just "/uploads/xxx.webp") so it
    // resolves correctly from the frontend, which runs on a different
    // origin/port than this backend in both dev and production.
    const url = `${req.protocol}://${req.get("host")}${relativeUrl}`;
    res.json({ url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;