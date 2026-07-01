import { z } from "zod";
import { getCityPreset } from "@/lib/location/presets";
import { formField } from "@/lib/validators/form";

const lineList = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );

const commaList = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );

export const createClubSchema = z.object({
  name: z.string().trim().min(2).max(80),
  tagline: z.string().trim().min(4).max(160),
  description: z.string().trim().min(20).max(2000),
  coverImageUrl: z.string().url().max(500),
  ritualLabel: z.string().trim().min(3).max(80),
  vibe: commaList.pipe(z.array(z.string().min(1)).min(1).max(8)),
  firstTimerPromise: z.string().trim().min(10).max(500),
  whatToExpect: lineList.pipe(z.array(z.string().min(3)).min(1).max(8)),
  sessionTitle: z.string().trim().min(2).max(120),
  sessionStartsAt: z.string().trim().min(1, "Pick a date and time."),
  locationArea: z.string().trim().min(2).max(120),
  capacity: z.coerce.number().int().min(2).max(200),
  meetingPoint: z.string().trim().min(4).max(240),
  exactPin: z.string().trim().max(240).optional(),
  warmStartSteps: lineList.pipe(z.array(z.string().min(3)).min(1).max(8)),
  warmStartFindTheGroup: z.string().trim().min(4).max(500),
  warmStartSmallTalkLine: z.string().trim().min(4).max(280),
  city: z.string().trim().min(2).max(80),
  neighborhood: z.string().trim().min(2).max(80),
}).superRefine((data, ctx) => {
  if (!getCityPreset(data.city)) {
    ctx.addIssue({
      code: "custom",
      message: "Pick a supported city.",
      path: ["city"],
    });
  }
});

export const saveSeatSchema = z.object({
  clubSlug: z.string().trim().min(1),
  sessionId: z.string().uuid(),
});

export const saveSeatFlowSchema = z
  .object({
    clubSlug: z.string().trim().min(1),
    sessionId: z.string().uuid(),
    displayName: z.string().trim().max(80).optional(),
    city: z.string().trim().max(80).optional(),
  })
  .superRefine((data, ctx) => {
    const hasName = Boolean(data.displayName && data.displayName.length > 0);
    const hasCity = Boolean(data.city && data.city.length > 0);

    if (hasName !== hasCity) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your name and city to save a seat.",
        path: hasName ? ["city"] : ["displayName"],
      });
    }

    if (data.city && !getCityPreset(data.city)) {
      ctx.addIssue({
        code: "custom",
        message: "Pick a supported city.",
        path: ["city"],
      });
    }
  });

export function parseSaveSeatFlowInput(formData: FormData) {
  return saveSeatFlowSchema.safeParse({
    clubSlug: formField(formData.get("clubSlug")),
    sessionId: formField(formData.get("sessionId")),
    displayName: formField(formData.get("displayName")) ?? undefined,
    city: formField(formData.get("city")) ?? undefined,
  });
}
