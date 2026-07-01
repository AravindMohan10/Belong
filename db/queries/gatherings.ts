import { and, asc, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { clubSessions, clubs, rsvps, users } from "@/db/schema";
import type { UserGathering } from "@/lib/types/gathering";

export async function getUserUpcomingGatherings(
  userId: string,
): Promise<UserGathering[]> {
  const db = await getDb();
  const rows = await db
    .select({
      rsvp: rsvps,
      club: clubs,
      session: clubSessions,
      host: users,
    })
    .from(rsvps)
    .innerJoin(clubSessions, eq(rsvps.sessionId, clubSessions.id))
    .innerJoin(clubs, eq(rsvps.clubId, clubs.id))
    .innerJoin(users, eq(clubs.hostUserId, users.id))
    .where(
      and(
        eq(rsvps.userId, userId),
        eq(rsvps.status, "confirmed"),
        eq(clubSessions.status, "upcoming"),
        gt(clubSessions.startsAt, sql`now()`),
      ),
    )
    .orderBy(asc(clubSessions.startsAt));

  return rows.map(({ rsvp, club, session, host }) => ({
    rsvpId: rsvp.id,
    isFirstTimer: rsvp.isFirstTimer,
    club: {
      slug: club.slug,
      name: club.name,
      tagline: club.tagline,
      ritualLabel: club.ritualLabel,
      coverImageUrl: club.coverImageUrl,
      hostName: host.displayName,
    },
    session: {
      id: session.id,
      startsAt: session.startsAt,
      title: session.title,
      locationArea: session.locationArea,
      meetingPoint: session.meetingPoint,
    },
  }));
}

export async function userHasUpcomingGathering(userId: string): Promise<boolean> {
  const gatherings = await getUserUpcomingGatherings(userId);
  return gatherings.length > 0;
}
