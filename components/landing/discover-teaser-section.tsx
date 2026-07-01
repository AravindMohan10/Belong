import Link from "next/link";
import { ClubSpotlightCard } from "@/components/landing/club-spotlight-card";
import { Button } from "@/components/ui/button";
import type { ClubSummary } from "@/lib/types/club";

type DiscoverTeaserSectionProps = {
  clubs: ClubSummary[];
  locationLabel?: string | null;
};

const rotations = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]"];

export function DiscoverTeaserSection({
  clubs,
  locationLabel,
}: DiscoverTeaserSectionProps) {
  const preview = clubs.slice(0, 4);

  return (
    <section className="grain border-t border-lamp/8 bg-night-lift text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 xl:gap-20">
          <div>
            <p className="font-hand text-3xl text-lamp">real clubs</p>
            <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
              Film walks, supper tables, board nights, morning runs
            </h2>
            <p className="mt-5 leading-relaxed text-cream/65">
              {locationLabel
                ? `Clubs near ${locationLabel}, plus gatherings worth the trip.`
                : "Recurring gatherings with a set schedule, a named host, and a clear first-visit path."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/discover">Explore gatherings</Button>
              <Link
                href="/enter"
                className="font-hand text-xl text-lamp-soft transition-colors hover:text-lamp"
              >
                Enter to save a seat →
              </Link>
            </div>
          </div>

          {preview.length > 0 ? (
            <div className="club-spotlight-board mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {preview.map((club, index) => (
                  <ClubSpotlightCard
                    key={club.id}
                    club={club}
                    rotateClass={rotations[index % rotations.length]}
                  />
                ))}
              </div>
              <p className="mt-5 text-center font-hand text-lg text-lamp/80">
                {clubs.length > preview.length
                  ? "+ more on Discover"
                  : "Browse the catalog on Discover"}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
