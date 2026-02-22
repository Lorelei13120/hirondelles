import { Sprout, HandHeart, Home, Leaf } from "lucide-react";

const values = [
  {
    icon: Sprout,
    title: "Agriculture paysanne",
    description:
      "Nous cultivons la terre dans le respect du vivant, loin de l'agro-industrie. Maraîchage, semences libres et savoir-faire partagés.",
  },
  {
    icon: Home,
    title: "Occupation & réquisition",
    description:
      "Cette ferme était laissée à l'abandon. Nous l'avons reprise pour la faire vivre, parce que la terre appartient à celleux qui la travaillent.",
  },
  {
    icon: HandHeart,
    title: "Entraide & solidarité",
    description:
      "Chantiers collectifs, partage de récoltes, accueil inconditionnel. Ici, on construit ensemble un autre rapport au monde.",
  },
  {
    icon: Leaf,
    title: "Luttes paysannes",
    description:
      "Contre l'accaparement des terres, les méga-bassines et l'artificialisation. Pour une agriculture nourricière et autonome.",
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
          Les Hirondelles, c'est un collectif de paysan·nes, militant·es et 
          habitant·es qui ont investi une ferme abandonnée pour y faire renaître 
          une agriculture vivante et solidaire. Nous croyons que la terre ne 
          devrait jamais être une marchandise.
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
