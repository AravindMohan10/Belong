import Image from "next/image";
import Link from "next/link";
import type { ClubMemory, ClubVoice, MemoryEligibleSession } from "@/lib/types/club";
import { MemoryUploadForm } from "@/components/clubs/memory-upload-form";

type ClubMemoriesSectionProps = {
  clubSlug: string;
  voice: ClubVoice;
  memories: ClubMemory[];
  eligibleSessions: MemoryEligibleSession[];
  isSignedInGuest: boolean;
};

export function ClubMemoriesSection({
  clubSlug,
  voice,
  memories,
  eligibleSessions,
  isSignedInGuest,
}: ClubMemoriesSectionProps) {
  const canUpload = eligibleSessions.length > 0;

  return (
    <section className="artifact artifact-clipboard artifact-journal--flat px-6 py-8 text-ink sm:px-8 sm:py-10">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
        {voice.memoriesEyebrow}
      </p>
      <h2 className="font-display mt-2 text-3xl text-ink">{voice.memoriesHeadline}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Photos and words from people who actually showed up. Verified guests can add
        their own after a gathering passes.
      </p>

      {canUpload ? (
        <div className="mt-8">
          <MemoryUploadForm clubSlug={clubSlug} eligibleSessions={eligibleSessions} />
        </div>
      ) : isSignedInGuest ? (
        <p className="mt-6 rounded-md border border-ink/10 bg-paper-warm px-4 py-3 text-sm text-ink-soft">
          After you attend a gathering, you can post photos and a short review here.
        </p>
      ) : (
        <p className="mt-6 rounded-md border border-ink/10 bg-paper-warm px-4 py-3 text-sm text-ink-soft">
          <Link href={`/clubs/${clubSlug}/save`} className="text-rust hover:text-ink">
            Save a seat
          </Link>{" "}
          first. Once you have attended, you can share a memory here.
        </p>
      )}

      {memories.length > 0 ? (
        <div className="mt-10 space-y-10">
          {memories.map((memory) => (
            <article key={memory.id} className="space-y-4 border-t border-ink/10 pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {memory.dateLabel} · {memory.sessionTitle}
                </p>
                {memory.verified ? (
                  <span className="rounded-full border border-lamp/30 bg-lamp/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    Verified guest
                  </span>
                ) : null}
              </div>

              {memory.photoUrls.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {memory.photoUrls.map((url) => (
                    <div
                      key={url}
                      className="relative h-48 w-72 shrink-0 overflow-hidden rounded-md border border-ink/10 bg-paper-warm"
                    >
                      <Image
                        src={url}
                        alt={`${memory.sessionTitle} at ${memory.dateLabel}`}
                        fill
                        className="object-cover"
                        sizes="288px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <blockquote className="border-l-2 border-rust/40 pl-4">
                <p className="text-base leading-7 text-ink">{memory.review}</p>
                <footer className="mt-2 text-sm text-ink-soft">{memory.reviewerName}</footer>
              </blockquote>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-soft">No memories yet. Be the first after you attend.</p>
      )}
    </section>
  );
}
