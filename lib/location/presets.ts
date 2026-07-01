import type { UserLocation } from "@/lib/location/types";

export type CityPreset = Pick<UserLocation, "city" | "latitude" | "longitude">;

export const cityPresets: CityPreset[] = [
  { city: "Brooklyn, NY", latitude: 40.6782, longitude: -73.9442 },
  { city: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  { city: "Portland, OR", latitude: 45.5152, longitude: -122.6784 },
  { city: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
  { city: "San Francisco, CA", latitude: 37.7749, longitude: -122.4194 },
];

export function getCityPreset(city: string): CityPreset | null {
  const normalized = city.trim().toLowerCase();

  return (
    cityPresets.find((preset) => preset.city.toLowerCase() === normalized) ?? null
  );
}
