import type { InboxMessage, InboxThread, UserGathering } from "@/lib/types/gathering";

function buildThreadForGathering(gathering: UserGathering): InboxThread {
  const messages: InboxMessage[] = [
    {
      id: `${gathering.rsvpId}-warm-start`,
      senderLabel: gathering.club.name,
      senderKind: "club",
      body: "Your Warm Start is ready. Review what happens before you arrive.",
      href: `/clubs/${gathering.club.slug}/warm-start`,
      createdAt: gathering.session.startsAt,
    },
  ];

  if (gathering.isFirstTimer) {
    messages.push({
      id: `${gathering.rsvpId}-host-welcome`,
      senderLabel: gathering.club.hostName,
      senderKind: "host",
      body: `Looking forward to seeing you. I will meet you at the meeting point.`,
      href: `/clubs/${gathering.club.slug}`,
      createdAt: new Date(gathering.session.startsAt.getTime() - 2 * 24 * 60 * 60 * 1000),
    });
  }

  messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return {
    id: gathering.rsvpId,
    clubSlug: gathering.club.slug,
    clubName: gathering.club.name,
    ritualLabel: gathering.club.ritualLabel,
    preview: messages[0]?.body ?? "",
    updatedAt: messages[0]?.createdAt ?? gathering.session.startsAt,
    messages,
  };
}

export function buildGuestInboxThreads(
  gatherings: UserGathering[],
): InboxThread[] {
  return gatherings
    .map(buildThreadForGathering)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}
