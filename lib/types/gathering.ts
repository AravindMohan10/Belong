export type UserGathering = {
  rsvpId: string;
  isFirstTimer: boolean;
  club: {
    slug: string;
    name: string;
    tagline: string;
    ritualLabel: string;
    coverImageUrl: string;
    hostName: string;
  };
  session: {
    id: string;
    startsAt: Date;
    title: string;
    locationArea: string;
    meetingPoint: string;
  };
};

export type InboxMessage = {
  id: string;
  senderLabel: string;
  senderKind: "club" | "host";
  body: string;
  href: string | null;
  createdAt: Date;
};

export type InboxThread = {
  id: string;
  clubSlug: string;
  clubName: string;
  ritualLabel: string;
  preview: string;
  updatedAt: Date;
  messages: InboxMessage[];
};
