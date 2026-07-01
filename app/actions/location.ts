"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateUserLocation } from "@/db/queries/users";
import { setLocationCookie } from "@/lib/location/cookie";
import { getCityPreset } from "@/lib/location/presets";
import type { UserLocation } from "@/lib/location/types";
import { getSession } from "@/lib/auth/session";

const updateLocationSchema = z.object({
  city: z.string().trim().min(2).max(80),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  source: z.enum(["browser", "preset", "manual"]),
});

export type LocationActionState = {
  error?: string;
  saved?: boolean;
};

export async function updateLocationAction(
  _prevState: LocationActionState,
  formData: FormData,
): Promise<LocationActionState> {
  const parsed = updateLocationSchema.safeParse({
    city: formData.get("city"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    source: formData.get("source"),
  });

  if (!parsed.success) {
    return { error: "Pick a valid location to continue." };
  }

  const location: UserLocation = parsed.data;
  await setLocationCookie(location);

  const session = await getSession();

  if (session) {
    await updateUserLocation(session.id, location);
  }

  revalidatePath("/");
  revalidatePath("/discover");

  return { saved: true };
}

export async function updateLocationFromPresetAction(
  city: string,
): Promise<LocationActionState> {
  const preset = getCityPreset(city);

  if (!preset) {
    return { error: "That city is not available yet." };
  }

  const formData = new FormData();
  formData.set("city", preset.city);
  formData.set("latitude", String(preset.latitude));
  formData.set("longitude", String(preset.longitude));
  formData.set("source", "preset");

  return updateLocationAction({}, formData);
}
