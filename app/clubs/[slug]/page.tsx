import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClubHero } from "@/components/clubs/club-hero";
import { FirstTimerPromise } from "@/components/clubs/first-timer-promise";
import { HostSection } from "@/components/clubs/host-section";
import { MemoriesSection } from "@/components/clubs/memories-section";
import { NextSessionCard } from "@/components/clubs/next-session-card";
import { WhatToExpect } from "@/components/clubs/what-to-expect";
import { getClubBySlug } from "@/db/queries/clubs";

type ClubPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ClubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return { title: "Club not found" };
  }

  return {
    title: `${club.name} · Belong`,
    description: club.tagline,
  };
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ClubHero club={club} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <section className="rounded-3xl border border-border bg-card p-8 card-shadow">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">The ritual</p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{club.description}</p>
          </section>
          <FirstTimerPromise promise={club.firstTimerPromise} />
          <WhatToExpect items={club.whatToExpect} />
          <HostSection host={club.host} />
          <MemoriesSection memories={club.memories} />
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <NextSessionCard session={club.upcomingSession} />
        </aside>
      </div>
    </div>
  );
}
