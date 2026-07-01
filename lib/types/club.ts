export type ClubHost = {
  name: string;
  bio: string | null;
  imageUrl: string | null;
};

export type ClubVoice = {
  ritualTitle: string;
  promiseEyebrow: string;
  promiseHeadline: string;
  expectEyebrow: string;
  expectHeadline: string;
  memoriesEyebrow: string;
  memoriesHeadline: string;
  hostEyebrow: string;
};

export const defaultClubVoice: ClubVoice = {
  ritualTitle: "How it runs",
  promiseEyebrow: "First visit",
  promiseHeadline: "Your seat is saved before you arrive.",
  expectEyebrow: "The schedule",
  expectHeadline: "What happens when",
  memoriesEyebrow: "Recent nights",
  memoriesHeadline: "What it feels like",
  hostEyebrow: "Host",
};

export type ClubWarmStart = {
  firstTenMinutes: string[];
  findTheGroup: string;
  smallTalkLine: string;
  exactPin: string | null;
};

export type ClubSession = {
  id: string;
  startsAt: Date;
  locationArea: string;
  title: string;
  capacity: number;
  spotsRemaining: number;
  meetingPoint: string;
  warmStart: ClubWarmStart;
};

export type ClubMemory = {
  id: string;
  sessionId: string | null;
  sessionTitle: string;
  dateLabel: string;
  review: string;
  reviewerName: string;
  photoUrls: string[];
  verified: boolean;
};

export type MemoryEligibleSession = {
  id: string;
  title: string;
  dateLabel: string;
};

export type Club = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  ritualLabel: string;
  vibe: string[];
  firstTimerPromise: string;
  whatToExpect: string[];
  city: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  voice: ClubVoice;
  host: ClubHost;
  hostUserId: string;
  membershipPriceCents: number;
  upcomingSession: ClubSession | null;
  memories: ClubMemory[];
};

export type ClubSummary = Pick<
  Club,
  | "id"
  | "slug"
  | "name"
  | "tagline"
  | "coverImageUrl"
  | "ritualLabel"
  | "city"
  | "neighborhood"
> & {
  distanceKm?: number | null;
};

export type DiscoverClub = ClubSummary & {
  vibe: string[];
  hostName: string;
  latitude: number;
  longitude: number;
  upcomingSession: {
    id: string;
    startsAt: Date;
    title: string;
    locationArea: string;
    spotsRemaining: number;
  } | null;
};
