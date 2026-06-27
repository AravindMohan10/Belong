import Image from "next/image";
import type { Club } from "@/lib/types/club";

type ClubHeroProps = {
  club: Club;
};

export function ClubHero({ club }: ClubHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card card-shadow">
      <div className="relative aspect-[21/10] min-h-[280px] w-full">
        <Image
          src={club.coverImageUrl}
          alt={club.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/85 via-[#1a2332]/55 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-white/75">
            {club.ritualLabel}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl text-white sm:text-5xl">
            {club.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{club.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {club.vibe.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
