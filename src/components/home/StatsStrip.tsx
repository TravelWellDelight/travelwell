"use client";
import { useRef, useEffect, useState } from "react";

const STATS = [
  {
    end: 150,
    label: "Travellers",
    format: (n: number) => n.toLocaleString("en-IN") + "+",
  },
  {
    end: 1800,
    label: "Tours completed",
    format: (n: number) => n.toLocaleString("en-IN") + "+",
  },
  { end: 100, label: "Handcrafted", format: (n: number) => String(n) + "%" },
  { end: 8, label: "Years of craft", format: (n: number) => String(n) },
];

function Counter({
  end,
  format,
  active,
}: {
  end: number;
  format: (n: number) => string;
  active: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const dur = 1800;
    const step = end / (dur / 16);
    const t = setInterval(() => {
      start = Math.min(start + step, end);
      setVal(Math.floor(start));
      if (start >= end) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [end, active]);
  return <>{active ? format(val) : "0"}</>;
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-14 border-y mt-16"
      style={{ borderColor: "var(--bd)", background: "var(--bg-2)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <p
              className="font-display font-black mb-1"
              style={{
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                letterSpacing: "-0.02em",
                color: "#C8392B",
              }}
            >
              <Counter end={s.end} format={s.format} active={visible} />
            </p>
            <p
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ color: "var(--fg-2)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
