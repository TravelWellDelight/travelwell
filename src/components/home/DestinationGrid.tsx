"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { Destination } from "@/types/package";

interface Props {
  destinations: Destination[];
}

export default function DestinationGrid({ destinations }: Props) {
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
      { threshold: 0.1 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const featured = destinations.slice(0, 5);

  return (
    <section ref={ref} className="mt-0 w-full bg-[#f5f4f3] py-16">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        {/* HEADER */}
        <div
          className="flex items-end justify-between mb-10"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: "all .6s ease",
          }}
        >
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C8392B] mb-2">
              Get to know
            </p>

            <h2
              className="font-display font-bold text-[#2B2B2B]"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Popular Destinations
            </h2>
          </div>

          <Link
            href="/destinations"
            className="text-[11px] tracking-[0.12em] uppercase text-[#6B5E4B] hover:text-[#2B2B2B] transition-colors"
          >
            All Destinations →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8">
          {/* BIG CARD */}
          {featured[0] && (
            <DestCard dest={featured[0]} height="420px" vis={vis} delay={0} />
          )}

          {/* STACK 1 */}
          <div className="flex flex-col gap-5 lg:gap-8">
            {featured[1] && (
              <DestCard
                dest={featured[1]}
                height="200px"
                vis={vis}
                delay={80}
              />
            )}
            {featured[2] && (
              <DestCard
                dest={featured[2]}
                height="200px"
                vis={vis}
                delay={160}
              />
            )}
          </div>

          {/* STACK 2 */}
          <div className="hidden md:flex flex-col gap-5 lg:gap-8">
            {featured[3] && (
              <DestCard
                dest={featured[3]}
                height="200px"
                vis={vis}
                delay={240}
              />
            )}
            {featured[4] && (
              <DestCard
                dest={featured[4]}
                height="200px"
                vis={vis}
                delay={320}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= */
/* DESTINATION CARD */
/* ========================= */

function DestCard({
  dest,
  height,
  vis,
  delay,
}: {
  dest: Destination;
  height: string;
  vis: boolean;
  delay: number;
}) {
  return (
    <Link
      href={`/packages?destination=${dest.slug}`}
      className="group relative overflow-hidden block rounded-2xl"
      style={{
        height,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {/* IMAGE */}
      <img
        src={dest.image}
        alt={dest.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] tracking-[0.18em] uppercase text-white/80 mb-1">
          {dest.country}
        </p>

        <h3
          className="font-display font-bold text-white"
          style={{
            fontSize: height === "420px" ? "1.6rem" : "1.1rem",
          }}
        >
          {dest.name}
        </h3>

        {height === "420px" && (
          <p className="text-[12px] text-white/80 mt-1">{dest.tagline}</p>
        )}

        {/* HOVER CTA */}
        <p className="text-[10px] text-[#C8392B] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore → ({dest.packageCount} tours)
        </p>
      </div>
    </Link>
  );
}
