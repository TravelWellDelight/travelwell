"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Send,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import type { Package } from "@/types/package";

const BUDGET_OPTIONS = [
  { label: "Under ₹25,000", value: "under-25k" },
  { label: "₹25,000 – ₹50,000", value: "25k-50k" },
  { label: "₹50,000 – ₹1,00,000", value: "50k-1L" },
  { label: "₹1,00,000 – ₹2,00,000", value: "1L-2L" },
  { label: "₹2,00,000 – ₹5,00,000", value: "2L-5L" },
  { label: "Above ₹5,00,000", value: "above-5L" },
  { label: "Flexible / Not sure", value: "flexible" },
];

export default function BookingClient({ pkg }: { pkg: Package }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adults: 2,
    children: 0,
    specialRequests: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const handleQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          packageTitle: pkg.title,
          packageSlug: pkg.slug,

          travelDates: {
            startDate: form.startDate,
            endDate: form.endDate,
          },

          traveller: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            adults: form.adults,
            children: form.children,
            specialRequests: form.specialRequests,
          },

          budget: form.budget,
          amount: 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.firstName && form.email && form.phone && form.startDate;

  // ── Success state ──────────────────────────────────────────────
  if (sent) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full border-2 border-[#E8621A]/30 bg-[#E8621A]/5 flex items-center justify-center mx-auto mb-6">
            <CheckCircle
              size={28}
              strokeWidth={1.5}
              className="text-[#E8621A]"
            />
          </div>
          <h2
            className="font-display font-black text-[#1C0A00] text-3xl mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Quote request sent!
          </h2>
          <p className="text-[#6B5B45] text-sm mb-2 leading-relaxed">
            We've received your request for{" "}
            <span className="text-[#1C0A00] font-medium">{pkg.title}</span>. Our
            team will get back to you within{" "}
            <span className="text-[#E8621A] font-semibold">4 hours</span>.
          </p>
          <p className="text-[#A8967E] text-xs mb-10">
            A confirmation has been sent to {form.email}
          </p>
          <Link
            href="/packages"
            className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 border border-[#6B2D0E]/20 text-[#6B5B45] hover:border-[#E8621A] hover:text-[#E8621A] transition-colors rounded-sm"
          >
            Browse More Packages
          </Link>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFAF6] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_380px] gap-10">
        {/* ── LEFT: Form ────────────────────────────────────────── */}
        <div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#A8967E] hover:text-[#E8621A] transition-colors mb-8"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            Back to package
          </Link>

          <h1
            className="font-display font-black text-[#1C0A00] text-3xl mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Get your quote
          </h1>
          <p className="text-[#6B5B45] text-sm mb-10">
            Share your details and we'll send a personalised quote within 4
            hours.
          </p>

          <div className="space-y-8">
            {/* Travel dates */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#A8967E] mb-4">
                <Calendar size={12} strokeWidth={1.5} />
                Travel Dates
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#6B5B45] mb-1.5 block font-medium">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#6B5B45] mb-1.5 block font-medium">
                    End date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors rounded-sm"
                  />
                </div>
              </div>
            </fieldset>

            <div className="h-px bg-[rgba(107,45,14,0.08)]" />

            {/* Traveller details */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#A8967E] mb-4">
                <User size={12} strokeWidth={1.5} />
                Lead Traveller
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "firstName", label: "First name", type: "text" },
                  { key: "lastName", label: "Last name", type: "text" },
                  { key: "email", label: "Email address", type: "email" },
                  { key: "phone", label: "Phone number", type: "tel" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-[11px] text-[#6B5B45] mb-1.5 block font-medium">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={(form as any)[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={label}
                      className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors rounded-sm placeholder-[#A8967E]"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="h-px bg-[rgba(107,45,14,0.08)]" />

            {/* Group size */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#A8967E] mb-4">
                <Users size={12} strokeWidth={1.5} />
                Group Size
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#6B5B45] mb-1.5 block font-medium">
                    Adults
                  </label>
                  <select
                    value={form.adults}
                    onChange={(e) =>
                      setForm({ ...form, adults: +e.target.value })
                    }
                    className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors rounded-sm"
                  >
                    {Array.from(
                      { length: pkg.groupSize.max },
                      (_, i) => i + 1,
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n} adult{n !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#6B5B45] mb-1.5 block font-medium">
                    Children
                  </label>
                  <select
                    value={form.children}
                    onChange={(e) =>
                      setForm({ ...form, children: +e.target.value })
                    }
                    className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors rounded-sm"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} child{n !== 1 ? "ren" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            <div className="h-px bg-[rgba(107,45,14,0.08)]" />

            {/* Budget range */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#A8967E] mb-4">
                <IndianRupee size={12} strokeWidth={1.5} />
                Budget Range
                <span className="text-[#A8967E]/60 normal-case tracking-normal text-[10px]">
                  (per person)
                </span>
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                {BUDGET_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, budget: value })}
                    className={`text-left text-[12px] px-3 py-2.5 border rounded-sm transition-all ${
                      form.budget === value
                        ? "border-[#E8621A] bg-[#E8621A]/5 text-[#C8392B] font-semibold"
                        : "border-[rgba(107,45,14,0.15)] bg-white text-[#6B5B45] hover:border-[#E8621A]/50 hover:text-[#E8621A]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="h-px bg-[rgba(107,45,14,0.08)]" />

            {/* Special requests */}
            <div>
              <label className="flex items-center gap-2 text-[11px] text-[#6B5B45] mb-1.5 font-medium">
                <MessageSquare size={12} strokeWidth={1.5} />
                Special requests
                <span className="text-[#A8967E] font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={form.specialRequests}
                onChange={(e) =>
                  setForm({ ...form, specialRequests: e.target.value })
                }
                placeholder="Dietary requirements, accessibility needs, room preferences..."
                className="w-full bg-white border border-[rgba(107,45,14,0.15)] text-[#1C0A00] text-sm px-4 py-3 outline-none focus:border-[#E8621A] transition-colors resize-none placeholder-[#A8967E] rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Summary ────────────────────────────────────── */}
        <div className="bg-white border border-[rgba(107,45,14,0.12)] rounded-sm shadow-sm h-fit sticky top-28">
          {/* Package image */}
          <div className="relative h-40 overflow-hidden rounded-t-sm">
            <img
              src={pkg.images.hero}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
          </div>

          <div className="p-6">
            {/* Package info */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#E8621A] mb-1 font-semibold">
              {pkg.destination}
            </p>
            <h2 className="font-display font-bold text-[#1C0A00] text-xl mb-1">
              {pkg.title}
            </h2>
            <p className="text-[12px] text-[#A8967E] mb-6">
              {pkg.duration.nights}N / {pkg.duration.days}D
            </p>

            {/* Quote summary */}
            <div className="space-y-2 mb-5 pb-5 border-b border-[rgba(107,45,14,0.08)]">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B5B45]">Adults</span>
                <span className="text-[#1C0A00] font-medium">
                  {form.adults}
                </span>
              </div>
              {form.children > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5B45]">Children</span>
                  <span className="text-[#1C0A00] font-medium">
                    {form.children}
                  </span>
                </div>
              )}
              {form.startDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5B45]">Departure</span>
                  <span className="text-[#1C0A00] font-medium">
                    {new Date(form.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              {form.budget && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B5B45]">Budget</span>
                  <span className="text-[#E8621A] font-medium text-xs">
                    {BUDGET_OPTIONS.find((b) => b.value === form.budget)?.label}
                  </span>
                </div>
              )}
            </div>

            {/* Pricing note */}
            <div className="mb-5 p-3 border border-[#E8621A]/20 bg-[#E8621A]/[0.04] rounded-sm">
              <p className="text-[11px] text-[#6B5B45] leading-relaxed">
                Pricing is customised based on your travel dates, group size,
                and preferences. We'll share the best quote for you.
              </p>
            </div>

            {/* Get Quote button */}
            <button
              onClick={handleQuote}
              disabled={!isValid || loading}
              className="w-full bg-[#E8621A] text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-[#C8392B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={13} strokeWidth={2} />
                  Get My Quote
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-[#A8967E] mt-3">
              No payment required · Free quote · Reply in 4 hrs
            </p>

            {/* What happens next */}
            <div className="mt-5 pt-4 border-t border-[rgba(107,45,14,0.08)]">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#A8967E] mb-3">
                What happens next
              </p>
              {[
                "Your request lands in our inbox instantly",
                "Our team calls you within 4 hours",
                "We share a personalised quote & itinerary",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <ChevronRight
                    size={11}
                    strokeWidth={1.5}
                    className="text-[#E8621A] mt-0.5 flex-shrink-0"
                  />
                  <p className="text-[11px] text-[#6B5B45] leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
