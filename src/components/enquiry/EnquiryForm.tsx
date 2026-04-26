"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Send,
  Check,
  AlertCircle,
  ChevronRight,
  MessageCircle,
  Clock,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";

const DESTINATIONS = [
  "Bali, Indonesia",
  "Maldives",
  "Swiss Alps",
  "Japan",
  "Kerala, India",
  "Rajasthan, India",
  "Thailand",
  "Paris, France",
  "Santorini, Greece",
  "Dubai, UAE",
  "New Zealand",
  "Morocco",
  "Other / Not sure yet",
];

const BUDGETS = [
  "Under ₹30,000 per person",
  "₹30,000 – ₹60,000 per person",
  "₹60,000 – ₹1,00,000 per person",
  "₹1,00,000 – ₹2,00,000 per person",
  "Above ₹2,00,000 per person",
];

const TRIP_TYPES = [
  "Honeymoon",
  "Family Holiday",
  "Solo Travel",
  "Group Tour",
  "Adventure",
  "Cultural & Heritage",
  "Beach & Relaxation",
  "Business + Leisure",
];

const FAQS = [
  {
    q: "How soon will I get a response?",
    a: "Our travel specialists reply within 4 hours on business days. For urgent queries, WhatsApp is the fastest.",
  },
  {
    q: "Is the consultation free?",
    a: "Yes — completely free. No booking fees, no hidden charges. We only earn when you travel.",
  },
  {
    q: "Can you customise an existing package?",
    a: "Absolutely. Every itinerary is 100% flexible. Tell us what you want changed and we'll rebuild it around you.",
  },
  {
    q: "Do you handle visa assistance?",
    a: "No, not a complete visa assistance but we provide the visa requirement checks for every package",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function EnquiryFormFull() {
  const [status, setStatus] = useState<Status>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    tripType: "",
    budget: "",
    adults: "2",
    children: "0",
    travelDate: "",
    duration: "",
    message: "",
  });

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          destination: form.destination,
          tripType: form.tripType,
          budget: form.budget,
          groupSize: { adults: +form.adults, children: +form.children },
          travelDate: form.travelDate,
          duration: form.duration,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
  const waLink = `https://wa.me/${waNumber}?text=Hi%2C%20I%27d%20like%20help%20planning%20a%20trip%20with%20TravelWell%20Delight`;

  /* ── Success screen ── */
  if (status === "sent") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center mx-auto mb-8">
            <Check size={32} strokeWidth={1.5} className="text-emerald-400" />
          </div>
          <h2 className="font-display text-4xl text-white mb-4">
            We've got it!
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-2">
            Our travel specialist will reach out within 4 hours.
          </p>
          <p className="text-white/25 text-sm mb-10">
            Watch <span className="text-white/50">{form.email}</span> and{" "}
            <span className="text-white/50">{form.phone}</span>
          </p>
          <div className="h-px bg-white/[0.06] mb-10" />
          <p className="text-white/30 text-xs mb-4">Need something faster?</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-[#20BA58] transition-colors"
          >
            <MessageCircle size={14} strokeWidth={1.5} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-14">
      {/* ── LEFT: FORM ── */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Your details */}
        <FormSection
          icon={<User size={12} strokeWidth={1.5} />}
          title="Your details"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First name" required>
              <input
                type="text"
                required
                placeholder="Arjun"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Last name" required>
              <input
                type="text"
                required
                placeholder="Sharma"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field
              label="Email address"
              required
              icon={
                <Mail size={12} strokeWidth={1.5} className="text-white/20" />
              }
            >
              <input
                type="email"
                required
                placeholder="arjun@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field
              label="Phone number"
              required
              icon={
                <Phone size={12} strokeWidth={1.5} className="text-white/20" />
              }
            >
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </FormSection>

        <Divider />

        {/* Trip details */}
        <FormSection
          icon={<MapPin size={12} strokeWidth={1.5} />}
          title="Trip details"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Destination" required>
              <div className="relative">
                <select
                  required
                  value={form.destination}
                  onChange={(e) => set("destination", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Select a destination</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Trip type">
              <div className="relative">
                <select
                  value={form.tripType}
                  onChange={(e) => set("tripType", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Select trip type</option>
                  {TRIP_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
            <Field
              label="Travel month"
              icon={
                <Calendar
                  size={12}
                  strokeWidth={1.5}
                  className="text-white/20"
                />
              }
            >
              <input
                type="month"
                value={form.travelDate}
                onChange={(e) => set("travelDate", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Duration">
              <div className="relative">
                <select
                  value={form.duration}
                  onChange={(e) => set("duration", e.target.value)}
                  className={selectCls}
                >
                  <option value="">How many nights?</option>
                  {[
                    "3–4 nights",
                    "5–6 nights",
                    "7–8 nights",
                    "9–12 nights",
                    "13+ nights",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
          </div>
        </FormSection>

        <Divider />

        {/* Group & Budget */}
        <FormSection
          icon={<Users size={12} strokeWidth={1.5} />}
          title="Group & budget"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Adults">
              <div className="relative">
                <select
                  value={form.adults}
                  onChange={(e) => set("adults", e.target.value)}
                  className={selectCls}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} adult{n !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Children">
              <div className="relative">
                <select
                  value={form.children}
                  onChange={(e) => set("children", e.target.value)}
                  className={selectCls}
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} child{n !== 1 ? "ren" : ""}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Budget per person">
              <div className="relative">
                <select
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className={selectCls}
                >
                  <option value="">Select range</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          {/* Budget bar indicator */}
          <div className="mt-5 grid grid-cols-5 gap-1.5">
            {["₹30k", "₹60k", "₹1L", "₹2L", "₹2L+"].map((label, i) => (
              <div key={i} className="text-center">
                <div
                  className={`h-0.5 rounded-full mb-1.5 transition-all duration-300 ${
                    form.budget && BUDGETS.indexOf(form.budget) >= i
                      ? "bg-[#d4af6e]"
                      : "bg-white/[0.06]"
                  }`}
                />
                <span className="text-[9px] text-white/20">{label}</span>
              </div>
            ))}
          </div>
        </FormSection>

        <Divider />

        {/* Message */}
        <FormSection
          icon={<MessageSquare size={12} strokeWidth={1.5} />}
          title="Anything else?"
        >
          <textarea
            rows={4}
            placeholder="Special occasions, dietary needs, dream experiences, accessibility requirements..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${inputCls} resize-none`}
          />
          <p className="text-[11px] text-white/20 mt-2">
            The more you share, the better we can tailor your trip.
          </p>
        </FormSection>

        {/* Error */}
        {status === "error" && (
          <div className="flex items-start gap-3 text-red-400 border border-red-400/15 bg-red-400/5 px-4 py-3">
            <AlertCircle
              size={15}
              strokeWidth={1.5}
              className="shrink-0 mt-0.5"
            />
            <div>
              <p className="font-medium text-sm">Something went wrong.</p>
              <p className="text-red-400/60 text-xs mt-0.5">
                Please try{" "}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-300"
                >
                  WhatsApp instead
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {/* Submit row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2.5 bg-[#C8392B] hover:bg-[#A52E22] text-white text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
          >
            {status === "sending" ? (
              <>
                <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={13} strokeWidth={2} />
                Send Enquiry
              </>
            )}
          </button>
          <p className="text-white/20 text-[11px] leading-relaxed">
            Free consultation · No booking fees
            <br />
            Reply within 4 hours on business days
          </p>
        </div>
      </form>

      {/* ── RIGHT SIDEBAR ── */}
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        {/* Why TravelWell */}
        <div className="border border-white/[0.06] p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-5">
            Why TravelWell Delight
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Sparkles,
                title: "Handcrafted itineraries",
                sub: "Every route personally designed",
              },
              {
                icon: HeadphonesIcon,
                title: "Real human support",
                sub: "No bots, ever",
              },
              {
                icon: Clock,
                title: "4-hour reply guarantee",
                sub: "Mon–Sat, 9am – 7pm IST",
              },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded border border-[#d4af6e]/20 bg-[#d4af6e]/5 flex items-center justify-center shrink-0">
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#d4af6e]"
                  />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">{title}</p>
                  <p className="text-white/30 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="border border-white/[0.06]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 px-5 pt-5 pb-4 border-b border-white/[0.05]">
            Common questions
          </p>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-white/[0.04] last:border-0">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors group"
              >
                <span className="text-white/55 text-xs leading-relaxed group-hover:text-white/75 transition-colors">
                  {faq.q}
                </span>
                <ChevronRight
                  size={12}
                  strokeWidth={1.5}
                  className={`text-white/20 shrink-0 mt-0.5 transition-transform duration-200 ${
                    openFaq === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-white/35 text-xs leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

/* ── Sub-components ── */

const inputCls =
  "w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/30 transition-colors placeholder-white/15 rounded-none";

const selectCls =
  "w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/30 transition-colors rounded-none appearance-none pr-8";

function FormSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-white/25">{icon}</span>
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/25">
          {title}
        </span>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required = false,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] text-white/30 mb-1.5">
        {icon}
        {label}
        {required && <span className="text-[#C8392B] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.05]" />;
}
