import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface TelegramMessage {
  id: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
}

const NewsSection = () => {
  const [news, setNews] = useState<TelegramMessage[]>([]);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "Assets/messages.json")
      .then(res => {
        if (!res.ok) throw new Error("Impossible de charger les actualités");
        return res.json();
      })
      .then((data: TelegramMessage[]) => {
        const filteredData = data.filter(msg => msg.content && msg.content.trim() !== "");
        const sorted = [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNews(sorted.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('fr-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section id="actualites" className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
          Actualités
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-12" />

        <div className="space-y-10">
          {news.map((item) => (
            <article key={item.id} className="border-l-4 border-primary pl-6">
              {item.images.length > 0 && (
                <img
                  src={import.meta.env.BASE_URL + 'Assets/' + item.images[0]}
                  alt=""
                  className="w-full max-w-md h-48 object-cover rounded mb-4"
                  loading="lazy"
                />
              )}
              <time className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                {formatDate(item.date)}
              </time>
              <h3 className="text-xl font-display font-bold uppercase text-foreground mt-1 mb-2 tracking-tight">
                Actualité du {formatDate(item.date)}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl whitespace-pre-line">
                {item.content.slice(0, 300)}
                {item.content.length > 300 ? "..." : ""}
              </p>
              <a
                href={`https://t.me/hirondelles/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary font-body text-xs tracking-wide hover:underline"
              >
                Lire sur Telegram →
              </a>
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
