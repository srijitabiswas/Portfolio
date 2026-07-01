import express from "express";
import rateLimit from "express-rate-limit";
import { sendContactMessage } from "../controllers/contactController.js";

const router = express.Router();

// Prevent the form being used to spam your inbox
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent. Please try again in a few minutes." },
});

router.post("/", contactLimiter, sendContactMessage);

export default router;