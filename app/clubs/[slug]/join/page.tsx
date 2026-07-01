import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JoinMembershipForm } from "@/components/memberships/join-membership-form";
import { getClubBySlug } from "@/db/queries/clubs";
import {
  getActiveMembershipForUserClub,
  userHasAttendedClub,
} from "@/db/queries/memberships";
import { MOCK_MEMBERSHIP_BENEFITS } from "@/lib/membership/constants";
import { formatMembershipPrice } from "@/lib/format";
import { getSession } from "@/lib/auth/session";

type JoinClubPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: JoinClubPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  return {
    title: club ? `Join ${club.name}` : "Join club",
  };
}

export default async function JoinClubPage({ params }: JoinClubPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  const session = await getSession();

  if (!club) {
    notFound();
  }

  if (!session || session.role !== "guest") {
    redirect(`/enter?next=/clubs/${slug}/join`);
  }

  if (session.id === club.hostUserId) {
    redirect(`/host/clubs/${slug}`);
  }

  const [membership, attended] = await Promise.all([
    getActiveMembershipForUserClub(session.id, club.id),
    userHasAttendedClub(session.id, club.id),
  ]);

  if (membership) {
    redirect("/memberships");
  }

  if (!attended) {
    return (
      <article className="grain min-h-full bg-night text-cream">
        <div className="mx-auto max-w-lg px-6 py-16">
          <p className="font-hand text-2xl text-lamp">Attend first</p>
          <p className="mt-3 text-cream/65">
            Membership opens after you have been to a gathering. Save a seat, show up,
            then come back here.
          </p>
          <Link
            href={`/clubs/${slug}`}
            className="mt-6 inline-block font-hand text-lg text-lamp hover:text-lamp-soft"
          >
            Back to {club.name}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="grain min-h-full bg-night text-cream">
      <div className="mx-auto max-w-lg px-6 py-12 lg:py-16">
        <Link
          href={`/clubs/${club.slug}`}
          className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
        >
          ← Back to {club.name}
        </Link>

        <header className="mt-8">
          <p className="font-hand text-3xl text-lamp">Join as a member</p>
          <h1 className="font-display mt-3 text-3xl leading-tight">{club.name}</h1>
          <p className="mt-2 text-cream/65">{club.ritualLabel}</p>
        </header>

        <section className="artifact artifact-clipboard artifact-journal--flat mt-8 px-6 py-6 text-ink">
          <p className="text-sm text-ink-soft">Hosted by {club.host.name}</p>
          <p className="mt-3 font-display text-2xl text-ink">
            {formatMembershipPrice(club.membershipPriceCents)}/month
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
            {MOCK_MEMBERSHIP_BENEFITS.map((benefit) => (
              <li key={benefit}>· {benefit}</li>
            ))}
          </ul>
        </section>

        <JoinMembershipForm
          club={{
            slug: club.slug,
            name: club.name,
            ritualLabel: club.ritualLabel,
            membershipPriceCents: club.membershipPriceCents,
            hostName: club.host.name,
          }}
        />
      </div>
    </article>
  );
}
