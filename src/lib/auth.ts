import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { IUserSession } from "@/types/user";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "travelwell-delight-secret-change-in-production",
);

const COOKIE_NAME = "tw_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// ── Sign a JWT token ──
export async function signToken(payload: IUserSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
}

// ── Verify a JWT token ──
export async function verifyToken(token: string): Promise<IUserSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as IUserSession;
  } catch {
    return null;
  }
}

// ── Get current session from cookie (server-side) ──
export async function getSession(): Promise<IUserSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ── Set session cookie ──
export async function setSessionCookie(user: IUserSession) {
  const token = await signToken(user);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

// ── Clear session cookie ──
export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
