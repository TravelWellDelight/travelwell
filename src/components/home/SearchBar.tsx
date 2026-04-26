"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (date) params.set("date", date);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="relative z-30 px-5 md:px-12 max-w-5xl mx-auto -mt-7">
      {/* Floating pill label above bar */}
      <div className="flex justify-center mb-3">
        <span
          className="text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(20,14,10,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Find your perfect journey
        </span>
      </div>

      {/* Search bar */}
      <div
        className="overflow-hidden"
        style={{
          background: "rgba(18,12,8,0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(200,57,43,0.30)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,57,43,0.08)",
        }}
      >
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Destination input */}
          <div
            className="flex items-center gap-4 flex-1 px-6 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <MapPin
              size={15}
              strokeWidth={1.5}
              className="shrink-0"
              style={{ color: "#C8392B" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] tracking-[0.22em] uppercase mb-1.5"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Destination
              </p>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Where do you want to go?"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent w-full outline-none"
                style={{ fontSize: "13px", color: "#fff" }}
              />
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Date input */}
          <div
            className="flex items-center gap-4 px-6 py-5 md:w-60"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Calendar
              size={15}
              strokeWidth={1.5}
              className="shrink-0"
              style={{ color: "#C8392B" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] tracking-[0.22em] uppercase mb-1.5"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Travel dates
              </p>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="13/05/25 — 18/05/25"
                className="bg-transparent w-full outline-none"
                style={{ fontSize: "13px", color: "#fff" }}
              />
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2.5 transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: "#C8392B",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "20px 36px",
              minWidth: "180px",
              fontFamily: "var(--font-sans, DM Sans, sans-serif)",
            }}
          >
            <Search size={13} strokeWidth={2} />
            Search Tour
          </button>
        </div>
      </div>
    </div>
  );
}
