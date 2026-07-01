import { and, asc, count, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  clubSessions,
  clubs,
  rsvps,
  users,
} from "@/db/schema";
import { getMemoriesForClub } from "@/db/queries/memories";
import { mapClubVoice } from "@/lib/clubs/voice";
import { sortClubsByDistance } from "@/lib/location/sort-clubs";
import type { GeoPoint } from "@/lib/location/types";
import type {
  Club,
  ClubSession,
  ClubSummary,
  ClubWarmStart,
  DiscoverClub,
} from "@/lib/types/club";
import { defaultClubVoice } from "@/lib/types/club";

type ClubRow = typeof clubs.$inferSelect;
type UserRow = typeof users.$inferSelect;
type SessionRow = typeof clubSessions.$inferSelect;

async function getConfirmedRsvpCount(sessionId: string): Promise<number> {
  const db = await getDb();
  const [row] = await db
    .select({ total: count() })
    .from(rsvps)
    .where(and(eq(rsvps.sessionId, sessionId), eq(rsvps.status, "confirmed")));

  return Number(row?.total ?? 0);
}

function mapWarmStart(session: SessionRow): ClubWarmStart {
  return {
    firstTenMinutes: session.warmStartFirstTenMinutes,
    findTheGroup: session.warmStartFindTheGroup,
    smallTalkLine: session.warmStartSmallTalkLine,
    exactPin: session.exactPin,
  };
}

async function mapSession(session: SessionRow): Promise<ClubSession> {
  const confirmed = await getConfirmedRsvpCount(session.id);

  return {
    id: session.id,
    startsAt: session.startsAt,
    locationArea: session.locationArea,
    title: session.title,
    capacity: session.capacity,
    spotsRemaining: Math.max(session.capacity - confirmed, 0),
    meetingPoint: session.meetingPoint,
    warmStart: mapWarmStart(session),
  };
}

function mapHost(user: UserRow): Club["host"] {
  return {
    name: user.displayName,
    bio: user.bio,
    imageUrl: user.imageUrl,
  };
}

async function getUpcomingSessionForClub(
  clubId: string,
): Promise<ClubSession | null> {
  const db = await getDb();
  const [session] = await db
    .select()
    .from(clubSessions)
    .where(
      and(
        eq(clubSessions.clubId, clubId),
        eq(clubSessions.status, "upcoming"),
        gt(clubSessions.startsAt, sql`now()`),
      ),
    )
    .orderBy(asc(clubSessions.startsAt))
    .limit(1);

  if (!session) {
    return null;
  }

  return mapSession(session);
}

function mapClubLocation(club: ClubRow) {
  return {
    city: club.city,
    neighborhood: club.neighborhood,
    latitude: club.latitude,
    longitude: club.longitude,
  };
}

function mapVoice(club: ClubRow) {
  return mapClubVoice(club.voice);
}

async function assembleClub(club: ClubRow, host: UserRow): Promise<Club> {
  const [upcomingSession, memories] = await Promise.all([
    getUpcomingSessionForClub(club.id),
    getMemoriesForClub(club.id),
  ]);

  return {
    id: club.id,
    slug: club.slug,
    name: club.name,
    tagline: club.tagline,
    description: club.description,
    coverImageUrl: club.coverImageUrl,
    ritualLabel: club.ritualLabel,
    vibe: club.vibe,
    firstTimerPromise: club.firstTimerPromise,
    whatToExpect: club.whatToExpect,
    ...mapClubLocation(club),
    voice: mapVoice(club),
    hostUserId: club.hostUserId,
    membershipPriceCents: club.membershipPriceCents,
    host: mapHost(host),
    upcomingSession,
    memories,
  };
}

export async function getClubBySlug(slug: string): Promise<Club | null> {
  const db = await getDb();
  const [row] = await db
    .select({ club: clubs, host: users })
    .from(clubs)
    .innerJoin(users, eq(clubs.hostUserId, users.id))
    .where(eq(clubs.slug, slug))
    .limit(1);

  if (!row) {
    return null;
  }

  return assembleClub(row.club, row.host);
}

export async function getClubById(clubId: string): Promise<Club | null> {
  const db = await getDb();
  const [row] = await db
    .select({ club: clubs, host: users })
    .from(clubs)
    .innerJoin(users, eq(clubs.hostUserId, users.id))
    .where(eq(clubs.id, clubId))
    .limit(1);

  if (!row) {
    return null;
  }

  return assembleClub(row.club, row.host);
}

async function mapDiscoverClub(
  club: ClubRow,
  host: UserRow,
): Promise<DiscoverClub> {
  const upcomingSession = await getUpcomingSessionForClub(club.id);

  return {
    id: club.id,
    slug: club.slug,
    name: club.name,
    tagline: club.tagline,
    coverImageUrl: club.coverImageUrl,
    ritualLabel: club.ritualLabel,
    ...mapClubLocation(club),
    vibe: club.vibe,
    hostName: host.displayName,
    upcomingSession: upcomingSession
      ? {
          id: upcomingSession.id,
          startsAt: upcomingSession.startsAt,
          title: upcomingSession.title,
          locationArea: upcomingSession.locationArea,
          spotsRemaining: upcomingSession.spotsRemaining,
        }
      : null,
  };
}

export async function getFeaturedClubs(
  origin: GeoPoint | null = null,
): Promise<ClubSummary[]> {
  const clubsList = await getDiscoverClubs(origin);
  return clubsList.slice(0, 4);
}

export async function getDiscoverClubs(
  origin: GeoPoint | null = null,
): Promise<DiscoverClub[]> {
  const db = await getDb();
  const rows = await db
    .select({ club: clubs, host: users })
    .from(clubs)
    .innerJoin(users, eq(clubs.hostUserId, users.id));

  const mapped = await Promise.all(
    rows.map(({ club, host }) => mapDiscoverClub(club, host)),
  );

  return sortClubsByDistance(mapped, origin);
}

export async function getClubsByHostUserId(
  hostUserId: string,
): Promise<ClubSummary[]> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(clubs)
    .where(eq(clubs.hostUserId, hostUserId))
    .orderBy(asc(clubs.name));

  return rows.map((club) => ({
    id: club.id,
    slug: club.slug,
    name: club.name,
    tagline: club.tagline,
    coverImageUrl: club.coverImageUrl,
    ritualLabel: club.ritualLabel,
    city: club.city,
    neighborhood: club.neighborhood,
  }));
}

export async function clubSlugExists(slug: string): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: clubs.id })
    .from(clubs)
    .where(eq(clubs.slug, slug))
    .limit(1);

  return Boolean(row);
}

export type CreateClubInput = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  ritualLabel: string;
  vibe: string[];
  firstTimerPromise: string;
  whatToExpect: string[];
  city: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  hostUserId: string;
  session: {
    title: string;
    startsAt: Date;
    locationArea: string;
    capacity: number;
    meetingPoint: string;
    exactPin: string | null;
    warmStartFirstTenMinutes: string[];
    warmStartFindTheGroup: string;
    warmStartSmallTalkLine: string;
  };
};

export async function createClubWithSession(
  input: CreateClubInput,
): Promise<{ clubId: string; slug: string }> {
  const db = await getDb();

  return db.transaction(async (tx) => {
    const [club] = await tx
      .insert(clubs)
      .values({
        slug: input.slug,
        name: input.name,
        tagline: input.tagline,
        description: input.description,
        coverImageUrl: input.coverImageUrl,
        ritualLabel: input.ritualLabel,
        vibe: input.vibe,
        firstTimerPromise: input.firstTimerPromise,
        whatToExpect: input.whatToExpect,
        city: input.city,
        neighborhood: input.neighborhood,
        latitude: input.latitude,
        longitude: input.longitude,
        voice: defaultClubVoice,
        membershipPriceCents: 1200,
        hostUserId: input.hostUserId,
      })
      .returning({ id: clubs.id, slug: clubs.slug });

    await tx.insert(clubSessions).values({
      clubId: club.id,
      title: input.session.title,
      startsAt: input.session.startsAt,
      locationArea: input.session.locationArea,
      capacity: input.session.capacity,
      meetingPoint: input.session.meetingPoint,
      exactPin: input.session.exactPin,
      status: "upcoming",
      warmStartFirstTenMinutes: input.session.warmStartFirstTenMinutes,
      warmStartFindTheGroup: input.session.warmStartFindTheGroup,
      warmStartSmallTalkLine: input.session.warmStartSmallTalkLine,
    });

    await tx
      .update(users)
      .set({
        role: "host",
        hostClubSlug: club.slug,
      })
      .where(eq(users.id, input.hostUserId));

    return { clubId: club.id, slug: club.slug };
  });
}

export async function userHostsClub(
  userId: string,
  clubId: string,
): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: clubs.id })
    .from(clubs)
    .where(and(eq(clubs.id, clubId), eq(clubs.hostUserId, userId)))
    .limit(1);

  return Boolean(row);
}

export async function userHostsClubBySlug(
  userId: string,
  slug: string,
): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: clubs.id })
    .from(clubs)
    .where(and(eq(clubs.slug, slug), eq(clubs.hostUserId, userId)))
    .limit(1);

  return Boolean(row);
}

export async function getUpcomingSessionIdForClub(
  clubId: string,
): Promise<string | null> {
  const db = await getDb();
  const [session] = await db
    .select({ id: clubSessions.id })
    .from(clubSessions)
    .where(
      and(
        eq(clubSessions.clubId, clubId),
        eq(clubSessions.status, "upcoming"),
        gt(clubSessions.startsAt, sql`now()`),
      ),
    )
    .orderBy(asc(clubSessions.startsAt))
    .limit(1);

  return session?.id ?? null;
}

export async function getSessionById(
  sessionId: string,
): Promise<SessionRow | null> {
  const db = await getDb();
  const [session] = await db
    .select()
    .from(clubSessions)
    .where(eq(clubSessions.id, sessionId))
    .limit(1);

  return session ?? null;
}
