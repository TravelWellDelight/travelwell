import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { EnquiryModel } from "@/models/Enquiry";
import { sendEnquiryAck, sendEnquiryNotification } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      packageId,
      packageTitle,
      travelMonth,
      groupSize,
      message,
      destination,
      tripType,
      budget,
      duration,
      fromDate,
      toDate,
      serviceType,
    } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    const enquiry = await EnquiryModel.create({
      name,
      email,
      phone,
      packageId: packageId || null,
      packageTitle: packageTitle || null,
      travelMonth: travelMonth || null,
      groupSize: groupSize || null,
      message,
      destination: destination || null,
      tripType: tripType || null,
      budget: budget || null,
      duration: duration || null,
      fromDate: fromDate || null,
      toDate: toDate || null,
      serviceType: serviceType || null,
    });

    // Fire both emails in parallel — neither blocks the response
    Promise.allSettled([
      sendEnquiryAck({ toEmail: email, toName: name, packageTitle }),
      sendEnquiryNotification({
        name,
        email,
        phone,
        packageTitle,
        destination,
        tripType,
        budget,
        travelMonth,
        duration,
        fromDate,
        toDate,
        serviceType,
        groupSize,
        message,
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(
            `Email ${i === 0 ? "ack" : "notification"} failed:`,
            r.reason,
          );
        }
      });
    });

    return NextResponse.json(
      { success: true, id: enquiry._id },
      { status: 201 },
    );
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
