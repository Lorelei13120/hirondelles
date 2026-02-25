import { useEffect, useState } from "react";
import FooterSection from "@/components/FooterSection";

interface TelegramMessage {
  id: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
}

const ActualitesPage = () => {
  const [messages, setMessages] = useState<TelegramMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'Assets/messages.json')
      .then(res => {
        if (!res.ok) throw new Error('Impossible de charger les actualités');
        return res.json();
      })
      .then((data: TelegramMessage[]) => {
        // Filtrer les messages sans texte et trier du plus récent au plus ancien
        const filteredData = data.filter(msg => msg.content && msg.content.trim() !== "");
        const sorted = [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMessages(sorted);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('fr-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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

          {loading && (
            <p className="font-body text-muted-foreground">Chargement des actualités…</p>
          )}

          {error && (
            <p className="font-body text-destructive">{error}</p>
          )}

          {!loading && !error && messages.length === 0 && (
            <p className="font-body text-muted-foreground">Aucune actualité pour l'instant.</p>
          )}

          <div className="space-y-12">
            {messages.map((msg) => (
              <article key={msg.id} className="border-l-4 border-primary pl-6">
                {msg.images.length > 0 && (
                  <img
                    src={import.meta.env.BASE_URL + 'Assets/' + msg.images[0]}
                    alt=""
                    className="w-full max-w-lg h-56 object-cover rounded mb-4"
                    loading="lazy"
                  />
                )}
                <time className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                  {formatDate(msg.date)}
                </time>
                <p className="text-muted-foreground font-body text-base leading-relaxed max-w-3xl mt-2 whitespace-pre-line">
                  {msg.content}
                </p>
                {msg.images.length > 1 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={import.meta.env.BASE_URL + 'Assets/' + img}
                        alt=""
                        className="h-32 w-auto object-cover rounded"
                        loading="lazy"
                      />
                    ))}
                  </div>
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
