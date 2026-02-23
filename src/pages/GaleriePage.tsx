import pontareuse from "@/assets/pontareuse-devant.jpg";
import planter from "@/assets/planter-hirondelles.jpg";
import greffes from "@/assets/greffes.jpg";
import danceDay from "@/assets/dance-day.jpg";
import FooterSection from "@/components/FooterSection";

const photos = [
  { src: pontareuse, alt: "Le hameau de Pontareuse" },
  { src: planter, alt: "Plantations au jardin" },
  { src: greffes, alt: "Atelier de greffes" },
  { src: danceDay, alt: "Dance Day à Pontareuse" },
];

const GaleriePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            Galerie
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <p className="font-body text-muted-foreground mb-16 max-w-2xl">
            Photos de la vie au hameau de Pontareuse. D'autres images arrivent bientôt !
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((photo, i) => (
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
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default GaleriePage;
