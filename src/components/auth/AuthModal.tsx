"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  const { refresh } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      await refresh();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      await refresh();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#111] border border-white/[0.08] relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Logo strip */}
        <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="TravelWell Delight"
              className="h-9 w-9 object-contain"
            />
            <div>
              <p
                className="text-[12px] font-semibold tracking-[0.06em] text-white"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                TravelWell{" "}
                <span className="font-light text-white/50">Delight</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06]">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className={`flex-1 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                tab === t
                  ? "text-white border-b-2 border-[#C8392B] -mb-px"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {t === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2.5 mb-5">
              <AlertCircle size={13} strokeWidth={1.5} className="shrink-0" />
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelCls}>Email address</label>
                <div className="relative">
                  <Mail
                    size={13}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <div className="relative">
                  <Lock
                    size={13}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className={`${inputCls} pl-9 pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
                  >
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className={submitCls}>
                {loading ? <Spinner /> : "Sign in"}
              </button>
              <p className="text-center text-white/25 text-xs">
                No account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className="text-[#C8392B] hover:text-red-400 transition-colors"
                >
                  Create one free
                </button>
              </p>
            </form>
          )}

          {/* SIGNUP FORM */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>First name</label>
                  <div className="relative">
                    <User
                      size={13}
                      strokeWidth={1.5}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Arjun"
                      value={signupForm.firstName}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          firstName: e.target.value,
                        })
                      }
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Last name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sharma"
                    value={signupForm.lastName}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, lastName: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Email address</label>
                <div className="relative">
                  <Mail
                    size={13}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Phone number</label>
                <div className="relative">
                  <Phone
                    size={13}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={signupForm.phone}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, phone: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <div className="relative">
                  <Lock
                    size={13}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Min. 8 characters"
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, password: e.target.value })
                    }
                    className={`${inputCls} pl-9 pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
                  >
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              <p className="text-white/20 text-[10px] leading-relaxed">
                By creating an account you agree to our terms of service and
                privacy policy.
              </p>
              <button type="submit" disabled={loading} className={submitCls}>
                {loading ? <Spinner /> : "Create account"}
              </button>
              <p className="text-center text-white/25 text-xs">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("login")}
                  className="text-[#C8392B] hover:text-red-400 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared styles ──
const labelCls =
  "block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-1.5";
const inputCls =
  "w-full bg-[#0a0a0a] border border-white/[0.08] text-white text-sm px-3 py-2.5 outline-none focus:border-white/20 transition-colors placeholder-white/15 rounded-none";
const submitCls =
  "w-full bg-[#C8392B] hover:bg-[#A52E22] text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

function Spinner() {
  return (
    <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
  );
}
