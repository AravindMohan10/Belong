export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type UserLocation = GeoPoint & {
  city: string;
  neighborhood?: string | null;
  source: "browser" | "preset" | "profile" | "manual";
};

export type ClubLocation = GeoPoint & {
  city: string;
  neighborhood: string;
};
