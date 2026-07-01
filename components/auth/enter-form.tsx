"use client";

import { useActionState } from "react";
import { signInCustomAction, type AuthActionState } from "@/app/actions/auth";

import { cityPresets } from "@/lib/location/presets";

const initialState: AuthActionState = {};

type EnterFormProps = {
  nextPath?: string | null;
  defaultRole?: "guest" | "host";
};

function ErrorBanner({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-md border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-cream">
      {message}
    </p>
  );
}

function SubmitLabel({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="relative z-10 inline-flex w-full items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
    >
      {children}
    </button>
  );
}

export function EnterForm({ nextPath, defaultRole = "guest" }: EnterFormProps) {
  const [guestState, guestAction] = useActionState(signInCustomAction, initialState);
  const [hostState, hostAction] = useActionState(signInCustomAction, initialState);

  return (
    <div className="space-y-10">
      <ErrorBanner message={guestState.error ?? hostState.error} />

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          action={guestAction}
          className="artifact artifact-journal artifact-journal--flat space-y-4 px-6 py-6"
        >
          <input type="hidden" name="role" value="guest" />
          {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
          <p className="font-hand text-2xl text-rust">I am joining a gathering</p>
          <label className="block">
            <span className="text-sm text-ink-soft">Your name</span>
            <input
              name="displayName"
              required
              autoFocus={defaultRole === "guest"}
              className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink-soft">Your city</span>
            <select
              name="city"
              required
              defaultValue=""
              className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 focus:ring-2"
            >
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
          <SubmitLabel>Continue as guest</SubmitLabel>
        </form>

        <form
          action={hostAction}
          className="artifact artifact-note artifact-journal--flat space-y-4 px-6 py-6"
        >
          <input type="hidden" name="role" value="host" />
          {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
          <p className="font-hand text-2xl text-rust">I host a gathering</p>
          <label className="block">
            <span className="text-sm text-ink-soft">Your name</span>
            <input
              name="displayName"
              required
              autoFocus={defaultRole === "host"}
              className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2"
            />
          </label>
          <SubmitLabel>Continue as host</SubmitLabel>
          <p className="text-xs leading-relaxed text-ink-soft">
            Publish your first club after signing in.
          </p>
        </form>
      </div>
    </div>
  );
}
