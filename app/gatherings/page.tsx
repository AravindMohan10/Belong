import Link from "next/link";
import { GatheringCard } from "@/components/gatherings/gathering-card";
import { getUserUpcomingGatherings } from "@/db/queries/gatherings";
import { requireGuestSession } from "@/lib/guest/session";

export const metadata = {
  title: "My gatherings · Belong",
  description: "Your saved seats, Warm Starts, and upcoming rituals.",
};

export default async function GatheringsPage() {
  const session = await requireGuestSession("/gatherings");
  const gatherings = await getUserUpcomingGatherings(session.id);
  const [nextGathering, ...laterGatherings] = gatherings;

  return (
    <article className="grain min-h-full bg-night text-cream">
        <header className="mx-auto max-w-6xl px-6 pb-8 pt-10 lg:pt-12">
          <p className="font-hand text-3xl text-lamp">my gatherings</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
            What you&apos;re showing up for
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/65">
            Saved seats, Warm Starts, and the doorways you&apos;ve already walked
            toward. Once you have a seat saved, this is where you come back.
          </p>
        </header>

        <div className="mx-auto max-w-6xl space-y-6 px-6 pb-20 lg:space-y-8 lg:pb-28">
          {nextGathering ? (
            <>
              <section>
                <p className="mb-4 font-hand text-xl text-stone">This week</p>
                <GatheringCard gathering={nextGathering} featured />
              </section>

              {laterGatherings.length > 0 ? (
                <section>
                  <p className="mb-4 font-hand text-xl text-stone">Later</p>
                  <div className="space-y-5">
                    {laterGatherings.map((gathering) => (
                      <GatheringCard key={gathering.rsvpId} gathering={gathering} />
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <div className="artifact artifact-journal artifact-journal--flat max-w-lg px-6 py-8 text-ink">
              <p className="font-hand text-2xl text-rust">No seats saved yet</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                When you save a seat at a club, it lands here with your Warm
                Start and gathering details.
              </p>
              <Link
                href="/discover"
                className="mt-5 inline-block font-hand text-xl text-lamp hover:text-rust"
              >
                Discover gatherings →
              </Link>
            </div>
          )}
        </div>
      </article>
  );
}
