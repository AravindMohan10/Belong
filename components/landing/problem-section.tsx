export function ProblemSection() {
  return (
    <section className="grain border-b border-lamp/8 bg-night text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <h2 className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl">
              Most tools help people show up once. Almost nothing helps them come
              back.
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="text-lg leading-relaxed text-cream/68">
              Group chats get noisy. Event pages feel transactional. The awkward
              part is the second visit, when someone liked the night but
              doesn&apos;t know if they belong yet.
            </p>
            <p className="font-hand mt-6 text-2xl text-lamp/85">
              That gap is what we built for.
            </p>
          </div>
        </div>

        <ul className="mt-16 flex flex-col gap-6 border-t border-lamp/10 pt-10 sm:flex-row sm:gap-10">
          <li className="flex-1">
            <p className="font-hand text-xl text-lamp">First-timers</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/62">
              Want to know what the night will feel like before walking in
              alone.
            </p>
          </li>
          <li className="hidden w-px shrink-0 bg-lamp/15 sm:block" aria-hidden />
          <li className="flex-1">
            <p className="font-hand text-xl text-lamp">Hosts</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/62">
              Want to welcome new people without losing the rhythm of the
              gathering.
            </p>
          </li>
          <li className="hidden w-px shrink-0 bg-lamp/15 sm:block" aria-hidden />
          <li className="flex-1">
            <p className="font-hand text-xl text-lamp">Regulars</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/62">
              Want the club to feel like a ritual, not a calendar event they
              might skip.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
