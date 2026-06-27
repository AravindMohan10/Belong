import { ClubSpotlightCard } from "@/components/landing/club-spotlight-card";
import type { Club } from "@/lib/types/club";

type ClubSpotlightSectionProps = {
  clubs: Club[];
};

const rotations = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]"];

export function ClubSpotlightSection({ clubs }: ClubSpotlightSectionProps) {
  return (
    <section id="clubs" className="grain border-t border-lamp/8 bg-night-lift text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-24">
            <p className="font-hand text-3xl text-lamp">real clubs</p>
            <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
              Film walks, supper tables, board nights, morning runs
            </h2>
            <p className="mt-5 leading-relaxed text-cream/65">
              Belong is built for recurring gatherings, not one-off events. Each
              club page shows the vibe, the host, and what first-timers can
              expect before they show up alone.
            </p>
          </div>

          <div className="club-spotlight-board mt-12 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {clubs.map((club, index) => (
                <ClubSpotlightCard
                  key={club.id}
                  club={club}
                  rotateClass={rotations[index % rotations.length]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
