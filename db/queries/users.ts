import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users } from "@/db/schema";
import type { SessionUser } from "@/lib/types/auth";

export async function getUserById(userId: string): Promise<SessionUser | null> {
  const db = await getDb();
  const [user] = await db
    .select({
      id: users.id,
      role: users.role,
      displayName: users.displayName,
      hostClubSlug: users.hostClubSlug,
    })
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
    .returning({
      id: users.id,
      role: users.role,
      displayName: users.displayName,
      hostClubSlug: users.hostClubSlug,
    });

  return user;
}

export async function createUser(input: {
  role: "guest" | "host";
  displayName: string;
  hostClubSlug: string | null;
}): Promise<SessionUser> {
  const db = await getDb();

  const [user] = await db
    .insert(users)
    .values({
      role: input.role,
      displayName: input.displayName,
      hostClubSlug: input.hostClubSlug,
    })
    .returning({
      id: users.id,
      role: users.role,
      displayName: users.displayName,
      hostClubSlug: users.hostClubSlug,
    });

  return user;
}
