import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { HostMemberRoster } from "@/components/host/host-member-roster";
import { HostRsvpRoster } from "@/components/host/host-rsvp-roster";
import { getClubBySlug, userHostsClubBySlug } from "@/db/queries/clubs";
import {
  countActiveMembersForClub,
  listActiveMembersForClub,
} from "@/db/queries/memberships";
import {
  countSessionFirstTimers,
  countSessionRsvps,
  listSessionRsvps,
} from "@/db/queries/rsvps";
import { getSession } from "@/lib/auth/session";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type HostClubPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: HostClubPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return { title: "Club not found" };
  }

  return {
    title: `Tonight · ${club.name}`,
  };
}

export default async function HostClubPage({ params }: HostClubPageProps) {
  const { slug } = await params;
  const session = await getSession();
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }

  if (!session) {
    redirect(`/enter?next=/host/clubs/${slug}`);
  }

  const isHost = await userHostsClubBySlug(session.id, slug);

  if (!isHost) {
    redirect(`/clubs/${slug}`);
  }

  const upcoming = club.upcomingSession;

  if (!upcoming) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="font-hand text-2xl text-lamp">No upcoming session</p>
        <p className="mt-3 text-cream/70">Schedule the next gathering for this club.</p>
      </div>
    );
  }

  const [rsvpCount, firstTimerCount, roster, memberCount, members] = await Promise.all([
    countSessionRsvps(upcoming.id),
    countSessionFirstTimers(upcoming.id),
    listSessionRsvps(upcoming.id),
    countActiveMembersForClub(club.id),
    listActiveMembersForClub(club.id),
  ]);

  const memberUserIds = new Set(members.map((member) => member.userId));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-lamp">Tonight</p>
          <h1 className="font-display mt-2 text-4xl leading-tight">{club.name}</h1>
          <p className="mt-2 text-cream/65">
            Signed in as {session.displayName}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/host"
            className="font-hand text-lg text-lamp transition-colors hover:text-lamp-soft"
          >
            All clubs
          </Link>
          <Link
            href={`/clubs/${club.slug}`}
            className="font-hand text-lg text-lamp transition-colors hover:text-lamp-soft"
          >
            Public page →
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="artifact artifact-clipboard artifact-journal--flat rotate-0 px-5 py-6 lg:col-span-2">
          <p className="font-hand text-2xl text-rust">This gathering</p>
          <p className="mt-2 font-display text-3xl text-ink">{upcoming.title}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {formatSessionDate(upcoming.startsAt)} · {formatSessionTime(upcoming.startsAt)}{" "}
            · {upcoming.locationArea}
          </p>

          <div className="artifact-ruled mt-6 space-y-0 px-1 pt-1">
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">Saved seats</span>
              <span className="font-display text-3xl text-ink">{rsvpCount}</span>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">First-timers</span>
              <span className="font-display text-3xl text-rust">{firstTimerCount}</span>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">Capacity left</span>
              <span className="font-display text-3xl text-ink">
                {upcoming.spotsRemaining}
              </span>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">Monthly members</span>
              <span className="font-display text-3xl text-ink">{memberCount}</span>
            </div>
          </div>

          <HostRsvpRoster rsvps={roster} memberUserIds={memberUserIds} />
        </section>

        <section className="artifact artifact-note artifact-journal--flat rotate-0 px-5 py-6">
          <p className="font-hand text-xl text-rust">Members</p>
          <HostMemberRoster members={members} />
        </section>
      </div>

      <section className="artifact artifact-journal artifact-journal--flat mt-6 px-5 py-6 lg:hidden">
        <p className="font-hand text-xl text-rust">First-timers matter</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Warm Start goes out automatically after someone saves a seat. Monthly members
          are guests who chose to come back.
        </p>
      </section>
    </div>
  );
}
