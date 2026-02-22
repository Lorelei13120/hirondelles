import { Sprout, HandHeart, Home, Leaf, Users, ShieldCheck, Heart, Globe } from "lucide-react";

const buts = [
  {
    icon: Users,
    title: "Vie collective",
    description:
      "Réinventer les imaginaires et le quotidien. Pontareuse est un lieu de vie partagée où l'on cuisine, construit et décide ensemble.",
  },
  {
    icon: ShieldCheck,
    title: "Déconstruction & politisation",
    description:
      "Un lieu engagé contre toutes les formes de discriminations — sexisme, racisme, validisme, transphobie — à l'extérieur comme au sein du collectif.",
  },
  {
    icon: Sprout,
    title: "Expérimentation agricole",
    description:
      "Du maraîchage hors des systèmes marchands. Récolte de courges, préparation des sols, repas collectifs avec les légumes du jardin.",
  },
  {
    icon: Globe,
    title: "Accueil & solidarité",
    description:
      "Créer des liens avec les personnes requérantes d'asile en proposant un espace accueillant à l'extérieur des centres.",
  },
];

const valeurs = [
  {
    icon: Heart,
    title: "Consentement & écoute",
    description:
      "Demander avant de toucher, de donner un conseil, de parler de certains sujets. Respecter les pronoms de chaque personne.",
  },
  {
    icon: HandHeart,
    title: "Entraide & soin collectif",
    description:
      "Participer aux tâches reproductives, aux moments de soin collectif. La vie collective fonctionne quand tout le monde y participe !",
  },
  {
    icon: Leaf,
    title: "Droit à l'erreur responsable",
    description:
      "Un espace complètement safe est impossible. On favorise l'écoute, la remise en question et l'apprentissage plutôt que la punition.",
  },
  {
    icon: Home,
    title: "Lieu ouvert",
    description:
      "Le collectif est ouvert à toute personne qui souhaite s'intégrer au projet et respecte les valeurs de la charte. Sens-toi bienvenu·e !",
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

        {/* Buts du lieu */}
        <h3 className="text-2xl md:text-3xl font-display text-foreground mb-6">
          Nos objectifs
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
        <h3 className="text-2xl md:text-3xl font-display text-foreground mb-6">
          Nos valeurs
        </h3>
        <p className="font-body text-muted-foreground text-base max-w-3xl mb-10 leading-relaxed">
          Notre charte définit les comportements qu'on veut favoriser pour que 
          chaque personne se sente en sécurité sur le lieu. Pas de violence 
          physique, verbale ou psychologique. Pas de comportements oppressifs. 
          On veut un espace bienveillant et politisé.
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
