"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/types/auth";

const navLinkClass =
  "text-sm text-cream/65 transition-colors hover:text-lamp-soft";

type SiteHeaderNavProps = {
  session: SessionUser | null;
};

export function SiteHeaderNav({ session }: SiteHeaderNavProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header
      className={
        onHome
          ? "absolute top-0 z-50 w-full bg-night/25 backdrop-blur-[2px]"
          : "border-b border-border bg-night-soft"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-display text-[1.65rem] tracking-tight text-cream">
          Belong
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-5">
          {session ? (
            <p className="font-hand text-lg text-lamp-soft">
              Hi, {session.displayName}
            </p>
          ) : null}

          <nav className="flex items-center gap-6">
            <Link href="/notes" className={navLinkClass}>
              The Belonging Notes
            </Link>
            <Link href="/#clubs" className={navLinkClass}>
              Clubs
            </Link>
            {session?.role === "host" && session.hostClubSlug ? (
              <Link
                href={`/host/clubs/${session.hostClubSlug}`}
                className={navLinkClass}
              >
                Host
              </Link>
            ) : null}
            {!session ? (
              <Link href="/enter" className={navLinkClass}>
                Enter
              </Link>
            ) : null}
          </nav>

          {session ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm text-cream/50 transition-colors hover:text-lamp-soft"
              >
                Sign out
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
