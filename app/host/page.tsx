import Link from "next/link";
import { redirect } from "next/navigation";
import { getClubsByHostUserId } from "@/db/queries/clubs";
import { getSession } from "@/lib/auth/session";

export const metadata = {
  title: "Host · Belong",
};

export default async function HostHomePage() {
  const session = await getSession();

  if (!session) {
    redirect("/enter?next=/host");
  }

  const clubs = await getClubsByHostUserId(session.id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-lamp">host</p>
          <h1 className="font-display mt-2 text-4xl leading-tight">
            Hi, {session.displayName}
          </h1>
          <p className="mt-2 text-cream/65">
            Your clubs, tonight&apos;s lists, and the people who come back.
          </p>
        </div>
        <Link
          href="/host/clubs/new"
          className="relative z-10 inline-flex items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
        >
          Create a club
        </Link>
      </div>

      <section className="mt-10 space-y-4">
        {clubs.length === 0 ? (
          <div className="artifact artifact-journal artifact-journal--flat px-6 py-6 text-ink">
            <p className="font-hand text-2xl text-rust">No clubs yet</p>
            <p className="mt-3 text-sm text-ink-soft">
              Publish your first recurring gathering. Belong will handle saved seats
              and Warm Start for first-timers.
            </p>
          </div>
        ) : (
          clubs.map((club) => (
            <Link
              key={club.id}
              href={`/host/clubs/${club.slug}`}
              className="artifact artifact-clipboard artifact-journal--flat block px-6 py-5 transition-transform hover:-translate-y-0.5"
            >
              <p className="font-hand text-lg text-rust">{club.ritualLabel}</p>
              <p className="font-display mt-1 text-2xl text-ink">{club.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{club.tagline}</p>
              <p className="font-hand mt-3 text-lg text-lamp">Open Tonight →</p>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
