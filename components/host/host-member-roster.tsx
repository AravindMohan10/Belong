import type { ClubMember } from "@/lib/types/membership";
import { formatMemberSince } from "@/lib/format";

type HostMemberRosterProps = {
  members: ClubMember[];
};

export function HostMemberRoster({ members }: HostMemberRosterProps) {
  if (members.length === 0) {
    return (
      <p className="mt-6 text-sm text-ink-soft">
        No monthly members yet. Regulars can join after they attend once.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">Monthly members</p>
      <ul className="mt-4 space-y-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3 last:border-0"
          >
            <span className="text-base text-ink">{member.displayName}</span>
            <span className="text-xs text-ink-soft">
              since {formatMemberSince(member.memberSince)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
