import Image from "next/image";
import type { ClubHost } from "@/lib/types/club";

type HostSectionProps = {
  host: ClubHost;
};

export function HostSection({ host }: HostSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8 card-shadow">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Your host</p>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={host.imageUrl}
            alt={host.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl text-foreground">{host.name}</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">{host.bio}</p>
        </div>
      </div>
    </section>
  );
}
