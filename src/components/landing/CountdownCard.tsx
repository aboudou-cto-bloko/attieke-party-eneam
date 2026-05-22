"use client";
import { useEffect, useState } from "react";

// 25 mai 2026 à 15h WAT (UTC+1) = 14h UTC
const EVENT_DATE = new Date("2026-05-25T14:00:00Z");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function CountdownCard() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "JOURS", value: time.days },
    { label: "HEURES", value: time.hours },
    { label: "MIN", value: time.minutes },
    { label: "SEC", value: time.seconds },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gold/30 bg-elevated flex flex-col items-center justify-center p-8 hover:border-gold/60 transition-colors duration-300 group">
      {/* Glow orbs */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-fire/20 rounded-full blur-[70px] group-hover:bg-fire/30 transition-colors duration-500" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-gold/15 rounded-full blur-[60px]" />

      <div className="relative z-10 text-center w-full">
        <p className="text-fire font-heading uppercase tracking-widest text-xs mb-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-fire mr-1.5 animate-ping" />
          EN DIRECT
        </p>
        <h3 className="font-display text-3xl sm:text-4xl text-white mb-1">
          COMPTE À REBOURS
        </h3>
        <p className="text-muted font-heading text-xs mb-10 tracking-widest uppercase">
          Lundi 25 Mai · 15H · BUE-ENEAM
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {units.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="bg-surface border border-line rounded-xl px-2 py-4 w-full">
                <span className="font-display text-3xl sm:text-4xl text-gold tabular-nums block text-center leading-none">
                  {pad(value)}
                </span>
              </div>
              <span className="text-muted font-heading text-[8px] tracking-widest mt-1.5 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          <span className="inline-flex items-center gap-2 bg-fire/10 border border-fire/20 rounded-full px-5 py-2.5 text-fire font-heading text-sm font-semibold">
            🎟 2 000 FCFA · Places limitées
          </span>
          <p className="text-muted font-heading text-xs">
            ♟️ Jeux · 🍉 Bouffe · 🎵 Musique · 📸 Fun
          </p>
        </div>
      </div>
    </div>
  );
}
