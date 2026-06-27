export type UserRole = "guest" | "host";

export type SessionUser = {
  id: string;
  role: UserRole;
  displayName: string;
  hostClubSlug: string | null;
};

export type DemoPersona = {
  id: string;
  role: UserRole;
  displayName: string;
  hostClubSlug: string | null;
  tagline: string;
};
