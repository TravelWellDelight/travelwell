"use client";

import { useEffect, useState, useRef } from "react";

// ── colour tokens from the TravelWell doc ──────────────────────────────────
const C = {
  red: "#C8392B",
  dark: "#1C0A00",
  grey: "#6B5B45",
  cream: "#FDF6ED",
  border: "#E8DCCB",
  amber: "#BA7517",
} as const;

// ── countdown target: 30 days from first render ────────────────────────────
function getLaunchDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  d.setHours(0, 0, 0, 0);
  return d;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface TimeLeft {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

function useCountdown(target: Date): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: pad(Math.floor(diff / 86_400_000)),
      hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
      mins: pad(Math.floor((diff % 3_600_000) / 60_000)),
      secs: pad(Math.floor((diff % 60_000) / 1_000)),
    };
  };
  const [t, setT] = useState<TimeLeft>(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1_000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ── sub-components ─────────────────────────────────────────────────────────

function BlinkDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: C.amber,
        animation: "tw-blink 1.6s ease infinite",
      }}
    />
  );
}

function CountdownCell({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "18px 8px 14px",
        borderRight: `1px solid rgba(232,220,203,0.1)`,
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "'Playfair Display', serif",
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1,
          color: C.cream,
          marginBottom: 4,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: C.grey,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────

export default function NotFound() {
  const launchRef = useRef(getLaunchDate());
  const time = useCountdown(launchRef.current);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe() {
    if (!email.trim() || !email.includes("@")) return;
    // TODO: wire up to your actual mailing-list API here
    setSubmitted(true);
  }

  // ── keyframe injection (runs once on mount) ──
  useEffect(() => {
    const id = "tw-404-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes tw-up   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
    `;
    document.head.appendChild(style);
  }, []);

  // ── animation helper ──
  const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `tw-up 0.7s ${delay}s ease both`,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.dark,
        color: C.cream,
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* ── Background layers ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(232,220,203,0.04) 80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(200,57,43,0.18) 0%, transparent 70%)",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 580,
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.amber,
            fontWeight: 500,
            border: `1px solid rgba(186,117,23,0.35)`,
            borderRadius: 2,
            padding: "7px 18px",
            marginBottom: "2.5rem",
            ...fadeUp(0),
          }}
        >
          <BlinkDot />
          Stay tuned
        </div>

        {/* 404 */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(110px, 20vw, 170px)",
            fontWeight: 700,
            lineHeight: 0.85,
            color: C.red,
            letterSpacing: "-0.02em",
            textShadow: "0 0 80px rgba(200,57,43,0.3)",
            marginBottom: "0.5rem",
            ...fadeUp(0.08),
          }}
        ></div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4.5vw, 38px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: C.cream,
            lineHeight: 1.25,
            marginBottom: "1rem",
            ...fadeUp(0.2),
          }}
        >
          Something extraordinary
          <br />
          is on its way.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 14,
            color: C.grey,
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: "2.5rem",
            ...fadeUp(0.26),
          }}
        >
          This page took an unplanned detour — but great things are being built
          here.
          <br />
          Leave your email and we&apos;ll make sure you&apos;re first to know.
        </p>

        {/* Countdown */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            border: `1px solid rgba(232,220,203,0.12)`,
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: "2.5rem",
            ...fadeUp(0.32),
          }}
        >
          <CountdownCell value={time.days} label="Days" />
          <CountdownCell value={time.hours} label="Hours" />
          <CountdownCell value={time.mins} label="Mins" />
          <CountdownCell value={time.secs} label="Secs" />
        </div>

        {/* Email form */}
        {!submitted ? (
          <div
            style={{
              display: "flex",
              border: `1px solid rgba(232,220,203,0.18)`,
              borderRadius: 3,
              overflow: "hidden",
              marginBottom: "1rem",
              ...fadeUp(0.38),
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              style={{
                flex: 1,
                background: "rgba(253,246,237,0.04)",
                border: "none",
                padding: "13px 18px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: C.cream,
                outline: "none",
              }}
            />
            <button
              onClick={handleSubscribe}
              style={{
                background: C.red,
                border: "none",
                padding: "13px 22px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: C.cream,
                cursor: "pointer",
                letterSpacing: "0.06em",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#a82d21")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  C.red)
              }
            >
              Notify me →
            </button>
          </div>
        ) : (
          <p
            style={{
              fontSize: 13,
              color: C.amber,
              letterSpacing: "0.04em",
              marginBottom: "1rem",
              animation: "tw-up 0.4s ease both",
            }}
          >
            ✦ You&apos;re on the list — see you at launch.
          </p>
        )}

        {/* Footer tag */}
        <div
          style={{
            marginTop: "3rem",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(107,91,69,0.4)",
            ...fadeUp(0.44),
          }}
        >
          TravelWell Delight &nbsp;·&nbsp;{" "}
          <span style={{ color: C.red }}>Life Beyond Limitations</span>
        </div>
      </div>
    </div>
  );
}
