import { notFound, redirect } from "next/navigation";
import { WarmStartView } from "@/components/clubs/warm-start-view";
import { getClubBySlug } from "@/db/queries/clubs";
import {
  countOtherFirstTimersForSession,
  getUserRsvpForSession,
} from "@/db/queries/rsvps";
import { getSession } from "@/lib/auth/session";

type WarmStartPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: WarmStartPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  return {
    title: club ? `Warm Start · ${club.name}` : "Warm Start",
  };
}

export default async function WarmStartPage({ params }: WarmStartPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  const session = await getSession();

  if (!club?.upcomingSession) {
    notFound();
  }

  if (!session) {
    redirect(`/enter?next=/clubs/${slug}/warm-start`);
  }

  if (session.id === club.hostUserId) {
    redirect(`/host/clubs/${slug}`);
  }

  const rsvp = await getUserRsvpForSession(session.id, club.upcomingSession.id);

  if (rsvp?.status !== "confirmed") {
    redirect(`/clubs/${slug}`);
  }

  const otherFirstTimers = await countOtherFirstTimersForSession(
    club.upcomingSession.id,
    session.id,
  );

  return (
    <WarmStartView
      club={club}
      session={club.upcomingSession}
      guestName={session.displayName}
      isFirstTimer={rsvp.isFirstTimer}
      otherFirstTimers={otherFirstTimers}
    />
  );
}
