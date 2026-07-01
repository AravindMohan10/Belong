import Link from "next/link";
import { redirect } from "next/navigation";
import { EnterForm } from "@/components/auth/enter-form";
import { isDatabaseConfigured } from "@/db/client";
import { getSession } from "@/lib/auth/session";
import { getGuestHomePath } from "@/lib/guest/home";
import { safeRedirectPath } from "@/lib/validators/auth";

export const metadata = {
  title: "Enter · Belong",
  description: "Sign in to save a seat or host your gathering on Belong.",
};

type EnterPageProps = {
  searchParams: Promise<{ next?: string; role?: string }>;
};

export default async function EnterPage({ searchParams }: EnterPageProps) {
  const session = await getSession();
  const params = await searchParams;
  const nextPath = safeRedirectPath(params.next);

  if (session) {
    if (nextPath) {
      redirect(nextPath);
    }

    if (session.role === "host") {
      redirect("/host");
    }

    redirect(await getGuestHomePath(session.id));
  }

  const databaseReady = isDatabaseConfigured();
  const defaultRole = params.role === "host" ? "host" : "guest";

  return (
    <article className="grain border-t border-lamp/8 bg-night-soft text-cream">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <Link
          href="/"
          className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
        >
          ← Back home
        </Link>

        <header className="mt-8">
          <p className="font-hand text-3xl text-lamp">enter Belong</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Your name is enough to start
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/70">
            Save a seat at a club or publish your own recurring gathering.
          </p>
        </header>

        {!databaseReady ? (
          <div className="artifact artifact-journal artifact-journal--flat mt-10 px-6 py-6 text-ink">
            <p className="font-hand text-2xl text-rust">Sign-in unavailable</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We could not reach the database. If you are the site owner, check your
              connection settings and try again.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <EnterForm nextPath={nextPath} defaultRole={defaultRole} />
          </div>
        )}
      </div>
    </article>
  );
}
