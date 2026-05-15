"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const NAV_LINKS = [
  { href: "/", label: "Main" },
  { href: "/packages", label: "Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About us" },
  { href: "/planner", label: "Planner" },
  { href: "/enquiry", label: "Contact" },
  { href: "/blog", label: "Stories" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isPackageDetail =
    pathname?.startsWith("/packages/") && pathname !== "/packages";
  if (isPackageDetail) return null;

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  const openSignup = () => {
    setAuthTab("signup");
    setShowAuth(true);
  };
  const openLogin = () => {
    setAuthTab("login");
    setShowAuth(true);
  };

  return (
    <>
      {/* ── Navbar bar — z-[60] so it's always on top ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-stone-400 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="TravelWell Delight"
              width={160}
              height={56}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/50 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!loading &&
              (user ? (
                <button
                  onClick={() => router.push("/profile")}
                  className="hidden md:flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C8392B] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-transparent group-hover:ring-[#C8392B]/50 transition-all overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={initials}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={openSignup}
                    className="border border-white/20 hover:border-white/40 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              ))}

            <Link
              href="/packages"
              className="hidden md:block bg-[#C8392B] hover:bg-[#A52E22] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 transition-colors"
            >
              Book
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu — sibling of header, z-[59] sits just below navbar ── */}
      {open && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-0 bg-[#0C0B09] z-[59] flex flex-col overflow-y-auto"
          style={{ top: "80px" }}
        >
          {/* Nav links */}
          <nav className="flex flex-col px-6 pt-6 pb-4 border-b border-white/[0.06]">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[13px] tracking-[0.15em] uppercase text-white/60 hover:text-white py-4 border-b border-white/[0.05] last:border-0 transition-colors flex items-center justify-between"
              >
                {l.label}
                <span className="text-white/20 text-lg">›</span>
              </Link>
            ))}
          </nav>

          {/* Auth + CTA */}
          <div className="px-6 pt-6 flex flex-col gap-3">
            {user ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 text-white/60 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#C8392B] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-white/40 text-[11px]">View profile</p>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                {/* <button
                  onClick={() => {
                    openLogin();
                    setOpen(false);
                  }}
                  className="w-full border border-white/20 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 text-center hover:border-white/40 transition-colors"
                >
                  Sign in
                </button> */}
                <button
                  onClick={() => {
                    openSignup();
                    setOpen(false);
                  }}
                  className="w-full bg-white/10 text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 text-center hover:bg-white/15 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}

            <Link
              href="/packages"
              onClick={() => setOpen(false)}
              className="w-full bg-[#C8392B] hover:bg-[#A52E22] text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 text-center transition-colors mt-1"
            >
              Book a Trip
            </Link>
          </div>

          {/* Bottom tagline */}
          <div className="mt-auto px-6 py-8">
            <p className="text-[11px] text-white/20 tracking-[0.1em] uppercase">
              TravelWell Delight · Life Beyond Limitations
            </p>
          </div>
        </div>
      )}

      {showAuth && (
        <AuthModal defaultTab={authTab} onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}
