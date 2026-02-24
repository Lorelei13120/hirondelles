import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-hirondelles.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <img
          src={logo}
          alt="Logo Les Hirondelles"
          className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-lg"
        />
        <p className="font-body text-primary-foreground/80 text-sm tracking-widest uppercase mb-4">
          Hameau agricole de Pontareuse · Boudry (NE)
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase text-primary-foreground leading-tight mb-6 tracking-tight">
          Collectif desHirondelles
        </h1>
        <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          La terre à celleux qui la cultivent
          <br />
          Vive les topis, le bissap et les poêles à bois
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#description"
            className="bg-primary text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            Qui sommes-nous ?
          </a>
          <a
            href="https://t.me/hirondelles"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary-foreground/70 text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary-foreground/10 transition-colors"
          >
            Rejoindre le canal Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
