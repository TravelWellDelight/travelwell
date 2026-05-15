"use client";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight, Quote } from "lucide-react";
import { use } from "react";

const STORIES = [
  {
    id: "ladakh-road-trip",
    name: "Priya & Rohan Mehta",
    location: "Ladakh, India",
    tripType: "Honeymoon",
    duration: "8 nights",
    rating: 5,
    date: "March 2025",
    headline: "We left as two people. We came back as one soul.",
    excerpt:
      "The Pangong Lake at dawn was something neither of us had words for. TravelWell handled every detail — from the permits to the homestay in Nubra — so we could just be present with each other.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rotate: "-rotate-2",
    accent: "#E8621A",
    tag: "Featured",
  },
  {
    id: "kerala-backwaters",
    name: "The Sharma Family",
    location: "Kerala, India",
    tripType: "Family Holiday",
    duration: "6 nights",
    rating: 5,
    date: "December 2024",
    headline: "Our kids still talk about the houseboat every single day.",
    excerpt:
      "Three generations on one houseboat floating through the backwaters of Alleppey. My mother said it was the most peaceful she had felt in years. That means everything.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    rotate: "rotate-1",
    accent: "#C8392B",
    tag: "Family",
  },
  {
    id: "bali-solo",
    name: "Ananya Krishnan",
    location: "Bali, Indonesia",
    tripType: "Solo Travel",
    duration: "9 nights",
    rating: 5,
    date: "January 2025",
    headline: "Solo travel felt scary. TravelWell made it feel like freedom.",
    excerpt:
      "As a solo woman traveller, I had a hundred fears. But from the airport pickup to the final goodbye, every moment was looked after. Ubud changed me in ways I am still discovering.",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rotate: "rotate-2",
    accent: "#E8621A",
    tag: "Solo",
  },
  {
    id: "dubai-luxury",
    name: "Vikram & Sneha Joshi",
    location: "Dubai, UAE",
    tripType: "Anniversary",
    duration: "5 nights",
    rating: 5,
    date: "February 2025",
    headline: "Desert sunsets and sky-high dinners — pure magic.",
    excerpt:
      "The desert safari at golden hour, dinner at Burj Khalifa, the private beach at sunrise. Every single thing was exactly as promised. This team just gets luxury right.",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    rotate: "-rotate-1",
    accent: "#C8392B",
    tag: "Luxury",
  },
  {
    id: "rajasthan-group",
    name: "The College Reunion Group (14 pax)",
    location: "Rajasthan, India",
    tripType: "Group Tour",
    duration: "7 nights",
    rating: 5,
    date: "November 2024",
    headline: "14 people, zero arguments. TravelWell made it happen.",
    excerpt:
      "Coordinating 14 adults with 14 opinions is impossible — unless you have TravelWell. Jaipur, Jodhpur, and Jaisalmer in one seamless loop. The camel safari was the night none of us will ever forget.",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    rotate: "rotate-1",
    accent: "#E8621A",
    tag: "Group",
  },
  {
    id: "maldives-honeymoon",
    name: "Kabir & Nisha Verma",
    location: "Maldives",
    tripType: "Honeymoon",
    duration: "6 nights",
    rating: 5,
    date: "April 2025",
    headline: "We stepped off the seaplane and forgot the rest of the world.",
    excerpt:
      "The overwater villa, the bioluminescent beach at midnight, the private breakfast on the deck every morning. TravelWell surprised us with upgrades we didn't even ask for. Absolutely extraordinary.",
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rotate: "-rotate-2",
    accent: "#C8392B",
    tag: "Featured",
  },
];

const TRIP_TYPE_COLORS: Record<string, string> = {
  Honeymoon: "#C8392B",
  "Family Holiday": "#E8621A",
  "Solo Travel": "#6B5B45",
  Anniversary: "#C8392B",
  "Group Tour": "#E8621A",
};

export default function BlogPage() {
  const featured = STORIES.filter((s) => s.tag === "Featured");
  const rest = STORIES.filter((s) => s.tag !== "Featured");

  return (
    <main
      style={{ background: "#FDFAF6", minHeight: "100vh" }}
      className="pt-24 pb-32"
    >
      {/* ── PAGE HEADER ── */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#E8621A",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Real stories · Real journeys
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 900,
                color: "#1C0A00",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              Traveller
              <br />
              <span style={{ color: "#E8621A" }}>Stories</span>
            </h1>
          </div>

          <div className="max-w-sm">
            <p
              style={{
                fontSize: "14px",
                color: "#6B5B45",
                lineHeight: 1.7,
              }}
            >
              Every journey leaves a mark. Here are the ones our travellers
              chose to share — unfiltered, unedited, unforgettable.
            </p>
            <div
              className="mt-4 h-px"
              style={{ background: "rgba(107,45,14,0.12)" }}
            />
            <p className="mt-3" style={{ fontSize: "11px", color: "#A8967E" }}>
              {STORIES.length} stories · More added monthly
            </p>
          </div>
        </div>

        {/* Decorative rule */}
        <div className="mt-12 flex items-center gap-4">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(107,45,14,0.1)" }}
          />
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: i === 1 ? "#E8621A" : "rgba(107,45,14,0.2)",
                }}
              />
            ))}
          </div>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(107,45,14,0.1)" }}
          />
        </div>
      </div>

      {/* ── FEATURED STORIES — large polaroid layout ── */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto mb-24">
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A8967E",
            marginBottom: 24,
          }}
        >
          Editor's picks
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((story, idx) => (
            <FeaturedCard key={story.id} story={story} idx={idx} />
          ))}
        </div>
      </div>

      {/* ── PULL QUOTE STRIP ── */}
      <div
        style={{
          background: "#1C0A00",
          padding: "56px 0",
          marginBottom: 80,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(90deg, rgba(232,98,26,0.03) 0px, rgba(232,98,26,0.03) 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div className="px-5 md:px-12 max-w-4xl mx-auto text-center relative z-10">
          <Quote
            size={32}
            strokeWidth={1}
            style={{ color: "#E8621A", margin: "0 auto 20px", opacity: 0.6 }}
          />
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
              color: "#fff",
              lineHeight: 1.35,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            "Travel is not measured in miles, but in moments quietly collected."
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              marginTop: 20,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            — TravelWell Delight · Life Beyond Limitations
          </p>
        </div>
      </div>

      {/* ── REST OF STORIES — polaroid grid ── */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A8967E",
            marginBottom: 32,
          }}
        >
          More journeys
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rest.map((story, idx) => (
            <StoryCard key={story.id} story={story} idx={idx} />
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto mt-28">
        <div
          style={{
            background: "linear-gradient(135deg, #E8621A 0%, #C8392B 100%)",
            padding: "48px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 8,
                }}
              >
                Ready to write your story?
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Your journey deserves
                <br />
                more than just a booking.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/enquiry"
                className="flex items-center gap-2 bg-white text-[#C8392B] text-[11px] font-bold tracking-[0.18em] uppercase px-7 py-3.5 transition-all hover:bg-[#FDFAF6]"
              >
                Plan My Trip
                <ArrowRight size={13} strokeWidth={2} />
              </Link>
              <Link
                href="/packages"
                className="flex items-center gap-2 border border-white/40 text-white text-[11px] font-bold tracking-[0.18em] uppercase px-7 py-3.5 transition-all hover:border-white hover:bg-white/10"
              >
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Featured card — large with rotated polaroid photo ── */
function FeaturedCard({
  story,
  idx,
}: {
  story: (typeof STORIES)[0];
  idx: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(107,45,14,0.1)",
        boxShadow: "0 4px 32px rgba(107,45,14,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Polaroid photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={story.img}
          alt={story.location}
          style={{ width: "100%", height: 300, objectFit: "cover" }}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(28,10,0,0.55) 0%, transparent 60%)",
          }}
        />
        {/* Tag */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: story.accent,
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "4px 10px",
          }}
        >
          {story.tag}
        </div>
        {/* Location on image */}
        <div style={{ position: "absolute", bottom: 16, left: 20 }}>
          <div className="flex items-center gap-1.5">
            <MapPin
              size={11}
              strokeWidth={1.5}
              style={{ color: "rgba(255,255,255,0.7)" }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.08em",
              }}
            >
              {story.location}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: story.accent,
                fontWeight: 700,
              }}
            >
              {story.tripType}
            </span>
            <span style={{ color: "rgba(107,45,14,0.2)", fontSize: 10 }}>
              ·
            </span>
            <div className="flex items-center gap-1">
              <Clock size={10} strokeWidth={1.5} style={{ color: "#A8967E" }} />
              <span style={{ fontSize: "11px", color: "#A8967E" }}>
                {story.duration}
              </span>
            </div>
          </div>
          {/* Stars */}
          <div className="flex gap-0.5">
            {[...Array(story.rating)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className="fill-[#E8621A] text-[#E8621A]"
              />
            ))}
          </div>
        </div>

        {/* Headline */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 800,
            color: "#1C0A00",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: 12,
          }}
        >
          "{story.headline}"
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "13px",
            color: "#6B5B45",
            lineHeight: 1.75,
            marginBottom: 20,
          }}
        >
          {story.excerpt}
        </p>

        {/* Author */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(107,45,14,0.08)" }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#1C0A00",
              }}
            >
              {story.name}
            </p>
            <p style={{ fontSize: "10px", color: "#A8967E", marginTop: 2 }}>
              {story.date}
            </p>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              background: `${story.accent}15`,
              border: `1px solid ${story.accent}30`,
            }}
          >
            <Quote
              size={14}
              strokeWidth={1.5}
              style={{ color: story.accent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Story card — compact polaroid style ── */
function StoryCard({
  story,
  idx,
}: {
  story: (typeof STORIES)[0];
  idx: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "10px 10px 20px",
        boxShadow:
          "0 6px 32px rgba(107,45,14,0.1), 0 1px 4px rgba(107,45,14,0.06)",
        transform: `rotate(${story.rotate.includes("-") ? "-1.5deg" : "1.5deg"})`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "rotate(0deg) translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 16px 48px rgba(107,45,14,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          `rotate(${story.rotate.includes("-") ? "-1.5deg" : "1.5deg"})`;
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 6px 32px rgba(107,45,14,0.1), 0 1px 4px rgba(107,45,14,0.06)";
      }}
    >
      {/* Polaroid image */}
      <div
        style={{ position: "relative", overflow: "hidden", marginBottom: 14 }}
      >
        <img
          src={story.img}
          alt={story.location}
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Trip type pill */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            background: story.accent,
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "3px 8px",
          }}
        >
          {story.tripType}
        </div>
      </div>

      {/* Polaroid caption area */}
      <div style={{ padding: "0 6px" }}>
        {/* Location + date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <MapPin size={10} strokeWidth={1.5} style={{ color: "#A8967E" }} />
            <span style={{ fontSize: "10px", color: "#A8967E" }}>
              {story.location}
            </span>
          </div>
          <span style={{ fontSize: "10px", color: "#A8967E" }}>
            {story.date}
          </span>
        </div>

        {/* Headline */}
        <p
          className="font-display"
          style={{
            fontSize: "15px",
            fontWeight: 800,
            color: "#1C0A00",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}
        >
          "{story.headline}"
        </p>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "12px",
            color: "#6B5B45",
            lineHeight: 1.65,
            marginBottom: 14,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {story.excerpt}
        </p>

        {/* Author + stars */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(107,45,14,0.08)" }}
        >
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#1C0A00" }}>
            {story.name}
          </p>
          <div className="flex gap-0.5">
            {[...Array(story.rating)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className="fill-[#E8621A] text-[#E8621A]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
