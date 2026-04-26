import type { Metadata } from "next";
import EnquiryFormFull from "@/components/enquiry/EnquiryForm";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Get in touch with TravelWell Delight for a custom quote or trip planning help. Free consultation, reply within 4 hours.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ── HERO STRIP ── */}
      <div className="relative border-b border-white/[0.05] pt-28 pb-16 px-6 md:px-14 overflow-hidden">
        {/* Diagonal gold grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg, #d4af6e 0px, #d4af6e 1px,
              transparent 1px, transparent 80px
            )`,
          }}
        />

        {/* Gold line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af6e]/30 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Left: heading */}
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8392B] mb-4 block">
                Help & Planning
              </span>
              <h1
                className="font-display leading-[0.92] text-white mb-5"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                How can we
                <br />
                <em className="text-white/20 font-light">help you?</em>
              </h1>
              <p className="text-white/35 text-sm max-w-md leading-relaxed">
                Tell us about your dream trip. Our specialists will craft a
                personalised itinerary and quote — free, within 4 hours, no
                pressure.
              </p>
            </div>

            {/* Right: quick contact */}
            <div className="flex flex-col gap-3 shrink-0 md:min-w-[260px]">
              <div className="flex items-center gap-3 px-5 py-4 border border-white/[0.06] bg-white/[0.02]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4af6e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <p className="text-white text-sm font-medium">Mon – Sat</p>
                  <p className="text-white/30 text-[11px]">
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
