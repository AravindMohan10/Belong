import { and, eq, lt, notExists, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { clubMemories, clubSessions, rsvps } from "@/db/schema";
import { formatMemoryDateLabel } from "@/lib/format";
import type { ClubMemory, MemoryEligibleSession } from "@/lib/types/club";

export async function getMemoriesForClub(clubId: string): Promise<ClubMemory[]> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(clubMemories)
    .where(eq(clubMemories.clubId, clubId))
    .orderBy(sql`${clubMemories.createdAt} desc`);

  return rows.map((memory) => ({
    id: memory.id,
    sessionId: memory.sessionId,
    sessionTitle: memory.sessionTitle,
    dateLabel: memory.dateLabel,
    review: memory.review,
    reviewerName: memory.reviewerName,
    photoUrls: memory.photoUrls,
    verified: memory.userId !== null,
  }));
}

export async function listEligibleSessionsForMemoryUpload(
  userId: string,
  clubId: string,
): Promise<MemoryEligibleSession[]> {
  const db = await getDb();
  const rows = await db
    .select({
      id: clubSessions.id,
      title: clubSessions.title,
      startsAt: clubSessions.startsAt,
    })
    .from(rsvps)
    .innerJoin(clubSessions, eq(rsvps.sessionId, clubSessions.id))
    .where(
      and(
        eq(rsvps.userId, userId),
        eq(rsvps.clubId, clubId),
        eq(rsvps.status, "confirmed"),
        lt(clubSessions.startsAt, sql`now()`),
        notExists(
          db
            .select({ id: clubMemories.id })
            .from(clubMemories)
            .where(
              and(
                eq(clubMemories.userId, userId),
                eq(clubMemories.sessionId, clubSessions.id),
              ),
            ),
        ),
      ),
    )
    .orderBy(sql`${clubSessions.startsAt} desc`);

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    dateLabel: formatMemoryDateLabel(row.startsAt),
  }));
}

export async function userAttendedSession(
  userId: string,
  sessionId: string,
  clubId: string,
): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: rsvps.id })
    .from(rsvps)
    .innerJoin(clubSessions, eq(rsvps.sessionId, clubSessions.id))
    .where(
      and(
        eq(rsvps.userId, userId),
        eq(rsvps.sessionId, sessionId),
        eq(rsvps.clubId, clubId),
        eq(rsvps.status, "confirmed"),
        lt(clubSessions.startsAt, sql`now()`),
      ),
    )
    .limit(1);

  return Boolean(row);
}

export async function createGuestMemory(input: {
  userId: string;
  clubId: string;
  sessionId: string;
  reviewerName: string;
  review: string;
  photoUrls: string[];
}): Promise<{ id: string }> {
  const attended = await userAttendedSession(
    input.userId,
    input.sessionId,
    input.clubId,
  );

  if (!attended) {
    throw new Error("You can only share a memory for a gathering you attended.");
  }

  const db = await getDb();
  const [session] = await db
    .select({
      title: clubSessions.title,
      startsAt: clubSessions.startsAt,
      clubId: clubSessions.clubId,
    })
    .from(clubSessions)
    .where(eq(clubSessions.id, input.sessionId))
    .limit(1);

  if (!session || session.clubId !== input.clubId) {
    throw new Error("That gathering was not found.");
  }

  const [memory] = await db
    .insert(clubMemories)
    .values({
      clubId: input.clubId,
      sessionId: input.sessionId,
      userId: input.userId,
      sessionTitle: session.title,
      dateLabel: formatMemoryDateLabel(session.startsAt),
      review: input.review,
      reviewerName: input.reviewerName,
      photoUrls: input.photoUrls,
    })
    .returning({ id: clubMemories.id });

  return { id: memory.id };
}
