import { z } from "zod";
import { formField } from "@/lib/validators/form";

const photoUrlList = z
  .string()
  .trim()
  .transform((value) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().url()).min(1, "Add at least one photo URL.").max(6));

export const submitMemorySchema = z.object({
  clubSlug: z.string().trim().min(1),
  sessionId: z.string().uuid(),
  review: z.string().trim().min(10, "Say a bit more.").max(500),
  photoUrls: photoUrlList,
});

export function parseSubmitMemoryInput(formData: FormData) {
  return submitMemorySchema.safeParse({
    clubSlug: formField(formData.get("clubSlug")),
    sessionId: formField(formData.get("sessionId")),
    review: formField(formData.get("review")),
    photoUrls: formField(formData.get("photoUrls")),
  });
}
