import { cookies } from "next/headers";
import { z } from "zod";
import { LOCATION_COOKIE } from "@/lib/location/constants";
import type { UserLocation } from "@/lib/location/types";

const locationCookieSchema = z.object({
  city: z.string().min(1),
  neighborhood: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  source: z.enum(["browser", "preset", "profile", "manual"]),
});

export async function getLocationFromCookie(): Promise<UserLocation | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCATION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const parsed = locationCookieSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function setLocationCookie(location: UserLocation): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(LOCATION_COOKIE, JSON.stringify(location), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
