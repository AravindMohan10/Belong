import { ClosingCtaSection } from "@/components/landing/closing-cta-section";
import { ClubSpotlightSection } from "@/components/landing/club-spotlight-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { getFeaturedClubs } from "@/db/queries/clubs";

export default async function Home() {
  const featuredClubs = await getFeaturedClubs();

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      {featuredClubs.length > 0 ? (
        <ClubSpotlightSection clubs={featuredClubs} />
      ) : null}
      <ClosingCtaSection />
    </>
  );
}
