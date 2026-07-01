import { ClosingCtaSection } from "@/components/landing/closing-cta-section";
import { DiscoverTeaserSection } from "@/components/landing/discover-teaser-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { getFeaturedClubs } from "@/db/queries/clubs";
import { resolveUserLocation } from "@/lib/location/resolve";
import { getSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getSession();
  const location = await resolveUserLocation(session);
  const origin = location
    ? { latitude: location.latitude, longitude: location.longitude }
    : null;
  const featuredClubs = await getFeaturedClubs(origin);

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      {featuredClubs.length > 0 ? (
        <DiscoverTeaserSection
          clubs={featuredClubs}
          locationLabel={location?.city ?? null}
        />
      ) : null}
      <ClosingCtaSection />
    </>
  );
}
