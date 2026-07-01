import Link from "next/link";
import type { Club, ClubSession } from "@/lib/types/club";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type WarmStartViewProps = {
  club: Club;
  session: ClubSession;
  guestName: string;
  isFirstTimer: boolean;
  otherFirstTimers: number;
};

export function WarmStartView({
  club,
  session,
  guestName,
  isFirstTimer,
  otherFirstTimers,
}: WarmStartViewProps) {
  const warmStart = session.warmStart;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <Link
        href={`/clubs/${club.slug}`}
        className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
      >
        ← Back to {club.name}
      </Link>

      <header className="mt-8">
        <p className="font-hand text-3xl text-lamp">Warm Start</p>
        <h1 className="font-display mt-3 text-4xl leading-tight text-cream">
          {session.title}
        </h1>
        <p className="mt-3 text-cream/70">
          {formatSessionDate(session.startsAt)} · {formatSessionTime(session.startsAt)} ·{" "}
          {session.locationArea}
        </p>
      </header>

      <section className="artifact artifact-journal artifact-journal--flat mt-10 px-6 py-6 text-ink">
        <p className="font-hand text-2xl text-rust">You are expected</p>
        <p className="mt-3 text-lg leading-relaxed">
          {club.host.name} knows you are coming, {guestName}.
          {isFirstTimer ? " This is your first visit. That matters here." : ""}
        </p>
      </section>

      <section className="artifact artifact-note artifact-journal--flat mt-6 px-6 py-6 text-ink">
        <p className="font-hand text-2xl text-rust">First ten minutes</p>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          {warmStart.firstTenMinutes.map((step) => (
            <li key={step} className="flex gap-2">
              <span className="text-lamp">·</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="artifact artifact-clipboard artifact-journal--flat mt-6 px-6 py-6 text-ink">
        <p className="font-hand text-2xl text-rust">Find the group</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {warmStart.findTheGroup}
        </p>
        {warmStart.exactPin ? (
          <p className="mt-4 rounded-md border border-ink/10 bg-paper-warm px-4 py-3 text-sm text-ink">
            {warmStart.exactPin}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-ink-soft">{session.meetingPoint}</p>
      </section>

      <section className="artifact artifact-journal artifact-journal--flat mt-6 px-6 py-6 text-ink">
        <p className="font-hand text-2xl text-rust">If small talk is hard</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {warmStart.smallTalkLine}
        </p>
      </section>

      {isFirstTimer && otherFirstTimers > 0 ? (
        <section className="mt-6 rounded-md border border-lamp/20 bg-lamp/10 px-5 py-4 text-cream">
          <p className="text-sm leading-relaxed">
            {otherFirstTimers} other first-timer{otherFirstTimers === 1 ? "" : "s"} saved a
            seat for this gathering too. You are not the only new story in the room.
          </p>
        </section>
      ) : null}
    </article>
  );
}
