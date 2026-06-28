import express from "express";
import { requireAdmin } from "../middleware/auth.js";

/**
 * Builds a standard router for any controller created via createCrudController().
 * Used for Certifications, Experience, Skills, Exploring, Social Links —
 * all five expose the exact same route shape.
 */
export function buildCrudRouter(controller, { hasPublish = false } = {}) {
  const router = express.Router();

  router.get("/", controller.getPublic);                          // public
  router.get("/admin/all", requireAdmin, controller.getAdminAll);  // admin
  router.get("/admin/:id", requireAdmin, controller.getAdminById);
  router.post("/admin", requireAdmin, controller.create);
  router.put("/admin/:id", requireAdmin, controller.update);
  router.delete("/admin/:id", requireAdmin, controller.remove);
  router.patch("/admin/reorder", requireAdmin, controller.reorder);

  if (hasPublish) {
    router.patch("/admin/:id/publish", requireAdmin, controller.togglePublish);
  }

  return router;
}
