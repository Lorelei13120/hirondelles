const FooterSection = () => {
  return (
    <footer className="py-16 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <h3 className="font-display text-2xl mb-2 italic">
              Les Hirondelles
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 max-w-xs leading-relaxed">
              Collectif paysan en lutte.
              Tout le contenu de ce site est libre de diffusion.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-display text-sm mb-4 text-accent">Navigation</h4>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                <li><a href="#description" className="hover:text-accent transition-colors">Qui sommes-nous</a></li>
                <li><a href="#actualites" className="hover:text-accent transition-colors">Actualités</a></li>
                <li><a href="#evenements" className="hover:text-accent transition-colors">Événements</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm mb-4 text-accent">Contact</h4>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                <li><a href="https://t.me/hirondelles" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Telegram</a></li>
                <li><a href="mailto:contact@leshirondelles.org" className="hover:text-accent transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 font-body text-xs text-primary-foreground/40 text-center">
          🐦 La terre à celleux qui la travaillent. 🌾
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
