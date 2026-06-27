import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/enter?next=/host");
  }

  if (session.role !== "host") {
    redirect("/clubs/sunday-cinema-walks");
  }

  return <div className="bg-night-soft text-cream">{children}</div>;
}
