import { Sprout, Users, Calendar, ImageIcon } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import { useLanguage } from "@/lib/LanguageContext";
import { useParallax } from "@/hooks/useParallax";
// Importée comme module Vite pour figer le hash et garantir la presence
// au build, plutot que de pointer vers un fichier du pipeline d'ingestion
// Telegram (qui pourrait etre renomme/supprime sans crier gare).
import heroImage from "@/assets/maraichage-hero.jpg";

const MaraichagePage = () => {
  const { t } = useLanguage();
  // Parallax inversé (reverse=true) : la photo descend dans le cadre au scroll.
  // Démarre à 75% (humains visibles) et glisse vers 95% (vers le bas de la photo).
  // Le backgroundPosition initial doit valoir minPercent (point de départ en mode reverse)
  // pour éviter un saut au premier événement scroll.
  const parallaxRef = useParallax(0.3, 'bottom', 75, 95, true);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Image with bounded Parallax */}
      <div
        ref={parallaxRef}
        className="w-full h-[40vh] md:h-[60vh] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: 'center 75%' }}
      />

      {/* Hero Text */}
      <section className="relative py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            {t('farming.title')}
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-8" />
          <p className="font-body text-muted-foreground text-lg max-w-3xl leading-relaxed">
            {t('farming.intro')}
          </p>
        </div>
      </section>

      {/* Le projet */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sprout className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              {t('farming.project.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                {t('farming.project.p1')}
              </p>
              <p>
                {t('farming.project.p2')}
              </p>
              <p>
                {t('farming.project.p3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement collectif */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              {t('farming.collective.title')}
            </h2>
          </div>
          <div className="font-body text-muted-foreground leading-relaxed max-w-3xl space-y-6">
            <p>
              {t('farming.collective.p1')}
            </p>
            <p>
              {t('farming.collective.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Appel à participation */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              {t('farming.help.title')}
            </h2>
          </div>
          <div className="font-body text-muted-foreground leading-relaxed max-w-3xl space-y-6 mb-10">
            <p>
              {t('farming.help.p1')}
            </p>
            <p>
              {t('farming.help.p2')}
            </p>
          </div>
          <a
            href="https://t.me/hirondelles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            {t('farming.help.cta')}
          </a>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default MaraichagePage;
