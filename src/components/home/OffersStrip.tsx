"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const OFFERS = [
  {
    tag: "Couples",
    label: "Honeymoon Packages",
    desc: "Exclusive escapes crafted for two",
    href: "/packages?category=honeymoon",
  },
  {
    tag: "Thrill",
    label: "Adventure Tours",
    desc: "Trek, raft, climb, explore",
    href: "/packages?category=adventure",
  },
  {
    tag: "Culture",
    label: "Heritage Circuits",
    desc: "Palaces, forts & living history",
    href: "/packages?category=culture",
  },
];

export default function OffersStrip() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-12 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {OFFERS.map((o) => (
          <Link
            key={o.label}
            href={o.href}
            className="group relative overflow-hidden flex items-start justify-between gap-3 px-5 py-4 border transition-all duration-250"
            style={{
              background: "rgba(28,14,8,0.03)",
              borderColor: "rgba(107,45,14,0.12)",
            }}
          >
            {/* Red bottom line — grows on hover via group */}
            <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-[#C8392B] transition-all duration-300" />

            {/* Hover bg */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
              style={{ background: "rgba(200,57,43,0.04)" }}
            />

            <div className="relative z-10">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2 block text-[#C8392B]">
                {o.tag}
              </span>
              <p
                className="text-[13px] font-semibold mb-0.5"
                style={{ color: "var(--fg)", fontFamily: "Georgia, serif" }}
              >
                {o.label}
              </p>
              <p className="text-[11px]" style={{ color: "var(--fg-3)" }}>
                {o.desc}
              </p>
            </div>

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="relative z-10 shrink-0 mt-1 text-[#C8392B] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
