import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  packageId: string;
  packageTitle: string;
  packageSlug: string;
  travelDates: {
    start?: string;
    end?: string;
  };
  traveller: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    adults?: number;
    children?: number;
    specialRequests?: string;
  };
  budget?: string;
  amount: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    packageId: { type: String, required: true },
    packageTitle: { type: String, required: true },
    packageSlug: { type: String, default: "" },
    travelDates: {
      start: String,
      end: String,
    },
    traveller: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      adults: Number,
      children: Number,
      specialRequests: String,
    },
    budget: { type: String, default: "" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
  },
  { timestamps: true },
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
