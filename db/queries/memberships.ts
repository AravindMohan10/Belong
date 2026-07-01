import { and, count, eq, lt, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { clubMemberships, clubSessions, clubs, rsvps, users } from "@/db/schema";
import { DEFAULT_MEMBERSHIP_PLAN_LABEL } from "@/lib/membership/constants";
import type { ClubMember, ClubMembership } from "@/lib/types/membership";

export async function userHasAttendedClub(
  userId: string,
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
        eq(rsvps.clubId, clubId),
        eq(rsvps.status, "confirmed"),
        lt(clubSessions.startsAt, sql`now()`),
      ),
    )
    .limit(1);

  return Boolean(row);
}

export async function getActiveMembershipForUserClub(
  userId: string,
  clubId: string,
): Promise<ClubMembership | null> {
  const db = await getDb();
  const [row] = await db
    .select({
      id: clubMemberships.id,
      clubId: clubMemberships.clubId,
      clubSlug: clubs.slug,
      clubName: clubs.name,
      status: clubMemberships.status,
      planLabel: clubMemberships.planLabel,
      priceCents: clubMemberships.priceCents,
      memberSince: clubMemberships.memberSince,
      cancelledAt: clubMemberships.cancelledAt,
    })
    .from(clubMemberships)
    .innerJoin(clubs, eq(clubMemberships.clubId, clubs.id))
    .where(
      and(
        eq(clubMemberships.userId, userId),
        eq(clubMemberships.clubId, clubId),
        eq(clubMemberships.status, "active"),
      ),
    )
    .limit(1);

  return row ?? null;
}

export async function listActiveMembershipsForUser(
  userId: string,
): Promise<ClubMembership[]> {
  const db = await getDb();
  const rows = await db
    .select({
      id: clubMemberships.id,
      clubId: clubMemberships.clubId,
      clubSlug: clubs.slug,
      clubName: clubs.name,
      status: clubMemberships.status,
      planLabel: clubMemberships.planLabel,
      priceCents: clubMemberships.priceCents,
      memberSince: clubMemberships.memberSince,
      cancelledAt: clubMemberships.cancelledAt,
    })
    .from(clubMemberships)
    .innerJoin(clubs, eq(clubMemberships.clubId, clubs.id))
    .where(
      and(eq(clubMemberships.userId, userId), eq(clubMemberships.status, "active")),
    )
    .orderBy(sql`${clubMemberships.memberSince} desc`);

  return rows;
}

export async function listActiveMembersForClub(clubId: string): Promise<ClubMember[]> {
  const db = await getDb();
  const rows = await db
    .select({
      id: clubMemberships.id,
      userId: clubMemberships.userId,
      displayName: users.displayName,
      memberSince: clubMemberships.memberSince,
    })
    .from(clubMemberships)
    .innerJoin(users, eq(clubMemberships.userId, users.id))
    .where(
      and(eq(clubMemberships.clubId, clubId), eq(clubMemberships.status, "active")),
    )
    .orderBy(clubMemberships.memberSince);

  return rows;
}

export async function countActiveMembersForClub(clubId: string): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ total: count() })
    .from(clubMemberships)
    .where(
      and(eq(clubMemberships.clubId, clubId), eq(clubMemberships.status, "active")),
    );

  return Number(row?.total ?? 0);
}

export async function createClubMembership(input: {
  userId: string;
  clubId: string;
  priceCents: number;
}): Promise<{ id: string }> {
  const attended = await userHasAttendedClub(input.userId, input.clubId);

  if (!attended) {
    throw new Error("Attend a gathering before joining as a member.");
  }

  const existing = await getActiveMembershipForUserClub(input.userId, input.clubId);

  if (existing) {
    return { id: existing.id };
  }

  const db = await getDb();
  const [membership] = await db
    .insert(clubMemberships)
    .values({
      userId: input.userId,
      clubId: input.clubId,
      status: "active",
      planLabel: DEFAULT_MEMBERSHIP_PLAN_LABEL,
      priceCents: input.priceCents,
    })
    .onConflictDoUpdate({
      target: [clubMemberships.userId, clubMemberships.clubId],
      set: {
        status: "active",
        planLabel: DEFAULT_MEMBERSHIP_PLAN_LABEL,
        priceCents: input.priceCents,
        memberSince: sql`now()`,
        cancelledAt: null,
      },
    })
    .returning({ id: clubMemberships.id });

  return { id: membership.id };
}

export async function cancelClubMembership(
  userId: string,
  membershipId: string,
): Promise<void> {
  const db = await getDb();
  await db
    .update(clubMemberships)
    .set({
      status: "cancelled",
      cancelledAt: sql`now()`,
    })
    .where(
      and(eq(clubMemberships.id, membershipId), eq(clubMemberships.userId, userId)),
    );
}

export async function isActiveMember(
  userId: string,
  clubId: string,
): Promise<boolean> {
  const membership = await getActiveMembershipForUserClub(userId, clubId);
  return membership !== null;
}
