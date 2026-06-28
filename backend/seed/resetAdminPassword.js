import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import { AdminUser } from "../models/misc.js";

dotenv.config();
await connectDB();

/**
 * Updates ONLY the admin password to match whatever is currently in .env.
 * Does not touch projects, hackathons, certifications, or anything else.
 * Safe to run as many times as you want.
 */
const email = process.env.ADMIN_EMAIL;
const newPassword = process.env.ADMIN_PASSWORD;

const admin = await AdminUser.findOne({ email });

if (!admin) {
  console.log(`❌ No admin account found with email "${email}".`);
  console.log(`   Run "npm run seed" instead — that will create it for the first time.`);
} else {
  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  await admin.save();
  console.log(`✅ Password updated for ${email}.`);
  console.log(`   You can now log in at /admin/login with the ADMIN_PASSWORD currently in your .env file.`);
}

process.exit(0);