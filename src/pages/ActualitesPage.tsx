import { Link } from "react-router-dom";
import { news } from "@/components/NewsSection";
import logo from "@/assets/logo-hirondelles.png";

const ActualitesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-foreground text-primary-foreground py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Les Hirondelles" className="w-10 h-10" />
            <span className="font-display font-bold text-lg uppercase tracking-tight">Les Hirondelles</span>
          </Link>
          <nav className="flex gap-6 font-body text-sm text-primary-foreground/70">
            <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
            <Link to="/evenements" className="hover:text-accent transition-colors">Événements</Link>
          </nav>
        </div>
      </header>

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
    </main>
  );
};

export default ActualitesPage;
