import Link from "next/link";
import type { InboxThread } from "@/lib/types/gathering";
import { formatSessionDate } from "@/lib/format";

type InboxThreadCardProps = {
  thread: InboxThread;
};

export function InboxThreadCard({ thread }: InboxThreadCardProps) {
  return (
    <article className="inbox-thread overflow-hidden">
      <header className="border-b border-cream/10 px-5 py-4 sm:px-6">
        <p className="font-hand text-lg text-lamp-soft">{thread.ritualLabel}</p>
        <h2 className="font-display text-2xl text-cream">{thread.clubName}</h2>
        <p className="mt-1 text-xs text-cream/45">
          Hospitality notes. Not a group chat.
        </p>
      </header>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        {thread.messages.map((message) => (
          <div
            key={message.id}
            className={
              message.senderKind === "host"
                ? "artifact artifact-note artifact-journal--flat max-w-[92%] px-4 py-4 text-ink"
                : "max-w-[92%] rounded-md border border-lamp/15 bg-night-lift px-4 py-4"
            }
          >
            <p className="text-xs uppercase tracking-wider text-cream/45">
              {message.senderKind === "host" ? "From your host" : "From the club"}
            </p>
            <p className="mt-1 font-hand text-lg text-lamp-soft">
              {message.senderLabel}
            </p>
            <p
              className={
                message.senderKind === "host"
                  ? "mt-2 text-sm leading-relaxed text-ink-soft"
                  : "mt-2 text-sm leading-relaxed text-cream/75"
              }
            >
              {message.body}
            </p>
            {message.href ? (
              <Link
                href={message.href}
                className={
                  message.senderKind === "host"
                    ? "mt-3 inline-block font-hand text-base text-rust hover:text-lamp"
                    : "mt-3 inline-block font-hand text-base text-lamp hover:text-lamp-soft"
                }
              >
                Open →
              </Link>
            ) : null}
            <p className="mt-2 text-xs text-cream/35">
              {formatSessionDate(message.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
