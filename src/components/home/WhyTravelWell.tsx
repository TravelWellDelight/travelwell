"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const WHY = [
  {
    icon: "✦",
    title: "Curated, not aggregated",
    body: "Every itinerary is handcrafted. Real photography, real days, real experiences — not scraped API data.",
  },
  {
    icon: "◈",
    title: "AI trip planner",
    body: 'Type "5 days Kerala honeymoon ₹30k" and get a full itinerary. No comparable tool on any Indian platform.(launching soon)',
  },
  {
    icon: "◉",
    title: "Visa readiness score",
    body: "4 questions before you book. Know your eligibility, required docs and processing time upfront.",
  },
  {
    icon: "◫",
    title: "WhatsApp-first",
    body: "Every package has a pre-filled WhatsApp CTA. India's buyers trust conversations more than forms.",
  },
];

export default function WhyTravelWell() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 mt-4 overflow-hidden bg-[#f5f4f3]"
    >
      {/* Background Image (more visible now) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=75"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        {/* LIGHT overlay instead of dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f4f3]/90 via-[#f5f4f3]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* LEFT */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(20px)",
              transition: "all .7s ease",
            }}
          >
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C8392B] mb-3">
              Discover the world
            </p>

            <h2
              className="font-display font-black text-[#2B2B2B] mb-5"
              style={{
                fontSize: "clamp(2rem,5vw,3.2rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Discover the
              <br />
              World in a<br />
              <span className="text-[#C8392B]">New Way</span>
            </h2>

            <blockquote className="border-l-2 border-[#C8392B] pl-4 mb-8">
              <p className="text-[13px] text-[#6B5E4B] leading-relaxed italic">
                "Attachment to things and comfort is the main obstacle to an
                interesting life. At any time you can throw anything out of your
                lives. Anytime."
              </p>
              <cite className="text-[10px] text-[#6B5E4B]/70 mt-2 block not-italic">
                — Carlos Castaneda
              </cite>
            </blockquote>

            <div className="flex gap-3">
              <Link
                href="/packages"
                className="bg-[#C8392B] hover:bg-[#b38755] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 transition-colors"
              >
                Choose a Package
              </Link>

              <Link
                href="/about"
                className="border border-[#E8DCCB] text-[#2B2B2B] text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#2B2B2B] hover:text-white transition-all"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="bg-white/60 backdrop-blur-md border border-[#E8DCCB] p-5 hover:shadow-md transition-all"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(20px)",
                  transition: `all .6s ease ${120 + i * 80}ms`,
                }}
              >
                <span className="text-[#C8392B] text-xl mb-3 block">
                  {w.icon}
                </span>

                <p className="text-[12px] font-semibold text-[#2B2B2B] mb-1.5 leading-snug">
                  {w.title}
                </p>

                <p className="text-[11px] text-[#6B5E4B] leading-relaxed">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
