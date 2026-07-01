import { notFound, redirect } from "next/navigation";
import { SaveSeatFlow } from "@/components/clubs/save-seat-flow";
import { getClubBySlug } from "@/db/queries/clubs";
import { getUserRsvpForSession } from "@/db/queries/rsvps";
import { getSession } from "@/lib/auth/session";

type SaveSeatPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SaveSeatPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  return {
    title: club ? `Save a seat · ${club.name}` : "Save a seat",
  };
}

export default async function SaveSeatPage({ params }: SaveSeatPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  const session = await getSession();

  if (!club) {
    notFound();
  }

  if (!club.upcomingSession) {
    redirect(`/clubs/${slug}`);
  }

  if (session?.id === club.hostUserId) {
    redirect(`/host/clubs/${slug}`);
  }

  if (club.upcomingSession.spotsRemaining <= 0) {
    return (
      <article className="grain min-h-full bg-night text-cream">
        <div className="mx-auto max-w-lg px-6 py-16">
          <p className="font-hand text-2xl text-lamp">This gathering is full</p>
          <p className="mt-3 text-cream/65">
            Check back on the club page for the next date.
          </p>
        </div>
      </article>
    );
  }

  if (session?.role === "guest") {
    const rsvp = await getUserRsvpForSession(session.id, club.upcomingSession.id);

    if (rsvp?.status === "confirmed") {
      redirect(`/clubs/${slug}/warm-start`);
    }
  }

  const guestName =
    session?.role === "guest" ? session.displayName : null;

  return (
    <article className="grain min-h-full bg-night text-cream">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <SaveSeatFlow
          club={club}
          session={club.upcomingSession}
          guestName={guestName}
        />
      </div>
    </article>
  );
}
