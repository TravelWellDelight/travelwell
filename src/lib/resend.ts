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

// ─────────────────────────────────────────────
// 1. ENQUIRY ACKNOWLEDGEMENT EMAIL
// ─────────────────────────────────────────────

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
    subject: `We received your enquiry${
      packageTitle ? ` — ${packageTitle}` : ""
    } | TravelWell Delight`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#FDFAF6;color:#1C0A00;border-radius:8px;border:1px solid rgba(107,45,14,0.12);">
        
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#E8621A;margin:0 0 8px;font-weight:700;">
          TravelWell Delight
        </p>

        <h2 style="font-size:22px;font-weight:700;color:#1C0A00;margin:0 0 16px;">
          We've got your request, ${firstName}!
        </h2>

        <p style="font-size:14px;color:#6B5B45;line-height:1.7;margin:0 0 12px;">
          Thank you for reaching out. Our travel specialist will get back to you within
          <strong style="color:#E8621A;">4 hours</strong> on business days.
        </p>

        ${
          packageTitle
            ? `
        <p style="font-size:13px;color:#6B5B45;margin:0 0 20px;">
          Package of interest:
          <strong style="color:#C8392B;">${packageTitle}</strong>
        </p>
        `
            : ""
        }

        <div style="border-top:1px solid rgba(107,45,14,0.12);padding-top:20px;margin-top:20px;">
          <p style="font-size:12px;color:#A8967E;margin:0;">
            Need a faster response? WhatsApp us directly and we'll reply within 30 minutes.
          </p>
        </div>

        <p style="font-size:11px;color:#A8967E;margin-top:24px;">
          — Team TravelWell Delight · Life Beyond Limitations
        </p>
      </div>
    `,
  });
}

// ─────────────────────────────────────────────
// 2. ENQUIRY NOTIFICATION EMAIL
// ─────────────────────────────────────────────

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
  fromDate?: string;
  toDate?: string;
  serviceType?: string;
  groupSize?: {
    adults?: number;
    children?: number;
  } | null;
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
    fromDate,
    toDate,
    serviceType,
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
        <td style="padding:9px 0;color:#6B5B45;font-size:13px;width:140px;border-bottom:1px solid rgba(107,45,14,0.08);vertical-align:top;">
          ${label}
        </td>
        <td style="padding:9px 0;color:#1C0A00;font-size:13px;border-bottom:1px solid rgba(107,45,14,0.08);">
          ${value}
        </td>
      </tr>
      `
      : "";

  await resend.emails.send({
    from: FROM,
    to: [TEAM_TO],
    reply_to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

                <tr>
                  <td style="background:#FDFAF6;border:1px solid rgba(107,45,14,0.12);border-bottom:none;padding:24px 28px 18px;border-radius:8px 8px 0 0;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#E8621A;font-weight:700;">
                            TravelWell Delight
                          </p>
                          <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#1C0A00;">
                            New Enquiry
                          </h1>
                        </td>
                        <td align="right" style="vertical-align:top;">
                          <span style="background:#E8621A;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:3px;">
                            ${subjectType}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="background:#F5F0E8;border-left:1px solid rgba(107,45,14,0.12);border-right:1px solid rgba(107,45,14,0.12);padding:12px 28px;">
                    <p style="margin:0;font-size:10px;color:#A8967E;letter-spacing:0.1em;text-transform:uppercase;">
                      Destination
                    </p>
                    <p style="margin:4px 0 0;font-size:18px;color:#C8392B;font-weight:600;">
                      ${subjectDest}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background:#FDFAF6;border:1px solid rgba(107,45,14,0.12);border-top:none;border-bottom:none;padding:20px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                     ${row("Name", name)}
${row("Email", `<a href="mailto:${email}" style="color:#E8621A;text-decoration:none;">${email}</a>`)}
${row("Phone", `<a href="tel:${phone}" style="color:#E8621A;text-decoration:none;">${phone}</a>`)}
${row("Destination", destination)}
${row("Trip type", tripType)}
${row("Service", serviceType)}
${row("Travel from", fromDate)}
${row("Travel to", toDate)}
${row("Travel month", travelMonth)}
${row("Duration", duration)}
${row("Group", groupStr)}
${row("Budget", budget)}
${row("Package", packageTitle)}
                    </table>

                    ${
                      message
                        ? `
                    <div style="margin-top:16px;padding:14px;background:#F5F0E8;border-left:3px solid #E8621A;border-radius:0 4px 4px 0;">
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#A8967E;">
                        Message
                      </p>
                      <p style="margin:0;font-size:13px;color:#1C0A00;line-height:1.6;">
                        ${message}
                      </p>
                    </div>
                    `
                        : ""
                    }
                  </td>
                </tr>

                <tr>
                  <td style="background:#F5F0E8;border:1px solid rgba(107,45,14,0.12);border-top:none;padding:12px 28px;border-radius:0 0 8px 8px;">
                    <p style="margin:0;font-size:11px;color:#A8967E;">
                      TravelWell Delight · Life Beyond Limitations
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ─────────────────────────────────────────────
// 3. BOOKING CONFIRMATION EMAIL (to traveller)
// ─────────────────────────────────────────────

export async function sendBookingConfirmation(data: {
  toEmail: string;
  toName: string;
  packageTitle: string;
  travelDates?: {
    startDate?: string;
    endDate?: string;
  };
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
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#FDFAF6;color:#1C0A00;border-radius:8px;border:1px solid rgba(107,45,14,0.12);">

        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#E8621A;margin:0 0 8px;font-weight:700;">
          TravelWell Delight
        </p>

        <h2 style="font-size:22px;font-weight:700;color:#1C0A00;margin:0 0 16px;">
          Your booking is confirmed, ${toName.split(" ")[0]}!
        </h2>

        <p style="font-size:14px;color:#6B5B45;line-height:1.7;margin:0 0 20px;">
          Thank you for booking with TravelWell Delight.
        </p>

        <div style="background:#F5F0E8;padding:16px;border-left:3px solid #E8621A;margin-bottom:20px;border-radius:0 4px 4px 0;">
          <p style="margin:0 0 8px;font-size:13px;color:#1C0A00;">
            <strong>Package:</strong> ${packageTitle}
          </p>

          ${
            travelDates?.startDate
              ? `
          <p style="margin:0 0 8px;font-size:13px;color:#1C0A00;">
            <strong>Travel dates:</strong>
            ${travelDates.startDate}
            ${travelDates.endDate ? ` – ${travelDates.endDate}` : ""}
          </p>
          `
              : ""
          }

          <p style="margin:0 0 8px;font-size:13px;color:#1C0A00;">
            <strong>Amount:</strong>
            ₹${amount.toLocaleString("en-IN")}
          </p>

          <p style="margin:0;font-size:11px;color:#A8967E;">
            <strong>Booking ID:</strong> ${bookingId}
          </p>
        </div>

        <p style="font-size:11px;color:#A8967E;margin-top:24px;">
          — Team TravelWell Delight · Life Beyond Limitations
        </p>
      </div>
    `,
  });
}

// ─────────────────────────────────────────────
// 4. BOOKING NOTIFICATION EMAIL (to team) — includes budget
// ─────────────────────────────────────────────

export async function sendBookingNotification(data: {
  travellerName: string;
  travellerEmail: string;
  travellerPhone?: string;
  packageTitle: string;
  travelDates?: {
    startDate?: string;
    endDate?: string;
  };
  adults?: number;
  children?: number;
  budget?: string;
  specialRequests?: string;
  bookingId: string;
}) {
  const resend = getResend();

  const {
    travellerName,
    travellerEmail,
    travellerPhone,
    packageTitle,
    travelDates,
    adults,
    children,
    budget,
    specialRequests,
    bookingId,
  } = data;

  const row = (label: string, value?: string | null) =>
    value
      ? `
      <tr>
        <td style="padding:9px 0;color:#6B5B45;font-size:13px;width:140px;border-bottom:1px solid rgba(107,45,14,0.08);vertical-align:top;">
          ${label}
        </td>
        <td style="padding:9px 0;color:#1C0A00;font-size:13px;border-bottom:1px solid rgba(107,45,14,0.08);">
          ${value}
        </td>
      </tr>
      `
      : "";

  await resend.emails.send({
    from: FROM,
    to: [TEAM_TO],
    reply_to: travellerEmail,
    subject: `New Quote Request — ${travellerName} — ${packageTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

                <tr>
                  <td style="background:#FDFAF6;border:1px solid rgba(107,45,14,0.12);border-bottom:none;padding:24px 28px 18px;border-radius:8px 8px 0 0;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#E8621A;font-weight:700;">
                            TravelWell Delight
                          </p>
                          <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#1C0A00;">
                            New Quote Request
                          </h1>
                        </td>
                        <td align="right" style="vertical-align:top;">
                          <span style="background:#C8392B;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:3px;">
                            Booking
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="background:#F5F0E8;border-left:1px solid rgba(107,45,14,0.12);border-right:1px solid rgba(107,45,14,0.12);padding:12px 28px;">
                    <p style="margin:0;font-size:10px;color:#A8967E;letter-spacing:0.1em;text-transform:uppercase;">
                      Package
                    </p>
                    <p style="margin:4px 0 0;font-size:18px;color:#C8392B;font-weight:600;">
                      ${packageTitle}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background:#FDFAF6;border:1px solid rgba(107,45,14,0.12);border-top:none;border-bottom:none;padding:20px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${row("Name", travellerName)}
                      ${row("Email", `<a href="mailto:${travellerEmail}" style="color:#E8621A;text-decoration:none;">${travellerEmail}</a>`)}
                      ${row("Phone", travellerPhone ? `<a href="tel:${travellerPhone}" style="color:#E8621A;text-decoration:none;">${travellerPhone}</a>` : null)}
                      ${row(
                        "Travel dates",
                        travelDates?.startDate
                          ? `${travelDates.startDate}${travelDates.endDate ? ` → ${travelDates.endDate}` : ""}`
                          : null,
                      )}
                      ${row("Adults", adults !== undefined ? String(adults) : null)}
                      ${row("Children", children !== undefined ? String(children) : null)}
                      ${row("Budget (per person)", budget || null)}
                    </table>

                    ${
                      specialRequests
                        ? `
                    <div style="margin-top:16px;padding:14px;background:#F5F0E8;border-left:3px solid #E8621A;border-radius:0 4px 4px 0;">
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#A8967E;">
                        Special Requests
                      </p>
                      <p style="margin:0;font-size:13px;color:#1C0A00;line-height:1.6;">
                        ${specialRequests}
                      </p>
                    </div>
                    `
                        : ""
                    }
                  </td>
                </tr>

                <tr>
                  <td style="background:#F5F0E8;border:1px solid rgba(107,45,14,0.12);border-top:none;padding:12px 28px;border-radius:0 0 8px 8px;">
                    <p style="margin:0;font-size:11px;color:#A8967E;">
                      Booking ID: ${bookingId} · TravelWell Delight
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}
