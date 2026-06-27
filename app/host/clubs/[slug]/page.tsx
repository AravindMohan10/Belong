import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getClubBySlug } from "@/db/queries/clubs";
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
    title: `Host · ${club.name} · Belong`,
  };
}

export default async function HostClubPage({ params }: HostClubPageProps) {
  const { slug } = await params;
  const session = await getSession();
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }

  if (session?.hostClubSlug && session.hostClubSlug !== slug) {
    redirect(`/host/clubs/${session.hostClubSlug}`);
  }

  const { upcomingSession } = club;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-lamp">host view</p>
          <h1 className="font-display mt-2 text-4xl leading-tight">{club.name}</h1>
          <p className="mt-2 text-cream/65">
            Signed in as {session?.displayName}. RSVPs land here in the next slice.
          </p>
        </div>
        <Link
          href={`/clubs/${club.slug}`}
          className="font-hand text-lg text-lamp transition-colors hover:text-lamp-soft"
        >
          View public club page →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="artifact artifact-clipboard artifact-journal--flat rotate-0 px-5 py-6 lg:col-span-2">
          <p className="font-hand text-2xl text-rust">Tonight</p>
          <p className="mt-2 font-display text-3xl text-ink">{upcomingSession.title}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {formatSessionDate(upcomingSession.startsAt)} ·{" "}
            {formatSessionTime(upcomingSession.startsAt)} · {upcomingSession.locationArea}
          </p>

          <div className="artifact-ruled mt-6 space-y-0 px-1 pt-1">
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">RSVPs</span>
              <span className="font-display text-3xl text-ink">0</span>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">First-timers</span>
              <span className="font-display text-3xl text-rust">0</span>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <span className="text-sm text-ink-soft">Waitlisted</span>
              <span className="font-display text-3xl text-ink">0</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-ink-soft">
            Slice 2 adds saved seats and Warm Start. This shell is ready for live counts.
          </p>
        </section>

        <section className="artifact artifact-note artifact-journal--flat rotate-0 px-5 py-6">
          <p className="font-hand text-xl text-rust">Your regulars</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            3 regulars can welcome newcomers. You will assign welcome duty when RSVPs arrive.
          </p>
          <p className="font-hand mt-6 text-lg text-lamp">Recap comes after the night.</p>
        </section>
      </div>
    </div>
  );
}
