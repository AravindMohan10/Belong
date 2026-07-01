export type ClubMembership = {
  id: string;
  clubId: string;
  clubSlug: string;
  clubName: string;
  status: "active" | "cancelled";
  planLabel: string;
  priceCents: number;
  memberSince: Date;
  cancelledAt: Date | null;
};

export type ClubMember = {
  id: string;
  userId: string;
  displayName: string;
  memberSince: Date;
};

export type MembershipCheckoutClub = {
  slug: string;
  name: string;
  ritualLabel: string;
  membershipPriceCents: number;
  hostName: string;
};
