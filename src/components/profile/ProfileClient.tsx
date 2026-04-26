"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Star,
  Heart,
  MessageSquare,
  Clock,
  LogOut,
  ChevronRight,
  Check,
  AlertCircle,
  FileText,
  Bookmark,
  History,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { IUserSession } from "@/types/user";
import Link from "next/link";

type Section =
  | "profile"
  | "bookings"
  | "history"
  | "wishlist"
  | "preferences"
  | "documents"
  | "enquiries";

interface ProfileClientProps {
  user: IUserSession;
}

const DRAWER_LINKS: {
  id: Section;
  label: string;
  icon: React.FC<any>;
  badge?: number;
}[] = [
  { id: "profile", label: "My profile", icon: User },
  { id: "bookings", label: "My bookings", icon: Calendar },
  { id: "history", label: "Trip history", icon: History },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "preferences", label: "Travel preferences", icon: Star },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "enquiries", label: "My enquiries", icon: MessageSquare },
];

const TRAVEL_STYLES = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Cultural",
  "Solo",
  "Group",
  "Beach",
  "Business",
];
const DIETARY = [
  "Vegetarian",
  "Non-vegetarian",
  "Vegan",
  "Jain",
  "No preference",
];
const SEAT_PREF = ["Window", "Aisle", "No preference"];
const TRIP_LENGTHS = [
  "Weekend (2–3 nights)",
  "3–4 nights",
  "5–6 nights",
  "7–8 nights",
  "9–12 nights",
  "13+ nights",
];
const BUDGET_RANGES = [
  "Under ₹30,000",
  "₹30k–₹60k",
  "₹60k–₹1L",
  "₹1L–₹2L",
  "Above ₹2L",
];
const CONTACT_PREFS = ["WhatsApp", "Email", "Phone call"];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function ProfileClient({
  user: sessionUser,
}: ProfileClientProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // Full profile data from API
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data.user);
        setForm(data.user || {});
      });
  }, []);

  const set = (key: string, value: any) =>
    setForm((p: any) => ({ ...p, [key]: value }));

  const save = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initials =
    `${sessionUser.firstName[0]}${sessionUser.lastName[0]}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      <div className="max-w-7xl mx-auto flex">
        {/* ── SIDE DRAWER ── */}
        <aside className="w-64 shrink-0 border-r border-white/[0.06] min-h-screen pt-10 pb-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden md:flex flex-col">
          {/* User card */}
          <div className="px-6 mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C8392B] flex items-center justify-center text-white text-lg font-bold mb-3">
              {sessionUser.avatar ? (
                <img
                  src={sessionUser.avatar}
                  alt={initials}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <p className="text-white font-medium text-sm">
              {sessionUser.firstName} {sessionUser.lastName}
            </p>
            <p className="text-white/30 text-xs mt-0.5">{sessionUser.email}</p>
          </div>

          {/* Nav sections */}
          <div className="px-3 flex-1">
            <p className={sectionLabelCls}>Account</p>
            {DRAWER_LINKS.slice(0, 4).map((link) => (
              <DrawerItem
                key={link.id}
                link={link}
                active={activeSection === link.id}
                onClick={() => setActiveSection(link.id)}
              />
            ))}

            <p className={`${sectionLabelCls} mt-4`}>Preferences</p>
            {DRAWER_LINKS.slice(4).map((link) => (
              <DrawerItem
                key={link.id}
                link={link}
                active={activeSection === link.id}
                onClick={() => setActiveSection(link.id)}
              />
            ))}
          </div>

          {/* Logout */}
          <div className="px-3 mt-4 border-t border-white/[0.05] pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-white/30 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all text-sm"
            >
              <LogOut size={14} strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 px-6 md:px-10 py-10 max-w-3xl">
          {/* Mobile section selector */}
          <div className="md:hidden mb-6">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value as Section)}
              className="w-full bg-[#111] border border-white/[0.08] text-white text-sm px-4 py-3 outline-none"
            >
              {DRAWER_LINKS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── PROFILE SECTION ── */}
          {activeSection === "profile" && (
            <Section
              title="My profile"
              sub="Keep your details up to date for faster bookings"
            >
              <Card title="Personal info">
                <Grid2>
                  <Field label="First name">
                    <Input
                      value={form.firstName || ""}
                      onChange={(v) => set("firstName", v)}
                    />
                  </Field>
                  <Field label="Last name">
                    <Input
                      value={form.lastName || ""}
                      onChange={(v) => set("lastName", v)}
                    />
                  </Field>
                  <Field label="Date of birth">
                    <Input
                      type="date"
                      value={form.dateOfBirth || ""}
                      onChange={(v) => set("dateOfBirth", v)}
                    />
                  </Field>
                  <Field label="Nationality">
                    <Input
                      value={form.nationality || ""}
                      onChange={(v) => set("nationality", v)}
                      placeholder="Indian"
                    />
                  </Field>
                  <Field label="Phone">
                    <Input
                      value={form.phone || ""}
                      onChange={(v) => set("phone", v)}
                    />
                  </Field>
                  <Field label="Email">
                    <Input value={sessionUser.email} disabled />
                  </Field>
                </Grid2>
              </Card>

              <Card title="Location">
                <Grid2>
                  <Field label="City">
                    <Input
                      value={form.city || ""}
                      onChange={(v) => set("city", v)}
                      placeholder="Mumbai"
                    />
                  </Field>
                  <Field label="State">
                    <Input
                      value={form.state || ""}
                      onChange={(v) => set("state", v)}
                      placeholder="Maharashtra"
                    />
                  </Field>
                </Grid2>
                <Field label="Address" className="mt-3">
                  <Input
                    value={form.address || ""}
                    onChange={(v) => set("address", v)}
                    placeholder="Street, area"
                  />
                </Field>
              </Card>

              <Card title="Personal extras">
                <Grid2>
                  <Field label="Anniversary date">
                    <Input
                      type="date"
                      value={form.anniversary || ""}
                      onChange={(v) => set("anniversary", v)}
                    />
                  </Field>
                  <Field label="Preferred contact">
                    <Select
                      value={form.preferredContact || ""}
                      onChange={(v) => set("preferredContact", v)}
                      options={CONTACT_PREFS}
                    />
                  </Field>
                  <Field label="How did you hear about us?">
                    <Select
                      value={form.howHeard || ""}
                      onChange={(v) => set("howHeard", v)}
                      options={[
                        "Google",
                        "Instagram",
                        "Facebook",
                        "Friend / family",
                        "YouTube",
                        "Other",
                      ]}
                    />
                  </Field>
                </Grid2>
              </Card>

              <Card title="Emergency contact">
                <Grid2>
                  <Field label="Contact name">
                    <Input
                      value={form.emergencyContactName || ""}
                      onChange={(v) => set("emergencyContactName", v)}
                      placeholder="Full name"
                    />
                  </Field>
                  <Field label="Contact phone">
                    <Input
                      value={form.emergencyContactPhone || ""}
                      onChange={(v) => set("emergencyContactPhone", v)}
                      placeholder="+91..."
                    />
                  </Field>
                </Grid2>
              </Card>

              <SaveButton status={saveStatus} onClick={save} />
            </Section>
          )}

          {/* ── BOOKINGS ── */}
          {activeSection === "bookings" && (
            <Section title="My bookings" sub="Active and upcoming trips">
              <EmptyOrList
                empty={true}
                emptyText="No active bookings yet"
                emptyAction={{ label: "Browse packages", href: "/packages" }}
              />
            </Section>
          )}

          {/* ── HISTORY ── */}
          {activeSection === "history" && (
            <Section
              title="Trip history"
              sub="Trips you've completed with TravelWell Delight"
            >
              <EmptyOrList
                empty={true}
                emptyText="No completed trips yet"
                emptyAction={{
                  label: "Plan your first trip",
                  href: "/packages",
                }}
              />
            </Section>
          )}

          {/* ── WISHLIST ── */}
          {activeSection === "wishlist" && (
            <Section title="Wishlist" sub="Packages you've saved for later">
              <EmptyOrList
                empty={!profile?.wishlist?.length}
                emptyText="Your wishlist is empty"
                emptyAction={{ label: "Discover packages", href: "/packages" }}
              />
            </Section>
          )}

          {/* ── PREFERENCES ── */}
          {activeSection === "preferences" && (
            <Section
              title="Travel preferences"
              sub="Helps us personalise your recommendations"
            >
              <Card title="Travel style">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        const current = form.travelStyle || [];
                        const updated = current.includes(style)
                          ? current.filter((s: string) => s !== style)
                          : [...current, style];
                        set("travelStyle", updated);
                      }}
                      className={`px-3 py-2 text-xs border transition-all rounded-sm ${
                        (form.travelStyle || []).includes(style)
                          ? "border-[#C8392B]/50 bg-[#C8392B]/10 text-white"
                          : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Other preferences">
                <Grid2>
                  <Field label="Dietary preference">
                    <Select
                      value={form.dietaryPreference || ""}
                      onChange={(v) => set("dietaryPreference", v)}
                      options={DIETARY}
                    />
                  </Field>
                  <Field label="Seat preference">
                    <Select
                      value={form.seatPreference || ""}
                      onChange={(v) => set("seatPreference", v)}
                      options={SEAT_PREF}
                    />
                  </Field>
                  <Field label="Usual trip length">
                    <Select
                      value={form.usualTripLength || ""}
                      onChange={(v) => set("usualTripLength", v)}
                      options={TRIP_LENGTHS}
                    />
                  </Field>
                  <Field label="Budget range per person">
                    <Select
                      value={form.budgetRange || ""}
                      onChange={(v) => set("budgetRange", v)}
                      options={BUDGET_RANGES}
                    />
                  </Field>
                  <Field label="Preferred language">
                    <Select
                      value={form.preferredLanguage || ""}
                      onChange={(v) => set("preferredLanguage", v)}
                      options={[
                        "English",
                        "Hindi",
                        "Marathi",
                        "Tamil",
                        "Telugu",
                        "Kannada",
                        "Bengali",
                        "Other",
                      ]}
                    />
                  </Field>
                </Grid2>
              </Card>

              <SaveButton status={saveStatus} onClick={save} />
            </Section>
          )}

          {/* ── DOCUMENTS ── */}
          {activeSection === "documents" && (
            <Section
              title="Travel documents"
              sub="Saved securely for faster bookings and visa checks"
            >
              <Card title="Passport">
                <Grid2>
                  <Field label="Passport number">
                    <Input
                      value={form.passportNumber || ""}
                      onChange={(v) => set("passportNumber", v)}
                      placeholder="A1234567"
                    />
                  </Field>
                  <Field label="Expiry date">
                    <Input
                      type="date"
                      value={form.passportExpiry || ""}
                      onChange={(v) => set("passportExpiry", v)}
                    />
                  </Field>
                  <Field label="Issuing country">
                    <Input
                      value={form.passportCountry || ""}
                      onChange={(v) => set("passportCountry", v)}
                      placeholder="India"
                    />
                  </Field>
                </Grid2>
              </Card>

              <Card title="Indian identity documents">
                <Grid2>
                  <Field label="Aadhaar number">
                    <Input
                      value={form.aadhaarNumber || ""}
                      onChange={(v) => set("aadhaarNumber", v)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </Field>
                  <Field label="PAN number">
                    <Input
                      value={form.panNumber || ""}
                      onChange={(v) => set("panNumber", v)}
                      placeholder="ABCDE1234F"
                    />
                  </Field>
                </Grid2>
              </Card>

              <div className="flex items-start gap-2 text-xs text-white/25 mt-2 mb-4">
                <Shield
                  size={12}
                  strokeWidth={1.5}
                  className="shrink-0 mt-0.5 text-white/20"
                />
                Your documents are encrypted and never shared with third
                parties.
              </div>

              <SaveButton status={saveStatus} onClick={save} />
            </Section>
          )}

          {/* ── ENQUIRIES ── */}
          {activeSection === "enquiries" && (
            <Section
              title="My enquiries"
              sub="Trip requests you've sent to our team"
            >
              <EmptyOrList
                empty={true}
                emptyText="No enquiries yet"
                emptyAction={{ label: "Plan a trip", href: "/enquiry" }}
              />
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Sub-components ──

const sectionLabelCls =
  "text-[9px] tracking-[0.2em] uppercase text-white/20 px-3 mb-1 block";

function DrawerItem({
  link,
  active,
  onClick,
}: {
  link: (typeof DRAWER_LINKS)[0];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = link.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-left transition-all text-sm ${
        active
          ? "bg-[#C8392B]/10 text-[#C8392B]"
          : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
      }`}
    >
      <Icon size={14} strokeWidth={1.5} className="shrink-0" />
      <span>{link.label}</span>
      {link.badge && (
        <span className="ml-auto text-[9px] font-bold bg-[#C8392B] text-white px-1.5 py-0.5 rounded-full">
          {link.badge}
        </span>
      )}
    </button>
  );
}

function Section({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-xl font-medium">{title}</h1>
        <p className="text-white/30 text-sm mt-1">{sub}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#111] border border-white/[0.06] p-5 rounded-sm">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
}: {
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-[#0a0a0a] border border-white/[0.08] text-white text-sm px-3 py-2.5 outline-none focus:border-white/20 transition-colors placeholder-white/15 disabled:opacity-40 disabled:cursor-not-allowed rounded-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0a0a0a] border border-white/[0.08] text-white text-sm px-3 py-2.5 outline-none focus:border-white/20 transition-colors rounded-none appearance-none"
    >
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SaveButton({
  status,
  onClick,
}: {
  status: SaveStatus;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={onClick}
        disabled={status === "saving"}
        className="flex items-center gap-2 bg-[#C8392B] hover:bg-[#A52E22] text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 transition-colors disabled:opacity-50"
      >
        {status === "saving" && (
          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {status === "saving" ? "Saving..." : "Save changes"}
      </button>
      {status === "saved" && (
        <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
          <Check size={13} strokeWidth={2} /> Saved
        </span>
      )}
      {status === "error" && (
        <span className="flex items-center gap-1.5 text-red-400 text-xs">
          <AlertCircle size={13} strokeWidth={1.5} /> Failed to save
        </span>
      )}
    </div>
  );
}

function EmptyOrList({
  empty,
  emptyText,
  emptyAction,
}: {
  empty: boolean;
  emptyText: string;
  emptyAction: { label: string; href: string };
}) {
  if (!empty) return null;
  return (
    <div className="border border-white/[0.06] rounded-sm p-12 text-center">
      <p className="text-white/30 text-sm mb-4">{emptyText}</p>
      <Link
        href={emptyAction.href}
        className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[#C8392B] hover:text-red-400 transition-colors"
      >
        {emptyAction.label}
        <ChevronRight size={12} strokeWidth={1.5} />
      </Link>
    </div>
  );
}
