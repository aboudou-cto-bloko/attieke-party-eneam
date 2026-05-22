import Image from "next/image";
import { CountdownCard } from "./CountdownCard";

export function Gallery() {
  return (
    <section className="bg-base py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-white mb-2">
          L&apos;AMBIANCE
        </h2>
        <p className="text-center text-muted font-heading text-sm mb-12 tracking-widest uppercase">
          Viens vivre l&apos;expérience
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Affiche officielle */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gold/20 hover:border-gold/50 transition-colors duration-300 shadow-[0_0_40px_rgba(240,192,64,0.08)] hover:shadow-[0_0_60px_rgba(240,192,64,0.18)] group">
            <Image
              src="/assets/affiche.jpg"
              alt="Affiche officielle Attiéké Party 2026"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>

          {/* Compte à rebours */}
          <CountdownCard />
        </div>
      </div>
    </section>
  );
}
