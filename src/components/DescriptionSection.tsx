import { Sprout, HandHeart, Home, Leaf } from "lucide-react";

const values = [
  {
    icon: Sprout,
    title: "Agriculture paysanne",
    description:
      "Maraîchage collectif, récolte de courges, préparation des sols. On cultive la terre dans le respect du vivant, avec des repas partagés et des légumes pour tou·tes.",
  },
  {
    icon: Home,
    title: "Occupation & réquisition",
    description:
      "Le hameau de Pontareuse à Boudry était laissé à l'abandon. Nous l'avons repris pour en faire un lieu de vie, de culture et de luttes paysannes.",
  },
  {
    icon: HandHeart,
    title: "Entraide & solidarité",
    description:
      "Chantiers participatifs, repas vegan prix libre, accueil de personnes migrantes, soutien aux copaines en procès. On construit ensemble.",
  },
  {
    icon: Leaf,
    title: "Luttes paysannes",
    description:
      "Contre le fracking, l'accaparement des terres et les violences policières. Solidarité avec les luttes locales et internationales.",
  },
];

const DescriptionSection = () => {
  return (
    <section id="description" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-3">
          Qui sommes-nous ?
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-8" />
        <p className="font-body text-muted-foreground text-lg max-w-3xl mb-16 leading-relaxed">
          Les Hirondelles, c'est un collectif installé au hameau agricole de 
          Pontareuse à Boudry (NE). Depuis deux ans, on fait renaître cette 
          ferme abandonnée : maraîchage, bouffes pop, concerts, projections, 
          chantiers collectifs et fêtes pailletées. La terre à celleux qui la travaillent !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="border border-border p-8 rounded hover:border-primary transition-colors group bg-card"
            >
              <v.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display text-foreground mb-3">{v.title}</h3>
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
