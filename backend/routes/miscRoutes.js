import certificationController from "../controllers/certificationController.js";
import experienceController from "../controllers/experienceController.js";
import hackathonController from "../controllers/hackathonController.js";
import { skillController, exploringController, socialLinkController } from "../controllers/miscControllers.js";
import { buildCrudRouter } from "./crudRouteBuilder.js";

export const certificationRoutes = buildCrudRouter(certificationController, { hasPublish: true });
export const experienceRoutes    = buildCrudRouter(experienceController,    { hasPublish: true });
export const hackathonRoutes     = buildCrudRouter(hackathonController,     { hasPublish: true });
export const skillRoutes         = buildCrudRouter(skillController,         { hasPublish: true });
export const exploringRoutes     = buildCrudRouter(exploringController,     { hasPublish: false });
export const socialLinkRoutes    = buildCrudRouter(socialLinkController,    { hasPublish: false });
