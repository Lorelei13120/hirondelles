import { Link } from "react-router-dom";
import logo from "@/assets/logo-hirondelles.png";
import { useLanguage } from "@/lib/LanguageContext";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-16 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex items-start gap-4">
            <img src={logo} alt="Les Hirondelles" className="w-16 h-16" />
            <div>
              <h3 className="font-display font-bold text-2xl mb-2 uppercase tracking-tight">
                Les Hirondelles
              </h3>
              <p className="font-body text-sm text-primary-foreground/60 max-w-xs leading-relaxed">
                Hameau de Pontareuse.
                <br />
                Collectif des Hirondelles.
              </p>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-display text-sm mb-4 text-accent">{t('footer.links')}</h4>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                <li><a href="/#description" className="hover:text-accent transition-colors">{t('nav.home')}</a></li>
                <li><Link to="/maraichage" className="hover:text-accent transition-colors">{t('nav.farming')}</Link></li>
                <li><Link to="/actualites" className="hover:text-accent transition-colors">{t('nav.news')}</Link></li>
                <li><Link to="/evenements" className="hover:text-accent transition-colors">{t('nav.events')}</Link></li>
                <li><Link to="/galerie" className="hover:text-accent transition-colors">{t('nav.gallery')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm mb-4 text-accent">{t('footer.contact')}</h4>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
                <li><a href="https://t.me/hirondelles" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Telegram</a></li>
                <li><a href="mailto:collectif_hirondelles@riseup.net" className="hover:text-accent transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 font-body text-xs text-primary-foreground/40 text-center">
          📍 Chemin du Bois des Creux 34, 2017 Boudry (NE) · 🐦 {t('hero.title')} 🌾
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
