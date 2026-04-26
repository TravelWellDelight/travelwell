import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      packageId,
      packageTitle,
      packageSlug,
      travelDates,
      traveller,
      amount,
    } = body;

    if (!packageId || !packageTitle || !traveller?.email || !amount) {
      return NextResponse.json(
        {
          error:
            "packageId, packageTitle, traveller.email and amount are required",
        },
        { status: 400 },
      );
    }

    await connectDB();

    // Save booking with pending status — Razorpay will update this later
    const booking = await Booking.create({
      packageId,
      packageTitle,
      packageSlug: packageSlug || "",
      travelDates: travelDates || {},
      traveller: traveller || {},
      amount,
      currency: "INR",
      status: "pending",
      paymentStatus: "unpaid",
      // Razorpay fields — empty for now, filled after payment
      razorpayOrderId: null,
      razorpayPaymentId: null,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking._id.toString(),
      status: "pending",
      // These will be real values once Razorpay is connected
      orderId: null,
      amount,
      currency: "INR",
    });
  } catch (err) {
    console.error("Booking create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
