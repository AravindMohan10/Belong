type FirstTimerPromiseProps = {
  promise: string;
};

export function FirstTimerPromise({ promise }: FirstTimerPromiseProps) {
  return (
    <section className="rounded-3xl border border-accent/20 bg-accent-soft/50 p-8 card-shadow">
      <p className="text-sm uppercase tracking-[0.24em] text-accent">First-timer promise</p>
      <h2 className="font-display mt-3 text-3xl text-foreground">
        Someone saved you a seat.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{promise}</p>
    </section>
  );
}
