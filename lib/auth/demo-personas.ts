import { DEMO_ALEX_ID, DEMO_MARA_ID } from "@/lib/auth/constants";
import type { DemoPersona } from "@/lib/types/auth";

export const demoPersonas: DemoPersona[] = [
  {
    id: DEMO_ALEX_ID,
    role: "guest",
    displayName: "Alex",
    hostClubSlug: null,
    tagline: "Looking for a film club. First time showing up alone.",
  },
  {
    id: DEMO_MARA_ID,
    role: "host",
    displayName: "Mara Okonkwo",
    hostClubSlug: "sunday-cinema-walks",
    tagline: "Hosts Sunday Cinema Walks. Cares who comes back.",
  },
];

export function getDemoPersonaById(personaId: string): DemoPersona | null {
  return demoPersonas.find((persona) => persona.id === personaId) ?? null;
}
