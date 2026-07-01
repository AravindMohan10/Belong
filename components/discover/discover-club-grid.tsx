import { DiscoverClubCard } from "@/components/discover/discover-club-card";
import type { DiscoverClub } from "@/lib/types/club";

const rotations = [
  "-rotate-[0.6deg]",
  "rotate-[0.5deg]",
  "-rotate-[0.4deg]",
  "rotate-[0.7deg]",
];

type DiscoverClubGridProps = {
  nearby: DiscoverClub[];
  elsewhere: DiscoverClub[];
};

export function DiscoverClubGrid({ nearby, elsewhere }: DiscoverClubGridProps) {
  const clubs = [...nearby, ...elsewhere];

  if (clubs.length === 0) {
    return (
      <div className="artifact artifact-journal artifact-journal--flat mx-auto max-w-lg px-6 py-8 text-center text-ink">
        <p className="font-hand text-2xl text-rust">No clubs yet</p>
        <p className="mt-3 text-sm text-ink-soft">
          Hosts are publishing their first gatherings. Check back soon.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = clubs;

  return (
    <div className="discover-board mx-auto max-w-6xl space-y-10 px-6 pb-20 lg:pb-28">
      {nearby.length > 0 ? (
        <p className="font-hand text-2xl text-lamp">Near you</p>
      ) : null}

      <DiscoverClubCard club={featured} featured rotateClass="rotate-[0.3deg]" />

      {rest.length > 0 ? (
        <>
          {elsewhere.length > 0 && nearby.length > 0 ? (
            <p className="font-hand text-2xl text-lamp">Further out</p>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {rest.map((club, index) => (
              <DiscoverClubCard
                key={club.id}
                club={club}
                rotateClass={rotations[index % rotations.length]}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
