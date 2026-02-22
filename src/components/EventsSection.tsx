import { Link } from "react-router-dom";

export const events = [
  {
    date: "23 FÉV",
    title: "Dance Day à Béthanie",
    location: "Clos-de-Serrières 25, Neuchâtel",
    description:
      "Danser dans le noir pendant une heure, sans drague, sans jugement. Juste pour le plaisir de bouger ! Prix libre. 18h30.",
  },
  {
    date: "9 MARS",
    title: "Dance Day à la Maison du Concert",
    location: "Maison du Concert, Neuchâtel",
    description:
      "Même concept, autre lieu ! Viens expérimenter tes mouvements dans le noir. 18h15.",
  },
  {
    date: "23 MARS",
    title: "Dance Day à Béthanie",
    location: "Clos-de-Serrières 25, Neuchâtel",
    description:
      "Le retour du Dance Day ! Une heure de danse libre dans le noir. Prix libre. 18h30.",
  },
  {
    date: "4 AVR",
    title: "🎉 Fête des 2 ans de la ferme !",
    location: "Hameau de Pontareuse, Boudry",
    description:
      "Grande journée paillettée pour fêter nos 2 ans ! Ateliers, maraîche participative et grosse teuf. Programme complet à venir !",
  },
  {
    date: "6 AVR",
    title: "Dance Day à la Maison du Concert",
    location: "Maison du Concert, Neuchâtel",
    description:
      "Dance Day mensuel. Danser dans le noir, sans pression. 18h15.",
  },
  {
    date: "20 AVR",
    title: "Dance Day à Béthanie",
    location: "Clos-de-Serrières 25, Neuchâtel",
    description:
      "Dance Day mensuel à Béthanie. Prix libre. 18h30.",
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
          {events.slice(0, 4).map((event, i) => (
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

        <div className="mt-12 text-center">
          <Link
            to="/evenements"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            Tous les événements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
