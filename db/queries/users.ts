import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users } from "@/db/schema";
import type { UserLocation } from "@/lib/location/types";
import type { SessionUser } from "@/lib/types/auth";

const sessionUserSelect = {
  id: users.id,
  role: users.role,
  displayName: users.displayName,
  hostClubSlug: users.hostClubSlug,
  city: users.city,
  latitude: users.latitude,
  longitude: users.longitude,
};

export async function getUserById(userId: string): Promise<SessionUser | null> {
  const db = await getDb();
  const [user] = await db
    .select(sessionUserSelect)
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

export async function upsertDemoUser(input: {
  id: string;
  role: "guest" | "host";
  displayName: string;
  hostClubSlug: string | null;
}): Promise<SessionUser> {
  const db = await getDb();

  const [user] = await db
    .insert(users)
    .values({
      id: input.id,
      role: input.role,
      displayName: input.displayName,
      hostClubSlug: input.hostClubSlug,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        role: input.role,
        displayName: input.displayName,
        hostClubSlug: input.hostClubSlug,
      },
    })
    .returning(sessionUserSelect);

  return user;
}

export async function createUser(input: {
  role: "guest" | "host";
  displayName: string;
  hostClubSlug: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}): Promise<SessionUser> {
  const db = await getDb();

  const [user] = await db
    .insert(users)
    .values({
      role: input.role,
      displayName: input.displayName,
      hostClubSlug: input.hostClubSlug,
      city: input.city ?? null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
    })
    .returning(sessionUserSelect);

  return user;
}

export async function updateUserLocation(
  userId: string,
  location: UserLocation,
): Promise<void> {
  const db = await getDb();

  await db
    .update(users)
    .set({
      city: location.city,
      latitude: location.latitude,
      longitude: location.longitude,
    })
    .where(eq(users.id, userId));
}
