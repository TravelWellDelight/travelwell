import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";
import { EnquiryModel as Enquiry } from "@/models/Enquiry";

// ── GET — fetch full profile + bookings + enquiries in parallel ──
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // Promise.all — all 3 queries run simultaneously instead of sequentially
  const [user, bookings, enquiries] = await Promise.all([
    User.findById(session.id)
      .select("-passwordHash -salt") // never return sensitive fields
      .lean(), // plain JSON, 3-5x faster

    Booking.find({ "traveller.email": session.email })
      .select(
        "packageTitle packageSlug travelDates amount status paymentStatus createdAt",
      )
      .sort({ createdAt: -1 })
      .limit(10) // only last 10 bookings
      .lean(),

    Enquiry.find({ email: session.email })
      .select(
        "destination tripType budget travelMonth status createdAt packageTitle",
      )
      .sort({ createdAt: -1 })
      .limit(10) // only last 10 enquiries
      .lean(),
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user, bookings, enquiries });
}

// ── PATCH — update profile fields ──
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const allowed = [
    "firstName",
    "lastName",
    "phone",
    "dateOfBirth",
    "nationality",
    "city",
    "state",
    "address",
    "anniversary",
    "emergencyContactName",
    "emergencyContactPhone",
    "howHeard",
    "preferredContact",
    "dietaryPreference",
    "seatPreference",
    "travelStyle",
    "usualTripLength",
    "budgetRange",
    "preferredLanguage",
    "passportNumber",
    "passportExpiry",
    "passportCountry",
    "aadhaarNumber",
    "panNumber",
  ];

  const updates: Record<string, any> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  await connectDB();

  const user = await User.findByIdAndUpdate(
    session.id,
    { $set: updates },
    { new: true },
  )
    .select("-passwordHash -salt")
    .lean();

  return NextResponse.json({ success: true, user });
}
