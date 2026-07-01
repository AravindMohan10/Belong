import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClubDetails } from "@/components/clubs/club-details";
import { ClubHero } from "@/components/clubs/club-hero";
import { ClubMemoriesSection } from "@/components/clubs/club-memories-section";
import { MembershipCard } from "@/components/clubs/membership-card";
import { NextSessionCard } from "@/components/clubs/next-session-card";
import { getClubBySlug } from "@/db/queries/clubs";
import { listEligibleSessionsForMemoryUpload } from "@/db/queries/memories";
import {
  getActiveMembershipForUserClub,
  userHasAttendedClub,
} from "@/db/queries/memberships";
import { getUserRsvpForSession } from "@/db/queries/rsvps";
import { getSession } from "@/lib/auth/session";

type ClubPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ClubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return { title: "Club not found" };
  }

  return {
    title: `${club.name} · Belong`,
    description: club.tagline,
  };
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  const session = await getSession();

  if (!club) {
    notFound();
  }

  if (!club.upcomingSession) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="font-hand text-2xl text-lamp">No upcoming gathering</p>
        <p className="mt-3 text-cream/70">Check back soon for the next date.</p>
      </div>
    );
  }

  const rsvp =
    session && club.upcomingSession
      ? await getUserRsvpForSession(session.id, club.upcomingSession.id)
      : null;

  const hasRsvp = rsvp?.status === "confirmed";
  const isHostViewer = session?.id === club.hostUserId;
  const isSignedInGuest = session?.role === "guest";
  const eligibleSessions =
    isSignedInGuest && !isHostViewer
      ? await listEligibleSessionsForMemoryUpload(session.id, club.id)
      : [];

  const membershipState =
    isSignedInGuest && !isHostViewer && session
      ? await Promise.all([
          getActiveMembershipForUserClub(session.id, club.id),
          userHasAttendedClub(session.id, club.id),
        ])
      : ([null, false] as [null, boolean]);

  const [membership, hasAttended] = membershipState;
  const isMember = membership !== null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ClubHero club={club} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ClubDetails club={club} />

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <NextSessionCard
            clubSlug={club.slug}
            session={club.upcomingSession}
            isHostViewer={isHostViewer}
            hasRsvp={hasRsvp}
          />
          {!isHostViewer ? (
            <MembershipCard
              clubSlug={club.slug}
              clubName={club.name}
              priceCents={club.membershipPriceCents}
              isMember={isMember}
              memberSince={membership?.memberSince ?? null}
              canJoin={hasAttended && !isMember}
            />
          ) : null}
        </aside>
      </div>

      <div className="mt-8">
        <ClubMemoriesSection
          clubSlug={club.slug}
          voice={club.voice}
          memories={club.memories}
          eligibleSessions={eligibleSessions}
          isSignedInGuest={isSignedInGuest}
        />
      </div>
    </div>
  );
}
