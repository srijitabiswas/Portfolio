import Certification from "../models/Certification.js";
import { createCrudController } from "../utils/crudFactory.js";

export default createCrudController(Certification, { hasPublished: true });
