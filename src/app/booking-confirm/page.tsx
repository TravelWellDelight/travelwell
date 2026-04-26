import Link from "next/link";

export default function BookingConfirmPage({
  searchParams,
}: {
  searchParams: { id?: string; package?: string };
}) {
  const packageName = searchParams.package ?? "your trip";
  const bookingId = searchParams.id;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Checkmark */}
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-emerald-400 text-2xl">✓</span>
        </div>

        <h1 className="font-display font-black text-white text-4xl mb-3" style={{ letterSpacing: "-0.02em" }}>
          You're going.
        </h1>
        <p className="text-[15px] text-white/50 mb-2">
          Booking confirmed for <strong className="text-white">{decodeURIComponent(packageName)}</strong>
        </p>
        {bookingId && (
          <p className="text-[11px] text-white/25 font-mono mb-8">Booking ID: {bookingId}</p>
        )}
        <p className="text-[13px] text-white/40 mb-10">
          A confirmation email has been sent. Our team will reach out within 24 hours with your trip pack.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/packages"
            className="border border-white/20 text-white text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:bg-white hover:text-black transition-all"
          >
            Browse More Tours
          </Link>
          <Link
            href="/"
            className="bg-brand-red text-white text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:bg-brand-red-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
