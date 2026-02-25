import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'de';

interface Translations {
  [key: string]: {
    fr: string;
    de: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.home': { fr: 'Qui sommes-nous', de: 'Über uns' },
  'nav.news': { fr: 'Actualités', de: 'Neuigkeiten' },
  'nav.events': { fr: 'Événements', de: 'Veranstaltungen' },
  'nav.farming': { fr: 'Maraîchage', de: 'Gemüsebau' },
  'nav.gallery': { fr: 'Galerie', de: 'Galerie' },
  
  // Hero Section
  'hero.title': { fr: 'La terre à celleux qui la cultivent', de: 'Das Land denen, die es bebauen' },
  'hero.subtitle': { fr: 'Vive les topis, le bissap et les poêles à bois', de: 'Lang lebe Topinambur, Bissap und Holzöfen' },
  'hero.cta': { fr: 'Qui sommes-nous ?', de: 'Über uns ?' },

  // Sections Common
  'section.news.title': { fr: 'Actualités', de: 'Neuigkeiten' },
  'section.news.all': { fr: 'Toutes les actualités', de: 'Alle Neuigkeiten' },
  'section.events.title': { fr: 'Événements', de: 'Veranstaltungen' },
  'section.events.all': { fr: 'Tous les événements', de: 'Alle Veranstaltungen' },
  'section.events.upcoming': { fr: 'À venir', de: 'Demnächst' },
  'section.gallery.title': { fr: 'Galerie', de: 'Galerie' },
  'section.gallery.subtitle': { fr: 'Photos de la vie à Pontareuse.', de: 'Fotos vom Leben in Pontareuse.' },
  'section.gallery.photos': { fr: 'Photos', de: 'Fotos' },
  'section.gallery.posters': { fr: 'Affiches', de: 'Plakate' },

  // Maraichage Page
  'farming.title': { fr: 'Maraîchage', de: 'Gemüsebau' },
  'farming.intro': { fr: 'A Pontareuse, on cultive la terre collectivement, en dehors des logiques marchandes. Retrouvez-nous au marché de Boudry chaque dernier samedi du mois ! On vend des plantons et des légumes prix libre. C\'est un projet d\'apprentissage, d\'expérimentation et de soin de la terre.', de: 'In Pontareuse bewirtschaften wir das Land kollektiv, außerhalb der Marktlogik. Besuchen Sie uns auf dem Markt von Boudry an jedem letzten Samstag im Monat! Wir verkaufen Setzlinge und Gemüse auf Spendenbasis (prix libre). Es ist ein Projekt des Lernens, Experimentierens und der Pflege der Erde.' },
  'farming.project.title': { fr: 'Le projet', de: 'Das Projekt' },
  'farming.project.p1': { fr: 'Depuis l\'installation du collectif, on a remis en culture les parcelles autour du hameau. On travaille les sols à la main, sans machines lourdes, en essayant des techniques de permaculture et de maraîchage sur sol vivant.', de: 'Seit der Gründung des Kollektivs haben wir die Parzellen rund um den Weiler wieder kultiviert. Wir bearbeiten den Boden von Hand, ohne schwere Maschinen, und probieren Techniken der Permakultur und des Gemüsebaus auf lebendigem Boden aus.' },
  'farming.project.p2': { fr: 'On cultive des courges, courgettes, tomates, haricots, pommes de terre, salades, herbes aromatiques et plein d\'autres légumes de saison. Les récoltes servent aux repas collectifs du hameau et aux bouffes populaires qu\'on organise.', de: 'Wir bauen Kürbisse, Zucchini, Tomaten, Bohnen, Kartoffeln, Salate, Kräuter und viele andere saisonale Gemüse an. Die Ernten werden für die kollektiven Mahlzeiten des Weilers und die von uns organisierten Volksküchen (bouffes populaires) verwendet.' },
  'farming.project.p3': { fr: 'On a aussi un projet de greffes d\'arbres fruitiers pour installer un verger à long terme. Pommiers, poiriers, pruniers — on pense à demain.', de: 'Wir haben auch ein Projekt zur Veredelung von Obstbäumen, um langfristig einen Obstgarten anzulegen. Apfel-, Birnen-, Pflaumenbäume – wir denken an morgen.' },
  'farming.collective.title': { fr: 'Fonctionnement collectif', de: 'Kollektive Arbeitsweise' },
  'farming.collective.p1': { fr: 'Le maraîchage à Pontareuse, c\'est un travail collectif. Pas de chef·fe, pas de hiérarchie : on s\'organise ensemble, on décide ensemble, on bosse ensemble. Chacun·e apporte ce qu\'iel peut, selon ses envies et ses capacités.', de: 'Der Gemüsebau in Pontareuse ist eine kollektive Arbeit. Keine Chefs, keine Hierarchie: Wir organisieren uns gemeinsam, entscheiden gemeinsam, arbeiten gemeinsam. Jede*r trägt bei, was er*sie kann, nach eigenen Wünschen und Fähigkeiten.' },
  'farming.collective.p2': { fr: 'Les décisions concernant les cultures, les achats de semences et l\'organisation des chantiers se prennent lors des réunions du collectif, au consensus.', de: 'Entscheidungen über den Anbau, den Saatgutkauf und die Organisation der Arbeitseinsätze werden in den Sitzungen des Kollektivs im Konsens getroffen.' },
  'farming.help.title': { fr: 'Viens nous aider !', de: 'Komm und hilf uns!' },
  'farming.help.p1': { fr: 'On organise régulièrement des chantiers participatifs et des journées maraîchage ouvertes à toustes. Pas besoin d\'expérience — juste de la motivation et des vêtements qui ne craignent pas la boue !', de: 'Wir organisieren regelmäßig Mitmach-Baustellen und Gemüsebau-Tage, die für alle offen sind. Keine Erfahrung nötig – nur Motivation und Kleidung, die schmutzig werden darf!' },
  'farming.help.p2': { fr: 'Pour être au courant des prochaines dates, le mieux c\'est de rejoindre notre canal Telegram où on annonce tout en temps réel.', de: 'Um über die nächsten Termine informiert zu sein, treten Sie am besten unserem Telegram-Kanal bei, wo wir alles in Echtzeit ankündigen.' },
  'farming.help.cta': { fr: 'Rejoindre le Telegram', de: 'Telegram beitreten' },
  'farming.photos.title': { fr: 'Photos du jardin', de: 'Fotos vom Garten' },
  'farming.photos.subtitle': { fr: 'D\'autres photos arrivent bientôt ! En attendant, voici un aperçu du terrain.', de: 'Weitere Fotos folgen bald! In der Zwischenzeit hier ein kleiner Einblick.' },
  'farming.photos.upcoming': { fr: 'À venir', de: 'Demnächst' },

  // Actualites Page
  'news.title': { fr: 'Actualités', de: 'Neuigkeiten' },
  'news.subtitle': { fr: 'Toutes les nouvelles du collectif. Retrouvez aussi nos publications en temps réel sur notre canal Telegram.', de: 'Alle Neuigkeiten des Kollektivs. Finden Sie unsere Beiträge auch in Echtzeit auf unserem Telegram-Kanal.' },
  'news.loading': { fr: 'Chargement des actualités…', de: 'Neuigkeiten werden geladen…' },
  'news.error': { fr: 'Impossible de charger les actualités', de: 'Neuigkeiten konnten nicht geladen werden' },
  'news.none': { fr: 'Aucune actualité pour l\'instant.', de: 'Zur Zeit keine Neuigkeiten.' },
  'news.date_prefix': { fr: 'Actualité du ', de: 'Neuigkeit vom ' },
  'news.read_more': { fr: 'Lire sur Telegram →', de: 'Auf Telegram lesen →' },

  // Evenements Page
  'events.title': { fr: 'Événements', de: 'Veranstaltungen' },
  'events.subtitle': { fr: 'Les prochains événements. Pour ne rien rater, suivez notre canal Telegram.', de: 'Die nächsten Veranstaltungen. Um nichts zu verpassen, folgen Sie unserem Telegram-Kanal.' },
  'events.loading': { fr: 'Chargement des événements…', de: 'Veranstaltungen werden geladen…' },
  'events.error': { fr: 'Impossible de charger les événements', de: 'Veranstaltungen konnten nicht geladen werden' },
  'events.none': { fr: 'Aucun événement à venir pour l\'instant.', de: 'Zur Zeit keine anstehenden Veranstaltungen.' },

  // Footer
  'footer.contact': { fr: 'Contact & Réseaux', de: 'Kontakt & Netzwerke' },
  'footer.links': { fr: 'Liens rapides', de: 'Schnelllinks' },
  'footer.legal': { fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.' },

  // Description Section (Index)
  'desc.title': { fr: 'Qui sommes-nous ?', de: 'Über uns ?' },
  'desc.intro': { fr: 'Les Hirondelles, c\'est un collectif installé au hameau agricole de Pontareuse à Boudry (NE). Depuis deux ans, on fait renaître cette ferme abandonnée : maraîchage, bouffes pop, concerts, projections, chantiers collectifs et fêtes pailletées. La terre à celleux qui la travaillent !', de: 'Les Hirondelles ist ein Kollektiv im landwirtschaftlichen Weiler Pontareuse in Boudry (NE). Seit zwei Jahren lassen wir diesen verlassenen Bauernhof wieder aufleben: Gemüsebau, Volksküchen, Konzerte, Filmvorführungen, kollektive Arbeitseinsätze und glitzernde Feste. Das Land denen, die es bearbeiten!' },
  'desc.goals.title': { fr: 'Nos objectifs', de: 'Unsere Ziele' },
  'desc.goals.1.t': { fr: 'Vie collective', de: 'Kollektives Leben' },
  'desc.goals.1.d': { fr: 'Réinventer les imaginaires et le quotidien. Pontareuse est un lieu de vie partagée où l\'on cuisine, construit et décide ensemble.', de: 'Vorstellungen und den Alltag neu erfinden. Pontareuse ist ein Ort des gemeinsamen Lebens, an dem wir zusammen kochen, bauen und entscheiden.' },
  'desc.goals.2.t': { fr: 'Déconstruction & politisation', de: 'Dekonstruktion & Politisierung' },
  'desc.goals.2.d': { fr: 'Un lieu engagé contre toutes les formes de discriminations — sexisme, racisme, validisme, transphobie — à l\'extérieur comme au sein du collectif.', de: 'Ein Ort, der sich gegen alle Formen von Diskriminierung einsetzt – Sexismus, Rassismus, Ableismus, Transphobie – sowohl nach außen als auch innerhalb des Kollektivs.' },
  'desc.goals.3.t': { fr: 'Expérimentation agricole', de: 'Landwirtschaftliches Experimentieren' },
  'desc.goals.3.d': { fr: 'Du maraîchage hors des systèmes marchands. Récolte de courges, préparation des sols, repas collectifs avec les légumes du jardin.', de: 'Gemüsebau außerhalb marktwirtschaftlicher Systeme. Kürbisernte, Bodenbearbeitung, kollektive Mahlzeiten mit Gemüse aus dem Garten.' },
  'desc.goals.4.t': { fr: 'Accueil & solidarité', de: 'Empfang & Solidarität' },
  'desc.goals.4.d': { fr: 'Créer des liens avec les personnes requérantes d\'asile en proposant un espace accueillant à l\'extérieur des centres.', de: 'Verbindungen zu Asylsuchenden aufbauen, indem wir einen einladenden Raum außerhalb der Zentren anbieten.' },

  'desc.values.title': { fr: 'Nos valeurs', de: 'Unsere Werte' },
  'desc.values.intro': { fr: 'Notre charte définit les comportements qu\'on veut favoriser pour que chaque personne se sente en sécurité sur le lieu. Pas de violence physique, verbale ou psychologique. Pas de comportements oppressifs. On veut un espace bienveillant et politisé.', de: 'Unsere Charta definiert die Verhaltensweisen, die wir fördern wollen, damit sich jede Person am Ort sicher fühlt. Keine physische, verbale oder psychologische Gewalt. Keine unterdrückenden Verhaltensweisen. Wir wollen einen wohlwollenden und politisierten Raum.' },
  'desc.values.1.t': { fr: 'Consentement & écoute', de: 'Konsens & Zuhören' },
  'desc.values.1.d': { fr: 'Demander avant de toucher, de donner un conseil, de parler de certains sujets. Respecter les pronoms de chaque personne.', de: 'Fragen, bevor man jemanden berührt, einen Rat gibt oder über bestimmte Themen spricht. Die Pronomen jeder Person respektieren.' },
  'desc.values.2.t': { fr: 'Entraide & soin collectif', de: 'Gegenseitige Hilfe & kollektive Sorge' },
  'desc.values.2.d': { fr: 'Participer aux tâches reproductives, aux moments de soin collectif. La vie collective fonctionne quand tout le monde y participe !', de: 'Teilnahme an reproduktiven Aufgaben und Momenten der kollektiven Sorge. Das kollektive Leben funktioniert, wenn alle teilnehmen!' },
  'desc.values.3.t': { fr: 'Droit à l\'erreur responsable', de: 'Recht auf verantwortungsvolles Fehlermachen' },
  'desc.values.3.d': { fr: 'Un espace complètement safe est impossible. On favorise l\'écoute, la remise en question et l\'apprentissage plutôt que la punition.', de: 'Ein vollkommen sicherer Raum ist unmöglich. Wir fördern Zuhören, Hinterfragen und Lernen anstelle von Bestrafung.' },
  'desc.values.4.t': { fr: 'Lieu ouvert', de: 'Offener Ort' },
  'desc.values.4.d': { fr: 'Le collectif est ouvert à toute personne qui souhaite s\'intégrer au projet et respecte les valeurs de la charte. Sens-toi bienvenu·e !', de: 'Das Kollektiv steht allen offen, die sich in das Projekt integrieren möchten und die Werte der Charta respektieren. Fühl dich willkommen!' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
