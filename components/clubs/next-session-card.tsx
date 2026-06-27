import type { ClubSession } from "@/lib/types/club";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type NextSessionCardProps = {
  session: ClubSession;
};

export function NextSessionCard({ session }: NextSessionCardProps) {
  const spotsLabel =
    session.spotsRemaining > 0
      ? `${session.spotsRemaining} seats left`
      : "Waitlist opens when full";

  return (
    <section className="rounded-3xl border border-border bg-[#1a2332] p-8 text-white card-shadow">
      <p className="text-sm uppercase tracking-[0.24em] text-white/60">Next gathering</p>
      <h2 className="font-display mt-3 text-3xl">{session.title}</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-white/60">When</dt>
          <dd className="mt-1 text-base text-white">
            {formatSessionDate(session.startsAt)} · {formatSessionTime(session.startsAt)}
          </dd>
        </div>
        <div>
          <dt className="text-white/60">Where</dt>
          <dd className="mt-1 text-base text-white">{session.locationArea}</dd>
        </div>
        <div>
          <dt className="text-white/60">Capacity</dt>
          <dd className="mt-1 text-base text-white">{spotsLabel}</dd>
        </div>
      </dl>
      <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
        Exact meeting point shared after you save a seat.
      </p>
    </section>
  );
}
