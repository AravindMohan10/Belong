import { MembershipList } from "@/components/memberships/membership-list";
import { listActiveMembershipsForUser } from "@/db/queries/memberships";
import { requireGuestSession } from "@/lib/guest/session";

export const metadata = {
  title: "My clubs · Belong",
  description: "Clubs you belong to as a monthly member.",
};

export default async function MembershipsPage() {
  const session = await requireGuestSession("/memberships");
  const memberships = await listActiveMembershipsForUser(session.id);

  return (
    <article className="grain min-h-full bg-night text-cream">
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-10 lg:pt-12">
        <p className="font-hand text-3xl text-lamp">my clubs</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
          Where you keep coming back
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/65">
          Monthly memberships for clubs you have attended. Manage billing and
          cancellations here.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-20 lg:pb-28">
        <MembershipList memberships={memberships} />
      </div>
    </article>
  );
}
