import Image from "next/image";

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
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-line hover:border-fire/40 transition-colors">
            <Image
              src="/assets/affiche-tropical.jpg"
              alt="Attiéké Party tropical vibes"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-line hover:border-fire/40 transition-colors">
            <Image
              src="/assets/affiche-picnic.jpg"
              alt="Attiéké Party picnic vibes"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
