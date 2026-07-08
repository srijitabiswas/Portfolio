import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

function uploadBufferToCloudinary(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

/**
 * Call this AFTER upload.single("file") middleware has run.
 *
 * Uploads to Cloudinary instead of local disk. This matters because Render
 * (and most PaaS hosts) use an EPHEMERAL filesystem — anything written to
 * local disk at runtime is wiped every time the service restarts or
 * redeploys. That was silently deleting every project thumbnail, cert
 * image, and resume PDF a few hours/days after upload. Cloudinary URLs are
 * permanent CDN links, completely independent of the backend's own
 * filesystem, so this class of bug can't happen again.
 *
 * - PDFs are uploaded as-is (resource_type: "raw").
 * - Images are resized (max 1600px wide) and converted to webp first, then
 *   uploaded, for a consistently small file size regardless of what the
 *   admin uploads.
 *
 * Returns the full, permanent Cloudinary URL to store on the document.
 */
export async function processUploadedFile(file) {
  const id = crypto.randomBytes(8).toString("hex");

  if (file.mimetype === "application/pdf") {
    const result = await uploadBufferToCloudinary(file.buffer, {
      resource_type: "raw",
      public_id: `portfolio/${id}`,
      format: "pdf",
    });
    return result.secure_url;
  }

  const resized = await sharp(file.buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const result = await uploadBufferToCloudinary(resized, {
    resource_type: "image",
    public_id: `portfolio/${id}`,
    format: "webp",
  });
  return result.secure_url;
}