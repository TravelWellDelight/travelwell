import type { Metadata } from "next";
import EnquiryFormFull from "@/components/enquiry/EnquiryForm";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Get in touch with TravelWell Delight for a custom quote or trip planning help. Free consultation, reply within 4 hours.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* ── HERO STRIP ── */}
      <div className="relative border-b border-[rgba(107,45,14,0.08)] pt-28 pb-16 px-6 md:px-14 overflow-hidden">
        {/* Subtle warm diagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg, #6B2D0E 0px, #6B2D0E 1px,
              transparent 1px, transparent 80px
            )`,
          }}
        />

        {/* Warm top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8621A]/20 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Left: heading */}
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8392B] mb-4 block font-semibold">
                Help & Planning
              </span>
              <h1
                className="font-display leading-[0.92] text-[#1C0A00] mb-5"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                How can we
                <br />
                <em className="text-[#C8392B] font-light">help you?</em>
              </h1>
              <p className="text-[#6B5B45] text-sm max-w-md leading-relaxed">
                Tell us about your dream trip. Our specialists will craft a
                personalised itinerary and quote — free, within 4 hours, no
                pressure.
              </p>
            </div>

            {/* Right: quick contact */}
            <div className="flex flex-col gap-3 shrink-0 md:min-w-[260px]">
              <div className="flex items-center gap-3 px-5 py-4 border border-[rgba(107,45,14,0.12)] bg-white rounded-sm shadow-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E8621A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <p className="text-[#1C0A00] text-sm font-medium">
                    Mon – Sat
                  </p>
                  <p className="text-[#A8967E] text-[11px]">
                    9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-16">
        <EnquiryFormFull />
      </div>
    </div>
  );
}
