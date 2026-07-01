import Link from "next/link";
import type { ClubSession } from "@/lib/types/club";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type NextSessionCardProps = {
  clubSlug: string;
  session: ClubSession;
  isHostViewer: boolean;
  hasRsvp: boolean;
};

export function NextSessionCard({
  clubSlug,
  session,
  isHostViewer,
  hasRsvp,
}: NextSessionCardProps) {
  const spotsLabel =
    session.spotsRemaining > 0
      ? `${session.spotsRemaining} seats left`
      : "Full";
  const saveHref = `/clubs/${clubSlug}/save`;

  return (
    <section className="artifact artifact-clipboard artifact-journal--flat rotate-0 px-6 py-6">
      <p className="font-hand text-2xl text-rust">Next gathering</p>
      <h2 className="font-display mt-3 text-3xl text-ink">{session.title}</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-ink-soft">When</dt>
          <dd className="mt-1 text-base text-ink">
            {formatSessionDate(session.startsAt)} · {formatSessionTime(session.startsAt)}
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Where</dt>
          <dd className="mt-1 text-base text-ink">{session.locationArea}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Capacity</dt>
          <dd className="mt-1 text-base text-ink">{spotsLabel}</dd>
        </div>
      </dl>

      <p className="mt-6 rounded-md border border-ink/10 bg-paper-warm px-4 py-3 text-sm text-ink-soft">
        Where to meet unlocks in Warm Start after you confirm.
      </p>

      {hasRsvp ? (
        <div className="artifact artifact-ticket mt-6 space-y-3 px-4 py-4">
          <p className="font-hand text-xl text-rust">You are on the list</p>
          <p className="text-sm text-ink-soft">Your Warm Start is ready.</p>
          <Link
            href={`/clubs/${clubSlug}/warm-start`}
            className="font-hand text-lg text-lamp transition-colors hover:text-rust"
          >
            Open Warm Start →
          </Link>
        </div>
      ) : isHostViewer ? (
        <p className="mt-6 text-sm text-ink-soft">
          You host this club. Open{" "}
          <Link href={`/host/clubs/${clubSlug}`} className="text-lamp hover:text-lamp-soft">
            Tonight
          </Link>{" "}
          to see who is coming.
        </p>
      ) : session.spotsRemaining <= 0 ? (
        <p className="mt-6 rounded-md border border-ink/10 bg-paper-warm px-4 py-3 text-sm text-ink-soft">
          This gathering is full. Check back for the next date.
        </p>
      ) : (
        <Link
          href={saveHref}
          className="relative z-10 mt-6 inline-flex w-full items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
        >
          Save a seat
        </Link>
      )}
    </section>
  );
}
