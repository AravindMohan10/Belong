import { and, count, eq, ne } from "drizzle-orm";
import { getDb } from "@/db/client";
import { rsvps, users } from "@/db/schema";

export type RsvpWithGuest = {
  id: string;
  userId: string;
  displayName: string;
  isFirstTimer: boolean;
  createdAt: Date;
};

export async function userHasPriorClubRsvp(
  userId: string,
  clubId: string,
): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: rsvps.id })
    .from(rsvps)
    .where(
      and(
        eq(rsvps.userId, userId),
        eq(rsvps.clubId, clubId),
        eq(rsvps.status, "confirmed"),
      ),
    )
    .limit(1);

  return Boolean(row);
}

export async function getUserRsvpForSession(
  userId: string,
  sessionId: string,
): Promise<{ id: string; status: string; isFirstTimer: boolean } | null> {
  const db = await getDb();
  const [row] = await db
    .select({
      id: rsvps.id,
      status: rsvps.status,
      isFirstTimer: rsvps.isFirstTimer,
    })
    .from(rsvps)
    .where(and(eq(rsvps.userId, userId), eq(rsvps.sessionId, sessionId)))
    .limit(1);

  return row ?? null;
}

export async function createRsvp(input: {
  userId: string;
  clubId: string;
  sessionId: string;
  isFirstTimer: boolean;
}): Promise<{ id: string; created: boolean }> {
  const db = await getDb();

  const existing = await getUserRsvpForSession(input.userId, input.sessionId);

  if (existing?.status === "confirmed") {
    return { id: existing.id, created: false };
  }

  const [row] = await db
    .insert(rsvps)
    .values({
      userId: input.userId,
      clubId: input.clubId,
      sessionId: input.sessionId,
      status: "confirmed",
      isFirstTimer: input.isFirstTimer,
    })
    .onConflictDoUpdate({
      target: [rsvps.userId, rsvps.sessionId],
      set: {
        status: "confirmed",
        isFirstTimer: input.isFirstTimer,
      },
    })
    .returning({ id: rsvps.id });

  return { id: row.id, created: !existing };
}

export async function countSessionRsvps(sessionId: string): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ total: count() })
    .from(rsvps)
    .where(and(eq(rsvps.sessionId, sessionId), eq(rsvps.status, "confirmed")));

  return Number(row?.total ?? 0);
}

export async function countSessionFirstTimers(sessionId: string): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ total: count() })
    .from(rsvps)
    .where(
      and(
        eq(rsvps.sessionId, sessionId),
        eq(rsvps.status, "confirmed"),
        eq(rsvps.isFirstTimer, true),
      ),
    );

  return Number(row?.total ?? 0);
}

export async function countOtherFirstTimersForSession(
  sessionId: string,
  userId: string,
): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ total: count() })
    .from(rsvps)
    .where(
      and(
        eq(rsvps.sessionId, sessionId),
        eq(rsvps.status, "confirmed"),
        eq(rsvps.isFirstTimer, true),
        ne(rsvps.userId, userId),
      ),
    );

  return Number(row?.total ?? 0);
}

export async function listSessionRsvps(
  sessionId: string,
): Promise<RsvpWithGuest[]> {
  const db = await getDb();
  const rows = await db
    .select({
      id: rsvps.id,
      userId: rsvps.userId,
      displayName: users.displayName,
      isFirstTimer: rsvps.isFirstTimer,
      createdAt: rsvps.createdAt,
    })
    .from(rsvps)
    .innerJoin(users, eq(rsvps.userId, users.id))
    .where(and(eq(rsvps.sessionId, sessionId), eq(rsvps.status, "confirmed")))
    .orderBy(rsvps.createdAt);

  return rows;
}
