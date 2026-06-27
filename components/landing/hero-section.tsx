import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "@/components/landing/hero-video-background";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(94vh,900px)] overflow-hidden bg-night">
      <HeroVideoBackground />

      <div className="relative z-10 mx-auto flex min-h-[min(94vh,900px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:pb-20">
        <div className="max-w-2xl">
          <p className="font-hand text-2xl text-lamp-soft sm:text-3xl">
            Between &ldquo;I&apos;m interested&rdquo; and &ldquo;I belong here&rdquo;
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.06] text-cream sm:text-[3.5rem]">
            Come alone. Leave with a reason to come back.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/78">
            Belong is for the whole ritual: finding a club that fits, knowing
            what to expect before you arrive, and turning one night into
            something people return to. First-timers, hosts, and regulars.
          </p>
          <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3 overflow-visible pt-1">
            <Button href="#clubs">Check out the clubs</Button>
            <Button href="#how-it-works" variant="secondary">
              How it works
            </Button>
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-cream/52">
            Film clubs, supper clubs, watch parties. Not a group chat. Not a
            ticket page. The layer that helps gatherings last.
          </p>
        </div>
      </div>
    </section>
  );
}
