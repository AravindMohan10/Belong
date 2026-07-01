export type UserRole = "guest" | "host";

export type SessionUser = {
  id: string;
  role: UserRole;
  displayName: string;
  hostClubSlug: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type DemoPersona = {
  id: string;
  role: UserRole;
  displayName: string;
  hostClubSlug: string | null;
  tagline: string;
};
