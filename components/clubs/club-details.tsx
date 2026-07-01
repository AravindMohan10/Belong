import Image from "next/image";
import type { Club } from "@/lib/types/club";

type ClubDetailsProps = {
  club: Club;
};

export function ClubDetails({ club }: ClubDetailsProps) {
  const { voice, host } = club;

  return (
    <article className="artifact artifact-journal artifact-journal--flat space-y-10 px-6 py-8 text-ink sm:px-8 sm:py-10">
      <section>
        <p className="font-hand text-2xl text-rust">{voice.ritualTitle}</p>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">{club.description}</p>
      </section>

      <section className="border-t border-ink/10 pt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          {voice.promiseEyebrow}
        </p>
        <h2 className="font-display mt-2 text-2xl text-ink">{voice.promiseHeadline}</h2>
        <p className="mt-4 max-w-2xl leading-8 text-ink-soft">{club.firstTimerPromise}</p>
      </section>

      <section className="border-t border-ink/10 pt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{voice.expectEyebrow}</p>
        <h2 className="font-display mt-2 text-2xl text-ink">{voice.expectHeadline}</h2>
        <ol className="mt-6 space-y-4">
          {club.whatToExpect.map((item, index) => (
            <li key={item} className="flex gap-4 text-ink-soft">
              <span className="font-display text-2xl text-rust/80">{index + 1}</span>
              <p className="pt-1 leading-7">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-ink/10 pt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{voice.hostEyebrow}</p>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-paper-warm">
            {host.imageUrl ? (
              <Image
                src={host.imageUrl}
                alt={host.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-xl text-ink">
                {host.name.slice(0, 1)}
              </div>
            )}
          </div>
          <div>
            <p className="font-display text-xl text-ink">{host.name}</p>
            {host.bio ? (
              <p className="mt-2 max-w-xl text-sm leading-7 text-ink-soft">{host.bio}</p>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
