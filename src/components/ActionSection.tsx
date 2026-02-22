const ActionSection = () => {
  return (
    <section id="action" className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-display mb-6">
          JOIN THE MOVEMENT
        </h2>
        <p className="font-body text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-12">
          There is no membership card. No dues. No leaders to follow.
          Just people organizing together for a better world.
          Show up. Speak up. Act.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          <div className="border-2 border-primary-foreground/30 p-6">
            <h3 className="font-display text-xl mb-2">01 — ATTEND</h3>
            <p className="font-body text-sm text-primary-foreground/70">
              Come to our assemblies. Bring your ideas, your anger, your hope.
            </p>
          </div>
          <div className="border-2 border-primary-foreground/30 p-6">
            <h3 className="font-display text-xl mb-2">02 — ORGANIZE</h3>
            <p className="font-body text-sm text-primary-foreground/70">
              Start a working group. Build mutual aid in your neighborhood.
            </p>
          </div>
          <div className="border-2 border-primary-foreground/30 p-6">
            <h3 className="font-display text-xl mb-2">03 — ACT</h3>
            <p className="font-body text-sm text-primary-foreground/70">
              Direct action gets the goods. We don't ask — we build.
            </p>
          </div>
        </div>

        <a
          href="mailto:contact@breakthechains.org"
          className="inline-block bg-primary-foreground text-primary px-10 py-4 font-body font-bold text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
        >
          Contact the Collective
        </a>
      </div>
    </section>
  );
};

export default ActionSection;
