type CardLayout = {
  audience: string;
  copy: string;
  artifact: "note" | "clipboard" | "journal";
  layoutClass: string;
};

const cards: CardLayout[] = [
  {
    audience: "For first-timers",
    copy: "Find a club you want to join. Know what happens before you arrive.",
    artifact: "note",
    layoutClass: "lg:col-start-1 lg:row-start-1 lg:mt-0",
  },
  {
    audience: "For hosts",
    copy: "See who is new, who returned, and who needs a saved seat.",
    artifact: "clipboard",
    layoutClass: "lg:col-start-2 lg:row-start-1 lg:mt-14",
  },
  {
    audience: "For regulars",
    copy: "Turn nights into shared memory.",
    artifact: "journal",
    layoutClass: "lg:col-start-3 lg:row-start-1 lg:mt-6",
  },
];

function WarmStartNote() {
  return (
    <div className="artifact artifact-note px-5 pb-5 pt-8">
      <p className="font-hand text-xl text-ink/70">Clubs near you</p>
      <p className="mt-2 text-sm leading-snug text-ink-soft">
        Film walks, supper tables, run clubs, board nights. Browse what fits
        your week.
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Cinema walks", "Supper club", "Board night", "Run + coffee"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 bg-paper-warm/80 px-2.5 py-0.5 text-[11px] text-ink-soft"
            >
              {tag}
            </span>
          ),
        )}
      </div>
      <p className="font-hand mt-5 text-2xl leading-none text-rust">
        Your Warm Start
      </p>
      <p className="mt-1 text-[13px] text-ink-soft">
        What makes Belong different: not just RSVP, but welcome.
      </p>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-ink-soft">
        <li className="border-b border-ink/8 pb-2.5 text-ink">
          Maya greets you by the theater doors.
        </li>
        <li>First 10 minutes: paired walk.</li>
        <li>Easy opener included.</li>
      </ul>
      <p className="font-hand mt-4 text-xl text-lamp">
        5 first-timers coming too.
      </p>
    </div>
  );
}

function HostClipboard() {
  return (
    <div className="artifact artifact-clipboard px-5 pb-5 pt-10">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-hand text-2xl text-rust">Tonight</p>
        <p className="text-[11px] uppercase tracking-wide text-ink-soft/80">
          Sun · doors 6:30
        </p>
      </div>
      <div className="artifact-ruled mt-4 space-y-0 px-1 pt-1">
        <div className="flex items-baseline justify-between py-2">
          <span className="text-sm text-ink-soft">RSVPs</span>
          <span className="font-display text-2xl text-ink">16</span>
        </div>
        <div className="flex items-baseline justify-between py-2">
          <span className="text-sm text-ink-soft">First-timers</span>
          <span className="font-display text-2xl text-rust">5</span>
        </div>
        <div className="flex items-baseline justify-between py-2">
          <span className="text-sm text-ink-soft">Waitlisted</span>
          <span className="font-display text-2xl text-ink">2</span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        3 regulars can welcome newcomers
      </p>
    </div>
  );
}

function RecapJournal() {
  return (
    <div className="artifact artifact-journal pl-9 pr-5 py-5">
      <p className="font-hand text-2xl text-ink/80">After the night</p>
      <p className="font-display mt-3 text-3xl leading-none text-ink">16 came</p>
      <p className="mt-1 text-sm text-ink-soft">5 first-timers</p>
      <blockquote className="mt-5 border-l-2 border-rust/40 pl-3 text-[15px] italic leading-relaxed text-ink-soft">
        Ritual: &ldquo;What conversation changed you?&rdquo;
      </blockquote>
      <p className="font-hand mt-5 text-xl text-lamp">Next week: Columbus</p>
    </div>
  );
}

function ArtifactPreview({ type }: { type: CardLayout["artifact"] }) {
  if (type === "note") return <WarmStartNote />;
  if (type === "clipboard") return <HostClipboard />;
  return <RecapJournal />;
}

function HowItWorksCard({ card }: { card: CardLayout }) {
  return (
    <article className={card.layoutClass}>
      <p className="font-hand text-2xl text-lamp">{card.audience}</p>
      <h3 className="font-display mt-2 max-w-[18rem] text-xl leading-snug text-cream sm:text-2xl">
        {card.copy}
      </h3>
      <div className="mt-6">
        <ArtifactPreview type={card.artifact} />
      </div>
    </article>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-fade-top grain border-t border-lamp/10 text-cream"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="font-hand text-3xl text-lamp/90">how it works</p>
          <h2 className="font-display mt-2 text-[2rem] leading-[1.12] text-cream sm:text-[2.75rem]">
            Belong starts where group chats break.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/72 sm:text-lg">
            Group chats are good for noise. Belong gives recurring gatherings the
            structure that helps people arrive, return, and remember.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <HowItWorksCard key={card.audience} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
