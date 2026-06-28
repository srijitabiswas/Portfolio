import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import {
  getPublicProjects,
  getPublicProjectBySlug,
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
} from "../controllers/projectController.js";

const router = express.Router();

/* Public — consumed by Projects.tsx / CaseLayout.tsx */
router.get("/", getPublicProjects);
router.get("/:slug", getPublicProjectBySlug);

/* Admin — consumed by the /admin dashboard */
router.get("/admin/all", requireAdmin, getAdminProjects);
router.get("/admin/:id", requireAdmin, getAdminProjectById);
router.post("/admin", requireAdmin, createProject);
router.put("/admin/:id", requireAdmin, updateProject);
router.delete("/admin/:id", requireAdmin, deleteProject);
router.patch("/admin/:id/publish", requireAdmin, togglePublish);

export default router;
