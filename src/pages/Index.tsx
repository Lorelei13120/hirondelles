import HeroSection from "@/components/HeroSection";
import DescriptionSection from "@/components/DescriptionSection";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import FooterSection from "@/components/FooterSection";

//PROMPTS ET TRUCS A FAIRE 24/04/25
// //1) Si les messages dans "Actualités" ne contienne pas de texte, mais simplement une image, alors enlever cette entrée et simplement laisser l'image dans la Galerie photo.
//3) Est-ce qu'il y a bien un id du dernier message sauvegardé quelpart, pour que le bot sache bien à partir de quel message fetch lors du lancement du script avec Github Actions ?
//2) Les images ne s'affichent pas correctement dans les sections "actualités" et "événements"
//3) Dans la gallerie, affiche les photos les plus récentes en premier dans la partie "photos" et les affiches les plus récentes en premier dans la partie "Affiches"
//4) Il y a dans "Assets" les 4 images suivantes : "dance-day.jpg", "pontareuse-devant.jpg", "planter-hirondelles.jpg", "greffe.jpg".
//J'aimerais les supprimer et donc enlever dans tout le projet les appels qui y sont fait. En effet, je n'ai plus besoin de ces images
//car toutes les images sont enregistrées dans public/Assets désormais.
//5) Mets bien à jour les pages "Evenements" et "Actualités"

const Index = () => {
  return (
    <main>
      <HeroSection />
      <DescriptionSection />
      <NewsSection />
      <EventsSection />
      <FooterSection />
    </main>
  );
};

export default Index;
