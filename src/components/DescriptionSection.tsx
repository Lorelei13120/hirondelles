import { Sprout, HandHeart, Home, Leaf, Users, ShieldCheck, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const DescriptionSection = () => {
  const { t } = useLanguage();

  const buts = [
    {
      icon: Users,
      title: t('desc.goals.1.t'),
      description: t('desc.goals.1.d'),
    },
    {
      icon: ShieldCheck,
      title: t('desc.goals.2.t'),
      description: t('desc.goals.2.d'),
    },
    {
      icon: Sprout,
      title: t('desc.goals.3.t'),
      description: t('desc.goals.3.d'),
    },
    {
      icon: Globe,
      title: t('desc.goals.4.t'),
      description: t('desc.goals.4.d'),
    },
  ];

  const valeurs = [
    {
      icon: Heart,
      title: t('desc.values.1.t'),
      description: t('desc.values.1.d'),
    },
    {
      icon: HandHeart,
      title: t('desc.values.2.t'),
      description: t('desc.values.2.d'),
    },
    {
      icon: Leaf,
      title: t('desc.values.3.t'),
      description: t('desc.values.3.d'),
    },
    {
      icon: Home,
      title: t('desc.values.4.t'),
      description: t('desc.values.4.d'),
    },
  ];

  return (
    <section id="description" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
          {t('nav.home')}
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-8" />
        <p className="font-body text-muted-foreground text-lg max-w-3xl mb-16 leading-relaxed">
          {t('desc.intro')}
        </p>

        {/* Buts du lieu */}
        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground mb-6 tracking-tight">
          {t('desc.goals.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {buts.map((v) => (
            <div
              key={v.title}
              className="border border-border p-8 rounded hover:border-primary transition-colors group bg-card"
            >
              <v.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-display text-foreground mb-3">{v.title}</h4>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* Valeurs / Charte */}
        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground mb-6 tracking-tight">
          {t('desc.values.title')}
        </h3>
        <p className="font-body text-muted-foreground text-base max-w-3xl mb-10 leading-relaxed">
          {t('desc.values.intro')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valeurs.map((v) => (
            <div
              key={v.title}
              className="border border-border p-8 rounded hover:border-primary transition-colors group bg-card"
            >
              <v.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-display text-foreground mb-3">{v.title}</h4>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
