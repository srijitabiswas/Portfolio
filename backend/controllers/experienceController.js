import Experience from "../models/Experience.js";
import { createCrudController } from "../utils/crudFactory.js";

export default createCrudController(Experience, { hasPublished: true });
