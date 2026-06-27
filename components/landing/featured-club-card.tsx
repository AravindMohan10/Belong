import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/lib/types/club";
import { formatSessionDate } from "@/lib/format";

type FeaturedClubCardProps = {
  club: Club;
};

export function FeaturedClubCard({ club }: FeaturedClubCardProps) {
  const { upcomingSession } = club;

  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="group block rotate-[0.4deg] transition-transform duration-500 hover:rotate-0"
    >
      <div className="card-shadow overflow-hidden rounded-sm border border-paper/15 bg-night-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={club.coverImageUrl}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-hand text-xl text-lamp-soft">{club.ritualLabel}</p>
            <h3 className="font-display mt-1 text-2xl text-cream">{club.name}</h3>
          </div>
        </div>
        <div className="border-t border-paper/10 bg-paper/5 px-5 py-4">
          <p className="text-sm text-cream/58">
            {formatSessionDate(upcomingSession.startsAt)} · {upcomingSession.title}
          </p>
          <p className="font-hand mt-1 text-lg text-lamp group-hover:text-lamp-soft">
            Open club page →
          </p>
        </div>
      </div>
    </Link>
  );
}
