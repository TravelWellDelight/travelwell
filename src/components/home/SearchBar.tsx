"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Calendar,
  ChevronDown,
  X,
  Plane,
  Hotel,
  Package,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { packages } from "@/data/packages";
import Portal from "@/components/ui/Portal";

const PACKAGE_INDEX = packages.map((p) => ({
  slug: p.slug,
  title: p.title,
  destination: p.destination,
  keywords: [
    p.destination,
    p.title,
    p.region,
    ...p.destination.split(/[\s,&]+/),
    ...p.title.split(/[\s,&]+/),
  ]
    .map((k) => k.toLowerCase().trim())
    .filter(Boolean),
}));

const PACKAGE_DESTINATIONS = new Set(
  packages.map((p) => p.destination.toLowerCase()),
);

const GLOBAL_LOCATIONS = [
  "Agra",
  "Ahmedabad",
  "Ajmer",
  "Alleppey",
  "Amritsar",
  "Andaman",
  "Andaman & Nicobar",
  "Auli",
  "Aurangabad",
  "Ayodhya",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Bodh Gaya",
  "Chandigarh",
  "Chennai",
  "Cherrapunji",
  "Coorg",
  "Coimbatore",
  "Darjeeling",
  "Darjeeling & Sikkim",
  "Dehradun",
  "Delhi",
  "Diu",
  "Dwarka",
  "Goa",
  "Gokarna",
  "Gorakhpur",
  "Guwahati",
  "Hampi",
  "Haridwar",
  "Hyderabad",
  "Jaipur",
  "Jaisalmer",
  "Jodhpur",
  "Jammu",
  "Jim Corbett",
  "Kanyakumari",
  "Kasol",
  "Kaziranga",
  "Kerala",
  "Khajuraho",
  "Kodaikanal",
  "Kolkata",
  "Kochi",
  "Kovalam",
  "Kufri",
  "Ladakh",
  "Leh",
  "Lonavala",
  "Madurai",
  "Manali",
  "Mahabaleshwar",
  "Munnar",
  "Mysore",
  "Nainital",
  "Nagpur",
  "Ooty",
  "Ooty & Kodaikanal",
  "Pachmarhi",
  "Pondicherry",
  "Port Blair",
  "Pushkar",
  "Rajasthan",
  "Ranthambore",
  "Rishikesh",
  "Rishikesh & Haridwar",
  "Shimla",
  "Sikkim",
  "Spiti Valley",
  "Srinagar",
  "Tirupati",
  "Udaipur",
  "Ujjain",
  "Varanasi",
  "Varkala",
  "Vishakhapatnam",
  "Wayanad",
  "Bali",
  "Bangkok",
  "Batam",
  "Bintan",
  "Boracay",
  "Cambodia",
  "Cebu",
  "Chiang Mai",
  "Da Nang",
  "Danang",
  "Hanoi",
  "Ho Chi Minh City",
  "Hoi An",
  "Hong Kong",
  "Jakarta",
  "Jogjakarta",
  "Koh Samui",
  "Krabi",
  "Kuala Lumpur",
  "Langkawi",
  "Luang Prabang",
  "Macau",
  "Manila",
  "Myanmar",
  "Pattaya",
  "Penang",
  "Phi Phi Islands",
  "Phnom Penh",
  "Phuket",
  "Siem Reap",
  "Singapore",
  "Taiwan",
  "Thailand",
  "Vietnam",
  "Beijing",
  "Busan",
  "Guangzhou",
  "Japan",
  "Jeju Island",
  "Kyoto",
  "Osaka",
  "Seoul",
  "Shanghai",
  "Tokyo",
  "Bhutan",
  "Colombo",
  "Dhaka",
  "Kathmandu",
  "Maldives",
  "Nepal",
  "Sri Lanka",
  "Abu Dhabi",
  "Bahrain",
  "Dubai",
  "Jordan",
  "Kuwait",
  "Muscat",
  "Oman",
  "Qatar",
  "Riyadh",
  "Saudi Arabia",
  "Amsterdam",
  "Athens",
  "Barcelona",
  "Berlin",
  "Brussels",
  "Budapest",
  "Copenhagen",
  "Croatia",
  "Dublin",
  "Edinburgh",
  "Europe",
  "Florence",
  "France",
  "Frankfurt",
  "Geneva",
  "Greece",
  "Helsinki",
  "Istanbul",
  "Lisbon",
  "London",
  "Madrid",
  "Milan",
  "Monaco",
  "Nice",
  "Oslo",
  "Paris",
  "Portugal",
  "Prague",
  "Rome",
  "Santorini",
  "Spain",
  "Stockholm",
  "Swiss Alps",
  "Switzerland",
  "Turkey",
  "Venice",
  "Vienna",
  "Warsaw",
  "Zurich",
  "Cape Town",
  "Cairo",
  "Egypt",
  "Kenya",
  "Marrakech",
  "Mauritius",
  "Morocco",
  "Nairobi",
  "Rwanda",
  "Seychelles",
  "South Africa",
  "Tanzania",
  "Zimbabwe",
  "Belize",
  "Brazil",
  "Buenos Aires",
  "Cancun",
  "Costa Rica",
  "Cuba",
  "Los Angeles",
  "Machu Picchu",
  "Mexico City",
  "Miami",
  "New York",
  "Panama",
  "Peru",
  "Toronto",
  "Vancouver",
  "Auckland",
  "Australia",
  "Bora Bora",
  "Fiji",
  "Melbourne",
  "New Zealand",
  "Sydney",
];

type Suggestion = {
  name: string;
  hasPackage: boolean;
  packageSlug?: string;
  packageTitle?: string;
};

function getSuggestions(query: string): Suggestion[] {
  if (!query.trim() || query.length < 1) return [];
  const q = query.toLowerCase().trim();
  const results: Array<{
    name: string;
    score: number;
    hasPackage: boolean;
    packageSlug?: string;
    packageTitle?: string;
  }> = [];

  GLOBAL_LOCATIONS.forEach((loc) => {
    const locLower = loc.toLowerCase();
    let score = 0;
    if (locLower === q) score = 100;
    else if (locLower.startsWith(q)) score = 80;
    else if (locLower.includes(q)) score = 50;
    else if (q.split(" ").every((word) => locLower.includes(word))) score = 30;

    if (score > 0) {
      const pkg = PACKAGE_INDEX.find(
        (p) =>
          p.destination.toLowerCase() === locLower ||
          p.keywords.some((k) => k === locLower),
      );
      const hasPackage = PACKAGE_DESTINATIONS.has(locLower);
      if (hasPackage) score += 20;
      results.push({
        name: loc,
        score,
        hasPackage,
        packageSlug: pkg?.slug,
        packageTitle: pkg?.title,
      });
    }
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ name, hasPackage, packageSlug, packageTitle }) => ({
      name,
      hasPackage,
      packageSlug,
      packageTitle,
    }));
}

function findPackageMatch(destination: string) {
  const q = destination.toLowerCase().trim();
  return (
    PACKAGE_INDEX.find(
      (p) =>
        p.destination.toLowerCase() === q ||
        p.keywords.some((k) => k === q || k.startsWith(q)),
    ) || null
  );
}

function isValidDate(val: string): boolean {
  return /^\d{2}\/\d{2}\/\d{2}$/.test(val);
}

function displayDate(val: string): string {
  if (!isValidDate(val)) return val;
  const [dd, mm, yy] = val.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${parseInt(dd)} ${months[parseInt(mm) - 1] || mm} '${yy}`;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <span className="text-white font-bold">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </span>
  );
}

const SERVICES = [
  {
    id: "package",
    label: "Complete Package",
    icon: Package,
    desc: "Full trip — flights, hotel & tours",
  },
  {
    id: "flight",
    label: "Flight Only",
    icon: Plane,
    desc: "Just the flights, we sort the rest",
  },
  {
    id: "hotel",
    label: "Hotel Only",
    icon: Hotel,
    desc: "Accommodation sorted for you",
  },
  {
    id: "flight-hotel",
    label: "Flight + Hotel",
    icon: Plane,
    desc: "Flights and stays combined",
  },
];

// ── Calendar ─────────────────────────────────────────────────────
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseDate(dateStr: string): Date | null {
  if (!dateStr || !isValidDate(dateStr)) return null;
  const [dd, mm, yy] = dateStr.split("/");
  return new Date(parseInt("20" + yy), parseInt(mm) - 1, parseInt(dd));
}

function CalendarPicker({
  value,
  onChange,
  onClose,
  anchorRef,
  minDateStr,
}: {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  minDateStr?: string;
}) {
  const today = new Date();

  // Parse minDate (the From date) for blocking and marking
  const minDate = parseDate(minDateStr || "");

  // If minDate exists (To calendar), start on From's month; otherwise today
  const [viewYear, setViewYear] = useState(
    minDate ? minDate.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    minDate ? minDate.getMonth() : today.getMonth(),
  );

  // If minDate exists, open straight to day phase so user sees From's month immediately
  const [phase, setPhase] = useState<"month" | "day">(
    minDate ? "day" : "month",
  );

  const [pos, setPos] = useState({ top: 0, left: 0 });

  // If minDateStr changes while mounted, keep view in sync
  useEffect(() => {
    const parsed = parseDate(minDateStr || "");
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    }
  }, [minDateStr]);

  const isFromDate = (d: number) => {
    if (!minDate) return false;
    return (
      d === minDate.getDate() &&
      viewMonth === minDate.getMonth() &&
      viewYear === minDate.getFullYear()
    );
  };

  useEffect(() => {
    const calc = () => {
      if (!anchorRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      const left = Math.min(r.left, window.innerWidth - 288);
      setPos({ top: r.bottom + 6, left });
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc, { passive: true });
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [anchorRef]);

  const selectedDay = value ? parseInt(value.split("/")[0]) : null;
  const selectedMonth = value ? parseInt(value.split("/")[1]) - 1 : null;
  const selectedYear = value ? parseInt("20" + value.split("/")[2]) : null;

  const isSelected = (d: number) =>
    d === selectedDay &&
    viewMonth === selectedMonth &&
    viewYear === selectedYear;

  const isToday = (d: number) =>
    d === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const isPastDay = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const baseline =
      minDate ||
      new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < baseline;
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleSelectDay = (d: number) => {
    if (isPastDay(d)) return;
    const dd = String(d).padStart(2, "0");
    const mm = String(viewMonth + 1).padStart(2, "0");
    const yy = String(viewYear).slice(2);
    onChange(`${dd}/${mm}/${yy}`);
    onClose();
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  return (
    <Portal>
      <div
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          zIndex: 2147483647,
          width: 280,
          background: "#0f0a07",
          border: "1px solid rgba(200,57,43,0.35)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.92)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ── MONTH PHASE ── */}
        {phase === "month" && (
          <>
            {/* Year nav */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setViewYear((y) => y - 1)}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                <ChevronLeft size={14} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] font-bold text-white tracking-widest">
                {viewYear}
              </span>
              <button
                onClick={() => setViewYear((y) => y + 1)}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                <ChevronRight size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-3 gap-1 p-3">
              {MONTHS.map((m, i) => {
                const isPastMonth =
                  viewYear < today.getFullYear() ||
                  (viewYear === today.getFullYear() && i < today.getMonth());
                const isSelectedMonth =
                  i === selectedMonth && viewYear === selectedYear;
                const isCurrent =
                  i === today.getMonth() && viewYear === today.getFullYear();

                return (
                  <button
                    key={m}
                    disabled={isPastMonth}
                    onClick={() => {
                      setViewMonth(i);
                      setPhase("day");
                    }}
                    style={{
                      padding: "9px 4px",
                      fontSize: "11px",
                      fontWeight: isSelectedMonth ? 700 : 500,
                      letterSpacing: "0.05em",
                      borderRadius: 2,
                      background: isSelectedMonth ? "#C8392B" : "transparent",
                      color: isSelectedMonth
                        ? "#fff"
                        : isPastMonth
                          ? "rgba(255,255,255,0.15)"
                          : isCurrent
                            ? "#C8392B"
                            : "rgba(255,255,255,0.6)",
                      cursor: isPastMonth ? "not-allowed" : "pointer",
                      transition: "background 0.15s, color 0.15s",
                      border:
                        isCurrent && !isSelectedMonth
                          ? "1px solid rgba(200,57,43,0.3)"
                          : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isPastMonth && !isSelectedMonth)
                        e.currentTarget.style.background =
                          "rgba(200,57,43,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelectedMonth)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {m.slice(0, 3).toUpperCase()}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ── DAY PHASE ── */}
        {phase === "day" && (
          <>
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setPhase("month")}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#C8392B",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8621A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C8392B")}
              >
                ← {MONTHS[viewMonth].slice(0, 3)} {viewYear}
              </button>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={prevMonth}
                  className="w-7 h-7 flex items-center justify-center transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                  }
                >
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-7 h-7 flex items-center justify-center transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                  }
                >
                  <ChevronRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 px-3 pt-2 pb-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center py-1"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.22)",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div
              className="grid grid-cols-7 px-3 pb-3"
              style={{ gap: "2px 0" }}
            >
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const past = isPastDay(d);
                const selected = isSelected(d);
                const tod = isToday(d);
                const fromMark = isFromDate(d);

                return (
                  <button
                    key={d}
                    disabled={past}
                    onClick={() => handleSelectDay(d)}
                    style={{
                      height: 32,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: tod && !selected ? 700 : 400,
                      borderRadius: 2,
                      background: selected
                        ? "#fff"
                        : fromMark
                          ? "rgba(200,57,43,0.15)"
                          : "transparent",
                      color: selected
                        ? "#0f0a07"
                        : past
                          ? "rgba(255,255,255,0.13)"
                          : "rgba(255,255,255,0.75)",
                      border: selected
                        ? "1px solid transparent"
                        : fromMark
                          ? "1px solid rgba(200,57,43,0.6)"
                          : tod && !selected
                            ? "1px solid rgba(200,57,43,0.4)"
                            : "1px solid transparent",
                      cursor: past ? "not-allowed" : "pointer",
                      position: "relative",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      if (!past && !selected)
                        e.currentTarget.style.background =
                          "rgba(200,57,43,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!selected)
                        e.currentTarget.style.background = fromMark
                          ? "rgba(200,57,43,0.15)"
                          : "transparent";
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Portal>
  );
}

// ── Main SearchBar ────────────────────────────────────────────────
export default function SearchBar() {
  const [q, setQ] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [service, setService] = useState("package");
  const [showServiceDrop, setShowServiceDrop] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFromCal, setShowFromCal] = useState(false);
  const [showToCal, setShowToCal] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });
  const [serviceDropPos, setServiceDropPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // All 3 required fields must be filled for search to be active
  // (service always has a default so only destination + both dates matter)
  const isSearchReady =
    q.trim().length > 0 && isValidDate(fromDate) && isValidDate(toDate);

  const calcPos = useCallback(() => {
    if (!barRef.current) return;
    const r = barRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom, left: r.left, width: r.width });
  }, []);

  const calcServicePos = useCallback(() => {
    if (!serviceRef.current) return;
    const r = serviceRef.current.getBoundingClientRect();
    setServiceDropPos({
      top: r.bottom,
      left: r.left,
      width: Math.max(r.width, 260),
    });
  }, []);

  // Reposition on scroll/resize
  useEffect(() => {
    const update = () => {
      if (showSuggestions) calcPos();
      if (showServiceDrop) calcServicePos();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showSuggestions, showServiceDrop, calcPos, calcServicePos]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const sugDrop = document.getElementById("tw-search-drop");
      const svcDrop = document.getElementById("tw-service-drop");
      if (
        !barRef.current?.contains(target) &&
        !sugDrop?.contains(target) &&
        !svcDrop?.contains(target)
      ) {
        setShowSuggestions(false);
        setShowServiceDrop(false);
        setShowFromCal(false);
        setShowToCal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (val: string) => {
    setQ(val);
    const s = getSuggestions(val);
    setSuggestions(s);
    if (val.length >= 1) {
      calcPos();
      setShowSuggestions(true);
    } else setShowSuggestions(false);
  };

  const activeService = SERVICES.find((s) => s.id === service) || SERVICES[0];

  // Only routes when all fields are filled
  const handleSearch = () => {
    if (!isSearchReady) return;

    setShowSuggestions(false);
    setShowServiceDrop(false);
    setShowFromCal(false);
    setShowToCal(false);

    const params = new URLSearchParams();
    params.set("destination", q.trim());
    params.set("from", fromDate);
    params.set("to", toDate);
    params.set("service", service);

    if (service === "package") {
      const match = findPackageMatch(q);
      if (match) {
        router.push(`/packages/${match.slug}`);
      } else {
        router.push(`/enquiry?${params.toString()}`);
      }
      return;
    }
    router.push(`/enquiry?${params.toString()}`);
  };

  // Only fills the destination field — routing happens on Search click
  const handlePickSuggestion = (s: Suggestion) => {
    setShowSuggestions(false);
    setQ(s.name);
  };

  return (
    <>
      {/* ── Suggestions portal ── */}
      {showSuggestions && suggestions.length > 0 && (
        <Portal>
          <div
            id="tw-search-drop"
            style={{
              position: "fixed",
              top: dropPos.top,
              left: dropPos.left,
              width: dropPos.width,
              zIndex: 2147483647,
              background: "#0f0a07",
              borderLeft: "1px solid rgba(200,57,43,0.25)",
              borderRight: "1px solid rgba(200,57,43,0.25)",
              borderBottom: "1px solid rgba(200,57,43,0.25)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.9)",
            }}
          >
            <div className="flex items-center justify-between px-6 pt-3 pb-2">
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {suggestions.length} destination
                {suggestions.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center gap-1"
                  style={{ fontSize: "9px", color: "rgba(200,57,43,0.7)" }}
                >
                  <Star size={8} className="fill-[#C8392B] text-[#C8392B]" />
                  We have a package
                </span>
                <span
                  style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)" }}
                >
                  · Global destinations
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-3 pb-3 gap-0.5">
              {suggestions.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handlePickSuggestion(s)}
                  className="flex items-center gap-3 px-4 py-3 text-left rounded-sm group transition-colors hover:bg-white/[0.05]"
                >
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: s.hasPackage
                        ? "rgba(200,57,43,0.15)"
                        : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <MapPin
                      size={12}
                      strokeWidth={1.5}
                      style={{
                        color: s.hasPackage
                          ? "#C8392B"
                          : "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontSize: "13px",
                        color: s.hasPackage
                          ? "rgba(255,255,255,0.75)"
                          : "rgba(255,255,255,0.45)",
                      }}
                      className="truncate"
                    >
                      <HighlightMatch text={s.name} query={q} />
                    </p>
                    {s.hasPackage && s.packageTitle ? (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(200,57,43,0.6)",
                          marginTop: 2,
                        }}
                        className="truncate"
                      >
                        ✦ {s.packageTitle}
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.2)",
                          marginTop: 2,
                        }}
                      >
                        Request custom trip
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: s.hasPackage
                        ? "rgba(200,57,43,0.5)"
                        : "rgba(255,255,255,0.15)",
                    }}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>

            <div
              className="px-6 py-2.5 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <Search
                  size={10}
                  strokeWidth={1.5}
                  style={{ color: "rgba(255,255,255,0.2)" }}
                />
                <p
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}
                >
                  Press Enter to search · Highlighted = package available
                </p>
              </div>
              <button
                onClick={handleSearch}
                disabled={!isSearchReady}
                style={{
                  fontSize: "10px",
                  color: isSearchReady ? "#C8392B" : "rgba(200,57,43,0.3)",
                  cursor: isSearchReady ? "pointer" : "not-allowed",
                  textDecoration: isSearchReady ? "underline" : "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (isSearchReady) e.currentTarget.style.color = "#E8621A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isSearchReady
                    ? "#C8392B"
                    : "rgba(200,57,43,0.3)";
                }}
              >
                Enquire for custom trip →
              </button>
            </div>
          </div>
        </Portal>
      )}

      {/* ── Service dropdown portal ── */}
      {showServiceDrop && (
        <Portal>
          <div
            id="tw-service-drop"
            style={{
              position: "fixed",
              top: serviceDropPos.top,
              left: serviceDropPos.left,
              width: serviceDropPos.width,
              zIndex: 2147483647,
              background: "#0f0a07",
              border: "1px solid rgba(200,57,43,0.25)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.85)",
            }}
          >
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <button
                  key={svc.id}
                  onClick={() => {
                    setService(svc.id);
                    setShowServiceDrop(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors"
                  style={{
                    background:
                      service === svc.id
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (service !== svc.id)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (service !== svc.id)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                    style={{
                      background:
                        service === svc.id
                          ? "rgba(200,57,43,0.2)"
                          : "rgba(255,255,255,0.05)",
                      border: `1px solid ${service === svc.id ? "rgba(200,57,43,0.4)" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    <Icon
                      size={13}
                      strokeWidth={1.5}
                      style={{
                        color:
                          service === svc.id
                            ? "#C8392B"
                            : "rgba(255,255,255,0.4)",
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color:
                          service === svc.id ? "#fff" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {svc.label}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.25)",
                        marginTop: 2,
                      }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                  {service === svc.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C8392B] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </Portal>
      )}

      {/* ── Calendar pickers ── */}
      {showFromCal && (
        <CalendarPicker
          value={fromDate}
          onChange={(v) => {
            setFromDate(v);
            setShowFromCal(false);
            // Auto-open To calendar after picking From
            setTimeout(() => setShowToCal(true), 80);
          }}
          onClose={() => setShowFromCal(false)}
          anchorRef={fromRef as React.RefObject<HTMLElement>}
        />
      )}
      {showToCal && (
        <CalendarPicker
          value={toDate}
          onChange={(v) => {
            setToDate(v);
            setShowToCal(false);
          }}
          onClose={() => setShowToCal(false)}
          anchorRef={toRef as React.RefObject<HTMLElement>}
          minDateStr={fromDate}
        />
      )}

      {/* ── Search bar ── */}
      <div
        className="relative px-5 md:px-12 max-w-6xl mx-auto -mt-7"
        style={{ zIndex: 30 }}
      >
        <div className="flex justify-center mb-3">
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(20,14,10,0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Find your perfect journey
          </span>
        </div>

        <div
          ref={barRef}
          style={{
            background: "rgb(18,12,8)",
            border: `1px solid ${focused ? "rgba(200,57,43,0.55)" : "rgba(200,57,43,0.30)"}`,
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            transition: "border-color 0.2s ease",
          }}
        >
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Destination */}
            <div
              className="flex items-center gap-4 flex-1 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <MapPin
                size={15}
                strokeWidth={1.5}
                className="shrink-0 text-[#C8392B]"
              />
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                  }}
                >
                  Destination
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => handleInput(e.target.value)}
                    onFocus={() => {
                      setFocused("dest");
                      if (q.length >= 1) {
                        calcPos();
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => setFocused(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isSearchReady) handleSearch();
                      if (e.key === "Escape") setShowSuggestions(false);
                    }}
                    placeholder="City, country or destination..."
                    className="bg-transparent flex-1 outline-none"
                    style={{ fontSize: "13px", color: "#fff" }}
                  />
                  {q && (
                    <button
                      onClick={() => {
                        setQ("");
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      className="hover:text-white/60 transition-colors"
                    >
                      <X size={13} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

            {/* From date */}
            <div
              ref={fromRef}
              className="flex items-center gap-3 px-5 py-5 md:w-44 cursor-pointer select-none"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => {
                setShowFromCal((v) => !v);
                setShowToCal(false);
                setShowSuggestions(false);
                setShowServiceDrop(false);
              }}
            >
              <Calendar
                size={14}
                strokeWidth={1.5}
                className="shrink-0 text-[#C8392B]"
              />
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                  }}
                >
                  From
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: fromDate
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.25)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fromDate && isValidDate(fromDate)
                    ? displayDate(fromDate)
                    : "Add date"}
                </p>
              </div>
              {fromDate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFromDate("");
                  }}
                  style={{ color: "rgba(255,255,255,0.2)" }}
                  className="hover:text-white/50 transition-colors"
                >
                  <X size={11} strokeWidth={1.5} />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

            {/* To date */}
            <div
              ref={toRef}
              className="flex items-center gap-3 px-5 py-5 md:w-44 cursor-pointer select-none"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => {
                setShowToCal((v) => !v);
                setShowFromCal(false);
                setShowSuggestions(false);
                setShowServiceDrop(false);
              }}
            >
              <Calendar
                size={14}
                strokeWidth={1.5}
                className="shrink-0 text-[#E8621A]"
              />
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                  }}
                >
                  To
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: toDate
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.25)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {toDate && isValidDate(toDate)
                    ? displayDate(toDate)
                    : "Add date"}
                </p>
              </div>
              {toDate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setToDate("");
                  }}
                  style={{ color: "rgba(255,255,255,0.2)" }}
                  className="hover:text-white/50 transition-colors"
                >
                  <X size={11} strokeWidth={1.5} />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

            {/* Service */}
            <div
              ref={serviceRef}
              className="flex items-center gap-3 px-5 py-5 md:w-52 cursor-pointer select-none"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              onClick={() => {
                calcServicePos();
                setShowServiceDrop((v) => !v);
                setShowSuggestions(false);
                setShowFromCal(false);
                setShowToCal(false);
              }}
            >
              {(() => {
                const Icon = activeService.icon;
                return (
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#C8392B]"
                  />
                );
              })()}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                  }}
                >
                  Service
                </p>
                <p
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}
                  className="truncate"
                >
                  {activeService.label}
                </p>
              </div>
              <ChevronDown
                size={13}
                strokeWidth={1.5}
                style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}
                className={`transition-transform duration-200 ${showServiceDrop ? "rotate-180" : ""}`}
              />
            </div>

            <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

            {/* Search button — disabled until all fields filled */}
            <button
              onClick={handleSearch}
              disabled={!isSearchReady}
              className="flex items-center justify-center gap-2.5 transition-all duration-200"
              style={{
                background: isSearchReady ? "#C8392B" : "rgba(200,57,43,0.25)",
                color: isSearchReady ? "#fff" : "rgba(255,255,255,0.3)",
                cursor: isSearchReady ? "pointer" : "not-allowed",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "20px 28px",
                minWidth: 130,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (isSearchReady) e.currentTarget.style.background = "#A52E22";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSearchReady
                  ? "#C8392B"
                  : "rgba(200,57,43,0.25)";
              }}
            >
              <Search size={13} strokeWidth={2} />
              Search
            </button>
          </div>
        </div>

        <p
          className="text-center mt-3 tracking-wide"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}
        >
          Complete packages open instantly · Flight & hotel requests go to our
          planners
        </p>
      </div>
    </>
  );
}
