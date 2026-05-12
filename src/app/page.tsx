import RevealSection from "@/components/ui/RevealSection";
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
      <RevealSection delay={100}>
        <SearchBar />
      </RevealSection>
      <RevealSection delay={100}>
        <OffersStrip />
      </RevealSection>
      <RevealSection delay={100}>
        <FeaturedPackages packages={pkgs} />
      </RevealSection>
      <RevealSection delay={100}>
        <Marquee />
      </RevealSection>
      <RevealSection delay={100}>
        <StatsStrip />
      </RevealSection>
      <RevealSection delay={100}>
        <DestinationGrid destinations={dests} />
      </RevealSection>
      <RevealSection delay={100}>
        <WhyTravelWell />
      </RevealSection>
      <RevealSection delay={100}>
        <EnquiryBanner />
      </RevealSection>
    </>
  );
}
