"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Users,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Shield,
  Smartphone,
} from "lucide-react";
import type { Package } from "@/types/package";
import { formatPrice } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingClient({ pkg }: { pkg: Package }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  });

  const total = pkg.price.perPerson * form.adults;

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          packageTitle: pkg.title,
          packageSlug: pkg.slug,
          travelDates: { start: form.startDate, end: form.endDate },
          traveller: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            adults: form.adults,
            children: form.children,
            specialRequests: form.specialRequests,
          },
          amount: total,
        }),
      });
      const { orderId, amount, currency, bookingId } = await res.json();

      if (!window.Razorpay) {
        await new Promise<void>((resolve) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = () => resolve();
          document.head.appendChild(s);
        });
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: orderId,
        name: "TravelWell Delight",
        description: pkg.title,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#d4af6e" },
        handler: async (response: any) => {
          const vRes = await fetch("/api/booking/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              bookingId,
            }),
          });
          const data = await vRes.json();
          if (data.success) {
            router.push(
              `/booking-confirm?id=${data.bookingId}&package=${encodeURIComponent(pkg.title)}`,
            );
          }
        },
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.firstName && form.email && form.phone && form.startDate;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_360px] gap-10">
        {/* ── LEFT: Form ── */}
        <div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/30 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            Back to package
          </Link>

          <h1
            className="font-display font-black text-white text-3xl mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Book your trip
          </h1>
          <p className="text-white/30 text-sm mb-10">
            Fill in your details and we'll handle the rest.
          </p>

          <div className="space-y-8">
            {/* Travel dates */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                <Calendar size={12} strokeWidth={1.5} />
                Travel Dates
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/30 mb-1.5 block">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/30 mb-1.5 block">
                    End date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors"
                  />
                </div>
              </div>
            </fieldset>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Traveller details */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                <User size={12} strokeWidth={1.5} />
                Lead Traveller
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    key: "firstName",
                    label: "First name",
                    type: "text",
                    icon: User,
                  },
                  {
                    key: "lastName",
                    label: "Last name",
                    type: "text",
                    icon: User,
                  },
                  {
                    key: "email",
                    label: "Email address",
                    type: "email",
                    icon: Mail,
                  },
                  {
                    key: "phone",
                    label: "Phone number",
                    type: "tel",
                    icon: Phone,
                  },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-[11px] text-white/30 mb-1.5 block">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={(form as any)[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={label}
                      className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors placeholder-white/15"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Group size */}
            <fieldset>
              <legend className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                <Users size={12} strokeWidth={1.5} />
                Group Size
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/30 mb-1.5 block">
                    Adults
                  </label>
                  <select
                    value={form.adults}
                    onChange={(e) =>
                      setForm({ ...form, adults: +e.target.value })
                    }
                    className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors"
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
                  <label className="text-[11px] text-white/30 mb-1.5 block">
                    Children
                  </label>
                  <select
                    value={form.children}
                    onChange={(e) =>
                      setForm({ ...form, children: +e.target.value })
                    }
                    className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors"
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

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Special requests */}
            <div>
              <label className="flex items-center gap-2 text-[11px] text-white/30 mb-1.5">
                <MessageSquare size={12} strokeWidth={1.5} />
                Special requests
                <span className="text-white/20">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={form.specialRequests}
                onChange={(e) =>
                  setForm({ ...form, specialRequests: e.target.value })
                }
                placeholder="Dietary requirements, accessibility needs, room preferences..."
                className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none focus:border-[#d4af6e]/40 transition-colors resize-none placeholder-white/15"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div className="bg-[#111] border border-white/[0.06] p-6 h-fit sticky top-28">
          {/* Package image */}
          <div className="relative h-36 overflow-hidden mb-4 -mx-6 -mt-6">
            <img
              src={pkg.images.hero}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
          </div>

          {/* Package info */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#d4af6e] mb-1">
            {pkg.destination}
          </p>
          <h2 className="font-display font-bold text-white text-xl mb-1">
            {pkg.title}
          </h2>
          <p className="text-[12px] text-white/40 mb-6">
            {pkg.duration.nights}N / {pkg.duration.days}D
          </p>

          {/* Price breakdown */}
          <div className="space-y-2 mb-6 pb-6 border-b border-white/[0.06]">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">
                {formatPrice(pkg.price.perPerson)} × {form.adults} adult
                {form.adults !== 1 ? "s" : ""}
              </span>
              <span className="text-white">
                {formatPrice(pkg.price.perPerson * form.adults)}
              </span>
            </div>
            {form.children > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50">
                  {form.children} child{form.children !== 1 ? "ren" : ""}
                </span>
                <span className="text-white/50">Contact us</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] tracking-[0.1em] uppercase text-white/40">
              Total
            </span>
            <span className="font-display font-black text-white text-2xl">
              {formatPrice(total)}
            </span>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={!isValid || loading}
            className="w-full bg-[#d4af6e] text-[#080808] text-[11px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-[#f0d898] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border border-[#080808]/40 border-t-[#080808] rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={14} strokeWidth={2} />
                Pay {formatPrice(total)}
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1 text-[10px] text-white/20">
              <Lock size={10} strokeWidth={1.5} />
              Razorpay secured
            </span>
            <span className="flex items-center gap-1 text-[10px] text-white/20">
              <Smartphone size={10} strokeWidth={1.5} />
              UPI / Cards / NetBanking
            </span>
          </div>

          {/* What happens next */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-3">
              What happens next
            </p>
            {[
              "Payment confirmation email sent instantly",
              "Our team calls within 2 hours",
              "Final itinerary shared 7 days before travel",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <ChevronRight
                  size={11}
                  strokeWidth={1.5}
                  className="text-[#d4af6e]/50 mt-0.5 flex-shrink-0"
                />
                <p className="text-[11px] text-white/25 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
