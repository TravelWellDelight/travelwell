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

    if (!packageId || !packageTitle || !traveller?.email) {
      return NextResponse.json(
        {
          error: "packageId, packageTitle and traveller.email are required",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const booking = await Booking.create({
      packageId,
      packageTitle,
      packageSlug: packageSlug || "",

      travelDates: travelDates || {},

      traveller: {
        firstName: traveller?.firstName || "",
        lastName: traveller?.lastName || "",
        email: traveller?.email || "",
        phone: traveller?.phone || "",
        adults: traveller?.adults || 1,
        children: traveller?.children || 0,
        specialRequests: traveller?.specialRequests || "",
      },

      amount: amount || 0,

      currency: "INR",

      status: "pending",
      paymentStatus: "unpaid",

      razorpayOrderId: null,
      razorpayPaymentId: null,
    });

    // EMAILS
    try {
      const { sendBookingConfirmation, sendBookingNotification } =
        await import("@/lib/resend");

      await Promise.allSettled([
        sendBookingConfirmation({
          toEmail: traveller.email,
          toName: traveller.firstName || "Traveller",
          packageTitle,
          travelDates,
          amount: amount || 0,
          bookingId: booking._id.toString(),
        }),

        sendBookingNotification({
          travellerName: `${traveller.firstName || ""} ${traveller.lastName || ""}`,
          travellerEmail: traveller.email,
          travellerPhone: traveller.phone,
          packageTitle,
          travelDates,
          adults: traveller.adults,
          children: traveller.children,
          specialRequests: traveller.specialRequests,
          bookingId: booking._id.toString(),
        }),
      ]);
    } catch (emailErr) {
      console.error("Booking email failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      bookingId: booking._id.toString(),
      status: "pending",
      amount: amount || 0,
      currency: "INR",
    });
  } catch (err) {
    console.error("Booking create error:", err);

    return NextResponse.json(
      {
        error: "Server error",
      },
      { status: 500 },
    );
  }
}
