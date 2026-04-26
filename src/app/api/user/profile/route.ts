import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET — fetch full profile
export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findById(session.id).select("-passwordHash -salt");
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ user });
}

// PATCH — update profile fields
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Fields that are allowed to be updated
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
  ).select("-passwordHash -salt");

  return NextResponse.json({ success: true, user });
}
