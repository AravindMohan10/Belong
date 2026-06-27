type WhatToExpectProps = {
  items: string[];
};

export function WhatToExpect({ items }: WhatToExpectProps) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8 card-shadow">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">What to expect</p>
      <h2 className="font-display mt-3 text-3xl text-foreground">
        The rhythm of the night
      </h2>
      <ol className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={item} className="flex gap-4 text-muted">
            <span className="font-display text-2xl text-gold/80">{index + 1}</span>
            <p className="pt-1 leading-7">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
