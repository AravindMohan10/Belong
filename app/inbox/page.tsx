import Link from "next/link";
import { InboxThreadCard } from "@/components/inbox/inbox-thread-card";
import { getUserUpcomingGatherings } from "@/db/queries/gatherings";
import { buildGuestInboxThreads } from "@/lib/inbox/guest-inbox";
import { requireGuestSession } from "@/lib/guest/session";

export const metadata = {
  title: "Inbox · Belong",
  description: "Hospitality notes from your clubs and hosts. Not group chat.",
};

export default async function InboxPage() {
  const session = await requireGuestSession("/inbox");
  const gatherings = await getUserUpcomingGatherings(session.id);
  const threads = buildGuestInboxThreads(gatherings);

  return (
    <article className="grain min-h-full bg-night text-cream">
        <header className="mx-auto max-w-6xl px-6 pb-8 pt-10 lg:pt-12">
          <p className="font-hand text-3xl text-lamp">inbox</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Notes from your clubs
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/65">
            Warm Starts, day-of reminders, and the occasional line from your
            host. Practical notes in one place. Not banter.
          </p>
        </header>

        <div className="mx-auto max-w-3xl space-y-6 px-6 pb-20 lg:pb-28">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <InboxThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <div className="artifact artifact-journal artifact-journal--flat px-6 py-8 text-ink">
              <p className="font-hand text-2xl text-rust">Nothing here yet</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Save a seat at a club and your Warm Start plus host notes will
                show up here.
              </p>
              <Link
                href="/discover"
                className="mt-5 inline-block font-hand text-xl text-lamp hover:text-rust"
              >
                Discover gatherings →
              </Link>
            </div>
          )}
        </div>
      </article>
  );
}
