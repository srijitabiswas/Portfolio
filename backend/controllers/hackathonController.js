import Hackathon from "../models/Hackathon.js";
import { createCrudController } from "../utils/crudFactory.js";

export default createCrudController(Hackathon, { hasPublished: true });
