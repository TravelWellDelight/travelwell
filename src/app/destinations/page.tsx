"use client";
import { useEffect, useState } from "react";
import { getFeaturedDestinations } from "@/data/destinations";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const REGIONS = [
  "All",
  "India",
  "Southeast Asia",
  "Europe",
  "Indian Ocean",
  "East Asia",
];

export default function DestinationsPage() {
  const all = getFeaturedDestinations();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? all
      : all.filter((d) => d.country === active || d.region === active);

  // Fix navbar on light page
  useEffect(() => {
    const nav = document.querySelector("header") as HTMLElement;
    if (!nav) return;
    nav.style.background = "rgba(255,255,255,0.97)";
    nav.style.backdropFilter = "blur(8px)";
    nav.style.borderBottom = "1px solid rgba(107,45,14,0.10)";
    const links = nav.querySelectorAll("a, button") as NodeListOf<HTMLElement>;
    links.forEach((el) => {
      el.dataset.origColor = el.style.color;
      el.style.color = "#1C0A00";
    });
    return () => {
      nav.style.background = "";
      nav.style.backdropFilter = "";
      nav.style.borderBottom = "";
      links.forEach((el) => {
        el.style.color = el.dataset.origColor || "";
      });
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-28 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#C8392B] mb-3">
            Explore
          </p>
          <h1
            className="font-display font-black mb-6"
            style={{
              fontSize: "clamp(2.5rem,6vw,4rem)",
              letterSpacing: "-0.025em",
              color: "var(--fg)",
            }}
          >
            All Destinations
          </h1>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setActive(r)}
                className="text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-2 transition-all duration-200"
                style={{
                  background: active === r ? "#C8392B" : "transparent",
                  color: active === r ? "#fff" : "var(--fg-2)",
                  border: `1px solid ${active === r ? "#C8392B" : "var(--bd)"}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "var(--bd)" }} />

        {/* Destination cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <DestCard key={d.id} dest={d} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[13px]" style={{ color: "var(--fg-3)" }}>
              No destinations found for this region.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DestCard({ dest }: { dest: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/packages?destination=${dest.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block overflow-hidden"
      style={{
        background: "var(--bg-2)",
        border: `1px solid ${hovered ? "rgba(200,57,43,0.25)" : "var(--bd)"}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(200,57,43,0.12), 0 4px 12px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Trending badge */}
        {dest.trending && (
          <span className="absolute top-3 left-3 bg-[#C8392B] text-white text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
            Trending
          </span>
        )}

        {/* Package count */}
        {dest.packageCount && (
          <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 flex items-center gap-1">
            <MapPin size={9} strokeWidth={1.5} />
            {dest.packageCount} packages
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[9px] tracking-[0.22em] uppercase text-[#C8392B] mb-1">
          {dest.country}
        </p>
        <h2
          className="font-display font-bold text-[1.1rem] leading-snug mb-1 transition-colors duration-200"
          style={{ color: hovered ? "#C8392B" : "var(--fg)" }}
        >
          {dest.name}
        </h2>
        <p className="text-[11px] mb-4" style={{ color: "var(--fg-3)" }}>
          {dest.tagline}
        </p>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--bd)" }}
        >
          <span className="text-[11px]" style={{ color: "var(--fg-3)" }}>
            {dest.packageCount
              ? `${dest.packageCount} curated packages`
              : "View packages"}
          </span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-all duration-300"
            style={{
              color: "#C8392B",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}
