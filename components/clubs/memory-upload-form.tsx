"use client";

import { useActionState } from "react";
import {
  submitMemoryAction,
  type SubmitMemoryActionState,
} from "@/app/actions/memories";
import type { MemoryEligibleSession } from "@/lib/types/club";

const initialState: SubmitMemoryActionState = {};

const inputClass =
  "mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2";

type MemoryUploadFormProps = {
  clubSlug: string;
  eligibleSessions: MemoryEligibleSession[];
};

export function MemoryUploadForm({
  clubSlug,
  eligibleSessions,
}: MemoryUploadFormProps) {
  const [state, action] = useActionState(submitMemoryAction, initialState);

  if (eligibleSessions.length === 0) {
    return null;
  }

  return (
    <form
      action={action}
      className="rounded-md border border-lamp/25 bg-lamp/10 px-5 py-5 text-ink"
    >
      <p className="font-hand text-xl text-rust">Share your memory</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        You attended this club. Add photos and a few words for people still deciding
        whether to save a seat.
      </p>

      <input type="hidden" name="clubSlug" value={clubSlug} />

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-ink-soft">Which gathering</span>
          <select name="sessionId" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Pick a night you attended
            </option>
            {eligibleSessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.dateLabel} · {session.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-ink-soft">Your words</span>
          <textarea
            name="review"
            required
            rows={3}
            placeholder="I showed up alone and..."
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink-soft">Photo URLs</span>
          <textarea
            name="photoUrls"
            required
            rows={3}
            placeholder={"https://...\nhttps://..."}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-ink-soft">One image URL per line.</p>
        </label>
      </div>

      {state.error ? <p className="mt-4 text-sm text-rust">{state.error}</p> : null}
      {state.success ? (
        <p className="mt-4 text-sm text-ink">Memory posted. Thank you.</p>
      ) : null}

      <button
        type="submit"
        className="relative z-10 mt-5 inline-flex items-center justify-center font-hand text-[1.1rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
      >
        Post memory
      </button>
    </form>
  );
}
