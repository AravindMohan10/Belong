import Link from "next/link";
import { formatMemberSince, formatMembershipPrice } from "@/lib/format";

type MembershipCardProps = {
  clubSlug: string;
  clubName: string;
  priceCents: number;
  isMember: boolean;
  memberSince: Date | null;
  canJoin: boolean;
};

export function MembershipCard({
  clubSlug,
  clubName,
  priceCents,
  isMember,
  memberSince,
  canJoin,
}: MembershipCardProps) {
  const priceLabel = formatMembershipPrice(priceCents);

  return (
    <section className="artifact artifact-note artifact-journal--flat mt-6 px-6 py-6">
      <p className="font-hand text-2xl text-rust">Membership</p>

      {isMember && memberSince ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink-soft">
            You are a monthly member of {clubName}.
          </p>
          <p className="font-display text-xl text-ink">
            Member since {formatMemberSince(memberSince)}
          </p>
          <Link
            href="/memberships"
            className="font-hand text-lg text-lamp transition-colors hover:text-rust"
          >
            Manage membership →
          </Link>
        </div>
      ) : canJoin ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm leading-relaxed text-ink-soft">
            You have attended. Join as a monthly member to come back without starting
            from scratch each time.
          </p>
          <p className="font-display text-2xl text-ink">{priceLabel}/month</p>
          <Link
            href={`/clubs/${clubSlug}/join`}
            className="relative z-10 inline-flex w-full items-center justify-center font-hand text-[1.1rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
          >
            Join this club
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Attend a gathering first. Membership unlocks after you have shown up once.
        </p>
      )}
    </section>
  );
}
