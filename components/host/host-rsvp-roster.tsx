import type { RsvpWithGuest } from "@/db/queries/rsvps";

type HostRsvpRosterProps = {
  rsvps: RsvpWithGuest[];
  memberUserIds?: Set<string>;
};

function formatSavedAt(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (hours < 1) {
    return "just now";
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function HostRsvpRoster({ rsvps, memberUserIds }: HostRsvpRosterProps) {
  if (rsvps.length === 0) {
    return (
      <p className="mt-4 text-sm text-ink-soft">
        No saved seats yet. Share the club page when you are ready.
      </p>
    );
  }

  return (
    <ul className="artifact-ruled mt-4 divide-y divide-ink/10">
      {rsvps.map((rsvp) => (
        <li key={rsvp.id} className="flex items-baseline justify-between gap-4 py-3">
          <div>
            <p className="font-medium text-ink">{rsvp.displayName}</p>
            <p className="text-xs text-ink-soft">
              {rsvp.isFirstTimer ? "First-timer" : "Returning"}
              {memberUserIds?.has(rsvp.userId) ? " · Member" : ""} · saved{" "}
              {formatSavedAt(rsvp.createdAt)}
            </p>
          </div>
          {rsvp.isFirstTimer ? (
            <span className="font-hand text-lg text-rust">new</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
