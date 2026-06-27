import {
  getDemoClubBySlug,
  getFeaturedDemoClubs,
} from "@/lib/seed/demo-clubs";
import type { Club } from "@/lib/types/club";

export async function getClubBySlug(slug: string): Promise<Club | null> {
  return getDemoClubBySlug(slug);
}

export async function getFeaturedClubs(): Promise<Club[]> {
  return getFeaturedDemoClubs();
}
