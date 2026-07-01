"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/types/auth";

const navLinkClass =
  "text-sm text-cream/65 transition-colors hover:text-lamp-soft";

const navLinkActiveClass =
  "text-sm text-lamp-soft transition-colors hover:text-lamp";

type SiteHeaderNavProps = {
  session: SessionUser | null;
};

function navClass(isActive: boolean): string {
  return isActive ? navLinkActiveClass : navLinkClass;
}

const isGuestShellPath = (pathname: string) =>
  pathname === "/discover" ||
  pathname === "/gatherings" ||
  pathname === "/memberships" ||
  pathname === "/inbox" ||
  pathname.startsWith("/clubs/");

export function SiteHeaderNav({ session }: SiteHeaderNavProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const isGuest = session?.role === "guest";
  const onGuestShell = isGuestShellPath(pathname);

  return (
    <header
      className={
        onHome
          ? "absolute top-0 z-50 w-full bg-night/25 backdrop-blur-[2px]"
          : "border-b border-border bg-night-soft"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href={isGuest ? "/gatherings" : "/"}
          className="font-display text-[1.65rem] tracking-tight text-cream"
        >
          Belong
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-5">
          {session ? (
            <p className="hidden font-hand text-lg text-lamp-soft sm:block">
              Hi, {session.displayName}
            </p>
          ) : null}

          <nav className="flex items-center gap-6">
            {!isGuest ? (
              <Link href="/discover" className={navClass(pathname === "/discover")}>
                Discover
              </Link>
            ) : null}
            {!session ? (
              <Link href="/notes" className={navClass(pathname === "/notes")}>
                The Belonging Notes
              </Link>
            ) : null}
            {session?.role === "host" ? (
              <Link href="/host" className={navClass(pathname.startsWith("/host"))}>
                Host
              </Link>
            ) : null}
            {!session ? (
              <Link href="/enter" className={navClass(pathname === "/enter")}>
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

      {isGuest && onGuestShell ? (
        <div className="border-t border-lamp/8">
          <div className="mx-auto flex max-w-6xl gap-1 px-6">
            {[
              { href: "/discover", label: "Discover" },
              { href: "/gatherings", label: "My gatherings" },
              { href: "/memberships", label: "My clubs" },
              { href: "/inbox", label: "Inbox" },
            ].map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href === "/discover" && pathname.startsWith("/clubs/"));

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={
                    isActive
                      ? "border-b-2 border-lamp px-3 py-3 font-hand text-lg text-lamp-soft"
                      : "border-b-2 border-transparent px-3 py-3 font-hand text-lg text-cream/50 transition-colors hover:text-cream/80"
                  }
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
