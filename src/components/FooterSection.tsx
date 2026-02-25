import { Link } from "react-router-dom";
import logo from "@/assets/logo-hirondelles.png";
import { useLanguage } from "@/lib/LanguageContext";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-10 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Les Hirondelles" className="w-12 h-12" />
            <div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                Les Hirondelles
              </h3>
              <p className="font-body text-xs text-primary-foreground/60 leading-relaxed">
                Hameau de Pontareuse.
              </p>
            </div>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-display text-xs mb-3 text-accent uppercase tracking-wider">{t('footer.links')}</h4>
              <ul className="space-y-1 font-body text-xs text-primary-foreground/70">
                <li><a href="/#description" className="hover:text-accent transition-colors">{t('nav.home')}</a></li>
                <li><Link to="/maraichage" className="hover:text-accent transition-colors">{t('nav.farming')}</Link></li>
                <li><Link to="/actualites" className="hover:text-accent transition-colors">{t('nav.news')}</Link></li>
                <li><Link to="/evenements" className="hover:text-accent transition-colors">{t('nav.events')}</Link></li>
                <li><Link to="/galerie" className="hover:text-accent transition-colors">{t('nav.gallery')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs mb-3 text-accent uppercase tracking-wider">{t('footer.contact')}</h4>
              <ul className="space-y-1 font-body text-xs text-primary-foreground/70">
                <li><a href="https://t.me/hirondelles" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Telegram</a></li>
                <li><a href="mailto:collectif_hirondelles@riseup.net" className="hover:text-accent transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 font-body text-[10px] text-primary-foreground/40 text-center uppercase tracking-widest">
          📍 Chemin du Bois des Creux 34, 2017 Boudry (NE) · 🐦 {t('hero.title')} 🌾
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
