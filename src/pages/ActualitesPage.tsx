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

const ActualitesPage = () => {
  const [messages, setMessages] = useState<TelegramMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'Assets/messages.json')
      .then(res => {
        if (!res.ok) throw new Error(t('news.error'));
        return res.json();
      })
      .then((data: TelegramMessage[]) => {
        // Filtrer les messages sans texte ou qui sont uniquement des événements, et trier du plus récent au plus ancien
        const filteredData = data.filter(msg => {
          const hasText = msg.content && msg.content.trim() !== "";
          const isEventOnly = msg.tags.includes("événement") && !msg.tags.includes("actualité");
          return hasText && !isEventOnly;
        });
        const sorted = [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMessages(sorted);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [t]);

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString(language === 'fr' ? 'fr-CH' : 'de-DE', {
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
            {t('news.title')}
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            {t('news.subtitle')}{" "}
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
            <p className="font-body text-muted-foreground">{t('news.loading')}</p>
          )}

          {error && (
            <p className="font-body text-destructive">{error}</p>
          )}

          {!loading && !error && messages.length === 0 && (
            <p className="font-body text-muted-foreground">{t('news.none')}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {messages.map((msg) => (
              <article 
                key={msg.id} 
                id={msg.id} 
                className="bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                {msg.images.length > 0 && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={import.meta.env.BASE_URL + 'Assets/' + msg.images[0]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <time className="font-body text-[10px] text-muted-foreground tracking-widest uppercase mb-3 block">
                    {formatDate(msg.date)}
                  </time>
                  <p className="text-foreground font-body text-sm leading-relaxed whitespace-pre-line flex-1">
                    {msg.content}
                  </p>
                  
                  {msg.images.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {msg.images.slice(1).map((img, i) => (
                        <img
                          key={i}
                          src={import.meta.env.BASE_URL + 'Assets/' + img}
                          alt=""
                          className="h-16 w-auto object-cover rounded shadow-sm"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}

                  <a
                    href={`https://t.me/hirondelles/${msg.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-primary font-display font-bold text-[10px] tracking-widest uppercase hover:text-primary/80 transition-colors"
                  >
                    {t('news.read_more')}
                  </a>
                </div>
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
