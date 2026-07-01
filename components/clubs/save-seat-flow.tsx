"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  completeSaveSeatAction,
  type SaveSeatActionState,
} from "@/app/actions/rsvp";
import { cityPresets } from "@/lib/location/presets";
import type { Club, ClubSession } from "@/lib/types/club";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

const initialState: SaveSeatActionState = {};

const inputClass =
  "mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2";

type SaveSeatFlowProps = {
  club: Club;
  session: ClubSession;
  guestName: string | null;
};

export function SaveSeatFlow({ club, session, guestName }: SaveSeatFlowProps) {
  const [state, action] = useActionState(completeSaveSeatAction, initialState);
  const spotsLabel =
    session.spotsRemaining > 0
      ? `${session.spotsRemaining} seats left`
      : "Full";

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href={`/clubs/${club.slug}`}
        className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
      >
        ← Back to {club.name}
      </Link>

      <header className="mt-8">
        <p className="font-hand text-3xl text-lamp">Save a seat</p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-cream">
          {session.title}
        </h1>
        <p className="mt-2 text-cream/65">{club.name}</p>
      </header>

      <section className="artifact artifact-clipboard artifact-journal--flat mt-8 px-6 py-6 text-ink">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-ink-soft">When</dt>
            <dd className="mt-1 text-base text-ink">
              {formatSessionDate(session.startsAt)} · {formatSessionTime(session.startsAt)}
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Where</dt>
            <dd className="mt-1 text-base text-ink">
              {club.neighborhood} · {club.city}
            </dd>
            <dd className="mt-1 text-sm text-ink-soft">{session.locationArea}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Capacity</dt>
            <dd className="mt-1 text-base text-ink">{spotsLabel}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-ink-soft">
          Warm Start unlocks after you confirm, with where to meet and what to
          do in the first ten minutes. {club.host.name} will see your name on the
          guest list.
        </p>
      </section>

      <form action={action} className="artifact artifact-journal artifact-journal--flat mt-6 space-y-5 px-6 py-6 text-ink">
        <input type="hidden" name="clubSlug" value={club.slug} />
        <input type="hidden" name="sessionId" value={session.id} />

        {guestName ? (
          <div>
            <p className="text-sm text-ink-soft">Saving as</p>
            <p className="mt-1 text-lg font-medium text-ink">{guestName}</p>
          </div>
        ) : (
          <>
            <label className="block">
              <span className="text-sm text-ink-soft">Your name</span>
              <input
                name="displayName"
                required
                autoComplete="name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">Your city</span>
              <select name="city" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Where are you based?
                </option>
                {cityPresets.map((preset) => (
                  <option key={preset.city} value={preset.city}>
                    {preset.city}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {state.error ? (
          <p className="text-sm text-rust">{state.error}</p>
        ) : null}

        <button
          type="submit"
          className="relative z-10 inline-flex w-full items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
        >
          Confirm seat
        </button>
      </form>
    </div>
  );
}
