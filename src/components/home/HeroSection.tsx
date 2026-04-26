"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    location: "Ladakh, India",
    headline: ["Welcome to your", "WonderLand"],
  },
  {
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80",
    location: "Kerala, India",
    headline: ["Float through", "Paradise"],
  },
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    location: "Bali, Indonesia",
    headline: ["Sacred temples,", "Volcano treks"],
  },
];

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const t = setInterval(() => setCur((c) => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[cur];

  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden">
      {/* Background images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: cur === i ? 1 : 0 }}
        >
          <img
            src={s.img}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-[#0C0B09]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Slide number — right side vertical */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className={`text-[11px] font-mono transition-all ${cur === i ? "text-white font-bold" : "text-white/25 hover:text-white/60"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Location tag */}
      <div
        className={`absolute top-20 left-5 md:left-12 z-20 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/40">
          {slide.location}
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            className={`text-[11px] tracking-[0.25em] uppercase text-white/40 mb-3 transition-all duration-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            {slide.headline[0]}
          </p>
          {/* Headline */}
          <h1
            className={`font-display text-white font-black leading-[0.93] mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              letterSpacing: "-0.025em",
              transitionDelay: "180ms",
            }}
          >
            {slide.headline[1]}
          </h1>
          {/* Sub */}
          <p
            className={`text-[14px] text-white/55 leading-relaxed max-w-md mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            We craft tours in India and beyond that guarantee the discovery of a
            new reality with TravelWell Delight.
          </p>
          {/* CTA row */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "420ms" }}
          >
            <Link
              href="/packages"
              className="bg-[#C8392B] hover:bg-[#A52E22] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-7 py-3.5 transition-colors"
            >
              Explore Tours
            </Link>
            <Link
              href="/planner"
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/20 pb-0.5"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-5 md:left-12 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className={`rounded-full transition-all duration-300 ${cur === i ? "w-7 h-1.5 bg-[#C8392B]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/20">
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
