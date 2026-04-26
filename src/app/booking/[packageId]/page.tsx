import { packages } from "@/data/packages";
import { notFound } from "next/navigation";
import BookingClient from "@/components/booking/BookingClient";

interface Props { params: { packageId: string } }

export default function BookingPage({ params }: Props) {
  const pkg = packages.find((p) => p.id === params.packageId);
  if (!pkg) notFound();
  return <BookingClient pkg={pkg} />;
}
