import Link from "next/link";
import { redirect } from "next/navigation";
import { CreateClubForm } from "@/components/host/create-club-form";
import { getSession } from "@/lib/auth/session";

export const metadata = {
  title: "Create a club · Belong",
};

export default async function NewClubPage() {
  const session = await getSession();

  if (!session) {
    redirect("/enter?next=/host/clubs/new&role=host");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <Link
        href="/host"
        className="font-hand text-lg text-lamp transition-colors hover:text-lamp-soft"
      >
        ← Host home
      </Link>
      <header className="mt-6">
        <p className="font-hand text-2xl text-lamp">publish a club</p>
        <h1 className="font-display mt-2 text-4xl leading-tight">
          Start a recurring gathering
        </h1>
        <p className="mt-3 max-w-2xl text-cream/70">
          Belong stores your club, your next session, and the Warm Start first-timers
          receive after they save a seat.
        </p>
      </header>
      <div className="mt-10">
        <CreateClubForm />
      </div>
    </div>
  );
}
