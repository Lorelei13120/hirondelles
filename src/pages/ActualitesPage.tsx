import { news } from "@/components/NewsSection";
import FooterSection from "@/components/FooterSection";

const ActualitesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            Actualités
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            Toutes les nouvelles du collectif. Retrouvez aussi nos publications en temps réel sur{" "}
            <a
              href="https://t.me/hirondelles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              notre canal Telegram
            </a>.
          </p>

          <div className="space-y-12">
            {news.map((item, i) => (
              <article key={i} className="border-l-4 border-primary pl-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-w-lg h-56 object-cover rounded mb-4"
                    loading="lazy"
                  />
                )}
                <time className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                  {item.date}
                </time>
                <h2 className="text-2xl font-display font-bold uppercase text-foreground mt-1 mb-3 tracking-tight">
                  {item.title}
                </h2>
                <p className="text-muted-foreground font-body text-base leading-relaxed max-w-3xl">
                  {item.summary}
                </p>
                {item.telegramLink && (
                  <a
                    href={item.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-primary font-body text-sm tracking-wide hover:underline"
                  >
                    Lire sur Telegram →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default ActualitesPage;
