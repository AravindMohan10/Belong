import type { SessionUser } from "@/lib/types/auth";

type DiscoverHeroProps = {
  session: SessionUser | null;
  clubCount: number;
  locationLabel: string | null;
  nearbyCount: number;
};

export function DiscoverHero({
  session,
  clubCount,
  locationLabel,
  nearbyCount,
}: DiscoverHeroProps) {
  return (
    <header className="discover-hero relative overflow-hidden px-6 pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="discover-hero__glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-hand text-3xl text-lamp sm:text-4xl">discover</p>

        {session?.role === "guest" ? (
          <p className="mt-3 font-hand text-xl text-lamp-soft/90 sm:text-2xl">
            Hi {session.displayName}. Pick a gathering and save a seat.
          </p>
        ) : null}

        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
          {locationLabel
            ? `Gatherings near ${locationLabel}`
            : "Gatherings worth coming back to"}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65">
          Recurring clubs for people who want to show up alone without feeling
          alone. Sorted by distance. Each page shows the host, the schedule,
          and what first-timers should know before they arrive.
        </p>

        <p className="mt-6 font-hand text-xl text-stone sm:text-2xl">
          {locationLabel && nearbyCount > 0
            ? `${nearbyCount} in ${locationLabel} · ${clubCount} total`
            : `${clubCount} ${clubCount === 1 ? "club" : "clubs"} open right now`}
        </p>
      </div>
    </header>
  );
}
