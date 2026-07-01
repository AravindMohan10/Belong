"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  cancelMembershipAction,
  type CancelMembershipActionState,
} from "@/app/actions/memberships";
import { formatMemberSince, formatMembershipPrice } from "@/lib/format";
import type { ClubMembership } from "@/lib/types/membership";

const initialState: CancelMembershipActionState = {};

type MembershipListProps = {
  memberships: ClubMembership[];
};

export function MembershipList({ memberships }: MembershipListProps) {
  const [state, action] = useActionState(cancelMembershipAction, initialState);

  if (memberships.length === 0) {
    return (
      <div className="artifact artifact-journal artifact-journal--flat max-w-lg px-6 py-8 text-ink">
        <p className="font-hand text-2xl text-rust">No memberships yet</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          After you attend a club, you can join as a monthly member and keep your place
          in the room.
        </p>
        <Link
          href="/discover"
          className="mt-5 inline-block font-hand text-xl text-lamp hover:text-rust"
        >
          Discover clubs →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {state.error ? (
        <p className="rounded-md border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-cream">
          {state.error}
        </p>
      ) : null}

      {memberships.map((membership) => (
        <article
          key={membership.id}
          className="artifact artifact-clipboard artifact-journal--flat px-6 py-6 text-ink"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-hand text-2xl text-rust">{membership.clubName}</p>
              <p className="mt-2 text-sm text-ink-soft">
                {membership.planLabel} · {formatMembershipPrice(membership.priceCents)}/month
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Member since {formatMemberSince(membership.memberSince)}
              </p>
            </div>
            <span className="rounded-full border border-lamp/30 bg-lamp/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-ink">
              Active
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href={`/clubs/${membership.clubSlug}`}
              className="font-hand text-lg text-lamp hover:text-rust"
            >
              Club page →
            </Link>
            <form action={action}>
              <input type="hidden" name="membershipId" value={membership.id} />
              <button
                type="submit"
                className="text-sm text-ink-soft underline-offset-2 hover:text-rust hover:underline"
              >
                Cancel membership
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
