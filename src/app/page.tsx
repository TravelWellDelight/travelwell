import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import OffersStrip from "@/components/home/OffersStrip";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Marquee from "@/components/home/Marquee";
import StatsStrip from "@/components/home/StatsStrip";
import DestinationGrid from "@/components/home/DestinationGrid";
import WhyTravelWell from "@/components/home/WhyTravelWell";
import EnquiryBanner from "@/components/home/EnquiryBanner";
import { getFeaturedPackages } from "@/data/packages";
import { getFeaturedDestinations } from "@/data/destinations";

export default function HomePage() {
  const pkgs = getFeaturedPackages();
  const dests = getFeaturedDestinations();

  return (
    <>
      <HeroSection />
      <SearchBar />
      <OffersStrip />
      <FeaturedPackages packages={pkgs} />
      <Marquee />
      <StatsStrip />
      <DestinationGrid destinations={dests} />
      <WhyTravelWell />
      <EnquiryBanner />
    </>
  );
}
