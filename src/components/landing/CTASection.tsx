import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-surface py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-fire font-heading uppercase tracking-widest text-sm mb-4">
          Places limitées
        </p>
        <h2 className="font-display text-5xl sm:text-7xl text-white mb-4 leading-none">
          RAMÈNE TON
          <span className="block text-gold">ÉQUIPE</span>
        </h2>
        <p className="text-cream font-heading text-lg mb-10 leading-relaxed">
          Prépare-toi pour l&apos;Attiéké Party la plus lourde de l&apos;année.
          <br />
          Ne rate pas ça. 🔥
        </p>

        <Link
          href="/checkout"
          className="inline-flex items-center gap-3 bg-fire text-white font-heading font-bold text-xl uppercase px-12 py-5 rounded-xl shadow-[0_0_30px_rgba(232,121,26,0.5)] hover:shadow-[0_0_50px_rgba(232,121,26,0.8)] hover:scale-105 transition-all duration-200"
        >
          Réserver — 2 000 FCFA
        </Link>

        <p className="mt-6 text-muted text-sm font-heading">
          Paiement sécurisé · Ticket PDF immédiat · QR code unique
        </p>
      </div>
    </section>
  );
}
