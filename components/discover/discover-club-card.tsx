import Image from "next/image";
import Link from "next/link";
import { formatDistanceKm } from "@/lib/location/distance";
import type { DiscoverClub } from "@/lib/types/club";
import { formatSessionDate, formatSessionTime } from "@/lib/format";

type DiscoverClubCardProps = {
  club: DiscoverClub;
  featured?: boolean;
  rotateClass?: string;
};

export function DiscoverClubCard({
  club,
  featured = false,
  rotateClass = "",
}: DiscoverClubCardProps) {
  const { upcomingSession } = club;

  return (
    <Link
      href={`/clubs/${club.slug}`}
      className={`group discover-card block transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 ${rotateClass}`}
    >
      <article
        className={
          featured
            ? "discover-card__inner discover-card__inner--featured"
            : "discover-card__inner"
        }
      >
        <div
          className={
            featured
              ? "relative aspect-[16/10] overflow-hidden sm:aspect-[21/9]"
              : "relative aspect-[4/3] overflow-hidden"
          }
        >
          <Image
            src={club.coverImageUrl}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 900px"
                : "(max-width: 768px) 100vw, 420px"
            }
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/10" />

          {upcomingSession ? (
            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
              <p className="artifact artifact-ticket inline-block px-3 py-2 text-xs font-medium text-ink shadow-none sm:text-sm">
                {formatSessionDate(upcomingSession.startsAt)}
                <span className="mx-1.5 text-ink-soft">·</span>
                {formatSessionTime(upcomingSession.startsAt)}
              </p>
            </div>
          ) : null}

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="font-hand text-xl text-lamp-soft sm:text-2xl">
              {club.ritualLabel}
            </p>
            <h2
              className={
                featured
                  ? "font-display mt-1 text-3xl leading-tight text-cream sm:text-4xl"
                  : "font-display mt-1 text-2xl leading-tight text-cream"
              }
            >
              {club.name}
            </h2>
          </div>
        </div>

        <div className="discover-card__body">
          <p className="text-sm leading-relaxed text-cream/70 sm:text-base">
            {club.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {club.vibe.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lamp/20 bg-lamp/10 px-2.5 py-0.5 text-xs text-lamp-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-cream/10 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-cream/45">
                Hosted by
              </p>
              <p className="font-hand text-lg text-lamp-soft">{club.hostName}</p>
            </div>

            <div className="text-right">
              {upcomingSession ? (
                <>
                  <p className="text-xs text-cream/50">
                    {club.neighborhood} · {club.city}
                  </p>
                  {club.distanceKm != null ? (
                    <p className="text-xs text-cream/45">
                      {formatDistanceKm(club.distanceKm)}
                    </p>
                  ) : null}
                  <p className="font-hand text-lg text-lamp group-hover:text-lamp-soft">
                    {upcomingSession.spotsRemaining > 0
                      ? `${upcomingSession.spotsRemaining} seats left →`
                      : "Join waitlist →"}
                  </p>
                </>
              ) : (
                <p className="font-hand text-lg text-lamp group-hover:text-lamp-soft">
                  Open club →
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
