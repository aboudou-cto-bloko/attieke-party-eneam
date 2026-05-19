const activities = [
  {
    icon: "♟️",
    title: "Jeux",
    desc: "Dames, Ludo, cartes et bien plus. Montre ce que tu vaux.",
  },
  {
    icon: "🍉",
    title: "Bouffe",
    desc: "Attiéké bien chaud, poisson grillé et toutes les bonnes choses.",
  },
  {
    icon: "🎵",
    title: "Musique",
    desc: "Les sons qui font vibrer. Afrobeat, coupé décalé, tout y est.",
  },
  {
    icon: "📸",
    title: "Fun garanti",
    desc: "Photos, fou rires et souvenirs. Ramène toute ta squad.",
  },
];

export function Activities() {
  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-white mb-2">
          AU PROGRAMME
        </h2>
        <p className="text-center text-muted font-heading text-sm mb-12 tracking-widest uppercase">
          Une ambiance 100% good vibes
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {activities.map((a) => (
            <div
              key={a.title}
              className="group bg-elevated border border-line rounded-2xl p-6 text-center hover:border-fire/50 hover:scale-105 transition-all duration-200 cursor-default"
            >
              <div className="text-4xl mb-3">{a.icon}</div>
              <h3 className="font-display text-2xl text-gold mb-2">{a.title}</h3>
              <p className="text-muted text-xs font-heading leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
