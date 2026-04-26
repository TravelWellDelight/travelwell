"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Clock, Users, Star } from "lucide-react";
import type { Package } from "@/types/package";
import { formatPrice, discountPercent } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = ["All", "Honeymoon", "Adventure", "Culture", "Nature", "International", "Family"];

export default function PackageGrid({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScrollReveal(ref);

  const filtered = active === "All"
    ? packages
    : packages.filter((p) => p.category.some((c) => c.toLowerCase() === active.toLowerCase()));

  return (
    <section ref={ref} className="py-12 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[11px] font-medium tracking-[0.12em] uppercase px-5 py-2 border transition-all duration-200 whitespace-nowrap ${
                active === cat
                  ? "bg-brand-red border-brand-red text-white"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pkg, i) => (
            <GridCard key={pkg.id} pkg={pkg} index={i} visible={visible} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <p className="text-lg">No packages in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function GridCard({ pkg, index, visible }: { pkg: Package; index: number; visible: boolean }) {
  const discount = pkg.price.originalPrice
    ? discountPercent(pkg.price.originalPrice, pkg.price.perPerson)
    : 0;

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group bg-[#111] border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, translate 0.3s",
        transitionDelay: `${Math.min(index, 5) * 70}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.images.hero}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 flex items-center gap-1">
            <Clock size={9} /> {pkg.duration.nights}N/{pkg.duration.days}D
          </span>
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 flex items-center gap-1">
            <Users size={9} /> {pkg.groupSize.min}–{pkg.groupSize.max}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red mb-1">{pkg.destination}</p>
        <h3 className="font-display font-bold text-white text-xl mb-1 leading-snug">{pkg.title}</h3>
        <p className="text-[12px] text-white/40 mb-4 line-clamp-2">{pkg.tagline}</p>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            {pkg.price.originalPrice && (
              <p className="text-[10px] text-white/25 line-through">{formatPrice(pkg.price.originalPrice)}</p>
            )}
            <p className="font-bold text-white">
              {formatPrice(pkg.price.perPerson)}
              <span className="text-[10px] font-normal text-white/30 ml-1">/ person</span>
            </p>
          </div>
          {pkg.rating && (
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              {pkg.rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
