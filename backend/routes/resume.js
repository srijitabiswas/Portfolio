import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import { resumeController } from "../controllers/miscControllers.js";
import { upload, processUploadedFile } from "../utils/upload.js";

const router = express.Router();

router.get("/", resumeController.getPublic);
router.get("/admin/all", requireAdmin, resumeController.getAdminAll);

router.post(
  "/admin/upload",
  requireAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });
      // processUploadedFile now returns a full, permanent Cloudinary URL —
      // no need to prepend this backend's own host to it.
      req.fileUrl = await processUploadedFile(req.file);
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  resumeController.upload
);

router.delete("/admin/:id", requireAdmin, resumeController.remove);

export default router;