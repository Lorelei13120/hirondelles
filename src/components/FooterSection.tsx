const FooterSection = () => {
  return (
    <footer className="py-16 px-6 bg-secondary text-secondary-foreground border-t-4 border-primary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <h3 className="font-display text-3xl mb-2">
              BREAK THE <span className="text-primary">CHAINS</span>
            </h3>
            <p className="font-body text-sm text-secondary-foreground/60 max-w-xs">
              No copyright. No intellectual property.
              All content is free to share, remix, and redistribute.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-display text-sm mb-4 text-primary">LINKS</h4>
              <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
                <li><a href="#principles" className="hover:text-primary transition-colors">Principles</a></li>
                <li><a href="#action" className="hover:text-primary transition-colors">Get Involved</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Zines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm mb-4 text-primary">CONNECT</h4>
              <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Signal Group</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mastodon</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 font-body text-xs text-secondary-foreground/40 text-center">
          ✊ No rulers. No masters. Power to the people. ✊
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
