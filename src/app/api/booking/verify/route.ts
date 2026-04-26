import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BookingModel } from "@/models/Booking";
import { verifySignature } from "@/lib/razorpay";
import { sendBookingConfirmation } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    const isValid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();

    const booking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { razorpayPaymentId, status: "paid" },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Send confirmation email (non-blocking)
    sendBookingConfirmation({
      toEmail: booking.traveller.email,
      toName: booking.traveller.firstName,
      packageTitle: booking.packageTitle,
      travelDates: booking.travelDates,
      amount: booking.amount,
      bookingId: booking._id.toString(),
    }).catch(console.error);

    return NextResponse.json({ success: true, bookingId: booking._id });
  } catch (err) {
    console.error("Verify payment error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
