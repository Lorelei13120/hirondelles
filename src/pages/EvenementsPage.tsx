import { Link } from "react-router-dom";
import { events } from "@/components/EventsSection";
import logo from "@/assets/logo-hirondelles.png";

const EvenementsPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-foreground text-primary-foreground py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Les Hirondelles" className="w-10 h-10" />
            <span className="font-display text-lg italic">Les Hirondelles</span>
          </Link>
          <nav className="flex gap-6 font-body text-sm text-primary-foreground/70">
            <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
            <Link to="/actualites" className="hover:text-accent transition-colors">Actualités</Link>
          </nav>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display text-foreground mb-3">
            Événements
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            Les prochains rendez-vous du collectif. Pour ne rien rater, suivez{" "}
            <a
              href="https://t.me/hirondelles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              notre canal Telegram
            </a>.
          </p>

          <div className="space-y-0">
            {events.map((event, i) => (
              <div
                key={i}
                className="border-t border-border py-10 flex flex-col md:flex-row gap-6 md:items-start hover:bg-card/50 transition-colors px-4 -mx-4 rounded"
              >
                <div className="font-display text-primary text-3xl md:text-4xl w-36 shrink-0">
                  {event.date}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display text-foreground mb-2">{event.title}</h2>
                  <p className="text-muted-foreground font-body text-xs tracking-wide mb-3">
                    📍 {event.location}
                  </p>
                  <p className="text-muted-foreground font-body text-base leading-relaxed max-w-3xl">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvenementsPage;
