import { DiscoverClubGrid } from "@/components/discover/discover-club-grid";
import { DiscoverHero } from "@/components/discover/discover-hero";
import { LocationBar } from "@/components/discover/location-bar";
import { getDiscoverClubs } from "@/db/queries/clubs";
import { resolveUserLocation } from "@/lib/location/resolve";
import { partitionClubsByCity } from "@/lib/location/sort-clubs";
import { getSession } from "@/lib/auth/session";

export const metadata = {
  title: "Discover",
  description:
    "Browse recurring gatherings near you: film walks, supper clubs, board nights, and more.",
};

export default async function DiscoverPage() {
  const session = await getSession();
  const location = await resolveUserLocation(session);
  const origin = location
    ? { latitude: location.latitude, longitude: location.longitude }
    : null;
  const clubs = await getDiscoverClubs(origin);
  const { nearby, elsewhere } = partitionClubsByCity(
    clubs,
    location?.city ?? null,
  );

  return (
    <article className="grain min-h-full bg-night text-cream">
      <DiscoverHero
        session={session}
        clubCount={clubs.length}
        locationLabel={location?.city ?? null}
        nearbyCount={nearby.length}
      />
      <LocationBar location={location} />
      <DiscoverClubGrid nearby={nearby} elsewhere={elsewhere} />
    </article>
  );
}
