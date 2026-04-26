import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "TravelWell Delight — Curated Journeys, Crafted for You",
    template: "%s | TravelWell Delight",
  },
  description:
    "Handcrafted travel packages to the world's most extraordinary destinations.",
  openGraph: {
    title: "TravelWell Delight",
    description: "Handcrafted travel packages to extraordinary destinations.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "TravelWell Delight",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased overflow-x-hidden transition-colors duration-300"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
