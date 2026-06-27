"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUser, upsertDemoUser } from "@/db/queries/users";
import { getDemoPersonaById } from "@/lib/auth/demo-personas";
import {
  clearSessionCookie,
  createSessionForUser,
  destroySession,
  SESSION_COOKIE,
  setSessionCookie,
} from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/db/client";
import {
  signInCustomSchema,
  signInWithPersonaSchema,
} from "@/lib/validators/auth";

export type AuthActionState = {
  error?: string;
};

function redirectForRole(
  role: "guest" | "host",
  hostClubSlug: string | null,
): never {
  if (role === "host" && hostClubSlug) {
    redirect(`/host/clubs/${hostClubSlug}`);
  }

  redirect("/clubs/sunday-cinema-walks");
}

export async function signInWithPersonaAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured. See docs/database-setup.md." };
  }

  const parsed = signInWithPersonaSchema.safeParse({
    personaId: formData.get("personaId"),
  });

  if (!parsed.success) {
    return { error: "Pick a demo persona to continue." };
  }

  const persona = getDemoPersonaById(parsed.data.personaId);

  if (!persona) {
    return { error: "That persona is not available." };
  }

  const user = await upsertDemoUser({
    id: persona.id,
    role: persona.role,
    displayName: persona.displayName,
    hostClubSlug: persona.hostClubSlug,
  });

  const sessionId = await createSessionForUser(user.id);
  await setSessionCookie(sessionId);
  redirectForRole(user.role, user.hostClubSlug);
}

export async function signInCustomAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isDatabaseConfigured()) {
    return { error: "Database is not configured. See docs/database-setup.md." };
  }

  const parsed = signInCustomSchema.safeParse({
    role: formData.get("role"),
    displayName: formData.get("displayName"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check your name and try again.",
    };
  }

  const user = await createUser({
    role: parsed.data.role,
    displayName: parsed.data.displayName,
    hostClubSlug:
      parsed.data.role === "host" ? "sunday-cinema-walks" : null,
  });

  const sessionId = await createSessionForUser(user.id);
  await setSessionCookie(sessionId);
  redirectForRole(user.role, user.hostClubSlug);
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
