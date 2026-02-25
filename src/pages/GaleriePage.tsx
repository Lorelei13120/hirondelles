import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useLanguage } from "@/lib/LanguageContext";

interface TelegramMessage {
  id: string;
  date: string;
  content: string;
  images: string[];
  tags: string[];
}

interface GalleryItem {
  src: string;
  alt: string;
  msgId: string;
  type: 'news' | 'event';
}

const GaleriePage = () => {
  const [telegramPhotos, setTelegramPhotos] = useState<GalleryItem[]>([]);
  const [telegramAffiches, setTelegramAffiches] = useState<GalleryItem[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'Assets/messages.json')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((data: TelegramMessage[]) => {
        const photos: GalleryItem[] = [];
        const affiches: GalleryItem[] = [];
        for (const msg of data) {
          const type = msg.tags.includes('événement') ? 'event' : 'news';
          for (const img of msg.images) {
            const item: GalleryItem = {
              src: import.meta.env.BASE_URL + 'Assets/' + img,
              alt: msg.content ? msg.content.slice(0, 60) : 'Image Telegram',
              msgId: msg.id,
              type: type,
            };
            if (img.includes('affiches/')) {
              affiches.push(item);
            } else {
              photos.push(item);
            }
          }
        }
        setTelegramPhotos(photos.reverse());
        setTelegramAffiches(affiches.reverse());
      })
      .catch(() => {
        // Silencieux si le fichier n'est pas encore disponible
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-8 tracking-tight">
            {t('nav.gallery')}
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-12" />

          {/* Section Photos Telegram */}
          {telegramPhotos.length > 0 && (
            <>
              <h2 className="text-2xl font-display font-bold uppercase text-foreground mt-20 mb-8 tracking-tight">
                {t('section.gallery.photos')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {telegramPhotos.map((photo, i) => (
                  <Link 
                    key={i} 
                    to={photo.type === 'event' ? `/evenements#${photo.msgId}` : `/actualites#${photo.msgId}`}
                    className="overflow-hidden rounded group relative block"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-primary-foreground font-display font-bold uppercase text-xs tracking-widest bg-primary/80 px-4 py-2 rounded">
                        {photo.type === 'event' ? t('nav.events') : t('nav.news')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Section Affiches Telegram */}
          {telegramAffiches.length > 0 && (
            <>
              <h2 className="text-2xl font-display font-bold uppercase text-foreground mt-20 mb-8 tracking-tight">
                {t('section.gallery.posters')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {telegramAffiches.map((affiche, i) => (
                  <Link 
                    key={i} 
                    to={affiche.type === 'event' ? `/evenements#${affiche.msgId}` : `/actualites#${affiche.msgId}`}
                    className="overflow-hidden rounded group relative block"
                  >
                    <img
                      src={affiche.src}
                      alt={affiche.alt}
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-primary-foreground font-display font-bold uppercase text-xs tracking-widest bg-primary/80 px-4 py-2 rounded">
                        {affiche.type === 'event' ? t('nav.events') : t('nav.news')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default GaleriePage;
