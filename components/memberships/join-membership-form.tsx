"use client";

import { useActionState } from "react";
import {
  joinMembershipAction,
  type JoinMembershipActionState,
} from "@/app/actions/memberships";
import { MOCK_MEMBERSHIP_BENEFITS } from "@/lib/membership/constants";
import { formatMembershipPrice } from "@/lib/format";
import type { MembershipCheckoutClub } from "@/lib/types/membership";

const initialState: JoinMembershipActionState = {};

const inputClass =
  "mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-2.5 text-ink outline-none ring-lamp/30 placeholder:text-ink-soft/50 focus:ring-2";

type JoinMembershipFormProps = {
  club: MembershipCheckoutClub;
};

export function JoinMembershipForm({ club }: JoinMembershipFormProps) {
  const [state, action] = useActionState(joinMembershipAction, initialState);
  const priceLabel = formatMembershipPrice(club.membershipPriceCents);

  return (
    <form action={action} className="artifact artifact-journal artifact-journal--flat space-y-6 px-6 py-6 text-ink">
      <input type="hidden" name="clubSlug" value={club.slug} />

      <div>
        <p className="font-display text-3xl text-ink">{priceLabel}/month</p>
        <p className="mt-2 text-sm text-ink-soft">
          Billed monthly. Cancel anytime from My clubs.
        </p>
      </div>

      <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
        {MOCK_MEMBERSHIP_BENEFITS.map((benefit) => (
          <li key={benefit} className="flex gap-2">
            <span className="text-rust">·</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <label className="block">
        <span className="text-sm text-ink-soft">Name on card</span>
        <input name="cardholderName" required autoComplete="cc-name" className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm text-ink-soft">Card number</span>
        <input
          name="cardNumber"
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="Card number"
          className={inputClass}
        />
      </label>

      {state.error ? <p className="text-sm text-rust">{state.error}</p> : null}

      <button
        type="submit"
        className="relative z-10 inline-flex w-full items-center justify-center font-hand text-[1.2rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
      >
        Confirm membership
      </button>
    </form>
  );
}
