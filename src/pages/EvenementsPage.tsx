import { useEffect, useState } from "react";
import FooterSection from "@/components/FooterSection";
import { useLanguage } from "@/lib/LanguageContext";

interface TelegramMessage {
  id: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
}

interface ParsedEvent {
  id: string;
  date: string;
  title: string;
  eventDate: string;
  location: string;
  description: string;
  image: string | null;
}

function parseEvent(msg: TelegramMessage): ParsedEvent {
  const BASE_URL = import.meta.env.BASE_URL;
  const lines = msg.content.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  const title = lines[0]?.replace(/#\S+/g, "").trim() ?? "";
  let eventDate = "";
  let location = "";
  const descLines: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("📅")) {
      eventDate = line.replace(/^📅\s*/, "").trim();
    } else if (line.startsWith("📍")) {
      location = line.replace(/^📍\s*/, "").trim();
    } else {
      descLines.push(line);
    }
  }

  const image = msg.images.length > 0 ? BASE_URL + "Assets/" + msg.images[0] : null;

  return {
    id: msg.id,
    date: msg.date,
    title,
    eventDate,
    location,
    description: descLines.join(" "),
    image,
  };
}

const EvenementsPage = () => {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "Assets/messages.json")
      .then(res => {
        if (!res.ok) throw new Error(t('events.error'));
        return res.json();
      })
      .then((data: TelegramMessage[]) => {
        const filtered = data
          .filter(msg => msg.tags.includes("événement"))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(parseEvent);
        setEvents(filtered);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [t]);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            {t('events.title')}
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            {t('events.subtitle')}{" "}
            <a
              href="https://t.me/hirondelles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              notre canal Telegram
            </a>.
          </p>

          {loading && (
            <p className="font-body text-muted-foreground">{t('events.loading')}</p>
          )}

          {error && (
            <p className="font-body text-destructive">{error}</p>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="font-body text-muted-foreground">{t('events.none')}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                id={event.id}
                className="bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                {event.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 text-primary font-display font-bold text-xl px-3 py-1 rounded">
                      {event.eventDate}
                    </div>
                    {event.location && (
                      <span className="text-muted-foreground font-body text-[10px] tracking-widest uppercase">
                        📍 {event.location}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
                    {event.title}
                  </h2>
                  
                  <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">
                    {event.description}
                  </p>

                  <a
                    href={`https://t.me/hirondelles/${event.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-primary font-display font-bold text-[10px] tracking-widest uppercase hover:text-primary/80 transition-colors"
                  >
                    Telegram →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default EvenementsPage;
