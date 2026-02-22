const events = [
  {
    date: "MAR 01",
    title: "Community Assembly",
    location: "People's Hall, Downtown",
    description: "Open assembly to discuss local organizing strategies and upcoming actions.",
  },
  {
    date: "MAR 08",
    title: "Mutual Aid Distribution",
    location: "Community Garden, East Side",
    description: "Weekly food and supply distribution. Volunteers welcome from 8AM.",
  },
  {
    date: "MAR 15",
    title: "Reading Group: Kropotkin",
    location: "Free Library, 3rd Floor",
    description: "Discussing 'Mutual Aid: A Factor of Evolution'. All are welcome, no prior reading required.",
  },
  {
    date: "MAR 22",
    title: "Direct Action Training",
    location: "Union Hall",
    description: "Know your rights workshop and nonviolent direct action training.",
  },
];

const EventsSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary text-secondary-foreground">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display mb-4">
          UPCOMING <span className="text-primary">EVENTS</span>
        </h2>
        <div className="h-1 w-24 bg-primary mb-16" />

        <div className="space-y-0">
          {events.map((event, i) => (
            <div
              key={i}
              className="border-t-2 border-secondary-foreground/20 py-8 flex flex-col md:flex-row gap-6 md:items-start hover:bg-secondary-foreground/5 transition-colors px-4 -mx-4"
            >
              <div className="font-display text-primary text-3xl md:text-4xl w-36 shrink-0">
                {event.date}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display mb-1">{event.title}</h3>
                <p className="text-secondary-foreground/50 font-body text-xs tracking-wider uppercase mb-2">
                  {event.location}
                </p>
                <p className="text-secondary-foreground/70 font-body text-sm">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t-2 border-secondary-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
