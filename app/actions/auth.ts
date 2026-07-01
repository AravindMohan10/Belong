"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUser } from "@/db/queries/users";
import { setLocationCookie } from "@/lib/location/cookie";
import { getCityPreset } from "@/lib/location/presets";
import {
  clearSessionCookie,
  createSessionForUser,
  destroySession,
  SESSION_COOKIE,
  setSessionCookie,
} from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/db/client";
import { safeRedirectPath, signInCustomSchema } from "@/lib/validators/auth";
import { formField } from "@/lib/validators/form";
import { getClubsByHostUserId } from "@/db/queries/clubs";
import { getGuestHomePath } from "@/lib/guest/home";

export type AuthActionState = {
  error?: string;
};

async function redirectAfterSignIn(
  role: "guest" | "host",
  userId: string,
  nextPath: string | null,
): Promise<never> {
  if (nextPath) {
    redirect(nextPath);
  }

  if (role === "host") {
    const clubs = await getClubsByHostUserId(userId);

    if (clubs.length === 1) {
      redirect(`/host/clubs/${clubs[0].slug}`);
    }

    redirect("/host");
  }

  redirect(await getGuestHomePath(userId));
}

export async function signInCustomAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured. See docs/database-setup.md." };
  }

  const parsed = signInCustomSchema.safeParse({
    role: formField(formData.get("role")),
    displayName: formField(formData.get("displayName")) ?? "",
    city: formField(formData.get("city")) ?? undefined,
    next: formField(formData.get("next")),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check your name and try again.",
    };
  }

  const cityPreset =
    parsed.data.role === "guest" && parsed.data.city
      ? getCityPreset(parsed.data.city)
      : null;

  const user = await createUser({
    role: parsed.data.role,
    displayName: parsed.data.displayName,
    hostClubSlug: null,
    city: cityPreset?.city ?? null,
    latitude: cityPreset?.latitude ?? null,
    longitude: cityPreset?.longitude ?? null,
  });

  if (cityPreset) {
    await setLocationCookie({
      city: cityPreset.city,
      latitude: cityPreset.latitude,
      longitude: cityPreset.longitude,
      source: "profile",
    });
  }

  const sessionId = await createSessionForUser(user.id);
  await setSessionCookie(sessionId);

  const nextPath = safeRedirectPath(parsed.data.next);
  return redirectAfterSignIn(user.role, user.id, nextPath);
}

export async function signOutAction(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId && isDatabaseConfigured()) {
    await destroySession(sessionId);
  }

  await clearSessionCookie();
  redirect("/");
}
