import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

const EventsSection = () => {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
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
        setEvents(filtered.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, [t]);

  return (
    <section id="evenements" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
          {t('section.events.title')}
        </h2>
        <div className="h-0.5 w-16 bg-primary mb-12" />

        <div className="space-y-0">
          {events.map((event) => (
            <div
              key={event.id}
              className="border-t border-border py-8 flex flex-col md:flex-row gap-4 md:items-start hover:bg-card/50 transition-colors px-4 -mx-4 rounded"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full md:w-40 h-auto max-h-40 object-contain rounded shrink-0 bg-muted/30"
                  loading="lazy"
                />
              )}
              <div className="font-display font-bold text-primary text-2xl md:text-3xl w-32 shrink-0">
                {event.eventDate || t('section.events.upcoming')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold uppercase text-foreground mb-1 tracking-tight">{event.title}</h3>
                {event.location && (
                  <p className="text-muted-foreground font-body text-xs tracking-wide mb-2">
                    📍 {event.location}
                  </p>
                )}
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          {events.length > 0 && <div className="border-t border-border" />}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/evenements"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            {t('section.events.all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
