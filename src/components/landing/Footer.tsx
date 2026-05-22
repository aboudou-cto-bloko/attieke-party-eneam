export function Footer() {
  return (
    <footer className="bg-base border-t border-line py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-2xl text-white mb-2">ATTIÉKÉ PARTY</p>
        <p className="text-muted text-sm font-heading mb-6">
          BUE-ENEAM · Lundi 25 Mai 2026 · 15H · 2 000 FCFA
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted font-heading">
          {["#BUE-ENEAM", "#ATTIEKEPARTY", "#Jeux", "#Vibes", "#ENEAM"].map(
            (tag) => (
              <span
                key={tag}
                className="bg-elevated border border-line rounded-full px-3 py-1"
              >
                {tag}
              </span>
            )
          )}
        </div>
        <p className="mt-6 text-muted/50 text-xs font-heading">
          © 2026 BUE-ENEAM. Tous droits réservés.
        </p>

        {/* Crédit développeur */}
        <div className="mt-6 pt-6 border-t border-line flex items-center justify-center gap-3">
          <span className="text-muted/50 text-xs font-heading">
            Une réalisation de
          </span>
          <a
            href="https://aboudouzinsou.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group"
            aria-label="Portfolio d'Aboudou Zinsou"
          >
            {/* Logo AZ */}
            <svg
              viewBox="0 0 100 60"
              className="w-7 h-4 fill-muted/40 group-hover:fill-fire transition-colors duration-200"
              aria-hidden
            >
              <g transform="translate(10, 5)">
                <path d="M 0 45 L 18 0 L 30 0 L 30 12 L 16 45 Z" />
                <path d="M 35 0 L 80 0 L 80 8 L 50 22 L 80 37 L 80 45 L 35 45 L 35 37 L 65 23 L 35 8 Z" />
              </g>
            </svg>
            <span className="text-muted/50 text-xs font-heading font-medium group-hover:text-fire transition-colors duration-200">
              aboudouzinsou.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
