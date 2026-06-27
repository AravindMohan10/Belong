import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDb, isDatabaseConfigured } from "@/db/client";
import { sessions, users } from "@/db/schema";
import { SESSION_COOKIE, SESSION_TTL_DAYS } from "@/lib/auth/constants";
import type { SessionUser } from "@/lib/types/auth";

export { SESSION_COOKIE, SESSION_TTL_DAYS } from "@/lib/auth/constants";

function sessionExpiryDate(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);
  return expiresAt;
}

export async function getSession(): Promise<SessionUser | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    return null;
  }

  const db = await getDb();
  const [row] = await db
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,
      userId: users.id,
      role: users.role,
      displayName: users.displayName,
      hostClubSlug: users.hostClubSlug,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (!row || row.expiresAt < new Date()) {
    return null;
  }

  return {
    id: row.userId,
    role: row.role,
    displayName: row.displayName,
    hostClubSlug: row.hostClubSlug,
  };
}

export async function requireHostSession(): Promise<SessionUser> {
  const session = await getSession();

  if (!session || session.role !== "host") {
    throw new Error("Host session required");
  }

  return session;
}

export async function createSessionForUser(userId: string): Promise<string> {
  const db = await getDb();
  const [session] = await db
    .insert(sessions)
    .values({
      userId,
      expiresAt: sessionExpiryDate(),
    })
    .returning({ id: sessions.id });

  return session.id;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: sessionExpiryDate(),
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function destroySession(sessionId: string): Promise<void> {
  const db = await getDb();
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
