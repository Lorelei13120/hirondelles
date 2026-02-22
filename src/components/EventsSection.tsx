const events = [
  {
    date: "1 MARS",
    title: "Chantier collectif — toiture de la grange",
    location: "La ferme des Hirondelles",
    description: "On a besoin de bras pour retaper la toiture. Repas partagé le midi, amenez vos outils si vous en avez !",
  },
  {
    date: "8 MARS",
    title: "Journée des droits des femmes à la ferme",
    location: "La ferme des Hirondelles",
    description: "Ateliers, discussions et projection autour des femmes dans les luttes paysannes. Garderie sur place.",
  },
  {
    date: "15 MARS",
    title: "Distribution de paniers solidaires",
    location: "Marché de la Place du Village",
    description: "Légumes de saison à prix libre. Tout le monde mange, personne ne paye plus que ce qu'iel peut.",
  },
  {
    date: "22 MARS",
    title: "Projection-débat : « Les Communaux »",
    location: "Salle polyvalente, centre-bourg",
    description: "Documentaire sur les communs et la propriété foncière, suivi d'une discussion ouverte.",
  },
];

const EventsSection = () => {
  return (
    <section id="evenements" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-3">
          Événements
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-12" />

        <div className="space-y-0">
          {events.map((event, i) => (
            <div
              key={i}
              className="border-t border-border py-8 flex flex-col md:flex-row gap-4 md:items-start hover:bg-card/50 transition-colors px-4 -mx-4 rounded"
            >
              <div className="font-display text-primary text-2xl md:text-3xl w-32 shrink-0">
                {event.date}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display text-foreground mb-1">{event.title}</h3>
                <p className="text-muted-foreground font-body text-xs tracking-wide mb-2">
                  📍 {event.location}
                </p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
