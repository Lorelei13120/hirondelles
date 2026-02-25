import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Send } from "lucide-react";
import logo from "@/assets/logo-hirondelles.png";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/#description", label: t('nav.home') },
    { to: "/maraichage", label: t('nav.farming') },
    { to: "/actualites", label: t('nav.news') },
    { to: "/evenements", label: t('nav.events') },
    { to: "/galerie", label: t('nav.gallery') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) return location.pathname === "/" && location.hash === to.slice(1);
    return location.pathname === to;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-foreground/95 backdrop-blur-sm shadow-md"
          : "bg-foreground/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Les Hirondelles" className="w-9 h-9" />
          <span className="font-display font-bold text-base uppercase tracking-tight text-primary-foreground">
            Les Hirondelles
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm transition-colors ${
                isActive(link.to)
                  ? "text-accent"
                  : "text-primary-foreground/70 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://t.me/hirondelles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-accent transition-colors"
            aria-label="Telegram"
          >
            <Send className="w-4 h-4" />
          </a>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 font-body text-xs text-primary-foreground/50 ml-4">
            <button 
              onClick={() => setLanguage('fr')} 
              className={`hover:text-accent transition-colors ${language === 'fr' ? 'text-accent font-bold' : ''}`}
            >
              FR
            </button>
            <span>|</span>
            <button 
              onClick={() => setLanguage('de')} 
              className={`hover:text-accent transition-colors ${language === 'de' ? 'text-accent font-bold' : ''}`}
            >
              DE
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-2 font-body text-xs text-primary-foreground/50">
            <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'text-accent font-bold' : ''}>FR</button>
            <span>|</span>
            <button onClick={() => setLanguage('de')} className={language === 'de' ? 'text-accent font-bold' : ''}>DE</button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-foreground border-foreground">
              <SheetTitle className="text-primary-foreground font-display uppercase tracking-tight">
                Navigation
              </SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`font-body text-base transition-colors ${
                      isActive(link.to)
                        ? "text-accent"
                        : "text-primary-foreground/70 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://t.me/hirondelles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors font-body text-base"
                >
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
