import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/misc.js";

/**
 * Login is the ONLY auth route exposed.
 * There is intentionally no public "register" endpoint —
 * the single admin account is created once via the seed script
 * (seed/seed.js) using ADMIN_EMAIL / ADMIN_PASSWORD from .env.
 */
export async function login(req, res) {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, role: "admin", email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
}

export async function me(req, res) {
  res.json({ email: req.admin.email, role: req.admin.role });
}
