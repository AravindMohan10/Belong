import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db/client";
import {
  clubMemories,
  clubSessions,
  clubs,
  rsvps,
  users,
} from "@/db/schema";
import { DEMO_ALEX_ID } from "@/lib/auth/constants";
import { demoPersonas } from "@/lib/auth/demo-personas";
import { seedClubCatalog, seedHostUsers } from "@/lib/seed/club-catalog";

async function seedUsers() {
  const db = await getDb();

  for (const persona of demoPersonas) {
    await db
      .insert(users)
      .values({
        id: persona.id,
        role: persona.role,
        displayName: persona.displayName,
        hostClubSlug: persona.hostClubSlug,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          role: persona.role,
          displayName: persona.displayName,
          hostClubSlug: persona.hostClubSlug,
        },
      });
    console.log(`Seeded user ${persona.displayName} (${persona.role})`);
  }

  for (const host of seedHostUsers) {
    await db
      .insert(users)
      .values({
        id: host.id,
        role: host.role,
        displayName: host.displayName,
        bio: host.bio,
        imageUrl: host.imageUrl,
        hostClubSlug: host.hostClubSlug,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          role: host.role,
          displayName: host.displayName,
          bio: host.bio,
          imageUrl: host.imageUrl,
          hostClubSlug: host.hostClubSlug,
        },
      });
    console.log(`Seeded host ${host.displayName}`);
  }
}

async function upsertSession(
  clubId: string,
  session: {
    id: string;
    title: string;
    startsAt: Date;
    locationArea: string;
    capacity: number;
    meetingPoint: string;
    warmStart: {
      exactPin: string | null;
      firstTenMinutes: string[];
      findTheGroup: string;
      smallTalkLine: string;
    };
  },
  status: "upcoming" | "past",
) {
  const db = await getDb();

  await db
    .insert(clubSessions)
    .values({
      id: session.id,
      clubId,
      title: session.title,
      startsAt: session.startsAt,
      locationArea: session.locationArea,
      capacity: session.capacity,
      meetingPoint: session.meetingPoint,
      exactPin: session.warmStart.exactPin,
      status,
      warmStartFirstTenMinutes: session.warmStart.firstTenMinutes,
      warmStartFindTheGroup: session.warmStart.findTheGroup,
      warmStartSmallTalkLine: session.warmStart.smallTalkLine,
    })
    .onConflictDoUpdate({
      target: clubSessions.id,
      set: {
        title: session.title,
        startsAt: session.startsAt,
        locationArea: session.locationArea,
        capacity: session.capacity,
        meetingPoint: session.meetingPoint,
        exactPin: session.warmStart.exactPin,
        status,
        warmStartFirstTenMinutes: session.warmStart.firstTenMinutes,
        warmStartFindTheGroup: session.warmStart.findTheGroup,
        warmStartSmallTalkLine: session.warmStart.smallTalkLine,
      },
    });
}

async function seedClubs() {
  const db = await getDb();

  for (const club of seedClubCatalog) {
    await db
      .insert(clubs)
      .values({
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
        city: club.city,
        neighborhood: club.neighborhood,
        latitude: club.latitude,
        longitude: club.longitude,
        voice: club.voice,
        membershipPriceCents: club.membershipPriceCents ?? 1200,
        hostUserId: club.hostUserId,
      })
      .onConflictDoUpdate({
        target: clubs.id,
        set: {
          slug: club.slug,
          name: club.name,
          tagline: club.tagline,
          description: club.description,
          coverImageUrl: club.coverImageUrl,
          ritualLabel: club.ritualLabel,
          vibe: club.vibe,
          firstTimerPromise: club.firstTimerPromise,
          whatToExpect: club.whatToExpect,
          city: club.city,
          neighborhood: club.neighborhood,
          latitude: club.latitude,
          longitude: club.longitude,
          voice: club.voice,
          membershipPriceCents: club.membershipPriceCents ?? 1200,
          hostUserId: club.hostUserId,
        },
      });

    if (club.upcomingSession) {
      await upsertSession(club.id, club.upcomingSession, "upcoming");
    }

    for (const pastSession of club.pastSessions) {
      await upsertSession(club.id, pastSession, "past");
    }

    await db.delete(clubMemories).where(eq(clubMemories.clubId, club.id));

    for (const memory of club.memories) {
      await db.insert(clubMemories).values({
        clubId: club.id,
        sessionId: memory.sessionId,
        sessionTitle: memory.sessionTitle,
        dateLabel: memory.dateLabel,
        review: memory.review,
        reviewerName: memory.reviewerName,
        photoUrls: memory.photoUrls,
      });
    }

    console.log(`Seeded club ${club.name}`);
  }
}

async function seedDemoAttendance() {
  const db = await getDb();
  const cinemaClub = seedClubCatalog.find((club) => club.slug === "sunday-cinema-walks");

  if (!cinemaClub?.pastSessions[1]) {
    return;
  }

  const session = cinemaClub.pastSessions[1];

  await db
    .insert(rsvps)
    .values({
      userId: DEMO_ALEX_ID,
      clubId: cinemaClub.id,
      sessionId: session.id,
      status: "confirmed",
      isFirstTimer: true,
    })
    .onConflictDoUpdate({
      target: [rsvps.userId, rsvps.sessionId],
      set: {
        status: "confirmed",
        isFirstTimer: true,
      },
    });

  console.log("Seeded demo attendance for Alex at Sunday Cinema Walks");
}

async function seed() {
  if (!isDatabaseConfigured()) {
    console.error("Database is not configured. Skipping seed.");
    process.exit(1);
  }

  await getDb();
  await seedUsers();
  await seedClubs();
  await seedDemoAttendance();
  console.log("Catalog ready.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
