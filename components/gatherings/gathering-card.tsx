import Image from "next/image";
import Link from "next/link";
import type { UserGathering } from "@/lib/types/gathering";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type GatheringCardProps = {
  gathering: UserGathering;
  featured?: boolean;
};

export function GatheringCard({ gathering, featured = false }: GatheringCardProps) {
  const { club, session } = gathering;

  return (
    <article
      className={
        featured
          ? "gathering-card gathering-card--featured overflow-hidden"
          : "gathering-card overflow-hidden"
      }
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[240px]">
          <Image
            src={club.coverImageUrl}
            alt={club.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-night/10 lg:to-night/70" />
        </div>

        <div className="gathering-card__body flex flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="font-hand text-xl text-lamp-soft">{club.ritualLabel}</p>
            <h2 className="font-display mt-1 text-2xl leading-tight text-cream sm:text-3xl">
              {club.name}
            </h2>
            <p className="mt-2 text-sm text-cream/60">{session.title}</p>

            <div className="mt-4 space-y-2">
              <p className="artifact artifact-ticket inline-block px-3 py-2 text-sm text-ink shadow-none">
                {formatSessionDate(session.startsAt)} · {formatSessionTime(session.startsAt)}
              </p>
              <p className="text-sm text-cream/55">{session.locationArea}</p>
            </div>

            {gathering.isFirstTimer ? (
              <p className="mt-4 inline-block rounded-full border border-lamp/25 bg-lamp/10 px-3 py-1 text-xs text-lamp-soft">
                Your first time at this club
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/clubs/${club.slug}/warm-start`}
              className="relative z-10 inline-flex items-center justify-center font-hand text-[1.15rem] leading-tight text-ink bg-paper border border-ink/15 rounded-[3px_14px_11px_4px] px-4 py-2 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)] -rotate-[0.5deg] transition-all duration-200 hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm"
            >
              Open Warm Start
            </Link>
            <Link
              href={`/clubs/${club.slug}`}
              className="font-hand text-lg text-lamp-soft transition-colors hover:text-lamp"
            >
              Club page →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
