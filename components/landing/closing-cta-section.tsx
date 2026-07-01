import { Button } from "@/components/ui/button";

export function ClosingCtaSection() {
  return (
    <section className="grain border-t border-lamp/8 bg-night text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-24">
        <p className="font-hand text-3xl text-lamp/80">one more thing</p>
        <h2 className="font-display mx-auto mt-3 max-w-lg text-3xl leading-tight sm:text-4xl">
          The best gatherings are the ones people return to.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/65">
          Start with a club page. See how Belong feels when someone shows up
          alone for the first time.
        </p>
        <div className="mt-8 flex justify-center overflow-visible pt-1">
          <Button href="/discover">Explore gatherings</Button>
        </div>
      </div>
    </section>
  );
}
