import { Link } from "react-router-dom";
import danceDayImg from "@/assets/dance-day.jpg";
import planterImg from "@/assets/planter-hirondelles.jpg";
import pontareuseImg from "@/assets/pontareuse-devant.jpg";
import greffesImg from "@/assets/greffes.jpg";

export const news = [
  {
    date: "22 février 2026",
    title: "On lance des Dance Days !",
    summary:
      "Le concept : danser dans le noir pendant une heure, sans drague, sans jugement. Juste pour le plaisir de bouger. Parfois sur une playlist, d'autres fois DJ. Prochaines dates à Béthanie et à la Maison du Concert.",
    telegramLink: "https://t.me/hirondelles/329",
    image: danceDayImg,
  },
  {
    date: "5 février 2026",
    title: "Fête des 2 ans — Save the date : 4 avril !",
    summary:
      "Une étrange nuée d'hirondelles pleines d'amour, de paillettes et de rage révolutionnaire appelle à la fête ! Le 4 avril, venez festoyer nos 2 ans à la ferme. Grande journée paillettée avec ateliers, maraîche et grosse teuf !",
    telegramLink: "https://t.me/hirondelles/325",
    image: planterImg,
  },
  {
    date: "17 janvier 2026",
    title: "Chantier chambre froide au hameau de Pontareuse",
    summary:
      "Nous prévoyons une année de maraîchage avec davantage de production, il nous faut une chambre froide ! Venez nous aider à remettre en état la cave enterrée. Jeux de société, projections et discussions au programme des soirées.",
    telegramLink: "https://t.me/hirondelles/323",
    image: pontareuseImg,
  },
  {
    date: "31 août 2025",
    title: "Soutien à Naser — Cagnotte de solidarité",
    summary:
      "Notre ami Naser a été enfermé après s'être rendu au SPoMi de Fribourg. Son incarcération a aggravé sa dépression. Une cagnotte de soutien est organisée pour lui permettre d'avoir une sécurité financière après son expulsion.",
    telegramLink: "https://t.me/hirondelles/298",
    image: null,
  },
  {
    date: "19 août 2025",
    title: "Recherche isolation et mazout — Appel à dons",
    summary:
      "On cherche à vous débarrasser de votre isolation (laine de verre, de bois ou de roche) et de votre mazout. Comme ça on pourra avoir bien chaud en hiver et organiser plein de bouffes pop, de concerts et de projections !",
    telegramLink: "https://t.me/hirondelles/292",
    image: greffesImg,
  },
];

const NewsSection = () => {
  return (
    <section id="actualites" className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
          Actualités
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-12" />

        <div className="space-y-10">
          {news.slice(0, 3).map((item, i) => (
            <article key={i} className="border-l-4 border-primary pl-6">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-w-md h-48 object-cover rounded mb-4"
                  loading="lazy"
                />
              )}
              <time className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                {item.date}
              </time>
              <h3 className="text-xl font-display font-bold uppercase text-foreground mt-1 mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
                {item.summary}
              </p>
              {item.telegramLink && (
                <a
                  href={item.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-primary font-body text-xs tracking-wide hover:underline"
                >
                  Lire sur Telegram →
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/actualites"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            Toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
