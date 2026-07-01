"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getClubBySlug } from "@/db/queries/clubs";
import {
  cancelClubMembership,
  createClubMembership,
} from "@/db/queries/memberships";
import { isDatabaseConfigured } from "@/db/client";
import { getSession } from "@/lib/auth/session";
import { parseJoinMembershipInput } from "@/lib/validators/membership";

export type JoinMembershipActionState = {
  error?: string;
};

export type CancelMembershipActionState = {
  error?: string;
};

export async function joinMembershipAction(
  _prevState: JoinMembershipActionState,
  formData: FormData,
): Promise<JoinMembershipActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured." };
  }

  const session = await getSession();

  if (!session || session.role !== "guest") {
    return { error: "Sign in as a guest to join a club." };
  }

  const parsed = parseJoinMembershipInput(formData);

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
    return { error: "Hosts manage members from the host view." };
  }

  try {
    await createClubMembership({
      userId: session.id,
      clubId: club.id,
      priceCents: club.membershipPriceCents,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not complete membership.";

    return { error: message };
  }

  revalidatePath(`/clubs/${club.slug}`);
  revalidatePath(`/clubs/${club.slug}/join`);
  revalidatePath("/memberships");
  revalidatePath(`/host/clubs/${club.slug}`);

  redirect("/memberships");
}

export async function cancelMembershipAction(
  _prevState: CancelMembershipActionState,
  formData: FormData,
): Promise<CancelMembershipActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured." };
  }

  const session = await getSession();

  if (!session || session.role !== "guest") {
    return { error: "Sign in as a guest to manage membership." };
  }

  const membershipId = String(formData.get("membershipId") ?? "");

  if (!membershipId) {
    return { error: "Membership not found." };
  }

  await cancelClubMembership(session.id, membershipId);

  revalidatePath("/memberships");
  revalidatePath("/discover");

  return {};
}
