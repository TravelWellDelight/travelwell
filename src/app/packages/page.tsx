import { packages } from "@/data/packages";
import PackageGrid from "@/components/packages/PackageGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tours",
  description: "Browse all curated travel packages — India and international destinations handcrafted by TravelWell.",
};

export default function PackagesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-red mb-3">Explore</p>
          <h1
            className="font-display font-black text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            All Tours
          </h1>
          <p className="text-[14px] text-white/50 max-w-lg">
            {packages.length} handcrafted packages across India and the world. Real itineraries, real photography, zero compromise.
          </p>
        </div>
      </section>

      <PackageGrid packages={packages} />
    </>
  );
}
