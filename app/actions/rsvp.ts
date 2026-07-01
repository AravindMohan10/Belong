"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getClubBySlug } from "@/db/queries/clubs";
import {
  createRsvp,
  getUserRsvpForSession,
  userHasPriorClubRsvp,
} from "@/db/queries/rsvps";
import { createUser } from "@/db/queries/users";
import { isDatabaseConfigured } from "@/db/client";
import { setLocationCookie } from "@/lib/location/cookie";
import { getCityPreset } from "@/lib/location/presets";
import {
  createSessionForUser,
  getSession,
  setSessionCookie,
} from "@/lib/auth/session";
import { parseSaveSeatFlowInput } from "@/lib/validators/club";

export type SaveSeatActionState = {
  error?: string;
};

async function resolveGuestUserId(input: {
  displayName?: string;
  city?: string;
}): Promise<{ userId: string; error?: string }> {
  const session = await getSession();

  if (session) {
    if (session.role === "host") {
      return { userId: "", error: "Hosts manage gatherings from the host view." };
    }

    return { userId: session.id };
  }

  if (!input.displayName || !input.city) {
    return { userId: "", error: "Enter your name and city to save a seat." };
  }

  const cityPreset = getCityPreset(input.city);

  if (!cityPreset) {
    return { userId: "", error: "Pick a supported city." };
  }

  const user = await createUser({
    role: "guest",
    displayName: input.displayName,
    hostClubSlug: null,
    city: cityPreset.city,
    latitude: cityPreset.latitude,
    longitude: cityPreset.longitude,
  });

  const sessionId = await createSessionForUser(user.id);
  await setSessionCookie(sessionId);
  await setLocationCookie({
    city: cityPreset.city,
    latitude: cityPreset.latitude,
    longitude: cityPreset.longitude,
    source: "profile",
  });

  return { userId: user.id };
}

async function persistSaveSeat(
  userId: string,
  clubSlug: string,
  sessionId: string,
): Promise<SaveSeatActionState> {
  const club = await getClubBySlug(clubSlug);

  if (!club?.upcomingSession) {
    return { error: "This club has no upcoming gathering." };
  }

  if (club.upcomingSession.id !== sessionId) {
    return { error: "That session is no longer open." };
  }

  if (club.hostUserId === userId) {
    return { error: "Hosts cannot save a seat at their own club." };
  }

  if (club.upcomingSession.spotsRemaining <= 0) {
    return { error: "This gathering is full." };
  }

  const existing = await getUserRsvpForSession(userId, club.upcomingSession.id);

  if (existing?.status === "confirmed") {
    redirect(`/clubs/${club.slug}/warm-start`);
  }

  const isFirstTimer = !(await userHasPriorClubRsvp(userId, club.id));

  await createRsvp({
    userId,
    clubId: club.id,
    sessionId: club.upcomingSession.id,
    isFirstTimer,
  });

  revalidatePath(`/clubs/${club.slug}`);
  revalidatePath(`/clubs/${club.slug}/save`);
  revalidatePath(`/clubs/${club.slug}/warm-start`);
  revalidatePath(`/host/clubs/${club.slug}`);
  revalidatePath("/gatherings");
  revalidatePath("/inbox");

  redirect(`/clubs/${club.slug}/warm-start`);
}

export async function completeSaveSeatAction(
  _prevState: SaveSeatActionState,
  formData: FormData,
): Promise<SaveSeatActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured." };
  }

  const parsed = parseSaveSeatFlowInput(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  const { userId, error } = await resolveGuestUserId({
    displayName: parsed.data.displayName,
    city: parsed.data.city,
  });

  if (error || !userId) {
    return { error: error ?? "Could not sign you in." };
  }

  return persistSaveSeat(userId, parsed.data.clubSlug, parsed.data.sessionId);
}

export async function saveSeatAction(
  _prevState: SaveSeatActionState,
  formData: FormData,
): Promise<SaveSeatActionState> {
  const session = await getSession();

  if (!session) {
    const clubSlug = String(formData.get("clubSlug") ?? "");
    redirect(`/clubs/${clubSlug}/save`);
  }

  const parsed = parseSaveSeatFlowInput(formData);

  if (!parsed.success) {
    return { error: "That gathering is not available right now." };
  }

  return persistSaveSeat(session.id, parsed.data.clubSlug, parsed.data.sessionId);
}
