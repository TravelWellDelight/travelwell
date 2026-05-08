"use client";
import Link from "next/link";

const sections = [
  {
    id: "availability",
    title: "Availability & Bookings",
    icon: "01",
    body: "All bookings are subject to availability at the time of confirmation. TravelWell Delight acts as an intermediary between you and third-party service providers including hotels, airlines, transport operators, and tour guides. Availability is not guaranteed until a written confirmation is issued by us.",
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    icon: "02",
    body: "Cancellation charges may apply depending on the time of cancellation relative to your travel date. Charges vary by package and provider. We strongly recommend purchasing travel insurance to cover unforeseen cancellations. Please refer to your booking confirmation for package-specific cancellation windows and applicable fees.",
  },
  {
    id: "nonrefundable",
    title: "Non-Refundable Services",
    icon: "03",
    body: "Certain services — including but not limited to international and domestic flights, visa fees, travel insurance premiums, and certain activity bookings — are strictly non-refundable once confirmed, regardless of cancellation timing. These will be clearly marked at the time of booking.",
  },
  {
    id: "refunds",
    title: "Refund Processing",
    icon: "04",
    body: "Where a refund is applicable under these terms, it will be processed within 7–10 working days from the date the cancellation or refund request is approved. Refunds are credited to the original payment method. Processing times may vary depending on your bank or payment provider and are outside our control.",
  },
  {
    id: "liability",
    title: "Third-Party Liability",
    icon: "05",
    body: "TravelWell Delight is not responsible for delays, cancellations, service disruptions, or any loss caused by third-party providers including airlines, hotels, transport companies, or local operators. We will make reasonable efforts to assist you in such situations but cannot guarantee resolution or compensation on behalf of third parties.",
  },
];

export default function TermsPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "var(--fg)",
          paddingTop: "7rem",
          paddingBottom: "5rem",
        }}
      >
        {/* Decorative large number watermark */}
        <span
          className="absolute right-12 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none"
          style={{
            fontSize: "clamp(8rem,18vw,16rem)",
            color: "rgba(255,255,255,0.04)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          T&C
        </span>

        <div className="px-6 md:px-16 max-w-5xl mx-auto relative z-10">
          <p
            className="text-[10px] tracking-[0.32em] uppercase mb-4"
            style={{ color: "#C8392B" }}
          >
            Legal · TravelWell Delight
          </p>
          <h1
            className="font-display font-bold leading-none mb-5"
            style={{
              fontSize: "clamp(2.4rem,6vw,4.5rem)",
              letterSpacing: "-0.03em",
              color: "var(--bg)",
            }}
          >
            Terms &amp; Conditions
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Effective date: 1 January 2026 &nbsp;·&nbsp; Last updated: 7 May
            2026
          </p>
        </div>
      </div>

      {/* Intro strip */}
      <div
        style={{
          borderBottom: "1px solid var(--bd)",
          borderTop: "1px solid var(--bd)",
        }}
      >
        <div className="px-6 md:px-16 max-w-5xl mx-auto py-7">
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--fg-2)",
              lineHeight: 1.75,
            }}
          >
            Please read these terms carefully before making any booking with
            TravelWell Delight. By confirming a booking, you agree to be bound
            by the conditions set out below. If you have any questions, our team
            is available 24/7 —{" "}
            <Link
              href="mailto:travelwelldelight@gmail.com"
              style={{ color: "#C8392B", textDecoration: "underline" }}
            >
              reach out anytime
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="px-6 md:px-16 max-w-5xl mx-auto py-16 space-y-0">
        {sections.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            className="group grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 py-10"
            style={{
              borderBottom:
                i < sections.length - 1 ? "1px solid var(--bd)" : "none",
            }}
          >
            {/* Left — number + title */}
            <div>
              <span
                className="font-display font-bold block mb-2 tabular-nums"
                style={{
                  fontSize: "2.5rem",
                  color: "var(--bd-2)",
                  lineHeight: 1,
                }}
              >
                {s.icon}
              </span>
              <h2
                className="font-display font-bold leading-snug"
                style={{
                  fontSize: "1rem",
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h2>
            </div>

            {/* Right — body */}
            <div className="flex items-start">
              {/* Red accent bar */}
              <div
                className="shrink-0 mr-5 mt-1 rounded-full"
                style={{
                  width: "3px",
                  height: "100%",
                  minHeight: "100%",
                  background: "#C8392B",
                  opacity: 0.18,
                }}
              />
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--fg-2)",
                  lineHeight: 1.8,
                }}
              >
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 md:px-16 max-w-5xl mx-auto pb-20">
        <div
          className="rounded-sm p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{ background: "var(--fg)" }}
        >
          <div>
            <p
              className="text-[10px] tracking-[0.28em] uppercase mb-2"
              style={{ color: "#C8392B" }}
            >
              Still have questions?
            </p>
            <p
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Our team is here for you, 24/7.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
