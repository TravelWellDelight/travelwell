// src/models/Enquiry.ts
import mongoose, { Schema } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    packageId: { type: String },
    packageTitle: { type: String },
    travelMonth: { type: String },
    groupSize: {
      adults: { type: Number },
      children: { type: Number },
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "responded", "converted"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const EnquiryModel =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
