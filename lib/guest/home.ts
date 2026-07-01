import { userHasUpcomingGathering } from "@/db/queries/gatherings";

export async function getGuestHomePath(userId: string): Promise<string> {
  const hasGatherings = await userHasUpcomingGathering(userId);
  return hasGatherings ? "/gatherings" : "/discover";
}
