import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/profile/ProfileClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Manage your TravelWell Delight account, bookings and preferences.",
};

export default async function ProfilePage() {
  const session = await getSession();

  // Not logged in — redirect to home
  if (!session) {
    redirect("/?auth=login");
  }

  return <ProfileClient user={session} />;
}
