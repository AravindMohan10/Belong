import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/lib/types/club";

type ClubSpotlightCardProps = {
  club: Club;
  rotateClass: string;
};

export function ClubSpotlightCard({ club, rotateClass }: ClubSpotlightCardProps) {
  return (
    <Link
      href={`/clubs/${club.slug}`}
      className={`group block transition-transform duration-500 hover:rotate-0 ${rotateClass}`}
    >
      <div className="artifact artifact-polaroid h-full overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
          <Image
            src={club.coverImageUrl}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 45vw, 260px"
          />
        </div>
        <div className="mt-3 px-0.5 pb-0.5">
          <p className="font-hand text-base leading-tight text-rust sm:text-lg">
            {club.ritualLabel}
          </p>
          <h3 className="font-display mt-1 text-lg leading-tight text-ink sm:text-xl">
            {club.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-ink-soft sm:text-sm">
            {club.tagline}
          </p>
          <p className="font-hand mt-2 text-base text-lamp group-hover:text-rust sm:text-lg">
            Open →
          </p>
        </div>
      </div>
    </Link>
  );
}
