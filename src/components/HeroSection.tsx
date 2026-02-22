import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-secondary/80" />
      
      {/* Marquee band */}
      <div className="absolute top-0 left-0 right-0 bg-primary py-2 overflow-hidden z-10">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-primary-foreground font-body text-sm tracking-widest mx-8">
              NO GODS — NO MASTERS — SOLIDARITY FOREVER — DIRECT ACTION —
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-primary-foreground leading-none mb-6">
          BREAK THE
          <br />
          <span className="text-primary">CHAINS</span>
        </h1>
        <p className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10">
          A collective dedicated to mutual aid, direct action, and building a world without hierarchy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#principles"
            className="bg-primary text-primary-foreground px-8 py-4 font-body font-bold text-sm tracking-widest uppercase hover:bg-primary/80 transition-colors border-2 border-primary"
          >
            Our Principles
          </a>
          <a
            href="#action"
            className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 font-body font-bold text-sm tracking-widest uppercase hover:bg-primary-foreground hover:text-secondary transition-colors"
          >
            Get Involved
          </a>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    </section>
  );
};

export default HeroSection;
