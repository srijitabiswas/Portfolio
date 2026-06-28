import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true },
    organization: { type: String, required: true },
    issueDate:    { type: Date, required: true },
    credentialUrl:{ type: String, default: "" },
    image:        { type: String, default: "" }, // image OR pdf URL
    description:  { type: String, default: "" },
    order:        { type: Number, default: 0 },  // manual drag-order in admin list
    published:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
