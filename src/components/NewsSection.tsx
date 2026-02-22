const news = [
  {
    date: "18 février 2026",
    title: "Victoire : le tribunal reconnaît notre droit d'usage",
    summary:
      "Après 14 mois de procédure, le tribunal a statué en notre faveur. La ferme reste un lieu de vie et de culture paysanne. Merci à tou·tes pour votre soutien !",
  },
  {
    date: "5 février 2026",
    title: "Appel à semences paysannes",
    summary:
      "Nous cherchons des variétés anciennes de tomates, courges et blés pour la saison à venir. Si vous avez des graines à partager, contactez-nous sur Telegram.",
  },
  {
    date: "20 janvier 2026",
    title: "Communiqué : solidarité avec les Soulèvements de la Terre",
    summary:
      "Le collectif Les Hirondelles réaffirme son soutien total aux mouvements de défense des terres et de l'eau. La terre se défend, nous la défendons.",
  },
];

const NewsSection = () => {
  return (
    <section id="actualites" className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-3">
          Actualités
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-12" />

        <div className="space-y-10">
          {news.map((item, i) => (
            <article
              key={i}
              className="border-l-4 border-primary pl-6"
            >
              <time className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                {item.date}
              </time>
              <h3 className="text-xl font-display text-foreground mt-1 mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
