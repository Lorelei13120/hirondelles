import { useEffect, useState } from "react";
import FooterSection from "@/components/FooterSection";

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

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "Assets/messages.json")
      .then(res => {
        if (!res.ok) throw new Error("Impossible de charger les événements");
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
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            Événements
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            Les prochains événements. Pour ne rien rater, suivez{" "}
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
            <p className="font-body text-muted-foreground">Chargement des événements…</p>
          )}

          {error && (
            <p className="font-body text-destructive">{error}</p>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="font-body text-muted-foreground">Aucun événement à venir pour l'instant.</p>
          )}

          <div className="space-y-0">
            {events.map((event) => (
              <div
                key={event.id}
                className="border-t border-border py-10 flex flex-col md:flex-row gap-6 md:items-start hover:bg-card/50 transition-colors px-4 -mx-4 rounded"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-48 h-32 object-cover rounded shrink-0"
                    loading="lazy"
                  />
                )}
                <div className="font-display font-bold text-primary text-3xl md:text-4xl w-36 shrink-0">
                  {event.eventDate}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2 tracking-tight">
                    {event.title}
                  </h2>
                  {event.location && (
                    <p className="text-muted-foreground font-body text-xs tracking-wide mb-3">
                      📍 {event.location}
                    </p>
                  )}
                  <p className="text-muted-foreground font-body text-base leading-relaxed max-w-3xl">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
            {events.length > 0 && <div className="border-t border-border" />}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default EvenementsPage;
