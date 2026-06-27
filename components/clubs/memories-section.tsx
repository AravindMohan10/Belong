import type { ClubMemory } from "@/lib/types/club";

type MemoriesSectionProps = {
  memories: ClubMemory[];
};

export function MemoriesSection({ memories }: MemoriesSectionProps) {
  if (memories.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-8 card-shadow">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Memories</p>
      <h2 className="font-display mt-3 text-3xl text-foreground">
        Nights that brought people back
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {memories.map((memory) => (
          <article
            key={memory.id}
            className="rounded-2xl border border-border bg-background/70 p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {memory.dateLabel} · {memory.sessionTitle}
            </p>
            <p className="mt-3 leading-7 text-muted">{memory.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
