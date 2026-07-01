import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import type { SessionUser } from "@/lib/types/auth";

export async function requireGuestSession(nextPath: string): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    redirect(`/enter?next=${encodeURIComponent(nextPath)}`);
  }

  if (session.role === "host") {
    redirect("/host");
  }

  return session;
}
