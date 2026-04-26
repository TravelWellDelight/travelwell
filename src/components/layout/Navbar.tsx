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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#7b7b7b] backdrop-blur-md border-b border-#f5f4f3"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="TravelWell Delight"
              width={140}
              height={55}
              className="h-14 w-auto object-contain"
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
                /* Logged in — avatar */
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
                /* Logged out — sign in / sign up */
                <div className="hidden md:flex items-center gap-2">
                  {/* <button
                    onClick={openLogin}
                    className="text-[11px] tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors px-2"
                  >
                    Sign in
                  </button> */}
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

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white/60 hover:text-white transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#0C0B09]/98 border-t border-white/[0.06] px-5 py-6 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[12px] tracking-[0.1em] uppercase text-white/55 hover:text-white py-2.5 border-b border-white/[0.05] last:border-0 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-3 text-white/60"
              >
                <div className="w-8 h-8 rounded-full bg-[#C8392B] flex items-center justify-center text-white text-[11px] font-bold">
                  {initials}
                </div>
                {user.firstName} {user.lastName}
              </Link>
            ) : (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    openLogin();
                    setOpen(false);
                  }}
                  className="flex-1 border border-white/20 text-white text-[11px] font-bold tracking-[0.15em] uppercase py-3 text-center"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    openSignup();
                    setOpen(false);
                  }}
                  className="flex-1 bg-[#C8392B] text-white text-[11px] font-bold tracking-[0.15em] uppercase py-3 text-center"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {showAuth && (
        <AuthModal defaultTab={authTab} onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}
