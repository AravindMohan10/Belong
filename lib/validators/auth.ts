import { z } from "zod";

export const signInWithPersonaSchema = z.object({
  personaId: z.string().uuid(),
});

export const signInCustomSchema = z.object({
  role: z.enum(["guest", "host"]),
  displayName: z
    .string()
    .trim()
    .min(1, "Tell us what to call you.")
    .max(80, "Keep it under 80 characters."),
});
