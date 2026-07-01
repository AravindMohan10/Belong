import { z } from "zod";
import { getCityPreset } from "../location/presets";

export function safeRedirectPath(path: string | null | undefined): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return null;
  }

  return path;
}

export const signInCustomSchema = z.object({
  role: z.enum(["guest", "host"]),
  displayName: z
    .string()
    .trim()
    .min(1, "Tell us what to call you.")
    .max(80, "Keep it under 80 characters."),
  city: z.string().trim().max(80).optional(),
  next: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === "guest" && !data.city) {
    ctx.addIssue({
      code: "custom",
      message: "Tell us which city you are in.",
      path: ["city"],
    });
  }

  if (data.city && !getCityPreset(data.city)) {
    ctx.addIssue({
      code: "custom",
      message: "Pick one of the cities we support for now.",
      path: ["city"],
    });
  }
});
