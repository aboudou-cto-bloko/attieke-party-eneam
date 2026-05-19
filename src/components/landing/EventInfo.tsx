const cards = [
  {
    icon: "📅",
    label: "Date",
    value: "Lundi 25 Mai",
    sub: "2026",
  },
  {
    icon: "🕒",
    label: "Heure",
    value: "Dès 15H",
    sub: "Jusqu'à tard",
  },
  {
    icon: "🎟",
    label: "Entrée",
    value: "3 000 FCFA",
    sub: "Par personne",
  },
];

export function EventInfo() {
  return (
    <section className="bg-base py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-white mb-2">
          INFOS PRATIQUES
        </h2>
        <p className="text-center text-muted font-heading text-sm mb-12 tracking-widest uppercase">
          Tout ce qu&apos;il faut savoir
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-surface border border-line rounded-2xl p-6 text-center hover:border-fire/40 transition-colors"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <p className="text-muted text-xs uppercase tracking-widest font-heading mb-1">
                {card.label}
              </p>
              <p className="text-gold font-display text-3xl">{card.value}</p>
              <p className="text-cream text-sm font-heading mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
