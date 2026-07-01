import type { ClubVoice } from "@/lib/types/club";
import { defaultClubVoice } from "@/lib/types/club";

export function mapClubVoice(voice: ClubVoice | null | undefined): ClubVoice {
  if (!voice) {
    return defaultClubVoice;
  }

  return { ...defaultClubVoice, ...voice };
}
