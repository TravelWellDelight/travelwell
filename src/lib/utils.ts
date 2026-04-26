import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format INR price — ₹28,500 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Discount % */
export function discountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

/** Convert nights to readable string */
export function durationLabel(nights: number, days: number): string {
  return `${nights}N / ${days}D`;
}

/** Availability badge styling */
export function availabilityColor(status: string): string {
  switch (status) {
    case "available": return "text-emerald-400";
    case "limited": return "text-amber-400";
    case "sold_out": return "text-red-400";
    default: return "text-gray-400";
  }
}

/** WhatsApp deep-link */
export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Slugify a string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
