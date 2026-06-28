import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Accept images + PDFs (resume can be a PDF, certs can be image or PDF)
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, or PDF files are allowed"));
    }
    cb(null, true);
  },
});

/**
 * Call this AFTER upload.single("file") middleware has run.
 * - PDFs are saved as-is.
 * - Images are resized (max 1600px wide) and converted to webp for a
 *   consistently small file size, regardless of what the admin uploads.
 * Returns the public URL path to store on the document (e.g. "/uploads/xyz.webp").
 */
export async function processUploadedFile(file) {
  const id = crypto.randomBytes(8).toString("hex");

  if (file.mimetype === "application/pdf") {
    const filename = `${id}.pdf`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), file.buffer);
    return `/uploads/${filename}`;
  }

  const filename = `${id}.webp`;
  const resized = await sharp(file.buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), resized);
  return `/uploads/${filename}`;
}
