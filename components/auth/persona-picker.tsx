"use client";

import { useActionState } from "react";
import {
  signInCustomAction,
  signInWithPersonaAction,
  type AuthActionState,
} from "@/app/actions/auth";
import { demoPersonas } from "@/lib/auth/demo-personas";

const initialState: AuthActionState = {};

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

export function PersonaPicker() {
  const [personaState, personaAction] = useActionState(
    signInWithPersonaAction,
    initialState,
  );
  const [guestState, guestAction] = useActionState(
    signInCustomAction,
    initialState,
  );
  const [hostState, hostAction] = useActionState(signInCustomAction, initialState);

  return (
    <div className="space-y-10">
      <ErrorBanner
        message={
          personaState.error ?? guestState.error ?? hostState.error
        }
      />

      <div>
        <p className="font-hand text-xl text-lamp">pick a demo persona</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {demoPersonas.map((persona) => (
            <form key={persona.id} action={personaAction}>
              <input type="hidden" name="personaId" value={persona.id} />
              <button
                type="submit"
                className="artifact artifact-note artifact-journal--flat w-full rotate-0 px-5 py-5 text-left transition-transform hover:-translate-y-0.5"
              >
                <p className="font-hand text-2xl text-rust">{persona.displayName}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
                  {persona.role === "guest" ? "Guest" : "Host"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {persona.tagline}
                </p>
              </button>
            </form>
          ))}
        </div>
      </div>

      <div className="border-t border-lamp/10 pt-8">
        <p className="font-hand text-xl text-lamp">or use your name</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <form action={guestAction} className="space-y-4">
            <input type="hidden" name="role" value="guest" />
            <label className="block">
              <span className="text-sm text-cream/60">Your name</span>
              <input
                name="displayName"
                required
                placeholder="Alex"
                className="mt-2 w-full rounded-md border border-cream/15 bg-night/40 px-4 py-2.5 text-cream outline-none ring-lamp/30 placeholder:text-cream/30 focus:ring-2"
              />
            </label>
            <SubmitLabel>Enter as guest</SubmitLabel>
          </form>

          <form action={hostAction} className="space-y-4">
            <input type="hidden" name="role" value="host" />
            <label className="block">
              <span className="text-sm text-cream/60">Your name</span>
              <input
                name="displayName"
                required
                placeholder="Mara"
                className="mt-2 w-full rounded-md border border-cream/15 bg-night/40 px-4 py-2.5 text-cream outline-none ring-lamp/30 placeholder:text-cream/30 focus:ring-2"
              />
            </label>
            <SubmitLabel>Enter as host</SubmitLabel>
            <p className="text-xs leading-relaxed text-cream/45">
              Demo hosts land on Sunday Cinema Walks for now.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
