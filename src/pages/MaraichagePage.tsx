import { Sprout, Users, Calendar, ImageIcon } from "lucide-react";
import planterImg from "@/assets/planter-hirondelles.jpg";
import greffesImg from "@/assets/greffes.jpg";
import FooterSection from "@/components/FooterSection";

const MaraichagePage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-3 tracking-tight">
            Maraîchage
          </h1>
          <div className="h-0.5 w-16 bg-primary mb-8" />
          <p className="font-body text-muted-foreground text-lg max-w-3xl leading-relaxed">
            A Pontareuse, on cultive la terre collectivement, en dehors des logiques marchandes. 
            Retrouvez-nous au marché de Boudry chaque dernier samedi du mois ! On vend des plantons et des légumes prix libre. 
            C'est un projet d'apprentissage, d'expérimentation et de soin de la terre.
          </p>
        </div>
      </section>

      {/* Le projet */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sprout className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              Le projet
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                Depuis l'installation du collectif, on a remis en culture les parcelles autour du hameau. 
                On travaille les sols à la main, sans machines lourdes, en essayant des techniques de 
                permaculture et de maraîchage sur sol vivant.
              </p>
              <p>
                On cultive des <strong className="text-foreground">courges, courgettes, tomates, haricots, 
                pommes de terre, salades, herbes aromatiques</strong> et plein d'autres légumes de saison. 
                Les récoltes servent aux repas collectifs du hameau et aux bouffes populaires qu'on organise.
              </p>
              <p>
                On a aussi un projet de <strong className="text-foreground">greffes d'arbres fruitiers</strong> pour 
                installer un verger à long terme. Pommiers, poiriers, pruniers — on pense à demain.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src={planterImg}
                alt="Plantations au hameau de Pontareuse"
                className="w-full h-64 object-cover rounded"
                loading="lazy"
              />
              <img
                src={greffesImg}
                alt="Atelier de greffes d'arbres fruitiers"
                className="w-full h-64 object-cover rounded"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement collectif */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              Fonctionnement collectif
            </h2>
          </div>
          <div className="font-body text-muted-foreground leading-relaxed max-w-3xl space-y-6">
            <p>
              Le maraîchage à Pontareuse, c'est un travail collectif. Pas de chef·fe, pas de hiérarchie : 
              on s'organise ensemble, on décide ensemble, on bosse ensemble. Chacun·e apporte ce qu'iel peut, 
              selon ses envies et ses capacités.
            </p>
            <p>
              Les décisions concernant les cultures, les achats de semences et l'organisation des chantiers 
              se prennent lors des réunions du collectif, au consensus.
            </p>
          </div>
        </div>
      </section>

      {/* Appel à participation */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              Viens nous aider !
            </h2>
          </div>
          <div className="font-body text-muted-foreground leading-relaxed max-w-3xl space-y-6 mb-10">
            <p>
              On organise régulièrement des <strong className="text-foreground">chantiers participatifs</strong> et 
              des <strong className="text-foreground">journées maraîchage</strong> ouvertes à toustes. 
              Pas besoin d'expérience — juste de la motivation et des vêtements qui ne craignent pas la boue !
            </p>
            <p>
              Pour être au courant des prochaines dates, le mieux c'est de rejoindre notre canal Telegram 
              où on annonce tout en temps réel.
            </p>
          </div>
          <a
            href="https://t.me/hirondelles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-body font-semibold text-sm tracking-wide rounded hover:bg-primary/80 transition-colors"
          >
            Rejoindre le Telegram
          </a>
        </div>
      </section>

      {/* Photos placeholder */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-foreground tracking-tight">
              Photos du jardin
            </h2>
          </div>
          <p className="font-body text-muted-foreground mb-10">
            D'autres photos arrivent bientôt ! En attendant, voici un aperçu du terrain.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img src={planterImg} alt="Plantations" className="w-full h-48 object-cover rounded" loading="lazy" />
            <img src={greffesImg} alt="Greffes" className="w-full h-48 object-cover rounded" loading="lazy" />
            <div className="w-full h-48 rounded bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-body text-sm">À venir</span>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default MaraichagePage;
