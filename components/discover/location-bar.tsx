"use client";

import { useActionState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  updateLocationAction,
  type LocationActionState,
} from "@/app/actions/location";
import { cityPresets } from "@/lib/location/presets";
import type { UserLocation } from "@/lib/location/types";

const initialState: LocationActionState = {};

type LocationBarProps = {
  location: UserLocation | null;
};

export function LocationBar({ location }: LocationBarProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(updateLocationAction, initialState);

  function submitLocation(input: {
    city: string;
    latitude: number;
    longitude: number;
    source: "browser" | "preset" | "manual";
  }) {
    const form = formRef.current;

    if (!form) {
      return;
    }

    (form.elements.namedItem("city") as HTMLInputElement).value = input.city;
    (form.elements.namedItem("latitude") as HTMLInputElement).value = String(
      input.latitude,
    );
    (form.elements.namedItem("longitude") as HTMLInputElement).value = String(
      input.longitude,
    );
    (form.elements.namedItem("source") as HTMLInputElement).value = input.source;
    form.requestSubmit();
    router.refresh();
  }

  function useBrowserLocation() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        submitLocation({
          city: location?.city ?? "Near you",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: "browser",
        });
      },
      () => undefined,
      { enableHighAccuracy: false, timeout: 10000 },
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-6">
      <form ref={formRef} action={action} className="hidden">
        <input type="hidden" name="city" defaultValue={location?.city ?? ""} />
        <input type="hidden" name="latitude" defaultValue={location?.latitude ?? ""} />
        <input type="hidden" name="longitude" defaultValue={location?.longitude ?? ""} />
        <input type="hidden" name="source" defaultValue="preset" />
      </form>

      <div className="artifact artifact-journal artifact-journal--flat flex flex-col gap-4 px-5 py-5 text-ink sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-hand text-xl text-rust">Your area</p>
          <p className="mt-1 text-sm text-ink-soft">
            {location
              ? `Showing gatherings near ${location.city}`
              : "Set your location to see clubs closest to you first."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={useBrowserLocation}
            className="font-hand text-lg text-lamp transition-colors hover:text-rust"
          >
            Use my location
          </button>

          <label className="sr-only" htmlFor="discover-city">
            City
          </label>
          <select
            id="discover-city"
            defaultValue={location?.city ?? ""}
            className="rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none ring-lamp/30 focus:ring-2"
            onChange={(event) => {
              const preset = cityPresets.find(
                (item) => item.city === event.target.value,
              );

              if (!preset) {
                return;
              }

              submitLocation({
                city: preset.city,
                latitude: preset.latitude,
                longitude: preset.longitude,
                source: "preset",
              });
            }}
          >
            <option value="" disabled>
              Pick a city
            </option>
            {cityPresets.map((preset) => (
              <option key={preset.city} value={preset.city}>
                {preset.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.error ? (
        <p className="mt-3 text-sm text-rust">{state.error}</p>
      ) : null}
    </section>
  );
}
