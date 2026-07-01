import type { SessionUser } from "@/lib/types/auth";
import { getLocationFromCookie } from "@/lib/location/cookie";
import type { UserLocation } from "@/lib/location/types";

export async function resolveUserLocation(
  session: SessionUser | null,
): Promise<UserLocation | null> {
  if (
    session?.city &&
    session.latitude != null &&
    session.longitude != null
  ) {
    return {
      city: session.city,
      latitude: session.latitude,
      longitude: session.longitude,
      source: "profile",
    };
  }

  return getLocationFromCookie();
}
