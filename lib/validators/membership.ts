import { z } from "zod";
import { formField } from "@/lib/validators/form";

export const joinMembershipSchema = z.object({
  clubSlug: z.string().trim().min(1),
  cardholderName: z.string().trim().min(2, "Enter the name on the card."),
  cardNumber: z
    .string()
    .trim()
    .regex(/^\d{16}$/, "Enter a valid 16-digit card number."),
});

export function parseJoinMembershipInput(formData: FormData) {
  return joinMembershipSchema.safeParse({
    clubSlug: formField(formData.get("clubSlug")),
    cardholderName: formField(formData.get("cardholderName")),
    cardNumber: formField(formData.get("cardNumber"))?.replace(/\s/g, ""),
  });
}
