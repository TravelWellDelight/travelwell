import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in .env.local");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const TEAM_TO =
  process.env.ENQUIRY_RECIPIENT_EMAIL || "travelwelldelight@gmail.com";

// ── 1. Acknowledgement email to the user ──
export async function sendEnquiryAck({
  toEmail,
  toName,
  packageTitle,
}: {
  toEmail: string;
  toName: string;
  packageTitle?: string;
}) {
  const resend = getResend();
  const firstName = toName.split(" ")[0];

  await resend.emails.send({
    from: FROM,
    to: [toEmail],
    subject: `We received your enquiry${packageTitle ? ` — ${packageTitle}` : ""} | TravelWell Delight`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0f0f0f;color:#f0ece0;border-radius:8px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af6e;margin:0 0 8px;">TravelWell Delight</p>
        <h2 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 16px;">
          We've got your request, ${firstName}!
        </h2>
        <p style="font-size:14px;color:#aaa;line-height:1.7;margin:0 0 12px;">
          Thank you for reaching out. Our travel specialist will get back to you within
          <strong style="color:#f0ece0;">4 hours</strong> on business days.
        </p>
        ${
          packageTitle
            ? `
        <p style="font-size:13px;color:#d4af6e;margin:0 0 20px;">
          Package of interest: <strong style="color:#f0ece0;">${packageTitle}</strong>
        </p>`
            : ""
        }
        <div style="border-top:1px solid #222;padding-top:20px;margin-top:20px;">
          <p style="font-size:12px;color:#555;margin:0;">
            Need a faster response? WhatsApp us directly and we'll reply within 30 minutes.
          </p>
        </div>
        <p style="font-size:11px;color:#333;margin-top:24px;">
          — Team TravelWell Delight · Life Beyond Limitations
        </p>
      </div>
    `,
  });
}

// ── 2. Internal notification to your team ──
export async function sendEnquiryNotification(data: {
  name: string;
  email: string;
  phone: string;
  packageTitle?: string;
  destination?: string;
  tripType?: string;
  budget?: string;
  travelMonth?: string;
  duration?: string;
  groupSize?: { adults?: number; children?: number } | null;
  message?: string;
}) {
  const resend = getResend();

  const {
    name,
    email,
    phone,
    packageTitle,
    destination,
    tripType,
    budget,
    travelMonth,
    duration,
    groupSize,
    message,
  } = data;

  const subjectType =
    tripType || (packageTitle ? "Package Enquiry" : "General Enquiry");
  const subjectDest = destination || packageTitle || "Open Destination";
  const subject = `[${subjectType}] New Enquiry — ${name} — ${subjectDest}`;

  const groupStr = groupSize
    ? `${groupSize.adults ?? 0} adults, ${groupSize.children ?? 0} children`
    : "—";

  const row = (label: string, value?: string | null) =>
    value
      ? `
      <tr>
        <td style="padding:9px 0;color:#888;font-size:13px;width:140px;border-bottom:1px solid #1e1e1e;vertical-align:top;">${label}</td>
        <td style="padding:9px 0;color:#f0ece0;font-size:13px;border-bottom:1px solid #1e1e1e;">${value}</td>
      </tr>`
      : "";

  await resend.emails.send({
    from: FROM,
    to: [TEAM_TO],
    reply_to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td align="center">
          <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

            <tr><td style="background:#0f0f0f;border:1px solid #1e1e1e;border-bottom:none;padding:24px 28px 18px;border-radius:8px 8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td>
                  <p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#d4af6e;">TravelWell Delight</p>
                  <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff;">New Enquiry</h1>
                </td>
                <td align="right" style="vertical-align:top;">
                  <span style="background:#d4af6e;color:#080808;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:3px;">
                    ${subjectType}
                  </span>
                </td>
              </tr></table>
            </td></tr>

            <tr><td style="background:#161616;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;padding:12px 28px;">
              <p style="margin:0;font-size:10px;color:#666;letter-spacing:0.1em;text-transform:uppercase;">Destination</p>
              <p style="margin:4px 0 0;font-size:18px;color:#d4af6e;font-weight:600;">${subjectDest}</p>
            </td></tr>

            <tr><td style="background:#0f0f0f;border:1px solid #1e1e1e;border-top:none;border-bottom:none;padding:20px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", name)}
                ${row("Email", `<a href="mailto:${email}" style="color:#d4af6e;text-decoration:none;">${email}</a>`)}
                ${row("Phone", `<a href="tel:${phone}" style="color:#d4af6e;text-decoration:none;">${phone}</a>`)}
                ${row("Trip type", tripType)}
                ${row("Destination", destination)}
                ${row("Travel month", travelMonth)}
                ${row("Duration", duration)}
                ${row("Group", groupStr)}
                ${row("Budget", budget)}
                ${row("Package", packageTitle)}
              </table>
              ${
                message
                  ? `
              <div style="margin-top:16px;padding:14px;background:#161616;border-left:3px solid #d4af6e;">
                <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#666;">Message</p>
                <p style="margin:0;font-size:13px;color:#c0bdb0;line-height:1.6;">${message}</p>
              </div>`
                  : ""
              }
            </td></tr>

            <tr><td style="background:#0f0f0f;border:1px solid #1e1e1e;border-top:none;padding:18px 28px 24px;">
              <a href="mailto:${email}?subject=Re: Your TravelWell Enquiry — ${subjectDest}"
                style="display:inline-block;background:#d4af6e;color:#080808;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:11px 22px;text-decoration:none;border-radius:3px;">
                Reply to ${name.split(" ")[0]}
              </a>
              <p style="margin:12px 0 0;font-size:11px;color:#444;">
                Received ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST
              </p>
            </td></tr>

          </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ── 3. Booking confirmation email to user ──
export async function sendBookingConfirmation(data: {
  toEmail: string;
  toName: string;
  packageTitle: string;
  travelDates?: { start?: string; end?: string };
  amount: number;
  bookingId: string;
}) {
  const resend = getResend();
  const { toEmail, toName, packageTitle, travelDates, amount, bookingId } =
    data;

  await resend.emails.send({
    from: FROM,
    to: [toEmail],
    subject: `Booking Confirmed — ${packageTitle} | TravelWell Delight`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0f0f0f;color:#f0ece0;border-radius:8px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af6e;margin:0 0 8px;">TravelWell Delight</p>
        <h2 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 16px;">
          Your booking is confirmed, ${toName.split(" ")[0]}!
        </h2>
        <p style="font-size:14px;color:#aaa;line-height:1.7;margin:0 0 20px;">
          Thank you for booking with TravelWell Delight. Here are your booking details:
        </p>
        <div style="background:#161616;padding:16px;border-left:3px solid #d4af6e;margin-bottom:20px;">
          <p style="margin:0 0 8px;font-size:13px;color:#f0ece0;"><strong>Package:</strong> ${packageTitle}</p>
          ${travelDates?.start ? `<p style="margin:0 0 8px;font-size:13px;color:#f0ece0;"><strong>Travel dates:</strong> ${travelDates.start}${travelDates.end ? ` – ${travelDates.end}` : ""}</p>` : ""}
          <p style="margin:0 0 8px;font-size:13px;color:#f0ece0;"><strong>Amount paid:</strong> ₹${amount.toLocaleString("en-IN")}</p>
          <p style="margin:0;font-size:11px;color:#666;"><strong>Booking ID:</strong> ${bookingId}</p>
        </div>
        <p style="font-size:13px;color:#aaa;line-height:1.7;margin:0 0 20px;">
          Our team will reach out within 2 hours to confirm your itinerary details.
        </p>
        <p style="font-size:11px;color:#333;margin-top:24px;">— Team TravelWell Delight · Life Beyond Limitations</p>
      </div>
    `,
  });
}
