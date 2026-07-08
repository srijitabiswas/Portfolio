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
    // processUploadedFile now returns a full, permanent Cloudinary URL —
    // no need to prepend this backend's own host to it.
    const url = await processUploadedFile(req.file);
    res.json({ url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;