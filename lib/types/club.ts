export type ClubHost = {
  name: string;
  bio: string;
  imageUrl: string;
};

export type ClubSession = {
  id: string;
  startsAt: Date;
  locationArea: string;
  title: string;
  capacity: number;
  spotsRemaining: number;
};

export type ClubMemory = {
  id: string;
  sessionTitle: string;
  dateLabel: string;
  excerpt: string;
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
  host: ClubHost;
  upcomingSession: ClubSession;
  memories: ClubMemory[];
};
