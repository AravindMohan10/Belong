"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createClubAction,
  type CreateClubActionState,
} from "@/app/actions/clubs";
import { cityPresets } from "@/lib/location/presets";
import { hostClubFormSections } from "@/lib/clubs/sections";
import type { HostFormField } from "@/lib/clubs/sections";

const initialState: CreateClubActionState = {};

const inputClass =
  "mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2";

function FormField({ field }: { field: HostFormField }) {
  const hint = field.hint ? (
    <p className="mt-1 text-xs leading-relaxed text-ink-soft">{field.hint}</p>
  ) : null;

  switch (field.kind) {
    case "select-city":
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <select name={field.name} required={field.required} className={inputClass} defaultValue="">
            <option value="" disabled>
              Pick a city
            </option>
            {cityPresets.map((preset) => (
              <option key={preset.city} value={preset.city}>
                {preset.city}
              </option>
            ))}
          </select>
          {hint}
        </label>
      );
    case "textarea":
    case "lines":
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <textarea
            name={field.name}
            required={field.required}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {hint}
        </label>
      );
    case "number":
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <input
            name={field.name}
            type="number"
            min={2}
            required={field.required}
            className={inputClass}
          />
          {hint}
        </label>
      );
    case "datetime":
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <input
            name={field.name}
            type="datetime-local"
            required={field.required}
            className={inputClass}
          />
          {hint}
        </label>
      );
    case "url":
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <input
            name={field.name}
            type="url"
            required={field.required}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {hint}
        </label>
      );
    default:
      return (
        <label className="block">
          <span className="text-sm text-ink-soft">{field.label}</span>
          <input
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {hint}
        </label>
      );
  }
}

const artifactByAudience = {
  public: "artifact-journal",
  gated: "artifact-note",
} as const;

export function CreateClubForm() {
  const [state, action] = useActionState(createClubAction, initialState);
  const sections = hostClubFormSections();

  return (
    <form action={action} className="space-y-10">
      {state.error ? (
        <p className="rounded-md border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-ink">
          {state.error}
        </p>
      ) : null}

      {sections.map((section) => (
        <section
          key={section.id}
          className={`artifact ${artifactByAudience[section.audience]} artifact-journal--flat space-y-5 px-6 py-6`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-hand text-2xl text-rust">{section.title}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs uppercase tracking-[0.14em] ${
                  section.audience === "gated"
                    ? "border border-lamp/30 bg-lamp/10 text-ink"
                    : "border border-ink/10 bg-paper-warm text-ink-soft"
                }`}
              >
                {section.audience === "gated" ? "After RSVP" : "Public page"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{section.intro}</p>
          </div>

          <div
            className={
              section.id === "club" || section.id === "gathering"
                ? "grid gap-5 sm:grid-cols-2"
                : "space-y-5"
            }
          >
            {section.fields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="relative z-10 inline-flex items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
        >
          Publish club
        </button>
        <Link href="/host" className="font-hand text-lg text-lamp hover:text-lamp-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
