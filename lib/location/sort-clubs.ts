import { distanceKm } from "@/lib/location/distance";
import type { GeoPoint } from "@/lib/location/types";

export type WithCoordinates = GeoPoint & {
  city: string;
};

export type WithDistance<T extends WithCoordinates> = T & {
  distanceKm: number | null;
};

export function attachDistance<T extends WithCoordinates>(
  clubs: T[],
  origin: GeoPoint | null,
): WithDistance<T>[] {
  return clubs.map((club) => ({
    ...club,
    distanceKm: origin ? distanceKm(origin, club) : null,
  }));
}

export function sortClubsByDistance<T extends WithCoordinates>(
  clubs: T[],
  origin: GeoPoint | null,
): WithDistance<T>[] {
  const withDistance = attachDistance(clubs, origin);

  return withDistance.sort((left, right) => {
    if (left.distanceKm == null && right.distanceKm == null) {
      return left.city.localeCompare(right.city);
    }

    if (left.distanceKm == null) {
      return 1;
    }

    if (right.distanceKm == null) {
      return -1;
    }

    return left.distanceKm - right.distanceKm;
  });
}

export function partitionClubsByCity<T extends { city: string }>(
  clubs: T[],
  city: string | null,
): { nearby: T[]; elsewhere: T[] } {
  if (!city) {
    return { nearby: [], elsewhere: clubs };
  }

  const normalized = city.trim().toLowerCase();

  const nearby = clubs.filter(
    (club) => club.city.trim().toLowerCase() === normalized,
  );
  const elsewhere = clubs.filter(
    (club) => club.city.trim().toLowerCase() !== normalized,
  );

  return { nearby, elsewhere };
}
