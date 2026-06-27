import Link from "next/link";
import { redirect } from "next/navigation";
import { PersonaPicker } from "@/components/auth/persona-picker";
import { isDatabaseConfigured } from "@/db/client";
import { getSession } from "@/lib/auth/session";

export const metadata = {
  title: "Enter · Belong",
  description: "Sign in as a guest or host to explore Belong.",
};

export default async function EnterPage() {
  const session = await getSession();

  if (session?.role === "host" && session.hostClubSlug) {
    redirect(`/host/clubs/${session.hostClubSlug}`);
  }

  if (session?.role === "guest") {
    redirect("/clubs/sunday-cinema-walks");
  }

  const databaseReady = isDatabaseConfigured();

  return (
    <article className="grain border-t border-lamp/8 bg-night-soft text-cream">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <Link
          href="/"
          className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
        >
          ← Back home
        </Link>

        <header className="mt-8">
          <p className="font-hand text-3xl text-lamp">enter Belong</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Who are you here as?
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/70">
            Demo login for the hackathon. Pick a persona or type your name. No
            password, real sessions in Postgres.
          </p>
        </header>

        {!databaseReady ? (
          <div className="artifact artifact-journal artifact-journal--flat mt-10 px-6 py-6 text-ink">
            <p className="font-hand text-2xl text-rust">Database not connected</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Start local Postgres with{" "}
              <code className="rounded bg-paper-warm px-1.5 py-0.5">docker compose up -d</code>
              , copy <code className="rounded bg-paper-warm px-1.5 py-0.5">env.example</code> to{" "}
              <code className="rounded bg-paper-warm px-1.5 py-0.5">.env.local</code>, then run{" "}
              <code className="rounded bg-paper-warm px-1.5 py-0.5">npm run db:migrate</code> and{" "}
              <code className="rounded bg-paper-warm px-1.5 py-0.5">npm run db:seed</code>.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              See <span className="font-medium">docs/database-setup.md</span> for Aurora when credits land.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <PersonaPicker />
          </div>
        )}
      </div>
    </article>
  );
}
