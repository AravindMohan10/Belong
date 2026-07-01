"use server";

import { revalidatePath } from "next/cache";
import { getClubBySlug } from "@/db/queries/clubs";
import { createGuestMemory } from "@/db/queries/memories";
import { isDatabaseConfigured } from "@/db/client";
import { getSession } from "@/lib/auth/session";
import { parseSubmitMemoryInput } from "@/lib/validators/memory";

export type SubmitMemoryActionState = {
  error?: string;
  success?: boolean;
};

export async function submitMemoryAction(
  _prevState: SubmitMemoryActionState,
  formData: FormData,
): Promise<SubmitMemoryActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured." };
  }

  const session = await getSession();

  if (!session || session.role !== "guest") {
    return { error: "Sign in as a guest to share a memory." };
  }

  const parsed = parseSubmitMemoryInput(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  const club = await getClubBySlug(parsed.data.clubSlug);

  if (!club) {
    return { error: "Club not found." };
  }

  if (club.hostUserId === session.id) {
    return { error: "Hosts share recaps from the host view." };
  }

  try {
    await createGuestMemory({
      userId: session.id,
      clubId: club.id,
      sessionId: parsed.data.sessionId,
      reviewerName: session.displayName,
      review: parsed.data.review,
      photoUrls: parsed.data.photoUrls,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save your memory.";

    return { error: message };
  }

  revalidatePath(`/clubs/${club.slug}`);

  return { success: true };
}
