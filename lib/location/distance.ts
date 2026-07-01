import type { GeoPoint } from "@/lib/location/types";

const EARTH_RADIUS_KM = 6371;

export function distanceKm(from: GeoPoint, to: GeoPoint): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latDelta = toRadians(to.latitude - from.latitude);
  const lngDelta = toRadians(to.longitude - from.longitude);
  const fromLat = toRadians(from.latitude);
  const toLat = toRadians(to.latitude);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistanceKm(distance: number | null | undefined): string | null {
  if (distance == null || Number.isNaN(distance)) {
    return null;
  }

  if (distance < 1) {
    return "Under 1 km away";
  }

  if (distance < 10) {
    return `${distance.toFixed(1)} km away`;
  }

  return `${Math.round(distance)} km away`;
}
