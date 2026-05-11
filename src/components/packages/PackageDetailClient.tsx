"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  Star,
  X,
  MessageCircle,
  Plane,
  Hotel,
  Utensils,
  Car,
  Compass,
  Ship,
  Backpack,
  Camera,
  Wifi,
  Shield,
  Zap,
  Check,
  Mountain,
  Waves,
  TreePine,
  Globe,
} from "lucide-react";
import type { Package } from "@/types/package";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

// ── Icon resolver — returns a Lucide component based on inclusion text ──
function getInclusionIcon(label: string) {
  const l = label.toLowerCase();

  if (l.includes("flight") || l.includes("air") || l.includes("return"))
    return <Plane size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("hotel") ||
    l.includes("stay") ||
    l.includes("villa") ||
    l.includes("resort") ||
    l.includes("houseboat") ||
    l.includes("ryokan")
  )
    return <Hotel size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("breakfast") ||
    l.includes("dinner") ||
    l.includes("meal") ||
    l.includes("lunch") ||
    l.includes("food") ||
    l.includes("inclusive")
  )
    return <Utensils size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("transfer") ||
    l.includes("airport") ||
    l.includes("vehicle") ||
    l.includes("cab") ||
    l.includes("transport")
  )
    return <Car size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (l.includes("guide") || l.includes("local") || l.includes("expert"))
    return <Compass size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("cruise") ||
    l.includes("boat") ||
    l.includes("ferry") ||
    l.includes("speedboat") ||
    l.includes("seaplane")
  )
    return <Ship size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("trek") ||
    l.includes("hike") ||
    l.includes("safari") ||
    l.includes("adventure") ||
    l.includes("activity")
  )
    return <Backpack size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (l.includes("photo") || l.includes("camera") || l.includes("shoot"))
    return <Camera size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (l.includes("wifi") || l.includes("internet") || l.includes("sim"))
    return <Wifi size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("insurance") ||
    l.includes("cover") ||
    l.includes("protection")
  )
    return <Shield size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("rail") ||
    l.includes("train") ||
    l.includes("pass") ||
    l.includes("bullet")
  )
    return <Zap size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("mountain") ||
    l.includes("glacier") ||
    l.includes("peak") ||
    l.includes("summit")
  )
    return <Mountain size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("beach") ||
    l.includes("ocean") ||
    l.includes("sea") ||
    l.includes("snorkel") ||
    l.includes("dive") ||
    l.includes("reef")
  )
    return <Waves size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("forest") ||
    l.includes("jungle") ||
    l.includes("nature") ||
    l.includes("park") ||
    l.includes("sanctuary")
  )
    return <TreePine size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
  if (
    l.includes("visa") ||
    l.includes("international") ||
    l.includes("country") ||
    l.includes("passport")
  )
    return <Globe size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;

  // Default fallback
  return <Check size={16} strokeWidth={1.5} className="text-[#d4af6e]" />;
}

export default function PackageDetailClient({ pkg }: { pkg: Package }) {
  const [activeDay, setActiveDay] = useState(0);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const includesRef = useRef<HTMLDivElement>(null);
  const enquiryRef = useRef<HTMLDivElement>(null);
  const itineraryVisible = useScrollReveal(itineraryRef);
  const includesVisible = useScrollReveal(includesRef);
  const enquiryVisible = useScrollReveal(enquiryRef);

  const waMessage = `Hi! I'm interested in the ${pkg.title} package (${pkg.duration.nights}N/${pkg.duration.days}D). Could you share more details?`;

  return (
    <article className="bg-[#0A0A0A] min-h-screen">
      {/* ── HERO ── */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <img
          src={pkg.images.hero}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-14 pt-5 z-20">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="TravelWell Delight"
              width={110}
              height={40}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["About", "Included", "Contacts"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[11px] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>
          <Link
            href={`/booking/${pkg.id}`}
            className="bg-[#d4af6e] text-[#080808] text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-2.5 hover:bg-[#f0d898] transition-colors"
          >
            Book
          </Link>
        </div>

        {/* Giant faded destination watermark */}
        <div className="absolute top-16 left-6 md:left-14 z-10 pointer-events-none select-none">
          <h1
            className="font-display font-black text-white leading-none"
            style={{
              fontSize: "clamp(4rem, 15vw, 11rem)",
              letterSpacing: "-0.03em",
              opacity: 0.1,
            }}
          >
            {pkg.destination.toUpperCase()}
          </h1>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute top-24 left-6 md:left-14 z-20 flex gap-3">
          {pkg.images.gallery.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="w-20 h-16 md:w-28 md:h-20 overflow-hidden border border-white/20"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Bottom stat pills */}
        <div className="absolute bottom-[140px] left-6 md:left-14 z-20 flex flex-wrap gap-6 items-end">
          {[
            { label: pkg.destination, sub: "destination" },
            { label: `${pkg.duration.days} days`, sub: "duration" },
            { label: `${pkg.duration.nights} nights`, sub: "nights" },
            { label: `Up to ${pkg.groupSize.max}`, sub: "group size" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-white font-semibold text-sm leading-tight">
                {s.label}
              </p>
              <p className="text-white/40 text-[10px] leading-tight">{s.sub}</p>
            </div>
          ))}
          <Link
            href={`/booking/${pkg.id}`}
            className="ml-4 border border-white/30 text-white text-[11px] tracking-[0.15em] uppercase px-6 py-2 hover:bg-white hover:text-black transition-all"
          >
            Book Now
          </Link>
        </div>

        {/* Price + rating bottom right */}
        <div className="absolute bottom-[140px] right-6 md:right-14 z-20 text-right">
          <p className="text-[11px] text-white/40 mb-1">from</p>
          <p className="font-display font-black text-white text-3xl"></p>
          <p className="text-[11px] text-white/40">per person</p>
          {pkg.rating && (
            <div className="flex items-center justify-end gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    i < Math.floor(pkg.rating!)
                      ? "text-[#d4af6e] fill-[#d4af6e]"
                      : "text-white/20"
                  }
                />
              ))}
              <span className="text-[11px] text-white/40 ml-1">
                ({pkg.reviewCount})
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT THE TOUR ── */}
      <section
        id="about"
        ref={itineraryRef}
        className="py-20 px-6 md:px-14 max-w-6xl mx-auto"
      >
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            itineraryVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex-1 h-px bg-white/10" />
          <h2 className="font-display font-black text-white text-3xl md:text-4xl tracking-tight whitespace-nowrap">
            ABOUT THE TOUR
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: intro */}
          <div
            className={`transition-all duration-700 ${
              itineraryVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <p className="text-[14px] text-white/60 leading-relaxed mb-6">
              We've planned a seamless {pkg.duration.days}-day itinerary for
              your trip to {pkg.destination}. Every detail is curated — not
              cobbled together.
            </p>
            <p className="text-[14px] text-white/40 leading-relaxed">
              No need to worry about routes, schedules, or finding places —
              everything is already organised. We'll show you where to go, what
              to see, and how to eat. So you can simply enjoy the journey.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {pkg.category.map((c) => (
                <span
                  key={c}
                  className="text-[10px] tracking-[0.15em] uppercase border border-white/10 text-white/40 px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
            {pkg.itinerary.map((day, i) => (
              <div
                key={day.day}
                className={`relative pl-10 mb-8 cursor-pointer transition-all duration-500 ${
                  itineraryVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
                onClick={() => setActiveDay(i)}
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeDay === i
                      ? "border-[#d4af6e] bg-[#d4af6e]"
                      : "border-white/20 bg-[#0A0A0A]"
                  }`}
                >
                  <span
                    className={`text-[8px] font-bold ${activeDay === i ? "text-[#080808]" : "text-white"}`}
                  >
                    {day.day}
                  </span>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        activeDay === i ? "text-white" : "text-white/60"
                      }`}
                    >
                      Day {day.day} — {day.title}
                    </p>
                    {activeDay === i && (
                      <p className="text-[12px] text-white/40 mt-1 leading-relaxed">
                        {day.description}
                      </p>
                    )}
                  </div>
                  {pkg.images.gallery[i % pkg.images.gallery.length] && (
                    <div className="w-20 h-14 shrink-0 overflow-hidden border border-white/10">
                      <img
                        src={pkg.images.gallery[i % pkg.images.gallery.length]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section
        id="included"
        ref={includesRef}
        className="py-16 px-6 md:px-14 max-w-6xl mx-auto"
      >
        <div
          className={`flex items-center gap-4 mb-12 transition-all duration-700 ${
            includesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex-1 h-px bg-white/10" />
          <h2 className="font-display font-black text-white text-3xl md:text-4xl tracking-tight whitespace-nowrap">
            WHAT'S INCLUDED
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Inclusion cards */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 transition-all duration-700 ${
            includesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {pkg.inclusions.slice(0, 8).map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/[0.06] p-4 hover:border-[#d4af6e]/20 transition-colors group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Lucide icon rendered here */}
              <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                {getInclusionIcon(item)}
              </div>
              <p className="text-[12px] text-white/60 leading-snug">{item}</p>
            </div>
          ))}
        </div>

        {/* Exclusions */}
        <div
          className={`transition-all duration-700 ${
            includesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">
            Not Included
          </p>
          <div className="flex flex-wrap gap-3">
            {pkg.exclusions.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-[12px] text-white/30 border border-white/[0.06] px-3 py-1.5"
              >
                <X
                  size={11}
                  strokeWidth={1.5}
                  className="text-red-400/60 flex-shrink-0"
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY / CTA ── */}
      <section
        id="contacts"
        ref={enquiryRef}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={
              pkg.images.gallery[pkg.images.gallery.length - 1] ||
              pkg.images.hero
            }
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              enquiryVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-display font-black text-white text-3xl md:text-4xl leading-tight mb-3">
              Want to join us,
              <br />
              <span className="text-white/40">but still have questions?</span>
            </h2>
            <p className="text-[14px] text-white/50 mb-6">
              Leave a request and our team will get back to you within 4 hours.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Clock size={13} strokeWidth={1.5} />
                {pkg.duration.nights}N / {pkg.duration.days}D
              </span>
              <span className="flex items-center gap-2">
                <Users size={13} strokeWidth={1.5} />
                Up to {pkg.groupSize.max} people
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={13} strokeWidth={1.5} />
                {pkg.destination}
              </span>
            </div>
          </div>

          {/* Right: mini enquiry form */}
          <EnquiryMiniForm pkg={pkg} visible={enquiryVisible} />
        </div>
      </section>
    </article>
  );
}

// ── Mini enquiry form ──
function EnquiryMiniForm({ pkg, visible }: { pkg: Package; visible: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: `${form.phone}@enquiry.travelwell.in`,
          packageId: pkg.id,
          packageTitle: pkg.title,
          message: form.comment || `Interested in ${pkg.title}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: "150ms" }}
    >
      {status === "sent" ? (
        <div className="bg-[#111] border border-emerald-500/30 p-8 text-center">
          <div className="w-12 h-12 rounded-full border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
            <Check size={20} strokeWidth={1.5} className="text-emerald-400" />
          </div>
          <p className="text-white font-semibold">Request received!</p>
          <p className="text-white/40 text-sm mt-1">
            We'll reach out within 4 hours.
          </p>
        </div>
      ) : (
        <div className="bg-[#0D0D0D] border border-white/[0.08] p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
            Leave a request
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] text-white text-sm px-4 py-3 placeholder-white/20 outline-none focus:border-white/20 transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] text-white text-sm px-4 py-3 placeholder-white/20 outline-none focus:border-white/20 transition-colors"
            />
            <textarea
              rows={3}
              placeholder="Comment (optional)"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] text-white text-sm px-4 py-3 placeholder-white/20 outline-none focus:border-white/20 transition-colors resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.phone || status === "sending"}
              className="bg-[#d4af6e] text-[#080808] text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 hover:bg-[#f0d898] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Request"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-[11px] text-center">
                Something went wrong. Please try WhatsApp instead.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
