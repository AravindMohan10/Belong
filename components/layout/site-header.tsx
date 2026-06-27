import { getSession } from "@/lib/auth/session";
import { SiteHeaderNav } from "@/components/layout/site-header-nav";

export async function SiteHeader() {
  const session = await getSession();

  return <SiteHeaderNav session={session} />;
}
