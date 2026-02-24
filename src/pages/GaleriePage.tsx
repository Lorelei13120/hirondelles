import { useEffect, useState } from "react";
import pontareuse from "@/assets/pontareuse-devant.jpg";
import planter from "@/assets/planter-hirondelles.jpg";
import greffes from "@/assets/greffes.jpg";
import danceDay from "@/assets/dance-day.jpg";
import FooterSection from "@/components/FooterSection";

interface TelegramMessage {
  id: string;
  date: string;
  content: string;
  images: string[];
}

const staticPhotos = [
  { src: pontareuse, alt: "Le hameau de Pontareuse" },
  { src: planter, alt: "Plantations au jardin" },
  { src: greffes, alt: "Atelier de greffes" },
  { src: danceDay, alt: "Dance Day à Pontareuse" },
];

const GaleriePage = () => {
  const [telegramPhotos, setTelegramPhotos] = useState<{ src: string; alt: string }[]>([]);
  const [telegramAffiches, setTelegramAffiches] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'Assets/messages.json')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((data: TelegramMessage[]) => {
        const photos: { src: string; alt: string }[] = [];
        const affiches: { src: string; alt: string }[] = [];
        for (const msg of data) {
          for (const img of msg.images) {
            const item = {
              src: import.meta.env.BASE_URL + 'Assets/' + img,
              alt: msg.content ? msg.content.slice(0, 60) : 'Image Telegram',
            };
            if (img.includes('affiches/')) {
              affiches.push(item);
            } else {
              photos.push(item);
            }
          }
        }
        setTelegramPhotos(photos);
        setTelegramAffiches(affiches);
      })
      .catch(() => {
        // Silencieux si le fichier n'est pas encore disponible
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            Galerie
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            Photos de la vie au hameau de Pontareuse.
          </p>

          {/* Photos statiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staticPhotos.map((photo, i) => (
              <div key={i} className="overflow-hidden rounded group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <p className="font-body text-sm text-muted-foreground mt-2">{photo.alt}</p>
              </div>
            ))}
          </div>

          {/* Section Photos Telegram */}
          {telegramPhotos.length > 0 && (
            <>
              <h2 className="text-2xl font-display font-bold uppercase text-foreground mt-20 mb-8 tracking-tight">
                Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {telegramPhotos.map((photo, i) => (
                  <div key={i} className="overflow-hidden rounded group">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section Affiches Telegram */}
          {telegramAffiches.length > 0 && (
            <>
              <h2 className="text-2xl font-display font-bold uppercase text-foreground mt-20 mb-8 tracking-tight">
                Affiches
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {telegramAffiches.map((affiche, i) => (
                  <div key={i} className="overflow-hidden rounded group">
                    <img
                      src={affiche.src}
                      alt={affiche.alt}
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                      loading="lazy"
                    />
                  </div>
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
