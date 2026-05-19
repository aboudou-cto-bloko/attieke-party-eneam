"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const orgRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    import("animejs").then(
      ({ animate, createTimeline, stagger, split, scrambleText }) => {
        if (cancelled) return;
        if (!orgRef.current || !line1Ref.current || !line2Ref.current) return;

        // Split title into individual characters (sets display:inline-block automatically)
        const s1 = split(line1Ref.current);
        const s2 = split(line2Ref.current);

        const tl = createTimeline({ defaults: { ease: "outExpo" } });

        // 1. Org label — scramble reveal from nothing
        tl.add(orgRef.current, {
          opacity: { from: 0 },
          innerHTML: scrambleText({
            chars: "uppercase",
            from: "left",
          }),
          duration: 900,
        });

        // 2. "ATTIÉKÉ" — each letter slides up from below
        tl.add(
          s1.chars,
          {
            opacity: { from: 0 },
            translateY: { from: "115%" },
            duration: 750,
            delay: stagger(55),
            ease: "outBack(1.3)",
          },
          "-=450"
        );

        // 3. "PARTY" — idem, overlap avec ATTIÉKÉ
        tl.add(
          s2.chars,
          {
            opacity: { from: 0 },
            translateY: { from: "115%" },
            duration: 750,
            delay: stagger(55),
            ease: "outBack(1.3)",
          },
          "-=550"
        );

        // 4. Tagline — fade + glisse vers le haut
        if (taglineRef.current) {
          tl.add(
            taglineRef.current,
            {
              opacity: { from: 0 },
              translateY: { from: 28 },
              duration: 650,
            },
            "-=350"
          );
        }

        // 5. Badges — stagger en cascade
        if (badgesRef.current) {
          tl.add(
            Array.from(badgesRef.current.children) as HTMLElement[],
            {
              opacity: { from: 0 },
              translateY: { from: 20 },
              scale: { from: 0.88 },
              duration: 500,
              delay: stagger(90),
            },
            "-=250"
          );
        }

        // 6. CTA — scale-up + fade
        if (ctaRef.current) {
          tl.add(
            ctaRef.current,
            {
              opacity: { from: 0 },
              scale: { from: 0.9 },
              duration: 550,
              ease: "outBack(1.5)",
            },
            "-=200"
          );
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/affiche-dark.jpg"
        alt="Attiéké Party"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/30 to-base/85" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-16 left-[10%] w-80 h-80 bg-fire/25 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-32 right-[8%] w-64 h-64 bg-gold/20 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-leaf/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-4 py-16">
        {/* Glass card */}
        <div className="w-full max-w-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl px-8 py-12 shadow-[0_8px_60px_rgba(0,0,0,0.5)]">

          {/* Org label — scramble reveal */}
          <p
            ref={orgRef}
            className="text-cream text-sm tracking-[0.3em] uppercase mb-4 font-heading font-medium"
          >
            BUE-ENEAM présente
          </p>

          {/* Title — letter-by-letter slide up */}
          <h1 className="font-display leading-none select-none overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-[5rem] sm:text-[8rem] md:text-[10rem] text-white drop-shadow-2xl"
            >
              ATTIÉKÉ
            </span>
            <span
              ref={line2Ref}
              className="block text-[5rem] sm:text-[8rem] md:text-[10rem] text-gold drop-shadow-2xl -mt-4 sm:-mt-8"
            >
              PARTY
            </span>
          </h1>

          {/* Tagline — fade up */}
          <p
            ref={taglineRef}
            className="text-cream text-base sm:text-lg mt-4 max-w-sm mx-auto font-heading"
          >
            Le rendez-vous chill que tu ne dois surtout pas manquer&nbsp;!
          </p>

          {/* Info badges — stagger */}
          <div ref={badgesRef} className="flex flex-wrap gap-3 mt-8 justify-center">
            <span className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-cream font-heading">
              📅 Lundi 25 Mai 2026
            </span>
            <span className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-cream font-heading">
              🕒 Dès 15H
            </span>
            <span className="flex items-center gap-2 bg-gold/15 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 text-sm text-gold font-heading font-bold">
              🎟 3 000 FCFA
            </span>
          </div>

          {/* CTA + secure text — scale up */}
          <div ref={ctaRef} className="flex flex-col items-center">
            <Link
              href="/checkout"
              className="mt-10 inline-flex items-center gap-3 bg-fire text-white font-heading font-bold text-lg uppercase px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(232,121,26,0.5)] hover:shadow-[0_0_45px_rgba(232,121,26,0.7)] hover:scale-105 transition-all duration-200"
            >
              Réserver ma place
              <span className="text-xl">→</span>
            </Link>
            <p className="mt-4 text-muted text-xs font-heading">
              Paiement sécurisé via FedaPay
            </p>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-cream/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
