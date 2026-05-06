import logo from "@/assets/logo-hirondelles.png";
import { useLanguage } from "@/lib/LanguageContext";
import { useParallax } from "@/hooks/useParallax";

const HeroSection = () => {
  const { t } = useLanguage();
  const heroBg = import.meta.env.BASE_URL + "Assets/telegram-images/photos/telegram_53_1771887322.318648.jpg";
  // Parallax en mode 'bottom' avec maxPercent=50 aligné sur le backgroundPosition initial,
  // pour éviter le saut visuel observé en mode 'center' (qui passait de 50% à 0px au 1er scroll).
  // Glisse de 50% (cadre centré sur l'enseigne Pontareuse) vers 0% (toiture) au scroll.
  const parallaxRef = useParallax(0.4, 'bottom', 0, 50);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: 'center 50%' }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <img
          src={logo}
          alt="Logo Les Hirondelles"
          className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-lg"
        />
        <p className="font-body text-primary-foreground/80 text-sm tracking-widest uppercase mb-4">
          {t('hero.location')}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase text-primary-foreground leading-tight mb-6 tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          {t('hero.subtitle1')}
          <br />
          {t('hero.subtitle2')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#description"
            className="bg-primary text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            {t('hero.cta')}
          </a>
          <a
            href="https://t.me/hirondelles"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary-foreground/70 text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary-foreground/10 transition-colors"
          >
            {t('farming.help.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
